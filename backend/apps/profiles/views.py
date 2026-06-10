import json
from django.shortcuts import render, redirect
from apps.matching.services.annonce_service import get_current_user_profile_data
from django.contrib.auth.decorators import login_required

def format_message_time(created_at):
    from django.utils import timezone
    now = timezone.localtime(timezone.now())
    local_created = timezone.localtime(created_at)
    
    if local_created.date() == now.date():
        return local_created.strftime('%H:%M')
    elif local_created.date() == (now.date() - timezone.timedelta(days=1)):
        return f"Hier {local_created.strftime('%H:%M')}"
    else:
        months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
        return f"{local_created.day} {months[local_created.month - 1]} {local_created.strftime('%H:%M')}"

def format_relative_time(dt):
    from django.utils import timezone
    if not dt:
        return ""
    now = timezone.now()
    diff = now - dt
    seconds = diff.total_seconds()
    if seconds < 60:
        return "À L'INSTANT"
    minutes = seconds // 60
    if minutes < 60:
        return f"IL Y A {int(minutes)} MINUTE{'S' if minutes > 1 else ''}"
    hours = minutes // 60
    if hours < 24:
        return f"IL Y A {int(hours)} HEURE{'S' if hours > 1 else ''}"
    days = hours // 24
    if days < 7:
        return f"IL Y A {int(days)} JOUR{'S' if days > 1 else ''}"
    return dt.strftime('%d %b %Y').upper()

