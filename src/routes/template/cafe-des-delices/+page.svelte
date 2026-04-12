<script>
	// Accueil - Le Café des Délices (Ath)
	// Cette page assemble des composants du dossier ./lib/
	// Tout est autonome et local au template.
	import Hero from './lib/Hero.svelte';
	import Pole from './lib/Pole.svelte';
	import MenusPreview from './lib/MenusPreview.svelte';
	import Gallery from './lib/Gallery.svelte';
	import Visite from './lib/Visite.svelte';
	import { poles } from './lib/data.js';
</script>

<svelte:head>
	<title>Le Café des Délices - Grand Place 8, 7800 Ath</title>
	<meta
		name="description"
		content="Restaurant Le Café des Délices à Ath. Grillades, bières belges d'exception, terrasse sur la Grand Place."
	/>
</svelte:head>

<Hero />

<Pole pole={poles[0]} id="grilles" />
<Pole pole={poles[1]} flip={true} id="maltes" />

<MenusPreview />

<Gallery />

<Visite />
