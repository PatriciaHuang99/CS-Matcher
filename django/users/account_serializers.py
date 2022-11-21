from rest_framework import serializers
from .models import UserAccount

class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserAccount
        fields = ('pk', 'username', 'homeAccountId',) # with pk?, here don't need username // 'accessToken'
      


