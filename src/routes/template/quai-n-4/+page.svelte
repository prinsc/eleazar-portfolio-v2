<script>
	import Hero from './lib/Hero.svelte';
	import Poles from './lib/Poles.svelte';
	import Carte from './lib/Carte.svelte';
	import Menus from './lib/Menus.svelte';
	import Galerie from './lib/Galerie.svelte';
	import Evenements from './lib/Evenements.svelte';
	import Avis from './lib/Avis.svelte';
	import Infos from './lib/Infos.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Quai n°4 — Restaurant gastronomique étoilé · Ath</title>
	<meta name="description" content={data.infos?.description ?? ''} />
</svelte:head>

<Hero infos={data.infos} hero={data.hero} cta={data.cta} />
<Poles poles={data.poles} />
<Carte carte={data.carte} />
<Menus menus={data.menus} cta={data.cta} />
<Galerie galerie={data.galerie} />
<Evenements evenements={data.evenements} />
<Avis avis={data.avis} />
<Infos infos={data.infos} horaires={data.horaires} cta={data.cta} />
