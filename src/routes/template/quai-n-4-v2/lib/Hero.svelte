<script>
	let { data, infos } = $props();
	let scrollY = $state(0);

	$effect(() => {
		const onScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const parallax = $derived(`translate3d(0, ${scrollY * 0.25}px, 0)`);
	const parallaxSlow = $derived(`translate3d(0, ${scrollY * -0.08}px, 0)`);
</script>

<section class="hero" id="hero">
	<div class="grid">
		<div class="left">
			<div class="meta">
				<span class="vertical">Ath · Belgique · Une étoile depuis 2022</span>
			</div>

			<div class="title-block" style="transform: {parallaxSlow}">
				<span class="eyebrow">— Restaurant gastronomique —</span>
				<h1>
					<span class="line">Quai</span>
					<span class="line italic">n<sup>°</sup>4</span>
					<span class="rule"></span>
					<span class="sub">Le geste classique, <em>traversé d'audaces.</em></span>
				</h1>
			</div>

			<div class="footnote">
				<div class="monogram" aria-hidden="true">
					<svg viewBox="0 0 200 200">
						<defs>
							<path id="circ" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
						</defs>
						<text font-family="Fira Mono" font-size="9.5" letter-spacing="3" fill="currentColor">
							<textPath href="#circ">QUAI · N°4 · ATH · ★ MICHELIN · DEPUIS MMXXII · </textPath>
						</text>
						<text
							x="100"
							y="108"
							text-anchor="middle"
							font-family="Bodoni Moda"
							font-style="italic"
							font-size="58"
							fill="currentColor">Q</text
						>
						<text
							x="100"
							y="135"
							text-anchor="middle"
							font-family="Fira Mono"
							font-size="8"
							letter-spacing="2"
							fill="currentColor">N°4</text
						>
					</svg>
				</div>
				<div class="caption">
					<p>{infos.description}</p>
					<a href="#cta" class="link">Réserver une table <span aria-hidden="true">↘</span></a>
				</div>
			</div>
		</div>

		<div class="right">
			<figure style="transform: {parallax}">
				<img src={data.image} alt={data.alt} loading="eager" />
				<figcaption>
					<span class="num">N°01</span>
					<span class="cap">Salle dressée — service du soir</span>
				</figcaption>
			</figure>
			<div class="badges">
				<div class="star">
					<svg viewBox="0 0 24 24" fill="currentColor"
						><path
							d="M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61z"
						/></svg
					>
					<span>Guide Michelin · 2022 — 2026</span>
				</div>
			</div>
		</div>
	</div>

	<div class="scroll-hint">
		<span>Scrollez</span>
		<span class="line-down"></span>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.hero {
		position: relative;
		min-height: 100vh;
		background: var(--c-paper);
		color: var(--c-ink);
		overflow: hidden;
		padding-block: clamp(5rem, 9vw, 7rem) clamp(3rem, 6vw, 5rem);
		@include grain;

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background:
				radial-gradient(ellipse at 80% 20%, rgba(184, 148, 90, 0.16), transparent 55%),
				radial-gradient(ellipse at 10% 80%, rgba(15, 77, 58, 0.08), transparent 50%);
			pointer-events: none;
		}
	}

	.grid {
		@include container;
		display: grid;
		gap: var(--sp-4);
		grid-template-columns: 1fr;
		position: relative;
		z-index: 2;

		@include breakpoint('large') {
			grid-template-columns: 1.05fr 1fr;
			gap: var(--sp-5);
			align-items: stretch;
		}
	}

	.left {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: var(--sp-4);
		position: relative;
	}

	.meta {
		display: none;
		@include breakpoint('large') {
			display: block;
			position: absolute;
			left: -0.5rem;
			top: 0;
			bottom: 0;
		}
	}
	.vertical {
		@include eyebrow;
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		color: var(--c-emerald);
		position: sticky;
		top: 50%;
	}

	.title-block {
		padding-left: 0;
		@include breakpoint('large') {
			padding-left: 2.5rem;
		}
		will-change: transform;
	}

	.eyebrow {
		@include eyebrow;
		display: block;
		margin-bottom: var(--sp-3);
		color: var(--c-emerald);
	}

	h1 {
		@include display;
		font-size: var(--fs-mega);
		margin: 0;
		color: var(--c-emerald-deep);
		.line {
			display: block;
		}
		.italic {
			font-style: italic;
			font-weight: 300;
			color: var(--c-gold-deep);
			padding-left: clamp(1rem, 6vw, 4rem);
			sup {
				font-size: 0.5em;
				vertical-align: super;
			}
		}
		.rule {
			display: block;
			width: 25%;
			height: 1px;
			background: var(--c-gold);
			margin: var(--sp-3) 0 var(--sp-3);
		}
		.sub {
			display: block;
			font-family: var(--f-display);
			font-size: clamp(1.1rem, 1.8vw, 1.5rem);
			font-style: italic;
			font-weight: 400;
			line-height: 1.35;
			color: var(--c-ink);
			letter-spacing: 0;
			max-width: 38ch;
			em {
				color: var(--c-emerald);
				font-style: italic;
			}
		}
	}

	.footnote {
		display: grid;
		grid-template-columns: 90px 1fr;
		gap: var(--sp-3);
		align-items: start;
		padding-left: 0;
		@include breakpoint('large') {
			padding-left: 2.5rem;
			grid-template-columns: 130px 1fr;
		}
	}
	.monogram {
		color: var(--c-emerald);
		width: 100%;
		aspect-ratio: 1;
		animation: spin 32s linear infinite;
		svg {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.caption {
		p {
			font-family: var(--f-sans);
			font-size: var(--fs-sm);
			line-height: 1.55;
			color: var(--c-muted);
			margin: 0 0 var(--sp-2);
			max-width: 48ch;
		}
	}
	.link {
		@include eyebrow;
		color: var(--c-emerald);
		text-decoration: none;
		border-bottom: 1px solid var(--c-gold);
		padding-bottom: 2px;
		transition: color 0.3s;
		&:hover {
			color: var(--c-gold-deep);
		}
	}

	.right {
		position: relative;
		min-height: 60vh;
		@include breakpoint('large') {
			min-height: auto;
		}
	}

	figure {
		position: relative;
		margin: 0;
		height: 100%;
		min-height: 70vh;
		overflow: hidden;
		border-radius: 2px;
		will-change: transform;

		img {
			position: absolute;
			inset: -10% 0 -10%;
			width: 100%;
			height: 120%;
			object-fit: cover;
			filter: contrast(1.05) saturate(0.9);
		}

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(180deg, transparent 60%, rgba(8, 44, 32, 0.45));
			pointer-events: none;
		}

		figcaption {
			position: absolute;
			bottom: 1rem;
			left: 1rem;
			right: 1rem;
			display: flex;
			align-items: center;
			gap: 1rem;
			color: var(--c-paper);
			.num {
				font-family: var(--f-mono);
				font-size: var(--fs-xs);
				letter-spacing: var(--tracking-eyebrow);
			}
			.cap {
				font-family: var(--f-display);
				font-style: italic;
				font-size: var(--fs-sm);
			}
		}
	}

	.badges {
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 3;
	}
	.star {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--c-paper);
		color: var(--c-emerald);
		padding: 0.5rem 0.85rem;
		font-family: var(--f-mono);
		font-size: var(--fs-xs);
		letter-spacing: var(--tracking-mono);
		text-transform: uppercase;
		border: 1px solid var(--c-gold);
		svg {
			width: 14px;
			height: 14px;
			color: var(--c-gold);
		}
	}

	.scroll-hint {
		position: absolute;
		bottom: 1.5rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		@include eyebrow;
		color: var(--c-emerald);
		z-index: 3;
		.line-down {
			width: 1px;
			height: 36px;
			background: linear-gradient(180deg, var(--c-gold), transparent);
			animation: pulse 2s ease infinite;
		}
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
			transform: scaleY(1);
		}
		50% {
			opacity: 0.3;
			transform: scaleY(0.6);
		}
	}
</style>
