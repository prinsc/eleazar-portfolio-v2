# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual portfolio website built with SvelteKit 2 and Svelte 5. It showcases personal work, services, blog posts, and professional experiences with support for French, English, and Russian languages.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Prepare/sync SvelteKit
npm run prepare
```

## Project Architecture

### Routing & Internationalization

This project uses **file-based routing with language prefixes**. All routes are under `src/routes/[lang]/`:

- Language parameter `[lang]` is required in all URLs (e.g., `/fr/`, `/en/services`, `/ru/blog`)
- Root layout (`src/routes/+layout.js`) redirects to default language if missing or invalid
- Supported languages are defined in `src/lib/content/settings.json` (`langList`)
- Current language is stored in the `settings` Svelte store and updated on route changes

### Content Management System

Content is managed through **JSON files** in `src/lib/content/`:

- `settings.json` - Global settings (theme, language list, email config)
- `data.json` - Main portfolio content (personal info, school, experience, projects, technologies, socials)
- `data_services.json` - Service offerings with detailed descriptions
- `data_blog.json` - Blog articles
- `data_legal.json` - Legal pages content

All content objects support **multilingual keys** with `fr`, `en`, `ru` properties.

### State Management

Two main Svelte stores in `src/lib/stores/`:

- `settings.js` - Wraps `settings.json` for global configuration
- `content.js` - Merges `data.json` and `data_services.json` into single store

The stores are reactive and can be imported anywhere:
```javascript
import { settings } from '$lib/stores/settings.js';
import { content } from '$lib/stores/content.js';
```

### Styling Architecture

SCSS-based styling system in `src/lib/styles/`:

- **Entry point**: `main.scss` imports all partials
- **Base styles**: `_reset.scss`, `_base.scss`, `_typography.scss`, `_border-radius.scss`
- **Themes**: `_colors.scss` (customizable color palette), `_mixins.scss`
- **Utils**: `_animations.scss`, `_responsive.scss`

Svelte components can use SCSS with `svelte-preprocess`:
```svelte
<style lang="scss">
  @import '$lib/styles/themes/colors';
  .component { color: var(--primary); }
</style>
```

### Component Structure

Components are located in `src/lib/comp/`:

- Layout components: `nav.svelte`, `footer.svelte`, `PageContent.svelte`
- Feature components: `Card.svelte`, `EmblaCarousel.svelte`, `ServiceMap.svelte`
- Content components: `exp.svelte`, `projects.svelte`, `services.svelte`, `RealizedProjects.svelte`
- Meta components: `metaTags.svelte`, `LocalBusinessSchema.svelte`
- Technology components: `techno/techno_element.svelte`

### Key Features

1. **Multilingual support** - All user-facing text uses language keys from JSON
2. **Dynamic routes** - Services and blog posts use dynamic `[service]` and `[slug]` routes
3. **SEO optimization** - Structured data, meta tags, sitemap generation
4. **Content blocks** - Services use flexible content block system (paragraphs, CTAs)
5. **Project showcase** - Portfolio items with technologies, images, links
6. **Mapbox integration** - Service area visualization with `mapbox-gl`

## Technology Stack

- **Framework**: SvelteKit 2 with Svelte 5 (runes mode)
- **Styling**: SCSS with Tailwind CSS v4
- **Animations**: GSAP, custom SCSS animations
- **UI Components**: Lucide icons, Tippy.js tooltips, Embla carousel, Chocolat lightbox
- **Maps**: Mapbox GL
- **Deployment**: Vercel adapter (`@sveltejs/adapter-vercel`)

## Common Customization Points

When modifying content:
1. Edit JSON files in `src/lib/content/` - never hardcode text in components
2. Ensure all user-facing text has `fr`, `en`, `ru` translations
3. Update `data_services.json` for service changes (includes pricing, features, content blocks)
4. Blog posts are in `data_blog.json` with rich content block support

When modifying styles:
1. Colors: `src/lib/styles/themes/_colors.scss`
2. Typography: `src/lib/styles/base/_typography.scss`
3. Base styles: `src/lib/styles/base/_base.scss`

## Important Notes

- This portfolio uses **Svelte 5 runes** (`$props()`, `$state()`, `$derived()`)
- The project suppresses `css_unused_selector` and `a11y_invalid_attribute` warnings (see `svelte.config.js`)
- SCSS preprocessing uses `svelte-preprocess` with `renderSync: true`
- Development server allows specific ngrok host (see `vite.config.js`)
- All routes require language parameter - missing/invalid languages redirect to default
