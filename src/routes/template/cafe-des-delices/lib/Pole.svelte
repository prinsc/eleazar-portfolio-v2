<script>
	// Bloc "diptyque" : présente un pôle du lieu (Grillés / Maltés)
	// 3 layouts switchables : "immersive" | "classic" | "editorial"
	import Cta from './Cta.svelte';
	let { pole, flip = false, id = '', layout = 'immersive', num = 1 } = $props();
</script>

<!-- ╔═══════════════════════════════════════════╗
     ║  LAYOUT: IMMERSIVE                        ║
     ║  Image full-bleed, texte superposé en bas  ║
     ╚═══════════════════════════════════════════╝ -->
{#if layout === 'immersive'}
	<section class="pole immersive" class:flip {id}>
		<span class="pole__num">0{num} - Un pôle du lieu</span>

		<div class="imm__inner">
			<figure class="imm__photo">
				<img src={pole.img} alt={pole.titre} loading="lazy" />
			</figure>

			<span class="imm__watermark" aria-hidden="true">0{num}</span>

			<div class="imm__body">
				<h2 class="pole__title pole__title--light">
					<span class="sur">{pole.sur}</span>
					<em class="it">{pole.titre}</em>
				</h2>
				<p class="pole__text pole__text--light">{pole.texte}</p>
				<Cta href={pole.cta.href} label={pole.cta.label} variant="glass" />
			</div>
		</div>
	</section>

	<!-- ╔═══════════════════════════════════════════╗
     ║  LAYOUT: CLASSIC                          ║
     ║  Split 50/50 image + texte côte à côte    ║
     ╚═══════════════════════════════════════════╝ -->
{:else if layout === 'classic'}
	<section class="pole classic" class:flip {id}>
		<span class="pole__num">0{num} - Un pôle du lieu</span>

		<div class="cls__grid">
			<figure class="cls__photo">
				<img src={pole.img} alt={pole.titre} loading="lazy" />
			</figure>

			<div class="cls__body">
				<h2 class="pole__title">
					<span class="sur">{pole.sur}</span>
					<em class="it">{pole.titre}</em>
				</h2>
				<p class="pole__text">{pole.texte}</p>
				<Cta href={pole.cta.href} label={pole.cta.label} variant="dark" />
			</div>
		</div>
	</section>

	<!-- ╔═══════════════════════════════════════════╗
     ║  LAYOUT: EDITORIAL                        ║
     ║  Image cadrée + bloc texte en overlap      ║
     ╚═══════════════════════════════════════════╝ -->
{:else}
	<section class="pole editorial" class:flip {id}>
		<span class="pole__num">0{num} - Un pôle du lieu</span>

		<div class="edi__inner">
			<figure class="edi__photo">
				<img src={pole.img} alt={pole.titre} loading="lazy" />
				<span class="edi__tag" aria-hidden="true">{pole.sur} {pole.titre}</span>
			</figure>

			<div class="edi__body">
				<span class="edi__idx" aria-hidden="true">0{num}</span>
				<h2 class="pole__title">
					<span class="sur">{pole.sur}</span>
					<em class="it">{pole.titre}</em>
				</h2>
				<div class="edi__rule"></div>
				<p class="pole__text">{pole.texte}</p>
				<Cta href={pole.cta.href} label={pole.cta.label} variant="dark" />
			</div>
		</div>
	</section>
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	   SHARED
	   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
	.pole {
		border-top: 1px solid var(--rule);
		position: relative;
	}

	.pole__num {
		position: absolute;
		top: 1.25rem;
		left: 1.25rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
		z-index: 4;

		@include breakpoint('medium') {
			top: 2rem;
			left: 2rem;
		}
	}

	.pole__title {
		margin: 0 0 1.5rem;
		font-family: var(--f-display);
		font-weight: 300;
		line-height: 0.85;
		letter-spacing: -0.04em;
	}

	.pole__title .sur {
		display: block;
	}

	.pole__title .it {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember);
		display: block;
		padding-left: 1.5rem;

		@include breakpoint('medium') {
			padding-left: 2rem;
		}

		.flip & {
			padding-left: 0;
			padding-right: 1.5rem;

			@include breakpoint('medium') {
				padding-right: 2rem;
			}
		}
	}

	.pole__title--light {
		color: var(--cream);

		.sur {
			opacity: 0.7;
		}
	}

	.pole__text {
		font-family: var(--f-display);
		font-size: 1rem;
		line-height: 1.65;
		color: var(--slate-soft);
		margin: 0 0 2rem;
		max-width: 28rem;

		@include breakpoint('medium') {
			font-size: 1.05rem;
		}
	}

	.pole__text--light {
		color: var(--cream);
		opacity: 0.75;
	}

	/* Flip alignments (shared) */
	.flip .imm__body,
	.flip .edi__body,
	.flip .cls__body {
		text-align: right;
	}

	.flip .pole__text {
		margin-left: auto;
	}

	.flip .imm__body,
	.flip .edi__body,
	.flip .cls__body {
		:global(.cta) {
			flex-direction: row-reverse;
		}
	}

	/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	   IMMERSIVE
	   Full-bleed image, text over gradient
	   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
	.immersive .pole__num {
		color: var(--cream);
		mix-blend-mode: difference;
	}

	.imm__inner {
		position: relative;
		min-height: 85vh;
		display: flex;
		align-items: flex-end;
		overflow: hidden;

		@include breakpoint('medium') {
			min-height: 90vh;
		}
	}

	.imm__photo {
		position: absolute;
		inset: 0;
		margin: 0;
		z-index: 0;
	}

	.imm__photo img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(12%) contrast(1.05);
		transition: transform 8s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.immersive:hover .imm__photo img {
		transform: scale(1.04);
	}

	.imm__photo::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(20, 16, 13, 0.85) 0%,
			rgba(20, 16, 13, 0.4) 40%,
			rgba(20, 16, 13, 0.08) 70%,
			transparent 100%
		);
		z-index: 1;
	}

	.imm__watermark {
		position: absolute;
		z-index: 1;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(10rem, 30vw, 28rem);
		line-height: 0.8;
		letter-spacing: -0.05em;
		color: var(--cream);
		opacity: 0.06;
		bottom: 1rem;
		right: 2rem;
		user-select: none;
		pointer-events: none;

		.flip & {
			right: auto;
			left: 2rem;
		}
	}

	.imm__body {
		position: relative;
		z-index: 2;
		padding: 3rem 1.25rem;
		max-width: 36rem;

		@include breakpoint('medium') {
			padding: 5rem 4rem;
		}

		.flip & {
			margin-left: auto;
		}
	}

	.immersive .pole__title {
		font-size: clamp(3rem, 8vw, 7rem);
	}

	/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	   CLASSIC
	   50/50 split, image + text side by side
	   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
	.classic {
		padding: 5rem 1.25rem;

		@include breakpoint('medium') {
			padding: 7rem 2rem;
		}
	}

	.cls__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		max-width: 1400px;
		margin: 0 auto;
		align-items: center;

		@include breakpoint('medium') {
			grid-template-columns: 1fr 1fr;
			gap: 5rem;
		}

		.flip & {
			@include breakpoint('medium') {
				direction: rtl;
			}
		}
	}

	.flip .cls__body {
		@include breakpoint('medium') {
			direction: ltr;
		}
	}

	.cls__photo {
		margin: 0;
		overflow: hidden;
	}

	.cls__photo img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		filter: grayscale(12%) contrast(1.05);
		transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.cls__photo:hover img {
		transform: scale(1.03);
	}

	.classic .pole__title {
		font-size: clamp(2.5rem, 6vw, 5.5rem);
		line-height: 0.9;
	}

	@media (max-width: 900px) {
		.flip .cls__grid {
			direction: ltr;
		}

		.flip .cls__body {
			text-align: left;
		}

		.flip .cls__body .pole__text {
			margin-left: 0;
		}

		.flip .cls__body :global(.cta) {
			flex-direction: row;
		}

		.cls__photo img {
			aspect-ratio: 4 / 3;
		}
	}

	/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	   EDITORIAL
	   Framed image + overlapping text card
	   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
	.editorial {
		padding: 5rem 1.25rem;

		@include breakpoint('medium') {
			padding: 7rem 2rem;
		}
	}

	.edi__inner {
		position: relative;
		max-width: 1400px;
		margin: 0 auto;
	}

	.edi__photo {
		margin: 0;
		overflow: hidden;
		position: relative;

		/* Image takes ~65% width on desktop, pushed to one side */
		@include breakpoint('medium') {
			width: 65%;
			margin-left: 0;

			.flip & {
				margin-left: auto;
				margin-right: 0;
			}
		}
	}

	.edi__photo img {
		display: block;
		width: 100%;
		aspect-ratio: 3 / 2;
		object-fit: cover;
		filter: grayscale(12%) contrast(1.05);
		transition: transform 1.6s cubic-bezier(0.2, 0.8, 0.2, 1);

		@include breakpoint('medium') {
			aspect-ratio: 16 / 10;
		}
	}

	.editorial:hover .edi__photo img {
		transform: scale(1.03);
	}

	.edi__tag {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--cream);
		text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);

		.flip & {
			left: auto;
			right: 1rem;
		}
	}

	.edi__body {
		position: relative;
		background: var(--cream);
		padding: 2rem 1.25rem;
		margin-top: -1rem;

		@include breakpoint('medium') {
			position: absolute;
			bottom: -2rem;
			right: 0;
			width: 50%;
			padding: 3rem;
			margin-top: 0;
			box-shadow: 0 8px 40px rgba(20, 16, 13, 0.08);

			.flip & {
				right: auto;
				left: 0;
			}
		}
	}

	.edi__idx {
		display: block;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(4rem, 8vw, 6rem);
		line-height: 0.75;
		letter-spacing: -0.05em;
		color: var(--slate);
		opacity: 0.06;
		margin-bottom: -0.5rem;
		user-select: none;

		@include breakpoint('medium') {
			font-size: 7rem;
			margin-bottom: -1rem;
		}
	}

	.edi__rule {
		width: 3rem;
		height: 2px;
		background: var(--ember);
		margin-bottom: 1.25rem;

		.flip & {
			margin-left: auto;
		}
	}

	.editorial .pole__title {
		font-size: clamp(2.2rem, 5vw, 4rem);
		line-height: 0.9;
		margin-bottom: 1rem;
	}

	.editorial .pole__text {
		font-size: 0.95rem;
		margin-bottom: 1.5rem;
	}

	/* Mobile: undo flip text alignment for editorial */
	@media (max-width: 900px) {
		.flip .edi__body {
			text-align: left;
		}

		.flip .edi__body .pole__text {
			margin-left: 0;
		}

		.flip .edi__body :global(.cta) {
			flex-direction: row;
		}

		.flip .edi__body .edi__rule {
			margin-left: 0;
		}
	}
</style>
