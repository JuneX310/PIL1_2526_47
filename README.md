# IFRI_MentorLink

Plateforme web d'interconnexion et de mentorat académique pour les étudiants de l'Institut de Formation et de Recherche en Informatique (IFRI) de l'Université d'Abomey-Calavi.

## Technologies

- **Backend** : Django (Python 3.x)
- **Frontend** : HTML5, CSS3, JavaScript (Vue.js 3 via CDN)
- **Base de données** : MySQL 8.x
- **Gestion de version** : Git / GitHub
- **Environnement virtuel** : virtualenv

## Prérequis

- Python 3.10 ou version supérieure
- MySQL Server 8.0 ou version supérieure
- Git

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/IFRI-PROJETS/PIL1_2526_47.git
cd PIL1_2526_47

# Accéder au backend et initialiser l'environnement virtuel
cd backend
python -m venv venv

# Activer l'environnement virtuel
# Sur Windows :
.\venv\Scripts\activate
# Sur Linux / macOS :
source venv/bin/activate

# Installer les dépendances
pip install -r ../requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
```
*(Configurez ensuite le fichier `.env` avec vos accès de base de données locaux)*

## Lancement

```bash
# Appliquer les migrations sur la base MySQL
python manage.py migrate

# Lancer le serveur de développement
python manage.py runserver
```
L'application sera accessible localement à l'adresse : [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## Structure du projet

```
PIL1_2526_47/
├── README.md               # Le présent fichier de documentation
├── requirements.txt        # Dépendances Python globales
│
├── database/
│   └── schema.sql          # Script SQL d'importation de la base finale
│
├── docs/
│   └── rapport.html        # Rapport technique du projet (Premium)
│
├── frontend/               # Fichiers statiques et gabarits de présentation
│   ├── static/             # Feuilles de styles CSS et scripts JS
│   │   ├── css/
│   │   └── js/
│   └── templates/          # Gabarits HTML découpés par groupe
│       ├── base.html
│       ├── groupe1/        # Matching & Exploration
│       ├── groupe2/        # Authentification & Accès
│       └── groupe3/        # Profils & Navigation
│
└── backend/                # Code de l'application Django
    ├── manage.py
    ├── config/             # Configuration principale de Django
    └── apps/               # Applications modulaires
        ├── accounts/       # Inscription, Connexion & Comptes
        ├── matching/       # Suggestions & Annonces
        └── profiles/       # Dashboard & Messagerie
```

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `SECRET_KEY` | Clé secrète de cryptage de l'application Django |
| `DB_NAME` | Nom de la base de données MySQL |
| `DB_USER` | Identifiant de connexion MySQL (ex: `root`) |
| `DB_PASSWORD` | Mot de passe de l'utilisateur MySQL |
| `DB_HOST` | Hôte de la base de données (ex: `localhost`) |
| `DB_PORT` | Port de connexion MySQL (ex: `3306`) |

## Contribuer

1. Créer une branche à partir de `dev` : `git checkout -b feature/ma-fonctionnalite`
2. Committer vos modifications : `git commit -m "feat: description de l'apport"`
3. Pusher la branche : `git push origin feature/ma-fonctionnalite`
4. Ouvrir une Pull Request vers la branche `dev`

## Auteurs

- **SOZAN Euloge** (Licence IA) — Chef de projet & Développeur Groupe 1 — [sozaneuloge](https://github.com/sozaneuloge)
- **BOKO Conceptia (Vanessa)** (Licence GL) — Développeuse Groupe 1 — [vanessaboko](https://github.com/vanessaboko)
- **Sylvestre FASSINOU** (Licence SI) — Développeur Groupe 2 — [fassinousylvestre6](https://github.com/fassinousylvestre6)
- **Alex HOUNSOU** (Licence GL) — Développeur Groupe 2 — [alexhounsou](https://github.com/alexhounsou)
- **ACAPO Elom Princesse** (Licence IM) — Développeuse Groupe 3 — [elomprincesse](https://github.com/elomprincesse)
- **HOUNYE Junior** (Licence SI) — Développeur Groupe 3 — [JuneX310](https://github.com/JuneX310)
- **Marck LANTONKPODE** (Licence SI) — Développeur Groupe 3 — [marcklantonkpode](https://github.com/marcklantonkpode)

*Avec l'assistance IA de **Gemini** pour la réalisation des maquettes de A à Z et la génération documentaire.*

## Licence

MIT.