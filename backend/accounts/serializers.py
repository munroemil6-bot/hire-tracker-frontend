from django.db.models import Q
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User

class LoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token

    def validate(self, attrs):
        identifier = attrs.get('username')
        if identifier and '@' in identifier:
            try:
                user = User.objects.get(Q(email__iexact=identifier) | Q(username__iexact=identifier))
                attrs['username'] = user.username
            except User.DoesNotExist:
                pass

        data = super().validate(attrs)
        data['id'] = self.user.id
        data['role'] = self.user.role
        data['username'] = self.user.username
        data['email'] = self.user.email or ''
        data['phone'] = self.user.phone or ''
        return data


class RegisterSerializer(serializers.ModelSerializer):
    access = serializers.SerializerMethodField(read_only=True)
    refresh = serializers.SerializerMethodField(read_only=True)

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
            "access",
            "refresh",
        ]

        extra_kwargs = {
            "password": {"write_only": True}
        }

    def get_access(self, obj):
        return str(RefreshToken.for_user(obj).access_token)

    def get_refresh(self, obj):
        return str(RefreshToken.for_user(obj))

    def create(self, validated_data):
        password = validated_data.pop("password", "123456") or "123456"
        validated_data.setdefault("role", "APPLICANT")

        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user