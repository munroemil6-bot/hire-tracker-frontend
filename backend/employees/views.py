from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Employee
from .serializers import EmployeeSerializer


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_staff or self.request.user.is_superuser or getattr(self.request.user, 'role', '') == 'ADMIN':
            return queryset
        return queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        if not (self.request.user.is_staff or self.request.user.is_superuser or getattr(self.request.user, 'role', '') == 'ADMIN'):
            if Employee.objects.filter(user=self.request.user).exists():
                raise PermissionDenied('Employee account already exists.')
            serializer.save(user=self.request.user)
        else:
            serializer.save()