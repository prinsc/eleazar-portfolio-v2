# Démo - Le Café des Délices (Ath)

**⚠️ Rappel** : démo visuelle pour convaincre le client, pas un produit final. Priorité absolue au "wow".

## Instruction impérative pour Claude

Avant de coder, **invoque le skill `frontend-design`** via l'outil Skill. Ce skill évite les réflexes génériques "AI aesthetic". Adopte une posture de **designer senior** : partis pris forts, choix tranchés, assume-les.

## Règles d'architecture (IMPORTANT)

Ces règles sont spécifiques à ce template mais devraient s'appliquer à tous les templates - garde-les en tête.

### 1. Composants, autant que possible

- **Créer un dossier `lib/` LOCAL au template** : `src/routes/template/cafe-des-delices/lib/`
- Y placer tous les composants Svelte réutilisables (Nav, Footer, Hero, MenuItem, SectionHeader, etc.)
- **Ne JAMAIS importer depuis `$lib/`** (le `$lib` du projet kltk principal)
- Import relatif : `import Nav from './lib/Nav.svelte'` dans `+page.svelte`
- Pareil pour les données : `./lib/data.js` plutôt que des tableaux inline dans chaque page

### 2. Pages multiples autorisées (et encouragées)

- Le template peut avoir plusieurs pages, par exemple :
  - `/template/cafe-des-delices` - accueil
  - `/template/cafe-des-delices/menu` - carte complète
  - `/template/cafe-des-delices/reservation` - formulaire de réservation
- Créer un `+layout.svelte` dans le dossier du template si on veut partager Nav + Footer entre pages (toujours avec imports relatifs)
- Chaque page reste légère et composée de composants

### 3. Images

- **Pas d'images locales**. Utiliser des URLs Unsplash random ou des placeholders (`https://source.unsplash.com/...` / `https://images.unsplash.com/photo-...`).
- Le client remplacera lui-même plus tard - note-le en commentaire à côté de chaque image pour qu'il sache où intervenir
- Choisir des photos en phase avec le secteur (grillades, bières, terrasse, ambiance de restaurant)

### 4. Autonomie (rappel du CLAUDE.md parent)

- Aucun import `$lib` du projet kltk
- Aucun style global kltk (`main.scss`, `_colors.scss`, etc.)
- Fonts via Google Fonts dans `<svelte:head>` ou via `@import` dans le style
- Libs externes : OK si déjà dans `package.json`

### 5. Mixins SCSS locaux (breakpoints)

Le template a son propre fichier de mixins à [lib/styles/\_mixins.scss](./lib/styles/_mixins.scss) - une **copie autonome** des breakpoints du site kltk (xsmall → xxlarge). Usage dans un composant :

```svelte
<style lang="scss">
	@use './styles/mixins' as *;

	.element {
		padding: 1rem;
		@include breakpoint('medium') {
			padding: 2rem;
		}
	}
</style>
```

Cela remplace les `@media (max-width: ...)` manuels. Préférer **mobile-first** (`@include breakpoint('medium') { ... }` pour la version desktop).

### 6. Données dynamiques

Le template utilise **Open-Meteo** (API gratuite, pas de clé, CORS ok) pour afficher la météo d'Ath en direct. Le fichier [lib/status.js](./lib/status.js) expose deux stores Svelte :

- `status` - statut d'ouverture live (ouvert/fermé + "ferme dans 2h15"), mis à jour chaque minute
- `weather` - météo Ath + recommandation éditoriale ("Profitez du soleil en terrasse", etc.)

Ces stores sont consommés par [lib/Status.svelte](./lib/Status.svelte) (bloc statut complet) et [lib/LiveBadge.svelte](./lib/LiveBadge.svelte) (pastille compacte dans la topbar).

## Client - Le Café des Délices

