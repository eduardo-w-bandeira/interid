# Generated by Django 5.1.3 on 2024-11-20 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_remove_notification_sender'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='proposal',
            name='is_finalized',
        ),
        migrations.AddField(
            model_name='proposal',
            name='has_approved',
            field=models.BooleanField(default=None, null=True),
        ),
    ]
