from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.permissions import IsAdmin
from employees.models import Employee
from .models import Applicant
from .serializers import ApplicantSerializer


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and getattr(user, 'role', None) == 'ADMIN':
            return Applicant.objects.all()
        # applicants see only their own application
        return Applicant.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        if not user.is_authenticated:
            raise PermissionDenied("Authentication required")

        # only users with APPLICANT role should create application via this endpoint
        if getattr(user, 'role', None) != 'APPLICANT':
            raise PermissionDenied("Only applicants can submit applications")

        serializer.save(user=user, application_status='PENDING')

    def update(self, request, *args, **kwargs):
        # restrict changes to application_status to admins only
        if 'application_status' in request.data and getattr(request.user, 'role', None) != 'ADMIN':
            raise PermissionDenied("Only admins can change application status")
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        if 'application_status' in request.data and getattr(request.user, 'role', None) != 'ADMIN':
            raise PermissionDenied("Only admins can change application status")
        return super().partial_update(request, *args, **kwargs)

    @action(detail=True, methods=['post'], permission_classes=[IsAdmin])
    def approve(self, request, pk=None):
        applicant = self.get_object()
        applicant.application_status = 'APPROVED'
        applicant.save(update_fields=['application_status'])

        user = applicant.user
        if getattr(user, 'role', None) != 'EMPLOYEE':
            user.role = 'EMPLOYEE'
            user.save(update_fields=['role'])

        Employee.objects.get_or_create(
            user=user,
            defaults={
                'department': applicant.job.department,
                'employee_number': f'EMP-{user.id:04d}',
                'hire_date': applicant.job.deadline,
                'salary': applicant.job.salary,
            },
        )

        serializer = self.get_serializer(applicant)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[IsAdmin])
    def decline(self, request, pk=None):
        applicant = self.get_object()
        applicant.application_status = 'REJECTED'
        applicant.save(update_fields=['application_status'])

        user = applicant.user
        if getattr(user, 'role', None) != 'APPLICANT':
            user.role = 'APPLICANT'
            user.save(update_fields=['role'])

        serializer = self.get_serializer(applicant)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'], permission_classes=[IsAdmin])
    def remove(self, request, pk=None):
        applicant = self.get_object()
        applicant.delete()
        return Response({'detail': 'Applicant removed successfully'}, status=status.HTTP_200_OK)