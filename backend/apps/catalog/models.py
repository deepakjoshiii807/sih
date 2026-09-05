"""
Shared reference data used by every role:
  - Institution / Department hierarchy
  - Skill taxonomy (with an optional baseline industry-demand rating)
  - Target roles with their required-skill frameworks
  - Learning resources (courses / certifications / workshops) that close gaps
"""
from django.db import models


class DemandLevel(models.TextChoices):
    HIGH = "High", "High"
    MEDIUM = "Medium", "Medium"
    LOW = "Low", "Low"


class TrendDirection(models.TextChoices):
    UP = "up", "up"
    UP_STRONG = "up-strong", "up-strong"
    STABLE = "stable", "stable"
    DOWN = "down", "down"


class Institution(models.Model):
    name = models.CharField(max_length=240)
    initials = models.CharField(max_length=20, blank=True, default="")
    location = models.CharField(max_length=160, blank=True, default="")
    org_type = models.CharField(max_length=120, blank=True, default="Government Institute")
    established_year = models.PositiveIntegerField(null=True, blank=True)
    website = models.URLField(blank=True, default="")
    email = models.EmailField(blank=True, default="")
    phone = models.CharField(max_length=30, blank=True, default="")
    verified = models.BooleanField(default=True)
    total_students = models.PositiveIntegerField(default=0)
    total_faculty = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = "catalog_institution"

    def __str__(self) -> str:
        return self.name


class Department(models.Model):
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name="departments")
    name = models.CharField(max_length=160)
    code = models.CharField(max_length=30, blank=True, default="")

    class Meta:
        db_table = "catalog_department"
        constraints = [
            models.UniqueConstraint(fields=["institution", "name"], name="uniq_dept_per_institution")
        ]

    def __str__(self) -> str:
        return f"{self.institution.initials or self.institution_id} · {self.name}"


class SkillCategory(models.TextChoices):
    TECHNICAL = "Technical", "Technical"
    DOMAIN = "Domain", "Domain"
    RESEARCH = "Research", "Research"
    COMMUNICATION = "Communication", "Communication"
    MANAGEMENT = "Management", "Management"


class Skill(models.Model):
    taxonomy_id = models.CharField(max_length=30, unique=True)
    name = models.CharField(max_length=160, unique=True)
    category = models.CharField(max_length=30, choices=SkillCategory.choices, default=SkillCategory.DOMAIN)
    description = models.TextField(blank=True, default="")
    # Baseline industry demand used when no monthly trend row exists.
    industry_demand = models.CharField(max_length=10, choices=DemandLevel.choices, default=DemandLevel.MEDIUM)

    class Meta:
        db_table = "catalog_skill"

    def __str__(self) -> str:
        return f"{self.name} ({self.taxonomy_id})"


class TargetRole(models.Model):
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True, default="")
    category = models.CharField(max_length=120, blank=True, default="Clinical Research")

    class Meta:
        db_table = "catalog_target_role"

    def __str__(self) -> str:
        return self.name


class TargetRoleSkill(models.Model):
    """A skill a role requires, with minimum proficiency and importance."""

    class Priority(models.TextChoices):
        ESSENTIAL = "essential", "essential"
        PREFERRED = "preferred", "preferred"

    target_role = models.ForeignKey(TargetRole, on_delete=models.CASCADE, related_name="required_skills")
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name="required_in_roles")
    priority = models.CharField(max_length=12, choices=Priority.choices, default=Priority.ESSENTIAL)
    min_proficiency = models.PositiveIntegerField(default=60)

    class Meta:
        db_table = "catalog_target_role_skill"
        constraints = [
            models.UniqueConstraint(fields=["target_role", "skill"], name="uniq_role_skill")
        ]

    def __str__(self) -> str:
        return f"{self.target_role.name} <- {self.skill.name}"


class ResourceKind(models.TextChoices):
    COURSE = "Course", "Course"
    WORKSHOP = "Workshop", "Workshop"
    LEARNING_PATH = "Learning path", "Learning path"
    CERTIFICATION = "Certification", "Certification"
    PROJECT = "Project", "Project"


class LearningResource(models.Model):
    """A course / workshop / certification that improves one or more skills."""

    kind = models.CharField(max_length=24, choices=ResourceKind.choices, default=ResourceKind.COURSE)
    title = models.CharField(max_length=240)
    provider = models.CharField(max_length=160, blank=True, default="")
    duration = models.CharField(max_length=80, blank=True, default="")
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    url = models.URLField(blank=True, default="")
    why = models.TextField(blank=True, default="")
    # Gap-closing metadata used by the simulator & recommendations.
    closes_gap = models.ForeignKey(Skill, null=True, blank=True, on_delete=models.SET_NULL, related_name="resources")
    closes_gap_name = models.CharField(max_length=160, blank=True, default="")
    skills_improved = models.JSONField(default=list, blank=True)
    boost_points = models.PositiveIntegerField(default=15)
    description = models.TextField(blank=True, default="")

    class Meta:
        db_table = "catalog_learning_resource"

    def __str__(self) -> str:
        return f"{self.title} ({self.kind})"
