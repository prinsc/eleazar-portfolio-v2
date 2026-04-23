<script>
	import Hero from './lib/Hero.svelte';
	import Prestations from './lib/Prestations.svelte';
	import Tonnelle from './lib/Tonnelle.svelte';
	import ChambreHote from './lib/ChambreHote.svelte';
	import Partenaires from './lib/Partenaires.svelte';
	import Contact from './lib/Contact.svelte';
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
			seo: raw.seo?.data ?? raw.seo ?? null,
			socials: raw.socials?.data ?? raw.socials ?? null,
			hero: raw.hero?.data ?? raw.hero ?? null,
			galerie: Array.isArray(raw.galerie) ? raw.galerie : null,
			partenaires: Array.isArray(raw.partenaires) ? raw.partenaires : null,
			sono: raw.sono_parametres?.data ?? raw.sonorisation?.parametres ?? null,
			prestations: raw.sonorisation?.prestations ?? null,
			cta: raw.sono_cta?.data ?? raw.sonorisation?.cta ?? null
		};
	}

	const d = $derived(resolved ?? {});
</script>

<svelte:head>
	<title>{d.seo?.titleDefault ?? 'MJM Sonorisation - Son, lumière, animation à Ostiches'}</title>
	<meta
		name="description"
		content={d.seo?.description ??
			"Prestataire son, lumière et animation pour mariages, anniversaires et événements dans le Hainaut. 30 ans d'expérience."}
	/>
</svelte:head>

{#if !resolved && !failed}
	<Skeleton variant="home" />
{:else}
	<Hero infos={d.infos} sono={d.sono} heroImage={d.hero?.image} />
	<Prestations prestations={d.prestations} />
	<Tonnelle />
	<ChambreHote />
	<Partenaires partenaires={d.partenaires} />
	<Contact infos={d.infos} socials={d.socials} cta={d.cta} />
{/if}
