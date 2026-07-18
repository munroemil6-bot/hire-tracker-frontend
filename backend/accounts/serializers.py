from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        data['username'] = self.user.username
        return data


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            "id",
            "username",
            "email",
            "password",
            "phone",
            "role",
            "profile_picture",
        ]

        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):

        password = validated_data.pop("password", "123456") or "123456"

        user = User(**validated_data)

        user.set_password(password)

        user.save()

        return user