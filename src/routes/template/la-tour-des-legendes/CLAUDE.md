# Brief design — La Tour des Légendes

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
- **Effet wow obligatoire.** Au moins **un moment** dans le site doit faire dire "ah ouais, ok" au visiteur — un hero qui sort de l'ordinaire, une transition de scroll travaillée, un détail interactif inattendu, une mise en page qui casse les codes du secteur. Pas de wow = brief raté. Le wow ne se décrète pas dans une bannière "✨ Innovation ✨", il se vit dans une interaction, un mouvement, un cadrage, un contraste.

---

## 0bis. OSER — sortir du moule "Claude Code par défaut"

⚠️ **Lecture critique.** Même avec le skill `frontend-design` activé, tes réflexes par défaut produisent des sites qui se ressemblent tous : hero centré ou split 50/50, sections empilées en pleine largeur avec titre + sous-titre + grille de 3 cards, footer 4 colonnes, palette sage, typo Inter ou Manrope, animations `fade-in-up` au scroll. **C'est ça, le piège.** Si tu sors un site qui rentre dans ce moule, le brief est raté — quelle que soit la qualité d'exécution.

### Ce qu'on attend

- **Ose des partis-pris forts.** Une typo display énorme qui déborde. Un layout asymétrique qui semble "presque cassé" mais tient. Un hero qui n'est pas un hero. Une nav qui n'est pas en haut. Un fond qui n'est pas blanc/crème par défaut. Un détail signature qui revient comme un motif obsédant.
- **Inspire-toi de sites de designers, pas de templates SaaS.** Pense Awwwards, Siteinspire, Godly, Httpster, sites de studios indépendants, sites éditoriaux (magazines), sites de marques de mode/restos étoilés/galeries d'art. **Pas** Stripe, Linear, Vercel, Notion, Framer templates.
- **Casse au moins une convention par site.** Exemples concrets : footer en haut, sommaire latéral collant, scroll horizontal sur une section, section qui prend 200vh, texte qui se lit en diagonale, image qui sort de sa grille, typo qui se mélange à l'image, curseur custom, transition de page travaillée, marquee texte, numérotation visible des sections, grain/texture de fond, photo détourée qui dépasse d'un bloc.
- **Le "safe choice" est interdit** quand un choix plus audacieux sert l'ambiance. Si tu hésites entre deux options et que l'une est plus risquée mais cohérente avec le brief — prends la risquée.

### Test du moule

Avant de livrer, regarde la page d'accueil et demande-toi :

1. Est-ce que ça ressemble à un site Framer/Webflow template gratuit ? Si oui, **recommence**.
2. Est-ce que je pourrais swap le logo et le contenu pour un autre client du même secteur sans rien changer d'autre ? Si oui, **recommence**.
3. Est-ce qu'il y a **au moins une chose** que je n'ai jamais vue ailleurs (ou rarement) ? Si non, **ajoute-la**.

### Garde-fous (oser ≠ illisible)

Oser **n'est pas** : sacrifier la lisibilité, casser la nav mobile, foutre 12 polices différentes, mettre du contraste fluo qui crame les yeux, faire du parallax pour faire du parallax. Oser sert toujours **le ton et le client**. Un resto étoilé n'ose pas comme un skatepark — mais les deux **doivent** oser.

> En une phrase : **un site mémorable a forcément quelque chose qui dérange un peu au premier regard, et qu'on apprécie au deuxième.** Si tout est confortable du premier coup, c'est trop lisse.

---

## 1. Architecture (RÈGLES ABSOLUES)

- **SvelteKit 5 runes** (`$state`, `$derived`, `$effect`, `$props`) — jamais l'API Svelte 4.
- **SCSS UNIQUEMENT.** Tous les styles dans des blocs `<style lang="scss">`. **Aucun Tailwind, aucun CSS-in-JS, aucun framework utilitaire.** Pas de classes utility-first. Tu écris du SCSS structuré, point.
- **Composants locaux dans `./lib/`** — imports relatifs uniquement (`import Nav from './lib/Nav.svelte'`). **Jamais d'import `$lib`** d'un projet externe.
- **Tokens & mixins SCSS locaux** dans `./lib/styles/` :
  - `_tokens.scss` : variables CSS (couleurs, typo, espacement, layout)
  - `_mixins.scss` : breakpoints (xsmall → xxlarge) + utilitaires (clamp-lines, etc.)
