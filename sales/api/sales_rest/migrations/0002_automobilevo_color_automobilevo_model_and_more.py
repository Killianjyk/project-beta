# Generated by Django 4.0.3 on 2023-04-25 00:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='color',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='model',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='year',
            field=models.IntegerField(null=True),
        ),
    ]