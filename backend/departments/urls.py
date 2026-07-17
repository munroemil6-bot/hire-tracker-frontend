from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import DepartmentViewSet

router = DefaultRouter()
router.register(r"", DepartmentViewSet, basename="department")

urlpatterns = [
    path("", include(router.urls)),
]
