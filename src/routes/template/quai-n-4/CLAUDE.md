# Brief design — Quai n°4

> ⚠️ **Ce prompt est destiné à Claude Code.** Lis-le entièrement avant d'écrire la moindre ligne. Il décrit une mission de design sénior, pas une simple commande de page web.

---

## 0. Posture attendue

**Tu es un designer senior**, pas un assistant qui pisse du Tailwind générique. Tu as un avis. Tu prends des décisions tranchées et tu les assumes. Tu as horreur du "AI aesthetic" — ces dégradés violets bleus, ces gradients néon Stripe-like, ces cards arrondies avec ombre douce, ces hero "Welcome to..." centrés sur fond blanc. **Rien de tout ça.**

### Avant de coder

1. **Invoque le skill `frontend-design`** via l'outil Skill. Il contient les garde-fous pour éviter les réflexes génériques.
2. **Lis ce brief en entier**. Note les références, les ambiances, les anti-patterns. Le brief est dense — ne survole pas.
3. **Pose-toi 30 secondes** : si tu devais expliquer en une phrase ce qui rend ce site différent de 99% des sites de ce type, qu'est-ce que tu dirais ? Si tu ne sais pas, **relis le positionnement** avant de continuer.

### Critères de réussite

- À l'ouverture, on identifie **immédiatement le secteur et la personnalité** du client. Pas un site interchangeable.
- La typographie, la palette et au moins **un détail signature** sont reconnaissables si on prenait un screenshot recadré sans logo.
- Aucune section ne donne l'impression d'avoir été "remplie" — chaque section a une raison d'exister et une mise en page distincte.
- **Si un visiteur scrolle, il scrolle parce que c'est intéressant**, pas par obligation. Rythme, surprise, respiration.

---

## 1. Architecture (RÈGLES ABSOLUES)

Identiques au CLAUDE.md parent ([../CLAUDE.md](../CLAUDE.md)) :

- **Aucun import `$lib`** du projet kltk principal.
- **Aucun style global kltk** (`main.scss`, `_colors.scss`, etc.).
- Composants locaux dans `./lib/` — imports relatifs uniquement.
- Tokens & mixins SCSS locaux dans `./lib/styles/` :
  - `_tokens.scss` : variables CSS (couleurs, typo, espacement, layout)
  - `_mixins.scss` : breakpoints + utilitaires (clamp-lines, etc.)
- Usage : `@use './styles/mixins' as *;` puis `@include breakpoint('large') { ... }`
- **Mobile-first** systématique.
- **Pas d'images locales** : URLs Unsplash + commentaire `// PLACEHOLDER → ...` à côté de chaque image pour signaler au client où intervenir.
- Fonts via Google Fonts dans `<svelte:head>` du layout local.
- Libs externes OK si déjà dans `package.json` (GSAP, Embla, Tippy disponibles).
- **SvelteKit 5 runes** (`$state`, `$derived`, `$effect`, `$props`) — jamais l'API Svelte 4.

---

## 2. Données — schéma dynamique

⚠️ **Le schéma de données est dynamique et provient de l'API KLTK Studio en production.** Les composants doivent être pensés pour consommer cette forme telle quelle, pas pour des données statiques inventées.

**Endpoint API** : `GET https://admin.kltk.be/api/quai-n-4/[section]`
**Header** : `Authorization: Bearer <api_key>` (clé stockée côté serveur du site client, jamais exposée au browser)

### Pour la démo

Utilise des **données statiques inline** dans `+page.server.js`, calquées **strictement** sur le schéma fourni en annexe (§ 9). La forme attendue par les composants matche déjà le schéma API → swap trivial vers l'API live.

### Switch vers API live

