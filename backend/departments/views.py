from rest_framework import generics
from .models import Department
from .serializers import DepartmentSerializer

from accounts.permissions import IsAdmin


class DepartmentCreateView(generics.CreateAPIView):

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    permission_classes = [IsAdmin]