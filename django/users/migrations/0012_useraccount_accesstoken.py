# Generated by Django 3.2 on 2022-08-08 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_useraccount'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='accessToken',
            field=models.CharField(max_length=1500, null=True),
        ),
    ]