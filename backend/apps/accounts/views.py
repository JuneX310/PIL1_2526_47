from django.shortcuts import render

def landing_page(request):
    """Page d'accueil — IFRI MentorLink."""
    return render(request, 'groupe2/landing_page.html')

from django.contrib.auth import logout

def connexion(request):
    """Page de connexion."""
    if request.method == 'POST':
        login_id = request.POST.get('username') # HTML input name is username (can be email or phone)
        password = request.POST.get('password')
        
        # Trouver l'utilisateur par email ou par téléphone
        user_obj = None
        if '@' in login_id:
            user_obj = User.objects.filter(email=login_id).first()
        else:
            # Recherche par numéro de téléphone dans le profil Etudiant
            etudiant_obj = Etudiant.objects.filter(telephone=login_id).first()
            if etudiant_obj:
                user_obj = etudiant_obj.user
        
        if user_obj:
            user = authenticate(request, username=user_obj.username, password=password)
        else:
            user = None
            
        if user is not None:
            login(request, user)
            return redirect('matching:explorer')
        else:
            messages.error(request, "Identifiants incorrects.")
            
    return render(request, 'groupe2/connexion.html')

def deconnexion(request):
    """Déconnexion de l'utilisateur."""
    logout(request)
    return redirect('accounts:connexion')

import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Etudiant

def inscription(request):
    """Page d'inscription."""
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        filiere = request.POST.get('filiere')
        niveau = request.POST.get('level')
        password = request.POST.get('password')
        sexe = request.POST.get('sexe', 'M')
        
        # Get hidden JSON fields
        points_forts = request.POST.get('points_forts', '[]')
        points_faibles = request.POST.get('points_faibles', '[]')
        disponibilites = request.POST.get('disponibilites', '[]')
        
        try:
            points_forts = json.loads(points_forts)
            points_faibles = json.loads(points_faibles)
            disponibilites = json.loads(disponibilites)
        except json.JSONDecodeError:
            points_forts = []
            points_faibles = []
            disponibilites = []

        if User.objects.filter(username=email).exists():
            messages.error(request, "Un compte avec cet email existe déjà.")
            return render(request, 'groupe2/inscription.html')

        if phone and Etudiant.objects.filter(telephone=phone).exists():
            messages.error(request, "Un compte avec ce numéro de téléphone existe déjà.")
            return render(request, 'groupe2/inscription.html')

        # Create user
        user = User.objects.create_user(
            username=email, # Using email as username
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        
        # Define avatar based on sexe
        if sexe == 'F':
            avatar_url = "/static/assets/default_girl.svg"
        else:
            avatar_url = "/static/assets/default_boy.svg"

        # Create Etudiant profile
        etudiant = Etudiant.objects.create(
            user=user,
            telephone=phone,
            filiere=filiere,
            niveau=niveau,
            sexe=sexe,
            avatar=avatar_url,
            points_forts=points_forts,
            points_faibles=points_faibles,
            disponibilites=disponibilites
        )
        
        # Log the user in
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('matching:explorer')

    return render(request, 'groupe2/inscription.html')

def reinitialisation(request):
    """Page de réinitialisation de mot de passe."""
    return render(request, 'groupe2/reinitialisation.html')


from django.http import JsonResponse

def api_check_disponibilite(request):
    """
    API de vérification de disponibilité en temps réel.
    Vérifie si un email ou un numéro de téléphone existe déjà en BDD.
    GET /accounts/api/check/ ?email=xxx  ou  ?phone=xxx
    """
    email = request.GET.get('email', '').strip()
    phone = request.GET.get('phone', '').strip()

    if email:
        exists = User.objects.filter(username=email).exists() or User.objects.filter(email=email).exists()
        return JsonResponse({'field': 'email', 'exists': exists})

    if phone:
        exists = Etudiant.objects.filter(telephone=phone).exists()
        return JsonResponse({'field': 'phone', 'exists': exists})

    return JsonResponse({'error': 'Paramètre manquant'}, status=400)
