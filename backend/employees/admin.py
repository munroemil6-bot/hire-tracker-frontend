from django.contrib import admin
from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):

    list_display = (
        "employee_number",
        "user",
        "department",
        "salary",
        "hire_date",
    )

    search_fields = (
        "employee_number",
        "user__username",
    )

    list_filter = (
        "department",
    )

    ordering = (
        "employee_number",
    )