from rest_framework import serializers

from .models import Attendance


class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source="employee.user.username", read_only=True)

    class Meta:
        model = Attendance
        fields = ["id", "employee", "employee_name", "clock_in", "clock_out"]