Remplace le contenu de `+page.server.js` par :
```js
const res = await fetch(`https://admin.kltk.be/api/quai-n-4/all`, {
  headers: { Authorization: `Bearer ${env.QUAI_N_4_KEY}` }
});
const data = await res.json();
```
Variable d'env attendue : `QUAI_N_4_KEY=kltk_...`

---

## 3. Client — Quai n°4

- **Nom officiel** : Quai n°4
- **Type** : restaurant
- **Slug API** : `quai-n-4`
- **Téléphone** : +32 68 30 02 97


---

## 4. Positionnement & enjeu narratif

### Qui est ce client ?

Le repère étoilé d’un binôme renommé et d’une équipe dynamique pour une expérience culinaire inoubliable.

Au Quai n°4, chaque repas devient une parenthèse enchantée qu’orchestrent les jeunes chefs-propriétaires, Maxence Bouralha et Charles-Maxime Legrand.

### Public cible

Tout ceux qui aiment bien mangé, pour pas cher (pour un restaurant étoilé, y a plus cher) et qui aime les produits locaux. De 25 à 80 ans



### Mots-clés d'ambiance

**luxe, précieux, raffiné, chaleureux, authentique, audacieux, végétal, percutant**

→ Ces mots ne sont **pas** des décorations. Chaque choix typographique, chromatique, de mise en page doit pouvoir se justifier par un de ces mots. Si une section ne renforce aucun de ces mots-clés, **elle est mal conçue**.

### Tonalité de copie

**Lyrique & poétique** — images, métaphores, italiques

Quand tu écris du texte de remplissage (titres, accroches, descriptions de plats, slogans), respecte cette tonalité. Pas de lorem ipsum. Du vrai contenu plausible, écrit dans le ton.

---

## 5. Charte appliquée

### 5.1 Palette

- **Direction générale** : Beige / Émeraude / Or — référence colorimétrique : #f5f0e6 / #0f4d3a / #b8945a

> Si la palette comporte des noms en clair (ex: "émeraude profond"), interprète-les comme **directions** : choisis les hex qui rendent l'ambiance demandée. Ne te contente pas du premier "vert" venu — un émeraude n'est pas un vert d'eau.

### 5.2 Typographie

- **Display** (titres, héros, accroches) : **Cormorant Garamond** — élégance fine, italic
- **Sans** (UI, corps de texte, navigation) : **Satoshi** — clean, polyvalent
- **Mono** (eyebrows en capitales, prix, métadonnées techniques) : **Fira Mono** — classique dev

> N'utilise pas le display partout — c'est ce qui tue les designs. Le display porte les **moments** (hero, titres de section, chiffres clés). Le sans tient le rythme. Le mono ponctue.

### 5.3 Détails signature à intégrer

- **Couches parallax** — profondeur au scroll
- **Collage d'images asymétrique** — grille libre, tailles variables
- **Texture grain / noise** — sur fonds plats pour adoucir
- **Numéros de section géants** — 01, 02, 03 énormes, partie de la mise en page
- **Marqueur étoile / pictogramme** — ✦ ✺ ★ comme signature récurrente

> Les détails signature sont le **vocabulaire visuel** du site. Ils doivent apparaître plusieurs fois, à différentes échelles, pour créer une cohérence. Un seul détail utilisé une fois = gadget. Le même détail décliné 4-5 fois = identité.

### 5.4 Layout & rythme

- **Direction layout** : **Grille brisée** — éléments qui dépassent, chevauchements
- **Animations** : **Théâtrales** — séquences scénarisées, hero animé

> Pense le scroll comme une **dramaturgie**. Alternance de respirations et de moments denses. Pas 8 sections du même rythme à la suite. Casse, surprends, reprends.

---

## 6. Sections à livrer (homepage)

01. **`infos`** → composant `Infos.svelte`
02. **`horaires`** → composant `Horaires.svelte`
03. **`alerte`** → composant `Alerte.svelte`
04. **`cta`** → composant `Cta.svelte`
05. **`socials`** → composant `Socials.svelte`
06. **`avis`** → composant `Avis.svelte`
07. **`poles`** → composant `Poles.svelte`
08. **`hero`** → composant `Hero.svelte`
09. **`carte`** → composant `Carte.svelte`
10. **`menus`** → composant `Menus.svelte`
11. **`galerie`** → composant `Galerie.svelte`
12. **`evenements`** → composant `Evenements.svelte`
13. **`actualites`** → composant `Actualites.svelte`
14. **`partenaires`** → composant `Partenaires.svelte`

> Chaque section a sa propre identité de mise en page. **Pas de pattern qui se répète bêtement.** Une section "événements" en cards horizontales et une section "actualités" en cards horizontales = échec. Trouve un angle différent à chaque fois (timeline, masonry, asymétrique, plein écran, etc.).

---

## 7. Anti-patterns — ne PAS faire

### Génériques (toujours)

- Pas de multilingue (FR uniquement).
- Pas de backend / formulaire fonctionnel — c'est une démo.
- Pas d'images locales (URLs Unsplash + `// PLACEHOLDER → ...`).
- Pas d'import `$lib` du projet kltk.
- Pas d'emoji dans le contenu final.
- Pas de lorem ipsum — du vrai texte plausible.
- Pas de "AI aesthetic" : pas de gradient violet/bleu Stripe-like, pas de cards arrondies + shadow douce + icône Lucide générique, pas de hero centré "Welcome to {Brand}", pas d'icônes de feature en grille 3 colonnes avec des trois lignes de texte sous chacune.
- Pas de `box-shadow` Tailwind par défaut sur tout. Les ombres soit portent un sens, soit n'existent pas.

