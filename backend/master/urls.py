from django.urls import path
from . import views

# urlpatterns = [
#     path('multiply_by_two/', views.multiply_by_two, name='multiply_by_two'),
# ]

urlpatterns = views.router.get_urlpatterns()
