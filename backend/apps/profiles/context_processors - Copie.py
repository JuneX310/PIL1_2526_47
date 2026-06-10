from django.db.models import Q
from apps.matching.models import Match
from apps.profiles.models import Conversation, Message

def notifications_processor(request):
    """
    Context processor pour rendre le nombre de notifications non lues disponible dans tous les templates.
    """
    if request.user.is_authenticated and hasattr(request.user, 'etudiant'):
        try:
            etudiant = request.user.etudiant
            
            # 1. Demandes de match en attente
            match_requests_count = Match.objects.filter(
                Q(mentor=etudiant) | Q(mentore=etudiant),
                statut='en_attente'
            ).count()
            
            # 2. Messages reçus non lus
            active_convs = Conversation.objects.filter(
                Q(participant_1=etudiant) | Q(participant_2=etudiant)
            )
            unread_messages_count = Message.objects.filter(
                conversation__in=active_convs,
                lu=False
            ).exclude(auteur=etudiant).count()
            
            return {
                'unread_notifications_count': match_requests_count + unread_messages_count
            }
        except Exception:
            return {
                'unread_notifications_count': 0
            }
    return {
        'unread_notifications_count': 0
    }
