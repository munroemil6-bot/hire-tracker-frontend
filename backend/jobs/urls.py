from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import JobViewSet

router = DefaultRouter()
router.register(r"", JobViewSet, basename="job")

urlpatterns = [
    path("", include(router.urls)),
]
