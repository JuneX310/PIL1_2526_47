from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('', views.landing_page, name='landing_page'),
    path('connexion/', views.connexion, name='connexion'),
    path('deconnexion/', views.deconnexion, name='deconnexion'),
    path('inscription/', views.inscription, name='inscription'),
    path('reinitialisation/', views.reinitialisation, name='reinitialisation'),
    path('api/check/', views.api_check_disponibilite, name='api_check_disponibilite'),
]
