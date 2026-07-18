from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import LoginSerializer, RegisterSerializer


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer