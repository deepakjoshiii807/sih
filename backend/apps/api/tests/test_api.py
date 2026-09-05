"""Smoke tests: auth, the four role dashboards and the key workflows.

Run with:  python manage.py test apps.api
"""
from django.core.management import call_command
from django.test import TestCase
from rest_framework.test import APIClient

from apps.accounts.models import User
from apps.marketplace.models import Application, Opportunity

STUDENT = "aarav.sharma@demo.aiia.local"
INDUSTRY = "research@demo.aiia.local"
ACADEMICIAN = "priya.mehta@demo.aiia.local"
ADMIN = "admin@demo.aiia.local"
PASSWORD = "DemoPass@123"

EXPECTED_STUDENT_KEYS = {
    "student", "skillPassport", "roleReadiness", "gaps", "simulator",
    "recommendedProjects", "opportunities", "applications", "recommendations", "portfolio",
}
EXPECTED_INDUSTRY_KEYS = {"company", "opportunities", "applications", "slaTrackers", "analytics", "ratings"}
EXPECTED_ACADEMICIAN_KEYS = {
    "academician", "departmentSkills", "demandTrends", "industryRoles",
    "curriculumReport", "verifications", "opportunities", "curriculumLoop", "analytics",
}
EXPECTED_INSTITUTION_KEYS = {
    "institution", "placements", "departmentPlacements", "placementTrends", "skillMetrics",
    "readinessDistribution", "departmentComparison", "anomalies", "reports", "analytics",
}


class SeedDataTestCase(TestCase):
    databases = "__all__"

    @classmethod
    def setUpTestData(cls):
        call_command("seed_demo", verbosity=0)

    def setUp(self):
        self.client = APIClient()

    def _login(self, email):
        user = User.objects.get(email=email)
        self.client.force_authenticate(user=user)
        return user

    # ------------------------------------------------------------------ auth
    def test_token_login(self):
        response = self.client.post(
            "/api/auth/token", {"email": STUDENT, "password": PASSWORD}, format="json"
        )
        self.assertEqual(response.status_code, 200, response.content)
        self.assertIn("access", response.json())

    def test_register_student(self):
        response = self.client.post(
            "/api/auth/register",
            {
                "email": "new.student@demo.aiia.local",
                "password": "NewPass@123",
                "role": "student",
                "name": "Test Student",
                "course": "BAMS",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 201, response.content)
        self.assertTrue(User.objects.filter(email="new.student@demo.aiia.local").exists())

    # ------------------------------------------------------------- dashboards
    def test_student_dashboard_shape(self):
        self._login(STUDENT)
        response = self.client.get("/api/student/dashboard")
        self.assertEqual(response.status_code, 200, response.content)
        payload = response.json()
        self.assertTrue(EXPECTED_STUDENT_KEYS <= payload.keys())
        self.assertIn("items", payload["skillPassport"])
        self.assertIn("readinessScore", payload["roleReadiness"])

    def test_industry_dashboard_shape(self):
        self._login(INDUSTRY)
        response = self.client.get("/api/industry/dashboard")
        self.assertEqual(response.status_code, 200, response.content)
        payload = response.json()
        self.assertTrue(EXPECTED_INDUSTRY_KEYS <= payload.keys())
        self.assertEqual(payload["company"]["name"], "AIIA Research Division")

    def test_academician_dashboard_shape(self):
        self._login(ACADEMICIAN)
        response = self.client.get("/api/academician/dashboard")
        self.assertEqual(response.status_code, 200, response.content)
        payload = response.json()
        self.assertTrue(EXPECTED_ACADEMICIAN_KEYS <= payload.keys())
        self.assertGreater(len(payload["verifications"]), 0)

    def test_institution_dashboard_shape(self):
        self._login(ADMIN)
        response = self.client.get("/api/institution/dashboard")
        self.assertEqual(response.status_code, 200, response.content)
        payload = response.json()
        self.assertTrue(EXPECTED_INSTITUTION_KEYS <= payload.keys())
        self.assertEqual(payload["institution"]["name"], "All India Institute of Ayurveda")

    def test_cross_role_forbidden(self):
        self._login(STUDENT)
        for url in ("/api/industry/dashboard", "/api/academician/dashboard", "/api/institution/dashboard"):
            response = self.client.get(url)
            self.assertEqual(response.status_code, 403, f"{url} should reject students")

    def test_unauthenticated_forbidden(self):
        response = self.client.get("/api/student/dashboard")
        self.assertEqual(response.status_code, 401)

    # --------------------------------------------------------------- actions
    def test_student_apply_workflow(self):
        user = self._login(STUDENT)
        applied_ids = set(Application.objects.filter(student=user).values_list("opportunity_id", flat=True))
        target = (
            Opportunity.objects.exclude(pk__in=applied_ids)
            .exclude(status="draft")
            .first()
        )
        self.assertIsNotNone(target, "Need an open opportunity for the apply test")
        response = self.client.post("/api/student/applications", {"opportunityId": target.id}, format="json")
        self.assertEqual(response.status_code, 201, response.content)
        self.assertTrue(Application.objects.filter(student=user, opportunity=target).exists())

    def test_industry_pipeline_action(self):
        self._login(INDUSTRY)
        application = Application.objects.filter(opportunity__company__email=INDUSTRY).first()
        response = self.client.post(
            f"/api/industry/applications/{application.id}/shortlist", {}, format="json"
        )
        self.assertEqual(response.status_code, 200, response.content)
        application.refresh_from_db()
        self.assertEqual(application.stage, "shortlisted")

    def test_academician_verification_decide(self):
        self._login(ACADEMICIAN)
        from apps.credentials.models import VerificationRequest

        pending = VerificationRequest.objects.filter(status="pending").first()
        response = self.client.post(
            f"/api/academician/verifications/{pending.id}/decide",
            {"action": "approved", "notes": "Evidence matches academic records"},
            format="json",
        )
        self.assertEqual(response.status_code, 200, response.content)
        pending.refresh_from_db()
        self.assertEqual(pending.status, "approved")
        if pending.evidence:
            self.assertEqual(pending.evidence.status, "verified")

    def test_institution_anomaly_review(self):
        self._login(ADMIN)
        from apps.governance.models import AnomalyFlag

        flagged = AnomalyFlag.objects.filter(status="flagged").first()
        response = self.client.post(
            f"/api/institution/anomalies/{flagged.id}/review",
            {"action": "resolve", "note": "Verified against OPD register"},
            format="json",
        )
        self.assertEqual(response.status_code, 200, response.content)
        flagged.refresh_from_db()
        self.assertEqual(flagged.status, "resolved")

    def test_profile_patch_persists(self):
        self._login(STUDENT)
        response = self.client.patch(
            "/api/student/profile",
            {"bio": "Updated bio via API", "location": "Pune"},
            format="json",
        )
        self.assertEqual(response.status_code, 200, response.content)
        self.assertEqual(response.json()["location"], "Pune")

    def test_industry_opportunity_create(self):
        self._login(INDUSTRY)
        response = self.client.post(
            "/api/industry/opportunities",
            {
                "title": "API Created Internship",
                "type": "Internship",
                "openings": 2,
                "location": "New Delhi",
                "deadline": "2027-01-15",
                "requiredSkills": [{"skill": "Python", "required": "essential", "minProficiency": 70}],
            },
            format="json",
        )
        self.assertEqual(response.status_code, 201, response.content)
        payload = response.json()
        self.assertEqual(payload["title"], "API Created Internship")
        self.assertEqual(payload["requiredSkills"][0]["skill"], "Python")
