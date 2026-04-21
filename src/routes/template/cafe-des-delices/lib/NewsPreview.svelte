<script>
	let { news = [] } = $props();

	function formatDate(str) {
		if (!str) return '';
		return new Date(str).toLocaleDateString('fr-BE', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	const items = $derived(
		[...news]
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, 3)
	);
</script>

{#if items.length > 0}
<section class="news">
	<div class="news__header">
		<span class="news__eyebrow">Actualités</span>
		<h2 class="news__title">
			Ce qu'il<br /><em>se passe</em>
		</h2>
		<a href="/template/cafe-des-delices/actualites" class="news__more">
			Toutes les actualités
			<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5">
				<path d="M5 12h14M13 6l6 6-6 6" />
			</svg>
		</a>
	</div>

	<div class="news__grid">
		{#each items as item, i}
			<article class="news__card" class:news__card--featured={i === 0}>
				{#if item.image}
					<figure class="news__fig">
						<!-- Image à remplacer par le client -->
						<img src={item.image} alt={item.title ?? item.titre} loading="lazy" />
					</figure>
				{/if}
				<div class="news__content">
					<time class="news__date">{formatDate(item.date)}</time>
					<h3 class="news__name">{item.title ?? item.titre}</h3>
					{#if item.summary ?? item.resume}
						<p class="news__summary">{item.summary ?? item.resume}</p>
					{/if}
					<a href="/template/cafe-des-delices/actualites" class="news__link">
						Lire la suite →
					</a>
				</div>
			</article>
		{/each}
	</div>
</section>
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	.news {
		padding: 4rem 1.25rem;
		border-top: 1px solid var(--rule);

		@include breakpoint('medium') {
			padding: 5rem 2rem;
		}
	}

	.news__header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 3rem;

		@include breakpoint('large') {
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
		}
	}

	.news__eyebrow {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--ember);
		margin-bottom: 0.75rem;
	}

	.news__title {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.2rem, 5vw, 3.5rem);
		letter-spacing: -0.03em;
		line-height: 0.9;
		margin: 0 0 1.5rem;

		@include breakpoint('large') { margin-bottom: 0; }

		em {
			font-family: var(--f-italic);
			font-style: italic;
			color: var(--ember);
		}
	}

	.news__more {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate);
		border-bottom: 1px solid var(--slate);
		padding-bottom: 0.3em;
		transition: gap 0.3s ease;

		&:hover { gap: 0.85em; }
	}

	.news__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.news__card {
		display: flex;
		flex-direction: column;
		border-top: 2px solid var(--rule);
		padding-top: 1.25rem;
		transition: border-color 0.3s ease;

		&:hover {
			border-color: var(--ember);
		}

		&--featured {
			@include breakpoint('medium') {
				grid-column: 1;
				grid-row: 1;
			}
		}
	}

	.news__fig {
		margin: 0 0 1rem;
		overflow: hidden;
		aspect-ratio: 16 / 9;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(15%) contrast(1.05);
			transition: transform 0.6s ease;
		}

		.news__card:hover & img {
			transform: scale(1.04);
		}
	}

	.news__content {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 0.5rem;
	}

	.news__date {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ember);
	}

	.news__name {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 1.05rem;
		letter-spacing: -0.01em;
		line-height: 1.25;
		margin: 0;
	}

	.news__summary {
		font-family: var(--f-display);
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--slate-soft);
		margin: 0;
		flex: 1;
	}

	.news__link {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--slate);
		text-decoration: none;
		margin-top: 0.5rem;
		transition: color 0.2s ease;

		&:hover { color: var(--ember); }
	}
</style>
