from django.db import models
from employees.models import Employee

class Accomplishment(models.Model):
    employee = models.ForeignKey(
        Employee,
        on_delete=models.CASCADE,
        related_name="accomplishments"
    )

    title = models.CharField(max_length=200)

    description = models.TextField()

    date = models.DateField()

    def __str__(self):
        return self.title