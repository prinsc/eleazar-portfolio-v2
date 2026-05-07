<script>
	let { data } = $props();
	const infos = $derived(data?.layout?.infos ?? null);
</script>

<svelte:head>
	<title>Mentions légales — La Tour des Légendes</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<article class="ml">
	<a class="back" href="/template/la-tour-des-legendes">← Retour</a>
	<h1>Mentions <em>légales</em></h1>

	<section>
		<h2>Éditeur</h2>
		<p>{infos?.nom ?? 'La Tour des Légendes'} — {infos?.adresseComplete || `${infos?.ville ?? 'Ath'}, ${infos?.pays ?? 'Belgique'}`}</p>
		{#if infos?.numeroEntreprise}<p>N° d'entreprise&nbsp;: {infos.numeroEntreprise}</p>{/if}
		{#if infos?.email}<p>Contact&nbsp;: <a href={`mailto:${infos.email}`}>{infos.email}</a></p>{/if}
	</section>

	<section>
		<h2>Hébergement</h2>
		<p>Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
	</section>

	<section>
		<h2>Conception</h2>
		<p>Site conçu et développé par <a href="https://kltk.be" target="_blank" rel="noopener">KLTK Studio</a>.</p>
	</section>

	<section>
		<h2>Propriété intellectuelle</h2>
		<p>L'ensemble des contenus (textes, images, identité graphique) sont la propriété exclusive de la Tour des Légendes — toute reproduction est soumise à autorisation préalable.</p>
	</section>

	<section>
		<h2>Données personnelles</h2>
		<p>Aucune donnée personnelle n'est collectée à votre insu. Les formulaires de contact ne sont utilisés que pour répondre à vos demandes — pas de revente, pas de profilage.</p>
	</section>
</article>

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	.ml {
		padding: 5rem 1.25rem 8rem;
		max-width: 700px;
		margin: 0 auto;
		@include breakpoint('medium') { padding: 7rem 2.5rem 10rem; }
	}
	.back {
		display: inline-block;
		font-family: var(--f-mono);
		font-size: 0.74rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent-deep);
		margin-bottom: 3rem;
	}
	h1 {
		font-family: var(--f-display);
		font-size: clamp(2.5rem, 7vw, 5rem);
		line-height: 1;
		margin-bottom: 4rem;
		em { font-style: italic; color: var(--accent); }
	}
	section {
		padding: 2rem 0;
		border-top: 1px solid var(--rule);
	}
	h2 {
		font-family: var(--f-display);
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
	p {
		font-family: var(--f-display);
		font-size: 1rem;
		line-height: 1.6;
		color: var(--ink-soft);
		margin-bottom: 0.5rem;
		a { color: var(--accent-deep); text-decoration: underline; }
	}
</style>
