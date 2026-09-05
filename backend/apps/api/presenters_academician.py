"""GET /api/academician/dashboard — mirrors `src/lib/faculty-api.ts` AcademicianDashboard."""
from __future__ import annotations

from collections import Counter, defaultdict
from datetime import date

from apps.accounts.models import Role, User
from apps.catalog.models import DemandLevel, Skill
from apps.credentials.models import EvidenceItem, SkillClaim, VerificationRequest
from apps.credentials.services import compute_readiness
from apps.governance.models import (
    CurriculumReport,
    DepartmentSkillMetric,
    DemandTrend,
    GapSeverity,
    Placement,
)
from apps.marketplace.models import Application, Opportunity, OpportunityStatus
from .presenters_common import fmt_date, fmt_month_year, initials_for, rounded, safe_div
from . import presenters_common as common


def _academician_block(user) -> dict:
    profile = user.academician_profile
    return {
        "name": user.display_name,
        "initials": user.initials,
        "title": profile.designation,
        "department": profile.display_department,
        "institution": profile.display_institution,
        "email": user.email,
        "phone": user.phone,
        "bio": profile.bio,
        "subjects": profile.subjects,
        "researchInterests": profile.research_interests,
        "experience": profile.experience_years,
        "studentsCount": User.objects.filter(
            role=Role.STUDENT, student_profile__department=profile.department
        ).count()
        if profile.department
        else 0,
        "verifiedCount": VerificationRequest.objects.filter(
            student__student_profile__department=profile.department, status="approved"
        ).count()
        if profile.department
        else 0,
    }


def _dept_students(user) -> list:
    dept = user.academician_profile.department
    if dept is None:
        return []
    return list(
        User.objects.filter(role=Role.STUDENT, student_profile__department=dept)
        .select_related("student_profile")
        .prefetch_related("skill_claims")
    )


def _readiness_distribution(students) -> dict:
    dist = {"beginning": 0, "developing": 0, "jobReady": 0}
    for student in students:
        score = compute_readiness(student)["readinessScore"]
        if score >= 80:
            dist["jobReady"] += 1
        elif score >= 50:
            dist["developing"] += 1
        else:
            dist["beginning"] += 1
    return dist


def _industry_roles_block(user) -> list:
    """Roles in demand, aggregated from live opportunities + applications."""
    dept_students = {s.id: s for s in _dept_students(user)}
    opps = list(
        Opportunity.objects.filter(status__in=[OpportunityStatus.ACTIVE, OpportunityStatus.CLOSING])
        .prefetch_related("required_skills__skill")
        .order_by("-created_at")
    )
    by_title: dict = defaultdict(list)
    for opp in opps:
        by_title[opp.title].append(opp)

    blocks = []
    for title, group in by_title.items():
        openings = sum(o.openings for o in group)
        applicants = 0
        match_scores = []
        for opp in group:
            for app in opp.applications.select_related("student"):
                applicants += 1
                student = app.student
                if student.id in dept_students:
                    score = compute_readiness(student)["readinessScore"]
                    match_scores.append(score)
        demand = DemandLevel.HIGH if applicants >= 10 else (DemandLevel.MEDIUM if applicants >= 3 else DemandLevel.LOW)
        blocks.append(
            {
                "title": title,
                "demandLevel": demand,
                "openings": openings,
                "avgMatch": rounded(sum(match_scores) / len(match_scores)) if match_scores else 0,
                "topSkills": [r.skill.name for o in group for r in o.required_skills.all()[:3]][:3],
            }
        )
    return sorted(blocks, key=lambda b: -b["openings"])[:8]


