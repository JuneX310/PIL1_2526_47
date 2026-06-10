<div align="center">

# 🎓 IFRI MentorLink

**Plateforme web d'interconnexion et de mentorat académique**

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-6.0-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![License](https://img.shields.io/badge/Licence-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

*Une plateforme conçue pour les étudiants de l'[Institut de Formation et de Recherche en Informatique (IFRI)](https://ifri-uac.bj/) de l'Université d'Abomey-Calavi, permettant la mise en correspondance intelligente entre mentors et mentorés selon leurs compétences, lacunes et disponibilités.*

<br/>

</div>

---

## 📑 Table des matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Lancement](#-lancement)
- [Structure du projet](#-structure-du-projet)
- [Variables d'environnement](#-variables-denvironnement)
- [Contribuer](#-contribuer)
- [Auteurs](#-auteurs)
- [Licence](#-licence)

---

## 🔍 Aperçu

IFRI MentorLink est un projet intégrateur développé dans le cadre du cursus de Licence 1 à l'IFRI (année académique 2025-2026). La plateforme met en relation les étudiants souhaitant offrir du mentorat dans leurs matières fortes avec ceux qui recherchent un accompagnement dans leurs matières faibles.

### Comment ça marche ?

1. **Inscription** — L'étudiant renseigne ses points forts, ses points faibles et ses disponibilités hebdomadaires en 3 étapes guidées.
2. **Algorithme de Matching** — Le système calcule un score de compatibilité entre étudiants en croisant compétences complémentaires et plages horaires communes.
3. **Exploration & Contact** — L'étudiant parcourt les annonces, consulte les profils suggérés et engage la conversation via la messagerie intégrée.

---

## ✨ Fonctionnalités

| Module | Fonctionnalités |
|--------|-----------------|
| **🔐 Authentification** | Inscription multi-étapes, connexion (email ou téléphone), réinitialisation de mot de passe, mots de passe hashés (PBKDF2-SHA256) |
| **🤝 Matching** | Algorithme de compatibilité, publication d'annonces (offre/demande), exploration et filtrage, suggestions automatiques |
| **👤 Profils** | Tableau de bord personnalisé, profil détaillé, modification de profil (photo, couverture, infos) |
| **💬 Messagerie** | Chat en temps réel (polling 2s), historique des conversations, interface intuitive |
| **🔔 Notifications** | Historique des notifications, alertes de nouvelles demandes et de messages |

---

## 🛠 Technologies

| Catégorie | Technologie |
|-----------|-------------|
| **Backend** | Django 6.0 (Python 3.10+) |
| **Frontend** | HTML5, CSS3 (Tailwind CDN), JavaScript, Vue.js 3 (CDN) |
| **Base de données** | MySQL 8.0+ |
| **Authentification** | Django Auth (PBKDF2-SHA256) |
| **Gestion de version** | Git / GitHub |
| **Environnement** | virtualenv, python-dotenv |

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Python](https://www.python.org/downloads/) `3.10` ou version supérieure
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) `8.0` ou version supérieure
- [Git](https://git-scm.com/downloads)

---

## ⚙️ Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/JuneX310/PIL1_2526_47.git
cd PIL1_2526_47

# 2. Accéder au backend et créer l'environnement virtuel
cd backend
python -m venv venv

# 3. Activer l'environnement virtuel
# ── Windows :
.\venv\Scripts\activate
# ── Linux / macOS :
source venv/bin/activate

# 4. Installer les dépendances
pip install -r ../requirements.txt

# 5. Configurer les variables d'environnement
cp .env.example .env
```

> [!IMPORTANT]
> Ouvrez le fichier `.env` et renseignez vos identifiants de connexion MySQL locaux avant de poursuivre.

---

## 🚀 Lancement

```bash
# Créer la base de données MySQL (si ce n'est pas déjà fait)
# Dans votre terminal MySQL :
#   CREATE DATABASE mentorlink_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Appliquer les migrations Django
python manage.py migrate

# Lancer le serveur de développement
python manage.py runserver
```

L'application sera accessible à l'adresse : **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

---

## 📁 Structure du projet

```
PIL1_2526_47/
│
├── 📄 README.md                    # Le présent fichier de documentation
├── 📄 requirements.txt             # Dépendances Python globales
├── 📄 .gitignore                   # Fichiers et dossiers ignorés par Git
│
├── 📂 database/
│   └── schema.sql                  # Script SQL d'importation de la base finale
│
├── 📂 docs/
│   └── rapport.html                # Rapport technique du projet
│
├── 📂 frontend/                    # Fichiers statiques et gabarits de présentation
│   ├── 📂 static/
│   │   ├── 📂 assets/              # Images, logo, avatars par défaut
│   │   ├── 📂 css/                 # Feuilles de styles CSS
│   │   └── 📂 js/                  # Scripts JavaScript
│   └── 📂 templates/               # Gabarits HTML découpés par groupe
│       ├── base.html               # Template de base (navbar, footer, CDN)
│       ├── 📂 groupe1/             # Matching & Exploration
│       ├── 📂 groupe2/             # Authentification & Accès
│       └── 📂 groupe3/             # Profils & Navigation
│
├── 📂 backend/                     # Code de l'application Django
│   ├── manage.py                   # Point d'entrée Django
│   ├── .env.example                # Modèle de variables d'environnement
│   ├── 📂 config/                  # Configuration principale Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── 📂 apps/                    # Applications modulaires
│       ├── 📂 accounts/            # Inscription, Connexion & Comptes
│       ├── 📂 matching/            # Suggestions, Annonces & Algorithme
│       └── 📂 profiles/            # Dashboard, Messagerie & Notifications
│
└── 📂 media/                       # Fichiers uploadés (photos de profil, etc.)
```

---

## 🔑 Variables d'environnement

Créez un fichier `.env` dans le dossier `backend/` à partir du modèle `.env.example` :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `SECRET_KEY` | Clé secrète de cryptage Django | `votre-clé-secrète-ici` |
| `DB_NAME` | Nom de la base de données MySQL | `mentorlink_db` |
| `DB_USER` | Identifiant de connexion MySQL | `root` |
| `DB_PASSWORD` | Mot de passe de l'utilisateur MySQL | `mon_mot_de_passe` |
| `DB_HOST` | Hôte de la base de données | `localhost` |
| `DB_PORT` | Port de connexion MySQL | `3306` |

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici le workflow à suivre :

1. **Créer une branche** à partir de `main` :
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
2. **Committer** vos modifications :
   ```bash
   git commit -m "feat: description de l'apport"
   ```
3. **Pusher** la branche :
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
4. **Ouvrir une Pull Request** vers `main`

---

## 👥 Auteurs

<table>
  <thead>
    <tr>
      <th>Nom</th>
      <th>Spécialité</th>
      <th>Rôle</th>
      <th>GitHub</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>SOZAN Euloge</strong></td>
      <td>Licence IA</td>
      <td>🎯 Chef de projet & Développeur Groupe 1</td>
      <td><a href="https://github.com/sozaneuloge">@sozaneuloge</a></td>
    </tr>
    <tr>
      <td><strong>BOKO Conceptia (Vanessa)</strong></td>
      <td>Licence GL</td>
      <td>Développeuse Groupe 1</td>
      <td><a href="https://github.com/vanessaboko">@vanessaboko</a></td>
    </tr>
    <tr>
      <td><strong>Sylvestre FASSINOU</strong></td>
      <td>Licence SI</td>
      <td>Développeur Groupe 2</td>
      <td><a href="https://github.com/fassinousylvestre6">@fassinousylvestre6</a></td>
    </tr>
    <tr>
      <td><strong>Alex HOUNSOU</strong></td>
      <td>Licence GL</td>
      <td>Développeur Groupe 2</td>
      <td><a href="https://github.com/alexhounsou">@alexhounsou</a></td>
    </tr>
    <tr>
      <td><strong>ACAPO Elom Princesse</strong></td>
      <td>Licence IM</td>
      <td>Développeuse Groupe 3</td>
      <td><a href="https://github.com/elomprincesse">@elomprincesse</a></td>
    </tr>
    <tr>
      <td><strong>HOUNYE Junior</strong></td>
      <td>Licence SI</td>
      <td>Développeur Groupe 3</td>
      <td><a href="https://github.com/JuneX310">@JuneX310</a></td>
    </tr>
    <tr>
      <td><strong>Marck LANTONKPODE</strong></td>
      <td>Licence SI</td>
      <td>Développeur Groupe 3</td>
      <td><a href="https://github.com/marcklantonkpode">@marcklantonkpode</a></td>
    </tr>
  </tbody>
</table>

<br/>

> *Avec l'assistance IA de **Gemini** pour la réalisation des maquettes de A à Z et la génération documentaire.*

---

## 📄 Licence

Ce projet est distribué sous la licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.

---

<div align="center">

**Projet Intégrateur 2025-2026 — IFRI, Université d'Abomey-Calavi**

Made with ❤️ by le Groupe PIL1_2526_47

</div>