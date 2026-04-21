<script>
	import Skeleton from '../../lib/Skeleton.svelte';

	let { data } = $props();
	const infos = $derived(data.infos);
	const p = $derived(data.post);
	const apiReady = $derived(Array.isArray(data.allPosts));

	function formatDate(str) {
		if (!str) return '';
		return new Date(str).toLocaleDateString('fr-BE', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	const related = $derived.by(() => {
		if (!p || !data.allPosts) return [];
		return data.allPosts
			.filter((b) => (b.slug ?? b.id) !== (p.slug ?? p.id) && b.category === p.category)
			.slice(0, 2);
	});

	// Barre de progression de lecture
	let scrollY = $state(0);
	let articleEl = $state(null);
	const readingProgress = $derived.by(() => {
		if (!articleEl || typeof window === 'undefined') return 0;
		const rect = articleEl.getBoundingClientRect();
		const total = articleEl.offsetHeight - window.innerHeight;
		if (total <= 0) return 100;
		const scrolled = -rect.top;
		return Math.min(100, Math.max(0, (scrolled / total) * 100));
	});
</script>

<svelte:head>
	{#if p}
		<title>{p.title ?? p.titre} — {infos?.nom ?? 'Le Café des Délices'}</title>
		<meta name="description" content={p.summary ?? p.resume ?? ''} />
	{:else}
		<title>Article introuvable — {infos?.nom ?? 'Le Café des Délices'}</title>
	{/if}
</svelte:head>

<svelte:window bind:scrollY />

{#if !apiReady}
	<Skeleton variant="post" />
{:else if p}
	<!-- Barre de progression -->
	<div class="progress-bar" style="width: {readingProgress}%"></div>

	<article class="post" bind:this={articleEl}>

		<!-- HERO PLEIN ÉCRAN -->
		<div class="post-hero">
			{#if p.image}
				<!-- Image à remplacer par le client -->
				<img class="post-hero__img" src={p.image} alt={p.title ?? p.titre} loading="eager" />
			{/if}
			<div class="post-hero__overlay"></div>

			<div class="post-hero__content">
				<a href="/template/cafe-des-delices/blog" class="back-link">
					<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
						<path d="M19 12H5M11 6l-6 6 6 6" />
					</svg>
					Blog
				</a>

				<div class="post-hero__bottom">
					<div class="post-hero__meta">
						{#if p.category ?? p.categorie}
							<span class="cat-tag">{p.category ?? p.categorie}</span>
						{/if}
						<time class="hero-date">{formatDate(p.date)}</time>
						{#if p.author ?? p.auteur}
							<span class="hero-author">Par {p.author ?? p.auteur}</span>
						{/if}
					</div>
					<h1 class="post-hero__title">{p.title ?? p.titre}</h1>
					{#if p.summary ?? p.resume}
						<p class="post-hero__lede">{p.summary ?? p.resume}</p>
					{/if}
				</div>
			</div>
		</div>

		<!-- CORPS DE L'ARTICLE -->
		<div class="post-body-wrap">
			<div class="post-body">
				{#if p.content ?? p.contenu}
					<p>{p.content ?? p.contenu}</p>
				{/if}
			</div>

			<!-- SIGNATURE -->
			{#if p.author ?? p.auteur}
				<div class="post-signature">
					<span class="post-signature__rule"></span>
					<span class="post-signature__name">Par {p.author ?? p.auteur}</span>
				</div>
			{/if}
		</div>

		<!-- ARTICLES LIÉS -->
		{#if related.length > 0}
			<aside class="post-related">
				<div class="post-related__header">
					<span class="related-rule"></span>
					<h2 class="post-related__title">Dans la même <em>veine</em></h2>
				</div>
				<div class="related-grid">
					{#each related as rel}
						<a href="/template/cafe-des-delices/blog/{rel.slug}" class="related-card">
							{#if rel.image}
								<div class="related-card__fig">
									<!-- Image à remplacer par le client -->
									<img src={rel.image} alt={rel.title ?? rel.titre} loading="lazy" />
								</div>
							{/if}
							<div class="related-card__body">
								<time class="related-card__date">{formatDate(rel.date)}</time>
								<h3 class="related-card__title">{rel.title ?? rel.titre}</h3>
								<span class="related-card__read">Lire →</span>
							</div>
						</a>
					{/each}
				</div>
			</aside>
		{/if}

	</article>

{:else}
	<div class="post-notfound">
		<div class="post-notfound__inner">
			<span class="post-notfound__code">404</span>
			<h1>Article introuvable</h1>
			<p>Cet article n'existe pas ou a été supprimé.</p>
			<a href="/template/cafe-des-delices/blog" class="back-link back-link--dark">
				<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
					<path d="M19 12H5M11 6l-6 6 6 6" />
				</svg>
				Retour au blog
			</a>
		</div>
	</div>
{/if}

<style lang="scss">
	@use '../../lib/styles/mixins' as *;

	/* ─── PROGRESS BAR ─── */
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		height: 2px;
		background: var(--ember);
		z-index: 100;
		transition: width 0.1s linear;
		pointer-events: none;
	}

	/* ─── BACK LINK ─── */
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		text-decoration: none;
		color: rgba(241, 234, 216, 0.55);
		transition: color 0.2s ease;

		&:hover {
			color: var(--cream);
		}

		&--dark {
			color: var(--slate-soft);
			&:hover { color: var(--ember); }
		}
	}

	/* ─── HERO ─── */
	.post-hero {
		position: relative;
		min-height: 70vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: var(--slate);
		overflow: hidden;

		@include breakpoint('medium') {
			min-height: 80vh;
		}
	}

	.post-hero__img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(15%) contrast(1.05);
	}

	.post-hero__overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(20, 16, 13, 0.96) 0%,
			rgba(20, 16, 13, 0.6) 45%,
			rgba(20, 16, 13, 0.15) 100%
		);
	}

	.post-hero__content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		padding: 2rem 1.5rem;
		min-height: 70vh;

		@include breakpoint('medium') {
			padding: 2.5rem 3rem;
			min-height: 80vh;
		}
	}

	.post-hero__bottom {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 820px;
	}

	.post-hero__meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.cat-tag {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		background: var(--ember);
		color: var(--cream);
		padding: 0.2em 0.7em;
	}

	.hero-date {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: rgba(241, 234, 216, 0.45);
	}

	.hero-author {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(241, 234, 216, 0.3);
	}

	.post-hero__title {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2rem, 5.5vw, 4rem);
		letter-spacing: -0.04em;
		line-height: 1;
		color: var(--cream);
		margin: 0;
	}

	.post-hero__lede {
		font-family: var(--f-display);
		font-size: clamp(1rem, 1.8vw, 1.2rem);
		line-height: 1.55;
		color: rgba(241, 234, 216, 0.65);
		margin: 0;
		max-width: 600px;
		border-left: 2px solid var(--ember);
		padding-left: 1.25rem;
	}

	/* ─── CORPS ─── */
	.post-body-wrap {
		max-width: 680px;
		margin: 0 auto;
		padding: 4rem 1.5rem 5rem;

		@include breakpoint('medium') {
			padding: 5rem 2rem 6rem;
		}
	}

	.post-body {
		font-family: var(--f-display);
		font-size: clamp(1rem, 1.5vw, 1.1rem);
		line-height: 1.8;
		color: var(--slate);

		p {
			margin: 0 0 1.6em;
			&:last-child { margin-bottom: 0; }
		}
	}

	.post-signature {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		margin-top: 3.5rem;
		padding-top: 2rem;
		border-top: 1px solid var(--rule);
	}

	.post-signature__rule {
		display: block;
		width: 2rem;
		height: 1px;
		background: var(--ember);
		flex-shrink: 0;
	}

	.post-signature__name {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}

	/* ─── ARTICLES LIÉS ─── */
	.post-related {
		border-top: 1px solid var(--rule);
		padding: 4rem 1.5rem 6rem;

		@include breakpoint('medium') {
			padding: 5rem 3rem 7rem;
		}
	}

	.post-related__header {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		margin-bottom: 3rem;
	}

	.related-rule {
		display: block;
		width: 2rem;
		height: 1px;
		background: var(--rule);
		flex-shrink: 0;
	}

	.post-related__title {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(1.4rem, 2.5vw, 2rem);
		letter-spacing: -0.03em;
		margin: 0;
		color: var(--slate);

		em {
			font-family: var(--f-italic);
			font-style: italic;
			color: var(--ember);
		}
	}

	.related-grid {
		display: grid;
		grid-template-columns: 1fr;
		border-top: 1px solid var(--rule);
		border-left: 1px solid var(--rule);

		@include breakpoint('medium') {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.related-card {
		text-decoration: none;
		color: var(--slate);
		display: flex;
		flex-direction: column;
		border-right: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
		transition: background 0.2s ease;

		&:hover .related-card__fig img {
			transform: scale(1.05);
		}

		&:hover .related-card__title {
			color: var(--ember);
		}

		&:hover .related-card__read {
			letter-spacing: 0.22em;
		}
	}

	.related-card__fig {
		overflow: hidden;
		aspect-ratio: 16 / 9;
		flex-shrink: 0;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(10%) contrast(1.04);
			transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		}
	}

	.related-card__body {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 1.5rem;
		flex: 1;
	}

	.related-card__date {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ember);
	}

	.related-card__title {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 1.05rem;
		letter-spacing: -0.02em;
		line-height: 1.25;
		margin: 0;
		transition: color 0.2s ease;
	}

	.related-card__read {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin-top: auto;
		padding-top: 0.75rem;
		transition: letter-spacing 0.25s ease;
	}

	/* ─── 404 ─── */
	.post-notfound {
		min-height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
	}

	.post-notfound__inner {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.post-notfound__code {
		font-family: var(--f-display);
		font-size: clamp(4rem, 12vw, 8rem);
		font-weight: 300;
		letter-spacing: -0.05em;
		color: var(--rule);
		line-height: 1;
	}

	.post-notfound__inner h1 {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(1.5rem, 3vw, 2.5rem);
		letter-spacing: -0.02em;
		margin: 0;
		color: var(--slate);
	}

	.post-notfound__inner p {
		font-family: var(--f-display);
		color: var(--slate-soft);
		margin: 0;
	}
</style>
