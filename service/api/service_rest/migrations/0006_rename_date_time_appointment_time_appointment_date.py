# Generated by Django 4.0.3 on 2023-04-28 02:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_alter_appointment_vin'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='date_time',
            new_name='time',
        ),
        migrations.AddField(
            model_name='appointment',
            name='date',
            field=models.DateField(null=True),
        ),
    ]
