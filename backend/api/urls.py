from django.urls import path
from .views import *

urlpatterns = [
    path('multiply/', multiply, name=multiply.__name__),
    path('users/', UserView.as_view(), name=UserView.__name__),
]

# urlpatterns = views.router.get_urlpatterns()
