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
		href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@300;400;500;600;800;900&family=Space+Grotesk:wght@300;400;500;600&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap"
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
		/* Palette régie / console techno - dark industriel */
		--bg: #0a0a0b; /* fond principal */
		--panel: #121214; /* panneau rack */
		--panel-2: #1a1a1e; /* surface secondaire */
		--panel-3: #26262b; /* relief */
		--ink: #f2f2ef; /* texte principal */
		--ink-dim: #8a8a86; /* texte secondaire */
		--ink-mute: #55554f; /* texte tertiaire */
		--rule: rgba(242, 242, 239, 0.08);
		--rule-hot: rgba(242, 242, 239, 0.18);

		--signal: #ff6b1a; /* orange signal / clipping */
		--signal-hot: #ffa066; /* orange clair */
		--signal-deep: #b34712; /* orange profond */
		--led: #22c55e; /* vert LED ON AIR */
		--led-dim: #166534;
		--amber: #f59e0b; /* warning */
		--cobalt: #3b82f6; /* data link */

		--f-display: 'Archivo Black', 'Archivo', 'Helvetica Neue', sans-serif;
		--f-body: 'Space Grotesk', 'Helvetica Neue', system-ui, sans-serif;
		--f-mono: 'IBM Plex Mono', ui-monospace, Menlo, monospace;
		--f-num: 'Archivo', 'Helvetica Neue', sans-serif;

		background: var(--bg);
		color: var(--ink);
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
		background: var(--signal);
		color: var(--bg);
	}

	.app {
		position: relative;
		min-height: 100vh;
		overflow-x: hidden;
	}

	/* Scanline globale - ambiance écran CRT console */
	.app::before {
		content: '';
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 1;
		background: repeating-linear-gradient(
			0deg,
			transparent 0,
			transparent 2px,
			rgba(242, 242, 239, 0.012) 2px,
			rgba(242, 242, 239, 0.012) 3px
		);
	}
</style>
