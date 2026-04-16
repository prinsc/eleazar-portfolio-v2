<script>
	import { galerie } from './data.js';

	// On mobile, show only first N photos to avoid endless scroll
	const MOBILE_INITIAL = 6;
	let showAll = $state(false);

	// Distribute photos into columns, balancing total height.
	// tall ~ ratio 3/4.5 ≈ 0.67 → height unit ~1.5
	// normal ~ ratio 4/3 ≈ 1.33 → height unit ~0.75
	// Place each photo in the shortest column.
	function distribute(items, numCols) {
		const result = Array.from({ length: numCols }, () => []);
		const heights = Array(numCols).fill(0);
		items.forEach((g, i) => {
			const h = g.tall ? 1.5 : 0.75;
			// Find shortest column
			let minIdx = 0;
			for (let c = 1; c < numCols; c++) {
				if (heights[c] < heights[minIdx]) minIdx = c;
			}
			result[minIdx].push({ ...g, idx: i });
			heights[minIdx] += h;
		});
		return result;
	}

	const cols3 = distribute(galerie, 3);
	const cols2 = distribute(galerie, 2);
</script>

<section class="gal">
	<span class="gal__num">04 - Ambiance</span>

	<div class="gal__head">
		<h2 class="gal__title">
			Un lieu qu'on<br />
			<em>ne quitte pas</em><br />
			avant la dernière gorgée.
		</h2>
	</div>

	<!-- Desktop: 3-column masonry -->
	<div class="masonry masonry--desktop">
		{#each cols3 as col}
			<div class="masonry__col">
				{#each col as g}
					<figure class="tile" class:tile--tall={g.tall}>
						<!-- Image à remplacer par le client -->
						<img src={g.src} alt={g.alt} loading="lazy" />
						<figcaption>
							<span class="num">{String(g.idx + 1).padStart(2, '0')}</span>
							<span class="lbl">{g.label}</span>
						</figcaption>
					</figure>
				{/each}
			</div>
		{/each}
	</div>

	<!-- Mobile: 2-column masonry, collapsible -->
	<div class="masonry masonry--mobile">
		{#each cols2 as col}
			<div class="masonry__col">
				{#each col as g}
					<figure
						class="tile"
						class:tile--tall={g.tall}
						class:tile--hidden={!showAll && g.idx >= MOBILE_INITIAL}
					>
						<img src={g.src} alt={g.alt} loading="lazy" />
						<figcaption>
							<span class="num">{String(g.idx + 1).padStart(2, '0')}</span>
							<span class="lbl">{g.label}</span>
						</figcaption>
					</figure>
				{/each}
			</div>
		{/each}

		{#if !showAll && galerie.length > MOBILE_INITIAL}
			<button class="show-more" onclick={() => (showAll = true)}>
				<span>Voir les {galerie.length - MOBILE_INITIAL} autres</span>
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					aria-hidden="true"
				>
					<path d="M12 5v14M6 13l6 6 6-6" />
				</svg>
			</button>
		{/if}
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.gal {
		padding: 5rem 1.25rem;
		border-top: 1px solid var(--rule);
		position: relative;

		@include breakpoint('medium') {
			padding: 7rem 2rem;
		}
	}
	.gal__num {
		position: absolute;
		top: 1.25rem;
		left: 1.25rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);

		@include breakpoint('medium') {
			top: 2rem;
			left: 2rem;
		}
	}
	.gal__head {
		max-width: 1400px;
		margin: 0 auto 3rem;

		@include breakpoint('medium') {
			margin-bottom: 4rem;
		}
	}
	.gal__title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.2rem, 5.5vw, 5rem);
		line-height: 0.95;
		letter-spacing: -0.03em;
		max-width: 20ch;
	}
	.gal__title em {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember);
	}

	/* ── Masonry shared ── */
	.masonry {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		gap: 0.6rem;

		@include breakpoint('medium') {
			gap: 1rem;
		}
	}
	.masonry__col {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;

		@include breakpoint('medium') {
			gap: 1rem;
		}
	}

	/* Desktop = 3 cols, Mobile = 2 cols */
	.masonry--desktop {
		display: none;

		@include breakpoint('medium') {
			display: flex;
		}
	}
	.masonry--mobile {
		display: flex;
		flex-wrap: wrap;

		@include breakpoint('medium') {
			display: none;
		}
	}

	/* ── Tiles ── */
	.tile {
		margin: 0;
		position: relative;
		overflow: hidden;
	}
	.tile img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(10%) contrast(1.05);
		transition:
			transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1),
			filter 0.6s ease;
	}
	.tile:hover img {
		transform: scale(1.06);
		filter: grayscale(0%) contrast(1.08);
	}

	/* Masonry height variation via aspect-ratio */
	.tile--tall {
		aspect-ratio: 3 / 4.5;
	}
	.tile:not(.tile--tall) {
		aspect-ratio: 4 / 3;
	}

	/* Mobile: slightly more compact ratios */
	.masonry--mobile .tile--tall {
		aspect-ratio: 3 / 4;
	}
	.masonry--mobile .tile:not(.tile--tall) {
		aspect-ratio: 1;
	}

	/* Hidden tiles on mobile before "show more" */
	.tile--hidden {
		display: none;
	}

	figcaption {
		position: absolute;
		left: 0.75rem;
		right: 0.75rem;
		bottom: 0.75rem;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--cream);
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);

		@include breakpoint('medium') {
			left: 1rem;
			right: 1rem;
			bottom: 1rem;
			font-size: 10px;
		}
	}

	/* ── Show more button ── */
	.show-more {
		width: 100%;
		flex-basis: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		padding: 1em;
		margin-top: 0.25rem;
		background: none;
		border: 1px solid var(--slate);
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--slate);
		cursor: pointer;
		transition: all 0.3s ease;
	}
	.show-more:hover {
		background: var(--slate);
		color: var(--cream);
	}
</style>
