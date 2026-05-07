<script>
	import PageHeader from '../lib/PageHeader.svelte';
	import Evenements from '../lib/Evenements.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Événements — La Tour des Légendes</title>
	<meta name="description" content="Tous les événements à venir à la Tour des Légendes." />
</svelte:head>

<PageHeader
	num="07"
	kicker="Agenda"
	title="Tout"
	italic="l'agenda"
	lead="Soirées thématiques, ducasses, marchés, dégustations — l'agenda complet de la Tour."
/>

<Evenements evenements={data.evenements} full={true} />
