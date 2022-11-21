# Generated by Django 3.2 on 2022-07-25 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20220724_0920'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='gender',
        ),
        migrations.RemoveField(
            model_name='user',
            name='gender_prefer',
        ),
        migrations.RemoveField(
            model_name='user',
            name='interest_in',
        ),
        migrations.RemoveField(
            model_name='user',
            name='interest_leisure',
        ),
        migrations.RemoveField(
            model_name='user',
            name='interest_out',
        ),
        migrations.RemoveField(
            model_name='user',
            name='language_sp1',
        ),
        migrations.RemoveField(
            model_name='user',
            name='language_sp2',
        ),
        migrations.RemoveField(
            model_name='user',
            name='personality',
        ),
        migrations.RemoveField(
            model_name='user',
            name='priority1',
        ),
        migrations.RemoveField(
            model_name='user',
            name='priority2',
        ),
        migrations.RemoveField(
            model_name='user',
            name='priority3',
        ),
        migrations.RemoveField(
            model_name='user',
            name='purpose',
        ),
        migrations.RemoveField(
            model_name='user',
            name='user_status',
        ),
        migrations.AlterField(
            model_name='user',
            name='microsoft_access_token',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
