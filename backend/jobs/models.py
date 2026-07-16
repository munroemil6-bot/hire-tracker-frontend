from django.db import models
from departments.models import Department

# Create your models here.
class Job(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    deadline = models.DateField()

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    def __str__(self):
        return self.title