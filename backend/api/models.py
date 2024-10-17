from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    USER_TYPE_CHOICES = [
        ('individual', 'Individual'),
        ('legal_entity', 'Legal Entity'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)


class Individual(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    birth_date = models.DateField(null=True, blank=True)
    gov_id = models.CharField(max_length=255, unique=True)
    issuing_authority = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)


class LegalEntity(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    legal_name = models.CharField(max_length=255)
    business_name = models.CharField(max_length=255)
    reg_num = models.CharField(max_length=255, unique=True)
    reg_date = models.DateField(null=True, blank=True)


class Declaration(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True)
    content = models.TextField()
    allow_comments = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Agreement(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class AgreementParticipant(models.Model):
    agreement = models.ForeignKey(Agreement, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('agreement', 'user_profile')


class DeclarationComment(models.Model):
    declaration = models.ForeignKey(Declaration, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    content = models.TextField()
    parent_comment_id = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
