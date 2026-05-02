<script>
	import Nav from './lib/Nav.svelte';
	import Footer from './lib/Footer.svelte';
	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="q-app">
	<Nav infos={data?.infos} cta={data?.cta} />
	<main>
		{@render children()}
	</main>
	<Footer infos={data?.infos} horaires={data?.horaires} socials={data?.socials} />
</div>

<style lang="scss">
	@use './lib/styles/tokens';
	@use './lib/styles/mixins' as *;

	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		background: var(--q-paper);
		color: var(--q-ink);
		font-family: var(--q-sans);
		font-size: 16px;
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(::selection) {
		background: var(--q-emerald);
		color: var(--q-gold-bright);
	}

	.q-app {
		min-height: 100vh;
		background: var(--q-paper);
		overflow-x: hidden;
	}

	main {
		display: block;
	}
</style>
