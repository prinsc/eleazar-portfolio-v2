<script>
	import PageHeader from '../lib/PageHeader.svelte';
	import Blog from '../lib/Blog.svelte';
	import Actualites from '../lib/Actualites.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Journal — La Tour des Légendes</title>
	<meta name="description" content="Récits, chroniques, actualités de la Tour des Légendes." />
</svelte:head>

<PageHeader
	num="06"
	kicker="Journal"
	title="Récits"
	italic="& chroniques"
	lead="Histoires de cuisine, de bières, de Géants — et tout ce qu'on a envie de raconter."
/>

<Blog blog={data.blog} full={true} />
{#if data.actualites?.length}
	<Actualites actualites={data.actualites} />
{/if}
