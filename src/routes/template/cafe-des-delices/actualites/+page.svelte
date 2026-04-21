<script>
	import Skeleton from '../lib/Skeleton.svelte';

	let { data } = $props();

	const infos = $derived(data.infos);

	function normaliseItem(n) {
		return {
			id:      n.id ?? Math.random(),
			titre:   n.title ?? n.titre ?? '',
			date:    n.date ?? '',
			resume:  n.summary ?? n.resume ?? '',
			contenu: n.content ?? n.contenu ?? '',
			image:   n.image ?? null
		};
	}

	const news = $derived(
		data.news
			? data.news.map(normaliseItem).sort((a, b) => new Date(b.date) - new Date(a.date))
			: null
	);

	function formatDate(str) {
		if (!str) return '';
		return new Date(str).toLocaleDateString('fr-BE', {
			day: 'numeric', month: 'long', year: 'numeric'
		});
	}

	let expanded = $state(null);

	function toggle(id) {
		expanded = expanded === id ? null : id;
	}
</script>

<svelte:head>
	<title>Actualités — {infos?.nom ?? 'Le Café des Délices'}</title>
	<meta name="description" content="Les dernières nouvelles du Café des Délices à Ath." />
</svelte:head>

{#if !news}
	<Skeleton variant="list" />
{:else}
<header class="news-hero">
	<div class="news-hero__inner">
		<span class="eyebrow">Actualités</span>
		<h1 class="news-hero__title">
			Ce qu'il<br /><em>se passe</em>
		</h1>
		<p class="news-hero__sub">
			{news.length} article{news.length > 1 ? 's' : ''}
		</p>
	</div>
	<a href="/template/cafe-des-delices" class="back">
		<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
			<path d="M19 12H5M11 6l-6 6 6 6" />
		</svg>
		Retour
	</a>
</header>

{#if news.length > 0}
<div class="news-list">
	{#each news as item, i}
		<article class="news-item" class:news-item--open={expanded === item.id}>
			<!-- Image optionnelle -->
			{#if item.image}
				<figure class="news-item__fig">
					<!-- Image à remplacer par le client -->
					<img src={item.image} alt={item.titre} loading="lazy" />
				</figure>
			{/if}

			<!-- Contenu -->
			<div class="news-item__body">
				<div class="news-item__meta">
					<time class="news-item__date">{formatDate(item.date)}</time>
					<span class="news-item__num">{String(i + 1).padStart(2, '0')}</span>
				</div>

				<h2 class="news-item__title">{item.titre}</h2>
				<p class="news-item__resume">{item.resume}</p>

				{#if item.contenu}
					<div class="news-item__content" style:display={expanded === item.id ? 'block' : 'none'}>
						<p>{item.contenu}</p>
					</div>
					<button class="news-item__toggle" onclick={() => toggle(item.id)}>
						{expanded === item.id ? 'Réduire' : 'Lire la suite'}
						<svg
							viewBox="0 0 24 24" width="12" height="12"
							fill="none" stroke="currentColor" stroke-width="1.5"
							style:transform={expanded === item.id ? 'rotate(180deg)' : 'none'}
							style:transition="transform 0.3s ease"
						>
							<path d="M6 9l6 6 6-6" />
						</svg>
					</button>
				{/if}
			</div>
		</article>
	{/each}
</div>
{:else}
<div class="news-empty">
	<p>Aucune actualité pour le moment.</p>
	<a href="/template/cafe-des-delices" class="news-empty__link">Retour à l'accueil →</a>
</div>
{/if}
{/if}

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	.news-hero {
		padding: 4rem 1.25rem 2.5rem;
		border-bottom: 1px solid var(--rule);
		display: flex;
		flex-direction: column;
		gap: 2rem;

		@include breakpoint('medium') {
			padding: 5rem 2rem 3rem;
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
		}
	}

	.eyebrow {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--ember);
		margin-bottom: 0.75rem;
	}

	.news-hero__title {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		letter-spacing: -0.035em;
		line-height: 0.9;
		margin: 0 0 1rem;

		em {
			font-family: var(--f-italic);
			font-style: italic;
			color: var(--ember);
		}
	}

	.news-hero__sub {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin: 0;
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate-soft);
		transition: color 0.2s ease;
		white-space: nowrap;
		align-self: flex-start;

		@include breakpoint('medium') { align-self: flex-end; }
		&:hover { color: var(--ember); }
	}

	.news-list {
		padding: 0 1.25rem 5rem;

		@include breakpoint('medium') { padding: 0 2rem 6rem; }
	}

	.news-item {
		padding: 3rem 0;
		border-bottom: 1px solid var(--rule);
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;

		@include breakpoint('large') {
			grid-template-columns: 280px 1fr;
			gap: 3rem;
		}

		&:first-child { border-top: 1px solid var(--rule); }
	}

	.news-item__fig {
		margin: 0;
		overflow: hidden;
		aspect-ratio: 16 / 9;

		@include breakpoint('large') {
			aspect-ratio: 4 / 3;
		}

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(10%) contrast(1.05);
			transition: transform 0.6s ease;
		}

		.news-item:hover & img {
			transform: scale(1.03);
		}
	}

	.news-item__meta {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	.news-item__date {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ember);
	}

	.news-item__num {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		color: var(--slate-soft);
		opacity: 0.4;
	}

	.news-item__title {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: clamp(1.3rem, 2.5vw, 1.8rem);
		letter-spacing: -0.02em;
		line-height: 1.15;
		margin: 0 0 0.75rem;
	}

	.news-item__resume {
		font-family: var(--f-display);
		font-size: 1rem;
		line-height: 1.6;
		color: var(--slate-soft);
		margin: 0 0 1rem;
	}

	.news-item__content {
		font-family: var(--f-display);
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--slate);
		margin-bottom: 1rem;
		border-left: 2px solid var(--ember);
		padding-left: 1.25rem;

		p { margin: 0; }
	}

	.news-item__toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		background: none;
		border: none;
		border-bottom: 1px solid var(--slate);
		padding: 0 0 0.2em;
		cursor: pointer;
		color: var(--slate);
		transition: color 0.2s ease;

		&:hover { color: var(--ember); border-color: var(--ember); }
	}

	/* Vide */
	.news-empty {
		padding: 6rem 2rem;
		text-align: center;

		p {
			font-family: var(--f-display);
			font-size: 1rem;
			color: var(--slate-soft);
			margin: 0 0 1.5rem;
		}

		&__link {
			font-family: var(--f-mono);
			font-size: 10px;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--ember);
			text-decoration: none;
			border-bottom: 1px solid var(--ember);
			padding-bottom: 0.2em;
		}
	}
</style>
