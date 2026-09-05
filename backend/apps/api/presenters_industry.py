"""GET /api/industry/dashboard — mirrors `src/lib/industry-api.ts` IndustryDashboard."""
from __future__ import annotations

from collections import Counter
from datetime import date, datetime, timedelta

from apps.credentials.models import EvidenceItem, EvidenceKind, SkillClaim
from apps.credentials.services import compute_readiness, opportunity_match
from apps.marketplace.models import Application, ApplicationStage, Opportunity, Rating
from .presenters_common import fmt_date, fmt_month_year, initials_for, safe_div, stage_label

READINESS_TO_ROLE = {"Job-Ready": "Ready", "Developing": "Almost Ready", "Beginning": "Needs Development"}


def _company_block(profile) -> dict:
    return {
        "name": profile.name,
        "initials": initials_for(profile.name),
        "description": profile.description,
        "domain": profile.domain,
        "orgType": profile.org_type,
        "location": profile.location,
        "website": profile.website,
        "email": profile.company_email,
        "phone": profile.phone,
        "contactPerson": profile.contact_person,
        "verified": profile.verified,
        "foundedYear": profile.founded_year or 0,
        "size": profile.size,
    }


def _candidate_block(student) -> dict:
    claims = list(SkillClaim.objects.filter(student=student).select_related("skill", "evidence"))
    evidence = list(EvidenceItem.objects.filter(student=student).order_by("-created_at"))
    readiness = compute_readiness(student)
    role = READINESS_TO_ROLE.get(readiness["readiness"], "Needs Development")
    return {
        "id": student.id,
        "name": student.display_name,
        "initials": student.initials,
        "course": student.student_profile.course,
        "year": student.student_profile.year,
        "institution": student.student_profile.display_institution,
        "skills": [
            {
                "name": c.skill.name,
                "confidence": c.confidence,
                "verified": c.is_verified,
                "source": c.evidence.title if c.evidence else "",
            }
            for c in claims
        ],
        "verifiedSkills": sum(1 for c in claims if c.is_verified),
        "totalSkills": len(claims),
        "certifications": sum(1 for e in evidence if e.kind == EvidenceKind.CERTIFICATE),
        "projects": sum(
            1 for e in evidence if e.kind in (EvidenceKind.PROJECT, EvidenceKind.PORTFOLIO)
        ),
        "evidence": [
            {
                "type": e.kind,
                "title": e.title,
                "issuer": e.issuer,
                "date": fmt_month_year(e.issued_on or e.created_at),
                "verified": e.status == "verified",
            }
            for e in evidence
        ],
        "roleReadiness": role,
        "readinessScore": readiness["readinessScore"],
    }


def _application_block(application: Application, opp_title: str) -> dict:
    candidate = _candidate_block(application.student)
    match = opportunity_match(application.student, application.opportunity)
    return {
        "id": application.id,
        "candidate": candidate,
        "opportunityId": application.opportunity_id,
        "opportunityTitle": opp_title,
        "matchScore": match["match"],
        "matchedSkills": match["matchedSkills"],
        "missingSkills": match["missingSkills"],
        "stage": application.stage,
        "appliedDate": fmt_date(application.applied_at),
        "lastUpdated": fmt_date(application.updated_at),
        "notes": application.notes,
        "interviewDate": fmt_date(application.interview_date),
    }


def _opportunity_block(opportunity: Opportunity) -> dict:
    requirements = [
        {
            "skill": r.skill.name,
            "required": r.required,
            "minProficiency": r.min_proficiency,
        }
        for r in opportunity.required_skills.select_related("skill").order_by("id")
    ]
    return {
        "id": opportunity.id,
        "title": opportunity.title,
        "type": opportunity.type,
        "description": opportunity.description,
        "openings": opportunity.openings,
        "location": opportunity.location,
        "workArrangement": opportunity.work_arrangement,
        "duration": opportunity.duration,
        "stipend": opportunity.stipend,
        "deadline": fmt_date(opportunity.deadline),
        "eligibility": {
            "qualification": opportunity.eligibility_qualification,
            "courses": opportunity.eligibility_courses,
            "experience": opportunity.eligibility_experience,
            "otherCriteria": opportunity.eligibility_other,
        },
        "requiredSkills": requirements,
        "registrationRequirements": opportunity.registration_requirements,
        "status": opportunity.status,
        "totalApplicants": opportunity.applications.count(),
        "shortlistedCount": opportunity.shortlisted_count,
        "createdAt": fmt_date(opportunity.created_at),
        "blindShortlisting": opportunity.blind_shortlisting,
    }


