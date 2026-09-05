"""
Deterministic, transparent business logic shared by the dashboards.

Everything here is derived from DB rows (skill claims, evidence, target-role
frameworks, opportunities) so the numbers the frontend shows are explainable —
no opaque "AI" scores. The ML/statistical models can later slot in behind the
same functions.
"""
from __future__ import annotations

from typing import TYPE_CHECKING, Dict, List, Optional

from django.db.models import Avg

from apps.catalog.models import DemandLevel, LearningResource, Skill, TargetRole, TargetRoleSkill
from apps.credentials.models import (
    EvidenceItem,
    EvidenceStatus,
    ProjectRecommendation,
    ProjectSubmission,
    SkillClaim,
)

if TYPE_CHECKING:
    from apps.accounts.models import User

WEIGHT = {"essential": 1.0, "preferred": 0.5}
READINESS_BANDS = [
    (80, "Job-Ready"),
    (50, "Developing"),
    (0, "Beginning"),
]


def _label_for_score(score: int) -> str:
    for threshold, label in READINESS_BANDS:
        if score >= threshold:
            return label
    return "Beginning"


def _claim_map(student) -> Dict[int, SkillClaim]:
    return {
        c.skill_id: c
        for c in SkillClaim.objects.filter(student=student).select_related("skill", "evidence")
    }


def student_target_role(student) -> Optional[TargetRole]:
    profile = getattr(student, "student_profile", None)
    if profile is None:
        return None
    return profile.target_role


def compute_readiness(student, target_role: Optional[TargetRole] = None) -> dict:
    """
    Compare a student's skill claims against a role's required-skill framework
    and return an explainable readiness profile (TS RoleReadinessProfile).
    """
    role = target_role or student_target_role(student)
    reqs = list(
        TargetRoleSkill.objects.filter(target_role=role).select_related("skill")
        if role
        else []
    )
    claims = _claim_map(student)

    details = []  # (skill_name, confidence, required, is_missing, is_weak, priority)
    for req in reqs:
        claim = claims.get(req.skill_id)
        conf = claim.confidence if claim else 0
        matched = conf >= req.min_proficiency
        details.append(
            {
                "skill": req.skill.name,
                "conf": conf,
                "required": req.min_proficiency,
                "matched": matched,
                "priority": req.priority,
                "evidence": bool(claim and claim.is_verified),
            }
        )

    if not details:
        return {
            "targetRole": role.name if role else "—",
            "readiness": "Beginning",
            "readinessScore": 0,
            "matchedSkills": 0,
            "totalRequired": 0,
            "strongSkills": [],
            "missingSkills": [],
            "weakSkills": [],
            "explanation": "Set a target role to see your readiness.",
            "factors": [],
        }

    total_weight = sum(WEIGHT[d["priority"]] for d in details)
    weighted = sum(
        WEIGHT[d["priority"]] * (d["conf"] if d["conf"] else 0) for d in details
    )
    score = int(round(weighted / total_weight)) if total_weight else 0

    matched = [d for d in details if d["matched"]]
    missing = [d for d in details if not d["matched"] and d["conf"] < 50]
    weak = [
        d for d in details if d["matched"] and 50 <= d["conf"] < 75
    ] + [d for d in details if not d["matched"] and 50 <= d["conf"] < d["required"]]

    evidence_pct = 0
    if details:
        evidence_pct = int(round(100 * sum(1 for d in details if d["evidence"]) / len(details)))

    label = _label_for_score(score)
    explanation = (
        f"You are {label} toward this role. "
        f"{len(matched)} of {len(details)} required skills are demonstrated"
        + (
            f", but {len(missing) + len([d for d in details if d['matched'] is False and d['conf'] >= 50])} need work. "
            "Close the gaps below to advance."
            if (missing or weak)
            else ". Strong verified profile — keep building evidence."
        )
    )
    factors = [
        {"label": "Required skills match", "value": f"{len(matched)} of {len(details)} required skills demonstrated", "positive": True},
        {"label": "Strongest skills", "value": ", ".join(d["skill"] for d in details if d["conf"] >= 75)[:80] or "None above 75%", "positive": True},
        {
            "label": "Missing critical skill",
            "value": missing[0]["skill"] if missing else "None",
            "positive": not bool(missing),
        },
        {
            "label": "Evidence-backed skills",
            "value": f"{evidence_pct}% of required skills carry verified evidence",
            "positive": evidence_pct >= 50,
        },
    ]

    return {
        "targetRole": role.name if role else "—",
        "readiness": label,
        "readinessScore": score,
        "matchedSkills": len(matched),
        "totalRequired": len(details),
        "strongSkills": [d["skill"] for d in details if d["conf"] >= 75],
        "missingSkills": [d["skill"] for d in missing],
        "weakSkills": sorted({d["skill"] for d in weak}),
        "explanation": explanation,
        "factors": factors,
    }


