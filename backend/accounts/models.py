from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):

    ROLE_CHOICES = [
        ("ADMIN", "Admin"),
        ("EMPLOYEE", "Employee"),
        ("APPLICANT", "Applicant"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="APPLICANT",
    )

    phone = models.CharField(max_length=20, blank=True)

    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        blank=True,
        null=True,
    )