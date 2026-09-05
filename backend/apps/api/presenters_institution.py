"""GET /api/institution/dashboard — mirrors `src/lib/institution-api.ts` InstitutionDashboard."""
from __future__ import annotations

import re
from collections import Counter, defaultdict

from apps.accounts.models import Role, User
from apps.credentials.models import EvidenceItem, SkillClaim
from apps.credentials.services import compute_readiness, opportunity_match
from apps.governance.models import (
    AnomalyFlag,
    DemandTrend,
    DepartmentSkillMetric,
    InstitutionalReport,
    Placement,
    PlacementStatus,
    PlacementType,
)
from apps.marketplace.models import Application, Opportunity
from . import presenters_common as common
from .presenters_common import fmt_date, fmt_month_year, initials_for, rounded, safe_div

_STIPEND_RE = re.compile(r"₹?\s*([\d,]+)")


def _stipend_to_number(text: str) -> float:
    m = _STIPEND_RE.search(text or "")
    if not m:
        return 0.0
    return float(m.group(1).replace(",", ""))


def _avg_stipend_label(texts) -> str:
    values = [v for v in (_stipend_to_number(t) for t in texts) if v]
    if not values:
        return "—"
    avg = sum(values) / len(values)
    return f"₹{int(round(avg)):,}/mo"


def _institution_block(institution) -> dict:
    return {
        "name": institution.name,
        "initials": institution.initials or institution.name[:4].upper(),
        "location": institution.location,
        "type": institution.org_type,
        "establishedYear": institution.established_year or 0,
        "departments": [d.name for d in institution.departments.all()],
        "totalStudents": User.objects.filter(role=Role.STUDENT, student_profile__institution=institution).count()
        or institution.total_students,
        "totalFaculty": institution.total_faculty,
        "website": institution.website,
        "email": institution.email,
        "phone": institution.phone,
        "verified": institution.verified,
    }


def _students_of(institution) -> list:
    return list(
        User.objects.filter(role=Role.STUDENT, student_profile__institution=institution)
        .select_related("student_profile")
        .prefetch_related("skill_claims")
    )


def _placement_block(p: Placement) -> dict:
    return {
        "id": f"pl-{p.id}",
        "studentName": p.student.display_name,
        "studentInitials": p.student.initials,
        "department": p.student.student_profile.display_department,
        "course": p.student.student_profile.course,
        "company": p.company_name,
        "role": p.role,
        "type": p.type,
        "startDate": fmt_month_year(p.start_date),
        "duration": p.duration,
        "stipend": p.stipend,
        "status": p.status,
    }


def _skill_metrics(institution, students) -> list:
    claims = list(
        SkillClaim.objects.filter(student__in=students).select_related("skill", "evidence")
    )
    by_skill: dict = defaultdict(list)
    for c in claims:
        by_skill[c.skill.name].append(c)
    latest_trends = {
        t.skill_id: t
        for t in DemandTrend.objects.order_by("-month").select_related("skill")
    }
    rows = []
    for name, items in by_skill.items():
        verified = sum(1 for c in items if c.is_verified)
        self_declared = sum(1 for c in items if c.origin == "self-declared")
        trend = "stable"
        # trend: up when the skill is rising in industry demand
        if items and items[0].skill_id in latest_trends:
            direction = latest_trends[items[0].skill_id].direction
            trend = {"up": "up", "up-strong": "up", "stable": "stable", "down": "down"}[direction]
        rows.append(
            {
                "name": name,
                "verifiedCount": verified,
                "selfDeclaredCount": self_declared,
                "totalCount": len(items),
                "avgConfidence": int(round(sum(c.confidence for c in items) / len(items))),
                "trend": trend,
            }
        )
    return sorted(rows, key=lambda r: -r["totalCount"])


def _readiness_for_students(students) -> dict:
    out = {}
    for s in students:
        out[s.id] = compute_readiness(s)
    return out


