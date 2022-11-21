# Generated by Django 3.2 on 2022-07-24 09:10

from django.db import migrations

def create_data(apps, schema_editor):
    User = apps.get_model('users', 'User')
    User(first_name="Louis", last_name="Cookie", contact_email="234@gmail.com", intro="I am friendly", microsoft_access_token="00001", interest_out="sport", interest_in="reading", interest_leisure="video", purpose="make friends", gender="female", gender_prefer="female", personality="extravert", language_sp1="Spanish", language_sp2="Irish", priority1="1", priority2="2", priority3="3").save()


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20220723_2109'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]