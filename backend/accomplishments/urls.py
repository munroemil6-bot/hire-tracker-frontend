from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import AccomplishmentViewSet

router = DefaultRouter()
router.register(r"", AccomplishmentViewSet, basename="accomplishment")

urlpatterns = [
    path("", include(router.urls)),
]
