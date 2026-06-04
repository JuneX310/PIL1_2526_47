# IFRI_MentorLink
 
Application web de mise en relation mentors/mentorés pour les étudiants de l'IFRI (Institut de Formation et de Recherche en Informatique) — Université d'Abomey-Calavi.
 
---
 
## Table des matières
 
- [Présentation](#présentation)
- [Équipe](#équipe)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture du projet](#architecture-du-projet)
- [Prérequis](#prérequis)
- [Installation et déploiement](#installation-et-déploiement)
- [Configuration de la base de données](#configuration-de-la-base-de-données)
- [Lancer le projet](#lancer-le-projet)
- [Manuel d'utilisation](#manuel-dutilisation)
- [Contribution Git](#contribution-git)
---
 
## Présentation
 
IFRI_MentorLink est une plateforme de mentorat académique et professionnel entre étudiants de l'IFRI. Chaque utilisateur peut créer un profil, publier ou rechercher des offres/demandes de mentorat, et échanger via une messagerie intégrée. Un algorithme de matching propose automatiquement les combinaisons mentor-mentoré les plus pertinentes selon les compétences, filières et disponibilités.
 
### Fonctionnalités principales
 
- Inscription, connexion et réinitialisation de mot de passe
- Création et modification de profil (compétences, filière, disponibilités)
- Publication d'offres et demandes de mentorat
- Algorithme de matching mentor-mentoré
- Messagerie instantanée avec historique
- Dashboard personnel
---
 
## Équipe
 
| Nom | Rôle | Groupe |
|-----|------|--------|
| Alpha | Chef de projet | — |
| SOZAN Euloge | Développeur | Groupe 1 — Matching & Exploration |
| BOKO Conceptia | Développeur | Groupe 1 — Matching & Exploration |
| Sylvestre FASSINOU | Développeur | Groupe 2 — Authentification |
| Alex HOUNSOU | Développeur | Groupe 2 — Authentification |
| Marck LANTONKPODE | Développeur | Groupe 3 — Profils & Navigation |
| HOUNYE Junior | Développeur | Groupe 3 — Profils & Navigation |
| Elom Princesse | Développeur | Groupe 3 — Profils & Navigation |
 
---
 
## Technologies utilisées
 
| Couche | Technologie |
|--------|-------------|
| Frontend | HTML5, CSS3, JavaScript, Tailwind CSS (CDN) |
| Backend | Python 3, Django 6 |
| Base de données | MySQL |
| Versioning | Git / GitHub |
| Environnement | virtualenv |
 
---
 
## Architecture du projet
 
```
PIL1_2526_47/
├── README.md
├── .gitignore
├── requirements.txt
│
├── frontend/
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── assets/
│   └── templates/
│       ├── base.html
│       ├── groupe1_matching/
│       ├── groupe2_auth/
│       └── groupe3_profiles/
│
├── backend/
│   ├── manage.py
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   └── apps/
│       ├── accounts/
│       ├── matching/
│       └── profiles/
│
├── database/
│   └── schema.sql
│
└── docs/
    └── rapport.html
```
 
---
 
## Prérequis
 
Avant d'installer le projet, assurez-vous d'avoir installé :
 
- [Python 3.10+](https://www.python.org/downloads/)
- [MySQL 8+](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com/)
- Un terminal (PowerShell, Bash, etc.)
---
 
## Installation et déploiement
 
### 1. Cloner le dépôt
 
```bash
git clone https://github.com/IFRI-PROJETS/PIL1_2526_47.git
cd PIL1_2526_47
```
 
### 2. Créer et activer l'environnement virtuel
 
```bash
# Windows
python -m venv venv
venv\Scripts\activate
 
# Mac / Linux
python3 -m venv venv
source venv/bin/activate
```
 
### 3. Installer les dépendances Python
 
```bash
pip install -r requirements.txt
```
 
### 4. Configurer les variables d'environnement
 
Copier le fichier exemple et le remplir avec vos informations locales :
 
```bash
cp backend/.env.example backend/.env
```
 
Ouvrir `backend/.env` et renseigner :
 
```
SECRET_KEY=votre_clé_secrète_django
DB_NAME=mentorlink_db
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_HOST=localhost
DB_PORT=3306
```
 
---
 
## Configuration de la base de données
 
### 1. Créer la base de données MySQL
 
```sql
CREATE DATABASE mentorlink_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
 
### 2. Appliquer les migrations Django
 
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```
 
### 3. Créer un superutilisateur (admin)
 
```bash
python manage.py createsuperuser
```
 
---
 
## Lancer le projet
 
```bash
cd backend
python manage.py runserver
```
 
L'application est accessible sur : [http://127.0.0.1:8000](http://127.0.0.1:8000)
 
L'interface d'administration Django est accessible sur : [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)
 
---
 
## Manuel d'utilisation
 
### Inscription
1. Accéder à la page d'accueil
2. Cliquer sur **S'inscrire**
3. Remplir le formulaire (nom, prénom, email, téléphone, mot de passe)
4. Choisir ses points forts et points faibles
### Connexion
1. Cliquer sur **Se connecter**
2. Entrer son email ou numéro de téléphone et son mot de passe
### Publier une offre/demande de mentorat
1. Depuis le dashboard, cliquer sur **Publier**
2. Choisir les matières, disponibilités et format (présentiel/en ligne)
### Trouver un mentor ou mentoré
1. Aller sur **Explorer** ou **Matchs**
2. Consulter les suggestions proposées par l'algorithme
3. Envoyer un message via la messagerie intégrée
### Modifier son profil
1. Cliquer sur **Mon profil**
2. Modifier les informations souhaitées et sauvegarder
---
 
## Contribution Git
 
### Workflow de l'équipe
 
```
main        ← branche stable (chef de projet uniquement)
dev         ← branche d'intégration
groupe_1    ← Groupe 1 (Matching & Exploration)
groupe_2    ← Groupe 2 (Authentification)
groupe_3    ← Groupe 3 (Profils & Navigation)
```
 
### Règles de contribution
 
- Chaque membre travaille sur la branche de son groupe
- Les commits doivent être réguliers et explicites :
  ```
  feat: ajout formulaire inscription
  fix: correction validation email
  style: mise en forme page dashboard
  ```
- Toute intégration vers `dev` se fait via une **Pull Request**
- Seul le chef de projet merge `dev` → `main`
### Commandes utiles
 
```bash
# Se positionner sur sa branche
git checkout groupe_2
 
# Récupérer les dernières modifications
git pull origin groupe_2
 
# Ajouter et committer ses modifications
git add .
git commit -m "feat: description de la modification"
 
# Pousser sur GitHub
git push origin groupe_2
```
 
---
 
## Encadrement
 
- Supervision : M. Ratheil HOUNDJI
- Encadrants : M. Armand ACCROMBESSI, Mme Maryse GAHOU
- Année académique : 2025-2026