def _sla_blocks(applications) -> list:
    today = date.today()
    blocks = []
    for app in applications:
        if app.stage not in ("applied", "shortlisted"):
            continue
        deadline = app.opportunity.deadline
        if deadline is None:
            continue
        remaining = (deadline - today).days
        if remaining < 0:
            sla_status = "overdue"
        elif remaining <= 3:
            sla_status = "warning"
        else:
            sla_status = "on-track"
        if app.stage == "shortlisted":
            # review deadlines count from shortlist update
            remaining = max(remaining, 0)
            sla_status = sla_status
        blocks.append(
            {
                "applicationId": app.id,
                "candidateName": app.student.display_name,
                "opportunityTitle": app.opportunity.title,
                "appliedDate": fmt_date(app.applied_at),
                "deadline": fmt_date(deadline),
                "timeRemaining": f"{max(remaining, 0)} day{'s' if remaining != 1 else ''}",
                "slaStatus": sla_status,
                "daysRemaining": max(remaining, 0),
            }
        )
    return blocks[:6]


def _analytics_block(company_user, opportunities, applications) -> dict:
    total_applicants = len(applications)
    pipeline = Counter(a.stage for a in applications)

    top_skills: Counter = Counter()
    applicant_skills: Counter = Counter()
    skill_gaps: Counter = Counter()
    for app in applications:
        claims = list(SkillClaim.objects.filter(student=app.student).select_related("skill"))
        skills = {c.skill.name for c in claims}
        for c in claims:
            if c.is_verified:
                applicant_skills[c.skill.name] += 1
            if c.confidence < 60:
                skill_gaps[c.skill.name] += 1
        match = opportunity_match(app.student, app.opportunity)
        top_skills.update(match["matchedSkills"])

    hired = pipeline["joined"] + pipeline["offered"]
    shortlisted_total = pipeline["shortlisted"] + pipeline["interviewed"] + hired

    monthly = []
    month_counts: dict = {}
    for a in applications:
        key = a.applied_at.strftime("%Y-%m")
        bucket = month_counts.setdefault(key, {"applicants": 0, "shortlisted": 0, "hired": 0})
        bucket["applicants"] += 1
        if a.stage in ("shortlisted", "interviewed", "offered", "joined"):
            bucket["shortlisted"] += 1
        if a.stage in ("joined", "offered"):
            bucket["hired"] += 1
    for key in sorted(month_counts):
        d = datetime.strptime(key, "%Y-%m")
        bucket = month_counts[key]
        monthly.append(
            {
                "month": d.strftime("%b"),
                "applicants": bucket["applicants"],
                "shortlisted": bucket["shortlisted"],
                "hired": bucket["hired"],
            }
        )

    opp_perf = []
    for opp in opportunities:
        opp_apps = [a for a in applications if a.opportunity_id == opp.id]
        avg_match = (
            round(sum(opportunity_match(a.student, opp)["match"] for a in opp_apps) / len(opp_apps))
            if opp_apps
            else 0
        )
        opp_perf.append(
            {
                "title": opp.title,
                "applicants": len(opp_apps),
                "fillRate": round(safe_div(sum(1 for a in opp_apps if a.stage in ("joined", "offered")), len(opp_apps))),
                "avgMatch": avg_match,
            }
        )

    denom = total_applicants or 1
    return {
        "totalOpportunities": len(opportunities),
        "activeOpportunities": sum(1 for o in opportunities if o.status == "active"),
        "totalApplicants": total_applicants,
        "shortlistingRate": round(shortlisted_total / denom * 100),
        "fillRate": round(hired / denom * 100),
        "avgTimeToHire": 0,
        "pipeline": [
            {"stage": stage_label(s), "count": pipeline[s]}
            for s in ("applied", "shortlisted", "interviewed", "offered", "joined")
        ],
        "topCandidateSkills": [
            {"skill": s, "count": c, "pct": round(c / denom * 100)}
            for s, c in top_skills.most_common(5)
        ],
        "applicantSkillGaps": [
            {"skill": s, "gapCount": c, "pct": round(c / denom * 100)}
            for s, c in skill_gaps.most_common(5)
        ],
        "monthlyTrend": monthly,
        "opportunityPerformance": opp_perf,
    }


def _ratings_block(ratings) -> list:
    blocks = []
    for r in ratings:
        from_name = r.rater.display_name
        from_type = "industry" if r.rater.role == "industry" else "student"
        to_type = "student" if r.ratee.role == "student" else "industry"
        blocks.append(
            {
                "id": r.id,
                "from": from_name,
                "fromType": from_type,
                "to": r.ratee.display_name,
                "toType": to_type,
                "score": r.score,
                "feedback": r.feedback,
                "date": fmt_month_year(r.created_at),
                "opportunity": r.opportunity.title if r.opportunity else "",
            }
        )
    return blocks


def build_industry_dashboard(company_user) -> dict:
    profile = company_user.industry_profile
    opportunities = list(
        Opportunity.objects.filter(company=company_user).prefetch_related("required_skills__skill")
    )
    applications = list(
        Application.objects.filter(opportunity__company=company_user).select_related(
            "student__student_profile", "opportunity"
        )
    )
    return {
        "company": _company_block(profile),
        "opportunities": [_opportunity_block(o) for o in opportunities],
        "applications": [_application_block(a, a.opportunity.title) for a in applications],
        "slaTrackers": _sla_blocks(applications),
        "analytics": _analytics_block(company_user, opportunities, applications),
        "ratings": _ratings_block(Rating.objects.filter(rater=company_user).select_related("opportunity")),
    }
