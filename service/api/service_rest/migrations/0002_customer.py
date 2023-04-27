# Generated by Django 4.0.3 on 2023-04-25 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]