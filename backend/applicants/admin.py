from django.contrib import admin
from .models import Applicant


@admin.register(Applicant)
class ApplicantAdmin(admin.ModelAdmin):

    list_display = (
        "user",
        "job",
        "application_status",
    )

    search_fields = (
        "user__username",
    )

    list_filter = (
        "application_status",
        "job",
    )

    ordering = (
        "application_status",
    )