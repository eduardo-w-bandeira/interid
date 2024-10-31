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
