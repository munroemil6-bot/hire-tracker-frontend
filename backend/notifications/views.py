from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from .models import Notification
from .serializers import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_staff or self.request.user.is_superuser or getattr(self.request.user, 'role', '') == 'ADMIN':
            return queryset.order_by('-created_at')
        return queryset.filter(user=self.request.user).order_by('-created_at')

    @action(detail=False, methods=['post'])
    def send_reminder(self, request):
        if not (request.user.is_staff or request.user.is_superuser or getattr(request.user, 'role', '') == 'ADMIN'):
            return Response({'detail': 'Only admins can send reminders.'}, status=status.HTTP_403_FORBIDDEN)

        message = request.data.get('message', 'Please remember to clock in today.')
        for user in User.objects.filter(role='EMPLOYEE'):
            Notification.objects.create(user=user, message=message, kind='ATTENDANCE_REMINDER')
        return Response({'detail': 'Attendance reminders sent.'}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def announce(self, request):
        if not (request.user.is_staff or request.user.is_superuser or getattr(request.user, 'role', '') == 'ADMIN'):
            return Response({'detail': 'Only admins can send announcements.'}, status=status.HTTP_403_FORBIDDEN)

        message = request.data.get('message', 'Company announcement')
        for user in User.objects.exclude(role='ADMIN'):
            Notification.objects.create(user=user, message=message, kind='COMPANY_ANNOUNCEMENT')
        return Response({'detail': 'Announcement sent.'}, status=status.HTTP_201_CREATED)