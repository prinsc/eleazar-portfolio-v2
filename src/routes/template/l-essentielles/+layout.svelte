<script>
	import { salon } from './lib/data.js';
	import Nav from './lib/components/Nav.svelte';
	import Footer from './lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
	let loaded = $state(false);

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);
		loaded = true;
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
		rel="stylesheet"
	/>
	<title>{salon.name}</title>
	<meta name="description" content="{salon.tagline} — {salon.description}" />
</svelte:head>

<div class="le-site" class:loaded>
	<Nav />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style lang="scss">
	@use './lib/styles/mixins' as *;

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		font-family: 'DM Sans', sans-serif;
		color: #1a1a1a;
		background: #faf8f5;
		overflow-x: hidden;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(::selection) {
		background: rgba(139, 125, 107, 0.2);
		color: #1a1a1a;
	}

	:global(a) {
		text-decoration: none;
		color: inherit;
	}

	:global(img) {
		max-width: 100%;
		display: block;
	}

	/* Scrollbar styling */
	:global(::-webkit-scrollbar) {
		width: 6px;
	}

	:global(::-webkit-scrollbar-track) {
		background: #faf8f5;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: #d4ccc0;
		border-radius: 3px;

		&:hover {
			background: #8b7d6b;
		}
	}

	:global(h1, h2, h3, h4) {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 400;
		line-height: 1.15;
	}

	:global(.reveal) {
		opacity: 0;
		transform: translateY(40px);
		transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
			transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	:global(.reveal.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.le-site {
		opacity: 0;
		transition: opacity 0.6s ease;

		&.loaded {
			opacity: 1;
		}
	}

	main {
		min-height: 100vh;
	}
</style>
