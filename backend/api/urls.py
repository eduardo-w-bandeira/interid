from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),]

for url_pattern in views.router.get_urlpatterns():
    urlpatterns.append(url_pattern)
