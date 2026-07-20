from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


from django.db.models import Q

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