- Usage dans chaque composant :

```svelte
<style lang="scss">
  @use './styles/mixins' as *;
  .el {
    padding: 1rem;
    @include breakpoint('medium') { padding: 2rem; }
  }
</style>
```

- **Mobile-first** systématique. `@include breakpoint('medium') { ... }` pour passer desktop.
- **Pas d'images locales** : URLs Unsplash (`https://images.unsplash.com/...`) + commentaire `// PLACEHOLDER → ...` à côté de chaque image.
- Fonts via Google Fonts dans `<svelte:head>` du layout local.
- Libs externes OK si déjà dans `package.json` (GSAP, Embla, Tippy).
- **Pages multiples encouragées** : `+page.svelte` (accueil), `menu/+page.svelte`, `reservation/+page.svelte`, etc. Partage Nav + Footer via un `+layout.svelte` local.
- **Pas de `data.js` statique pour le contenu** — tout passe par l'API KLTK (§ 2). Skeleton loader pendant le fetch.

---

## 2. Données — API KLTK Studio (LIVE dès le départ)

⚠️ **Le site se connecte directement à l'API KLTK Studio.** Pas de données mock, pas de `data.js`. Toutes les pages chargent leurs données via `+page.server.js` → composant `<Skeleton />` pendant le fetch.

### Endpoint

```
GET {API_URL}/la-tour-des-legendes?sections=section1,section2,...
```

**Headers requis** :
- `Authorization: Bearer <api_key>`
- `x-cf-secret: <cf_secret>`

Sections actives pour cette org : `infos, horaires, alerte, seo, cta, socials, avis, poles, hero, carte, menus, galerie, evenements, actualites, blog, partenaires`

Tu peux demander plusieurs sections en une seule requête (préféré) via `?sections=infos,horaires,blog`. Forme exacte de la réponse → § 9 (annexe schéma).

### Pattern `+page.server.js` (à reproduire à l'identique)

