<script>
	let { galerie = [] } = $props();
</script>

<section class="galerie" id="galerie">
	<header class="head">
		<span class="eyebrow">— Galerie</span>
		<h2>Le lieu, <em>en images</em></h2>
	</header>

	<div class="grid">
		{#each galerie as img, i}
			<figure class="tile" class:tall={img.tall} style="--i: {i}">
				<img src={img.src} alt={img.alt ?? ''} loading="lazy" />
				<div class="overlay" aria-hidden="true">
					<span class="num">— {String(i + 1).padStart(2, '0')}</span>
					{#if img.alt}<span class="alt">{img.alt}</span>{/if}
				</div>
			</figure>
		{/each}
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.galerie {
		padding: 5rem 1.25rem;
		background: var(--q-cream);

		@include breakpoint('large') {
			padding: 8rem 2.5rem;
		}
	}

	.head {
		max-width: 1300px;
		margin: 0 auto 3rem;

		.eyebrow {
			display: block;
			font-family: var(--q-mono);
			font-size: 0.7rem;
			letter-spacing: 0.24em;
			text-transform: uppercase;
			color: var(--q-gold-deep);
			margin-bottom: 1.5rem;
		}

		h2 {
			margin: 0;
			font-family: var(--q-display);
			font-weight: 300;
			font-size: clamp(2.25rem, 5.5vw, 4rem);
			letter-spacing: -0.02em;
			color: var(--q-ink);

			em {
				font-style: italic;
				color: var(--q-emerald-deep);
			}
		}
	}

	.grid {
		max-width: 1300px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: 180px;
		gap: 0.75rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(3, 1fr);
			grid-auto-rows: 240px;
			gap: 1rem;
		}

		@include breakpoint('large') {
			grid-template-columns: repeat(4, 1fr);
			grid-auto-rows: 280px;
		}
	}

	.tile {
		position: relative;
		margin: 0;
		overflow: hidden;
		grid-row: span 1;
		background: var(--q-beige);

		&.tall {
			grid-row: span 2;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: saturate(0.92);
			transition: transform 0.8s ease, filter 0.4s ease;
		}

		&:hover img {
			transform: scale(1.08);
			filter: saturate(1) brightness(0.85);
		}

		&:hover .overlay {
			opacity: 1;
		}
	}

	.overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 1rem;
		gap: 0.4rem;
		background: linear-gradient(to top, rgba(8, 8, 6, 0.7) 0%, transparent 60%);
		opacity: 0;
		transition: opacity 0.4s ease;
		color: var(--q-cream);

		.num {
			font-family: var(--q-mono);
			font-size: 0.65rem;
			letter-spacing: 0.2em;
			color: var(--q-gold-bright);
		}

		.alt {
			font-family: var(--q-display);
			font-style: italic;
			font-size: 1rem;
		}
	}
</style>
