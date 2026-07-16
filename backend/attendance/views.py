from accounts.permissions import IsEmployee

class AttendanceView(generics.ListAPIView):

    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    permission_classes = [IsEmployee]