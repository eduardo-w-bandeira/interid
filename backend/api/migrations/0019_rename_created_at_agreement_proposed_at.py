# Generated by Django 5.1.3 on 2024-11-21 21:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_agreement_approved_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='agreement',
            old_name='created_at',
            new_name='proposed_at',
        ),
    ]