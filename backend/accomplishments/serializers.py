from rest_framework import serializers

from .models import Accomplishment


class AccomplishmentSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source="employee.user.username", read_only=True)

    class Meta:
        model = Accomplishment
        fields = ["id", "employee", "employee_name", "title", "description", "date"]
