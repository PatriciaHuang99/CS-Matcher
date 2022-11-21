from django.db import models


PRIORITY_CHOICES = [(str(i), str(i)) for i in range(1, 4)]
# Create your models here.

class UserAccount(models.Model):
    homeAccountId = models.CharField(max_length=150, null=False)
    username = models.EmailField(max_length=254, null=True, blank=True) #login Microsoft email
    # accessToken = models.CharField(max_length = 1500, null = True)



class User(models.Model):

    first_name = models.CharField(max_length=50, null=False)
    last_name = models.CharField(max_length=50, null=False)
    contact_email = models.EmailField(max_length=254, null=False)
    intro = models.TextField(blank=True, null=True)
   


def __str__(self):
    return self.id
