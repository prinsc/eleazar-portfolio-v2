<script>
	let { data } = $props();
	const e = $derived(data.ev);
	function fmt(d) {
		try {
			return new Date(d).toLocaleDateString('fr-BE', {
				weekday: 'long',
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			});
		} catch {
			return d;
		}
	}
</script>

<svelte:head>
	<title>{e.title} — La Tour des Légendes</title>
	<meta name="description" content={e.description?.slice(0, 160)} />
	{@html '<script type="application/ld+json">' +
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Event',
			name: e.title,
			startDate: e.date,
			image: e.image,
			description: e.description,
			location: {
				'@type': 'Place',
				name: 'La Tour des Légendes',
				address: { '@type': 'PostalAddress', addressLocality: 'Ath', addressCountry: 'BE' }
			}
		}) +
		'</' +
		'script>'}
</svelte:head>

<article class="ev-page">
	<a class="back" href="/template/la-tour-des-legendes/evenements">← Tous les événements</a>

	<div class="grid">
		<div class="left">
			<p class="kick">— Événement —</p>
			<h1>{e.title}</h1>
			<time class="when">{fmt(e.date)}</time>

			<div class="desc">
				{#each (e.description ?? '').split(/\n+/) as p}
					{#if p.trim()}<p>{p}</p>{/if}
				{/each}
			</div>

			<a class="reserv" href="/template/la-tour-des-legendes/reservation">Réserver une place →</a>
		</div>

		{#if e.image}
			<div class="right">
				<div class="im">
					<img src={e.image} alt={e.title} />
				</div>
			</div>
		{/if}
	</div>
</article>

<style lang="scss">
	@use '../../lib/styles/mixins' as *;

	.ev-page {
		padding: 4rem 1.25rem 8rem;
		max-width: 1200px;
		margin: 0 auto;
		@include breakpoint('medium') {
			padding: 5rem 2.5rem 10rem;
		}
	}
	.back {
		display: inline-block;
		font-family: var(--f-mono);
		font-size: 0.74rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		margin-bottom: 3rem;
		color: var(--accent-deep);
	}
	.grid {
		display: grid;
		gap: 3rem;
		@include breakpoint('large') {
			grid-template-columns: 1.25fr 1fr;
			gap: 4rem;
			align-items: start;
		}
	}
	.kick {
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1rem;
	}
	h1 {
		font-family: var(--f-display);
		font-size: clamp(2.4rem, 6vw, 4.5rem);
		line-height: 1;
		margin-bottom: 1.5rem;
	}
	.when {
		display: inline-block;
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1.4rem;
		color: var(--accent-deep);
		padding: 0.5rem 0;
		border-top: 1px dashed var(--rule-strong);
		border-bottom: 1px dashed var(--rule-strong);
		margin-bottom: 3rem;
	}
	.desc p {
		font-family: var(--f-display);
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 1.2rem;
		color: var(--ink-soft);
	}
	.reserv {
		display: inline-flex;
		gap: 0.6rem;
		margin-top: 2rem;
		padding: 1rem 1.5rem;
		background: var(--ink);
		color: var(--gold);
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		transition: background 0.2s;
		&:hover {
			background: var(--accent-deep);
		}
	}
	.im {
		aspect-ratio: 4 / 5;
		overflow: hidden;
		clip-path: polygon(0 0, 100% 0, 100% 92%, 88% 100%, 0 100%);
		background: var(--ink);
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		@include breakpoint('large') {
			transform: translateY(2rem);
		}
	}
</style>
