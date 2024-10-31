from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.LoginView.as_view(), name='login')
]

for url_pattern in views.wizroute.get_urlpatterns():
    urlpatterns.append(url_pattern)
