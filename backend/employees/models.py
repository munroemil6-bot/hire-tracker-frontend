from django.db import models
from accounts.models import User
from departments.models import Department

class Employee(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True
    )

    employee_number = models.CharField(
        max_length=20,
        unique=True
    )

    hire_date = models.DateField()

    salary = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.user.username