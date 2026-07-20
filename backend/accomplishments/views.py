from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Accomplishment
from .serializers import AccomplishmentSerializer
from employees.models import Employee


class AccomplishmentViewSet(viewsets.ModelViewSet):
    queryset = Accomplishment.objects.all()
    serializer_class = AccomplishmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_staff or self.request.user.is_superuser or getattr(self.request.user, 'role', '') == 'ADMIN':
            return queryset
        employee = Employee.objects.filter(user=self.request.user).first()
        return queryset.filter(employee=employee) if employee else Accomplishment.objects.none()

    def perform_create(self, serializer):
        employee = Employee.objects.filter(user=self.request.user).first()
        if not employee:
            raise PermissionDenied('No employee record found.')
        serializer.save(employee=employee)