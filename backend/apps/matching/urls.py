from django.urls import path
from . import views

app_name = 'matching'

urlpatterns = [
    path('explorer/', views.explorer, name='explorer'),
    path('matchs/', views.matchs, name='matchs'),
    path('publier/', views.publier, name='publier'),
    path('profil/', views.profil_etudiant, name='profil'),
]
