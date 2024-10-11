from django.urls import path
from . import views

urlpatterns = [
    path('multiply/', views.multiply_by_two, name='multiply_by_two'),
]
