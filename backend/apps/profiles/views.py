from django.shortcuts import render

def dashboard(request):
    """Tableau de bord de l'utilisateur."""
    return render(request, 'groupe3/dashboard.html')

def messagerie(request):
    """Page Messagerie — discussion entre étudiant et mentor."""
    return render(request, 'groupe3/messagerie.html')

def mon_profil(request):
    """Page affichant le profil de l'utilisateur connecté."""
    return render(request, 'groupe3/mon_profil.html')

def modifier_profil(request):
    """Page permettant de modifier les informations du profil de l'utilisateur."""
    return render(request, 'groupe3/modifier_profil.html')
