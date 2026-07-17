from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = (
        "username",
        "email",
        "role",
        "phone",
        "is_staff",
        "is_superuser",
    )

    search_fields = (
        "username",
        "email",
    )

    list_filter = (
        "role",
        "is_staff",
        "is_superuser",
    )

    ordering = (
        "username",
    )