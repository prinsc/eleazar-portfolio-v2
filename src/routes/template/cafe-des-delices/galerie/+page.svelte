<script>
	import Skeleton from '../lib/Skeleton.svelte';

	let { data } = $props();

	const galerie = $derived(data.galerie);
	const infos = $derived(data.infos);

	// Répartit les images en colonnes masonry (balancer les hauteurs)
	function distribute(items, cols) {
		const result = Array.from({ length: cols }, () => []);
		const heights = Array(cols).fill(0);
		items.forEach((g, i) => {
			const h = g.tall ? 1.5 : 0.75;
			let minIdx = 0;
			for (let c = 1; c < cols; c++) {
				if (heights[c] < heights[minIdx]) minIdx = c;
			}
			result[minIdx].push({ ...g, idx: i });
			heights[minIdx] += h;
		});
		return result;
	}

	// Nombre de colonnes calculé côté client selon la largeur réelle
	let containerWidth = $state(0);
	const numCols = $derived(Math.max(2, Math.floor(containerWidth / 300)));
	const cols = $derived(galerie ? distribute(galerie, numCols) : []);

	// Liste plate pour la lightbox
	const galerieFlat = $derived(galerie ? galerie.map((g, i) => ({ ...g, idx: i })) : []);

	let lightboxIdx = $state(null);
	const lightbox = $derived(lightboxIdx !== null ? galerieFlat[lightboxIdx] : null);

	function open(idx) {
		lightboxIdx = idx;
	}
	function close() {
		lightboxIdx = null;
	}
	function prev() {
		lightboxIdx = (lightboxIdx - 1 + galerieFlat.length) % galerieFlat.length;
	}
	function next() {
		lightboxIdx = (lightboxIdx + 1) % galerieFlat.length;
	}

	function onKeydown(e) {
		if (lightboxIdx === null) return;
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
		if (e.key === 'Escape') close();
	}
</script>

<svelte:head>
	<title>Galerie - {infos?.nom ?? 'Le Café des Délices'}</title>
	<meta name="description" content="Découvrez l'ambiance du Café des Délices à Ath en images." />
</svelte:head>

<svelte:window onkeydown={onKeydown} />

