---
name: IFRI_MentorLink
colors:
  surface: '#f4faff'
  surface-dim: '#cadde9'
  surface-bright: '#f4faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e8f6ff'
  surface-container: '#def1fd'
  surface-container-high: '#d8ebf7'
  surface-container-highest: '#d2e5f2'
  on-surface: '#0b1e27'
  on-surface-variant: '#454650'
  inverse-surface: '#21333c'
  inverse-on-surface: '#e2f3ff'
  outline: '#767681'
  outline-variant: '#c6c5d1'
  surface-tint: '#4e5b96'
  primary: '#00052b'
  on-primary: '#ffffff'
  primary-container: '#0c1b54'
  on-primary-container: '#7885c3'
  inverse-primary: '#b8c3ff'
  secondary: '#8b5000'
  on-secondary: '#ffffff'
  secondary-container: '#ffa441'
  on-secondary-container: '#6d3e00'
  tertiary: '#1a0400'
  on-tertiary: '#ffffff'
  tertiary-container: '#401200'
  on-tertiary-container: '#bf7658'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#05154f'
  on-primary-fixed-variant: '#36437c'
  secondary-fixed: '#ffdcbe'
  secondary-fixed-dim: '#ffb872'
  on-secondary-fixed: '#2d1600'
  on-secondary-fixed-variant: '#6a3c00'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb598'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#70361d'
  background: '#f4faff'
  on-background: '#0b1e27'
  surface-variant: '#d2e5f2'
  surface-fond: '#F2F0EC'
  surface-carte: '#FFFFFF'
  succes: '#2D6A4F'
  erreur: '#D90429'
typography:
  titre-h1:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  titre-h1-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  titre-h2:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  titre-h3:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  corps-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  corps-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  bouton:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  grille-colonnes: '12'
  grille-gouttiere: 24px
  marge-page: 5%
---

## Marque et Style
La direction artistique de ce système de design est ancrée dans le concept de **"L'Excellence Connectée"**. Pour un environnement universitaire comme l'IFRI au Bénin, l'interface doit projeter une image de professionnalisme rigoureux tout en restant accessible aux étudiants.

Le style adopté est **Moderne / Institutionnel**, caractérisé par :
- Une utilisation généreuse de l'espace blanc pour favoriser la clarté mentale et la concentration.
- Une esthétique "SaaS haut de gamme" qui combine des structures de grille précises avec des éléments d'interface doux.
- Un équilibre entre l'autorité académique (bleu profond) et l'énergie de la jeunesse estudiantine (accent orange).
- Une approche minimaliste qui élimine tout bruit visuel inutile pour mettre l'accent sur les relations de mentorat.

## Couleurs
La palette est hiérarchisée pour renforcer la confiance et la lisibilité :

- **Primaire (Bleu Institutionnel) :** Utilisé pour la navigation, les titres principaux et les actions prioritaires. Il évoque le sérieux de l'académie.
- **Secondaire (Orange Énergie) :** Utilisé avec parcimonie pour les appels à l'action (CTA) critiques, les notifications importantes et les indicateurs de progression.
- **Neutre (Gris Acier) :** Dédié au texte de corps et aux éléments d'interface secondaires.
- **Fond (Sable Clair) :** Une nuance très légère est utilisée pour les arrière-plans afin de réduire la fatigue oculaire par rapport au blanc pur, tout en conservant une sensation de propreté.

## Typographie
Le système utilise une combinaison de trois polices pour articuler la hiérarchie :

1.  **Montserrat (Titres) :** Apporte une structure géométrique et une autorité moderne. Les titres utilisent un crénage (letter-spacing) légèrement serré pour un aspect plus compact et professionnel.
2.  **Nunito Sans (Corps de texte) :** Ses formes ouvertes et légèrement arrondies facilitent la lecture prolongée sur écran, essentielle pour une plateforme de mentorat.
3.  **Inter (Interface/Labels) :** Utilisée pour sa clarté technique dans les boutons, les étiquettes de données et les éléments de navigation.

## Mise en page et Espacement
Le système repose sur une **grille fluide de 12 colonnes** pour le bureau, passant à 4 colonnes sur mobile.

- **Rythme Vertical :** Basé sur un module de 8px. Tous les espacements entre les composants doivent être des multiples de 8.
- **Marges de Page :** Les conteneurs principaux ne collent jamais aux bords de l'écran, utilisant une marge de sécurité de 5% ou un maximum de 1200px de largeur centrée.
- **Densité :** On privilégie une densité "Aérée". Le mentorat nécessite de l'espace pour la réflexion ; les listes d'étudiants et les messages doivent respirer.

## Élévation et Profondeur
L'interface utilise des **Calques Tonaux** et des ombres subtiles pour définir la hiérarchie :

- **Niveau 0 (Fond) :** Utilise la couleur `surface-fond` (#F2F0EC).
- **Niveau 1 (Cartes/Conteneurs) :** Surfaces blanches (#FFFFFF) avec une bordure fine de 1px (#E0E0E0) ou une ombre très diffuse.
- **Ombres (Shadows) :** Les ombres doivent être presque imperceptibles, utilisant une couleur de diffusion teintée par le bleu primaire (ex: `rgba(12, 27, 84, 0.05)`).
- **Interactivité :** Au survol (hover), les éléments s'élèvent légèrement en augmentant la diffusion de l'ombre, créant une sensation de réactivité tactile.

## Formes
Le langage des formes est **Arrondi (Rounded)** pour adoucir l'aspect institutionnel et encourager l'interaction humaine.

- **Composants Standards :** Rayon de 0.5rem (8px) pour les boutons et les champs de saisie.
- **Cartes de Mentorat :** Rayon de 1rem (16px) pour les conteneurs de profil, créant une séparation visuelle douce avec le fond.
- **Avatars :** Toujours circulaires pour humaniser les participants.

## Composants

### Boutons
- **Primaire :** Fond bleu (#0C1B54), texte blanc, angles arrondis (8px). État hover : éclaircissement léger.
- **Secondaire (Action Spéciale) :** Fond orange (#FFA440), texte bleu sombre, pour les actions comme "Devenir Mentor".
- **Tertiaire (Ghost) :** Bordure 1px bleue, texte bleu, fond transparent.

### Cartes (Cards)
- Fond blanc, coins arrondis de 16px.
- Utilisation d'une ombre portée très légère (`0px 4px 20px rgba(0,0,0,0.04)`).
- Padding interne généreux de 24px (md).

### Champs de Saisie (Inputs)
- Bordure fine grise, fond blanc.
- État actif : La bordure devient bleue primaire avec un halo de focus subtil.
- Labels en Inter (bold) placés au-dessus du champ.

### Badges et Chips
- Utilisés pour les compétences (ex: "Algorithmique", "Gestion de projet").
- Fond bleu très clair (10% d'opacité) avec texte bleu foncé. Forme pilule.

### Listes de Mentorat
- Structure linéaire avec séparateurs horizontaux très fins (#F0F0F0).
- Utilisation d'icônes linéaires minimalistes pour les métadonnées (temps, département, niveau d'étude).