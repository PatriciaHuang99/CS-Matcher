from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Chats
from .chats_serializer import ChatsSerializer
# Create your views here.


@api_view(['GET'])
def getMyPartner(request, chatA_id):
    try:

        data = Chats.objects.get(chatA_id=chatA_id)
        serializers = ChatsSerializer(data, context={'request': request}, many=False)
        return Response(serializers.data)
    except Chats.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
