from django.urls import path
from . import views
import trail

# urlpatterns = [
#     path('multiply/', views.multiply_by_two, name='multiply_by_two'),
# ]

urlpatterns = trail.gen_urlpatterns(views)
