# Templates - démos clients

Ce dossier contient des **démos visuelles** destinées à être **montrées à des clients potentiels** pour illustrer une direction artistique possible. Chaque sous-dossier (`warlord/`, `cafe-des-delices/`, etc.) est une proposition autonome.

## Nature réelle des templates

**Ce ne sont PAS des produits finaux.** Ce sont des **exemples / maquettes fonctionnelles** qu'on présente au client pour :

- Lui montrer une direction créative (palette, typo, ambiance, animations)
- Valider visuellement une approche avant tout engagement
- Servir de support de discussion commerciale

=> L'objectif est **l'impact visuel** et la démonstration de savoir-faire, pas un produit robuste prêt à livrer.

## Implications concrètes

- **Contenu placeholder accepté** : faux textes, fausses images, faux horaires, fausses promos… du moment que c'est crédible et en phase avec le secteur du client.
- **Pas besoin de tout internationaliser** : une seule langue (celle du client) suffit sauf demande contraire.
- **Pas besoin de backend réel** : formulaires factices, liens morts OK tant que visuellement ça tient.
- **Privilégier le "wow"** : animations, transitions, micro-interactions, typo marquante - c'est ce qui vend.
- **Responsive quand même** : le client va probablement ouvrir sur son mobile. Mobile-first reste la règle.

## Règle d'autonomie

Chaque template reste **isolé du reste du site kltk** pour deux raisons :

1. Ne pas polluer le portfolio principal avec des styles / composants one-shot
2. Pouvoir recopier / réutiliser / archiver un template sans démêler des imports

Concrètement, dans `src/routes/template/<nom>/` :

- ❌ Pas d'import depuis `$lib/` (stores, components, styles, content JSON…)
- ❌ Pas d'import de `main.scss`, `_colors.scss`, `_mixins.scss`, etc.
- ❌ Pas de variables CSS globales du site kltk (`var(--color-...)`)
- ✅ Styles inline dans le `<style>` du composant, ou fichiers locaux au dossier du template
- ✅ Libs externes (GSAP, Lenis, etc.) : OK si déjà dans `package.json`, sinon l'installer et le noter dans le `CLAUDE.md` du template

## Architecture interne d'un template

**Règle** : décomposer en composants réutilisables et en pages, comme un vrai site.

### 1. Composants dans un `lib/` LOCAL

Créer un dossier `src/routes/template/<nom>/lib/` et y placer les composants Svelte du template :

```
template/<nom>/
├── +page.svelte            ← accueil (assemble des composants)
├── +layout.svelte          ← (optionnel) Nav + Footer partagés entre pages
├── CLAUDE.md
├── menu/
│   └── +page.svelte        ← page menu (autre page du template)
└── lib/                    ← composants LOCAUX au template
    ├── Nav.svelte
    ├── Footer.svelte
    ├── Hero.svelte
    ├── MenuCard.svelte
    └── data.js             ← données (menus, horaires, etc.)
```

- **Imports relatifs uniquement** : `import Nav from './lib/Nav.svelte'` (ou `'../lib/Nav.svelte'` depuis une sous-page)
- **Jamais `$lib/`** (qui pointe vers le projet kltk principal)
- Ce dossier `lib/` est **spécifique au template** et copiable avec lui

### 2. Pages multiples

Un template peut (et devrait) avoir plusieurs pages quand c'est pertinent :

- `/template/<nom>` - accueil
- `/template/<nom>/menu` - carte détaillée
- `/template/<nom>/reservation` - formulaire
- etc.

Un `+layout.svelte` dans le dossier du template permet de partager Nav / Footer / fonts entre toutes les pages du template. Ce layout est **local au template** et n'interfère pas avec le layout du site kltk (cf. architecture des routes plus haut).

### 3. Images

- **Pas d'images locales** (pas de copie dans `static/`)
- Utiliser des URLs Unsplash : `https://images.unsplash.com/photo-...`
- Le client remplacera lui-même plus tard - laisser un commentaire à côté de chaque image pour qu'il repère les points d'intervention

## Architecture des routes (déjà en place)

- Root layout ([src/routes/+layout.svelte](../+layout.svelte)) minimal : aucun Nav, aucun style global, juste le tracking QR.
- Styles / Nav / NeuroShader du site kltk vivent dans [src/routes/[lang]/+layout.svelte](../%5Blang%5D/+layout.svelte) → ne touchent PAS `/template/*`.
- La redirection langue dans [src/routes/+layout.js](../+layout.js) exclut `/template/*`.

Ne pas toucher à cette séparation.

## Convention par template

Chaque template a son propre `CLAUDE.md` qui décrit le contexte client (voir le squelette dans un template existant : secteur, site actuel, charte souhaitée, ambiance, référence, etc.).

**Lire ce fichier AVANT de coder quoi que ce soit** - il donne le "brief créatif".

## Ajouter un nouveau template

1. Créer `src/routes/template/<nom>/+page.svelte` (autonome)
2. Créer `src/routes/template/<nom>/CLAUDE.md` avec le brief client
3. Ajouter l'entrée dans l'index [src/routes/template/+page.svelte](./+page.svelte) (tableau `templates`)
4. `npm run dev` et visiter `/template/<nom>` pour vérifier
