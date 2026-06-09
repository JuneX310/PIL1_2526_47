from django.urls import path
from . import views

app_name = 'profiles'

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('notifications/', views.notifications_history, name='notifications_history'),
    path('messagerie/', views.messagerie, name='messagerie'),
    path('mon-profil/', views.mon_profil, name='mon_profil'),
    path('modifier-profil/', views.modifier_profil, name='modifier_profil'),
    
    # API endpoints for Messagerie
    path('api/envoyer-message/', views.api_envoyer_message, name='api_envoyer_message'),
    path('api/conversations/', views.api_get_conversations, name='api_get_conversations'),
    path('api/messages/<int:conversation_id>/', views.api_get_messages, name='api_get_messages'),
]
