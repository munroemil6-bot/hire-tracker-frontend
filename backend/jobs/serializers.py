from rest_framework import serializers

from .models import Job


class JobSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)

    class Meta:
        model = Job
        fields = ["id", "title", "description", "salary", "deadline", "department", "department_name"]
