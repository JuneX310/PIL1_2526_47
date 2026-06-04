from django.urls import path

from . import views

urlpatterns = [
    path(
        'dashboard/',
        views.dashboard_ifri_mentorlink,
        name='dashboard_ifri_mentorlink',
    ),
    path(
        'messagerie/',
        views.messagerie_ifri_mentorlink,
        name='messagerie_ifri_mentorlink',
    ),
]

