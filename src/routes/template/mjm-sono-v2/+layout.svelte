<script>
	import Nav from './lib/Nav.svelte';
	import Footer from './lib/Footer.svelte';
	import Noise from './lib/Noise.svelte';

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,800;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Noise />

<div class="app">
	<Nav />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
	}
	:global(body) {
		/* Palette brutaliste chic - dark confiance */
		--void: #0b0b0c; /* fond principal, presque noir */
		--coal: #131315; /* bloc secondaire */
		--graphite: #1d1d20; /* cards / surfaces */
		--bone: #ede6d6; /* texte principal chaud */
		--bone-soft: #a9a396; /* texte secondaire */
		--rule: rgba(237, 230, 214, 0.12);
		--rule-strong: rgba(237, 230, 214, 0.22);
		--gold: #c9a96b; /* accent or chaud discret */
		--gold-deep: #8a6a2f; /* ambre profond */
		--signal: #e8c88a; /* highlight, usage parcimonieux */

		--f-display: 'Fraunces', 'Times New Roman', serif;
		--f-body: 'Inter', system-ui, sans-serif;
		--f-mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;

		background: var(--void);
		color: var(--bone);
		font-family: var(--f-body);
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
	}
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}
	:global(a) {
		color: inherit;
	}
	:global(::selection) {
		background: var(--gold);
		color: var(--void);
	}

	.app {
		position: relative;
		min-height: 100vh;
		overflow-x: hidden;
	}
</style>
