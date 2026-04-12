<script>
	// Layout partagé entre toutes les pages du template Café des Délices.
	// Injecte : fonts, tokens CSS globaux, grain papier, Nav, Footer.
	import Nav from './lib/Nav.svelte';
	import Footer from './lib/Footer.svelte';
	import Grain from './lib/Grain.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,800;1,9..144,300;1,9..144,400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Grain />

<div class="app">
	<Nav />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	/* Reset minimal + tokens globaux pour TOUT le template.
	   Les enfants héritent de ces variables CSS. */
	:global(html, body) {
		margin: 0;
		padding: 0;
	}
	:global(body) {
		--ember: #a23a16; /* braise / accent principal - 4.8:1 on cream */
		--amber: #96702e; /* cuivre / bière - 4.6:1 on cream */
		--cream: #f1ead8; /* fond chaud */
		--cream-deep: #e6dcc2;
		--slate: #14100d; /* noir ardoise */
		--slate-soft: #3a332c;
		--rule: rgba(20, 16, 13, 0.16);

		--f-display: 'Fraunces', 'Times New Roman', serif;
		--f-italic: 'Instrument Serif', 'Fraunces', serif;
		--f-mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;

		background: var(--cream);
		color: var(--slate);
		font-family: var(--f-display);
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
	}
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}
	:global(a) {
		color: inherit;
	}

	.app {
		position: relative;
		min-height: 100vh;
		overflow-x: hidden;
	}
</style>
