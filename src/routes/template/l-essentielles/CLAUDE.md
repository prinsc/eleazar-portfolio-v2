# Démo - L'essenti'elles

## Client

- **Nom** : L'essenti'elles
- **Secteur** : Salon de beauté, esthétique, bien-être et coiffure
- **Site actuel** : https://lessentielles-com.webnode.be/
- **Ce qu'on veut leur vendre** : Refonte complète - remplacer le site Webnode par un site premium sur mesure

L'essenti'elles, un espace dédié à la beauté et au bien-être, où chaque détail est pensé pour vous sublimer dans un cadre chic et chaleureux. Venez vivre un moment de partage, de découverte et de convivialité.

**Localisation** : Chaussée de Bruxelles 384, 7822 Ath (Belgique)
**Téléphone** : 0492 76 66 95

## Direction créative

- **Ambiance / mood** : Luxe editorial - Aesop meets salon parisien haut de gamme. Élégant, féminin, chaleureux, raffiné.
- **Références visuelles** : Sites de salons/spas haut de gamme, typographie éditoriale magazine
- **Palette** :
  - Couleur dominante : `#1a1a1a` (noir doux)
  - Accent : `#8b7d6b` (beige doré)
  - Fond : `#faf8f5` (blanc crème)
  - Fond secondaire : `#f3efe9` (beige clair)
  - Texte : `#1a1a1a` / `#555` / `#777` / `#999`
- **Typographies** :
  - Titres : Cormorant Garamond (serif élégante, italiques pour accents)
  - Corps : DM Sans (sans-serif moderne et lisible)
- **Éléments signatures** :
  - Animations GSAP : hero reveal, scroll-triggered reveals, parallax sur images
  - Dotted-line price tables style luxe
  - Carrousel témoignages auto-rotatif
  - Menu mobile plein écran avec animations staggered

## Plus-value vs site actuel (Webnode)

1. **Design premium** - identité visuelle cohérente luxe vs pages Webnode génériques
2. **Mobile-first** - responsive impeccable, clientèle féminine navigue sur téléphone
3. **Animations GSAP** - transitions fluides, reveals au scroll, effet "wow"
4. **Formulaire de contact intelligent** - choix de prestation intégré (futur: booking réel)
5. **Tarifs lisibles** - mise en page claire avec dots leaders, sous-catégories
6. **Témoignages** - carrousel automatique, social proof immédiate
7. **SEO** - structure HTML sémantique, meta tags, SvelteKit = performance
8. **Vitesse** - SvelteKit vs Webnode = chargement quasi instantané

## Contenu de la démo

- **Langue** : Français
- **Pages** :
  - `/template/l-essentielles` - Accueil (hero, services overview, about, témoignages, horaires, CTA booking)
  - `/template/l-essentielles/esthetique` - Tarifs esthétique complets
  - `/template/l-essentielles/bien-etre` - Tarifs bien-être avec cards expérience (head spa, massage)
  - `/template/l-essentielles/coiffure` - Tarifs coiffure + soins capillaires
  - `/template/l-essentielles/contact` - Formulaire + infos pratiques + placeholder carte
- **Textes** : Contenu réel du client (extrait du site Webnode actuel)
- **Images** : Unsplash stock (beauté/salon) - à remplacer par photos réelles du client

## Aide au contenu

Le dossier `base/` contient les fichiers txt extraits du site actuel (accueil, esthétique, bien-être, coiffure, contact). Tout le contenu tarifaire est fidèle au site actuel.

La clientèle principale est féminine, ambiance proche du luxe.

## Ce qui va vendre la démo

- **Hero GSAP** - texte qui se révèle ligne par ligne, image qui scale in, badge flottant
- **Scroll reveals** - chaque section apparaît élégamment au scroll
- **Parallax** - image about section avec effet de profondeur
- **Cards bien-être** - effet hover lift sur les expériences head spa/massage
- **Navigation** - menu mobile plein écran avec animations staggered
- **Cohérence** - même langage visuel sur toutes les pages, transitions douces

## Ne PAS faire

- Pas de multilingue (clientèle locale francophone)
- Pas de CMS / backend
- Formulaire factice (pas d'envoi réel)
- Pas de galerie photos (pas encore d'images client)

## Architecture

```
l-essentielles/
├── +layout.svelte          ← Fonts, reset CSS, Nav + Footer partagés
├── +page.svelte            ← Accueil
├── esthetique/+page.svelte
├── bien-etre/+page.svelte
├── coiffure/+page.svelte
├── contact/+page.svelte
├── CLAUDE.md
├── base/                   ← Contenu texte source (extraits Webnode)
└── lib/
    ├── data.js             ← Toutes les données centralisées
    ├── styles/
    │   └── _mixins.scss    ← Breakpoints autonomes
    └── components/
        ├── Nav.svelte
        ├── Footer.svelte
        ├── Hero.svelte
        ├── ServicesOverview.svelte
        ├── Testimonials.svelte
        ├── BookingBanner.svelte
        ├── ServicePageHeader.svelte
        └── PriceTable.svelte
```

### Images

- **Pas d'images locales**. URLs Unsplash avec commentaire `<!-- client: replace with real salon photo -->`.
- Photos choisies dans l'univers beauté/salon/spa.

### Autonomie (rappel du CLAUDE.md parent)

- Aucun import `$lib` du projet kltk
- Aucun style global kltk (`main.scss`, `_colors.scss`, etc.)
- Fonts via Google Fonts dans `<svelte:head>`
- Libs externes : GSAP (déjà dans `package.json`)

### Mixins SCSS locaux (breakpoints)

Fichier de mixins à [lib/styles/\_mixins.scss](./lib/styles/_mixins.scss) - copie autonome des breakpoints. Usage :

```svelte
<style lang="scss">
  @use './lib/styles/mixins' as *;
  // ou depuis sous-page: @use '../lib/styles/mixins' as *;

  .element {
    padding: 1rem;
    @include breakpoint('medium') {
      padding: 2rem;
    }
  }
</style>
```
