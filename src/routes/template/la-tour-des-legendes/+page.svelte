<script>
	import { onMount } from 'svelte';
	import Hero from './lib/Hero.svelte';
	import Poles from './lib/Poles.svelte';
	import Carte from './lib/Carte.svelte';
	import Menus from './lib/Menus.svelte';
	import Galerie from './lib/Galerie.svelte';
	import Avis from './lib/Avis.svelte';
	import Evenements from './lib/Evenements.svelte';
	import Actualites from './lib/Actualites.svelte';
	import Blog from './lib/Blog.svelte';
	import Horaires from './lib/Horaires.svelte';
	import Cta from './lib/Cta.svelte';
	import Partenaires from './lib/Partenaires.svelte';
	import Skeleton from './lib/Skeleton.svelte';

	let { data } = $props();

	let resolved = $state(null);
	$effect(() => {
		if (data?.streamed) {
			Promise.resolve(data.streamed).then(r => (resolved = r));
		}
	});

	const layout = $derived(data?.layout ?? null);
	const infos = $derived(layout?.infos ?? resolved?.infos?.data ?? null);
	const horaires = $derived(layout?.horaires ?? resolved?.horaires?.data ?? null);
	const cta = $derived(layout?.cta ?? resolved?.cta?.data ?? null);
	const hero = $derived(resolved?.hero?.data ?? null);
	const poles = $derived(Array.isArray(resolved?.poles) ? resolved.poles : (resolved?.poles?.data ?? []));
	const carte = $derived(resolved?.carte ?? null);
	const menus = $derived(Array.isArray(resolved?.menus) ? resolved.menus : []);
	const galerie = $derived(Array.isArray(resolved?.galerie) ? resolved.galerie : []);
	const avis = $derived(resolved?.avis?.data ?? null);
	const evenements = $derived(Array.isArray(resolved?.evenements) ? resolved.evenements : []);
	const actualites = $derived(Array.isArray(resolved?.actualites) ? resolved.actualites : []);
	const blog = $derived(Array.isArray(resolved?.blog) ? resolved.blog : []);
	const partenaires = $derived(Array.isArray(resolved?.partenaires) ? resolved.partenaires : []);
	const seo = $derived(layout?.seo ?? resolved?.seo?.data ?? null);

	const jsonLd = $derived(infos ? {
		'@context': 'https://schema.org',
		'@type': 'Restaurant',
		name: infos.nom || 'La Tour des Légendes',
		address: {
			'@type': 'PostalAddress',
			addressLocality: infos.ville || 'Ath',
			addressCountry: infos.pays || 'BE',
			streetAddress: infos.adresseComplete || ''
		},
		telephone: infos.telephone || '',
		email: infos.email || '',
		servesCuisine: 'Belge, Terroir',
		priceRange: '€€',
		image: hero?.image || '',
		description: seo?.description?.slice(0, 250) || ''
	} : null);
</script>

<svelte:head>
	{#if jsonLd}
		{@html '<script type="application/ld+json">' + JSON.stringify(jsonLd) + '</' + 'script>'}
	{/if}
</svelte:head>

{#if !resolved}
	<Skeleton variant="page" />
{:else}
	<Hero {hero} {infos} />
	{#if poles?.length}<Poles {poles} />{/if}
	{#if carte?.categories?.length}<Carte {carte} />{/if}
	{#if menus?.length}<Menus {menus} />{/if}
	{#if galerie?.length}<Galerie {galerie} />{/if}
	{#if avis?.avis?.length}<Avis {avis} />{/if}
	{#if evenements?.length}<Evenements {evenements} />{/if}
	{#if actualites?.length}<Actualites {actualites} />{/if}
	{#if blog?.length}<Blog {blog} />{/if}
	<Horaires horaires={horaires ?? []} {infos} />
	<Cta {cta} {infos} />
	{#if partenaires?.length}<Partenaires {partenaires} />{/if}
{/if}