def _curriculum_report_block(user) -> dict:
    dept = user.academician_profile.department
    students = _dept_students(user)
    report = None
    if dept is not None:
        report = CurriculumReport.objects.filter(department=dept).first()

    if report:
        top_gaps = report.top_gaps or []
        coverage = report.coverage_gaps or []
        recs = report.recommendations or []
        dist = report.readiness_distribution or _readiness_distribution(students)
    else:
        metrics = (
            DepartmentSkillMetric.objects.filter(department=dept).select_related("skill")
            if dept
            else []
        )
        top_gaps = [
            {
                "skill": m.skill.name,
                "gapCount": m.students_with_gap,
                "severity": m.gap_severity,
            }
            for m in sorted(metrics, key=lambda m: -m.students_with_gap)[:4]
        ]
        coverage = [
            {"skill": m.skill.name, "coverage": m.curriculum_coverage, "demand": m.industry_demand}
            for m in metrics
        ]
        recs = [
            f"Introduce a module on {m.skill.name} to close the {'critical' if m.gap_severity == GapSeverity.CRITICAL else 'ongoing'} curriculum gap"
            for m in metrics
            if m.gap_severity in (GapSeverity.CRITICAL, GapSeverity.MODERATE)
        ]
        dist = _readiness_distribution(students)

    total = sum(dist.values()) or 1
    avg = int(
        round(
            sum(
                {"beginning": 40, "developing": 65, "jobReady": 90}.get(k, 65) * v for k, v in dist.items()
            )
            / total
        )
    )
    return {
        "id": f"rpt-{dept.id if dept else 'x'}",
        "department": dept.name if dept else "—",
        "generatedDate": fmt_month_year(report.generated_at) if report else "Latest",
        "totalStudents": len(students),
        "avgReadiness": avg,
        "readinessDistribution": dist,
        "topGaps": top_gaps,
        "coverageGaps": coverage if report else coverage,
        "recommendations": recs,
    }


def _verification_blocks(user) -> list:
    dept = user.academician_profile.department
    qs = VerificationRequest.objects.filter(student__student_profile__department=dept).select_related(
        "student", "evidence"
    )
    blocks = []
    for v in qs:
        student = v.student
        blocks.append(
            {
                "id": f"v-{v.id}",
                "studentName": student.display_name,
                "studentInitials": student.initials,
                "title": v.title,
                "type": v.type,
                "submittedDate": fmt_date(v.submitted_at),
                "status": v.status,
                "skillsClaimed": v.skills_claimed,
                "description": v.description,
                "evidenceUrl": v.evidence.file_url if v.evidence else "",
            }
        )
    return blocks


def _faculty_opportunities_block() -> list:
    from apps.governance.models import AcademicianOpportunity

    blocks = []
    for o in AcademicianOpportunity.objects.order_by("id"):
        blocks.append(
            {
                "id": f"ao-{o.id}",
                "title": o.title,
                "category": o.category,
                "organizer": o.organizer,
                "location": o.location,
                "duration": o.duration,
                "deadline": fmt_date(o.deadline),
                "description": o.description,
                "skillsRelevant": o.skills_relevant,
                "status": o.status,
                "interested": o.interested,
            }
        )
    return blocks


def _curriculum_loop_block(user, students) -> list:
    dept = user.academician_profile.department
    metrics = (
        DepartmentSkillMetric.objects.filter(department=dept).select_related("skill")
        if dept
        else []
    )
    worst = max(metrics, key=lambda m: m.students_with_gap, default=None)
    report = CurriculumReport.objects.filter(department=dept).first() if dept else None
    dist = _readiness_distribution(students)
    total = sum(dist.values()) or 1

    insights = [
        (
            "Industry Demand",
            f"{(worst.skill.name if worst else 'Clinical research')} skills carry {(worst.industry_demand if worst else 'High')} industry demand"
            if worst
            else "Industry postings are being tracked for your department",
        ),
        (
            "Skill Gap Detection",
            f"{worst.students_with_gap} of {worst.total_students} students lack {worst.skill.name} proficiency"
            if worst
            else "No skill-gap rows yet — run detection after curriculum mapping",
        ),
        (
            "Department Report",
            f"Report generated for {dept.name if dept else 'your department'} · {fmt_month_year(report.generated_at) if report else 'pending'}",
        ),
        (
            "Academic Intervention",
            "Curriculum committee review scheduled after department report",
        ),
        (
            "Student Skill Development",
            f"{dist['developing'] + dist['jobReady']} of {total} students on track; gap-closing courses assigned",
        ),
        (
            "Reassessment",
            f"Scheduled after interventions — {round(100 * dist['jobReady'] / total)}% currently job-ready",
        ),
    ]
    steps = []
    for i, (label, insight) in enumerate(insights, start=1):
        if i == 1:
            status = "completed"
        elif i == 2:
            status = "completed" if worst else "upcoming"
        elif i == 3:
            status = "completed" if report else "upcoming"
        elif i == 4:
            status = "current" if report else "upcoming"
        else:
            status = "upcoming"
        steps.append({"id": i, "label": label, "description": insight, "status": status, "insight": insight})
    return steps


