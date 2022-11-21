from django.urls import path, include, URLPattern


from users.views import getMyProfile, myprofile_list, myprofile_detail, myaccount_list
from . import views
from . import *
from .serializers import UserSerializer

urlpatterns = [
    
    path('my-profile/<str:pk>/', views.getMyProfile),
    path('my-profile/delete/put/<str:pk>', views.myprofile_detail),
    path('my-account/get/post', views.myaccount_list)

]
