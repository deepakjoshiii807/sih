"""
Institution-wide governance & intelligence data used by the institution-admin
and academician dashboards:
  - Placement records & trends
  - Anomaly flags (fraud / data-quality review queue)
  - Institutional + curriculum reports (aggregated, anonymised)
  - Department × skill intelligence metrics (feeds the curriculum loop)
  - Monthly industry-demand trend snapshots per skill
"""
from django.conf import settings
from django.db import models

from apps.catalog.models import DemandLevel, TrendDirection


class PlacementType(models.TextChoices):
    INTERNSHIP = "Internship", "Internship"
    PLACEMENT = "Placement", "Placement"


class PlacementStatus(models.TextChoices):
    ACTIVE = "active", "active"
    COMPLETED = "completed", "completed"
    OFFERED = "offered", "offered"


class Placement(models.Model):
    institution = models.ForeignKey(
        "catalog.Institution", null=True, blank=True, on_delete=models.SET_NULL, related_name="placements"
    )
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="placements")
    company_name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    type = models.CharField(max_length=12, choices=PlacementType.choices, default=PlacementType.INTERNSHIP)
    start_date = models.DateField(null=True, blank=True)
    duration = models.CharField(max_length=80, blank=True, default="")
    stipend = models.CharField(max_length=80, blank=True, default="")
    status = models.CharField(max_length=12, choices=PlacementStatus.choices, default=PlacementStatus.ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "governance_placement"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.student.email} → {self.company_name} ({self.role})"


class AnomalyType(models.TextChoices):
    DUPLICATE = "Duplicate Record", "Duplicate Record"
    INCONSISTENT = "Inconsistent Data", "Inconsistent Data"
    OUTLIER = "Statistical Outlier", "Statistical Outlier"
    UNUSUAL = "Unusual Pattern", "Unusual Pattern"


class AnomalySeverity(models.TextChoices):
    HIGH = "high", "high"
    MEDIUM = "medium", "medium"
    LOW = "low", "low"


class AnomalyStatus(models.TextChoices):
    FLAGGED = "flagged", "flagged"
    REVIEWING = "reviewing", "reviewing"
    RESOLVED = "resolved", "resolved"
    ESCALATED = "escalated", "escalated"


class AnomalyFlag(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="anomalies")
    type = models.CharField(max_length=24, choices=AnomalyType.choices, default=AnomalyType.DUPLICATE)
    description = models.TextField(blank=True, default="")
    severity = models.CharField(max_length=8, choices=AnomalySeverity.choices, default=AnomalySeverity.MEDIUM)
    status = models.CharField(max_length=10, choices=AnomalyStatus.choices, default=AnomalyStatus.FLAGGED)
    evidence = models.TextField(blank=True, default="")
    flagged_at = models.DateTimeField(auto_now_add=True)
    decided_at = models.DateTimeField(null=True, blank=True)
    decided_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name="decided_anomalies"
    )
    resolution_note = models.TextField(blank=True, default="")

    class Meta:
        db_table = "governance_anomaly_flag"
        ordering = ["-flagged_at"]

    def __str__(self) -> str:
        return f"{self.student.email} · {self.type} [{self.severity}/{self.status}]"


class ReportType(models.TextChoices):
    PLACEMENT = "Placement", "Placement"
    SKILL_DEV = "Skill Development", "Skill Development"
    INTERNSHIP = "Internship", "Internship"
    READINESS = "Readiness", "Readiness"
    INDUSTRY = "Industry Engagement", "Industry Engagement"
    ANOMALY = "Anomaly", "Anomaly"


class ReportStatus(models.TextChoices):
    READY = "ready", "ready"
    GENERATING = "generating", "generating"


class InstitutionalReport(models.Model):
    institution = models.ForeignKey(
        "catalog.Institution", null=True, blank=True, on_delete=models.SET_NULL, related_name="reports"
    )
    title = models.CharField(max_length=240)
    type = models.CharField(max_length=24, choices=ReportType.choices, default=ReportType.PLACEMENT)
    period = models.CharField(max_length=120, blank=True, default="")
    generated_at = models.DateField(auto_now_add=True)
    departments = models.JSONField(default=list, blank=True)  # names; ["All"] for institution-wide
    summary = models.TextField(blank=True, default="")
    key_findings = models.JSONField(default=list, blank=True)
    status = models.CharField(max_length=12, choices=ReportStatus.choices, default=ReportStatus.READY)

    class Meta:
        db_table = "governance_institutional_report"
        ordering = ["-generated_at"]

    def __str__(self) -> str:
        return self.title


class ReadinessBand(models.TextChoices):
    BEGINNING = "beginning", "Beginning"
    DEVELOPING = "developing", "Developing"
    JOB_READY = "job-ready", "Job-Ready"