def _dept_comparison(institution, students, readiness_map) -> list:
    rows = []
    opps = list(
        Opportunity.objects.filter(status__in=["active", "closing"])
        .select_related("company__industry_profile")
        .prefetch_related("required_skills__skill")
    )
    for dept in institution.departments.all():
        members = [s for s in students if s.student_profile.department_id == dept.id]
        if not members:
            continue
        total = len(members)
        placements = Placement.objects.filter(
            student__in=members, status__in=[PlacementStatus.ACTIVE, PlacementStatus.COMPLETED, PlacementStatus.OFFERED]
        )
        placed = placements.count()
        intern_particip = placements.filter(type=PlacementType.INTERNSHIP).count()
        claims = SkillClaim.objects.filter(student__in=members)
        verified_pct = (
            round(100 * claims.filter(evidence__status="verified").count() / max(claims.count(), 1))
            if claims.count()
            else 0
        )
        metric = (
            DepartmentSkillMetric.objects.filter(department=dept)
            .order_by("-students_with_gap")
            .select_related("skill")
            .first()
        )
        match_scores = []
        for s in members:
            scores = [opportunity_match(s, o)["match"] for o in opps[:3]]
            match_scores.append(max(scores) if scores else 0)
        rows.append(
            {
                "name": dept.name,
                "students": total,
                "avgSkills": rounded(sum(len(list(s.skill_claims.all())) for s in members) / total, 1),
                "avgMatch": rounded(sum(match_scores) / len(match_scores)) if match_scores else 0,
                "avgReadiness": rounded(sum(readiness_map[s.id]["readinessScore"] for s in members) / total)
                if total
                else 0,
                "placementRate": round(safe_div(placed, total)),
                "verifiedPct": verified_pct,
                "topGap": metric.skill.name if metric else "—",
                "internshipParticipation": round(safe_div(intern_particip, total)),
            }
        )
    return rows


def _analytics_block(institution, students, readiness_map, placements) -> dict:
    total = len(students)
    dist_counter = Counter(readiness_map[s.id]["readiness"] for s in students)
    readiness_sum = sum(r["readinessScore"] for r in readiness_map.values())
    claim_count = sum(len(list(s.skill_claims.all())) for s in students)
    intern_count = placements.filter(type=PlacementType.INTERNSHIP).count()
    placed = placements.count()

    opps = list(Opportunity.objects.select_related("company__industry_profile"))
    company_counts: Counter = Counter()
    for p in placements:
        company_counts[p.company_name] += 1

    # last 6 months zero-filled
    months = common.last_months(6)
    trend = {m["key"]: {"month": m["label"], "placements": 0, "internships": 0, "verified": 0} for m in months}
    for p in placements:
        key = p.created_at.strftime("%Y-%m")
        if key in trend:
            trend[key]["placements"] += 1
            if p.type == PlacementType.INTERNSHIP:
                trend[key]["internships"] += 1
    for e in EvidenceItem.objects.filter(student__in=students, status="verified"):
        key = e.created_at.strftime("%Y-%m")
        if key in trend:
            trend[key]["verified"] += 1
    monthly = [trend[m["key"]] for m in months]

    gap_by_skill: Counter = Counter()
    total_students = 0
    metrics = DepartmentSkillMetric.objects.select_related("department", "skill").filter(
        department__institution=institution
    )
    for m in metrics:
        gap_by_skill[m.skill.name] += m.students_with_gap
        total_students = max(total_students, m.total_students)

    partner_names = set()
    for c in Opportunity.objects.select_related("company__industry_profile").all():
        # company FK → User; reverse one-to-one raises on missing profile, so
        # guard with getattr (RelatedObjectDoesNotExist subclasses AttributeError).
        profile = getattr(c.company, "industry_profile", None)
        if profile is not None:
            partner_names.add(profile.name)
    hired_by_company: Counter = Counter()
    for p in placements.filter(status=PlacementStatus.COMPLETED):
        hired_by_company[p.company_name] += 1
        partner_names.add(p.company_name)

    engagement = []
    for name, hired in hired_by_company.most_common(5):
        engagement.append(
            {
                "company": name,
                "opportunities": sum(1 for o in opps if o.company.industry_profile.name == name),
                "hired": hired,
            }
        )
    for opp in opps:
        name = opp.company.industry_profile.name
        if name in {e["company"] for e in engagement}:
            continue
        engagement.append({"company": name, "opportunities": 1, "hired": 0})
    engagement = engagement[:6]

    return {
        "totalStudents": total,
        "totalPlaced": placed,
        "placementRate": round(safe_div(placed, total)),
        "internshipRate": round(safe_div(intern_count, total)),
        "avgReadiness": rounded(readiness_sum / total) if total else 0,
        "avgSkills": rounded(claim_count / total, 1) if total else 0,
        "industryPartners": len(partner_names),
        "monthlyTrend": monthly,
        "skillGaps": [
            {"skill": s, "gapCount": c, "pct": round(c / max(total_students, 1) * 100)}
            for s, c in gap_by_skill.most_common(5)
        ],
        "industryEngagement": engagement,
    }