def compute_gaps(student, target_role: Optional[TargetRole] = None) -> List[dict]:
    """List of skill gaps vs the target role (TS SkillGap[])."""
    role = target_role or student_target_role(student)
    if role is None:
        return []
    claims = _claim_map(student)
    gaps = []
    for req in TargetRoleSkill.objects.filter(target_role=role).select_related("skill"):
        claim = claims.get(req.skill_id)
        current = claim.confidence if claim else 0
        required = req.min_proficiency
        if current >= required:
            continue
        delta = required - current
        if delta >= 25:
            severity = "High"
        elif delta >= 10:
            severity = "Medium"
        else:
            severity = "Low"
        gaps.append(
            {
                "id": f"gap-{req.skill.taxonomy_id}",
                "taxonomyId": req.skill.taxonomy_id,
                "name": req.skill.name,
                "current": current,
                "required": required,
                "severity": severity,
                "evidenceNeeded": not bool(claim and claim.is_verified),
            }
        )
    return sorted(gaps, key=lambda g: -("High Medium Low".index(g["severity"])))


def simulate_improvements(student) -> dict:
    """
    Simulator: what happens to readiness if the student completes each
    available learning resource / recommended project (TS SkillGapSimulator).
    """
    base = compute_readiness(student)
    base_score = base["readinessScore"]
    actions = []

    resources = LearningResource.objects.select_related("closes_gap").order_by("id")
    for res in resources:
        actions.append(_sim_action(student, base_score, res))

    for proj in ProjectRecommendation.objects.select_related("target_skill").order_by("id"):
        actions.append(
            _sim_action(
                student,
                base_score,
                kind="project",
                title=proj.title,
                description=proj.description or "Complete the recommended project and submit for verification.",
                why=f"Demonstrates {proj.target_skill.name} through a verifiable deliverable.",
                skill=proj.target_skill,
                boost=20,
            )
        )

    return {
        "currentReadinessScore": base_score,
        "currentReadiness": base["readiness"],
        "actions": actions,
    }