@login_required
def dashboard(request):
    """Tableau de bord de l'utilisateur."""
    from django.db.models import Q
    from django.utils import timezone
    from apps.matching.models import Annonce, Match
    from apps.matching.services.matching_algo import calculer_score_matching
    from apps.profiles.models import Conversation, Message

    user = request.user
    etudiant = getattr(user, 'etudiant', None)
    if not etudiant:
        return redirect('accounts:connexion')
    
    # ── 1. Statistiques ──
    # Discussions actives (conversations actives)
    active_convs = Conversation.objects.filter(Q(participant_1=etudiant) | Q(participant_2=etudiant))
    active_convs_count = active_convs.count()
    
    # Demandes reçues (matchs en attente en tant que mentor)
    demandes_recues_count = Match.objects.filter(mentor=etudiant, statut='en_attente').count()
    
    # Annonces publiées par l'étudiant lui-même (actives)
    annonces_publiees_count = Annonce.objects.filter(auteur=etudiant, is_active=True).count()
    
    # ── 2. Discussions Récentes (Top 3 conversations récemment mises à jour) ──
    recent_conversations = active_convs.order_by('-updated_at')[:3]
    conversations_data = []
    
    for conv in recent_conversations:
        other_user = conv.participant_2 if conv.participant_1 == etudiant else conv.participant_1
        last_msg = conv.dernier_message()
        
        # Obtenir les initiales du correspondant
        names = [n for n in [other_user.user.first_name, other_user.user.last_name] if n]
        initials = "".join([n[0].upper() for n in names]) if names else "U"
        
        avatar_url = ""
        if other_user.photo_profil:
            avatar_url = other_user.photo_profil.url
        elif other_user.avatar:
            avatar_url = other_user.avatar
            
        conversations_data.append({
            'other_user_id': other_user.id,
            'other_name': other_user.get_full_name(),
            'other_initials': initials,
            'avatar_url': avatar_url,
            'other_filiere_display': other_user.get_filiere_display(),
            'other_niveau_display': other_user.get_niveau_display(),
            'last_message_content': last_msg.contenu if last_msg else "Aucun message",
            'last_message_time': last_msg.created_at.strftime('%d/%m %H:%M') if last_msg else "",
            'link': f"/profiles/messagerie/?user_id={other_user.id}"
        })
        
    # ── 3. Mentors Recommandés (Top 2 candidats basés sur calculer_score_matching) ──
    # Construire le dictionnaire de l'étudiant connecté
    mentore_dict = {
        "filiere": etudiant.filiere,
        "niveau": etudiant.niveau,
        "points_faibles": etudiant.points_faibles or [],
        "disponibilites": etudiant.disponibilites or []
    }
    
    # Récupérer toutes les annonces de type 'offre' (propose mentorat) actives qui ne sont pas de l'utilisateur
    annonces_offres = Annonce.objects.filter(type='offre', is_active=True).exclude(auteur=etudiant)
    
    matchs_candidates = []
    for annonce in annonces_offres:
        mentor_dict = {
            "filiere": annonce.auteur.filiere,
            "niveau": annonce.auteur.niveau,
            "points_forts": annonce.auteur.points_forts or [],
            "disponibilites": annonce.disponibilites or annonce.auteur.disponibilites or []
        }
        
        try:
            score = calculer_score_matching(mentor_dict, mentore_dict)
        except Exception:
            score = 0
            
        names = [n for n in [annonce.auteur.user.first_name, annonce.auteur.user.last_name] if n]
        initials = "".join([n[0].upper() for n in names]) if names else "U"
        
        avatar_url = ""
        if annonce.auteur.photo_profil:
            avatar_url = annonce.auteur.photo_profil.url
        elif annonce.auteur.avatar:
            avatar_url = annonce.auteur.avatar
            
        matchs_candidates.append({
            'name': annonce.auteur.get_full_name(),
            'initials': initials,
            'avatar_url': avatar_url,
            'filiere_display': annonce.auteur.get_filiere_display(),
            'niveau_display': annonce.auteur.get_niveau_display(),
            'bio': annonce.description or annonce.auteur.bio or "Aucune biographie fournie.",
            'score': score,
            'link': f"/matching/profil/?id={annonce.id}"
        })
        
    # Trier par score de compatibilité décroissant
    matchs_candidates.sort(key=lambda x: x['score'], reverse=True)
    recommended_mentors = matchs_candidates[:2]
    
    # ── 4. Notifications (Top 3 combinant nouveaux messages non lus et demandes de match) ──
    # Demandes de match en attente en tant que mentor ou mentoré
    match_requests = Match.objects.filter(Q(mentor=etudiant) | Q(mentore=etudiant), statut='en_attente').order_by('-created_at')
    
    # Messages reçus non lus
    unread_messages = Message.objects.filter(
        conversation__in=active_convs,
        lu=False
    ).exclude(auteur=etudiant).order_by('-created_at')
    
    notifications_list = []
        
    for req in match_requests:
        # Si c'est l'étudiant connecté qui a reçu la demande (le mentor est l'étudiant connecté)
        if req.mentor == etudiant:
            sender = req.mentore
            text = f"{sender.get_full_name()} souhaite que vous soyez son mentor."
        else:
            sender = req.mentor
            text = f"Votre demande de mentorat avec {sender.get_full_name()} est en attente."
            
        notifications_list.append({
            'type': 'match',
            'title': 'Demande de mentorat',
            'text': text,
            'created_at': req.created_at,
            'time_diff': format_relative_time(req.created_at),
            'icon': 'diversity_3',
            'icon_color': 'text-secondary',
            'link': '/matching/matchs/'
        })
        
    for msg in unread_messages:
        notifications_list.append({
            'type': 'message',
            'title': 'Nouveau message',
            'text': f"{msg.auteur.get_full_name()} a envoyé un message : {msg.contenu[:50]}...",
            'created_at': msg.created_at,
            'time_diff': format_relative_time(msg.created_at),
            'icon': 'chat_bubble',
            'icon_color': 'text-primary',
            'link': f"/profiles/messagerie/?user_id={msg.auteur.id}"
        })
        
    # Trier par date de création décroissante et limiter à 3
    notifications_list.sort(key=lambda x: x['created_at'], reverse=True)
    notifications = notifications_list[:3]
    
    context = {
        'active_convs_count': active_convs_count,
        'demandes_recues_count': demandes_recues_count,
        'annonces_publiees_count': annonces_publiees_count,
        'conversations': conversations_data,
        'recommended_mentors': recommended_mentors,
        'notifications': notifications,
    }
    
    return render(request, 'groupe3/dashboard.html', context)

@login_required
def messagerie(request):
    """Page Messagerie — discussion entre étudiant et mentor."""
    return render(request, 'groupe3/messagerie.html')

@login_required
def mon_profil(request):
    """Page affichant le profil de l'utilisateur connecté."""
    profile_data = get_current_user_profile_data(request.user)
    context = {
        'profile_json': json.dumps(profile_data)
    }
    return render(request, 'groupe3/mon_profil.html', context)