def _analytics_block(user, students) -> dict:
    dept = user.academician_profile.department
    total = len(students)
    skill_counter: Counter = Counter()
    verified: Counter = Counter()
    for student in students:
        for c in SkillClaim.objects.filter(student=student).select_related("skill"):
            skill_counter[c.skill.name] += 1
            if c.is_verified:
                verified[c.skill.name] += 1

    dist = _readiness_distribution(students)
    readiness_sum = sum(compute_readiness(s)["readinessScore"] for s in students)
    # opportunity avg match across dept students vs live openings
    match_sum = 0
    for student in students:
        from apps.credentials.services import opportunity_match
        from apps.marketplace.models import Opportunity as Opp

        opps = Opp.objects.filter(status__in=["active", "closing"])[:3]
        scores = [opportunity_match(student, o)["match"] for o in opps]
        match_sum += max(scores) if scores else 0
    avg_match = rounded(match_sum / total) if total else 0

    placements = (
        Placement.objects.filter(student__student_profile__department=dept) if dept else Placement.objects.none()
    )
    evidence_qs = EvidenceItem.objects.filter(student__student_profile__department=dept) if dept else EvidenceItem.objects.none()

    monthly = []
    month_buckets: dict = {}
    for e in evidence_qs.filter(status="verified"):
        key = e.created_at.strftime("%Y-%m")
        month_buckets.setdefault(key, {"verified": 0, "placements": 0})
        month_buckets[key]["verified"] += 1
    for p in placements:
        key = p.created_at.strftime("%Y-%m")
        month_buckets.setdefault(key, {"verified": 0, "placements": 0})
        month_buckets[key]["placements"] += 1
    for key in sorted(month_buckets):
        month_buckets[key]["month"] = common.date_from_key(key).strftime("%b")
        monthly.append(month_buckets[key])

    dept_rows = []
    if dept and dept.institution_id:
        for other in dept.institution.departments.all():
            # `student_members` is the FK from StudentProfile — filter Users by
            # profile department instead so compute_readiness gets User objects.
            other_students = list(
                User.objects.filter(role=Role.STUDENT, student_profile__department=other).select_related(
                    "student_profile"
                )
            )
            other_readiness = [compute_readiness(s)["readinessScore"] for s in other_students]
            dept_rows.append(
                {
                    "dept": other.name,
                    "avgMatch": 0,
                    "avgReadiness": rounded(sum(other_readiness) / len(other_readiness)) if other_readiness else 0,
                }
            )

    return {
        "totalStudents": total,
        "avgSkills": rounded(sum(len(list(s.skill_claims.all())) for s in students) / total, 1) if total else 0,
        "avgMatch": avg_match,
        "avgReadiness": rounded(readiness_sum / total) if total else 0,
        "readinessDistribution": dist,
        "skillDistribution": [
            {"name": s, "count": c, "pct": round(c / total * 100) if total else 0}
            for s, c in skill_counter.most_common(8)
        ],
        "monthlyTrend": monthly,
        "departmentComparison": dept_rows,
    }


def build_academician_dashboard(user) -> dict:
    students = _dept_students(user)
    dept = user.academician_profile.department
    metrics = (
        list(DepartmentSkillMetric.objects.filter(department=dept).select_related("skill").order_by("-students_with_gap"))
        if dept
        else []
    )
    department_skills = [
        {
            "name": m.skill.name,
            "taxonomyId": m.skill.taxonomy_id,
            "industryDemand": m.industry_demand,
            "curriculumCoverage": m.curriculum_coverage,
            "studentProficiency": m.student_proficiency,
            "gapSeverity": m.gap_severity,
            "trend": m.trend,
            "studentsWithGap": m.students_with_gap,
            "totalStudents": m.total_students,
        }
        for m in metrics
    ]
    trends = list(DemandTrend.objects.select_related("skill").order_by("month"))
    demand_trends = [
        {
            "skill": t.skill.name,
            "direction": t.direction,
            "demandLevel": t.demand_level,
            "changePercent": t.change_percent,
            "period": t.period_label,
        }
        for t in trends[-8:]
    ]
    return {
        "academician": _academician_block(user),
        "departmentSkills": department_skills,
        "demandTrends": demand_trends,
        "industryRoles": _industry_roles_block(user),
        "curriculumReport": _curriculum_report_block(user),
        "verifications": _verification_blocks(user),
        "opportunities": _faculty_opportunities_block(),
        "curriculumLoop": _curriculum_loop_block(user, students),
        "analytics": _analytics_block(user, students),
    }
