<script>
	import Nav from './lib/Nav.svelte';
	import Footer from './lib/Footer.svelte';

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="app">
	<Nav />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	:global(html, body) { margin: 0; padding: 0; }
	:global(body) {
		--bg: #121417;
		--surface: #1a1d21;
		--surface-2: #22262b;
		--line: #2a2f35;
		--line-strong: #3a4149;
		--text: #e8e8e8;
		--text-soft: #9aa0a6;
		--text-faint: #6b7075;
		--red: #d94b2a;
		--red-deep: #a63818;
		--green: #6fc97a;

		--f-display: 'Space Grotesk', system-ui, sans-serif;
		--f-body: 'Inter', system-ui, sans-serif;

		background: var(--bg);
		color: var(--text);
		font-family: var(--f-body);
		-webkit-font-smoothing: antialiased;
	}
	:global(*, *::before, *::after) { box-sizing: border-box; }
	:global(a) { color: inherit; }
	:global(::selection) { background: var(--red); color: #fff; }

	.app {
		position: relative;
		min-height: 100vh;
		overflow-x: hidden;
	}
</style>
