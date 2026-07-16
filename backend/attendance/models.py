from django.db import models
from employees.models import Employee


class Attendance(models.Model):
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE
    )

    clock_in = models.DateTimeField()

    clock_out = models.DateTimeField(
        blank=True,
        null=True
    )

    def __str__(self):
        return self.employee.user.username