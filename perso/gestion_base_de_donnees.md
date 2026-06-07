# Guide de Gestion de la Base de Données — IFRI_MentorLink

Ce document explique comment gérer collaborativement et proprement la base de données MySQL du projet avec Django. Puisque le développement se fait en équipe sur plusieurs branches Git, il est essentiel de respecter ces règles pour éviter d'écraser le travail des autres ou de casser l'application.

---

## 1. Principe de base : Django est la "Source de Vérité"

> [!IMPORTANT]
> **Ne modifiez jamais la structure des tables directement dans MySQL** (via phpMyAdmin, Workbench ou des scripts SQL bruts). 
> Toutes les modifications de la base de données doivent obligatoirement passer par les modèles Django (`models.py`) et le système de migrations.

---

## 2. Configuration locale (`.env`)

Chaque développeur possède ses propres accès à sa base de données locale (nom d'utilisateur, mot de passe, port, etc.).

1. Copiez le fichier `.env.example` dans le dossier `backend` et renommez-le en `.env`.
2. Configurez vos variables de connexion :
   ```env
   SECRET_KEY=votre_cle_de_securite_django
   DB_NAME=mentorlink_db
   DB_USER=root
   DB_PASSWORD=votre_mot_de_passe
   DB_HOST=localhost
   DB_PORT=3306
   ```
3. **Important :** Le fichier `.env` est configuré dans le `.gitignore` et ne doit jamais être poussé sur GitHub.

---

## 3. Flux de travail pour modifier la base de données

Lorsque vous devez ajouter une table ou un champ :

1. Modifiez ou ajoutez votre modèle dans le fichier `models.py` de votre application (ex: `backend/apps/matching/models.py`).
2. Générez le fichier de migration localement :
   ```bash
   python manage.py makemigrations
   ```
   *Cette commande analyse vos modèles et crée un fichier `.py` numéroté (ex: `0001_initial.py`) dans le dossier `migrations` de votre application.*
3. Appliquez la migration sur votre base de données locale :
   ```bash
   python manage.py migrate
   ```
4. Ajoutez et committez les fichiers de migration créés dans Git :
   ```bash
   git add apps/matching/migrations/
   git commit -m "feat: ajout de la table pour les offres de mentorat"
   ```

---

## 4. Récupérer les modifications des autres membres

Lorsque vous récupérez le code mis à jour depuis Git (`git pull`), si des collègues ont modifié la base de données :

1. Vous verrez de nouveaux fichiers de migration apparaître dans le projet.
2. Appliquez-les immédiatement sur votre base locale :
   ```bash
   python manage.py migrate
   ```

---

## 5. Résolution des conflits de migrations (Merge Conflicts)

Si deux groupes ont créé des migrations en parallèle avec le même numéro d'ordre (par exemple, deux migrations `0002_...` différentes) :

1. Django affichera une erreur lors du `migrate` indiquant un conflit de branches de migration.
2. Pour corriger cela, demandez à Django de fusionner automatiquement les branches :
   ```bash
   python manage.py makemigrations --merge
   ```
3. Validez la fusion et appliquez la migration combinée :
   ```bash
   python manage.py migrate
   ```
4. Committez la migration de fusion générée.

---

## 6. Partage de données de test (Fixtures)

Pour éviter que chacun ait à ressaisir manuellement des données de test (matières, créneaux horaires, utilisateurs fictifs) :

* **Pour exporter vos données locales dans un fichier JSON :**
  ```bash
  python manage.py dumpdata --indent=2 > fixtures_test.json
  ```
* **Pour importer ces données sur une autre machine :**
  ```bash
  python manage.py loaddata fixtures_test.json
  ```
