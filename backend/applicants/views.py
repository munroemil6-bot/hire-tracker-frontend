from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.permissions import IsAdmin
from employees.models import Employee
from notifications.models import Notification
from .models import Applicant
from .serializers import ApplicantSerializer


def create_notification(user, message, kind='GENERAL'):
    if user and getattr(user, 'is_authenticated', False):
        Notification.objects.create(user=user, message=message, kind=kind)


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

        if getattr(user, 'role', None) not in {'APPLICANT', 'ADMIN'}:
            raise PermissionDenied("Only applicants or admins can submit applications")

        job = serializer.validated_data.get('job')
        if Applicant.objects.filter(user=user, job=job, application_status='PENDING').exists():
            raise PermissionDenied("You already have a pending application for this job")

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

        create_notification(user, f'Your application for {applicant.job.title} has been approved.', 'APPLICATION_APPROVED')
        create_notification(applicant.job.created_by if hasattr(applicant.job, 'created_by') else None, f'Application approved for {applicant.user.username}.', 'APPLICATION_APPROVED')

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

        create_notification(user, f'Your application for {applicant.job.title} has been rejected.', 'APPLICATION_REJECTED')
        serializer = self.get_serializer(applicant)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[IsAdmin])
    def interview(self, request, pk=None):
        applicant = self.get_object()
        interview_date = request.data.get('interview_date')
        if not interview_date:
            return Response({'detail': 'interview_date is required'}, status=status.HTTP_400_BAD_REQUEST)

        applicant.interview_date = interview_date
        applicant.save(update_fields=['interview_date'])
        serializer = self.get_serializer(applicant)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'], permission_classes=[IsAdmin])
    def remove(self, request, pk=None):
        applicant = self.get_object()
        applicant.delete()
        return Response({'detail': 'Applicant removed successfully'}, status=status.HTTP_200_OK)