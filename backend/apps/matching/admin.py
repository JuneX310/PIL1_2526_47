from django.contrib import admin
from .models import Annonce, Match


@admin.register(Annonce)
class AnnonceAdmin(admin.ModelAdmin):
    list_display = ['get_auteur_name', 'type', 'format', 'is_active', 'created_at']
    list_filter = ['type', 'format', 'is_active']
    search_fields = ['auteur__user__first_name', 'auteur__user__last_name', 'description']

    def get_auteur_name(self, obj):
        return obj.auteur.get_full_name()
    get_auteur_name.short_description = 'Auteur'


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ['get_mentor_name', 'get_mentore_name', 'score', 'statut', 'created_at']
    list_filter = ['statut']
    search_fields = ['mentor__user__first_name', 'mentore__user__first_name']

    def get_mentor_name(self, obj):
        return obj.mentor.get_full_name()
    get_mentor_name.short_description = 'Mentor'

    def get_mentore_name(self, obj):
        return obj.mentore.get_full_name()
    get_mentore_name.short_description = 'Mentoré'
