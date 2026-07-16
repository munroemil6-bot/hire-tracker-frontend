from django.db import models
from accounts.models import User
from jobs.models import Job
from skills.models import Skill

class Applicant(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Rejected", "Rejected"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE
    )

    resume = models.FileField(upload_to="resumes/")
    cover_letter = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    skills = models.ManyToManyField(Skill)

    def __str__(self):
        return self.user.username