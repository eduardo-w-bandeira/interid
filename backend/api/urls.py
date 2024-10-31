from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
# router.register(r'individuals', views.IndividualViewSet)
# router.register(r'legal-entitys', views.LegalEntityViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("individuals/", views.IndividualViews.as_view()),
    path("individuals/<int:pk>/", views.IndividualDetail.as_view()),
    path("legal-entitys/", views.LegalEntityViews.as_view()),
    path("legal-entitys/<int:pk>/", views.LegalEntityDetail.as_view()),
    path('login/', views.LoginView.as_view(), name='login')
]

# for url_pattern in views.wizroute.get_urlpatterns():
#     urlpatterns.append(url_pattern)
