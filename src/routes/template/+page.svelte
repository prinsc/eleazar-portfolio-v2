<script>
	// Styles globaux du site : chargés ici (et non plus dans le root layout)
	// pour que les routes /template/* n'héritent d'AUCUN style du site.
	import '$lib/styles/main.scss';

	import NeuroShader from '@prinsc/svelte-neuro-shader';
	import Nav from '$lib/comp/nav.svelte';
	import { browser } from '$app/environment';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';
	import { Github, Linkedin, Instagram, Mail, ExternalLink } from 'lucide-svelte';
	import Footer from '$lib/comp/footer.svelte';
	import PageContent from '$lib/comp/PageContent.svelte';

	const templates = [
		{ slug: 'warlord', name: 'Warlord' },
		{ slug: 'cafe-des-delices', name: 'Café des Délices' },
		{ slug: 'map-contact', name: 'Carte des contacts' }
	];

	const iconMap = {
		github: Github,
		linkedin: Linkedin,
		instagram: Instagram,
		at: Mail
	};

	// Détecte si on est sur un petit écran (mobile)
	let isSmallScreen = $state(true);

	$effect(() => {
		if (!browser) return;

		const checkScreenSize = () => {
			isSmallScreen = window.innerWidth < 676; // breakpoint small
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);

		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	});

	let color = $state({ r: 0, g: 0, b: 0 });
	let speed = $state(0.0001);
	let scale = $state(6.5);

	// Observe le store `settings`
	$effect(() => {
		const theme = $settings.theme;
		if (!theme) return;

		// IMPORTANT : recréer un nouvel objet
		color = theme === 'dark' ? { r: 1, g: 1, b: 1 } : { r: 0, g: 0, b: 0 };
	});
</script>

{#if browser && !isSmallScreen}
	<div class="neuro">
		<NeuroShader
			baseColor={color}
			timeSpeed={speed}
			initialScale={scale}
			colorTransitionSpeed={0.05}
		/>
	</div>
{/if}

<Nav />
<PageContent>
	<h1>Templates</h1>
	<ul>
		{#each templates as t}
			<li data-sveltekit-preload-data="false">
				<a data-sveltekit-reload href="/template/{t.slug}">{t.name}</a>
			</li>
		{/each}
	</ul>
</PageContent>

<Footer />

<style lang="scss">
	@use '../../lib/styles/themes/mixins' as *;

	.neuro {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		pointer-events: none;
		opacity: 0.1;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100dvw;
			height: 100%;
			background: var(--color-white);
			background: radial-gradient(
				circle,
				var(--color-white) 40%,
				rgba(255, 255, 255, 0) 85%,
				rgba(255, 255, 255, 0) 100%
			);
			pointer-events: none;
		}

		// Cache le neuroshader sur les petits écrans (mobile) pour économiser la performance
		display: none;

		@include breakpoint('small') {
			display: unset;
		}
	}
</style>
