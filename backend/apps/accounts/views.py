from django.shortcuts import render

def landing_page(request):
    """Page d'accueil — IFRI MentorLink."""
    return render(request, 'groupe2/landing_page.html')

def connexion(request):
    """Page de connexion."""
    return render(request, 'groupe2/connexion.html')

def inscription(request):
    """Page d'inscription."""
    return render(request, 'groupe2/inscription.html')

def reinitialisation(request):
    """Page de réinitialisation de mot de passe."""
    return render(request, 'groupe2/reinitialisation.html')
