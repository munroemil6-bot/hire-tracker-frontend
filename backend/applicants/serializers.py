from rest_framework import serializers

from .models import Applicant


class ApplicantSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    user_name = serializers.CharField(source="user.username", read_only=True)
    job_title = serializers.CharField(source="job.title", read_only=True)

    interview_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

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
            "interview_date",
        ]

    def create(self, validated_data):
        request = self.context.get("request")
        if request is None or request.user is None or not request.user.is_authenticated:
            raise serializers.ValidationError("Authentication required to apply")

        user = request.user

        # prevent duplicate applicant record for a user
        if Applicant.objects.filter(user=user).exists():
            raise serializers.ValidationError("Applicant profile already exists for this user")

        skills = validated_data.pop("skills", [])

        # ensure application starts as PENDING
        validated_data["application_status"] = "PENDING"

        applicant = Applicant.objects.create(user=user, **validated_data)

        if skills:
            applicant.skills.set(skills)

        return applicant
