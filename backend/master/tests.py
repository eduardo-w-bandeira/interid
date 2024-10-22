from django.test import TestCase
from .models import User


class UserTest(TestCase):
    def test_create_user(self):
        new_user = User.objects.create(
            email="bla@example.com",
            password="securepassword",
            user_type="individual",
            gov_id="123456789",
            gov_id_type="SSN",
            issuing_authority="Government",
            country="Canada"
        )
        self.assertEqual(new_user.email, "bla@example.com")
