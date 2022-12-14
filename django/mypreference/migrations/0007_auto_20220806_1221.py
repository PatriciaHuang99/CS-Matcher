# Generated by Django 3.2 on 2022-08-06 12:21

from django.db import migrations

def update_data(apps, schema_editor):
    MyPreference = apps.get_model('mypreference', 'MyPreference')
    m = MyPreference.objects.get(id=2)
    m.interest_out = "Sport"
    m.save()

class Migration(migrations.Migration):

    dependencies = [
        ('mypreference', '0006_auto_20220806_1152'),
    ]

    operations = [
        migrations.RunPython(update_data),
    ]
