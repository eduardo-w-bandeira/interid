from rest_framework import serializers
from .models import *


class UserSer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ['email', 'user_type', 'gov_id',
        #           'gov_id_type', 'issuing_authority', 'country']
        fields = '__all__'


class IndividualSer(serializers.ModelSerializer):
    class Meta:
        model = Individual
        # fields = ['first_name', 'last_name', 'birth_date']
        fields = '__all__'
