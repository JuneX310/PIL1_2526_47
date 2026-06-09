import json
from django.shortcuts import render
from apps.matching.services.annonce_service import get_explorer_annonces, get_profil_etudiant_data
from apps.matching.services.matching_algo import calculer_score_matching
from django.http import JsonResponse
from apps.matching.models import Annonce
from django.contrib.auth.decorators import login_required


@login_required
def explorer(request):
    """Page Explorer — liste des annonces de mentorat."""
    etudiant = request.user.etudiant
    annonces_list = get_explorer_annonces(etudiant)
    
    context = {
        'annonces_json': json.dumps(annonces_list)
    }
    return render(request, 'groupe1/explorer.html', context)


@login_required
def matchs(request):
    """Page Matchs — suggestions de matching mentor/mentoré."""
    etudiant = request.user.etudiant
    
    # Construire le dictionnaire de l'étudiant connecté (Mentoré par défaut pour l'exemple)
    mentore_dict = {
        "filiere": etudiant.filiere,
        "niveau": etudiant.niveau,
        "points_faibles": etudiant.points_faibles,
        "disponibilites": etudiant.disponibilites
    }
    
    # Récupérer toutes les annonces de type 'offre' (Mentors) qui ne sont pas de l'utilisateur
    annonces_offres = Annonce.objects.filter(type='offre', is_active=True).exclude(auteur=etudiant)
    
    matchs_list = []
    for annonce in annonces_offres:
        mentor_dict = {
            "filiere": annonce.auteur.filiere,
            "niveau": annonce.auteur.niveau,
            "points_forts": annonce.auteur.points_forts,
            "disponibilites": annonce.disponibilites or annonce.auteur.disponibilites
        }
        score = calculer_score_matching(mentor_dict, mentore_dict)
        dispos = annonce.disponibilites or annonce.auteur.disponibilites
        next_availability = dispos[0] if (dispos and isinstance(dispos, list)) else "Non spécifiée"
        is_available_soon = True if (dispos and isinstance(dispos, list)) else False

        matchs_list.append({
            "id": annonce.id,
            "mentor_id": annonce.auteur.id,
            "name": f"{annonce.auteur.user.first_name} {annonce.auteur.user.last_name}",
            "filiere": annonce.auteur.get_filiere_display(),
            "filiere_code": annonce.auteur.filiere,
            "niveau": annonce.auteur.niveau,
            "location": annonce.get_format_display(),
            "skills": annonce.matieres,
            "compatibility": score,
            "nextAvailability": next_availability,
            "isAvailableSoon": is_available_soon,
            "avatar": annonce.auteur.photo_profil.url if annonce.auteur.photo_profil else (annonce.auteur.avatar or f"https://ui-avatars.com/api/?name={annonce.auteur.user.first_name}+{annonce.auteur.user.last_name}&background=random")
        })
        
    # Trier par compatibilité décroissante
    matchs_list.sort(key=lambda x: x['compatibility'], reverse=True)
    
    context = {
        'matchs_json': json.dumps(matchs_list),
        'user_filiere_code': etudiant.filiere
    }
    return render(request, 'groupe1/matchs.html', context)


@login_required
def publier(request):
    """Page Publier — formulaire de publication d'annonce."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # data: {'type': 'propose', 'subjects': [...], 'format': 'en ligne', 'slots': [...], 'description': '...'}
            
            # Map type 'propose' -> 'offre', 'cherche' -> 'demande'
            annonce_type = 'offre' if data.get('type') == 'propose' else 'demande'
            
            # Map format 
            format_val = data.get('format', 'presentiel')
            if format_val == 'présentiel':
                format_val = 'presentiel'
            elif format_val == 'en ligne':
                format_val = 'en_ligne'
            elif format_val == 'les deux':
                format_val = 'les_deux'
                
            annonce = Annonce.objects.create(
                auteur=request.user.etudiant,
                type=annonce_type,
                matieres=data.get('subjects', []),
                format=format_val,
                disponibilites=data.get('slots', []),
                description=data.get('description', '')
            )
            return JsonResponse({'status': 'success', 'message': 'Annonce publiée', 'id': annonce.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
            
    return render(request, 'groupe1/publier.html')


def profil_etudiant(request):
    """Page Profil — détails d'un étudiant."""
    annonce_id = request.GET.get('id')
    profile_data = get_profil_etudiant_data(annonce_id)
    
    context = {
        'profile_json': json.dumps(profile_data)
    }
    
    return render(request, 'groupe1/profil_de_l_etudiant.html', context)