@login_required
def modifier_profil(request):
    """Page permettant de modifier les informations du profil de l'utilisateur."""
    user = request.user
    etudiant = getattr(user, 'etudiant', None)
    
    if not etudiant:
        return redirect('accounts:connexion')
        
    if request.method == 'POST':
        user.first_name = request.POST.get('first_name', user.first_name)
        user.last_name = request.POST.get('last_name', user.last_name)
        
        # Gestion du changement de mot de passe
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        if password:
            if password == confirm_password:
                user.set_password(password)
                from django.contrib.auth import update_session_auth_hash
                user.save()
                update_session_auth_hash(request, user)
                from django.contrib import messages
                messages.success(request, "Votre mot de passe a été mis à jour avec succès.")
            else:
                from django.contrib import messages
                messages.error(request, "Les mots de passe ne correspondent pas.")
                return redirect('profiles:modifier_profil')
        else:
            user.save()
        
        etudiant.telephone = request.POST.get('phone', etudiant.telephone)
        etudiant.filiere = request.POST.get('filiere', etudiant.filiere)
        etudiant.niveau = request.POST.get('niveau', etudiant.niveau)
        etudiant.bio = request.POST.get('bio', etudiant.bio)
        
        dispo_str = request.POST.get('disponibilites')
        if dispo_str:
            try:
                etudiant.disponibilites = json.loads(dispo_str)
            except Exception:
                pass
                
        forts_str = request.POST.get('points_forts')
        if forts_str:
            try:
                etudiant.points_forts = json.loads(forts_str)
            except Exception:
                pass
                
        faibles_str = request.POST.get('points_faibles')
        if faibles_str:
            try:
                etudiant.points_faibles = json.loads(faibles_str)
            except Exception:
                pass
                
        # Gestion de la suppression ou du remplacement de la photo de profil
        if request.POST.get('delete_photo_profil') == 'true':
            if etudiant.photo_profil:
                try:
                    import os
                    if os.path.exists(etudiant.photo_profil.path):
                        os.remove(etudiant.photo_profil.path)
                except Exception as e:
                    print("Error deleting photo_profil:", e)
                etudiant.photo_profil = None
        elif 'photo_profil' in request.FILES:
            # Remplacement : supprimer l'ancienne d'abord pour ne garder qu'un seul fichier
            if etudiant.photo_profil:
                try:
                    import os
                    if os.path.exists(etudiant.photo_profil.path):
                        os.remove(etudiant.photo_profil.path)
                except Exception as e:
                    print("Error deleting old photo_profil:", e)
            etudiant.photo_profil = request.FILES['photo_profil']
            
        # Gestion de la suppression ou du remplacement de la photo de couverture
        if request.POST.get('delete_photo_couverture') == 'true':
            if etudiant.photo_couverture:
                try:
                    import os
                    if os.path.exists(etudiant.photo_couverture.path):
                        os.remove(etudiant.photo_couverture.path)
                except Exception as e:
                    print("Error deleting photo_couverture:", e)
                etudiant.photo_couverture = None
        elif 'photo_couverture' in request.FILES:
            # Remplacement : supprimer l'ancienne d'abord pour ne garder qu'un seul fichier
            if etudiant.photo_couverture:
                try:
                    import os
                    if os.path.exists(etudiant.photo_couverture.path):
                        os.remove(etudiant.photo_couverture.path)
                except Exception as e:
                    print("Error deleting old photo_couverture:", e)
            etudiant.photo_couverture = request.FILES['photo_couverture']
                
        etudiant.save()
        print("Etudiant sauvé avec images et compétences")
        
        return redirect('profiles:mon_profil')

    context = {
        'etudiant': etudiant,
        'dispo_json': json.dumps(etudiant.disponibilites or []),
        'strengths_json': json.dumps(etudiant.points_forts or []),
        'weaknesses_json': json.dumps(etudiant.points_faibles or [])
    }
    return render(request, 'groupe3/modifier_profil.html', context)


from django.db.models import Q
from django.http import JsonResponse
from apps.profiles.models import Conversation, Message
from apps.accounts.models import Etudiant

