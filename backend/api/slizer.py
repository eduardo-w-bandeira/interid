from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import *


class UserSlizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class IndividualSlizer(serializers.ModelSerializer):
    class Meta:
        model = Individual
        fields = '__all__'


class LegalEntitySlizer(serializers.ModelSerializer):
    class Meta:
        model = LegalEntity
        fields = '__all__'


class LoginSlizer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if user:
                if not user.is_active:
                    msg = 'User account is disabled.'
                    raise serializers.ValidationError(msg)

                attrs['user'] = user
            else:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg)
        else:
            msg = 'Must include "username" and "password"'
            raise serializers.ValidationError(msg)

        return attrs
