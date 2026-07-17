from django.db import models

from accounts.models import User
from jobs.models import Job
from skills.models import Skill


class Applicant(models.Model):

    STATUS = [

        ("PENDING", "Pending"),

        ("APPROVED", "Approved"),

        ("REJECTED", "Rejected"),

    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    skills = models.ManyToManyField(
        Skill,
        blank=True
    )

    resume = models.FileField(
        upload_to="resumes/"
    )

    cover_letter = models.TextField()

    application_status = models.CharField(
        max_length=20,
        choices=STATUS,
        default="PENDING"
    )

    def __str__(self):
        return self.user.username