```js
import { LA_TOUR_DES_LEGENDES_KEY, CF_SECRET, API_URL } from '$env/static/private';
const ORG_SLUG = 'la-tour-des-legendes';

export const load = async () => {
  const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=infos,horaires,poles`, {
    headers: { Authorization: `Bearer ${LA_TOUR_DES_LEGENDES_KEY}`, 'x-cf-secret': CF_SECRET }
  });
  if (!res.ok) return { infos: null, horaires: null, poles: null };
  const data = await res.json();
  return {
    infos: data.infos?.data ?? data.infos ?? null,
    horaires: data.horaires?.data ?? data.horaires ?? null,
    poles: Array.isArray(data.poles) ? data.poles : null
  };
};
```

**Règles de unwrap** :
- Sections `content_blocks` (jsonb wrapper) : `data.<section>?.data ?? data.<section> ?? null`
- Tables structurées (`blog`, `poles`, `events`, `gallery`, `menu_items`, `team`...) : `Array.isArray(data.<section>) ? data.<section> : null`

### Côté composant

Affiche `<Skeleton />` tant que la donnée est `null`. **Jamais de fetch côté browser** — toujours `+page.server.js`. La clé API ne doit **jamais** atteindre le client.

---

## 3. Client — La Tour des Légendes

- **Nom officiel** : La Tour des Légendes
- **Type** : restaurant
- **Slug API** : `la-tour-des-legendes`


---

## 4. Positionnement & enjeu narratif

### Qui est ce client ?

Aux origines, l’envie de créer un lieu qui rassemble folklore et produits du terroir, pour ensuite se concrétiser en une synergie entre trois institutions locales et prêtes à relever un défi de taille…
Celui d’inaugurer la Tour des Légendes.  
D’un côté, une brasserie moderne et axée sur les produits locaux, et ceux de la Brasserie des Légendes et de la Distillerie de Biercée. 
De l’autre, la Maison des Géants, plus flamboyante que jamais, un musée où chaque détail de l’histoire de notre folklore vibre dans chacune des pièces. 
Bienvenue à la Tour des Légendes !

### Public cible

A partir de 25 - 30 ans. Public plutôt régionnaux, fidèle au folklore...

### Mots-clés d'ambiance

**luxe, moderne, culturel, urbain, audacieux, précieux, familial, authentique**

→ Ces mots ne sont **pas** des décorations. Chaque choix typographique, chromatique, de mise en page doit pouvoir se justifier par un de ces mots. Si une section ne renforce aucun de ces mots-clés, **elle est mal conçue**.

### Tonalité de copie

**Sobre & informatif** — phrases courtes, factuel

Quand tu écris du texte de remplissage (titres, accroches, descriptions de plats, slogans), respecte cette tonalité. Pas de lorem ipsum. Du vrai contenu plausible, écrit dans le ton.

---

## 5. Charte appliquée

### 5.1 Palette

- **Base** (fonds, surfaces dominantes) : F4F4F6
- **Contraste** (texte, blocs denses) : noir goudron
- **Accent principal** (CTA, chiffres-clés, signatures) : AD6BB2
- **Accent secondaire** (variations, états) : FFD447

> Si la palette comporte des noms en clair (ex: "émeraude profond"), interprète-les comme **directions** : choisis les hex qui rendent l'ambiance demandée. Ne te contente pas du premier "vert" venu — un émeraude n'est pas un vert d'eau.

### 5.2 Typographie

- **Display** (titres, héros, accroches) : **Playfair Display** — classique éditorial
- **Sans** (UI, corps de texte, navigation) : **Work Sans** — humaniste neutre
- **Mono** (eyebrows en capitales, prix, métadonnées techniques) : **Fira Mono** — classique dev

> N'utilise pas le display partout — c'est ce qui tue les designs. Le display porte les **moments** (hero, titres de section, chiffres clés). Le sans tient le rythme. Le mono ponctue.

### 5.3 Détails signature à intégrer

- **Courbe SVG signature** — forme organique récurrente
- **Hero split-screen typographique** — titre coupé en 2 colonnes
- **Lettrines (drop caps)** — première lettre énorme dans bloc texte
- **Numéros de section géants** — 01, 02, 03 énormes, partie de la mise en page
- **Hairlines pointillés** — séparateurs style menu papier
- **Marqueur étoile / pictogramme** — ✦ ✺ ★ comme signature récurrente
- **Badges/stickers circulaires** — pastilles "depuis 1987", "fait maison"
- **Couches parallax** — profondeur au scroll
- **Texture grain / noise** — sur fonds plats pour adoucir

> Les détails signature sont le **vocabulaire visuel** du site. Ils doivent apparaître plusieurs fois, à différentes échelles, pour créer une cohérence. Un seul détail utilisé une fois = gadget. Le même détail décliné 4-5 fois = identité.

### 5.4 Layout & rythme

- **Direction layout** : **Asymétrique audacieux** — grilles cassées, débord, tension visuelle
- **Animations** : **Marquées** — parallax, GSAP reveal, slide horizontaux

> Pense le scroll comme une **dramaturgie**. Alternance de respirations et de moments denses. Pas 8 sections du même rythme à la suite. Casse, surprends, reprends.

---

## 6. Sections & pages à livrer

### 6.1 Homepage — sections actives

01. **`infos`** → composant `Infos.svelte`
02. **`horaires`** → composant `Horaires.svelte`
03. **`alerte`** → composant `Alerte.svelte`
04. **`seo`** → composant `Seo.svelte`
05. **`cta`** → composant `Cta.svelte`
06. **`socials`** → composant `Socials.svelte`
07. **`avis`** → composant `Avis.svelte`
08. **`poles`** → composant `Poles.svelte`
09. **`hero`** → composant `Hero.svelte`
10. **`carte`** → composant `Carte.svelte`
11. **`menus`** → composant `Menus.svelte`
12. **`galerie`** → composant `Galerie.svelte`
13. **`evenements`** → composant `Evenements.svelte`
14. **`actualites`** → composant `Actualites.svelte`
15. **`blog`** → composant `Blog.svelte`
16. **`partenaires`** → composant `Partenaires.svelte`

> Chaque section a sa propre identité de mise en page. **Pas de pattern qui se répète bêtement.** Une section "événements" en cards horizontales et une section "actualités" en cards horizontales = échec. Trouve un angle différent à chaque fois (timeline, masonry, asymétrique, plein écran, etc.).

### 6.2 Pages secondaires — à créer si pertinent

La homepage **ne suffit pas**. Selon les sections actives ci-dessus, crée les pages dédiées correspondantes via `+layout.svelte` partagé (Nav + Footer) :

- **`contact/+page.svelte`** — page contact avec formulaire (nom, email, message + champs métier pertinents). Le form est visuel uniquement (pas de backend), mais doit être **soigné** : états focus, validation visuelle, message de confirmation simulé. Inclut aussi infos pratiques (adresse, téléphone, horaires, carte) en parallèle du formulaire.
- **`galerie/+page.svelte`** — si `galerie` est active, page dédiée plein écran avec lightbox/modal au clic, navigation clavier, filtres si tags, masonry ou grille asymétrique. La preview homepage ne montre que 6-9 images, la page complète montre tout.
- **`blog/+page.svelte` + `blog/[slug]/+page.svelte`** — si `blog` est actif. Liste typographique soignée + page article avec mise en page longue (lecture confortable, max-width contenu, grosse image hero, métadonnées auteur/date).
- **`carte/+page.svelte`** ou **`menu/+page.svelte`** — si module restaurant. Carte complète, mise en page éditoriale (pas un tableau Excel). La homepage teasera, cette page développera.
- **`evenements/+page.svelte` + `evenements/[slug]/+page.svelte`** — si actif. Liste + détail.
- **`equipe/+page.svelte`** — si actif. Présentation par membre, photos travaillées.
- **`about/+page.svelte`** (ou `histoire/`, `a-propos/` selon ton) — **toujours créée**. Page narrative qui raconte le client : origine, valeurs, équipe, lieu, philosophie. Si la donnée API ne suffit pas, **invente du contenu plausible et cohérent** avec le positionnement (§4) et la tonalité (§4) — ce sont des placeholders éditoriaux que le client réécrira. Mise en page longue, éditoriale, mêlant texte et images. Pas une fiche Wikipédia.
- **`reservation/+page.svelte`** ou **`rdv/+page.svelte`** — si module CTA/restaurant/coiffure. Page de prise de contact dédiée.
- **`mentions-legales/+page.svelte`** — page sobre, typographie pure, obligatoire.
- **`404` (`+error.svelte`)** — page d'erreur custom **dans le ton du site**. Pas la 404 par défaut. Une vraie page, avec personnalité.

> **Règle** : si une section homepage est un teaser (galerie 9 images, blog 3 articles, événements 3 prochains), il **doit** y avoir une page dédiée pour aller plus loin. Sinon le bouton "Tout voir" mène à un cul-de-sac.

### 6.3 Layout global

- `+layout.svelte` à la racine : Nav (sticky ou non selon ambiance), Footer, transitions de page si pertinent (`transition:fade` doux, ou plus si ça sert le ton).
- Nav : doit refléter l'identité (pas une nav bootstrap horizontale plate). Hamburger mobile soigné.
- Footer : pas un dépotoir de liens. Hiérarchie claire, infos légales, socials, copyright, signature `Site par KLTK Studio — kltk.be` discrète.

---

## 6.4 Exigences transverses (toutes les pages)

### Responsive
- **Mobile-first strict.** Tu codes le mobile d'abord, tu `@include breakpoint('medium')` pour passer desktop.
- Tester mentalement aux breakpoints : `xsmall` (320), `small` (480), `medium` (768), `large` (1024), `xlarge` (1280), `xxlarge` (1536).
- Pas de scroll horizontal involontaire. Pas de texte qui sort de son conteneur. Pas de bouton inatteignable au pouce.

### Accessibilité
- Contrastes **AA minimum** (4.5:1 corps de texte). Si la palette ne le permet pas, ajuste les hex.
- États `:focus-visible` **toujours** stylés (pas `outline: none` sec). Outline visible et dans le ton.
- HTML sémantique : `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`. `<button>` pour les actions, `<a>` pour la navigation. Jamais l'inverse.
- `alt` descriptif sur chaque image (pas `alt=""` partout).
- Navigation clavier complète : Tab, Enter, Escape (modales/lightbox).
- `prefers-reduced-motion` respecté : si l'utilisateur le demande, désactive les animations lourdes.

### Performance
- Images Unsplash avec paramètres de taille (`?w=1200&auto=format&q=80`). Pas de 5000px de large pour une vignette.
- `loading="lazy"` sur les images sous la ligne de flottaison.
- Pas de JS bloquant inutile. Animations en CSS quand possible, GSAP/Embla seulement si ça apporte vraiment.
- LCP < 2.5s en cible. Hero pas surchargé.

### SEO & métadonnées
- `<svelte:head>` sur chaque page : `<title>`, `<meta name="description">`, `<meta property="og:*">`, `<meta name="twitter:*">`.
- Title format : `{Page} — {Nom org}`.
- Favicon + apple-touch-icon (URL placeholder OK).
- `lang="fr"` sur `<html>`.
- **Schema.org JSON-LD** sur chaque page pertinente, injecté dans `<svelte:head>` via `{@html '<script type="application/ld+json">' + JSON.stringify(jsonLd) + '<\/script>'}`. Type adapté au secteur :
  - Restaurant → `Restaurant` (name, address, telephone, servesCuisine, priceRange, openingHoursSpecification, menu).
  - Salon/coiffure → `HairSalon` ou `BeautySalon`.
  - Hôtel → `LodgingBusiness`.
  - Page article blog → `Article` ou `BlogPosting` (headline, author, datePublished, image).
  - Événement → `Event` (name, startDate, location).
  - Sinon `LocalBusiness` générique.
  - Si la section `schema_org` est dans l'API, consomme ses valeurs (cuisines, fourchette prix, moyens de paiement, etc.). Sinon, dérive du reste du contenu.

### Micro-interactions
- Hover travaillé sur tous les éléments cliquables (pas juste `opacity: 0.8`). Transition `200-400ms` cohérente.
- States: default / hover / focus / active / disabled — tous pensés.
- Curseur custom si ça sert l'ambiance (pas systématique).
- Feedback visuel sur les actions (form submit, copie d'un email, ouverture modale).

### Loading states
- Skeleton **dans le ton du site** (pas un bloc gris générique). Forme et rythme du contenu réel.
- Pas de spinner par défaut. Si transition < 300ms, ne montre rien.

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
2. Code les composants section par section. Termine **complètement** une section (HTML + style + chargement de données via `+page.server.js`) avant de passer à la suivante.
3. Pour chaque section, demande-toi : *quelle est l'idée visuelle de cette section ? Si je devais la décrire à un autre designer en une phrase, quoi ?* Si tu ne sais pas, retravaille.
4. À la fin, scroll la page entière et vérifie : **est-ce que ça raconte quelque chose ? Est-ce que c'est cohérent ? Est-ce que je me souviendrais de ce site dans 1 mois ?**

---

## 9. Annexe — Schéma de données complet

⚠️ **Forme exacte renvoyée par l'API.** Les composants doivent consommer **exactement** cette structure (mêmes clés, mêmes types). Les valeurs en `https://example.com/...` sont des placeholders côté studio, à remplacer par les vrais médias une fois les données saisies.

