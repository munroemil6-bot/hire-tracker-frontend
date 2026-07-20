from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from accounts.models import User
from notifications.models import Notification
from .models import Job
from .serializers import JobSerializer


def notify_new_job(job):
    for user in User.objects.filter(role__in=['APPLICANT', 'EMPLOYEE', 'ADMIN']):
        Notification.objects.create(user=user, message=f'New job posted: {job.title}', kind='NEW_JOB_POSTED')


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        job = serializer.save()
        notify_new_job(job)