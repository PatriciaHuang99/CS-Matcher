from django.db import models
from django.forms import CharField

# Create your models here.

class Chats(models.Model):
    
    chatA_id = models.CharField(max_length=50, null=False)
    chatB_id = models.CharField(max_length=50, null=False)
    schedule_time = models.TextField(default= "9:00", blank=True, null=True)
    date = models.CharField(max_length=50, null=False)

    # videochat = models.URLField(max_length=200)
    # textchat = models.URLField(max_length=200)
    # chat_status = models.CharField(max_length=50, default="next")

def __str__(self):
    return self.id


    
