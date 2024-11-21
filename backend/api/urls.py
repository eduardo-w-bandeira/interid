# from django.urls import path, include
from api import views


urlpatterns = views.wizrouter.get_urlpatterns()
