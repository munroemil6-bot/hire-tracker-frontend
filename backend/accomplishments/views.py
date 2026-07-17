from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Accomplishment
from .serializers import AccomplishmentSerializer


class AccomplishmentViewSet(viewsets.ModelViewSet):
    queryset = Accomplishment.objects.all()
    serializer_class = AccomplishmentSerializer
    permission_classes = [IsAuthenticated]