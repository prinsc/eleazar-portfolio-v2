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

Components are located in `src/lib/comp/`. **Always check this folder before writing inline styles or duplicating patterns — most primitives already exist as reusable components.**

**Layout / page shells:**
- `nav.svelte` — top sticky nav (theme + lang switch)
- `footer.svelte` — site footer
- `PageContent.svelte` — main page wrapper, optional sticky TOC w/ active heading tracking

**Reusable primitives (use these instead of inline duplicates):**
- `Button.svelte` — variants `primary | secondary | accent | ghost | link`, sizes `sm | md | lg`, `icon` snippet, `iconPosition`, `disabled`, `fullWidth`, `href` (renders `<a>`) or `onclick` (renders `<button>`)
- `BackButton.svelte` — arrow-left + label, defaults to `$content.site.back`, takes `href` or `onclick`
- `SectionTitle.svelte` — heading w/ optional `count`, `icon` snippet, `level 1-6`, `size`
- `Spinner.svelte` — loader, props `size`, `thickness`, `color`
- `LoadingState.svelte` — centered spinner wrapper (`minHeight`, `label`, `size`)
- `Pulse.svelte` — pulsing dot indicator (`size`, `color`, `label` or children snippet)
- `StatusCard.svelte` — feedback card, `variant: success | info | warning | error`, optional `title`
- `MicroLabel.svelte` — small uppercase tracked label (eyebrows, form labels, dividers), `as` tag
- `Caption.svelte` — muted descriptive text, `size: sm | md`, supports inline `<code>`
- `CodeTag.svelte` — inline `<code>` w/ border, `bordered` toggle
- `Swatch.svelte` — color token swatch button (chip + name + copy icon)
- `TypeSpecimen.svelte` — type scale row (label + token + sample)
- `RadiusSample.svelte` — clothoid radius demo card

**Feature components:**
- `Card.svelte` — project/service card, `elementType: a | button | div`, image + title + tagline/description + technos + pricing + date, lightbox on `div` mode
- `CTA.svelte` — call-to-action, `variant: default | inline`, defaults from `$content.site`
- `EmblaCarousel.svelte` — embla-carousel-svelte wrapper w/ prev/next buttons
- `ServiceMap.svelte` — Mapbox service area map
- `RealizedProjects.svelte` — referenced/inline project list (takes IDs or objects)

**Content sections:**
- `exp.svelte`, `projects.svelte`, `services.svelte`, `reviews.svelte` — homepage sections

**Meta / SEO:**
- `metaTags.svelte` — title, description, robots, OG/Twitter, canonical, JSON-LD
- `LocalBusinessSchema.svelte` — local business structured data

**Tech badges:**
- `techno/techno_element.svelte` — icon + tippy tooltip per technology (icons in `static/assets/icons/`)

### Style Guide page

[`/[lang]/guideline`](src/routes/[lang]/guideline/+page.svelte) — internal-only living style guide (`noindex`, not in nav). Showcases every component, color token, type scale, radius, animation, and utility class. Edit a component → guideline auto-reflects. Use it as the visual reference before building new screens.

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

When building new UI:
1. Check `src/lib/comp/` first — `Button`, `BackButton`, `Spinner`, `LoadingState`, `Pulse`, `StatusCard`, `MicroLabel`, `Caption`, `CodeTag`, `SectionTitle`, `Card`, `CTA` cover most needs
2. Visit `/[lang]/guideline` to preview every component visually
3. If a pattern repeats 2+ times, extract it into `src/lib/comp/` and add it to the guideline
4. Global utility classes available: `.grain`, `.kl-container`, `.divider`, `.no-effect`, `.underline`, `.color-{red|blue|green|yellow|purple|gold}`

## Important Notes

- This portfolio uses **Svelte 5 runes** (`$props()`, `$state()`, `$derived()`)
- The project suppresses `css_unused_selector` and `a11y_invalid_attribute` warnings (see `svelte.config.js`)
- SCSS preprocessing uses `svelte-preprocess` with `renderSync: true`
- Development server allows specific ngrok host (see `vite.config.js`)
- All routes require language parameter - missing/invalid languages redirect to default