@login_required
def api_envoyer_message(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            destinataire_id = data.get('destinataire_id')
            contenu = data.get('contenu')
            
            sender = request.user.etudiant
            destinataire = Etudiant.objects.get(id=destinataire_id)
            
            # Chercher ou créer la conversation
            conversation = Conversation.objects.filter(
                (Q(participant_1=sender) & Q(participant_2=destinataire)) |
                (Q(participant_1=destinataire) & Q(participant_2=sender))
            ).first()
            
            if not conversation:
                conversation = Conversation.objects.create(
                    participant_1=sender,
                    participant_2=destinataire
                )
                
            # Créer le message
            message = Message.objects.create(
                conversation=conversation,
                auteur=sender,
                contenu=contenu
            )
            
            # Mettre à jour updated_at (implict via trigger ou on le force)
            conversation.save()
            
            return JsonResponse({'status': 'success', 'message_id': message.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)


@login_required
def api_get_conversations(request):
    try:
        etudiant = request.user.etudiant
        conversations = Conversation.objects.filter(Q(participant_1=etudiant) | Q(participant_2=etudiant)).order_by('-updated_at')
        
        result = []
        for conv in conversations:
            other_user = conv.participant_2 if conv.participant_1 == etudiant else conv.participant_1
            last_message = conv.dernier_message()
            unread_count = conv.messages.filter(lu=False).exclude(auteur=etudiant).count()
            
            result.append({
                'id': conv.id,
                'other_user': {
                    'id': other_user.id,
                    'name': other_user.get_full_name(),
                    'avatar': other_user.photo_profil.url if other_user.photo_profil else (other_user.avatar or f"https://ui-avatars.com/api/?name={other_user.user.first_name}+{other_user.user.last_name}&background=random"),
                    'filiere': other_user.get_filiere_display()
                },
                'last_message': last_message.contenu if last_message else "",
                'time': format_message_time(last_message.created_at) if last_message else "",
                'unread_count': unread_count,
                'updated_at': conv.updated_at.isoformat()
            })
            
        return JsonResponse({'conversations': result})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@login_required
def api_get_messages(request, conversation_id):
    try:
        etudiant = request.user.etudiant
        conversation = Conversation.objects.get(id=conversation_id)
        
        # Vérifier que l'utilisateur fait partie de la conversation
        if conversation.participant_1 != etudiant and conversation.participant_2 != etudiant:
            return JsonResponse({'status': 'error', 'message': 'Non autorisé'}, status=403)
            
        # Marquer les messages reçus par l'utilisateur connecté comme lus
        conversation.messages.filter(lu=False).exclude(auteur=etudiant).update(lu=True)
            
        messages_db = conversation.messages.order_by('created_at')
        
        result = []
        for msg in messages_db:
            result.append({
                'id': msg.id,
                'auteur_id': msg.auteur.id,
                'contenu': msg.contenu,
                'time': format_message_time(msg.created_at),
                'is_me': msg.auteur == etudiant
            })
            
        return JsonResponse({'messages': result})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@login_required
def notifications_history(request):
    """Page d'historique de toutes les notifications de l'utilisateur."""
    from django.db.models import Q
    from apps.matching.models import Match
    from apps.profiles.models import Conversation, Message
    
    etudiant = request.user.etudiant
    
    # 1. Toutes les demandes de match liées à cet étudiant
    match_requests = Match.objects.filter(Q(mentor=etudiant) | Q(mentore=etudiant)).order_by('-created_at')
    
    # 2. Les conversations actives
    active_convs = Conversation.objects.filter(Q(participant_1=etudiant) | Q(participant_2=etudiant))
    
    # 3. Tous les messages reçus de la part d'autres personnes (lus ou non lus)
    received_messages = Message.objects.filter(
        conversation__in=active_convs
    ).exclude(auteur=etudiant).order_by('-created_at')[:30] # limiter à 30 pour l'historique
    
    notifications_list = []
    
    for req in match_requests:
        is_mentor = req.mentor == etudiant
        other = req.mentore if is_mentor else req.mentor
        
        # Texte adapté selon le statut
        if req.statut == 'en_attente':
            if is_mentor:
                text = f"{other.get_full_name()} souhaite que vous soyez son mentor."
            else:
                text = f"Votre demande de mentorat avec {other.get_full_name()} est en attente."
            icon = 'diversity_3'
            icon_color = 'text-secondary'
        elif req.statut == 'accepte':
            if is_mentor:
                text = f"Vous avez accepté la demande de mentorat de {other.get_full_name()}."
            else:
                text = f"{other.get_full_name()} a accepté votre demande de mentorat !"
            icon = 'check_circle'
            icon_color = 'text-succes'
        else: # refuse
            if is_mentor:
                text = f"Vous avez décliné la demande de mentorat de {other.get_full_name()}."
            else:
                text = f"{other.get_full_name()} a décliné votre demande de mentorat."
            icon = 'cancel'
            icon_color = 'text-erreur'
            
        notifications_list.append({
            'type': 'match',
            'title': 'Demande de mentorat',
            'text': text,
            'status': req.get_statut_display(),
            'created_at': req.created_at,
            'time_diff': format_relative_time(req.created_at),
            'icon': icon,
            'icon_color': icon_color,
            'link': '/matching/matchs/',
            'is_read': req.statut != 'en_attente'
        })
        
    for msg in received_messages:
        notifications_list.append({
            'type': 'message',
            'title': 'Message reçu',
            'text': f"{msg.auteur.get_full_name()} a envoyé un message : {msg.contenu[:80]}...",
            'status': 'Lu' if msg.lu else 'Non lu',
            'created_at': msg.created_at,
            'time_diff': format_relative_time(msg.created_at),
            'icon': 'chat_bubble',
            'icon_color': 'text-primary' if not msg.lu else 'text-outline',
            'link': f"/profiles/messagerie/?user_id={msg.auteur.id}",
            'is_read': msg.lu
        })
        
    # Trier par date de création décroissante
    notifications_list.sort(key=lambda x: x['created_at'], reverse=True)
    
    # Convertir les objets datetime en chaînes de caractères ISO pour la sérialisation JSON
    for notif in notifications_list:
        notif['created_at'] = notif['created_at'].isoformat()
        
    context = {
        'notifications_json': json.dumps(notifications_list)
    }
    return render(request, 'groupe1/notifications.html', context)
