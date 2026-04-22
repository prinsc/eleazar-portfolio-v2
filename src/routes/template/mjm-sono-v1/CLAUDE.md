Tu vas créer un site SvelteKit 5 complet pour "MJM Sonorisation & Yohan", un prestataire son/lumière/animation pour événements.

---

## STACK TECHNIQUE

- **SvelteKit 5** (syntaxe runes : $state, $derived, $props, etc.)
- **SCSS** pour tous les styles (pas de Tailwind, pas de CSS-in-JS)
- **Lucide Svelte** pour toutes les icones (aucun emoji nulle part)
- **TypeScript**
- Les données dynamiques sont chargées via `+page.server.ts` avec des **données mock pour l'instant** — tu prépares la structure pour une API future mais tu ne l'implémentes pas et tu ne laisses aucun commentaire à ce sujet. Le code doit juste être prêt à recevoir des données depuis un load() server-side.

---

## DESIGN

- Thème **sombre** exclusivement (fond très sombre, pas noir pur — plutôt #0d0d0d ou #111)
- **Aucun néon**, aucun effet glow criard
- Ambiance : **sobre, premium, professionnel** — lumières chaudes (or/ambre discret), typographie propre
  (pour la typo, tu as Jakarta Sans, Okine, Nofex, Colfax,... Ce sont des typos un peu plus design que celle qu'on a partout)
- Police principale : Inter ou similaire (Google Fonts)
- Design **moderne et épuré** avec de l'espace, pas chargé
- Animations subtiles au scroll (intersection observer, pas de lib externe)
- **Responsive** mobile-first
- **Aucun emoji** sur tout le site

---

## STRUCTURE DU SITE

Site one-page avec ancres + navigation fixe en haut.

### Navigation
- Logo texte "MJM Sonorisation & Yohan" à gauche
- Liens : Accueil, Prestations, Tonnelle, Chambre d'hôte, Ils nous ont fait confiance, Contact
- Menu burger sur mobile
- Fond transparent qui devient sombre au scroll

---

### SECTION 1 — Hero (Accueil)

Contenu :
- Titre principal : **"MJM Sonorisation & Yohan"**
- Sous-titre : **"Donnez une autre dimension à vos événements"**
- Accroche : "Son, lumière, ambiance… nous créons des expériences uniques."
- 4 points forts avec icone Lucide (Check ou similaire) :
  - Une prestation professionnelle et soignée
  - Une ambiance garantie du début à la fin
  - Une passion au service de votre événement
  - Une piste de danse toujours vivante
- Paragraphes de présentation :
  - "Avec MJM Sonorisation & Yohan, profitez d'une prise en charge complète : sonorisation, éclairage et animation, pour un événement clé en main."
  - "Forts de plus de 30 ans d'expérience, nous mettons à votre service du matériel professionnel et un savoir-faire reconnu, pour un rendu à la hauteur de vos attentes."
  - "Toujours à la pointe de la technologie, nous faisons évoluer nos équipements pour vous offrir le meilleur."
- Call to action : "Une question ? Un projet ? Contactez-nous !" → bouton qui ancre vers #contact
- Tagline finale : "MJM Sonorisation & Yohan — la signature de vos plus beaux événements."
- **2 images placeholder** intégrées dans la mise en page (format paysage, style ambiance événement) — utilise des balises <img> avec src="/images/hero-1.jpg" et "/images/hero-2.jpg" et un attribut alt descriptif. Crée des placeholders visuels en SCSS si les images n'existent pas encore (fond sombre avec dimensions fixes).

---

### SECTION 2 — Prestations

Titre de section : "Nos Prestations"

Afficher des **cartes** pour chaque type de prestation. Ces données viennent du `+page.server.ts` (mock). Chaque carte a : une icone Lucide pertinente, un titre, une courte description placeholder.

Prestations :
- Défilés
- Expositions
- Soirées publiques et privées
- En salle et sous chapiteau
- Mariages
- Anniversaires
- Événements d'entreprise

Layout : grille responsive (2-3 colonnes desktop, 1 colonne mobile).

---

### SECTION 3 — Téléchargements

Titre : "Téléchargements"
Sous-titre : "Logos et supports publicitaires pour sponsoring"

Afficher une liste de fichiers téléchargeables. Ces données viennent du `+page.server.ts` (mock). Chaque item a : nom du fichier, type (PNG / PDF / etc.), icone Lucide (Download), bouton de téléchargement.

Pour l'instant les liens pointent vers "#" — structure prête pour de vrais fichiers.

Ajoute un **logo placeholder** (carré gris avec texte "Logo MJM") représentant le logo de la société.

---

### SECTION 4 — Tonnelle

Titre : "La Tonnelle"

Contenu :
- Bloc texte descriptif placeholder (2-3 phrases sur la tonnelle — invente quelque chose de cohérent et sobre, à remplacer plus tard)
- **Galerie photos** : 4 à 6 placeholders images (src="/images/tonnelle-1.jpg" etc.)
- **Logo placeholder** de la Tonnelle

Données texte et photos viennent du `+page.server.ts` (mock).

---

### SECTION 5 — Chambre d'hôte

Titre : "Chambre d'hôte"

Contenu :
- **Galerie photos** : 4 placeholders images (src="/images/chambre-1.jpg" etc.)
- **Carte de visite placeholder** (bloc stylisé avec les infos fictives)
- **Logo placeholder**
- Section "Retrouvez-nous sur les plateformes" avec des boutons placeholder (liens vers "#") — icones Lucide pour les plateformes de réservation

Données viennent du `+page.server.ts` (mock).

---

### SECTION 6 — Ils nous ont fait confiance

Titre : "Ils nous ont fait confiance"

Afficher une **grille de logos partenaires** en placeholder. Ces données viennent du `+page.server.ts` (mock). Chaque logo est un carré gris avec un texte "Partenaire" centré. Prévoir 6 à 8 emplacements.

Style : logos en niveaux de gris, légèrement opaques, qui passent en pleine opacité au hover.

---

### SECTION 7 — Contact

Titre : "Contactez-nous"

**Informations de contact :**
- Adresse : 337, route de Flobecq — 7804 Ostiches
- Numéro d'entreprise : BE 0819.776.395
- GSM : à afficher avec icone Lucide Phone — valeur placeholder "GSM : +32 XXX XX XX XX"
- Mail : avec icone Lucide Mail — valeur placeholder "contact@mjmsono.be"
- Instagram : icone Lucide Instagram — lien "#"
- Facebook : icone Lucide Facebook — lien "#"
- Signataire : **Yohan**

**Formulaire de contact :**
Champs :
- Nom (required)
- Email (required)
- Téléphone (optionnel)
- Type d'événement (select : Mariage, Anniversaire, Soirée, Événement d'entreprise, Défilé, Exposition, Autre)
- Date souhaitée (date picker natif)
- Message (textarea, required)
- Bouton "Envoyer" avec icone Lucide Send

Le formulaire utilise la validation native HTML5 + une validation côté client en Svelte 5 ($state pour les champs, gestion des erreurs).
La soumission du formulaire pointe vers une action SvelteKit (`+page.server.ts`, action "contact") — l'action est **définie mais retourne juste un succès mock** pour l'instant.
Afficher un message de succès après envoi.

---

### Footer

- "MJM Sonorisation & Yohan — 337, route de Flobecq, 7804 Ostiches"
- "N° entreprise : BE 0819.776.395"
- Icones réseaux sociaux (Instagram, Facebook) avec liens "#"
- "Tous droits réservés © 2025"

---

## ORGANISATION DES FICHIERS


src/
  routes/
    +page.svelte          ← page principale
    +page.server.ts       ← données mock + action formulaire
  lib/
    components/
      Nav.svelte
      Hero.svelte
      Prestations.svelte
      Telechargements.svelte
      Tonnelle.svelte
      ChambreHote.svelte
      PartenairesLogos.svelte
      Contact.svelte
      Footer.svelte
    styles/
      _variables.scss     ← couleurs, typographie, breakpoints
      _mixins.scss        ← mixins réutilisables
      global.scss         ← reset + styles globaux
  app.html
  app.scss

  ---

## POINTS D'ATTENTION

- Syntaxe **Svelte 5 obligatoire** : $state(), $derived(), $props(), snippets, etc. Aucune syntaxe Svelte 4.
- SCSS avec variables dans `_variables.scss`, importées dans chaque composant via `@use`
- Les composants reçoivent leurs données via `$props()` depuis la page principale qui les reçoit du `load()`
- Lucide : importer uniquement les icones utilisées depuis `lucide-svelte`
- Aucun `console.log` laissé dans le code
- Code propre, commentaires en français uniquement sur les parties non évidentes
- Toutes les images utilisent des chemins `/images/nom-image.jpg` — créer un dossier `static/images/` avec un fichier `README.md` indiquant quelles images sont attendues


## Pour les informations : 

Voici un exemple d'infos :
{
  "infos": {
    "data": {
      "nom": "MJM Sonorisation",
      "pays": "Belgique",
      "wifi": false,
      "email": "yohanmjm@gmail.com",
      "ville": "Ostiches",
      "parking": "",
      "siteWeb": "https://mjmsono.com",
      "wifiNom": "",
      "terrasse": false,
      "telephone": "0475307333",
      "description": "Description",
      "googleMapsUrl": "",
      "googlePlaceId": "",
      "accesHandicape": false,
      "reservationUrl": "",
      "adresseComplete": "Route de Flobecq 337 - 7804 Ostiches",
      "numeroEntreprise": "BE0819776395"
    },
    "updated_at": "2026-04-22T00:39:16.346327+00:00"
  },
  "seo": {
    "data": {
      "locale": "fr_BE",
      "ogImage": "",
      "keywords": [],
      "description": "Description",
      "titleDefault": "MJM Sonorisation SEO Page",
      "twitterHandle": ""
    },
    "updated_at": "2026-04-22T00:43:18.082+00:00"
  },
  "socials": {
    "data": [
      {
        "id": "facebook",
        "url": "https://www.facebook.com/mjmsono/",
        "actif": true,
        "label": "Facebook"
      },
      {
        "id": "instagram",
        "url": "https://www.instagram.com/mjm_sono/",
        "actif": true,
        "label": "Instagram"
      }
    ],
    "updated_at": "2026-04-21T15:31:15.674556+00:00"
  },
  "poles": {
    "data": [
      {
        "cta": {
          "href": "#",
          "label": "En savoir plus"
        },
        "img": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/mjm-sonorisation/library/1776818170171-493490796-3156089371214759-4839774422878469597-n.webp",
        "num": "01",
        "sur": "Nouveau",
        "flip": false,
        "texte": "Texte du pôle",
        "titre": "Pôle",
        "imgAlt": "",
        "layout": "immersive"
      },
      {
        "cta": {
          "href": "#",
          "label": "En savoir plus"
        },
        "img": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/mjm-sonorisation/library/1776818170171-493490796-3156089371214759-4839774422878469597-n.webp",
        "num": "02",
        "sur": "Nouveau",
        "flip": false,
        "texte": "Texte",
        "titre": "Pôle",
        "imgAlt": "",
        "layout": "classic"
      },
      {
        "cta": {
          "href": "#",
          "label": "En savoir plus"
        },
        "img": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/mjm-sonorisation/library/1776818170171-493490796-3156089371214759-4839774422878469597-n.webp",
        "num": "03",
        "sur": "Nouveau",
        "flip": true,
        "texte": "Texte",
        "titre": "Pôle",
        "imgAlt": "",
        "layout": "editorial"
      }
    ],
    "updated_at": "2026-04-22T00:38:48.856981+00:00"
  },
  "hero": {
    "data": {
      "alt": "Description de l'image du hero",
      "image": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/mjm-sonorisation/library/1776818170171-493490796-3156089371214759-4839774422878469597-n.webp"
    },
    "updated_at": "2026-04-22T00:42:06.050756+00:00"
  },
  "galerie": [
    {
      "id": "0205d29e-a0f9-4899-b622-afd8ba13efa0",
      "src": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/mjm-sonorisation/library/1776818459552-dfc71d82a974272e6646ce9af94bdd47-upscayl-3x-realesrgan-x4plu.webp",
      "alt": "Texte abra",
      "label": "Label Abra",
      "tall": true,
      "sort_order": 0
    },
    {
      "id": "ab1bda40-0134-474a-89d1-d7114245ca0d",
      "src": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/mjm-sonorisation/library/1776818170171-493490796-3156089371214759-4839774422878469597-n.webp",
      "alt": "texte deco",
      "label": "Label Deco",
      "tall": false,
      "sort_order": 1
    }
  ],
  "blog": [
    {
      "id": "2ddfbfea-a499-40a4-9129-6c5c6d8212af",
      "title": "Article d'exemple",
      "slug": "article-d-exemple",
      "category": "Actualités",
      "content": "Contenu complet",
      "author": "MJM Sonorisation",
      "date": "2026-04-22",
      "summary": "Résumé",
      "image": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/mjm-sonorisation/library/1776818170171-493490796-3156089371214759-4839774422878469597-n.webp",
      "status": "publie"
    }
  ],
  "partenaires": [
    {
      "id": "01defebf-bb21-4a18-8f87-db1c6d8d7447",
      "name": "Blinkr",
      "url": "https://blinkr.events",
      "logo": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/mjm-sonorisation/library/1776818564039-favicon-1080x1080.webp",
      "sort_order": 0
    }
  ],
  "sono_parametres": {
    "data": {
      "nom": "MJM Sonorisation",
      "email": "yohanmjm@gmail.com",
      "indoor": true,
      "slogan": "L'ambiance, c'est notre métier.",
      "outdoor": true,
      "rayonKm": 80,
      "siteWeb": "https://mjmsono.com",
      "telephone": "0475307333",
      "description": "Avec ou sans musique, nous donnons vie à vos événements en toute simplicité. Besoin d’un espace élégant, pratique et prêt à accueillir vos invités ? Nous nous chargeons du montage et du démontage de votre tonnelle, à l’endroit et au moment qui vous conviennent.\n\nProfessionnalisme, efficacité et tranquillité d’esprit : vous profitez, nous gérons.\n\nFaites de chaque instant un moment sans souci, MJM est là pour vous accompagner.",
      "puissanceMax": 1,
      "anneesExperience": 30,
      "typesPrestations": [
        "Sonorisation",
        "Mariage",
        "Soirées",
        "Portes ouvertes",
        "Fête d'entreprise"
      ],
      "zoneIntervention": "Hainaut , et nord de la France"
    },
    "updated_at": "2026-04-21T20:59:47.915533+00:00"
  },
  "sono_materiel": {
    "data": {
      "note": "",
      "equipements": [],
      "puissanceTotaleW": 0,
      "capaciteMaxPersonnes": 0
    },
    "updated_at": "2026-04-21T20:29:13.1691+00:00"
  },
  "sono_cta": {
    "data": {
      "principal": {
        "label": "Demander votre devis dès aujourd'hui",
        "valeur": "0475307333",
        "methode": "tel"
      },
      "secondaire": {
        "actif": true,
        "label": "Label secondaire",
        "valeur": "adresse@gmail.com",
        "methode": "email"
      }
    },
    "updated_at": "2026-04-22T00:40:47.731944+00:00"
  },
  "sonorisation": {
    "parametres": {
      "nom": "MJM Sonorisation",
      "email": "yohanmjm@gmail.com",
      "indoor": true,
      "slogan": "L'ambiance, c'est notre métier.",
      "outdoor": true,
      "rayonKm": 80,
      "siteWeb": "https://mjmsono.com",
      "telephone": "0475307333",
      "description": "Avec ou sans musique, nous donnons vie à vos événements en toute simplicité. Besoin d’un espace élégant, pratique et prêt à accueillir vos invités ? Nous nous chargeons du montage et du démontage de votre tonnelle, à l’endroit et au moment qui vous conviennent.\n\nProfessionnalisme, efficacité et tranquillité d’esprit : vous profitez, nous gérons.\n\nFaites de chaque instant un moment sans souci, MJM est là pour vous accompagner.",
      "puissanceMax": 1,
      "anneesExperience": 30,
      "typesPrestations": [
        "Sonorisation",
        "Mariage",
        "Soirées",
        "Portes ouvertes",
        "Fête d'entreprise"
      ],
      "zoneIntervention": "Hainaut , et nord de la France"
    },
    "materiel": {
      "note": "",
      "equipements": [],
      "puissanceTotaleW": 0,
      "capaciteMaxPersonnes": 0
    },
    "prestations": [
      {
        "id": "df3ae397-f52e-4961-96f7-5e1a64cba15b",
        "titre": "Titre prestation",
        "description": "Description",
        "icone": "Music",
        "sort_order": 0
      }
    ],
    "cta": {
      "principal": {
        "label": "Demander votre devis dès aujourd'hui",
        "valeur": "0475307333",
        "methode": "tel"
      },
      "secondaire": {
        "actif": true,
        "label": "Label secondaire",
        "valeur": "adresse@gmail.com",
        "methode": "email"
      }
    }
  }
}

Ces informations sont récupérs depuis +page.server.js
Tu peux te baser sur le template cafe-des-delices pour mieux comprendre comment faire