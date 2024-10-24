from django.urls import path
from .views import *

urlpatterns = [
    path('multiply/', multiply,
         name=multiply.__name__),
    path('users/', UserView.as_view(),
         name=UserView.__name__),
    path("individuals/", IndividualView.as_view(),
         name=IndividualView.__name__),
    path("individuals/<int:id>/", IndividualDetail.as_view(),
         name=IndividualDetail.__name__),
    path("legal_entitys/", LegalEntityView.as_view(),
         name=LegalEntityView.__name__),
    path("legal_entitys/<int:id>/", LegalEntityDetail.as_view(),
         name=LegalEntityDetail.__name__),
]

# urlpatterns = views.router.get_urlpatterns()
