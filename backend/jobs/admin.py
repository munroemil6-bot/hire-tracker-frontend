from django.contrib import admin
from .models import Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "department",
        "salary",
        "deadline",
    )

    search_fields = (
        "title",
    )

    list_filter = (
        "department",
    )

    ordering = (
        "deadline",
    )