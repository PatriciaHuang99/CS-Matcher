# Generated by Django 3.2 on 2022-08-08 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mypreference', '0011_auto_20220807_0904'),
    ]

    operations = [
        migrations.AddField(
            model_name='mypreference',
            name='homeAccountId',
            field=models.CharField(max_length=150, null=True),
        ),
    ]
