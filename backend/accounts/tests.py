from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from departments.models import Department


class AccountsApiTests(APITestCase):
    def test_register_endpoint_creates_user(self):
        response = self.client.post(
            reverse("register"),
            {
                "username": "alice",
                "email": "alice@example.com",
                "password": "secret123",
                "role": "APPLICANT",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["username"], "alice")


class DepartmentsApiTests(APITestCase):
    def test_department_list_endpoint_returns_data(self):
        user = User.objects.create_user(username="tester", password="secret123", role="ADMIN")
        self.client.force_authenticate(user=user)

        Department.objects.create(name="Engineering", description="Software")

        response = self.client.get(reverse("department-list"))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
