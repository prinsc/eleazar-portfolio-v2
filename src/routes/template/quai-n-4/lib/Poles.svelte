<script>
	let { poles = [] } = $props();
</script>

<section class="poles" id="philosophie">
	{#each poles as pole, i}
		<article class="pole" class:flip={i % 2 === 1}>
			<div class="visual">
				<div class="frame">
					<img src={pole.img} alt={pole.imgAlt ?? pole.titre} loading="lazy" />
					<div class="ornament" aria-hidden="true">
						<svg viewBox="0 0 60 60" fill="none">
							<circle cx="30" cy="30" r="29" stroke="currentColor" stroke-width="0.6" />
							<circle cx="30" cy="30" r="22" stroke="currentColor" stroke-width="0.4" />
							<text x="30" y="34" text-anchor="middle" font-family="serif" font-style="italic" font-size="14" fill="currentColor">Q4</text>
						</svg>
					</div>
				</div>
				<span class="badge">{pole.num}</span>
			</div>

			<div class="text">
				<span class="eyebrow">— {pole.sur}</span>
				<h2>{pole.titre}</h2>
				<p>{pole.texte}</p>
				{#if pole.cta?.label}
					<a class="link" href={pole.cta.href ?? '#'}>
						<span>{pole.cta.label}</span>
						<svg width="32" height="8" viewBox="0 0 32 8" fill="none">
							<path d="M0 4 H30 M26 1 L30 4 L26 7" stroke="currentColor" stroke-width="1" />
						</svg>
					</a>
				{/if}
			</div>
		</article>
	{/each}
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.poles {
		padding: 5rem 1.25rem;
		background: var(--q-paper);

		@include breakpoint('large') {
			padding: 8rem 2.5rem;
		}
	}

	.pole {
		max-width: 1200px;
		margin: 0 auto 5rem;
		display: grid;
		gap: 2.5rem;
		grid-template-columns: 1fr;
		align-items: center;

		&:last-child {
			margin-bottom: 0;
		}

		@include breakpoint('large') {
			grid-template-columns: 5fr 6fr;
			gap: 5rem;
			margin-bottom: 9rem;
		}
	}

	.pole.flip {
		@include breakpoint('large') {
			.visual {
				order: 2;
			}
			.text {
				order: 1;
			}
		}
	}

	.visual {
		position: relative;
	}

	.frame {
		position: relative;
		aspect-ratio: 4 / 5;
		overflow: hidden;
		background: var(--q-cream);
		box-shadow: 0 30px 80px -50px rgba(8, 8, 6, 0.4);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: saturate(0.92);
			transition: transform 0.9s ease;
		}

		&:hover img {
			transform: scale(1.04);
		}
	}

	.ornament {
		position: absolute;
		bottom: -28px;
		right: -28px;
		width: 80px;
		height: 80px;
		background: var(--q-paper);
		color: var(--q-gold);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		padding: 6px;
	}

	.badge {
		position: absolute;
		top: -1rem;
		left: 1rem;
		padding: 0.4rem 0.9rem;
		background: var(--q-emerald-deep);
		color: var(--q-gold-bright);
		font-family: var(--q-mono);
		font-size: 0.65rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}

	.text {
		.eyebrow {
			display: block;
			font-family: var(--q-mono);
			font-size: 0.7rem;
			letter-spacing: 0.22em;
			text-transform: uppercase;
			color: var(--q-gold-deep);
			margin-bottom: 1.25rem;
		}

		h2 {
			margin: 0 0 1.5rem;
			font-family: var(--q-display);
			font-weight: 300;
			font-size: clamp(2.25rem, 5vw, 3.6rem);
			line-height: 1;
			letter-spacing: -0.02em;
			color: var(--q-ink);

			@include breakpoint('large') {
				max-width: 12ch;
			}
		}

		p {
			margin: 0 0 2rem;
			font-family: var(--q-serif);
			font-size: 1.1rem;
			line-height: 1.65;
			color: var(--q-ink);
			opacity: 0.82;
			max-width: 50ch;
		}
	}

	.link {
		display: inline-flex;
		align-items: center;
		gap: 0.9rem;
		font-family: var(--q-sans);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--q-emerald-deep);
		padding-bottom: 0.4rem;
		border-bottom: 1px solid var(--q-gold);
		transition: gap 0.3s ease, color 0.3s ease;

		&:hover {
			gap: 1.4rem;
			color: var(--q-gold-deep);
		}
	}
</style>