class CurriculumReport(models.Model):
    """Anonymised, aggregated report for a department (academician view)."""

    department = models.ForeignKey("catalog.Department", on_delete=models.CASCADE, related_name="curriculum_reports")
    generated_at = models.DateField(auto_now_add=True)
    total_students = models.PositiveIntegerField(default=0)
    avg_readiness = models.PositiveIntegerField(default=0)
    readiness_distribution = models.JSONField(default=dict)  # {"beginning": n, "developing": n, "jobReady": n}
    top_gaps = models.JSONField(default=list)  # [{skill, gapCount, severity}]
    coverage_gaps = models.JSONField(default=list)  # [{skill, coverage, demand}]
    recommendations = models.JSONField(default=list)  # [str]
    insights = models.JSONField(default=list)  # [{skill, demandLevel, coverage, studentsWithGap}]

    class Meta:
        db_table = "governance_curriculum_report"
        ordering = ["-generated_at"]

    def __str__(self) -> str:
        return f"{self.department.name} report · {self.generated_at}"


class GapSeverity(models.TextChoices):
    CRITICAL = "Critical", "Critical"
    MODERATE = "Moderate", "Moderate"
    ACCEPTABLE = "Acceptable", "Acceptable"


class DepartmentSkillMetric(models.Model):
    """Snapshot: how a department's curriculum covers a demanded skill."""

    department = models.ForeignKey("catalog.Department", on_delete=models.CASCADE, related_name="skill_metrics")
    skill = models.ForeignKey("catalog.Skill", on_delete=models.CASCADE, related_name="dept_metrics")
    industry_demand = models.CharField(max_length=10, choices=DemandLevel.choices, default=DemandLevel.MEDIUM)
    curriculum_coverage = models.PositiveIntegerField(default=0)  # %
    student_proficiency = models.PositiveIntegerField(default=0)  # avg %
    gap_severity = models.CharField(max_length=12, choices=GapSeverity.choices, default=GapSeverity.MODERATE)
    trend = models.CharField(max_length=10, choices=TrendDirection.choices, default=TrendDirection.STABLE)
    students_with_gap = models.PositiveIntegerField(default=0)
    total_students = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "governance_department_skill_metric"
        constraints = [
            models.UniqueConstraint(fields=["department", "skill"], name="uniq_dept_skill_metric")
        ]
        ordering = ["skill__name"]

    def __str__(self) -> str:
        return f"{self.department.name} × {self.skill.name}"


class AcademicOpportunityCategory(models.TextChoices):
    FDP = "FDP", "FDP"
    INDUSTRIAL_TRAINING = "Industrial Training", "Industrial Training"
    CONSULTANCY = "Consultancy", "Consultancy"
    RESEARCH_COLLABORATION = "Research Collaboration", "Research Collaboration"


class AcademicOpportunityStatus(models.TextChoices):
    OPEN = "open", "open"
    CLOSING = "closing", "closing"
    CLOSED = "closed", "closed"


class AcademicianOpportunity(models.Model):
    """FDP / industrial training / consultancy / research collaboration posts."""

    category = models.CharField(max_length=28, choices=AcademicOpportunityCategory.choices, default=AcademicOpportunityCategory.FDP)
    title = models.CharField(max_length=240)
    organizer = models.CharField(max_length=200, blank=True, default="")
    location = models.CharField(max_length=160, blank=True, default="")
    duration = models.CharField(max_length=80, blank=True, default="")
    deadline = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True, default="")
    skills_relevant = models.JSONField(default=list, blank=True)
    status = models.CharField(max_length=10, choices=AcademicOpportunityStatus.choices, default=AcademicOpportunityStatus.OPEN)
    interested = models.PositiveIntegerField(default=0)
    posted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name="posted_academic_opportunities"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "governance_academician_opportunity"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.title} ({self.category})"


class DemandTrend(models.Model):
    """Monthly industry-demand snapshot for one skill."""

    skill = models.ForeignKey("catalog.Skill", on_delete=models.CASCADE, related_name="demand_trends")
    month = models.CharField(max_length=7, default="2025-09")  # YYYY-MM
    direction = models.CharField(max_length=10, choices=TrendDirection.choices, default=TrendDirection.STABLE)
    demand_level = models.CharField(max_length=10, choices=DemandLevel.choices, default=DemandLevel.MEDIUM)
    change_percent = models.IntegerField(default=0)
    openings = models.PositiveIntegerField(default=0)
    period_label = models.CharField(max_length=40, blank=True, default="Last 6 months")

    class Meta:
        db_table = "governance_demand_trend"
        constraints = [models.UniqueConstraint(fields=["skill", "month"], name="uniq_skill_month")]
        ordering = ["month"]

    def __str__(self) -> str:
        return f"{self.skill.name} {self.month} {self.direction} {self.change_percent}%"
