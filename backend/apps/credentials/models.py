"""
The student credential layer — the "Skill Passport".

Everything here is evidence-traceable: a SkillClaim is either backed by an
EvidenceItem (origin = "evidence") or explicitly self-declared by the student.
Academicians act on VerificationRequest rows to approve / flag / request
changes, which in turn flips the linked evidence (and claims) to verified.
"""
from django.conf import settings
from django.db import models


class EvidenceKind(models.TextChoices):
    CERTIFICATE = "Certificate", "Certificate"
    PROJECT = "Project", "Project"
    TRANSCRIPT = "Transcript", "Transcript"
    INTERNSHIP = "Internship", "Internship"
    PUBLICATION = "Publication", "Publication"
    PORTFOLIO = "Portfolio", "Portfolio"
    LOG = "Log", "Log"


class EvidenceStatus(models.TextChoices):
    VERIFIED = "verified", "verified"
    PROCESSING = "processing", "processing"
    NEEDS_REVIEW = "needs review", "needs review"


class EvidenceItem(models.Model):
    """A document (or record) a student uploads to back skill claims."""

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="evidence_items")
    title = models.CharField(max_length=240)
    kind = models.CharField(max_length=24, choices=EvidenceKind.choices, default=EvidenceKind.CERTIFICATE)
    issuer = models.CharField(max_length=200, blank=True, default="")
    issued_on = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=16, choices=EvidenceStatus.choices, default=EvidenceStatus.PROCESSING)
    file_url = models.URLField(blank=True, default="")
    description = models.TextField(blank=True, default="")
    # Skills suggested by NLP/structured extraction at upload time.
    extracted_skills = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "credentials_evidence_item"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.title} ({self.kind}, {self.status})"


class SkillClaim(models.Model):
    """One row per (student, skill) in the skill passport."""

    class Origin(models.TextChoices):
        EVIDENCE = "evidence", "evidence"
        SELF_DECLARED = "self-declared", "self-declared"

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="skill_claims")
    skill = models.ForeignKey("catalog.Skill", on_delete=models.CASCADE, related_name="claims")
    origin = models.CharField(max_length=14, choices=Origin.choices, default=Origin.SELF_DECLARED)
    confidence = models.PositiveIntegerField(default=50)  # 0-100
    evidence = models.ForeignKey(
        EvidenceItem, null=True, blank=True, on_delete=models.SET_NULL, related_name="skill_claims"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "credentials_skill_claim"
        constraints = [models.UniqueConstraint(fields=["student", "skill"], name="uniq_student_skill")]
        ordering = ["-confidence"]

    @property
    def is_verified(self) -> bool:
        if self.origin == SkillClaim.Origin.SELF_DECLARED:
            return False
        return bool(self.evidence and self.evidence.status == EvidenceStatus.VERIFIED)

    def __str__(self) -> str:
        return f"{self.student.email} · {self.skill.name} ({self.origin})"


class VerificationType(models.TextChoices):
    INTERNSHIP = "Internship", "Internship"
    PROJECT = "Project", "Project"
    CERTIFICATE = "Certificate", "Certificate"
    OUTCOME = "Outcome", "Outcome"
    SKILL_EVIDENCE = "Skill Evidence", "Skill Evidence"


class VerificationStatus(models.TextChoices):
    PENDING = "pending", "pending"
    APPROVED = "approved", "approved"
    FLAGGED = "flagged", "flagged"
    CHANGES_REQUESTED = "changes-requested", "changes-requested"


class VerificationRequest(models.Model):
    """A request for an academician to verify a student's evidence / outcome."""

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="verification_requests")
    reviewer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="reviewed_requests",
    )
    evidence = models.ForeignKey(
        EvidenceItem, null=True, blank=True, on_delete=models.SET_NULL, related_name="verification_requests"
    )
    title = models.CharField(max_length=240)
    type = models.CharField(max_length=20, choices=VerificationType.choices, default=VerificationType.PROJECT)
    description = models.TextField(blank=True, default="")
    skills_claimed = models.JSONField(default=list, blank=True)
    status = models.CharField(max_length=18, choices=VerificationStatus.choices, default=VerificationStatus.PENDING)
    review_notes = models.TextField(blank=True, default="")
    submitted_at = models.DateTimeField(auto_now_add=True)
    decided_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "credentials_verification_request"
        ordering = ["-submitted_at"]

    def __str__(self) -> str:
        return f"{self.title} ({self.student.email} → {self.status})"


class ProjectRecommendation(models.Model):
    """A recommended project that lets a student demonstrate a gap skill."""

    class Difficulty(models.TextChoices):
        BEGINNER = "Beginner", "Beginner"
        INTERMEDIATE = "Intermediate", "Intermediate"
        ADVANCED = "Advanced", "Advanced"

    title = models.CharField(max_length=240)
    description = models.TextField(blank=True, default="")
    target_skill = models.ForeignKey("catalog.Skill", on_delete=models.CASCADE, related_name="project_recommendations")
    difficulty = models.CharField(max_length=16, choices=Difficulty.choices, default=Difficulty.INTERMEDIATE)
    estimated_duration = models.CharField(max_length=80, blank=True, default="")
    deliverables = models.JSONField(default=list, blank=True)
    verification_criteria = models.JSONField(default=list, blank=True)

    class Meta:
        db_table = "credentials_project_recommendation"

    def __str__(self) -> str:
        return self.title


class ProjectSubmissionStatus(models.TextChoices):
    NOT_SUBMITTED = "not submitted", "not submitted"
    PENDING_REVIEW = "pending review", "pending review"
    VERIFIED = "verified", "verified"
    NEEDS_REVISION = "needs revision", "needs revision"


class ProjectSubmission(models.Model):
    """A student's attempt at a recommended project (skill-to-project loop)."""

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="project_submissions")
    project = models.ForeignKey(ProjectRecommendation, on_delete=models.CASCADE, related_name="submissions")
    status = models.CharField(
        max_length=20, choices=ProjectSubmissionStatus.choices, default=ProjectSubmissionStatus.NOT_SUBMITTED
    )
    submitted_at = models.DateTimeField(null=True, blank=True)
    submission_url = models.URLField(blank=True, default="")
    notes = models.TextField(blank=True, default="")
    reviewer = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name="reviewed_projects"
    )
    review_comment = models.TextField(blank=True, default="")

    class Meta:
        db_table = "credentials_project_submission"
        constraints = [
            models.UniqueConstraint(fields=["student", "project"], name="uniq_student_project_submission")
        ]

    def __str__(self) -> str:
        return f"{self.student.email} · {self.project.title} · {self.status}"
