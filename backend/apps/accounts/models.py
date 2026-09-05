"""
User model + the four role profiles (student / industry / academician /
institution-admin). One user account maps to exactly one role, and each role
has a dedicated one-to-one profile with the fields its dashboard needs.
"""
from django.contrib.auth.models import AbstractUser
from django.db import models


class Role(models.TextChoices):
    STUDENT = "student", "Student"
    INDUSTRY = "industry", "Industry"
    ACADEMICIAN = "academician", "Academician"
    INSTITUTION_ADMIN = "institution_admin", "Institution Admin"
    ADMIN = "admin", "Platform Admin"


class User(AbstractUser):
    """Email-authenticated user (no username field)."""

    username = None
    email = models.EmailField("email address", unique=True)
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.STUDENT,
        db_index=True,
    )
    phone = models.CharField(max_length=30, blank=True, default="")
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        db_table = "accounts_user"

    @property
    def display_name(self) -> str:
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}".strip()
        return self.first_name or self.email.split("@")[0]

    @property
    def initials(self) -> str:
        parts = [p for p in self.display_name.replace(".", " ").split() if p]
        if len(parts) >= 2:
            return (parts[0][0] + parts[1][0]).upper()
        return (self.display_name[:2] or "?").upper()

    def __str__(self) -> str:
        return f"{self.display_name} <{self.email}> ({self.role})"


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile")
    roll_number = models.CharField(max_length=40, blank=True, default="")
    institution = models.ForeignKey(
        "catalog.Institution", null=True, blank=True, on_delete=models.SET_NULL, related_name="students"
    )
    institution_name = models.CharField(max_length=200, blank=True, default="")
    department = models.ForeignKey(
        "catalog.Department", null=True, blank=True, on_delete=models.SET_NULL, related_name="student_members"
    )
    department_name = models.CharField(max_length=120, blank=True, default="")
    course = models.CharField(max_length=120, blank=True, default="BAMS")
    year = models.CharField(max_length=40, blank=True, default="3rd Year")
    graduation_year = models.PositiveIntegerField(null=True, blank=True)
    location = models.CharField(max_length=160, blank=True, default="")
    bio = models.TextField(blank=True, default="")
    career_interests = models.JSONField(default=list, blank=True)
    target_role = models.ForeignKey(
        "catalog.TargetRole", null=True, blank=True, on_delete=models.SET_NULL, related_name="students_targeting"
    )
    target_role_name = models.CharField(max_length=160, blank=True, default="")

    @property
    def display_institution(self) -> str:
        return self.institution.name if self.institution else self.institution_name

    @property
    def display_department(self) -> str:
        return self.department.name if self.department else self.department_name

    class Meta:
        db_table = "accounts_student_profile"


class IndustryProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="industry_profile")
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, default="")
    domain = models.CharField(max_length=160, blank=True, default="")
    org_type = models.CharField(max_length=120, blank=True, default="")
    location = models.CharField(max_length=160, blank=True, default="")
    website = models.URLField(blank=True, default="")
    company_email = models.EmailField(blank=True, default="")
    phone = models.CharField(max_length=30, blank=True, default="")
    contact_person = models.CharField(max_length=160, blank=True, default="")
    verified = models.BooleanField(default=False)
    founded_year = models.PositiveIntegerField(null=True, blank=True)
    size = models.CharField(max_length=80, blank=True, default="")

    class Meta:
        db_table = "accounts_industry_profile"

    def __str__(self) -> str:
        return self.name


class AcademicianProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="academician_profile")
    designation = models.CharField(max_length=160, blank=True, default="")
    institution = models.ForeignKey(
        "catalog.Institution", null=True, blank=True, on_delete=models.SET_NULL, related_name="faculty"
    )
    institution_name = models.CharField(max_length=200, blank=True, default="")
    department = models.ForeignKey(
        "catalog.Department", null=True, blank=True, on_delete=models.SET_NULL, related_name="academic_members"
    )
    department_name = models.CharField(max_length=120, blank=True, default="")
    subjects = models.JSONField(default=list, blank=True)
    research_interests = models.JSONField(default=list, blank=True)
    experience_years = models.PositiveIntegerField(default=0)
    bio = models.TextField(blank=True, default="")

    @property
    def display_institution(self) -> str:
        return self.institution.name if self.institution else self.institution_name

    @property
    def display_department(self) -> str:
        return self.department.name if self.department else self.department_name

    class Meta:
        db_table = "accounts_academician_profile"


class InstitutionAdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="institution_admin_profile")
    institution = models.ForeignKey(
        "catalog.Institution", null=True, blank=True, on_delete=models.SET_NULL, related_name="admins"
    )
    institution_name = models.CharField(max_length=200, blank=True, default="")
    title = models.CharField(max_length=160, blank=True, default="")

    @property
    def display_institution(self) -> str:
        return self.institution.name if self.institution else self.institution_name

    class Meta:
        db_table = "accounts_institution_admin_profile"
