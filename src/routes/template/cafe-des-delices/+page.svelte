<script>
	// Accueil - Le Café des Délices (Ath)
	import Alert from './lib/Alert.svelte';
	import Hero from './lib/Hero.svelte';
	import Pole from './lib/Pole.svelte';
	import MenusPreview from './lib/MenusPreview.svelte';
	import Gallery from './lib/Gallery.svelte';
	import Avis from './lib/Avis.svelte';
	import Social from './lib/Social.svelte';
	import Visite from './lib/Visite.svelte';
	import EventsPreview from './lib/EventsPreview.svelte';
	import NewsPreview from './lib/NewsPreview.svelte';
	import Skeleton from './lib/Skeleton.svelte';

	let { data } = $props();

	let resolved = $state(null);
	let failed = $state(false);

	data.streamed
		?.then((raw) => {
			resolved = normalise(raw);
		})
		.catch(() => {
			failed = true;
		});

	function normalise(raw) {
		if (!raw) return {};
		return {
			infos: raw.infos?.data ?? raw.infos ?? null,
			poles: raw.poles?.data ?? raw.poles ?? null,
			galerie: Array.isArray(raw.galerie) ? raw.galerie : null,
			horaires: raw.horaires?.data ?? raw.horaires ?? null,
			cuisine: raw['horaires-cuisine']?.data ?? raw['horaires-cuisine'] ?? null,
			alerte: raw.alerte?.data ?? raw.alerte ?? null,
			fermetures: raw.fermetures?.data ?? raw.fermetures ?? null,
			cta: raw.cta?.data ?? raw.cta ?? null,
			plat_du_jour: raw.plat_du_jour?.data ?? raw.plat_du_jour ?? null,
			socials: raw.socials?.data ?? raw.socials ?? null,
			avis: raw.avis?.data ?? raw.avis ?? null,
			menus: Array.isArray(raw.menus) ? raw.menus : null,
			carte: raw.carte ?? null,
			events: Array.isArray(raw.events) ? raw.events : null,
			news: Array.isArray(raw.news) ? raw.news : null,
			blog: Array.isArray(raw.blog) ? raw.blog : null,
			seo: raw.seo?.data ?? raw.seo ?? null,
			restaurant_parametres: raw.restaurant_parametres?.data ?? raw.restaurant_parametres ?? null
		};
	}
	const d = $derived(resolved ?? {});
</script>

<svelte:head>
	<title>{d.seo?.titleDefault ?? 'Le Café des Délices - Restaurant & Brasserie à Ath'}</title>
	<meta name="description" content={d.seo?.description ?? ''} />
</svelte:head>

{#if !resolved && !failed}
	<Skeleton variant="home" />
{:else if failed}
	<Skeleton variant="home" />
{:else}
	<Alert alerte={d.alerte} />

	{#if d.infos}
		<Hero
			infos={d.infos}
			platDuJour={d.plat_du_jour}
			horaires={d.horaires}
			restaurant_parametres={d.restaurant_parametres}
		/>
	{:else}
		<Skeleton variant="hero-only" />
	{/if}

	{#if d.poles}
		{#each d.poles as pole, index}
			<Pole
				{pole}
				id={pole.titre?.toLowerCase().replace(/\s+/g, '-')}
				layout={pole.layout}
				flip={pole.flip}
				num={index + 1}
			/>
		{/each}
	{/if}

	{#if d.menus}
		<MenusPreview menus={d.menus} />
	{/if}

	{#if d.events && d.events.length > 0}
		<EventsPreview events={d.events} />
	{/if}

	{#if d.galerie}
		<Gallery galerie={d.galerie} />
	{/if}

	{#if d.news && d.news.length > 0}
		<NewsPreview news={d.news} />
	{/if}

	{#if d.avis}
		<Avis avis={d.avis} />
	{/if}

	{#if d.socials}
		<Social socials={d.socials} />
	{/if}

	<Visite horairesAPI={d.horaires} infos={d.infos} cuisine={d.cuisine} />
{/if}
