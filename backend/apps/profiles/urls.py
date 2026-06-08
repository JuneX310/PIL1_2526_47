from django.urls import path
from . import views

app_name = 'profiles'

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('messagerie/', views.messagerie, name='messagerie'),
    path('mon-profil/', views.mon_profil, name='mon_profil'),
    path('modifier-profil/', views.modifier_profil, name='modifier_profil'),
]
