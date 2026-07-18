from datetime import date

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

from applicants.models import Applicant
from departments.models import Department
from employees.models import Employee
from jobs.models import Job

User = get_user_model()


class ApplicantApprovalTests(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(username="admin", password="pw", role="ADMIN")
        self.applicant_user = User.objects.create_user(username="applicant", password="pw", role="APPLICANT")
        self.department = Department.objects.create(name="Engineering", description="Engineering")
        self.job = Job.objects.create(
            title="Software Engineer",
            description="Build things",
            salary="60000.00",
            deadline=date(2030, 1, 1),
            department=self.department,
        )
        self.applicant = Applicant.objects.create(
            user=self.applicant_user,
            job=self.job,
            resume="resumes/test.txt",
            cover_letter="Please consider me",
            application_status="PENDING",
        )

    def test_admin_approval_promotes_user_to_employee(self):
        client = APIClient()
        client.force_authenticate(self.admin)

        response = client.post(f"/api/applicants/{self.applicant.id}/approve/")

        self.assertEqual(response.status_code, 200)
        self.applicant.refresh_from_db()
        self.applicant_user.refresh_from_db()
        self.assertEqual(self.applicant.application_status, "APPROVED")
        self.assertEqual(self.applicant_user.role, "EMPLOYEE")
        self.assertTrue(Employee.objects.filter(user=self.applicant_user).exists())
