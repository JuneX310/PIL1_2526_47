from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.contrib.auth.models import User
from .models import Profile, Message

@login_required
def dashboard_ifri_mentorlink(request):
    # On s'assure que l'utilisateur a un profil créé
    profile, created = Profile.objects.get_or_create(user=request.user)
    
    # Récupérer les 5 derniers messages reçus
    recent_messages = Message.objects.filter(receiver=request.user).order_by('-timestamp')[:5]
    unread_count = Message.objects.filter(receiver=request.user, is_read=False).count()
    
    context = {
        'profile': profile,
        'recent_messages': recent_messages,
        'unread_count': unread_count,
    }
    # Pointe vers le fichier HTML généré dans frontend/templates/profiles/
    return render(request, 'profiles/dashboard_ifri_mentorlink.html', context)

@login_required
def messagerie_ifri_mentorlink(request):
    # Liste de tous les utilisateurs pour pouvoir démarrer une discussion
    utilisateurs = User.objects.exclude(id=request.user.id)
    
    # Récupérer l'ID du contact actif dans la discussion depuis l'URL
    contact_id = request.GET.get('with')
    active_contact = None
    discussion = []
    
    if contact_id:
        active_contact = get_object_or_404(User, id=contact_id)
        # Récupérer le fil de discussion entre les deux utilisateurs
        discussion = Message.objects.filter(
            (Q(sender=request.user) & Q(receiver=active_contact)) |
            (Q(sender=active_contact) & Q(receiver=request.user))
        ).order_by('timestamp')
        
        # Marquer les messages reçus de ce contact comme lus
        Message.objects.filter(sender=active_contact, receiver=request.user, is_read=False).update(is_read=True)
        
    if request.method == 'POST' and active_contact:
        content = request.POST.get('content')
        if content:
            Message.objects.create(sender=request.user, receiver=active_contact, content=content)
            # Recharger la discussion après envoi
            discussion = Message.objects.filter(
                (Q(sender=request.user) & Q(receiver=active_contact)) |
                (Q(sender=active_contact) & Q(receiver=request.user))
            ).order_by('timestamp')

    context = {
        'utilisateurs': utilisateurs,
        'active_contact': active_contact,
        'discussion': discussion,
    }
    # Pointe vers le fichier HTML généré dans frontend/templates/profiles/
    return render(request, 'profiles/messagerie_ifri_mentorlink.html', context)