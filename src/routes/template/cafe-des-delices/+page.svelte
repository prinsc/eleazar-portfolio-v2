<script>
	// Accueil - Le Café des Délices (Ath)
	// Cette page assemble des composants du dossier ./lib/
	// Tout est autonome et local au template.
	import Hero from './lib/Hero.svelte';
	import Pole from './lib/Pole.svelte';
	import MenusPreview from './lib/MenusPreview.svelte';
	import Gallery from './lib/Gallery.svelte';
	import Avis from './lib/Avis.svelte';
	import Social from './lib/Social.svelte';
	import Visite from './lib/Visite.svelte';
	import { poles } from './lib/data.js';

	let { data } = $props();
	console.log('Data reçue du load:', data);
</script>

<svelte:head>
	<title>Le Café des Délices - Grand Place 8, 7800 Ath</title>
	<meta
		name="description"
		content="Restaurant Le Café des Délices à Ath. Grillades, bières belges d'exception, terrasse sur la Grand Place."
	/>
</svelte:head>

<Hero />

{#each data.poles as pole, index}
	<Pole
		{pole}
		id={pole.titre.toLowerCase().replace(/\s+/g, '-')}
		layout={pole.layout}
		flip={pole.flip}
		num={index + 1}
	/>
{/each}

<MenusPreview />

<Gallery />

<Avis />

<Social />

<Visite horairesAPI={data.horaires} />
