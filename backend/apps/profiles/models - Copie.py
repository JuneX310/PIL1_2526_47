from django.db import models
from apps.accounts.models import Etudiant


class Conversation(models.Model):
    """
    Une conversation entre deux étudiants (mentor et mentoré).
    """

    # ── Les deux participants ──
    participant_1 = models.ForeignKey(
        Etudiant,
        on_delete=models.CASCADE,
        related_name='conversations_en_tant_que_p1'
    )
    participant_2 = models.ForeignKey(
        Etudiant,
        on_delete=models.CASCADE,
        related_name='conversations_en_tant_que_p2'
    )

    # ── Timestamps ──
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Conversation'
        verbose_name_plural = 'Conversations'
        ordering = ['-updated_at']
        unique_together = ['participant_1', 'participant_2']

    def __str__(self):
        return f"{self.participant_1.get_full_name()} ↔ {self.participant_2.get_full_name()}"

    def dernier_message(self):
        """Retourne le dernier message de la conversation."""
        return self.messages.order_by('-created_at').first()


class Message(models.Model):
    """
    Un message envoyé dans une conversation.
    """

    # ── La conversation parente ──
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name='messages'
    )

    # ── L'auteur du message ──
    auteur = models.ForeignKey(
        Etudiant,
        on_delete=models.CASCADE,
        related_name='messages_envoyes'
    )

    # ── Contenu ──
    contenu = models.TextField()
    lu = models.BooleanField(default=False)

    # ── Timestamps ──
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
        ordering = ['created_at']

    def __str__(self):
        return f"{self.auteur.get_full_name()} : {self.contenu[:50]}..."