### Spécifiques au brief

*(rien de spécifique — applique la rigueur générique)*

---

## 8. Méthode de travail attendue

1. Crée d'abord `./lib/styles/_tokens.scss` avec **toute** la palette, la typo, les espacements. Tout le reste consomme ces tokens.
2. Code les composants section par section. Termine **complètement** une section (HTML + style + données mock dans `+page.server.js`) avant de passer à la suivante.
3. Pour chaque section, demande-toi : *quelle est l'idée visuelle de cette section ? Si je devais la décrire à un autre designer en une phrase, quoi ?* Si tu ne sais pas, retravaille.
4. À la fin, scroll la page entière et vérifie : **est-ce que ça raconte quelque chose ? Est-ce que c'est cohérent ? Est-ce que je me souviendrais de ce site dans 1 mois ?**

---

## 9. Annexe — Schéma de données complet

⚠️ **Forme exacte attendue par les composants.** Calque les données mock de `+page.server.js` strictement sur cette structure (mêmes clés, mêmes types). Les valeurs en `https://example.com/...` sont des placeholders à remplacer par des URLs Unsplash + commentaire.

Notes :
- `poles[].layout` peut valoir `immersive`, `classic` ou `editorial` — les variantes doivent être supportées.
- `plat_du_jour.type` peut valoir `text` ou `image`.
- `cta.reservation.methode` peut valoir `url`, `tel` ou `email`.
- Les sections suffixées `custom:xxx` ont une forme libre.

