from django.db import models

# Create your models here.
PRIORITY_CHOICES = [(str(i), str(i)) for i in range(1, 4)]

class MyPreference(models.Model):

   
    interest_out = models.CharField(
        max_length=100, null=False)
    interest_in = models.CharField(
        max_length=100, null=False)
    interest_leisure = models.CharField(
        max_length=100, null=False)
    purpose = models.CharField(max_length=100, null=False)
    gender = models.CharField(max_length=50, null=False)
    personality = models.CharField(max_length=50, null=False)
    language = models.CharField(max_length=50, null=False)
    priority1_interests_out = models.CharField(
        max_length=50, null=False, choices=PRIORITY_CHOICES)
    priority2_interests_in = models.CharField(
        max_length=50, null=False, choices=PRIORITY_CHOICES)  
    priority3_interests_lei = models.CharField(
        max_length=50, null=False, choices=PRIORITY_CHOICES)    
    priority4_purpose = models.CharField(
        max_length=50, null=False, choices=PRIORITY_CHOICES)
    priority5_trait = models.CharField(
        max_length=50, null=False, choices=PRIORITY_CHOICES)
   

def __str__(self):
    return self.id
