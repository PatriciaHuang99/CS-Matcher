# Generated by Django 3.2 on 2022-07-23 21:09

from django.db import migrations


def create_data(apps, schema_editor):
    User = apps.get_model('users', 'User')
    User(first_name="Gold", last_name="Smith", contact_email="123@gmail.com", intro="hello", microsoft_access_token="00000", interest_out="sport", interest_in="reading", interest_leisure="video", purpose="make friends", gender="female", gender_prefer="female", personality="extravert", language_sp1="Spanish", language_sp2="Irish", priority1="1", priority2="2", priority3="3").save()


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_rename_users_user'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