def build_institution_dashboard(admin_user) -> dict:
    institution = admin_user.institution_admin_profile.institution
    students = _students_of(institution)
    readiness_map = _readiness_for_students(students)
    placements = Placement.objects.filter(student__in=students).select_related("student__student_profile")

    dept_placements = []
    for dept in institution.departments.all():
        members = [s for s in students if s.student_profile.department_id == dept.id]
        dept_placements_rows = [p for p in placements if p.student_id in {s.id for s in members}]
        placed = len(dept_placements_rows)
        company_counter = Counter(p.company_name for p in dept_placements_rows)
        dept_placements.append(
            {
                "department": dept.name,
                "totalStudents": len(members),
                "placed": placed,
                "placementRate": round(safe_div(placed, len(members))),
                "avgStipend": _avg_stipend_label([p.stipend for p in dept_placements_rows]),
                "topCompany": company_counter.most_common(1)[0][0] if company_counter else "—",
            }
        )

    months = common.last_months(6)
    trend = {m["key"]: {"month": m["label"], "placements": 0, "internships": 0, "applications": 0} for m in months}
    for p in placements:
        key = p.created_at.strftime("%Y-%m")
        if key in trend:
            trend[key]["placements"] += 1
            if p.type == PlacementType.INTERNSHIP:
                trend[key]["internships"] += 1
    for a in Application.objects.filter(student__in=students):
        key = a.applied_at.strftime("%Y-%m")
        if key in trend:
            trend[key]["applications"] += 1
    placement_trends = [trend[m["key"]] for m in months]

    skill_metrics = _skill_metrics(institution, students)

    readiness_distribution = []
    for dept in institution.departments.all():
        members = [s for s in students if s.student_profile.department_id == dept.id]
        dist = {"beginning": 0, "developing": 0, "jobReady": 0}
        for s in members:
            band = readiness_map[s.id]["readiness"]
            dist["beginning" if band == "Beginning" else ("developing" if band == "Developing" else "jobReady")] += 1
        readiness_distribution.append(
            {
                "department": dept.name,
                "beginning": dist["beginning"],
                "developing": dist["developing"],
                "jobReady": dist["jobReady"],
                "total": len(members),
            }
        )

    anomalies = []
    for flag in AnomalyFlag.objects.filter(student__student_profile__institution=institution).select_related("student"):
        anomalies.append(
            {
                "id": f"an-{flag.id}",
                "studentName": flag.student.display_name,
                "studentInitials": flag.student.initials,
                "department": flag.student.student_profile.display_department,
                "type": flag.type,
                "description": flag.description,
                "severity": flag.severity,
                "status": flag.status,
                "flaggedDate": fmt_date(flag.flagged_at),
                "evidence": flag.evidence,
            }
        )

    reports = []
    for r in InstitutionalReport.objects.filter(institution=institution):
        reports.append(
            {
                "id": f"rpt-{r.id}",
                "title": r.title,
                "type": r.type,
                "period": r.period,
                "generatedDate": fmt_date(r.generated_at),
                "departments": r.departments,
                "summary": r.summary,
                "keyFindings": r.key_findings,
                "status": r.status,
            }
        )

    return {
        "institution": _institution_block(institution),
        "placements": [_placement_block(p) for p in placements],
        "departmentPlacements": dept_placements,
        "placementTrends": placement_trends,
        "skillMetrics": skill_metrics,
        "readinessDistribution": readiness_distribution,
        "departmentComparison": _dept_comparison(institution, students, readiness_map),
        "anomalies": anomalies,
        "reports": reports,
        "analytics": _analytics_block(institution, students, readiness_map, placements),
    }
