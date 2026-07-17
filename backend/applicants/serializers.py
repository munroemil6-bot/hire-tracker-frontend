from rest_framework import serializers

from .models import Applicant


class ApplicantSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.username", read_only=True)
    job_title = serializers.CharField(source="job.title", read_only=True)

    class Meta:
        model = Applicant
        fields = [
            "id",
            "user",
            "user_name",
            "job",
            "job_title",
            "skills",
            "resume",
            "cover_letter",
            "application_status",
        ]
