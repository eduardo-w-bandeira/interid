from rest_framework import serializers
from .models import *


class UserSer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class IndividualSer(serializers.ModelSerializer):
    class Meta:
        model = Individual
        fields = '__all__'


class LegalEntitySer(serializers.ModelSerializer):
    class Meta:
        model = LegalEntity
        fields = '__all__'
