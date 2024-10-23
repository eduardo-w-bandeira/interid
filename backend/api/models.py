from django.db import models


class User(models.Model):
    USER_TYPE_CHOICES = [
        ('individual', 'Individual'),
        ('legal_entity', 'Legal Entity'),
    ]
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100, unique=True, null=False)
    password = models.CharField(max_length=100, null=False, blank=False)
    user_type = models.CharField(
        max_length=20, choices=USER_TYPE_CHOICES, null=False)
    gov_id = models.CharField(max_length=100, null=False, blank=False)
    gov_id_type = models.CharField(max_length=100, null=False, blank=False)
    issuing_authority = models.CharField(
        max_length=100, null=False, blank=False)
    country = models.CharField(
        max_length=100, default="Canada", null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'  # Use email as the unique identifier
    REQUIRED_FIELDS = []  # Email & password are required by default

    class Meta:
        unique_together = ('gov_id', 'gov_id_type',
                           'issuing_authority', 'country')

    def __str__(self):
        return self.email


# class Individual(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     first_name = models.CharField(max_length=200)
#     last_name = models.CharField(max_length=200)
#     birth_date = models.DateField(null=False, blank=False)


# class LegalEntity(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     legal_name = models.CharField(max_length=200)
#     business_name = models.CharField(max_length=200)
#     reg_date = models.DateField(null=False, blank=False)


# class Declaration(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     title = models.CharField(max_length=100, blank=True)
#     content = models.TextField()
#     allow_comments = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)


# class Agreement(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     title = models.CharField(max_length=100, blank=True)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)


# class AgreementParticipant(models.Model):
#     agreement = models.ForeignKey(Agreement, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)

#     class Meta:
#         unique_together = ('agreement', 'user')


# class DeclarationComment(models.Model):
#     declaration = models.ForeignKey(Declaration, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     content = models.TextField()
#     parent_comment_id = models.IntegerField(null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
