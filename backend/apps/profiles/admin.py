from django.contrib import admin
from .models import Conversation, Message


class MessageInline(admin.TabularInline):
    """Affiche les messages directement dans la page de la Conversation."""
    model = Message
    extra = 0
    readonly_fields = ['created_at']


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ['get_participants', 'updated_at']
    search_fields = [
        'participant_1__user__first_name', 
        'participant_1__user__last_name',
        'participant_2__user__first_name', 
        'participant_2__user__last_name'
    ]
    inlines = [MessageInline]

    def get_participants(self, obj):
        return f"{obj.participant_1.get_full_name()} ↔ {obj.participant_2.get_full_name()}"
    get_participants.short_description = 'Participants'


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['get_auteur_name', 'get_extrait_contenu', 'lu', 'created_at']
    list_filter = ['lu']
    search_fields = ['auteur__user__first_name', 'contenu']

    def get_auteur_name(self, obj):
        return obj.auteur.get_full_name()
    get_auteur_name.short_description = 'Auteur'

    def get_extrait_contenu(self, obj):
        if len(obj.contenu) > 50:
            return f"{obj.contenu[:50]}..."
        return obj.contenu
    get_extrait_contenu.short_description = 'Contenu'
