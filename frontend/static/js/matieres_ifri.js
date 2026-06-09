/**
 * Matières de la Licence Professionnelle en Intelligence Artificielle — IFRI
 * Première année (L1) : Semestres 1 et 2
 * Source : Offre de formation Licence IA IFRI
 */

const MATIERES_IFRI_L1 = [
    // ── Semestre 1 ──────────────────────────────────────────────────────────────
    // Unités de connaissances fondamentales
    { id: 1,  nom: "Logique et arithmétique",                    semestre: 1, unite: "Connaissances fondamentales" },
    { id: 2,  nom: "Algèbre linéaire",                           semestre: 1, unite: "Connaissances fondamentales" },
    { id: 3,  nom: "Analyse mathématique",                       semestre: 1, unite: "Connaissances fondamentales" },
    { id: 4,  nom: "Analyse combinatoire et probabilités",       semestre: 1, unite: "Connaissances fondamentales" },
    { id: 5,  nom: "Statistiques inférentielles",                semestre: 1, unite: "Connaissances fondamentales" },
    // Unité de découverte ou de spécialité
    { id: 6,  nom: "Architecture et topologie des réseaux",      semestre: 1, unite: "Découverte / Spécialité" },
    { id: 7,  nom: "Systèmes d'exploitation (Windows/Linux)",    semestre: 1, unite: "Découverte / Spécialité" },
    { id: 8,  nom: "Outils de base en informatique",             semestre: 1, unite: "Découverte / Spécialité" },
    { id: 9,  nom: "Algorithmique",                              semestre: 1, unite: "Découverte / Spécialité" },
    { id: 10, nom: "Langage C",                                  semestre: 1, unite: "Découverte / Spécialité" },
    // Unités de méthodologie
    { id: 11, nom: "Déontologie et droit liés aux TIC",          semestre: 1, unite: "Méthodologie" },
    // Unités de culture générale
    { id: 12, nom: "Techniques d'expression écrite et orale",    semestre: 1, unite: "Culture générale" },

    // ── Semestre 2 ──────────────────────────────────────────────────────────────
    // Unités de connaissances fondamentales
    { id: 13, nom: "Administration des réseaux (Windows/Linux)", semestre: 2, unite: "Connaissances fondamentales" },
    { id: 14, nom: "Suites et séries numériques",                semestre: 2, unite: "Connaissances fondamentales" },
    { id: 15, nom: "Équations différentielles et calcul intégral",semestre: 2, unite: "Connaissances fondamentales" },
    // Unité de découverte ou de spécialité
    { id: 16, nom: "Projet intégrateur",                         semestre: 2, unite: "Découverte / Spécialité" },
    { id: 17, nom: "Théorie des graphes",                        semestre: 2, unite: "Découverte / Spécialité" },
    { id: 18, nom: "Recherche opérationnelle",                   semestre: 2, unite: "Découverte / Spécialité" },
    { id: 19, nom: "Développement web",                          semestre: 2, unite: "Découverte / Spécialité" },
    { id: 20, nom: "Infographie",                                semestre: 2, unite: "Découverte / Spécialité" },
    { id: 21, nom: "Théorie des bases de données",               semestre: 2, unite: "Découverte / Spécialité" },
    { id: 22, nom: "SGBD et langage SQL",                        semestre: 2, unite: "Découverte / Spécialité" },
    // Unités de méthodologie
    { id: 23, nom: "Programmation Python",                       semestre: 2, unite: "Méthodologie" },
    // Unités de culture générale
    { id: 24, nom: "Anglais technique",                          semestre: 2, unite: "Culture générale" },
];

/**
 * Retourne la liste à plat des noms de matières (utile pour les dropdowns simples)
 */
const MATIERES_IFRI_NOMS = MATIERES_IFRI_L1.map(m => m.nom);

// Export global (pour utilisation directe dans les scripts du projet)
if (typeof window !== 'undefined') {
    window.MATIERES_IFRI_L1 = MATIERES_IFRI_L1;
    window.MATIERES_IFRI_NOMS = MATIERES_IFRI_NOMS;
}
