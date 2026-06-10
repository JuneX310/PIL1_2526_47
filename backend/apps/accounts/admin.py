from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Etudiant


class EtudiantInline(admin.StackedInline):
    """Affiche le profil Etudiant directement dans la page User du panel admin."""
    model = Etudiant
    can_delete = False
    verbose_name = 'Profil Étudiant'
    verbose_name_plural = 'Profil Étudiant'


class UserAdmin(BaseUserAdmin):
    """Étend la page User dans l'admin pour y inclure le profil Etudiant."""
    inlines = [EtudiantInline]


# On remplace le UserAdmin par défaut par le nôtre
admin.site.unregister(User)
admin.site.register(User, UserAdmin)


@admin.register(Etudiant)
class EtudiantAdmin(admin.ModelAdmin):
    list_display = ['get_full_name', 'filiere', 'niveau', 'is_mentor', 'is_online', 'created_at']
    list_filter = ['filiere', 'niveau', 'is_mentor', 'is_online']
    search_fields = ['user__first_name', 'user__last_name', 'user__email']

    def get_full_name(self, obj):
        return obj.get_full_name()
    get_full_name.short_description = 'Nom complet'
