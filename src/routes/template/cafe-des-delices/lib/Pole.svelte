<script>
	// Bloc "diptyque" : présente un pôle du lieu (Grillés / Maltés)
	// avec une grande photo, un numéro de section, un titre éditorial et un CTA.
	let { pole, flip = false, id = '' } = $props();
</script>

<section class="pole" class:flip {id}>
	<span class="pole__num">{pole.num} — Un pôle du lieu</span>

	<div class="pole__grid">
		<figure class="pole__photo">
			<!-- Image à remplacer par le client -->
			<img src={pole.img} alt={pole.titre} loading="lazy" />
		</figure>

		<div class="pole__body">
			<h2 class="pole__title">
				<span class="sur">{pole.sur}</span>
				<em class="it">{pole.titre}</em>
			</h2>
			<p class="pole__text">{pole.texte}</p>
			<a class="pole__cta" href={pole.cta.href}>
				<span>{pole.cta.label}</span>
				<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M5 12h14M13 6l6 6-6 6" />
				</svg>
			</a>
		</div>
	</div>
</section>

<style>
	.pole {
		padding: 7rem 2rem;
		border-top: 1px solid var(--rule);
		position: relative;
	}
	.pole__num {
		position: absolute;
		top: 2rem;
		left: 2rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}

	.pole__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 5rem;
		max-width: 1400px;
		margin: 0 auto;
		align-items: center;
	}
	.pole.flip .pole__grid {
		direction: rtl;
	}
	.pole.flip .pole__body {
		direction: ltr;
	}

	.pole__photo {
		margin: 0;
		overflow: hidden;
	}
	.pole__photo img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		filter: grayscale(12%) contrast(1.05);
		transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.pole__photo:hover img {
		transform: scale(1.03);
	}

	.pole__title {
		margin: 0 0 1.5rem;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.5rem, 6vw, 5.5rem);
		line-height: 0.9;
		letter-spacing: -0.035em;
	}
	.pole__title .sur {
		display: block;
		color: var(--slate);
	}
	.pole__title .it {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember);
		display: block;
		padding-left: 1.5rem;
	}
	.pole__text {
		font-family: var(--f-display);
		font-size: 1.05rem;
		line-height: 1.65;
		color: var(--slate-soft);
		margin: 0 0 2rem;
		max-width: 32rem;
	}
	.pole__cta {
		display: inline-flex;
		align-items: center;
		gap: 0.55em;
		padding: 0.9em 1.4em;
		border: 1px solid var(--slate);
		border-radius: 999px;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate);
		background: transparent;
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.pole__cta:hover {
		background: var(--ember);
		border-color: var(--ember);
		color: var(--cream);
	}

	@media (max-width: 900px) {
		.pole {
			padding: 5rem 1.25rem;
		}
		.pole__num {
			top: 1.25rem;
			left: 1.25rem;
		}
		.pole__grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
		.pole.flip .pole__grid {
			direction: ltr;
		}
		.pole__title .it {
			padding-left: 1rem;
		}
		.pole__photo img {
			aspect-ratio: 4 / 3;
		}
	}
</style>
