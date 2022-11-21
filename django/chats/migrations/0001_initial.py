# Generated by Django 3.2 on 2022-08-14 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chatA_id', models.CharField(max_length=50)),
                ('chatB_id', models.CharField(max_length=50)),
                ('date', models.DateField()),
                ('schedule_time', models.TextField(blank=True, default='9:00', null=True)),
            ],
        ),
    ]
