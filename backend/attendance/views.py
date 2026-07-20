from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Attendance
from .serializers import AttendanceSerializer
from employees.models import Employee


def get_or_create_active_attendance(employee):
    active_record = Attendance.objects.filter(employee=employee, clock_out__isnull=True).order_by('-clock_in').first()
    if active_record:
        return active_record, False
    return Attendance.objects.create(employee=employee, clock_in=timezone.now()), True


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_staff or self.request.user.is_superuser or getattr(self.request.user, 'role', '') == 'ADMIN':
            return queryset
        employee = Employee.objects.filter(user=self.request.user).first()
        return queryset.filter(employee=employee) if employee else Attendance.objects.none()

    def perform_create(self, serializer):
        employee = Employee.objects.filter(user=self.request.user).first()
        if not employee:
            raise PermissionDenied('No employee record found.')
        serializer.save(employee=employee)

    @action(detail=False, methods=['post'])
    def clock_in(self, request):
        employee = Employee.objects.filter(user=request.user).first()
        if not employee:
            raise PermissionDenied('No employee record found.')

        attendance, created = get_or_create_active_attendance(employee)
        serializer = self.get_serializer(attendance)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def clock_out(self, request, pk=None):
        attendance = self.get_object()
        if attendance.employee.user != request.user and not (request.user.is_staff or request.user.is_superuser or getattr(request.user, 'role', '') == 'ADMIN'):
            raise PermissionDenied('Not allowed to clock out this record.')
        attendance.clock_out = timezone.now()
        attendance.save()
        serializer = self.get_serializer(attendance)
        return Response(serializer.data)