from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = [
        ("ADMIN", "HR Administrator"),
        ("EMPLOYEE", "Employee"),
        ("APPLICANT", "Applicant"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="APPLICANT"
    )

    phone = models.CharField(
        max_length=20,
        blank=True
    )

    profile_picture = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.username