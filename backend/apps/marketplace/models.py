"""
Marketplace between industry (recruiters) and students.

Opportunities belong to an IndustryProfile. Students apply through
Application rows; the industry moves those rows along the hiring pipeline
(applied → shortlisted → interviewed → offered → joined / rejected).
"""
from django.conf import settings
from django.db import models


class OpportunityType(models.TextChoices):
    INTERNSHIP = "Internship", "Internship"
    PLACEMENT = "Placement", "Placement"
    PART_TIME = "Part-time", "Part-time"


class WorkArrangement(models.TextChoices):
    ONSITE = "On-site", "On-site"
    REMOTE = "Remote", "Remote"
    HYBRID = "Hybrid", "Hybrid"


class OpportunityStatus(models.TextChoices):
    DRAFT = "draft", "draft"
    ACTIVE = "active", "active"
    PAUSED = "paused", "paused"
    CLOSED = "closed", "closed"
    CLOSING = "closing", "closing"


class SkillRequirementPriority(models.TextChoices):
    ESSENTIAL = "essential", "essential"
    PREFERRED = "preferred", "preferred"


class Opportunity(models.Model):
    company = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="opportunities")
    title = models.CharField(max_length=240)
    type = models.CharField(max_length=16, choices=OpportunityType.choices, default=OpportunityType.INTERNSHIP)
    description = models.TextField(blank=True, default="")
    openings = models.PositiveIntegerField(default=1)
    location = models.CharField(max_length=160, blank=True, default="")
    work_arrangement = models.CharField(max_length=12, choices=WorkArrangement.choices, default=WorkArrangement.ONSITE)
    duration = models.CharField(max_length=80, blank=True, default="")
    stipend = models.CharField(max_length=80, blank=True, default="")
    deadline = models.DateField(null=True, blank=True)
    # Eligibility envelope (qualification/courses/experience/otherCriteria).
    eligibility_qualification = models.CharField(max_length=240, blank=True, default="")
    eligibility_courses = models.JSONField(default=list, blank=True)
    eligibility_experience = models.CharField(max_length=160, blank=True, default="")
    eligibility_other = models.TextField(blank=True, default="")
    registration_requirements = models.TextField(blank=True, default="")
    status = models.CharField(max_length=10, choices=OpportunityStatus.choices, default=OpportunityStatus.ACTIVE)
    blind_shortlisting = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "marketplace_opportunity"
        ordering = ["-created_at"]

    @property
    def shortlisted_count(self) -> int:
        return self.applications.filter(stage__in=["shortlisted", "interviewed", "offered", "joined"]).count()

    def __str__(self) -> str:
        return f"{self.title} @ {self.company.industry_profile.name}"


class OpportunitySkill(models.Model):
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE, related_name="required_skills")
    skill = models.ForeignKey("catalog.Skill", on_delete=models.CASCADE, related_name="opportunities_needing")
    required = models.CharField(
        max_length=10,
        choices=SkillRequirementPriority.choices,
        default=SkillRequirementPriority.ESSENTIAL,
    )
    min_proficiency = models.PositiveIntegerField(default=60)

    class Meta:
        db_table = "marketplace_opportunity_skill"
        constraints = [
            models.UniqueConstraint(fields=["opportunity", "skill"], name="uniq_opportunity_skill")
        ]


class ApplicationStage(models.TextChoices):
    APPLIED = "applied", "applied"
    SHORTLISTED = "shortlisted", "shortlisted"
    INTERVIEWED = "interviewed", "interviewed"
    OFFERED = "offered", "offered"
    JOINED = "joined", "joined"
    REJECTED = "rejected", "rejected"


class Application(models.Model):
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE, related_name="applications")
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applications")
    stage = models.CharField(max_length=14, choices=ApplicationStage.choices, default=ApplicationStage.APPLIED)
    notes = models.TextField(blank=True, default="")
    interview_date = models.DateTimeField(null=True, blank=True)
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "marketplace_application"
        ordering = ["-updated_at"]
        constraints = [
            models.UniqueConstraint(fields=["opportunity", "student"], name="uniq_application_opportunity_student")
        ]

    def __str__(self) -> str:
        return f"{self.student.email} → {self.opportunity.title} ({self.stage})"


class Rating(models.Model):
    """Reciprocal student ⇄ industry ratings after an engagement."""

    class SubjectType(models.TextChoices):
        STUDENT = "student", "student"
        INDUSTRY = "industry", "industry"

    rater = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="ratings_given")
    ratee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="ratings_received")
    ratee_type = models.CharField(max_length=12, choices=SubjectType.choices)
    score = models.PositiveSmallIntegerField(default=5)  # 1-5
    feedback = models.TextField(blank=True, default="")
    opportunity = models.ForeignKey(
        Opportunity, null=True, blank=True, on_delete=models.SET_NULL, related_name="ratings"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "marketplace_rating"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.rater.email} → {self.ratee.email}: {self.score}★"
