from django.conf import settings
from django.db import models


class Profile(models.Model):
    USER_ROLE_MENTOR = 'mentor'
    USER_ROLE_ETUDIANT = 'etudiant'

    ROLE_CHOICES = [
        (USER_ROLE_MENTOR, 'Mentor'),
        (USER_ROLE_ETUDIANT, 'Etudiant/Mentored'),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=USER_ROLE_ETUDIANT)

    def __str__(self) -> str:
        return f"Profile(user={self.user_id}, role={self.role})"


class Message(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_messages',
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='received_messages',
    )
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)


    class Meta:
        ordering = ['timestamp']

    def __str__(self) -> str:
        return f"Message(sender={self.sender_id}, receiver={self.receiver_id}, read={self.is_read})"

