from django.db import models
from django.contrib.auth.models import User


class Etudiant(models.Model):
    """
    Profil étendu d'un étudiant IFRI.
    Lié au modèle User de Django (authentification).
    """

    # ── Choix prédéfinis ──
    FILIERE_CHOICES = [
        ('GL', 'Génie Logiciel'),
        ('IA', 'Intelligence Artificielle'),
        ('SI', 'Sécurité Informatique'),
        ('SE', 'Systèmes Embarqués & IoT'),
        ('IM', 'Internet et Multimédia'),
    ]

    NIVEAU_CHOICES = [
        ('L1', 'Licence 1'),
        ('L2', 'Licence 2'),
        ('L3', 'Licence 3'),
        ('M1', 'Master 1'),
        ('M2', 'Master 2'),
    ]

    # ── Relation avec le User Django ──
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='etudiant'
    )

    # ── Informations personnelles ──
    telephone = models.CharField(max_length=20, blank=True, default='')
    avatar = models.URLField(max_length=500, blank=True, default='')
    photo_profil = models.ImageField(upload_to='profils/avatars/', null=True, blank=True)
    photo_couverture = models.ImageField(upload_to='profils/couvertures/', null=True, blank=True)
    bio = models.TextField(blank=True, default='')
    location = models.CharField(max_length=100, blank=True, default='Abomey-Calavi, Bénin')

    # ── Informations académiques ──
    filiere = models.CharField(max_length=2, choices=FILIERE_CHOICES, default='GL')
    niveau = models.CharField(max_length=2, choices=NIVEAU_CHOICES, default='L1')

    # ── Genre / Sexe ──
    SEXE_CHOICES = [
        ('M', 'Homme'),
        ('F', 'Femme'),
    ]
    sexe = models.CharField(max_length=1, choices=SEXE_CHOICES, default='M')

    # ── Compétences (stockées en JSON) ──
    points_forts = models.JSONField(default=list, blank=True)
    points_faibles = models.JSONField(default=list, blank=True)

    # ── Disponibilités (stockées en JSON) ──
    # Exemple : ["LUN_matin", "MAR_soir", "MER_apresmidi"]
    disponibilites = models.JSONField(default=list, blank=True)

    # ── Statut ──
    is_mentor = models.BooleanField(default=False)
    is_online = models.BooleanField(default=False)

    # ── Timestamps ──
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Étudiant'
        verbose_name_plural = 'Étudiants'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.get_niveau_display()} - {self.get_filiere_display()})"

    def get_full_name(self):
        return f"{self.user.first_name} {self.user.last_name}"
