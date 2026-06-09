def calculer_score_matching(mentor, mentore):
    """
    Calcule le score de compatibilité entre un mentor et un mentoré.
    Retourne un entier entre 0 et 100.

    Répartition des points (25 pts max par critère) :
      - Niveau d'études : 25 pts
      - Filière : 25 pts
      - Compétences : 25 pts
      - Disponibilités : 25 pts
    """
    score = 0

    # Mapping des niveaux vers des valeurs numériques
    niveaux = {"L1": 1, "L2": 2, "L3": 3, "M1": 4, "M2": 5}

    # ── 1. Comparaison des niveaux d'études (25 pts max) ──
    niveau_mentor = niveaux.get(mentor['niveau'], 0)
    niveau_mentore = niveaux.get(mentore['niveau'], 0)

    if niveau_mentor > niveau_mentore:
        # Cas idéal : le mentor est plus avancé
        score += 25
    elif niveau_mentor == niveau_mentore:
        # Même niveau : utile mais pas idéal
        score += 15
    else:
        # Le mentoré est plus avancé que le mentor : peu pertinent
        score += 7

    # ── 2. Vérification de la conformité de filière (25 pts max) ──
    if mentor['filiere'] == mentore['filiere']:
        score += 25

    # ── 3. Compétences : le mentor est-il fort là où le mentoré est faible ? (25 pts max) ──
    nb_faibles = len(mentore['points_faibles'])
    if nb_faibles > 0:
        points_par_competence = 25 / nb_faibles
        for competence in mentore['points_faibles']:
            if competence in mentor['points_forts']:
                score += points_par_competence

    # ── 4. Disponibilités communes (25 pts max) ──
    nb_dispos_mentor = len(mentor['disponibilites'])
    if nb_dispos_mentor > 0:
        points_par_dispo = 25 / nb_dispos_mentor
        for jour in mentor['disponibilites']:
            if jour in mentore['disponibilites']:
                score += points_par_dispo

    # On s'assure que le score reste entre 0 et 100
    return min(round(score), 100)


# --- DONNÉES DE TEST POUR VÉRIFIER L'ALGO ---
if __name__ == "__main__":

    # Test 1 : Match quasi parfait
    mentor_test = {
        "filiere": "Génie Logiciel",
        "niveau": "L3",
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
    print(f"Test 1 (bon match)   : {resultat}/100")

    # Test 2 : Match médiocre (filières différentes, aucune compétence commune)
    mentor_2 = {
        "filiere": "Cybersécurité",
        "niveau": "M1",
        "points_forts": ["Ethical Hacking", "Firewalls"],
        "disponibilites": ["Samedi"]
    }

    mentore_2 = {
        "filiere": "Génie Logiciel",
        "niveau": "L1",
        "points_faibles": ["Python", "HTML"],
        "disponibilites": ["Lundi", "Mercredi"]
    }

    resultat2 = calculer_score_matching(mentor_2, mentore_2)
    print(f"Test 2 (mauvais match): {resultat2}/100")

    # Test 3 : Match parfait (tout correspond)
    mentor_3 = {
        "filiere": "Data Science",
        "niveau": "M2",
        "points_forts": ["R programming", "SQL", "Pandas"],
        "disponibilites": ["Lundi", "Mercredi"]
    }

    mentore_3 = {
        "filiere": "Data Science",
        "niveau": "L2",
        "points_faibles": ["R programming", "SQL"],
        "disponibilites": ["Lundi", "Mercredi"]
    }

    resultat3 = calculer_score_matching(mentor_3, mentore_3)
    print(f"Test 3 (match parfait): {resultat3}/100")
