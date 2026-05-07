<script>
	import PageHeader from '../lib/PageHeader.svelte';
	import Galerie from '../lib/Galerie.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Galerie — La Tour des Légendes</title>
	<meta name="description" content="Le lieu en images." />
</svelte:head>

<PageHeader
	num="05"
	kicker="Galerie"
	title="Le lieu,"
	italic="en fragments"
	lead="Détails, ambiances, recettes — petite anthologie visuelle de la Tour."
/>

<Galerie galerie={data.galerie} full={true} />
