# Optimisation SEO Local - Région d'Ath et Hainaut Occidental

## ✅ Optimisations effectuées

### 1. Fichiers techniques SEO

#### robots.txt ([static/robots.txt](../static/robots.txt))
- ✅ Configuration pour autoriser tous les moteurs de recherche
- ✅ Référence au sitemap.xml

#### sitemap.xml ([static/sitemap.xml](../static/sitemap.xml))
- ✅ Toutes les pages principales (FR, EN, RU)
- ✅ Toutes les pages de services (8 services × 2 langues = 16 URLs)
- ✅ Pages légales
- ✅ Attributs `hreflang` pour le multilingue
- ✅ Priorités et fréquences de mise à jour configurées

### 2. Données structurées (Schema.org)

#### LocalBusinessSchema ([src/lib/comp/LocalBusinessSchema.svelte](../src/lib/comp/LocalBusinessSchema.svelte))
- ✅ Type: `LocalBusiness`
- ✅ Informations complètes:
  - Nom, description, email
  - Adresse (Mainvault 7812, Hainaut, Belgique)
  - Coordonnées géographiques (lat/long)
  - **Zone de service**: Ath, Tournai, Leuze-en-Hainaut, Lessines, Frasnes-lez-Anvaing, Ellezelles, Beloeil, Enghien, Silly, Chièvres
  - Horaires d'ouverture (Lun-Ven 9h-18h)
  - Réseaux sociaux (LinkedIn, GitHub, Behance)
- ✅ Catalogue de services (7 services détaillés)

### 3. Meta descriptions optimisées

#### Page principale ([src/lib/content/data.json](../src/lib/content/data.json))
- ✅ Description enrichie avec mots-clés locaux
- ✅ Mention des villes ciblées: Ath, Tournai, Leuze-en-Hainaut, Lessines, Hainaut occidental
- ✅ Services mentionnés: web, design, e-commerce, IT, électricité, électroménager

## 🎯 Mots-clés ciblés

### Mots-clés principaux (longue traîne)
1. **Développement web**:
   - "développeur web Ath"
   - "création site web Tournai"
   - "site internet sur mesure Hainaut"
   - "développeur freelance Leuze-en-Hainaut"

2. **E-commerce**:
   - "boutique Shopify Ath"
   - "e-commerce Tournai"
   - "création boutique en ligne Hainaut"

3. **Services techniques**:
   - "dépannage informatique Ath"
   - "réparation ordinateur Tournai"
   - "installation électroménager Lessines"
   - "électricien Ath"
   - "caméras surveillance Hainaut"

### Zones géographiques ciblées
- **Priorité 1**: Ath (principal)
- **Priorité 2**: Tournai, Leuze-en-Hainaut, Lessines
- **Priorité 3**: Frasnes-lez-Anvaing, Ellezelles, Beloeil
- **Priorité 4**: Enghien, Silly, Chièvres
- **Global**: Hainaut occidental

## 📋 Prochaines étapes pour maximiser le SEO

### 1. Google My Business (URGENT)
Tu as dit que tu as un Google My Business, assure-toi que:
- [ ] L'adresse correspond à celle du site (Mainvault 7812)
- [ ] Les horaires sont à jour (Lun-Ven 9h-18h)
- [ ] Le numéro de téléphone est correct
- [ ] Les **catégories** incluent:
  - Développeur web
  - Service informatique
  - Électricien
  - Service de réparation d'appareils électroménagers
  - Designer graphique
- [ ] Lien vers kltk.be dans le profil
- [ ] Photos de tes réalisations (screenshots de sites web, projets)
- [ ] **Zone de service** configurée avec toutes les villes mentionnées ci-dessus

### 2. Contenu local à ajouter (Optionnel)

#### Blog / Articles de blog
Créer des articles ciblés géographiquement:
- "Pourquoi choisir un développeur web local à Ath ?"
- "Top 5 des services informatiques à Tournai en 2025"
- "Guide de l'e-commerce pour les commerces du Hainaut"

#### Témoignages clients
Demander des avis Google My Business de clients d'Ath, Tournai, etc.
Mentionner la ville du client dans le témoignage si possible.

### 3. Backlinks locaux

Obtenir des liens depuis:
- [ ] **Annuaires locaux belges**:
  - Pages d'Or (pagesdor.be)
  - Editus (editus.be)
  - 1307.be
- [ ] **Chambres de commerce**:
  - Union des Entreprises de Ath (UE Ath)
  - BEP (Bureau Economique de la Province de Hainaut)
- [ ] **Réseaux professionnels locaux**:
  - Groupes LinkedIn Hainaut
  - Facebook Business Ath/Tournai
- [ ] **Partenariats locaux**:
  - Autres freelances non-concurrents
  - Commerces locaux (échange de visibilité)

### 4. Optimisations techniques supplémentaires

#### Meta tags OpenGraph pour réseaux sociaux
Ajouter dans metaTags.svelte:
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://kltk.be/og-image.jpg" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="fr_BE" />
```

#### Fichier humans.txt
Créer `static/humans.txt`:
```
/* EQUIPE */
Développeur & Designer: Eléazar Klyuvitkin
Localisation: Mainvault, Hainaut, Belgique
Contact: eleazar@kltk.be

/* SITE */
Technologies: SvelteKit, SCSS, JavaScript
Hébergement: Vercel
```

#### Vitesse de chargement
- [ ] Vérifier sur PageSpeed Insights
- [ ] Optimiser les images (WebP, compression)
- [ ] Minification JS/CSS (normalement fait par Vercel)

### 5. Suivi et analyse

#### Google Search Console
- [ ] Ajouter le site sur search.google.com/search-console
- [ ] Soumettre le sitemap.xml
- [ ] Vérifier l'indexation des pages
- [ ] Suivre les mots-clés qui génèrent du trafic

#### Google Analytics (optionnel)
- [ ] Installer GA4 si pas déjà fait
- [ ] Suivre les conversions (clics email, téléphone)

## 🔧 Fichiers modifiés

1. `static/robots.txt` - Configuration robots
2. `static/sitemap.xml` - Sitemap complet
3. `src/lib/comp/LocalBusinessSchema.svelte` - Données structurées
4. `src/routes/[lang]/+page.svelte` - Intégration schema
5. `src/lib/content/data.json` - Description optimisée

## 📝 Notes importantes

### Téléphone à mettre à jour
Dans `LocalBusinessSchema.svelte`, ligne 15:
```javascript
telephone: '+32-XXX-XX-XX-XX', // ⚠️ À remplacer par ton vrai numéro
```

### Coordonnées GPS
Les coordonnées actuelles (50.596, 3.458) correspondent à Mainvault.
Si tu veux être plus précis, cherche ton adresse exacte sur Google Maps.

### Adresse exacte
L'adresse de rue (`streetAddress`) est vide par défaut.
Si tu veux l'afficher publiquement, ajoute-la dans le schema.

## 🎯 Résultats attendus

Avec ces optimisations, ton site devrait:
- ✅ Apparaître dans Google Maps pour les recherches locales
- ✅ Être mieux référencé pour les requêtes géolocalisées (ex: "développeur web Ath")
- ✅ Avoir un meilleur CTR grâce aux rich snippets (étoiles, infos structurées)
- ✅ Être trouvé par les clients de ta zone géographique

**Délai d'indexation**: 1-4 semaines après soumission du sitemap à Google Search Console.

## 📚 Ressources utiles

- [Google My Business](https://business.google.com)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- [Test données structurées](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev)
