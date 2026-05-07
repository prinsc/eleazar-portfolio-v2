<script>
	import Nav from './lib/Nav.svelte';
	import Footer from './lib/Footer.svelte';
	import Grain from './lib/Grain.svelte';
	import AlerteBanner from './lib/AlerteBanner.svelte';

	let { data, children } = $props();
	const layout = $derived(data?.layout ?? null);
	const infos = $derived(layout?.infos ?? null);
	const horaires = $derived(layout?.horaires ?? null);
	const socials = $derived(layout?.socials ?? null);
	const cta = $derived(layout?.cta ?? null);
	const alerte = $derived(layout?.alerte ?? null);
	const seo = $derived(layout?.seo ?? null);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&family=Work+Sans:wght@300;400;500;600&family=Fira+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
	<title>{seo?.titleDefault ?? 'La Tour des Légendes'} — Brasserie & Maison des Géants</title>
	<meta name="description" content={seo?.description?.slice(0, 160) ?? 'La Tour des Légendes — folklore, terroir, brasserie moderne à Ath.'} />
	<meta property="og:type" content="restaurant" />
	<meta property="og:title" content={seo?.titleDefault ?? 'La Tour des Légendes'} />
	<meta property="og:description" content={seo?.description?.slice(0, 200) ?? ''} />
	<meta property="og:locale" content={seo?.locale ?? 'fr_BE'} />
</svelte:head>

<Grain />

<div class="app">
	{#if alerte?.alerteOuverture?.actif}
		<AlerteBanner message={alerte.alerteOuverture.message} />
	{/if}
	<Nav {infos} {cta} />
	<main>
		{@render children()}
	</main>
	<Footer {infos} {socials} {horaires} {cta} />
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
	}
	:global(html) {
		scroll-behavior: smooth;
	}
	:global(body) {
		--base: #f4f4f6;
		--base-deep: #ecebef;
		--base-warm: #efeae3;
		--ink: #0b0b0c;
		--ink-soft: #1d1c20;
		--ink-mute: #555158;
		--accent: #ad6bb2;
		--accent-deep: #6e3974;
		--accent-soft: #e6d3e8;
		--gold: #ffd447;
		--gold-deep: #d9a800;
		--rule: rgba(11, 11, 12, 0.16);
		--rule-strong: rgba(11, 11, 12, 0.4);

		--f-display: 'Playfair Display', 'Times New Roman', serif;
		--f-sans: 'Work Sans', system-ui, -apple-system, sans-serif;
		--f-mono: 'Fira Mono', ui-monospace, Menlo, monospace;

		font-family: var(--f-sans);
		color: var(--ink);
		background: var(--base);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 16px;
		line-height: 1.5;
	}
	:global(*, *::before, *::after) { box-sizing: border-box; }
	:global(img) { max-width: 100%; display: block; }
	:global(a) { color: inherit; text-decoration: none; }
	:global(button) { font-family: inherit; cursor: pointer; }
	:global(::selection) {
		background: var(--accent);
		color: var(--base);
	}
	:global(:focus-visible) {
		outline: 2px solid var(--accent);
		outline-offset: 3px;
		border-radius: 2px;
	}
	:global(h1, h2, h3, h4, h5, h6) {
		font-family: var(--f-display);
		font-weight: 500;
		margin: 0;
		letter-spacing: -0.01em;
	}
	:global(p) { margin: 0; }
	:global(ul, ol) { padding: 0; margin: 0; list-style: none; }

	.app {
		min-height: 100vh;
		position: relative;
		isolation: isolate;
	}
	main {
		position: relative;
		z-index: 1;
	}
</style>
