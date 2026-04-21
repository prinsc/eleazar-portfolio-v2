<script>
	import Skeleton from '../lib/Skeleton.svelte';

	let { data } = $props();

	const infos = $derived(data.infos);

	function normalisePost(p) {
		return {
			id: p.id ?? Math.random(),
			titre: p.title ?? p.titre ?? '',
			slug: p.slug ?? '',
			categorie: p.category ?? p.categorie ?? '',
			auteur: p.author ?? p.auteur ?? '',
			date: p.date ?? '',
			resume: p.summary ?? p.resume ?? '',
			contenu: p.content ?? p.contenu ?? '',
			image: p.image ?? null
		};
	}

	const posts = $derived(
		data.blog
			? data.blog.map(normalisePost).sort((a, b) => new Date(b.date) - new Date(a.date))
			: null
	);

	const categories = $derived(
		posts ? ['Tout', ...new Set(posts.map((p) => p.categorie).filter(Boolean))] : []
	);

	let activeCategory = $state('Tout');
	const filtered = $derived(
		!posts
			? []
			: activeCategory === 'Tout'
				? posts
				: posts.filter((p) => p.categorie === activeCategory)
	);

	function formatDate(str) {
		if (!str) return '';
		return new Date(str).toLocaleDateString('fr-BE', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function formatDateShort(str) {
		if (!str) return '';
		const d = new Date(str);
		return d.toLocaleDateString('fr-BE', { day: '2-digit', month: '2-digit', year: '2-digit' });
	}
</script>

<svelte:head>
	<title>Blog — {infos?.nom ?? 'Le Café des Délices'}</title>
	<meta name="description" content="Articles et conseils du Café des Délices à Ath." />
</svelte:head>

{#if !posts}
	<Skeleton variant="list" />
{:else}
	<!-- HERO ÉDITORIAL -->
	<section class="blog-masthead">
		<div class="blog-masthead__inner">
			<div class="blog-masthead__label">
				<span class="rule-line"></span>
				<span class="label-text">Chroniques & Récits</span>
			</div>
			<h1 class="blog-masthead__title">
				Le Blog<br /><em>des Délices</em>
			</h1>
			<div class="blog-masthead__meta">
				<span class="count-badge">{posts.length} article{posts.length > 1 ? 's' : ''}</span>
				<a href="/template/cafe-des-delices" class="back-link">
					<svg
						viewBox="0 0 24 24"
						width="12"
						height="12"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						aria-hidden="true"
					>
						<path d="M19 12H5M11 6l-6 6 6 6" />
					</svg>
					Retour
				</a>
			</div>
		</div>
	</section>

	<!-- FILTRES STICKY -->
	{#if categories.length > 2}
		<nav class="filters" aria-label="Filtrer par catégorie">
			<div class="filters__inner">
				{#each categories as cat}
					<button
						class="filter-btn"
						class:filter-btn--active={activeCategory === cat}
						onclick={() => (activeCategory = cat)}
					>
						{cat}
					</button>
				{/each}
			</div>
		</nav>
	{/if}

	<!-- CONTENU -->
	{#if filtered.length > 0}
		<div class="blog-body">
			<!-- ARTICLE VEDETTE (premier quand catégorie = Tout) -->
			{#if activeCategory === 'Tout' && filtered.length > 0}
				{@const featured = filtered[0]}
				<a href="/template/cafe-des-delices/blog/{featured.slug}" class="featured-card">
					{#if featured.image}
						<div class="featured-card__media">
							<!-- Image à remplacer par le client -->
							<img src={featured.image} alt={featured.titre} loading="eager" />
							<div class="featured-card__overlay"></div>
						</div>
					{:else}
						<div class="featured-card__media featured-card__media--no-img">
							<div class="featured-card__overlay"></div>
						</div>
					{/if}

					<div class="featured-card__content">
						<div class="featured-card__top">
							<span class="featured-label">À la une</span>
							{#if featured.categorie}
								<span class="tag tag--light">{featured.categorie}</span>
							{/if}
						</div>
						<div class="featured-card__bottom">
							<h2 class="featured-card__title">{featured.titre}</h2>
							{#if featured.resume}
								<p class="featured-card__resume">{featured.resume}</p>
							{/if}
							<div class="featured-card__foot">
								<span class="featured-card__date">{formatDate(featured.date)}</span>
								<span class="featured-read">
									Lire l'article
									<svg
										viewBox="0 0 24 24"
										width="14"
										height="14"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										aria-hidden="true"
									>
										<path d="M5 12h14M13 6l6 6-6 6" />
									</svg>
								</span>
							</div>
						</div>
					</div>
				</a>

				<!-- GRILLE DES AUTRES ARTICLES -->
				{#if filtered.length > 1}
					<div class="posts-section">
						<div class="posts-section__header">
							<span class="section-rule"></span>
							<span class="section-label">Tous les articles</span>
						</div>
						<div class="posts-grid">
							{#each filtered.slice(1) as post, i}
								<a href="/template/cafe-des-delices/blog/{post.slug}" class="post-card">
									<span class="post-card__num">{String(i + 2).padStart(2, '0')}</span>
									<div class="post-card__main">
										{#if post.image}
											<div class="post-card__thumb">
												<!-- Image à remplacer par le client -->
												<img src={post.image} alt={post.titre} loading="lazy" />
											</div>
										{/if}
										<div class="post-card__body">
											<div class="post-card__meta">
												{#if post.categorie}
													<span class="tag">{post.categorie}</span>
												{/if}
												<time class="post-date">{formatDateShort(post.date)}</time>
											</div>
											<h3 class="post-card__title">{post.titre}</h3>
											{#if post.resume}
												<p class="post-card__resume">{post.resume}</p>
											{/if}
											<div class="post-card__foot">
												{#if post.auteur}
													<span class="post-author">Par {post.auteur}</span>
												{/if}
												<span class="post-read">Lire →</span>
											</div>
										</div>
									</div>
								</a>
							{/each}
						</div>
					</div>
				{/if}

				<!-- VUE FILTRÉE : layout liste éditorial pur -->
			{:else}
				<div class="filtered-list">
					<div class="posts-section__header">
						<span class="section-rule"></span>
						<span class="section-label">{activeCategory}</span>
					</div>
					<div class="posts-grid">
						{#each filtered as post, i}
							<a href="/template/cafe-des-delices/blog/{post.slug}" class="post-card">
								<span class="post-card__num">{String(i + 1).padStart(2, '0')}</span>
								<div class="post-card__main">
									{#if post.image}
										<div class="post-card__thumb">
											<!-- Image à remplacer par le client -->
											<img src={post.image} alt={post.titre} loading="lazy" />
										</div>
									{/if}
									<div class="post-card__body">
										<div class="post-card__meta">
											{#if post.categorie}
												<span class="tag">{post.categorie}</span>
											{/if}
											<time class="post-date">{formatDateShort(post.date)}</time>
										</div>
										<h3 class="post-card__title">{post.titre}</h3>
										{#if post.resume}
											<p class="post-card__resume">{post.resume}</p>
										{/if}
										<div class="post-card__foot">
											{#if post.auteur}
												<span class="post-author">Par {post.auteur}</span>
											{/if}
											<span class="post-read">Lire →</span>
										</div>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<div class="blog-empty">
			<span class="blog-empty__icon">—</span>
			<p>Aucun article dans cette catégorie.</p>
			<button class="blog-empty__reset" onclick={() => (activeCategory = 'Tout')}>
				Voir tous les articles
			</button>
		</div>
	{/if}
{/if}

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	/* ─── MASTHEAD ─── */
	.blog-masthead {
		padding: 4rem 1.25rem 3rem;
		border-bottom: 1px solid var(--rule);
		background: var(--cream);

		@include breakpoint('medium') {
			padding: 5.5rem 2.5rem 4rem;
		}
	}

	.blog-masthead__inner {
		max-width: 900px;
	}

	.blog-masthead__label {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.75rem;
	}

	.rule-line {
		display: block;
		width: 2.5rem;
		height: 1px;
		background: var(--ember);
		flex-shrink: 0;
	}

	.label-text {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--ember);
	}

	.blog-masthead__title {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(3rem, 8vw, 6rem);
		letter-spacing: -0.04em;
		line-height: 0.88;
		margin: 0 0 2rem;
		color: var(--slate);

		em {
			font-family: var(--f-italic);
			font-style: italic;
			color: var(--ember);
			font-weight: 300;
		}
	}

	.blog-masthead__meta {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.count-badge {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
		padding: 0.3em 0.8em;
		border: 1px solid var(--rule);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate-soft);
		transition: color 0.2s ease;

		&:hover {
			color: var(--ember);
		}
	}

	/* ─── FILTRES ─── */
	.filters {
		position: sticky;
		top: 60px;
		z-index: 40;
		background: var(--cream);
		border-bottom: 1px solid var(--rule);

		@include breakpoint('medium') {
			top: 93px;
		}
	}

	.filters__inner {
		display: flex;
		align-items: center;
		gap: 0;
		overflow-x: auto;
		scrollbar-width: none;
		padding: 0 1.25rem;

		@include breakpoint('medium') {
			padding: 0 2.5rem;
		}

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.filter-btn {
		flex-shrink: 0;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		padding: 1rem 1.25rem 0.9rem;
		cursor: pointer;
		color: var(--slate-soft);
		transition:
			color 0.2s ease,
			border-color 0.25s ease;
		white-space: nowrap;

		&:hover {
			color: var(--slate);
		}

		&--active {
			color: var(--ember);
			border-bottom-color: var(--ember);
		}
	}

	/* ─── BLOG BODY ─── */
	.blog-body {
		padding-bottom: 6rem;
	}

	/* ─── FEATURED CARD ─── */
	.featured-card {
		display: block;
		position: relative;
		text-decoration: none;
		overflow: hidden;
		// aspect-ratio: 21 / 9;
		// min-height: 320px;
		height: 75dvh;
		background: var(--slate);

		@include breakpoint('medium') {
			min-height: 420px;
		}

		&:hover .featured-card__media img {
			transform: scale(1.04);
		}

		&:hover .featured-read svg {
			transform: translateX(4px);
		}
	}

	.featured-card__media {
		position: absolute;
		inset: 0;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(15%) contrast(1.05);
			transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		}

		&--no-img {
			background: var(--slate);
		}
	}

	.featured-card__overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(28, 24, 18, 0.92) 0%,
			rgba(28, 24, 18, 0.55) 45%,
			rgba(28, 24, 18, 0.1) 100%
		);
	}

	.featured-card__content {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1.75rem 1.5rem;

		@include breakpoint('medium') {
			padding: 2.5rem 3rem;
		}
	}

	.featured-card__top {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.featured-label {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--ember-light);
	}

	.tag {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		background: var(--ember);
		color: var(--cream);
		padding: 0.2em 0.65em;

		&--light {
			background: rgba(241, 234, 216, 0.15);
			color: rgba(241, 234, 216, 0.8);
			border: 1px solid rgba(241, 234, 216, 0.2);
		}
	}

	.featured-card__bottom {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.featured-card__title {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(1.6rem, 4vw, 3rem);
		letter-spacing: -0.03em;
		line-height: 1.05;
		color: var(--cream);
		margin: 0;
		max-width: 680px;
	}

	.featured-card__resume {
		font-family: var(--f-display);
		font-size: clamp(0.85rem, 1.5vw, 1rem);
		line-height: 1.5;
		color: rgba(241, 234, 216, 0.65);
		margin: 0;
		max-width: 560px;
		display: none;

		@include breakpoint('medium') {
			display: block;
		}
	}

	.featured-card__foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.5rem;
	}

	.featured-card__date {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: rgba(241, 234, 216, 0.4);
	}

	.featured-read {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--cream);
		padding: 0.65em 1.25em;
		border: 1px solid rgba(241, 234, 216, 0.3);
		transition:
			background 0.3s ease,
			border-color 0.3s ease;

		svg {
			transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
			flex-shrink: 0;
		}

		.featured-card:hover & {
			background: var(--ember);
			border-color: var(--ember);
		}
	}

	/* ─── POSTS SECTION ─── */
	.posts-section {
		padding: 3rem 1.25rem 0;

		@include breakpoint('medium') {
			padding: 4rem 2.5rem 0;
		}
	}

	.filtered-list {
		padding: 2.5rem 1.25rem 0;

		@include breakpoint('medium') {
			padding: 3rem 2.5rem 0;
		}
	}

	.posts-section__header {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		margin-bottom: 2.5rem;
	}

	.section-rule {
		display: block;
		width: 2rem;
		height: 1px;
		background: var(--rule);
		flex-shrink: 0;
	}

	.section-label {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}

	/* ─── POSTS GRID ─── */
	.posts-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		border-top: 1px solid var(--rule);

		@include breakpoint('medium') {
			grid-template-columns: repeat(2, 1fr);
			border-left: 1px solid var(--rule);
			border-top: 1px solid var(--rule);
		}

		@include breakpoint('large') {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* ─── POST CARD ─── */
	.post-card {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: 0;
		text-decoration: none;
		color: var(--slate);
		padding: 2rem 0;
		border-bottom: 1px solid var(--rule);
		transition: background 0.2s ease;

		@include breakpoint('medium') {
			grid-template-columns: 1fr;
			padding: 2rem;
			border-right: 1px solid var(--rule);
			border-bottom: 1px solid var(--rule);
		}

		&:hover .post-card__thumb img {
			transform: scale(1.05);
		}

		&:hover .post-read {
			letter-spacing: 0.22em;
		}
	}

	.post-card__num {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		color: var(--rule);
		padding-top: 0.15rem;
		flex-shrink: 0;

		@include breakpoint('medium') {
			display: block;
			margin-bottom: 1.25rem;
			padding-top: 0;
			color: var(--slate-soft);
		}
	}

	.post-card__main {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.post-card__thumb {
		overflow: hidden;
		aspect-ratio: 16 / 9;
		display: none;

		@include breakpoint('medium') {
			display: block;
		}

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(10%) contrast(1.05);
			transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		}
	}

	.post-card__body {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.post-card__meta {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		flex-wrap: wrap;
	}

	.post-date {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}

	.post-card__title {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: clamp(1rem, 1.8vw, 1.35rem);
		letter-spacing: -0.02em;
		line-height: 1.2;
		margin: 0.25rem 0 0;
		color: var(--slate);
		transition: color 0.2s ease;

		.post-card:hover & {
			color: var(--ember);
		}
	}

	.post-card__resume {
		font-family: var(--f-display);
		font-size: 0.875rem;
		line-height: 1.55;
		color: var(--slate-soft);
		margin: 0;
		@include clamp-lines(2);
	}

	.post-card__foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.5rem;
	}

	.post-author {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}

	.post-read {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ember);
		transition: letter-spacing 0.25s ease;
	}

	/* ─── EMPTY ─── */
	.blog-empty {
		padding: 6rem 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.blog-empty__icon {
		font-family: var(--f-display);
		font-size: 2rem;
		color: var(--rule);
		line-height: 1;
	}

	.blog-empty p {
		font-family: var(--f-display);
		font-size: 1rem;
		color: var(--slate-soft);
		margin: 0;
	}

	.blog-empty__reset {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		background: none;
		border: 1px solid var(--slate);
		padding: 0.7em 1.5em;
		cursor: pointer;
		color: var(--slate);
		transition: all 0.25s ease;

		&:hover {
			background: var(--slate);
			color: var(--cream);
		}
	}
</style>
