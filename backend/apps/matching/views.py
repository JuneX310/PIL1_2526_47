from django.shortcuts import render


def explorer(request):
    """Page Explorer — liste des annonces de mentorat."""
    return render(request, 'groupe1/explorer.html')


def matchs(request):
    """Page Matchs — suggestions de matching mentor/mentoré."""
    return render(request, 'groupe1/matchs.html')


def publier(request):
    """Page Publier — formulaire de publication d'annonce."""
    return render(request, 'groupe1/publier.html')


def profil_etudiant(request):
    """Page Profil — détails d'un étudiant."""
    return render(request, 'groupe1/profil_de_l_etudiant.html')
