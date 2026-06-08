def calculer_score_matching(mentor, mentore):
    """
    Calcule le score de compatibilité entre un mentor et un mentoré.
    Retourne un entier entre 0 et 100.
    """
    score = 0
    
    # 1. Votre logique pour comparer les filières...
    # 2. Votre logique pour comparer les niveaux (L1, L2, L3, M1, M2)...
    # 3. Votre logique pour les compétences (points forts vs points faibles)...
    # 4. Votre logique pour les disponibilités...
    
    # ... à vous de jouer ! ...

    return score


# --- DONNÉES DE TEST POUR VÉRIFIER VOTRE ALGO ---
if __name__ == "__main__":
    # Testez votre fonction ici en l'exécutant directement
    
    mentor_test = {
        "filiere": "Génie Logiciel",
        "niveau": "M1",
        "points_forts": ["Python", "Algorithmique", "SQL"],
        "disponibilites": ["Lundi", "Mercredi"]
    }

    mentore_test = {
        "filiere": "Génie Logiciel",
        "niveau": "L2",
        "points_faibles": ["Python", "C++"],
        "disponibilites": ["Mercredi", "Vendredi"]
    }

    resultat = calculer_score_matching(mentor_test, mentore_test)
    print(f"Le score de matching est de : {resultat}/100")
