from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    USER_TYPE_CHOICES = [
        ('individual', 'Individual'),
        ('legal_entity', 'Legal Entity'),
    ]

    email = models.EmailField(max_length=100, unique=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # Required for admin
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'  # Use email as the unique identifier
    REQUIRED_FIELDS = []  # Email & password are required by default

    def __str__(self):
        return self.email


class Individual(models.Model):
    user_profile = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    birth_date = models.DateField(null=True, blank=True)
    gov_id = models.CharField(max_length=255, unique=True)
    issuing_authority = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)


class LegalEntity(models.Model):
    user_profile = models.OneToOneField(User, on_delete=models.CASCADE)
    legal_name = models.CharField(max_length=255)
    business_name = models.CharField(max_length=255)
    reg_num = models.CharField(max_length=255, unique=True)
    reg_date = models.DateField(null=True, blank=True)


class Declaration(models.Model):
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True)
    content = models.TextField()
    allow_comments = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Agreement(models.Model):
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class AgreementParticipant(models.Model):
    agreement = models.ForeignKey(Agreement, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('agreement', 'user_profile')


class DeclarationComment(models.Model):
    declaration = models.ForeignKey(Declaration, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    parent_comment_id = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
