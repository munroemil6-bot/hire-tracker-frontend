from django.db import models
from employees.models import Employee

class Attendance(models.Model):
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="attendance"
    )

    clock_in = models.DateTimeField()

    clock_out = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return self.employee.user.username