from django.urls import path, URLPattern
from chats.views import getMyPartner
# from .views import *

from . import views

urlpatterns = [

path('get/<str:chatA_id>', views.getMyPartner),

]