def _sim_action(student, base_score: int, resource: Optional[LearningResource] = None, **kwargs) -> dict:
    kind = kwargs.get("kind") or (
        {"Course": "course", "Certification": "certification", "Workshop": "course", "Learning path": "course", "Project": "project"}.get(resource.kind, "course")
    )
    name = resource.title if resource else kwargs["title"]
    skill = resource.closes_gap if resource else kwargs["skill"]
    boost = resource.boost_points if resource else kwargs.get("boost", 15)
    description = (resource.description or resource.why or "") if resource else kwargs["description"]
    why = resource.why if resource and resource.why else kwargs.get("why", "")

    claims = _claim_map(student)
    claim = claims.get(skill.id)
    current = claim.confidence if claim else 0
    projected = min(100, current + boost)

    # What the role score becomes if this skill reaches `projected`.
    role = student_target_role(student)
    req = TargetRoleSkill.objects.filter(target_role=role, skill=skill).first()
    adjustments = {}
    if req is not None:
        total_weight = 0.0
        weighted = 0.0
        for other in TargetRoleSkill.objects.filter(target_role=role).select_related("skill"):
            w = WEIGHT[other.priority]
            total_weight += w
            other_claim = claims.get(other.skill_id)
            conf = other_claim.confidence if other_claim else 0
            if other.skill_id == skill.id:
                conf = projected
            weighted += w * conf
        projected_score = int(round(weighted / total_weight)) if total_weight else base_score
    else:
        projected_score = base_score
    adjustments["skill"] = skill

    return {
        "type": kind,
        "name": name,
        "description": f"{description} {why}".strip(),
        "skillsImproved": [
            {
                "skill": skill.name,
                "currentConfidence": current,
                "projectedConfidence": projected,
            }
        ],
        "readinessChange": {
            "from": base_score,
            "to": max(base_score, projected_score),
            "fromLabel": _label_for_score(base_score),
            "toLabel": _label_for_score(projected_score),
        },
    }


def opportunity_match(student, opportunity) -> dict:
    """Explainable student ↔ opportunity match (TS-compatible subset)."""
    claims = _claim_map(student)
    matched = []
    missing = []
    contributions = []
    for req in opportunity.required_skills.select_related("skill"):
        claim = claims.get(req.skill_id)
        conf = claim.confidence if claim else 0
        ok = conf >= req.min_proficiency
        contribution = conf if ok else max(0, int(conf * 0.2))
        contributions.append(contribution)
        (matched if ok else missing).append(req.skill.name)
    avg = round(sum(contributions) / len(contributions)) if contributions else 0
    # Verified claims get a small trust bonus so evidence-heavy profiles rank higher.
    verified_bonus = int(
        8
        * sum(1 for m in matched if _verified_for(student, m, claims))
        / max(1, len(matched))
    )
    return {
        "matchedSkills": matched,
        "missingSkills": missing,
        "match": min(99, avg + verified_bonus),
    }


def _verified_for(student, skill_name, claims) -> bool:
    return any(c.is_verified and c.skill.name == skill_name for c in claims.values())


def passport(student) -> dict:
    """Skill Passport summary + items (TS SkillPassport)."""
    claims = list(
        SkillClaim.objects.filter(student=student).select_related("skill", "evidence").order_by("-confidence")
    )
    items = []
    verified = 0
    self_declared = 0
    for c in claims:
        is_verified = c.is_verified
        if is_verified:
            verified += 1
        elif c.origin == SkillClaim.Origin.SELF_DECLARED:
            self_declared += 1
        item: dict = {
            "id": f"claim-{c.id}",
            "name": c.skill.name,
            "taxonomyId": c.skill.taxonomy_id,
            "origin": c.origin,
            "confidence": c.confidence,
            "category": c.skill.category,
        }
        if c.evidence:
            item["evidence"] = {
                "id": f"ev-{c.evidence.id}",
                "title": c.evidence.title,
                "kind": c.evidence.kind,
                "issuer": c.evidence.issuer,
                "date": _fmt_month(c.evidence.issued_on),
                "status": c.evidence.status,
                "skills": c.evidence.extracted_skills or [c.skill.name],
            }
        items.append(item)

    evidence_qs = EvidenceItem.objects.filter(student=student)
    return {
        "verifiedCount": verified,
        "selfDeclaredCount": self_declared,
        "totalEvidence": evidence_qs.count(),
        "verifiedEvidence": evidence_qs.filter(status=EvidenceStatus.VERIFIED).count(),
        "items": items,
    }


def _fmt_month(value) -> str:
    if not value:
        return ""
    try:
        return value.strftime("%b %Y")
    except AttributeError:
        return str(value)


def average_claim_confidence(students) -> int:
    agg = SkillClaim.objects.filter(student__in=students).aggregate(avg=Avg("confidence"))
    return int(round(agg["avg"] or 0))
