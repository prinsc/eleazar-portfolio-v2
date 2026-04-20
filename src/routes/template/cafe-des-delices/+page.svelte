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
	import { poles as polesStatic, galerie as galerieStatic, infos as infosStatic } from './lib/data.js';

	let { data } = $props();

	// Normalise la réponse API : supporte { sections: { infos: { data } } } ou objet plat
	function normalise(raw) {
		if (!raw) return {};
		const sections = raw.sections ?? raw;
		return {
			infos:    sections.infos?.data    ?? sections.infos    ?? null,
			poles:    sections.poles?.data    ?? sections.poles    ?? null,
			galerie:  sections.galerie?.data  ?? sections.galerie  ?? null,
			horaires: sections.horaires?.data ?? sections.horaires ?? null,
		};
	}
</script>

<svelte:head>
	<title>Le Café des Délices - Grand Place 8, 7800 Ath</title>
	<meta
		name="description"
		content="Restaurant Le Café des Délices à Ath. Grillades, bières belges d'exception, terrasse sur la Grand Place."
	/>
</svelte:head>

<!--
	Hero s'affiche IMMÉDIATEMENT avec données locales.
	Il gère lui-même sa visibilité via CSS + GSAP (visibility: hidden → visible)
	pour éviter tout flash avant que les animations soient prêtes.
-->
<Hero infos={infosStatic} />

<!--
	Le reste de la page attend les données API.
	Pendant ce temps : fond cream, le hero anime déjà.
	En cas d'erreur : fallback sur données locales.
-->
{#await data.streamed}
	<!-- Sections sous le fold — vide pendant le chargement (invisible sous le hero) -->

{:then apiData}
	{@const d = normalise(apiData)}
	{@const poles   = d.poles   ?? polesStatic}
	{@const galerie = d.galerie ?? galerieStatic}

	{#each poles as pole, index}
		<Pole
			{pole}
			id={pole.titre.toLowerCase().replace(/\s+/g, '-')}
			layout={pole.layout}
			flip={pole.flip}
			num={index + 1}
		/>
	{/each}

	<MenusPreview />

	<Gallery {galerie} />

	<Avis />

	<Social />

	<Visite horairesAPI={d.horaires} />

{:catch}
	<!-- Erreur API : fallback statique complet -->
	{#each polesStatic as pole, index}
		<Pole
			{pole}
			id={pole.titre.toLowerCase().replace(/\s+/g, '-')}
			layout={pole.layout}
			flip={pole.flip}
			num={index + 1}
		/>
	{/each}

	<MenusPreview />

	<Gallery galerie={galerieStatic} />

	<Avis />

	<Social />

	<Visite />
{/await}
