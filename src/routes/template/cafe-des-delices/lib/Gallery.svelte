<script>
	import { galerie } from './data.js';
</script>

<section class="gal">
	<span class="gal__num">04 — Ambiance</span>

	<div class="gal__head">
		<h2 class="gal__title">
			Un lieu qu'on<br />
			<em>ne quitte pas</em><br />
			avant la dernière gorgée.
		</h2>
	</div>

	<div class="gal__grid">
		{#each galerie as g, i}
			<figure class="tile" style="--i: {i}">
				<!-- Image à remplacer par le client -->
				<img src={g.src} alt={g.alt} loading="lazy" />
				<figcaption>
					<span class="num">0{i + 1}</span>
					<span class="lbl">{g.label}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
</section>

<style>
	.gal {
		padding: 7rem 2rem;
		border-top: 1px solid var(--rule);
		position: relative;
	}
	.gal__num {
		position: absolute;
		top: 2rem;
		left: 2rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}
	.gal__head {
		max-width: 1400px;
		margin: 0 auto 4rem;
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

	.gal__grid {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1.3fr 1fr 1fr 1.2fr;
		gap: 1rem;
	}
	.tile {
		margin: 0;
		position: relative;
		overflow: hidden;
		aspect-ratio: 3 / 4;
	}
	.tile img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(10%) contrast(1.05);
		transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.6s ease;
	}
	.tile:hover img {
		transform: scale(1.06);
		filter: grayscale(0%) contrast(1.05);
	}
	figcaption {
		position: absolute;
		left: 1rem;
		right: 1rem;
		bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--cream);
		text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
	}
	figcaption .lbl {
		color: var(--cream);
	}

	@media (max-width: 900px) {
		.gal {
			padding: 5rem 1.25rem;
		}
		.gal__num {
			top: 1.25rem;
			left: 1.25rem;
		}
		.gal__grid {
			grid-template-columns: 1fr 1fr;
			gap: 0.75rem;
		}
	}
	@media (max-width: 520px) {
		.gal__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
