from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Applicant
from .serializers import ApplicantSerializer


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
    permission_classes = [IsAuthenticated]