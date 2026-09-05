"""
`manage.py seed_demo` — seeds realistic demo data for every role so each of the
four dashboards is fully populated. Idempotent: re-running does not duplicate
records (run with --force to rebuild from scratch).

Demo logins (password from env DEMO_PASSWORD, default DemoPass@123):
  student     aarav.sharma@demo.aiia.local
  industry    research@demo.aiia.local
  academician priya.mehta@demo.aiia.local
  admin       admin@demo.aiia.local
"""
import os
from datetime import date, datetime, timedelta

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from apps.accounts.models import (
    AcademicianProfile,
    IndustryProfile,
    InstitutionAdminProfile,
    Role,
    StudentProfile,
    User,
)
from apps.catalog.models import (
    Department,
    DemandLevel,
    Institution,
    LearningResource,
    Skill,
    SkillCategory,
    TargetRole,
    TargetRoleSkill,
)
from apps.credentials.models import (
    EvidenceItem,
    ProjectRecommendation,
    VerificationRequest,
)
from apps.governance.models import (
    AcademicianOpportunity,
    AnomalyFlag,
    CurriculumReport,
    DemandTrend,
    DepartmentSkillMetric,
    GapSeverity,
    InstitutionalReport,
    Placement,
)
from apps.marketplace.models import (
    Application,
    Opportunity,
    Rating,
)

DEMO_PASSWORD = os.environ.get("DEMO_PASSWORD", "DemoPass@123")
EMAIL_DOMAIN = "demo.aiia.local"

SKILLS = [
    ("TC-PY-01", "Python", SkillCategory.TECHNICAL),
    ("TC-ML-01", "Machine Learning", SkillCategory.TECHNICAL),
    ("TC-RM-04", "Research Methodology", SkillCategory.RESEARCH),
    ("TC-DA-02", "Data Analysis", SkillCategory.TECHNICAL),
    ("TC-CR-03", "Clinical Research", SkillCategory.DOMAIN),
    ("TC-SW-02", "Scientific Writing", SkillCategory.COMMUNICATION),
    ("TC-DC-01", "Documentation", SkillCategory.COMMUNICATION),
    ("TC-SA-01", "Statistical Analysis", SkillCategory.TECHNICAL),
    ("TC-PV-02", "Pharmacovigilance", SkillCategory.DOMAIN),
    ("TC-DM-01", "Data Management", SkillCategory.TECHNICAL),
    ("TC-CT-05", "Clinical Trial Documentation", SkillCategory.DOMAIN),
    ("TC-PH-01", "Pharmacology", SkillCategory.DOMAIN),
    ("TC-AT-01", "Ayurvedic Therapeutics", SkillCategory.DOMAIN),
    ("TC-PG-02", "Pharmacognosy", SkillCategory.DOMAIN),
    ("TC-RS-01", "Research", SkillCategory.RESEARCH),
    ("TC-PA-01", "Patient Assessment", SkillCategory.DOMAIN),
]

CLINICAL_INTERN_REQS = [
    ("TC-PY-01", "essential", 70),
    ("TC-RM-04", "essential", 60),
    ("TC-DA-02", "essential", 65),
    ("TC-SA-01", "essential", 70),
    ("TC-SW-02", "preferred", 60),
    ("TC-CR-03", "preferred", 50),
    ("TC-DC-01", "preferred", 60),
    ("TC-ML-01", "preferred", 50),
]

# (dept_name, total)  — actual students seeded per department
DEPT_SIZES = [
    ("Ayurveda", 8),
    ("Surgery", 4),
    ("Pharmacology", 6),
    ("Kayachikitsa", 5),
    ("Shalya Tantra", 4),
    ("Shaalakya Tantra", 3),
]


def _user(email, name, role, password=DEMO_PASSWORD, phone="", verified=False):
    user, created = User.objects.get_or_create(
        email=email,
        defaults={
            "role": role,
            "phone": phone,
            "is_verified": verified,
        },
    )
    if created:
        first, _, last = name.partition(" ")
        user.first_name = first
        user.last_name = last.strip()
        user.set_password(password)
        user.save()
    return user


def _make_student(first, last, dept, course, year, extra=None):
    email = f"{first.lower()}.{last.lower()}@{EMAIL_DOMAIN}".replace(" ", ".")
    user = _user(email, f"{first} {last}", Role.STUDENT)
    profile, _ = StudentProfile.objects.get_or_create(
        user=user,
        defaults={
            "department": dept,
            "institution": dept.institution,
            "department_name": dept.name,
            "institution_name": dept.institution.name,
            "course": course,
            "year": year,
            "graduation_year": 2027,
            "location": "New Delhi",
            "bio": f"{first} {last} — demo {course} student at {dept.institution.name}.",
        },
    )
    for key, value in (extra or {}).items():
        setattr(profile, key, value)
    profile.save()
    return user