Notes :
- `poles[].layout` peut valoir `immersive`, `classic` ou `editorial` — les variantes doivent être supportées.
- `plat_du_jour.type` peut valoir `text` ou `image`.
- `cta.reservation.methode` peut valoir `url`, `tel` ou `email`.
- Les sections suffixées `custom:xxx` ont une forme libre.

```json
{
  "infos": {
    "data": {
      "nom": "La Tour des Légendes",
      "ville": "Ath",
      "pays": "Belgique",
      "adresseComplete": "",
      "email": "",
      "telephone": "",
      "siteWeb": "",
      "reservationUrl": "",
      "googlePlaceId": "",
      "googleMapsUrl": "",
      "description": "",
      "numeroEntreprise": "",
      "parking": "",
      "wifiNom": "",
      "wifi": false,
      "terrasse": false,
      "accesHandicape": false
    },
    "updated_at": "2026-05-06T18:26:52.287+00:00"
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
            "fin": "22:00",
            "debut": "18:00"
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
            "fin": "22:00",
            "debut": "18:00"
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
            "fin": "22:00",
            "debut": "18:00"
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
            "fin": "22:00",
            "debut": "18:00"
          }
        ]
      },
      {
        "j": "Dimanche",
        "ferme": true,
        "periodes": []
      }
    ],
    "updated_at": "2026-05-06T18:32:42.844+00:00"
  },
  "alerte": {
    "data": {
      "alerteOuverture": {
        "actif": false,
        "message": "Fermé du 15 au 22 août - bonnes vacances !"
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
  "seo": {
    "data": {
      "titleDefault": "La Tour des Légendes",
      "description": "Aux origines, l’envie de créer un lieu qui rassemble folklore et produits du terroir, pour ensuite se concrétiser en une synergie entre trois institutions locales et prêtes à relever un défi de taille…\nCelui d’inaugurer la Tour des Légendes.  \nD’un côté, une brasserie moderne et axée sur les produits locaux, et ceux de la Brasserie des Légendes et de la Distillerie de Biercée. \nDe l’autre, la Maison des Géants, plus flamboyante que jamais, un musée où chaque détail de l’histoire de notre folklore vibre dans chacune des pièces. \nBienvenue à la Tour des Légendes ! \nToutes les informations sur l’ouverture et les réservations vous seront très bientôt communiquées. \nEn attendant, suivez nous, et embarquez dans l’aventure de la Tour des Légendes pour continuer à écrire l’histoire, ensemble.",
      "keywords": [
        "restaurant",
        "ath"
      ],
      "ogImage": "",
      "locale": "fr_BE",
      "twitterHandle": ""
    },
    "updated_at": "2026-05-06T19:02:14.346+00:00"
  },
  "cta": {
    "data": {
      "reservation": {
        "label": "Réserver",
        "methode": "tel",
        "url": ""
      },
      "commande": {
        "actif": false,
        "label": "Commander",
        "url": ""
      }
    },
    "updated_at": "2026-05-06T19:00:34.661+00:00"
  },
  "socials": {
    "data": [
      {
        "id": "facebook",
        "url": "https://www.facebook.com/profile.php?id=61588797667749",
        "actif": true,
        "label": "Facebook"
      },
      {
        "id": "instagram",
        "url": "https://www.facebook.com/profile.php?id=61588797667749",
        "actif": true,
        "label": "Instagram"
      }
    ],
    "updated_at": "2026-05-06T19:01:20.271+00:00"
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
          "href": "#",
          "label": "En savoir plus"
        },
        "img": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/la-tour-des-legendes/library/1778092752866-682710590-4034151500055034-639726895473889101-n.webp",
        "num": "01",
        "sur": "Lorem",
        "flip": false,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "titre": "Lorem Ipsum",
        "imgAlt": "",
        "layout": "immersive"
      },
      {
        "cta": {
          "href": "#",
          "label": "En savoir plus"
        },
        "img": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/la-tour-des-legendes/library/1778092752866-682710590-4034151500055034-639726895473889101-n.webp",
        "num": "02",
        "sur": "Nouveau",
        "flip": false,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "titre": "Pôle",
        "imgAlt": "",
        "layout": "classic"
      },
      {
        "cta": {
          "href": "#",
          "label": "En savoir plus"
        },
        "img": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/la-tour-des-legendes/library/1778092752866-682710590-4034151500055034-639726895473889101-n.webp",
        "num": "03",
        "sur": "Nouveau",
        "flip": true,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "titre": "Pôle",
        "imgAlt": "",
        "layout": "editorial"
      }
    ],
    "updated_at": "2026-05-06T18:42:22.973931+00:00"
  },
  "hero": {
    "data": {
      "alt": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "image": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/la-tour-des-legendes/library/1778092752866-682710590-4034151500055034-639726895473889101-n.webp"
    },
    "updated_at": "2026-05-06T19:00:56.446+00:00"
  },
  "carte": {
    "categories": [
      {
        "id": "2393d547-01c6-42c2-a30d-910e564dcc3b",
        "name": "Boisson",
        "note": null,
        "sort_order": 0,
        "items": [
          {
            "name": "Coca",
            "price": "12",
            "description": null
          },
          {
            "name": "Fanta",
            "price": "12",
            "description": "Lite"
          }
        ],
        "subcategories": [
          {
            "name": "Alcool",
            "sort_order": 0,
            "items": [
              {
                "name": "Rhum",
                "price": "23",
                "description": "Lite"
              },
              {
                "name": "Clope",
                "price": "22",
                "description": null
              }
            ]
          }
        ]
      },
      {
        "id": "97ba5e20-3c6c-4b72-ab9e-07bad13714bc",
        "name": "Dessert",
        "note": null,
        "sort_order": 1,
        "items": [
          {
            "name": "test",
            "price": "34",
            "description": "test"
          }
        ],
        "subcategories": [
          {
            "name": "test",
            "sort_order": 0,
            "items": [
              {
                "name": "aze",
                "price": "455",
                "description": "aze"
              }
            ]
          }
        ]
      }
    ]
  },
  "menus": [
    {
      "id": "1a02a62b-05b4-46ed-8c89-f5e60ef5be2f",
      "name": "Formule 1",
      "price": "50",
      "data": {
        "sections": [
          {
            "choix": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "titre": "Entrée"
          },
          {
            "choix": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "titre": "Plat"
          },
          {
            "choix": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "titre": "Dessert"
          }
        ]
      }
    },
    {
      "id": "e8bbaab7-5369-48ac-8262-3fec02a801cb",
      "name": "Formule 2 ",
      "price": "25",
      "data": {
        "sections": [
          {
            "choix": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "titre": "Entrée"
          },
          {
            "choix": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "titre": "Plat"
          },
          {
            "choix": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "titre": "Dessert"
          }
        ]
      }
    }
  ],
  "galerie": [
    {
      "id": "d5eacee9-dfc4-428b-bf1c-6d4282a4f203",
      "src": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/la-tour-des-legendes/library/1778092752866-682710590-4034151500055034-639726895473889101-n.webp",
      "alt": "",
      "label": "",
      "tall": false,
      "sort_order": 0
    }
  ],
  "evenements": [
    {
      "id": "364640b0-968e-4a61-bc24-9469cd886c9c",
      "title": "Ouvertue bientôt ! ",
      "date": "2026-05-21",
      "description": "Toutes les informations sur l’ouverture et les réservations vous seront très bientôt communiquées. \nEn attendant, suivez nous, et embarquez dans l’aventure de la Tour des Légendes pour continuer à écrire l’histoire, ensemble",
      "active": true,
      "image": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/la-tour-des-legendes/library/1778092752866-682710590-4034151500055034-639726895473889101-n.webp"
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
  "blog": [
    {
      "id": "article-uuid-1",
      "title": "Comment choisir une bonne brasserie belge",
      "slug": "choisir-brasserie-belge",
      "category": "Conseils",
      "author": "Le Café des Délices",
      "date": "2026-03-15",
      "summary": "Quelques repères pour identifier une brasserie de qualité.",
      "content": "Une bonne brasserie belge se reconnaît avant tout à sa sélection de bières...",
      "image": "https://example.com/storage/blog/brasserie.jpg",
      "status": "publie"
    }
  ],
  "partenaires": [
    {
      "id": "8370ff36-c2e2-400f-98d9-ad66e015f289",
      "name": "Ath",
      "url": "#",
      "logo": "https://vytljksngayzgdhrhdau.supabase.co/storage/v1/object/public/media/la-tour-des-legendes/library/1778092752866-682710590-4034151500055034-639726895473889101-n.webp",
      "sort_order": 0
    }
  ]
}
```

---

## 10. Variables d'environnement — `.env`

À copier-coller dans `.env` à la racine du projet client. Le user remplira les valeurs lui-même (clés fournies par le studio KLTK).

```
API_URL=https://admin.kltk.be/api
LA_TOUR_DES_LEGENDES_KEY=kltk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CF_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- `API_URL` : base de l'API KLTK (toujours `https://admin.kltk.be/api`).
- `LA_TOUR_DES_LEGENDES_KEY` : clé API spécifique à `la-tour-des-legendes` (générée dans le studio KLTK, format `kltk_<64hex>`).
- `CF_SECRET` : secret partagé Cloudflare (anti-bypass de la protection en amont).

Toutes ces variables sont **server-only** (`$env/static/private`). Aucune n'est exposée au browser.

---

**Maintenant : invoque `frontend-design`, relis le § 0, et code l'intégralité du site jusqu'au bout — sans demander de validation intermédiaire.**
