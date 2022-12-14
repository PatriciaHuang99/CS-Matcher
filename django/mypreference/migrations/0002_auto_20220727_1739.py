# Generated by Django 3.2 on 2022-07-27 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mypreference', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyPreference',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('interest_out', models.CharField(max_length=100)),
                ('interest_in', models.CharField(max_length=100)),
                ('interest_leisure', models.CharField(max_length=100)),
                ('purpose', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=50)),
                ('personality', models.CharField(max_length=50)),
                ('language', models.CharField(max_length=50)),
                ('priority1_interests', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3')], max_length=50)),
                ('priority2_purposes', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3')], max_length=50)),
                ('priority3_trait', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3')], max_length=50)),
                ('gender_prefer', models.CharField(max_length=50)),
            ],
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