def _claim(student, taxonomy, origin, confidence, evidence=None):
    skill = Skill.objects.get(taxonomy_id=taxonomy)
    claim, _ = student.skill_claims.get_or_create(
        skill=skill,
        defaults={"origin": origin, "confidence": confidence, "evidence": evidence},
    )
    if not _ and claim.evidence is None and evidence is not None:
        claim.evidence = evidence
        claim.save()
    return claim


def _evidence(student, title, kind, issuer, status, days_ago=30, description=""):
    evidence = EvidenceItem.objects.create(
        student=student,
        title=title,
        kind=kind,
        issuer=issuer,
        issued_on=date.today() - timedelta(days=days_ago),
        status=status,
        description=description,
    )
    return evidence


def _days_ago(days, hour=None):
    when = timezone.now() - timedelta(days=days)
    return when


def seed_all(force: bool = False, password: str = DEMO_PASSWORD) -> dict:
    """Seed demo data. Returns a small report dict. Callable from tests."""
    created_counts = {"users": 0, "students": 0}
    if force:
        User.objects.exclude(is_superuser=True).delete()
        Institution.objects.all().delete()

    # ------------------------------------------------------------------ org
    institution, _ = Institution.objects.get_or_create(
        name="All India Institute of Ayurveda",
        defaults={
            "initials": "AIIA",
            "location": "New Delhi, India",
            "org_type": "Government Institute",
            "established_year": 2015,
            "website": "https://aiia.gov.in",
            "email": "admin@demo.aiia.local",
            "phone": "+91 11 2659 3642",
            "verified": True,
            "total_students": 320,
            "total_faculty": 48,
        },
    )
    depts = {}
    for name, size in DEPT_SIZES:
        dept, _ = Department.objects.get_or_create(institution=institution, name=name)
        depts[name] = dept

    # ------------------------------------------------------------- taxonomy
    for taxonomy_id, name, category in SKILLS:
        Skill.objects.get_or_create(taxonomy_id=taxonomy_id, defaults={"name": name, "category": category})

    role, _ = TargetRole.objects.get_or_create(
        name="Clinical Research Intern",
        defaults={"description": "Entry research role in AYUSH clinical research", "category": "Clinical Research"},
    )
    for taxonomy_id, priority, minimum in CLINICAL_INTERN_REQS:
        skill = Skill.objects.get(taxonomy_id=taxonomy_id)
        TargetRoleSkill.objects.get_or_create(
            target_role=role, skill=skill, defaults={"priority": priority, "min_proficiency": minimum}
        )

    # ---------------------------------------------------------------- staff
    academician = _user(
        "priya.mehta@demo.aiia.local",
        "Dr. Priya Mehta",
        Role.ACADEMICIAN,
        password=password,
        phone="+91 98765 12345",
        verified=True,
    )
    AcademicianProfile.objects.get_or_create(
        user=academician,
        defaults={
            "institution": institution,
            "department": depts["Ayurveda"],
            "designation": "Professor of Ayurveda & Research",
            "subjects": ["Clinical Research", "Pharmacology", "Research Methodology", "AYUSH Therapeutics"],
            "research_interests": ["Herbal Pharmacovigilance", "Clinical Trial Design", "AYUSH Healthcare Delivery"],
            "experience_years": 12,
            "bio": "Professor with 12 years of experience in clinical research, AYUSH studies, and curriculum development.",
        },
    )

    admin_user = _user(
        "admin@demo.aiia.local", "Dr. Sunita Rao", Role.INSTITUTION_ADMIN, password=password, verified=True
    )
    InstitutionAdminProfile.objects.get_or_create(
        user=admin_user, defaults={"institution": institution, "title": "Director — Placement & Skill Cell"}
    )

    def industry_user(email, name, **company):
        user = _user(email, name, Role.INDUSTRY, password=password, verified=True)
        IndustryProfile.objects.get_or_create(
            user=user,
            defaults={
                "name": name,
                "description": company.get("description", ""),
                "domain": company.get("domain", ""),
                "org_type": company.get("org_type", "Government Research Institute"),
                "location": company.get("location", "New Delhi, India"),
                "website": company.get("website", ""),
                "company_email": email,
                "phone": company.get("phone", ""),
                "contact_person": company.get("contact_person", "Dr. Rajesh Kumar"),
                "verified": True,
                "founded_year": company.get("founded_year", 2015),
                "size": company.get("size", "200-500 employees"),
            },
        )
        return user

    main_company = industry_user(
        "research@demo.aiia.local",
        "AIIA Research Division",
        description="Research division of AIIA focused on clinical research, drug discovery and evidence-based Ayurvedic medicine.",
        domain="Healthcare / AYUSH Research",
        website="https://aiia.gov.in",
        phone="+91 11 2659 3642",
        contact_person="Dr. Rajesh Kumar",
    )
    ccras = industry_user(
        "ccras@demo.aiia.local",
        "CCRAS",
        description="Central Council for Research in Ayurvedic Sciences.",
        domain="AYUSH Research",
        website="https://ccras.nic.in",
        contact_person="Dr. Meenakshi Iyer",
    )
    nia = industry_user(
        "nia@demo.aiia.local",
        "NIA Jaipur",
        description="National Institute of Ayurveda, Jaipur.",
        domain="AYUSH Education & Research",
        location="Jaipur, Rajasthan",
        website="https://nia.edu.in",
        contact_person="Dr. Harish Chandra",
    )

    # ------------------------------------------------------------- students
    ayurveda, pharma, kayachikitsa, surgery = (
        depts["Ayurveda"],
        depts["Pharmacology"],
        depts["Kayachikitsa"],
        depts["Surgery"],
    )
    aarav = _make_student("Aarav", "Sharma", ayurveda, "BAMS", "3rd Year", {
        "roll_number": "AIIA-2023-014",
        "bio": "Third-year BAMS student interested in clinical research and evidence-based medicine. Experienced in Python-based data analysis and research methodology.",
        "target_role": role,
        "target_role_name": role.name,
        "location": "New Delhi",
    })
    meera = _make_student("Meera", "Joshi", ayurveda, "BAMS", "Final Year", {"target_role": role, "target_role_name": role.name})
    rohan = _make_student("Rohan", "Patel", ayurveda, "BAMS", "4th Year", {"target_role": role, "target_role_name": role.name})
    neha = _make_student("Neha", "Gupta", pharma, "BSc Computer Science", "3rd Year")
    ananya = _make_student("Ananya", "Reddy", kayachikitsa, "BAMS", "2nd Year")
    vikram = _make_student("Vikram", "Singh", surgery, "BAMS", "3rd Year")
    _make_student("Ritu", "Verma", ayurveda, "BAMS", "2nd Year", {"target_role": role, "target_role_name": role.name})
    _make_student("Kavya", "Nair", ayurveda, "BAMS", "1st Year")
    _make_student("Dev", "Patil", pharma, "BPharm", "2nd Year")
    _make_student("Isha", "Mishra", kayachikitsa, "BAMS", "3rd Year")
    _make_student("Kabir", "Khan", surgery, "BAMS", "Final Year")

    # Filler cohort so department stats look alive.
    filler_meta = {
        "Ayurveda": [("Sneha", "Rao", "2nd Year"), ("Deepak", "Joshi", "Final Year"), ("Anjali", "Singh", "1st Year")],
        "Surgery": [("Mohit", "Agarwal", "3rd Year"), ("Tanvi", "Chopra", "2nd Year"), ("Nikhil", "Das", "Final Year")],
        "Pharmacology": [("Pooja", "Kulkarni", "3rd Year"), ("Sarthak", "Jain", "1st Year"), ("Divya", "Menon", "2nd Year")],
        "Kayachikitsa": [("Yash", "Gupta", "Final Year"), ("Aditi", "Sharma", "2nd Year"), ("Varun", "Reddy", "3rd Year"), ("Nandini", "Iyer", "1st Year")],
        "Shalya Tantra": [("Rahul", "Bose", "3rd Year"), ("Priyanka", "Kaur", "2nd Year"), ("Arjun", "Mehta", "Final Year"), ("Sara", "Thomas", "1st Year")],
        "Shaalakya Tantra": [("Harsh", "Yadav", "2nd Year"), ("Neelam", "Pillai", "3rd Year"), ("Om", "Desai", "Final Year")],
    }
    for dept_name, rows in filler_meta.items():
        for first, last, year in rows:
            course = "BAMS" if dept_name != "Pharmacology" else "BPharm"
            _make_student(first, last, depts[dept_name], course, year)

    # ---------------------------------------------------- Aarav's passport
    ev = {
        "cert": _evidence(aarav, "Python for Research Certificate", "Certificate", "NPTEL", "verified", 45),
        "ml": _evidence(aarav, "CVD Risk Prediction Model", "Project", "AIIA", "verified", 60),
        "transcript": _evidence(aarav, "Academic Transcript", "Transcript", "AIIA", "verified", 20),
        "survey": _evidence(aarav, "Rural Health Data Survey", "Project", "AIIA", "verified", 75),
        "posting": _evidence(aarav, "Clinical Posting Record", "Log", "AIIA OPD", "verified", 30),
        "nptel_stats": _evidence(aarav, "NPTEL Statistics Certificate", "Certificate", "NPTEL", "needs review", 5, "Statistics for Health Research"),
    }
    aarav_claims = [
        ("TC-PY-01", "evidence", 92, ev["cert"]),
        ("TC-ML-01", "evidence", 86, ev["ml"]),
        ("TC-RM-04", "evidence", 81, ev["transcript"]),
        ("TC-DA-02", "evidence", 76, ev["survey"]),
        ("TC-CR-03", "evidence", 68, ev["posting"]),
        ("TC-SW-02", "self-declared", 64, None),
        ("TC-DC-01", "self-declared", 72, None),
        ("TC-SA-01", "self-declared", 45, None),
    ]
    for taxonomy_id, origin, confidence, evidence in aarav_claims:
        _claim(aarav, taxonomy_id, origin, confidence, evidence)

    # Verification queue for Ayurveda dept (academician screen)
    verifications = [
        (aarav, "CVD Risk Prediction Model", "Project", ["Python", "Machine Learning", "Data Analysis"], "ML model predicting cardiovascular risk from Ayurvedic markers.", "pending", 3),
        (meera, "Clinical Posting Certificate", "Certificate", ["Clinical Research", "Patient Assessment"], "4-week clinical posting at AIIA OPD.", "pending", 4),
        (rohan, "Herbal Drug Efficacy Study", "Project", ["Research Methodology", "Data Analysis", "Scientific Writing"], "Literature review and efficacy analysis of Ashwagandha formulations.", "pending", 5),
        (ananya, "NPTEL Statistics Certificate", "Certificate", ["Statistical Analysis"], "Certificate from NPTEL course on Statistics for Health Research.", "flagged", 8),
        (vikram, "Pharmacognosy Lab Report", "Project", ["Pharmacognosy", "Documentation"], "Lab report on identification and authentication of medicinal plants.", "pending", 10),
    ]
    for student, title, vtype, skills, description, vstatus, days_ago in verifications:
        v, created = VerificationRequest.objects.get_or_create(
            student=student, title=title,
            defaults={"type": vtype, "skills_claimed": skills, "description": description, "status": vstatus},
        )
        if created:
            VerificationRequest.objects.filter(pk=v.pk).update(submitted_at=_days_ago(days_ago))

    # Other named students get realistic passports
    def passport_bundle(student, pairs, verified_count=4):
        base_ev = _evidence(student, "Academic Transcript", "Transcript", "AIIA", "verified", 40)
        for i, (taxonomy_id, origin, confidence) in enumerate(pairs):
            evidence = base_ev if (i == 0 and origin == "evidence") else (
                _evidence(student, f"{student.display_name} Project {i}", "Project", "AIIA", "verified", 90 - i * 5) if origin == "evidence" and i < verified_count else None
            )
            _claim(student, taxonomy_id, origin, confidence, evidence)

    passport_bundle(meera, [
        ("TC-PY-01", "evidence", 85), ("TC-RM-04", "evidence", 88), ("TC-CR-03", "evidence", 78),
        ("TC-SW-02", "evidence", 82), ("TC-DA-02", "evidence", 80), ("TC-SA-01", "self-declared", 55),
        ("TC-PA-01", "evidence", 75), ("TC-DC-01", "self-declared", 70),
    ], verified_count=6)
    passport_bundle(neha, [
        ("TC-PY-01", "evidence", 88), ("TC-DA-02", "evidence", 82), ("TC-ML-01", "evidence", 75),
        ("TC-SA-01", "evidence", 80), ("TC-DM-01", "self-declared", 60),
    ], verified_count=4)
    passport_bundle(rohan, [
        ("TC-PY-01", "self-declared", 70), ("TC-RM-04", "evidence", 75), ("TC-DA-02", "self-declared", 68),
        ("TC-SW-02", "self-declared", 50),
    ], verified_count=2)

    for student in User.objects.filter(role=Role.STUDENT).exclude(pk__in=[aarav.pk, meera.pk, neha.pk, rohan.pk]):
        if not student.skill_claims.exists():
            passport_bundle(student, [
                ("TC-PY-01", "evidence" if student.pk % 2 else "self-declared", 55 + student.pk % 30),
                ("TC-RM-04", "evidence" if student.pk % 3 else "self-declared", 50 + student.pk % 25),
                ("TC-DA-02", "self-declared", 45 + student.pk % 25),
                ("TC-DC-01", "self-declared", 60),
            ], verified_count=2)

    # ------------------------------------------------------ opportunities
    def add_opportunity(company, title, otype, openings, location, arrangement, duration, stipend, deadline_days, status, description, skills, blind=True, qualification="", courses=None, experience="", other=""):
        opp, created = Opportunity.objects.get_or_create(
            company=company, title=title,
            defaults={
                "type": otype,
                "description": description,
                "openings": openings,
                "location": location,
                "work_arrangement": arrangement,
                "duration": duration,
                "stipend": stipend,
                "deadline": date.today() + timedelta(days=deadline_days),
                "eligibility_qualification": qualification,
                "eligibility_courses": courses or [],
                "eligibility_experience": experience,
                "eligibility_other": other,
                "status": status,
                "blind_shortlisting": blind,
            },
        )
        if created:
            for taxonomy_id, priority, minimum in skills:
                skill = Skill.objects.get(taxonomy_id=taxonomy_id)
                opp.required_skills.get_or_create(skill=skill, defaults={"required": priority, "min_proficiency": minimum})
            # spread created_at for trend data
            Opportunity.objects.filter(pk=opp.pk).update(created_at=_days_ago(40 - (opp.pk % 20)))
        return opp

    op1 = add_opportunity(
        main_company, "Clinical Research Intern", "Internship", 4, "New Delhi", "On-site", "3 Months",
        "₹12,000/month", 25, "active",
        "Work on ongoing clinical trials in Ayurvedic pharmacology. Assist in data collection, patient enrollment, and protocol documentation.",
        [("TC-PY-01", "essential", 70), ("TC-RM-04", "essential", 60), ("TC-DA-02", "essential", 65),
         ("TC-SW-02", "preferred", 50), ("TC-CR-03", "preferred", 40)],
        qualification="BAMS / MBBS / BSc Life Sciences", courses=["BAMS", "MBBS", "BPharm"],
        experience="No prior experience required", other="Must be enrolled in a recognized institution",
    )
    op2 = add_opportunity(
        main_company, "Research Data Assistant", "Part-time", 2, "New Delhi", "Hybrid", "6 Months",
        "₹15,000/month", 40, "active",
        "Assist in cleaning, analyzing, and visualizing clinical trial data using Python and statistical tools.",
        [("TC-PY-01", "essential", 80), ("TC-DA-02", "essential", 75), ("TC-ML-01", "preferred", 50), ("TC-SA-01", "essential", 70)],
        qualification="BSc / MSc Statistics / CS / Life Sciences", courses=["BSc", "MSc", "BCA"],
        experience="6 months relevant experience", other="Proficiency in Python required",
    )
    op3 = add_opportunity(
        nia, "AYUSH Public Health Intern", "Internship", 3, "Jaipur, Rajasthan", "On-site", "2 Months",
        "₹8,000/month", 15, "closing",
        "Support field research on AYUSH healthcare delivery in rural communities.",
        [("TC-RS-01", "essential", 50), ("TC-DA-02", "preferred", 40), ("TC-CR-03", "preferred", 35)],
        qualification="BAMS / BPublicHealth", courses=["BAMS", "BPH"], experience="No prior experience required",
        other="Willingness to travel to rural areas",
    )
    add_opportunity(
        main_company, "Herbal Pharmacovigilance Intern", "Internship", 2, "New Delhi", "On-site", "4 Months",
        "₹10,000/month", 30, "draft",
        "Monitor and document adverse drug reactions for AYUSH herbal formulations.",
        [("TC-CR-03", "essential", 60), ("TC-SW-02", "essential", 55), ("TC-DA-02", "preferred", 45)],
        qualification="BAMS / BPharm", courses=["BAMS", "BPharm"], experience="1 year preferred",
    )
    add_opportunity(
        ccras, "Field Research Intern (CCRAS)", "Internship", 2, "New Delhi", "On-site", "1 Month",
        "₹9,000/month", 12, "active",
        "Hands-on research training at Central Council for Research in Ayurvedic Sciences.",
        [("TC-RM-04", "essential", 60), ("TC-CR-03", "preferred", 45), ("TC-PV-02", "preferred", 40)],
        qualification="BAMS / BSc Life Sciences", courses=["BAMS", "BSc"],
    )

    # ---------------------------------------------------------- applications
    def apply(student, opp, stage, days_ago, interview_in=None, notes=""):
        app, created = Application.objects.get_or_create(
            opportunity=opp, student=student, defaults={"stage": stage, "notes": notes}
        )
        if interview_in and (created or app.interview_date is None):
            app.interview_date = timezone.now() + timedelta(days=interview_in)
        Application.objects.filter(pk=app.pk).update(
            applied_at=_days_ago(days_ago), updated_at=_days_ago(days_ago - 1)
        )
        return app

    apply(aarav, op1, "shortlisted", 2, interview_in=5, notes="Strong technical background")
    apply(meera, op1, "interviewed", 4, interview_in=-1, notes="Excellent interview performance")
    apply(rohan, op1, "applied", 1)
    apply(neha, op2, "offered", 11)
    apply(ananya, op3, "rejected", 6)
    apply(vikram, op3, "applied", 3)

    # ----------------------------------------------------------- placements
    def placement(student, company_name, role, ptype, start_days_ago, duration, stipend, pstatus):
        p, created = Placement.objects.get_or_create(
            student=student, company_name=company_name, role=role,
            defaults={"type": ptype, "duration": duration, "stipend": stipend, "status": pstatus, "institution": institution},
        )
        if created:
            Placement.objects.filter(pk=p.pk).update(
                created_at=_days_ago(start_days_ago),
                start_date=date.today() - timedelta(days=start_days_ago),
            )
        return p

    placement(aarav, "AIIA Research Division", "Clinical Research Intern", "Internship", 150, "3 Months", "₹12,000/month", "active")
    placement(meera, "NIA Jaipur", "AYUSH Research Intern", "Internship", 180, "2 Months", "₹8,000/month", "completed")
    placement(neha, "CCRAS", "Research Data Assistant", "Placement", 120, "6 Months", "₹15,000/month", "active")
    placement(rohan, "Ministry of Ayush", "Public Health Analyst", "Internship", 200, "4 Months", "₹10,000/month", "completed")
    placement(ananya, "AIIA", "Clinical Assistant", "Placement", 30, "12 Months", "₹18,000/month", "offered")
    placement(vikram, "AIIMS Delhi", "Surgical Research Intern", "Internship", 90, "3 Months", "₹12,000/month", "active")
    placement(_student_by_index(1), "CCRAS", "Documentation Intern", "Internship", 160, "3 Months", "₹8,500/month", "completed")
    placement(_student_by_index(2), "AIIA", "Data Entry & Research Support", "Internship", 70, "6 Months", "₹9,000/month", "active")

    # ------------------------------------------------------------- ratings
    Rating.objects.get_or_create(
        rater=meera, ratee=main_company, ratee_type="industry", score=5,
        defaults={"feedback": "Excellent mentorship and research exposure. The clinical trial work was incredibly enriching.", "opportunity": op1},
    )
    Rating.objects.get_or_create(
        rater=main_company, ratee=meera, ratee_type="student", score=5,
        defaults={"feedback": "Outstanding performance. Strong research skills and excellent documentation.", "opportunity": op1},
    )
    Rating.objects.get_or_create(
        rater=neha, ratee=main_company, ratee_type="industry", score=4,
        defaults={"feedback": "Great learning environment. Could improve on-boarding process for new interns.", "opportunity": op2},
    )

    # ------------------------------------------- learning resources / projects
    def resource(kind, title, provider, duration, rating, closes_taxonomy, boost, why, description=""):
        skill = Skill.objects.get(taxonomy_id=closes_taxonomy)
        r, _ = LearningResource.objects.get_or_create(
            title=title,
            defaults={
                "kind": kind, "provider": provider, "duration": duration, "rating": rating,
                "closes_gap": skill, "closes_gap_name": skill.name, "boost_points": boost,
                "why": why, "description": description,
                "skills_improved": [{"skill": skill.name}],
            },
        )
        return r

    resource("Course", "Statistics for Health Research", "NPTEL", "8 weeks", 4.6, "TC-SA-01", 27,
             "Directly addresses the Statistical Analysis gap — the #1 missing skill for the target role.",
             "Covers the statistical methods used in clinical and public-health research.")
    resource("Course", "Scientific Writing Fundamentals", "Coursera", "4 weeks", 4.8, "TC-SW-02", 18,
             "Builds the writing skills your target role lists as required.")
    resource("Workshop", "GCP & Clinical Trial Basics", "AIIA", "2 days", 4.7, "TC-CT-05", 23,
             "Hands-on practice with case report forms and trial records.", "Good Clinical Practice workshop.")

    stat_skill = Skill.objects.get(taxonomy_id="TC-SA-01")
    writing_skill = Skill.objects.get(taxonomy_id="TC-SW-02")
    ProjectRecommendation.objects.get_or_create(
        title="Clinical Data Statistical Analysis",
        defaults={
            "description": "Analyze a provided clinical trial dataset. Apply appropriate statistical tests, create visualizations, and write a brief findings report.",
            "target_skill": stat_skill,
            "difficulty": "Intermediate",
            "estimated_duration": "3 weeks",
            "deliverables": ["Jupyter notebook with analysis", "Statistical test results", "Visualization charts", "Brief findings report"],
            "verification_criteria": ["Correct statistical methodology", "Reproducible code", "Clear visualizations", "Well-structured report"],
        },
    )
    ProjectRecommendation.objects.get_or_create(
        title="Herbal Drug Efficacy Literature Review",
        defaults={
            "description": "Conduct a systematic literature review on the efficacy of a chosen Ayurvedic formulation. Follow scientific writing standards.",
            "target_skill": writing_skill,
            "difficulty": "Beginner",
            "estimated_duration": "2 weeks",
            "deliverables": ["Literature review document", "Reference list in standard format", "Summary tables"],
            "verification_criteria": ["Proper citation format", "Structured review methodology", "Critical analysis present"],
        },
    )

    # ------------------------------------ demand trends + department metrics
    demand_meta = [
        ("TC-CR-03", "up", "High", 35, 45),
        ("TC-DA-02", "up-strong", "High", 52, 32),
        ("TC-ML-01", "up-strong", "High", 68, 28),
        ("TC-SA-01", "up", "High", 41, 40),
        ("TC-PH-01", "stable", "Medium", 5, 14),
        ("TC-DC-01", "stable", "Low", -2, 8),
        ("TC-AT-01", "up", "Medium", 18, 16),
        ("TC-PV-02", "up", "Medium", 22, 12),
    ]
    this_month = date.today().strftime("%Y-%m")
    for taxonomy_id, direction, level, change, openings in demand_meta:
        skill = Skill.objects.get(taxonomy_id=taxonomy_id)
        DemandTrend.objects.get_or_create(
            skill=skill, month=this_month,
            defaults={"direction": direction, "demand_level": level, "change_percent": change, "openings": openings},
        )

    metric_meta = {
        "Ayurveda": [
            ("TC-CR-03", "High", 32, 45, "Critical", 6, 8),
            ("TC-SA-01", "High", 18, 35, "Critical", 7, 8),
            ("TC-PV-02", "Medium", 41, 52, "Moderate", 4, 8),
            ("TC-DM-01", "High", 21, 40, "Critical", 5, 8),
            ("TC-PY-01", "High", 55, 68, "Moderate", 3, 8),
            ("TC-SW-02", "Medium", 62, 58, "Acceptable", 3, 8),
            ("TC-RM-04", "High", 70, 72, "Acceptable", 2, 8),
            ("TC-ML-01", "High", 12, 28, "Critical", 7, 8),
        ],
        "Pharmacology": [
            ("TC-PV-02", "Medium", 45, 55, "Moderate", 3, 6),
            ("TC-SA-01", "High", 22, 40, "Critical", 5, 6),
            ("TC-DM-01", "High", 30, 45, "Critical", 4, 6),
            ("TC-DA-02", "High", 40, 55, "Moderate", 3, 6),
        ],
        "Kayachikitsa": [
            ("TC-CR-03", "High", 28, 42, "Critical", 4, 5),
            ("TC-PY-01", "High", 18, 30, "Critical", 4, 5),
            ("TC-PA-01", "Medium", 66, 68, "Acceptable", 1, 5),
        ],
        "Surgery": [
            ("TC-ML-01", "High", 10, 25, "Critical", 3, 4),
            ("TC-RM-04", "High", 35, 50, "Moderate", 2, 4),
        ],
    }
    for dept_name, rows in metric_meta.items():
        dept = depts[dept_name]
        for taxonomy_id, demand, coverage, proficiency, severity, with_gap, total in rows:
            skill = Skill.objects.get(taxonomy_id=taxonomy_id)
            trend = "increasing" if demand == "High" else "stable"
            DepartmentSkillMetric.objects.update_or_create(
                department=dept, skill=skill,
                defaults={
                    "industry_demand": demand,
                    "curriculum_coverage": coverage,
                    "student_proficiency": proficiency,
                    "gap_severity": severity,
                    "trend": trend,
                    "students_with_gap": with_gap,
                    "total_students": total,
                },
            )

    # ---------------------------------------------------- curriculum report
    CurriculumReport.objects.update_or_create(
        department=ayurveda,
        defaults={
            "total_students": DEPT_SIZES[0][1],
            "avg_readiness": 68,
            "readiness_distribution": {"beginning": 2, "developing": 5, "jobReady": 1},
            "top_gaps": [
                {"skill": "Statistical Analysis", "gapCount": 7, "severity": "Critical"},
                {"skill": "Machine Learning", "gapCount": 7, "severity": "Critical"},
                {"skill": "Clinical Research", "gapCount": 6, "severity": "Critical"},
                {"skill": "Data Management", "gapCount": 5, "severity": "Critical"},
            ],
            "coverage_gaps": [
                {"skill": "Machine Learning", "coverage": 12, "demand": "High"},
                {"skill": "Statistical Analysis", "coverage": 18, "demand": "High"},
                {"skill": "Data Management", "coverage": 21, "demand": "High"},
                {"skill": "Clinical Research", "coverage": 32, "demand": "High"},
            ],
            "recommendations": [
                "Introduce mandatory Statistical Analysis module in 2nd year",
                "Add Python for Healthcare elective in 3rd year curriculum",
                "Partner with industry for Clinical Research practical sessions",
                "Develop internal Machine Learning lab with real clinical datasets",
            ],
            "insights": [
                {"skill": "Statistical Analysis", "demandLevel": "High", "coverage": 18, "studentsWithGap": 7},
                {"skill": "Machine Learning", "demandLevel": "High", "coverage": 12, "studentsWithGap": 7},
            ],
        },
    )

    # ----------------------------------------------------- institutional data
    anomaly_data = [
        ("Ravi Kumar", "Ayurveda", "Duplicate Record", "Two identical internship records detected for the same company and period.", "high", "flagged", "Duplicate entries: AIIA internship submitted twice with identical dates.", 3),
        ("Priya Desai", "Pharmacology", "Statistical Outlier", "Claimed 12 verified skills when department average is 6.", "medium", "reviewing", "12 verified skills vs department average; all skills added within 48 hours.", 4),
        ("Amit Verma", "Surgery", "Inconsistent Data", "Placement record shows a company that closed 6 months ago.", "high", "flagged", "Company 'HealthTech Solutions' closed March 2025; record claims a placement after that.", 5),
        ("Sneha Rao", "Kayachikitsa", "Unusual Pattern", "5 internships claimed in a single month, exceeding the maximum allowed.", "medium", "resolved", "5 internships in one month; policy allows max 2 concurrent.", 9),
        ("Deepak Joshi", "Shalya Tantra", "Duplicate Record", "Same certificate uploaded with different metadata.", "low", "escalated", "Certificate hash matches an existing record under a different student ID.", 11),
    ]
    for name, dept_name, atype, description, severity, status_, evidence, days_ago in anomaly_data:
        user = _make_student(name.split()[0], name.split()[1], depts.get(dept_name, ayurveda), "BAMS", "3rd Year")
        flag, created = AnomalyFlag.objects.get_or_create(
            student=user, type=atype, description=description,
            defaults={"severity": severity, "status": status_, "evidence": evidence},
        )
        if created:
            AnomalyFlag.objects.filter(pk=flag.pk).update(flagged_at=_days_ago(days_ago))

    report_data = [
        ("Q3 Placement Report", "Placement", "Jul - Sep", "Overall placement rate improved to 58% from 52% in the prior quarter.", ["Pharmacology leads with the highest placement rate", "Ayurveda has the highest absolute placements", "Average stipend rose 12%"], 1),
        ("Skill Development Analysis", "Skill Development", "Aug", "Python remains the top verified skill; Statistical Analysis gaps persist.", ["Python verified by most students", "Statistical Analysis has the fewest verified claims", "ML skills show the fastest growth"], 4),
        ("Department Performance Comparison", "Readiness", "Q3", "Pharmacology shows the best readiness scores; Shalya Tantra needs intervention.", ["Pharmacology leads on readiness", "4 departments below 60% job-ready"], 3),
        ("Industry Engagement Summary", "Industry Engagement", "Q3", "Active industry partners across research councils and institutes.", ["CCRAS and AIIA are the top recruiters", "New partnerships established"], 2),
        ("Anomaly Investigation Report", "Anomaly", "Aug", "Anomalies flagged, reviewed and resolved through the institution review queue.", ["2 high-severity anomalies pending", "1 resolved, 1 escalated"], 5),
    ]
    for title, rtype, period, summary, findings, days_ago in report_data:
        report, created = InstitutionalReport.objects.get_or_create(
            institution=institution, title=title,
            defaults={"type": rtype, "period": period, "departments": ["All"], "summary": summary, "key_findings": findings},
        )
        if created:
            InstitutionalReport.objects.filter(pk=report.pk).update(generated_at=date.today() - timedelta(days=days_ago))

    # ---------------------------------------------- academician opportunities
    faculty_opps = [
        ("Faculty Development Programme on AI in Healthcare", "FDP", "AICTE", "Online", "2 weeks", "Oct 15", "Learn to integrate AI/ML concepts into healthcare curriculum.", ["Machine Learning", "Data Analysis", "Python"], "open", 8),
        ("Industrial Training at CCRAS", "Industrial Training", "CCRAS", "New Delhi", "1 month", "Sept 30", "Hands-on research training at the Central Council.", ["Research Methodology", "Clinical Research"], "open", 5),
        ("Curriculum Consultancy for BAMS Program", "Consultancy", "NCISM", "New Delhi", "3 months", "Nov 1", "Seeking faculty consultants for updating BAMS pharmacology curriculum.", ["Pharmacology", "Scientific Writing"], "open", 3),
        ("Joint Research: Herbal Drug Safety Database", "Research Collaboration", "AIIA + IIT Delhi", "New Delhi", "6 months", "Oct 20", "Collaborative project on a herb-drug interaction database.", ["Data Analysis", "Python", "Clinical Research"], "open", 12),
    ]
    for title, category, organizer, location, duration, dl, description, skills, status_, interested in faculty_opps:
        AcademicianOpportunity.objects.get_or_create(
            title=title,
            defaults={
                "category": category, "organizer": organizer, "location": location, "duration": duration,
                "deadline": date.today() + timedelta(days=30), "description": description,
                "skills_relevant": skills, "status": status_, "interested": interested,
            },
        )

    return {
        "institution": institution.name,
        "students": User.objects.filter(role=Role.STUDENT).count(),
        "opportunities": Opportunity.objects.count(),
        "applications": Application.objects.count(),
        "placements": Placement.objects.count(),
        "skills": Skill.objects.count(),
    }


def _student_by_index(idx: int):
    """Deterministic pick among the seeded student cohort (for placement rows)."""
    users = list(User.objects.filter(role=Role.STUDENT).order_by("id"))
    return users[idx % len(users)]


class Command(BaseCommand):
    help = "Seed demo data for the four-role AIIA collaboration platform."

    def add_arguments(self, parser):
        parser.add_argument("--force", action="store_true", help="Wipe and reseed demo data")

    @transaction.atomic
    def handle(self, *args, **options):
        report = seed_all(force=options["force"], password=DEMO_PASSWORD)
        self.stdout.write(self.style.SUCCESS("Seeded demo data:"))
        for key, value in report.items():
            self.stdout.write(f"  {key}: {value}")
        self.stdout.write(self.style.SUCCESS(f"\nDemo password for all accounts: {DEMO_PASSWORD}"))
        self.stdout.write("  student      aarav.sharma@demo.aiia.local")
        self.stdout.write("  industry     research@demo.aiia.local")
        self.stdout.write("  academician  priya.mehta@demo.aiia.local")
        self.stdout.write("  admin        admin@demo.aiia.local")
