from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError
from django.db import models

__all__ = ["User", "Individual", "LegalEntity", "Declaration",
           "Agreement", "DeclarationComment",
           "Proposal", "Notification"]


class UserManager(BaseUserManager):
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


class User(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = [
        ("individual", "Individual"),
        ("legal entity", "Legal Entity"),]

    email = models.EmailField(unique=True)
    user_type = models.CharField(
        max_length=50, choices=USER_TYPE_CHOICES, null=False)
    gov_id = models.CharField(max_length=100, null=False)
    gov_id_type = models.CharField(max_length=50, null=False)
    issuing_authority = models.CharField(max_length=100, null=False)
    country = models.CharField(max_length=100, null=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    @property
    def related_user(self):
        if self.user_type == "individual":
            return self.individual
        return self.legalentity

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_type', 'gov_id',
                       'gov_id_type', 'issuing_authority', 'country']

    class Meta:
        unique_together = ("gov_id", "gov_id_type",
                           "issuing_authority", "country")

    # def __str__(self):
    #     return self.email


class Individual(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=200, null=False)
    last_name = models.CharField(max_length=200, null=False)
    birth_date = models.DateField(null=False, blank=False)

    def save(self, *args, **kwargs):
        # Check if the User is associated with a LegalEntity
        if LegalEntity.objects.filter(user=self.user).exists():
            raise ValidationError(
                "This user is already associated with a Legal Entity.")
        super().save(*args, **kwargs)


class LegalEntity(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    legal_name = models.CharField(max_length=200, null=False)
    business_name = models.CharField(max_length=200)
    reg_date = models.DateField(null=False, blank=False)

    def save(self, *args, **kwargs):
        # Check if the User is associated with an Individual
        if Individual.objects.filter(user=self.user).exists():
            raise ValidationError(
                "This user is already associated with an Individual.")
        super().save(*args, **kwargs)


class Declaration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True)
    body = models.TextField(null=False)
    allow_comments = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


class DeclarationComment(models.Model):
    declaration = models.ForeignKey(Declaration, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Proposal(models.Model):
    # Proposal sender
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, related_name="sent_proposals")
    receiver = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True)
    body = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    # Indicates if the proposal has been converted to an agreement
    is_finalized = models.BooleanField(default=False)


class Agreement(models.Model):
    user1 = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, related_name="agreements_as_user1")
    user2 = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, related_name="agreements_as_user2")
    proposal = models.OneToOneField(
        Proposal, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True)
    body = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Notification(models.Model):
    NOTIFICATION_TYPE_CHOICES = [
        ('proposal', 'Agreement Proposal Notification'),
        ('letter', 'Letter Notification'),
    ]

    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notifications")
    sender = models.ForeignKey(User, on_delete=models.SET_NULL,
                               null=True, blank=True, related_name="sent_notifications")
    type = models.CharField(max_length=20, choices=NOTIFICATION_TYPE_CHOICES)
    body = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    proposal = models.ForeignKey(
        Proposal, null=True, blank=True, on_delete=models.CASCADE, related_name="notifications")
