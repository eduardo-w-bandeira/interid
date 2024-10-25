from django.urls import path
from api import views
# from .views import *

# urlpatterns = [
#     path('multiply/', multiply,
#          name=multiply.__name__),
#     path('users/', UserViews.as_view(),
#          name=UserViews.__name__),
#     path("individuals/", IndividualViews.as_view(),
#          name=IndividualViews.__name__),
#     path("individuals/<int:id>/", IndividualDetail.as_view(),
#          name=IndividualDetail.__name__),
#     path("legal_entitys/", LegalEntityViews.as_view(),
#          name=LegalEntityViews.__name__),
#     path("legal_entitys/<int:id>/", LegalEntityDetail.as_view(),
#          name=LegalEntityDetail.__name__),
# ]

urlpatterns = views.router.get_urlpatterns()
