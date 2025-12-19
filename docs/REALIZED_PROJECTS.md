# Projets Réalisés - Documentation

## Aperçu

Le composant `RealizedProjects` permet d'afficher des projets réalisés pour chaque service. Il supporte deux types de projets:

1. **Référence par ID**: Référencer un projet existant dans `data.json` via son nom
2. **Projet simple**: Ajouter un projet personnalisé avec juste une photo et quelques infos

## Structure dans `data_services.json`

Ajoutez le champ `realizedProjects` à n'importe quel service:

```json
{
  "id": "sites-web-sur-mesure",
  "name": {...},
  "realizedProjects": [
    "Blinkr",
    "🖐️",
    {
      "name": "Site vitrine local",
      "description": {
        "fr": "Site web pour un artisan du Hainaut",
        "en": "Website for a local craftsman",
        "ru": "Сайт для местного мастера"
      },
      "image": "/assets/projects/example_local.webp",
      "date": "2024",
      "link": "https://example.com",
      "technos": ["svelte-5", "sass"]
    }
  ]
}
```

## Types de projets

### 1. Référence par ID (String)

Utilisez simplement le nom du projet tel qu'il apparaît dans `data.json`:

```json
"realizedProjects": [
  "Blinkr",
  "Noumis Jewelry",
  "Portfolio"
]
```

Le composant récupérera automatiquement:
- Le nom
- La description multilingue
- L'image
- Les technos
- Le lien
- La date

### 2. Projet personnalisé (Object)

Créez un objet avec les champs suivants:

```json
{
  "name": "Nom du projet",
  "description": {
    "fr": "Description en français",
    "en": "Description in English",
    "ru": "Описание на русском"
  },
  "image": "/chemin/vers/image.webp",
  "date": "2024",
  "link": "https://example.com",
  "technos": ["svelte-5", "sass"]
}
```

**Champs obligatoires:**
- `name`: Le nom du projet
- `image`: Le chemin vers l'image

**Champs optionnels:**
- `description`: Description multilingue (objet avec fr/en/ru)
- `date`: Date du projet
- `link`: Lien vers le projet
- `technos`: Array des technos utilisées

## Mélanger les deux types

Vous pouvez combiner les deux approches:

```json
"realizedProjects": [
  "Blinkr",
  {
    "name": "Projet Client Confidentiel",
    "image": "/assets/projects/client_blur.webp",
    "date": "2025"
  },
  "Portfolio"
]
```

## Affichage

Le composant `RealizedProjects`:
- Affiche un slider avec les projets
- Utilise le même composant `Card` que Projects et Services
- S'affiche uniquement si `realizedProjects` existe et n'est pas vide
- Supporte la navigation avec les boutons prev/next
- Est responsive et fonctionne sur mobile

## Exemple complet

Voir `data_services.json` pour le service "Sites Web sur Mesure" qui contient un exemple de chaque type.
