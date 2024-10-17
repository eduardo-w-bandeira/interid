from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, open_id, real_name, email, password=None, is_legal_entity=False, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set.')
        email = self.normalize_email(email)
        user = self.model(open_id=open_id, real_name=real_name,
                          email=email, is_legal_entity=is_legal_entity, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, open_id, real_name, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(open_id, real_name, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    open_id = models.CharField(
        max_length=50, unique=True)  # Open International ID
    real_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    # Identifies if the user is a legal entity
    is_legal_entity = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'open_id'
    REQUIRED_FIELDS = ['real_name', 'email']

    objects = UserManager()

    def __str__(self):
        return self.real_name

# Legal entity model


class LegalEntity(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name='legal_entity')
    # Legal entity's registration number
    registration_number = models.CharField(max_length=100, unique=True)
    representative = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                       related_name='represented_entities')  # Representative is an individual user

    def __str__(self):
        return f"{self.user.real_name} (Legal Entity)"

# Public declaration model


class Declaration(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='declarations')
    title = models.CharField(max_length=255)
    content = models.TextField()
    declared_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.user.name}"

# Formal agreement model


class Agreement(models.Model):
    parties = models.ManyToManyField(User, related_name='agreements')
    legal_entities = models.ManyToManyField(
        LegalEntity, blank=True, related_name='agreements')
    title = models.CharField(max_length=255)
    content = models.TextField()
    is_public = models.BooleanField(default=False)  # Default private
    signed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# Contract signature model


class Signature(models.Model):
    agreement = models.ForeignKey(
        Agreement, on_delete=models.CASCADE, related_name='signatures')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    signed_at = models.DateTimeField(null=True, blank=True)
    is_signed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.name} signed: {self.is_signed}"