{#if !galerie}
	<Skeleton variant="gallery" />
{:else}
	<!-- HERO -->
	<section class="gal-masthead">
		<div class="gal-masthead__inner">
			<div class="gal-masthead__label">
				<span class="rule-line"></span>
				<span class="label-text">En images</span>
			</div>
			<h1 class="gal-masthead__title">
				Ce que les mots<br /><em>ne disent pas</em>
			</h1>
			<div class="gal-masthead__meta">
				<span class="count-badge">{galerie.length} photo{galerie.length > 1 ? 's' : ''}</span>
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

	<!-- GRILLE MASONRY - colonnes auto ≤ 300px -->
	<div class="gal-grid" bind:clientWidth={containerWidth} style="--cols: {numCols}">
		{#each cols as col}
			<div class="gal-col">
				{#each col as item}
					<button
						class="gal-item"
						onclick={() => open(item.idx)}
						title={item.alt || item.label}
						aria-label={item.alt || item.label || 'Voir la photo'}
					>
						<img
							src={item.src}
							alt={item.alt || item.label || 'Photo Café des Délices'}
							loading="lazy"
							class:tall={item.tall}
						/>
						{#if item.label}
							<span class="gal-item__label">{item.label}</span>
						{/if}
					</button>
				{/each}
			</div>
		{/each}
	</div>

	<!-- LIGHTBOX -->
	{#if lightbox}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="lightbox"
			role="dialog"
			aria-modal="true"
			aria-label="Image en plein écran"
			onclick={close}
		>
			<button class="lightbox__close" onclick={close} aria-label="Fermer">
				<svg
					viewBox="0 0 24 24"
					width="20"
					height="20"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path d="M18 6L6 18M6 6l12 12" />
				</svg>
			</button>

			<button
				class="lightbox__nav lightbox__nav--prev"
				onclick={(e) => {
					e.stopPropagation();
					prev();
				}}
				aria-label="Image précédente"
			>
				<svg
					viewBox="0 0 24 24"
					width="22"
					height="22"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path d="M15 18l-6-6 6-6" />
				</svg>
			</button>

			<img
				src={lightbox.src}
				alt={lightbox.alt || lightbox.label || 'Photo Café des Délices'}
				class="lightbox__img"
				onclick={(e) => e.stopPropagation()}
			/>

			<button
				class="lightbox__nav lightbox__nav--next"
				onclick={(e) => {
					e.stopPropagation();
					next();
				}}
				aria-label="Image suivante"
			>
				<svg
					viewBox="0 0 24 24"
					width="22"
					height="22"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path d="M9 18l6-6-6-6" />
				</svg>
			</button>

			<div class="lightbox__counter">
				{lightboxIdx + 1} / {galerieFlat.length}
			</div>

			{#if lightbox.label}
				<p class="lightbox__caption">{lightbox.label}</p>
			{/if}
		</div>
	{/if}
{/if}

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	/* ─── MASTHEAD ─── */
	.gal-masthead {
		padding: 4rem 1.25rem 3rem;
		background: var(--cream);

		@include breakpoint('medium') {
			padding: 5.5rem 2.5rem 4rem;
		}
	}

	.gal-masthead__inner {
		max-width: 900px;
	}

	.gal-masthead__label {
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

	.gal-masthead__title {
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

	.gal-masthead__meta {
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

	/* ─── GRILLE MASONRY ─── */
	.gal-grid {
		display: grid;
		/* Colonnes calculées côté JS, max 300px chacune */
		grid-template-columns: repeat(var(--cols, 2), 1fr);
		gap: 3px;
		padding: 3px;
		background: var(--cream);
	}

	.gal-col {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	/* ─── ITEM ─── */
	.gal-item {
		display: block;
		position: relative;
		overflow: hidden;
		cursor: zoom-in;
		background: var(--cream-deep);
		border: none;
		padding: 0;
		width: 100%;

		img {
			display: block;
			width: 100%;
			aspect-ratio: 3 / 4;
			object-fit: cover;
			filter: grayscale(8%) contrast(1.04);
			transition:
				transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1),
				filter 0.4s ease;

			&.tall {
				aspect-ratio: 2 / 3;
			}
		}

		&:hover img {
			transform: scale(1.05);
			filter: grayscale(0%) contrast(1.1);
		}

		&__label {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 1.5rem 0.75rem 0.65rem;
			background: linear-gradient(to top, rgba(20, 16, 13, 0.75) 0%, transparent 100%);
			font-family: var(--f-mono);
			font-size: 9px;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--cream);
			opacity: 0;
			transform: translateY(4px);
			transition:
				opacity 0.3s ease,
				transform 0.3s ease;
			text-align: left;
		}

		&:hover &__label {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* ─── LIGHTBOX ─── */
	.lightbox {
		position: fixed;
		inset: 0;
		background: rgba(20, 16, 13, 0.96);
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		cursor: zoom-out;
		animation: fade-in 0.2s ease;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.lightbox__close {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		background: none;
		border: none;
		color: var(--cream);
		cursor: pointer;
		opacity: 0.5;
		transition: opacity 0.2s ease;
		padding: 0.5rem;

		&:hover {
			opacity: 1;
		}
	}

	.lightbox__img {
		max-width: 100%;
		max-height: 90vh;
		object-fit: contain;
		cursor: default;
		animation: scale-in 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	@keyframes scale-in {
		from {
			transform: scale(0.93);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	.lightbox__nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: 1px solid rgba(241, 234, 216, 0.18);
		color: var(--cream);
		cursor: pointer;
		opacity: 0.55;
		padding: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			opacity 0.2s ease,
			border-color 0.2s ease,
			background 0.2s ease;

		&:hover {
			opacity: 1;
			background: rgba(241, 234, 216, 0.08);
			border-color: rgba(241, 234, 216, 0.45);
		}

		&--prev {
			left: 1.25rem;
		}
		&--next {
			right: 1.25rem;
		}
	}

	.lightbox__counter {
		position: absolute;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		color: var(--cream);
		opacity: 0.35;
	}

	.lightbox__caption {
		position: absolute;
		bottom: 1.5rem;
		right: 2rem;
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(241, 234, 216, 0.4);
		margin: 0;
	}
</style>
