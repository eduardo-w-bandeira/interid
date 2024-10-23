from rest_framework import serializers
from .models import *


class UserSer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'user_type', 'gov_id',
                  'gov_id_type', 'issuing_authority', 'country']
