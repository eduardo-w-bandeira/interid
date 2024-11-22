from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    related_user = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'

    def validate_password(self, value: str) -> str:
        return make_password(value)

    def get_related_user(self, obj):
        if obj.user_type == "individual":
            return IndividualSerializer(obj.individual).data
        return LegalEntitySerializer(obj.legalentity).data

    def get_full_name(self, obj):
        if obj.user_type == "individual":
            return f"{obj.individual.first_name} {obj.individual.last_name}"
        return obj.legalentity.business_name or obj.legalentity.legal_name


class IndividualSerializer(serializers.ModelSerializer):
    class Meta:
        model = Individual
        fields = '__all__'


class LegalEntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalEntity
        fields = '__all__'


class DeclarationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Declaration
        fields = '__all__'


class DeclarationCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeclarationComment
        fields = '__all__'


class AgreementSerializer(serializers.ModelSerializer):
    sender_full_name = serializers.SerializerMethodField()
    sender_id = serializers.SerializerMethodField()
    receiver_full_name = serializers.SerializerMethodField()
    receiver_id = serializers.SerializerMethodField()

    class Meta:
        model = Agreement
        fields = '__all__'

    def get_sender_full_name(self, obj):
        return obj.sender.full_name

    def get_sender_id(self, obj):
        return obj.sender.id

    def get_receiver_full_name(self, obj):
        return obj.receiver.full_name

    def get_receiver_id(self, obj):
        return obj.receiver.id


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if not user.is_active:
                    msg = 'User account is disabled.'
                    raise serializers.ValidationError(msg)
                data['user'] = user
            else:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg)
        else:
            msg = 'Must include "username" and "password"'
            raise serializers.ValidationError(msg)

        return data
