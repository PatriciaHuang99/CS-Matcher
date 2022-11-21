from curses.ascii import US
from django.shortcuts import render

from django.shortcuts import render, redirect

from rest_framework.views import APIView
#from requests import request, post
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from mypreference.models import MyPreference

from .models import User, UserAccount
from .serializers import UserSerializer
from .account_serializers import AccountSerializer


from users import serializers

# Create your views here.

"""
my profile
"""

# do not use
@api_view(['GET'])
def getMyProfiles(request):
    data = User.objects.all()
    serializers = UserSerializer(data, many=True)
    return Response(serializers.data)

# get
@api_view(['GET'])
def getMyProfile(request, pk):
    try: 
        data = User.objects.get(pk=pk)
        serializers = UserSerializer(
            data, context={'request': request}, many=False)
        return Response(serializers.data)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)



# do not use
@api_view(['GET', 'POST'])
def myprofile_list(request, pk):

    if request.method == 'GET':
        # data = User.objects.all()
        try:
            data = User.objects.get(pk=pk)
            serializer = UserSerializer(
                data, context={'request': request}, many=False)

            return Response(serializer.data)

        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':
        try: 
            data = User.objects.get(pk=pk)
            serializer = UserSerializer(data, many = False)
        except: 
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# use put and delete in myprofile


@api_view(['PUT', 'DELETE'])
def myprofile_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = UserSerializer(
            user, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()

            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  
        

"""
my account 
"""

# use post to store homeaccountID in db

# To do: below cannot tell if the homeAccountId already exists or not, check in React


@api_view(['GET', 'POST'])
def myaccount_list(request):
    if request.method == 'GET':
        data = UserAccount.objects.all()

        serializer = AccountSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        print(request.data)
        try:
            # use [] since data is stored in object {}
            print(request.data["homeAccountId"])
            userdata = UserAccount.objects.get(
                homeAccountId=request.data["homeAccountId"])  # query db, request server
            serializer = AccountSerializer(userdata, context={'request': request}, many=False)
            
            print(userdata)
        except:
            serializer = AccountSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                userdata = UserAccount.objects.get(
                    homeAccountId=request.data["homeAccountId"])

            # give the user default profile and preference
            userId = UserAccount.objects.get(homeAccountId=request.data["homeAccountId"]).id
            profile_data = User.objects.create(id= userId, first_name= "", last_name= "", contact_email= "", intro= "")
            profile_data.save()
            preference_data = MyPreference.objects.create(id=userId, interest_out="", interest_in="", interest_leisure="", purpose="", gender="", personality="", language= "", priority1_interests_out="", priority2_interests_in="", priority3_interests_lei="", priority4_purpose="", priority5_trait="",)
            preference_data.save()

        serializer = AccountSerializer(userdata, context={'request': request}, many=False)
        return Response(serializer.data)
     

    