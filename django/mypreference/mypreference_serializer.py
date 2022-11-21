from rest_framework import serializers
from .models import MyPreference
 
class MyPreferenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyPreference
        fields = ('pk','interest_out', 'interest_in', 'interest_leisure', 'purpose', 'gender', 'personality', 'language', 'priority1_interests_out', 'priority2_interests_in', 'priority3_interests_lei','priority4_purpose', 'priority5_trait',)
        #traits(gender, personaility, language), only personaility account for matching



