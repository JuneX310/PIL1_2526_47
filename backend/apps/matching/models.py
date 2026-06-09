from django.db import models
from apps.accounts.models import Etudiant


class Annonce(models.Model):
    """
    Une annonce de mentorat publiée par un étudiant.
    Peut être une offre (je propose du mentorat) ou une demande (je cherche du mentorat).
    """

    TYPE_CHOICES = [
        ('offre', 'Je propose du mentorat'),
        ('demande', 'Je cherche du mentorat'),
    ]

    FORMAT_CHOICES = [
        ('presentiel', 'Présentiel'),
        ('en_ligne', 'En ligne'),
        ('les_deux', 'Les deux'),
    ]

    # ── Auteur de l'annonce ──
    auteur = models.ForeignKey(
        Etudiant,
        on_delete=models.CASCADE,
        related_name='annonces'
    )

    # ── Contenu ──
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='offre')
    matieres = models.JSONField(default=list, blank=True)
    description = models.TextField(blank=True, default='')
    format = models.CharField(max_length=10, choices=FORMAT_CHOICES, default='presentiel')

    # ── Disponibilités spécifiques à cette annonce ──
    disponibilites = models.JSONField(default=list, blank=True)

    # ── Statut ──
    is_active = models.BooleanField(default=True)

    # ── Timestamps ──
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Annonce'
        verbose_name_plural = 'Annonces'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_type_display()} — {self.auteur.get_full_name()} ({', '.join(self.matieres)})"


class Match(models.Model):
    """
    Résultat d'un matching entre un mentor et un mentoré.
    Le score est calculé par l'algorithme dans services/matching_algo.py.
    """

    STATUT_CHOICES = [
        ('en_attente', 'En attente'),
        ('accepte', 'Accepté'),
        ('refuse', 'Refusé'),
    ]

    # ── Les deux parties du match ──
    mentor = models.ForeignKey(
        Etudiant,
        on_delete=models.CASCADE,
        related_name='matchs_en_tant_que_mentor'
    )
    mentore = models.ForeignKey(
        Etudiant,
        on_delete=models.CASCADE,
        related_name='matchs_en_tant_que_mentore'
    )

    # ── Score et statut ──
    score = models.IntegerField(default=0)
    statut = models.CharField(max_length=15, choices=STATUT_CHOICES, default='en_attente')

    # ── Timestamps ──
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Match'
        verbose_name_plural = 'Matchs'
        ordering = ['-score']
        # Un mentor ne peut pas matcher deux fois avec le même mentoré
        unique_together = ['mentor', 'mentore']

    def __str__(self):
        return f"{self.mentor.get_full_name()} ↔ {self.mentore.get_full_name()} ({self.score}%)"