- **Nom officiel** : Le Café des Délices
- **Ville** : Ath (Belgique)
- **Type** : restaurant-brasserie, spécialiste des grillades + bières belges
- **Adresse** : Grand Place 8, 7800 Ath, Belgium
- **Email** : info@lecafedesdelices-ath.com
- **Horaires** :
  - Lundi - Mercredi, Vendredi - Dimanche : 10h00 - 22h00
  - Jeudi : 09h00 - 22h00
  - Cuisine : 12h00 - 14h30 et 18h00 - 22h00
- **Site existant** : oui, à refondre (direction actuelle assez "template générique", on vient faire mieux)

## Positionnement / ambiance à transmettre

Le site actuel parle de deux choses en parallèle, qu'on peut reprendre comme "deux pôles" du lieu :

1. **"Délices Grillés"** - spécialité grillades, viandes sélectionnées, ambiance conviviale, terrasse place d'Ath
2. **"Moments Maltés"** - sélection de bières belges d'exception, apéritif, terrasse ensoleillée

=> Le template peut jouer sur ce **diptyque** (grill / bière, feu / malt, jour / soir) comme fil conducteur éditorial fort. C'est une opportunité visuelle : deux mondes, un seul lieu.

## Charte suggérée

- **Ambiance** : brasserie contemporaine, éditoriale, un peu belge dans l'âme sans tomber dans le cliché. Pas "bistrot parisien".
- **Palette suggérée** : tons terre/braise (brun profond, terracotta), crème chaude, un accent cuivré ou ambre (couleur bière), noir d'ardoise. Éviter le bordeaux classique "resto français".
- **Typographie** : une display avec du caractère (serif contemporaine ou grotesque éditoriale), body lisible, détails en mono pour les infos techniques (horaires, prix).
- **Ton rédactionnel** : chaleureux mais soigné, pas familier. Direct, sensuel sur la nourriture.

## Contenu factuel à utiliser

### Menus existants (à reprendre tels quels)

**Menu 1 - 38,00 €**
- Entrée au choix : Duo de croquettes de fromage OU Pâté sur toast
- Plat au choix : Burger Délice OU Tagliatelles sauce roquefort et éclat de noix OU Macaroni au gratin
- Dessert au choix : Dame Blanche OU Dame Noire

**Menu 2 - 48,00 €**
- Entrée au choix : Carpaccio de bœuf Holstein fumé OU Foie gras confit d'oignon aux fruits rouges
- Plat au choix : Tagliata de bœuf OU Pâtes aux scampis OU Burger au choix
- Dessert au choix : Mousse au chocolat OU Coupe Dame Blanche OU Gourmand

### Sections attendues

- **Accueil (`+page.svelte`)** :
  - Hero marquant, idéalement avec le diptyque Grillés / Maltés
  - Bloc "Délices Grillés" (texte + CTA vers menu)
  - Bloc "Moments Maltés" (texte + CTA vers carte bières)
  - Aperçu des deux menus (38 € / 48 €) avec lien vers la page menu complète
  - Bloc réservation (faux formulaire ou appel à réserver)
  - Infos pratiques (adresse, horaires, contact)
- **Page menu (`menu/+page.svelte`)** : menus détaillés + éventuellement quelques plats à la carte
- Optionnel : page réservation

## Ce qui va vendre la démo

- Le **diptyque Grillés / Maltés** traité comme un vrai parti pris éditorial, pas juste "deux blocs côte à côte"
- Une **typo** avec du caractère, pas Inter/Roboto
- Des **photos** Unsplash bien choisies (grillades, bières belges, terrasse) qui donnent faim dès le hero
- Une **navigation fluide** entre accueil et page menu
- Des **composants bien découpés** dans `./lib/` pour que je puisse itérer rapidement

## Ne PAS faire

- Pas de multilingue
- Pas de backend / formulaire fonctionnel
- Pas d'images locales (tout en URL Unsplash)
- Pas d'import `$lib` du projet kltk
- Pas de bordeaux "resto parisien" (trop cliché, on est à Ath, pas à Montmartre)
- Pas de lorem ipsum - reprendre les textes existants et les améliorer si besoin
- Pas d'emoji
