# Generated by Django 3.2 on 2022-08-06 12:32

from django.db import migrations

def create_data(apps, schema_editor):
    MyPreference = apps.get_model('mypreference', 'MyPreference')
    MyPreference(interest_out="BBQ", interest_in="Yoga", interest_leisure="Coffee shop", purpose="Make friends", gender="Female",
                 personality="Extravert", language="Arabic", priority1_interests_out="1", priority2_interests_in="2", priority3_interests_lei="3", priority4_purpose="3", priority5_trait="2", gender_prefer="female").save()


class Migration(migrations.Migration):

    dependencies = [
        ('mypreference', '0008_auto_20220806_1226'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
