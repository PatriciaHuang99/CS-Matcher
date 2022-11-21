
from curses.ascii import US
from django.shortcuts import render

from django.shortcuts import render, redirect

from rest_framework.views import APIView
#from requests import request, post
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import MyPreference
from .mypreference_serializer import MyPreferenceSerializer

from mypreference import mypreference_serializer

# Create your views here.


@api_view(['GET'])
def getMyPreference(request, pk):
    try: 
        data = MyPreference.objects.get(pk=pk)
        serializers = MyPreferenceSerializer(data, context={'request': request}, many=False)
        return Response(serializers.data)
    except MyPreference.DoesNotExist:
        return (Response(status=status.HTTP_404_NOT_FOUND))


# get/post an user preference in my preference
@api_view(['GET', 'POST'])
def mypreference_detail(request, pk):
    if request.method == 'GET':
        data = MyPreference.objects.get(pk=pk)

        serializer = MyPreferenceSerializer(
            data, context={'request': request}, many=False)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MyPreferenceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# put and delete my preference
@api_view(['PUT','DELETE'])
def update_mypreference(request, pk):
    try:
        mypreference_data = MyPreference.objects.get(pk=pk)
        # print(mypreference_data)
    except MyPreference.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = MyPreferenceSerializer(
            mypreference_data, data=request.data, context={'request': request})
        # print("hello", request.data)

        # serializer.is_valid()
        # print(serializer.errors) # print errors in serializer.is_valid()
        if serializer.is_valid():
            serializer.save()
            
            return Response(status=status.HTTP_204_NO_CONTENT) # 204 success msg
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        mypreference_data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


