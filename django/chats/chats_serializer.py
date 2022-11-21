from rest_framework import serializers
from .models import Chats
 
class ChatsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chats
        fields = ('pk','chatA_id', 'chatB_id', 'schedule_time', 'date',)
       