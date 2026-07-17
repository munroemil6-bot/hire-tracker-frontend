from django.contrib import admin
from .models import Attendance


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):

    list_display = (
        "employee",
        "clock_in",
        "clock_out",
    )

    list_filter = (
        "clock_in",
    )

    ordering = (
        "-clock_in",
    )