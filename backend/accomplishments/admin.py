from django.contrib import admin
from .models import Accomplishment


@admin.register(Accomplishment)
class AccomplishmentAdmin(admin.ModelAdmin):

    list_display = (
        "employee",
        "title",
        "date",
    )

    search_fields = (
        "title",
    )

    ordering = (
        "-date",
    )