from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import EmployeeViewSet

router = DefaultRouter()
router.register(r"", EmployeeViewSet, basename="employee")

urlpatterns = [
    path("", include(router.urls)),
]
