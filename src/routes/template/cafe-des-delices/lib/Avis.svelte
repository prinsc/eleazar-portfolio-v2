<script>
	import { avis } from './data.js';
	import emblaCarouselSvelte from 'embla-carousel-svelte';

	let emblaApi;
	let canScrollPrev = $state(false);
	let canScrollNext = $state(true);

	function onInit(event) {
		emblaApi = event.detail;
		updateButtons();
		emblaApi.on('select', updateButtons);
		emblaApi.on('reInit', updateButtons);
	}

	function updateButtons() {
		if (!emblaApi) return;
		canScrollPrev = emblaApi.canScrollPrev();
		canScrollNext = emblaApi.canScrollNext();
	}

	function scrollPrev() {
		if (emblaApi) emblaApi.scrollPrev();
	}

	function scrollNext() {
		if (emblaApi) emblaApi.scrollNext();
	}

	const emblaOptions = {
		align: 'start',
		containScroll: 'keepSnaps',
		dragFree: false
	};

	// Note moyenne
	const moyenne = (avis.reduce((s, a) => s + a.note, 0) / avis.length).toFixed(1);
</script>

<section class="avis" id="avis">
	<span class="avis__num">04b - Ce qu'ils en disent</span>

	<div class="avis__head">
		<h2 class="avis__title">
			Ils ont poussé<br />
			<em>la porte</em><br />
			avant vous.
		</h2>
		<div class="avis__summary">
			<div class="stars-row">
				{#each { length: 5 } as _, i}
					<svg
						viewBox="0 0 20 20"
						width="18"
						height="18"
						class="star"
						class:star--filled={i < Math.round(Number(moyenne))}
					>
						<path
							d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8z"
						/>
					</svg>
				{/each}
				<span class="avg">{moyenne}</span>
			</div>
			<span class="count">{avis.length} avis Google</span>
		</div>
	</div>

	<div class="avis__carousel">
		<div class="embla" use:emblaCarouselSvelte={{ options: emblaOptions }} onemblaInit={onInit}>
			<div class="embla__container">
				{#each avis as a}
					<div class="embla__slide">
						<article class="card">
							<div class="card__top">
								<div class="card__author">
									<div class="avatar">{a.auteur.charAt(0)}</div>
									<div>
										<p class="name">{a.auteur}</p>
										<div class="stars">
											{#each { length: 5 } as _, j}
												<svg
													viewBox="0 0 20 20"
													width="13"
													height="13"
													class="star"
													class:star--filled={j < a.note}
												>
													<path
														d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.27 5.06 16.7 6 11.21l-4-3.9 5.53-.8z"
													/>
												</svg>
											{/each}
										</div>
									</div>
								</div>
								<time class="date"
									>{new Date(a.date).toLocaleDateString('fr-BE', {
										month: 'short',
										year: 'numeric'
									})}</time
								>
							</div>
							<p class="card__text">{a.texte}</p>
						</article>
					</div>
				{/each}

				<!-- CTA slide -->
				<div class="embla__slide">
					<article class="card card--cta">
						<div class="cta-inner">
							<img
								src="/assets/icons/google.svg"
								alt="Google"
								width="28"
								height="28"
								class="g-icon"
							/>
							<p class="cta-title">Votre avis compte</p>
							<p class="cta-sub">Partagez votre experience sur Google</p>
							<!-- placeholder - le vrai lien Google sera connecte plus tard -->
							<a href="#" class="cta-btn">Laisser un avis</a>
						</div>
					</article>
				</div>
			</div>
		</div>

		<div class="arrows">
			<button class="arrow arrow--left" class:arrow--disabled={!canScrollPrev} onclick={scrollPrev} aria-label="Precedent" disabled={!canScrollPrev}>
				<svg
					viewBox="0 0 24 24"
					width="16"
					height="16"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path d="M19 12H5M11 18l-6-6 6-6" />
				</svg>
			</button>

			<button class="arrow arrow--right" class:arrow--disabled={!canScrollNext} onclick={scrollNext} aria-label="Suivant" disabled={!canScrollNext}>
				<svg
					viewBox="0 0 24 24"
					width="16"
					height="16"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path d="M5 12h14M13 18l6-6-6-6" />
				</svg>
			</button>
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.avis {
		padding: 5rem 1.25rem;
		border-top: 1px solid var(--rule);
		position: relative;

		@include breakpoint('medium') {
			padding: 7rem 2rem;
		}
	}

	.avis__num {
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

	.avis__head {
		max-width: 1400px;
		margin: 0 auto 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		@include breakpoint('medium') {
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
			margin-bottom: 3.5rem;
		}
	}

	.avis__title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.2rem, 5.5vw, 5rem);
		line-height: 0.95;
		letter-spacing: -0.03em;
	}

	.avis__title em {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember);
	}

	.avis__summary {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.stars-row {
		display: flex;
		align-items: center;
		gap: 0.15rem;
	}

	.avg {
		margin-left: 0.5rem;
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 1.4rem;
		letter-spacing: -0.02em;
	}

	.count {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}

	/* Stars */
	.star {
		fill: none;
		stroke: var(--slate-soft);
		stroke-width: 0.8;
	}

	.star--filled {
		fill: var(--ember);
		stroke: var(--ember);
	}

	/* Embla carousel */
	.avis__carousel {
		position: relative;
		max-width: 1400px;
		margin: 0 auto;
	}

	.embla {
		overflow: hidden;
	}

	.embla__container {
		display: flex;
	}

	.embla__slide {
		flex: 0 0 calc(100%);
		min-width: 0;
		padding: 0.5rem;

		@include breakpoint('small') {
			flex: 0 0 calc(50%);
		}

		@include breakpoint('large') {
			flex: 0 0 calc(33.333%);
		}
		@include breakpoint('xlarge') {
			flex: 0 0 calc(25%);
		}
	}

	.card {
		padding: 1.5rem;
		border: 1px solid var(--rule);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
		transition: border-color 0.3s ease;

		&:hover {
			border-color: var(--slate-soft);
		}
	}

	.card__top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.card__author {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--slate);
		color: var(--cream);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 0.85rem;
		flex-shrink: 0;
	}

	.name {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 0.9rem;
		line-height: 1.2;
	}

	.stars {
		display: flex;
		gap: 0.1rem;
		margin-top: 0.2rem;
	}

	.date {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--slate-soft);
		flex-shrink: 0;
	}

	.card__text {
		margin: 0;
		font-family: var(--f-display);
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--slate);
		display: -webkit-box;
		-webkit-line-clamp: 5;
		line-clamp: 5;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* CTA card */
	.card--cta {
		background: var(--slate);
		border-color: var(--slate);
		justify-content: center;
		align-items: center;
		text-align: center;

		&:hover {
			border-color: var(--slate);
		}
	}

	.cta-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.g-icon {
		opacity: 0.9;
	}

	.cta-title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 1.1rem;
		color: var(--cream);
	}

	.cta-sub {
		margin: 0;
		font-family: var(--f-display);
		font-size: 0.85rem;
		color: var(--cream);
		opacity: 0.6;
	}

	.cta-btn {
		display: inline-block;
		margin-top: 0.5rem;
		padding: 0.7em 1.4em;
		border: 1px solid var(--cream);
		border-radius: 999px;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--cream);
		transition: all 0.3s ease;

		&:hover {
			background: var(--cream);
			color: var(--slate);
		}
	}

	/* Navigation arrows */
	.arrows {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		margin-top: 1.5rem;

		@include breakpoint('medium') {
			display: contents;
		}
	}

	.arrow {
		z-index: 2;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid var(--rule);
		background: var(--cream);
		color: var(--slate);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 12px rgba(20, 16, 13, 0.08);

		@include breakpoint('medium') {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}

		&:hover:not(:disabled) {
			background: var(--slate);
			color: var(--cream);
			border-color: var(--slate);
		}

		&--disabled {
			opacity: 0.25;
			cursor: default;
		}
	}

	.arrow--left {
		@include breakpoint('medium') {
			left: -20px;
		}
	}

	.arrow--right {
		@include breakpoint('medium') {
			right: -20px;
		}
	}
</style>
