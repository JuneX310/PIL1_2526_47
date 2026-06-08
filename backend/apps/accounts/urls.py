from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('', views.landing_page, name='landing_page'),
    path('connexion/', views.connexion, name='connexion'),
    path('inscription/', views.inscription, name='inscription'),
    path('reinitialisation/', views.reinitialisation, name='reinitialisation'),
]
