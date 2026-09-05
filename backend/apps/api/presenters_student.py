"""GET /api/student/dashboard — mirrors `src/lib/student-api.ts` StudentDashboard."""
from __future__ import annotations

from datetime import datetime

from apps.catalog.models import LearningResource
from apps.credentials.models import (
    EvidenceItem,
    EvidenceKind,
    ProjectRecommendation,
    ProjectSubmission,
)
from apps.credentials.services import (
    compute_gaps,
    compute_readiness,
    opportunity_match,
    passport,
    simulate_improvements,
    student_target_role,
)
from apps.marketplace.models import Application, OpportunityStatus
from apps.governance.models import Placement
from .presenters_common import days_ago_label, fmt_date, fmt_month_year, stage_label

READINESS_MAP = {"Job-Ready": "Ready", "Developing": "Almost Ready", "Beginning": "Needs Development"}


def _student_block(student) -> dict:
    profile = student.student_profile
    completion = 40
    for value in (
        profile.roll_number,
        profile.display_institution,
        profile.course,
        profile.location,
        profile.bio,
        profile.target_role_name,
    ):
        if value:
            completion += 10
    return {
        "id": f"st-{student.id}",
        "name": student.display_name,
        "initials": student.initials,
        "email": student.email,
        "phone": student.phone,
        "bio": profile.bio,
        "institution": profile.display_institution,
        "course": profile.course,
        "department": profile.display_department,
        "year": profile.year,
        "graduationYear": profile.graduation_year or 0,
        "location": profile.location,
        "targetRole": profile.target_role_name or (
            profile.target_role.name if profile.target_role else ""
        ),
        "profileCompletion": min(100, completion),
    }


def _opportunity_block(student, opportunity) -> dict:
    match = opportunity_match(student, opportunity)
    required_skills = [
        req.skill.name
        for req in opportunity.required_skills.select_related("skill").order_by("id")
    ]
    return {
        "id": f"op-{opportunity.id}",
        "title": opportunity.title,
        "type": opportunity.type,
        "org": opportunity.company.industry_profile.name,
        "location": opportunity.location,
        "duration": opportunity.duration,
        "stipend": opportunity.stipend,
        "deadline": fmt_date(opportunity.deadline),
        "match": match["match"],
        "matchedSkills": match["matchedSkills"],
        "missingSkills": match["missingSkills"],
        "requiredSkills": required_skills,
        "description": opportunity.description,
        "workArrangement": opportunity.work_arrangement,
        "openings": opportunity.openings,
    }


def _application_block(application) -> dict:
    opportunity = application.opportunity
    company = opportunity.company.industry_profile
    student = application.student
    match = opportunity_match(student, opportunity)
    status = stage_label(application.stage)
    next_step = ""
    if application.stage in ("applied", "shortlisted") and opportunity.deadline:
        delta = (opportunity.deadline - datetime.now().date()).days
        next_step = f"{status} · deadline in {max(delta, 0)} day{'s' if delta != 1 else ''}"
    if application.stage == "shortlisted" and application.interview_date:
        next_step = f"Interview: {fmt_date(application.interview_date)}"
    if application.stage == "interviewed":
        next_step = "Awaiting decision"
    if application.stage == "offered":
        next_step = "Review and accept offer"
    return {
        "id": f"ap-{application.id}",
        "opportunityId": f"op-{opportunity.id}",
        "role": opportunity.title,
        "org": company.name,
        "stage": application.stage,
        "stageLabel": status,
        "status": next_step or status,
        "nextStep": next_step or "",
        "match": match["match"],
        "appliedDate": fmt_date(application.applied_at),
    }


def _recommendation_block(resource: LearningResource) -> dict:
    return {
        "id": f"rc-{resource.id}",
        "closesGap": (resource.closes_gap.name if resource.closes_gap else resource.closes_gap_name),
        "title": resource.title,
        "type": resource.kind,
        "provider": resource.provider,
        "duration": resource.duration,
        "rating": float(resource.rating),
        "why": resource.why,
        "projectedImprovement": resource.boost_points,
    }


def _portfolio_block(student) -> dict:
    evidence = list(
        EvidenceItem.objects.filter(student=student)
        .select_related()
        .order_by("-created_at")
    )
    projects_evidence = [e for e in evidence if e.kind == EvidenceKind.PROJECT]
    certificates = [e for e in evidence if e.kind == EvidenceKind.CERTIFICATE]
    publications = [e for e in evidence if e.kind == EvidenceKind.PUBLICATION]
    submissions = list(ProjectSubmission.objects.filter(student=student, status__in=["pending review", "verified"]))
    placements = list(Placement.objects.filter(student=student))

    featured = []
    for e in projects_evidence[:3]:
        featured.append(
            {
                "id": f"pf-{e.id}",
                "title": e.title,
                "description": e.description,
                "skills": e.extracted_skills or [],
                "date": fmt_month_year(e.issued_on or e.created_at),
            }
        )
    for s in submissions[: 3 - len(featured)]:
        featured.append(
            {
                "id": f"pf-s{s.id}",
                "title": s.project.title,
                "description": s.notes,
                "skills": [s.project.target_skill.name],
                "date": fmt_month_year(s.submitted_at),
            }
        )

    return {
        "projects": len(projects_evidence) + len(submissions),
        "certificates": len(certificates),
        "verifiedSkills": sum(1 for c in student.skill_claims.all() if c.is_verified),
        "internshipHours": sum(200 for _ in placements),
        "achievements": len(publications) + len(placements),
        "featured": featured[:3],
    }


def build_student_dashboard(student) -> dict:
    role = student_target_role(student)
    submissions = {
        s.project_id: s
        for s in ProjectSubmission.objects.filter(student=student)
    }

    projects = []
    for rec in ProjectRecommendation.objects.select_related("target_skill").order_by("id"):
        submission = submissions.get(rec.id)
        projects.append(
            {
                "id": f"rp-{rec.id}",
                "title": rec.title,
                "description": rec.description,
                "targetSkill": rec.target_skill.name,
                "skillGapId": f"gap-{rec.target_skill.taxonomy_id}",
                "difficulty": rec.difficulty,
                "estimatedDuration": rec.estimated_duration,
                "deliverables": rec.deliverables,
                "verificationCriteria": rec.verification_criteria,
                "submissionStatus": submission.status if submission else "not submitted",
            }
        )

    from apps.marketplace.models import Opportunity

    applications = list(
        Application.objects.filter(student=student).select_related("opportunity__company__industry_profile")
    )
    application_ids = {a.opportunity_id for a in applications}
    opportunities_qs = Opportunity.objects.filter(
        status__in=[OpportunityStatus.ACTIVE, OpportunityStatus.CLOSING]
    ).select_related("company__industry_profile")
    recommended_qs = [o for o in opportunities_qs if o.id not in application_ids]

    return {
        "student": _student_block(student),
        "skillPassport": passport(student),
        "roleReadiness": compute_readiness(student, role),
        "gaps": compute_gaps(student, role),
        "simulator": simulate_improvements(student),
        "recommendedProjects": projects,
        "opportunities": [_opportunity_block(student, o) for o in recommended_qs],
        "applications": [_application_block(a) for a in applications],
        "recommendations": [
            _recommendation_block(r)
            for r in LearningResource.objects.select_related("closes_gap").order_by("id")
        ],
        "portfolio": _portfolio_block(student),
    }