```json
{
  "infos": {
    "data": {
      "nom": "Quai n°4",
      "ville": "Ath",
      "pays": "Belgique",
      "adresseComplete": "Quai Saint-Jacques 4, 7800 Ath",
      "email": "",
      "telephone": "+32 68 30 02 97",
      "siteWeb": "https://www.quai-n4.be",
      "reservationUrl": "",
      "googlePlaceId": "",
      "googleMapsUrl": "",
      "description": "Restaurant gastronomique étoilé au Guide Michelin, situé au cœur d'Ath. Fondé par les chefs Maxence Bouralha et Charles-Maxime Legrand, le Quai n°4 propose une cuisine alliant classicisme et créativité, sublimée par des sauces subtiles et des desserts d'une grande finesse technique. Distingué Découverte de l'année en Wallonie par Gault&Millau en 2021, le restaurant a décroché son étoile Michelin en 2022.",
      "numeroEntreprise": "",
      "parking": "",
      "wifiNom": "",
      "wifi": true,
      "terrasse": false,
      "accesHandicape": true
    },
    "updated_at": "2026-05-02T16:33:12.671266+00:00"
  },
  "horaires": {
    "data": [
      {
        "j": "Lundi",
        "ferme": true,
        "periodes": []
      },
      {
        "j": "Mardi",
        "ferme": true,
        "periodes": []
      },
      {
        "j": "Mercredi",
        "ferme": false,
        "periodes": [
          {
            "fin": "14:00",
            "debut": "12:00"
          },
          {
            "fin": "21:30",
            "debut": "19:00"
          }
        ]
      },
      {
        "j": "Jeudi",
        "ferme": false,
        "periodes": [
          {
            "fin": "14:00",
            "debut": "12:00"
          },
          {
            "fin": "21:30",
            "debut": "19:00"
          }
        ]
      },
      {
        "j": "Vendredi",
        "ferme": false,
        "periodes": [
          {
            "fin": "14:00",
            "debut": "12:00"
          },
          {
            "fin": "21:30",
            "debut": "19:00"
          }
        ]
      },
      {
        "j": "Samedi",
        "ferme": false,
        "periodes": [
          {
            "fin": "14:00",
            "debut": "12:00"
          },
          {
            "fin": "21:30",
            "debut": "19:00"
          }
        ]
      },
      {
        "j": "Dimanche",
        "ferme": true,
        "periodes": []
      }
    ],
    "updated_at": "2026-05-02T16:26:08.031+00:00"
  },
  "alerte": {
    "data": {
      "alerteOuverture": {
        "actif": false,
        "message": "Fermé du 15 au 22 août — bonnes vacances !"
      },
      "fermetures": [
        {
          "date": "2026-12-25",
          "motif": "Noël"
        },
        {
          "date": "2026-01-01",
          "motif": "Nouvel An"
        }
      ]
    }
  },
  "cta": {
    "data": {
      "reservation": {
        "label": "Réserver une table",
        "methode": "url",
        "url": "https://www.thefork.be/restaurant/example"
      },
      "commande": {
        "actif": false,
        "label": "Commander en ligne",
        "url": ""
      }
    }
  },
  "socials": {
    "data": [
      {
        "id": "facebook",
        "url": "https://google.com",
        "actif": true,
        "label": "Facebook"
      }
    ],
    "updated_at": "2026-05-02T16:35:27.943+00:00"
  },
  "avis": {
    "data": {
      "avis": [
        {
          "auteur": "Sophie Dupont",
          "note": 5,
          "texte": "Un vrai coup de cœur. Tagliata parfaitement cuite, terrasse magnifique.",
          "date": "2026-03-18",
          "photo": "https://lh3.googleusercontent.com/a/default-user=s40-c"
        },
        {
          "auteur": "Marc Leroy",
          "note": 4,
          "texte": "Excellente sélection de bières belges, service attentionné.",
          "date": "2026-03-02",
          "photo": "https://lh3.googleusercontent.com/a/default-user=s40-c"
        }
      ],
      "avisMinStars": {
        "value": 4
      }
    }
  },
  "poles": {
    "data": [
      {
        "cta": {
          "href": "https://www.quai-n4.be/menus",
          "label": "Découvrir notre carte"
        },
        "img": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/quai-n-4/library/1777739643268-vvnhmb0.webp",
        "num": "01",
        "sur": "Notre philosophie",
        "flip": false,
        "texte": "Au Quai n°4, la cuisine est un dialogue entre la tradition et l'audace. Maxence Bouralha et Charles-Maxime Legrand composent des assiettes où chaque produit est choisi avec soin auprès de producteurs locaux belges. Leur approche, alliant classicisme et créativité, leur a valu une étoile au Guide Michelin en 2022. Chaque service est une expérience sensorielle unique, pensée dans les moindres détails.",
        "titre": "Cuisine gastronomique",
        "imgAlt": "",
        "layout": "classic"
      },
      {
        "cta": {
          "href": "Événements privés & réservations",
          "label": "Expérience unique"
        },
        "img": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/quai-n-4/library/1777739643268-vvnhmb0.webp",
        "num": "02",
        "sur": "Expérience unique",
        "flip": false,
        "texte": "Le Quai n°4 ouvre ses portes à vos événements les plus précieux : dîners d'entreprise, anniversaires gastronomiques, célébrations intimes. Notre espace privatisable accueille jusqu'à 30 convives dans un cadre élégant. Une équipe dédiée conçoit des menus sur mesure et des accords vins exclusifs. Contactez-nous pour créer ensemble une expérience inoubliable.",
        "titre": "Réservations & événements privés",
        "imgAlt": "",
        "layout": "classic"
      }
    ],
    "updated_at": "2026-05-02T16:34:18.310582+00:00"
  },
  "hero": {
    "data": {
      "alt": "description alt",
      "image": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/quai-n-4/library/1777739643268-vvnhmb0.webp"
    },
    "updated_at": "2026-05-02T16:34:53.188+00:00"
  },
  "carte": {
    "categories": [
      {
        "id": "cat-uuid-1",
        "name": "Entrées",
        "note": null,
        "sort_order": 0,
        "items": [
          {
            "name": "Croquettes au fromage maison",
            "price": "15,00",
            "description": "Ferme de Thoricourt"
          },
          {
            "name": "Carpaccio de bœuf Holstein fumé",
            "price": "19,50",
            "description": ""
          }
        ],
        "subcategories": []
      },
      {
        "id": "cat-uuid-2",
        "name": "Plats",
        "note": "Accompagnements au choix",
        "sort_order": 1,
        "items": [
          {
            "name": "Carbonnade athoise maison",
            "price": "19,90",
            "description": ""
          },
          {
            "name": "Tagliata de bœuf",
            "price": "26,50",
            "description": "Façon carpaccio"
          }
        ],
        "subcategories": [
          {
            "name": "Burgers",
            "sort_order": 0,
            "items": [
              {
                "name": "Le Délice",
                "price": "19,90",
                "description": "Beef maison 220g, sauce Giant"
              }
            ]
          }
        ]
      }
    ]
  },
  "menus": [
    {
      "id": "menu-uuid-1",
      "name": "Menu Délices",
      "price": "40",
      "data": {
        "sections": [
          {
            "titre": "Entrée",
            "choix": "Croquettes - ou - Scampis à l'ail"
          },
          {
            "titre": "Plat",
            "choix": "Burger - ou - Boulettes - ou - Carbonnade"
          },
          {
            "titre": "Dessert",
            "choix": "Dame Blanche - ou - Dame Noire"
          }
        ]
      }
    }
  ],
  "galerie": [
    {
      "id": "cfea152c-a02f-40c0-8c10-44095cffe761",
      "src": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/quai-n-4/library/1777739643268-vvnhmb0.webp",
      "alt": "",
      "label": "",
      "tall": false,
      "sort_order": 0
    }
  ],
  "evenements": [
    {
      "id": "3edd0565-1c7f-4b27-8255-934854a7b28b",
      "title": "Masterclass « Les secrets du bouillon »",
      "date": "2026-06-21",
      "description": "Charles-Maxime Legrand ouvre les coulisses du Quai n°4 le temps d'une masterclass unique. En 3 heures, il vous dévoile l'art du bouillon parfait : sélection des os, cuisson lente à juste température, clarification et assaisonnement. Une technique fondamentale de la haute cuisine française que vous pourrez reproduire chez vous. Session limitée à 8 participants. Matériaux et dégustation inclus.",
      "active": true,
      "image": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/quai-n-4/library/1777739643268-vvnhmb0.webp"
    },
    {
      "id": "267ec273-ebcc-4c80-8c89-eb545d229666",
      "title": "Dîner de la Saint-Valentin — Édition 2027",
      "date": "2027-02-14",
      "description": "Pour la Saint-Valentin 2027, le Quai n°4 vous propose une soirée gastronomique exceptionnelle à deux couverts. Un menu 6 services conçu par Maxence Bouralha, avec accord de vins au champagne et aux grands crus de Bourgogne sélectionnés par notre sommelier. La salle sera décorée avec des fleurs fraîches du marché d'Ath et une ambiance musicale live. Places très limitées — réservation indispensable avant le 1er février 2027.",
      "active": true,
      "image": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/quai-n-4/library/1777739643268-vvnhmb0.webp"
    }
  ],
  "actualites": [
    {
      "id": "news-uuid-1",
      "title": "Nouvelle carte d'été",
      "date": "2026-04-10",
      "summary": "Nouvelles grillades et salades fraîches pour la belle saison.",
      "content": "Avec l'arrivée des beaux jours, notre chef a composé une nouvelle carte.",
      "image": "https://example.com/storage/news/carte-ete.jpg",
      "active": true
    }
  ],
  "partenaires": [
    {
      "id": "1ee7db48-8689-47ac-9858-00099ffda2d3",
      "name": "Partenaire",
      "url": "https://google.com",
      "logo": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/quai-n-4/library/1777739643268-vvnhmb0.webp",
      "sort_order": 0
    }
  ]
}
```

---

**Maintenant : invoque `frontend-design`, relis le § 0, et code.**
