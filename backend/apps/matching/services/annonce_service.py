import random
from django.shortcuts import get_object_or_404
from django.http import Http404
from apps.matching.models import Annonce
from apps.matching.services.matching_algo import calculer_score_matching

def get_explorer_annonces(current_etudiant=None):
    """
    Récupère et formate la liste des annonces actives pour la page Explorer.
    """
    if current_etudiant:
        annonces_db = Annonce.objects.filter(is_active=True).exclude(auteur=current_etudiant).select_related('auteur__user')
    else:
        annonces_db = Annonce.objects.filter(is_active=True).select_related('auteur__user')
        
    annonces_list = []
    
    for ann in annonces_db:
        etudiant = ann.auteur
        user = etudiant.user
        
        # Calculer le vrai score de compatibilité
        if current_etudiant:
            mentor_dict = {
                "filiere": etudiant.filiere,
                "niveau": etudiant.niveau,
                "points_forts": etudiant.points_forts or [],
                "disponibilites": ann.disponibilites or etudiant.disponibilites or []
            }
            mentore_dict = {
                "filiere": current_etudiant.filiere,
                "niveau": current_etudiant.niveau,
                "points_faibles": current_etudiant.points_faibles or [],
                "disponibilites": current_etudiant.disponibilites or []
            }
            
            try:
                if ann.type == 'offre':
                    match_score = calculer_score_matching(mentor_dict, mentore_dict)
                else:
                    match_score = calculer_score_matching(mentore_dict, mentor_dict)
            except Exception:
                match_score = 0
        else:
            match_score = 0
        
        annonces_list.append({
            "id": ann.id,
            "type": ann.type + "s",  # 'offres' or 'demandes' to match frontend JS expectations
            "name": f"{user.first_name} {user.last_name}",
            "filiere": etudiant.get_filiere_display(),
            "niveau": etudiant.get_niveau_display(),
            "matchScore": match_score,
            "description": ann.description or etudiant.bio,
            "subjects": ann.matieres,
            "availability": ", ".join(ann.disponibilites) if ann.disponibilites else "À discuter",
            "format": ann.get_format_display(),
            "avatar": etudiant.photo_profil.url if etudiant.photo_profil else (etudiant.avatar or f"https://ui-avatars.com/api/?name={user.first_name}+{user.last_name}&background=random")
        })
        
    return annonces_list


def get_profil_etudiant_data(annonce_id):
    """
    Récupère et formate les données du profil d'un étudiant en fonction de l'ID d'une annonce.
    """
    if not annonce_id:
        raise Http404("Aucun identifiant d'annonce fourni")
        
    annonce = get_object_or_404(Annonce, id=annonce_id)
    etudiant = annonce.auteur
    user = etudiant.user
    
    profile_data = {
        "id": etudiant.id,
        "name": f"{user.first_name} {user.last_name}",
        "title": f"Étudiant(e) en {etudiant.get_niveau_display()} {etudiant.get_filiere_display()} (IFRI)",
        "avatar": etudiant.photo_profil.url if etudiant.photo_profil else (etudiant.avatar or f"https://ui-avatars.com/api/?name={user.first_name}+{user.last_name}&background=random"),
        "photo_couverture": etudiant.photo_couverture.url if etudiant.photo_couverture else None,
        "location": "Abomey-Calavi, Bénin",
        "levelAndFiliere": f"{etudiant.get_niveau_display()} - {etudiant.get_filiere_display()}",
        "statsMentoring": "0",
        "statsProjects": "0",
        "bio": etudiant.bio or "Aucune biographie fournie.",
        "skills": etudiant.points_forts,
        "objectives": [
            { "icon": "school", "title": "Besoins d'apprentissage", "description": ", ".join(etudiant.points_faibles) if etudiant.points_faibles else "Aucun point faible renseigné." },
            { "icon": "work", "title": "Sujets de l'annonce", "description": annonce.description }
        ],
        "reviews": [],
        "disponibilites": etudiant.disponibilites,
        "availability": ", ".join(annonce.disponibilites) if annonce.disponibilites else "À discuter",
        "online": etudiant.is_online,
        "badgeTitle": "Mentor" if etudiant.is_mentor else "Étudiant Mentoré",
        "badgeSub": f"FILIÈRE {etudiant.get_filiere_display().upper()}"
    }
    
    return profile_data

def get_current_user_profile_data(user):
    """
    Récupère et formate les données du profil de l'utilisateur connecté.
    """
    if not hasattr(user, 'etudiant'):
        raise Http404("Profil étudiant non trouvé")
        
    etudiant = user.etudiant
    
    profile_data = {
        "id": etudiant.id,
        "name": f"{user.first_name} {user.last_name}",
        "title": f"Étudiant(e) en {etudiant.get_niveau_display()} {etudiant.get_filiere_display()} (IFRI)",
        "avatar": etudiant.photo_profil.url if etudiant.photo_profil else (etudiant.avatar or f"https://ui-avatars.com/api/?name={user.first_name}+{user.last_name}&background=random"),
        "photo_couverture": etudiant.photo_couverture.url if etudiant.photo_couverture else None,
        "location": "Abomey-Calavi, Bénin",
        "levelAndFiliere": f"{etudiant.get_niveau_display()} - {etudiant.get_filiere_display()}",
        "statsMentoring": "0",
        "statsProjects": "0",
        "bio": etudiant.bio or "Aucune biographie fournie.",
        "skills": etudiant.points_forts,
        "objectives": [
            { "icon": "school", "title": "Mes points faibles", "description": ", ".join(etudiant.points_faibles) if etudiant.points_faibles else "Aucun point faible renseigné." }
        ],
        "reviews": [],
        "disponibilites": etudiant.disponibilites,
        "availability": ", ".join(etudiant.disponibilites) if etudiant.disponibilites else "À renseigner",
        "online": etudiant.is_online,
        "badgeTitle": "Mentor" if etudiant.is_mentor else "Étudiant Mentoré",
        "badgeSub": f"FILIÈRE {etudiant.get_filiere_display().upper()}"
    }
    
    return profile_data
