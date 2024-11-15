from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from api import views

# rest_router = DefaultRouter()
# rest_router.register(r'users', views.UserViewSet)
# rest_router.register(r'individuals', views.IndividualViewSet)
# rest_router.register(r'legal-entitys', views.LegalEntityViewSet)
# rest_router.register(r'declarations', views.DeclarationViewSet)

urlpatterns = [
    # path('', include(rest_router.urls)),
    # path("individuals/", views.IndividualViews.as_view()),
    # path("individuals/<int:pk>/", views.IndividualDetail.as_view()),
    # path("legal-entitys/", views.LegalEntityViews.as_view()),
    # path("legal-entitys/<int:pk>/", views.LegalEntityDetail.as_view()),
    # path('login/', views.LoginView.as_view(), name='login')
]

views.wizrouter.include_urlpatterns(urlpatterns)
