# Generated by Django 5.1.2 on 2024-10-22 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('user_type', models.CharField(choices=[('individual', 'Individual'), ('legal_entity', 'Legal Entity')], max_length=20)),
                ('gov_id', models.CharField(max_length=100)),
                ('gov_id_type', models.CharField(max_length=100)),
                ('issuing_authority', models.CharField(max_length=100)),
                ('country', models.CharField(default='Canada', max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'unique_together': {('gov_id', 'gov_id_type', 'issuing_authority', 'country')},
            },
        ),
    ]
