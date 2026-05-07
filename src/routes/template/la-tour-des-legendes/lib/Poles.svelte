<script>
	let { poles = [] } = $props();
</script>

<section id="poles" class="poles" aria-label="Les pôles de la Tour">
	<header class="ph">
		<div>
			<p class="eye"><span>02</span> Trois maisons, une tour</p>
			<h2>
				Découvrez les <em>pôles</em><br/>
				qui font <span class="acc">vibrer</span> le lieu
			</h2>
		</div>
		<p class="lead">
			Chaque pôle a son ambiance, ses produits, sa raison d'être —
			ensemble, ils composent l'identité de la Tour.
		</p>
	</header>

	<div class="stack">
		{#each poles as pole, i}
			{@const layout = pole.layout || 'classic'}
			<article class="pole pole--{layout}" class:flip={pole.flip}>
				<!-- Numéro géant -->
				<span class="big-num" aria-hidden="true">{pole.num}</span>

				{#if layout === 'immersive'}
					<div class="immersive-bg">
						<img src={pole.img} alt={pole.imgAlt} loading="lazy" />
					</div>
					<div class="immersive-text">
						{#if pole.sur}<p class="sur">— {pole.sur} —</p>{/if}
						<h3>{pole.titre}</h3>
						<p class="txt">{pole.texte}</p>
						{#if pole.cta?.label}
							<a class="cta" href={pole.cta.href}>{pole.cta.label} →</a>
						{/if}
					</div>
				{:else if layout === 'editorial'}
					<div class="ed-grid">
						<div class="ed-text">
							{#if pole.sur}<p class="sur">— {pole.sur} —</p>{/if}
							<h3>{pole.titre}</h3>
							<p class="txt">
								<span class="dropcap">{pole.texte.charAt(0)}</span>{pole.texte.slice(1)}
							</p>
							{#if pole.cta?.label}
								<a class="cta" href={pole.cta.href}>{pole.cta.label} →</a>
							{/if}
						</div>
						<div class="ed-img">
							<img src={pole.img} alt={pole.imgAlt} loading="lazy" />
							<span class="frame-tag">№ {pole.num}</span>
						</div>
					</div>
				{:else}
					<div class="cl-grid">
						<div class="cl-img">
							<img src={pole.img} alt={pole.imgAlt} loading="lazy" />
						</div>
						<div class="cl-text">
							{#if pole.sur}<p class="sur">— {pole.sur} —</p>{/if}
							<h3>{pole.titre}</h3>
							<p class="txt">{pole.texte}</p>
							{#if pole.cta?.label}
								<a class="cta" href={pole.cta.href}>{pole.cta.label} →</a>
							{/if}
						</div>
					</div>
				{/if}
			</article>
		{/each}
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.poles {
		padding: 6rem 1.25rem 4rem;
		position: relative;
		@include breakpoint('medium') { padding: 8rem 2.5rem 6rem; }
		@include breakpoint('large') { padding: 10rem 4rem 8rem; }
	}

	.ph {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		max-width: 1400px;
		margin: 0 auto 5rem;
		align-items: end;
		@include breakpoint('large') {
			grid-template-columns: 2fr 1fr;
			gap: 6rem;
		}
		.eye {
			font-family: var(--f-mono);
			font-size: 0.72rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--accent);
			margin-bottom: 1.5rem;
			display: flex;
			align-items: center;
			gap: 1rem;
			span {
				display: inline-block;
				padding: 0.3rem 0.6rem;
				background: var(--ink);
				color: var(--gold);
			}
		}
		h2 {
			font-family: var(--f-display);
			font-size: clamp(2.2rem, 6vw, 5rem);
			line-height: 0.95;
			letter-spacing: -0.02em;
			em { font-style: italic; color: var(--accent); }
			.acc { font-style: italic; color: var(--gold-deep); text-decoration: underline wavy var(--accent); text-underline-offset: 6px; }
		}
		.lead {
			font-family: var(--f-display);
			font-style: italic;
			font-size: 1.15rem;
			line-height: 1.45;
			color: var(--ink-mute);
			max-width: 32ch;
		}
	}

	.stack { display: flex; flex-direction: column; gap: 6rem; }

	.pole {
		position: relative;
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
	}
	.big-num {
		position: absolute;
		font-family: var(--f-display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(8rem, 24vw, 28rem);
		line-height: 0.7;
		color: var(--accent);
		opacity: 0.12;
		pointer-events: none;
		user-select: none;
		top: -2rem;
		left: -1rem;
		z-index: 0;
	}
	.sur {
		font-family: var(--f-mono);
		font-size: 0.72rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1.5rem;
	}
	h3 {
		font-family: var(--f-display);
		font-size: clamp(2rem, 5vw, 4rem);
		line-height: 1;
		letter-spacing: -0.02em;
		margin-bottom: 1.5rem;
	}
	.txt {
		font-family: var(--f-display);
		font-size: 1.05rem;
		line-height: 1.6;
		color: var(--ink-soft);
		margin-bottom: 2rem;
	}
	.cta {
		display: inline-block;
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		padding: 0.9rem 0;
		border-top: 1px solid var(--ink);
		border-bottom: 1px solid var(--ink);
		transition: padding 0.3s, color 0.2s, border-color 0.3s;
		&:hover {
			padding-inline: 1rem;
			color: var(--accent-deep);
			border-color: var(--accent);
		}
	}

	/* IMMERSIVE — image plein écran + carte papier ink posée par-dessus */
	.pole--immersive {
		position: relative;
		min-height: 80vh;
		display: grid;
		align-items: end;
		padding: 2rem;
		@include breakpoint('medium') { padding: 3rem; }
		@include breakpoint('large') { padding: 4rem; min-height: 90vh; }

		.immersive-bg {
			position: absolute;
			inset: 0;
			overflow: hidden;
			z-index: 0;
			&::after {
				content: '';
				position: absolute;
				inset: 0;
				background: linear-gradient(180deg, rgba(11, 11, 12, 0.35) 0%, rgba(11, 11, 12, 0.65) 100%);
			}
			img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.9) contrast(1.05); }
		}

		.immersive-text {
			position: relative;
			z-index: 1;
			background: var(--ink);
			color: var(--base);
			padding: 2rem;
			max-width: 640px;
			border-left: 3px solid var(--gold);

			@include breakpoint('medium') { padding: 3rem; }

			.sur {
				color: var(--gold);
				margin-bottom: 1rem;
			}
			h3 {
				color: var(--base);
				font-weight: 500;
				margin-bottom: 1.5rem;
			}
			.txt {
				color: rgba(244, 244, 246, 0.82);
				font-size: 1rem;
				margin-bottom: 1.75rem;
			}
			.cta {
				color: var(--gold);
				border-color: var(--gold);
				&:hover { background: var(--gold); color: var(--ink); border-color: var(--gold); padding-inline: 1rem; }
			}
		}

		.big-num {
			color: var(--gold);
			opacity: 0.85;
			top: 0;
			left: auto;
			right: -2rem;
			font-weight: 900;
			-webkit-text-stroke: 2px var(--gold);
			color: transparent;
			text-shadow: 0 0 60px rgba(0,0,0,0.5);
		}
	}

	/* CLASSIC — split image / texte */
	.cl-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		align-items: center;
		@include breakpoint('large') { grid-template-columns: 1fr 1fr; gap: 5rem; }
	}
	.pole--classic.flip .cl-grid { @include breakpoint('large') { direction: rtl; > * { direction: ltr; } } }
	.cl-img {
		aspect-ratio: 4 / 5;
		overflow: hidden;
		position: relative;
		z-index: 1;
		img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s; }
		&:hover img { transform: scale(1.04); }
	}
	.cl-text { position: relative; z-index: 1; padding: 1rem 0; }

	/* EDITORIAL — texte large + image flottée + drop cap */
	.ed-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		@include breakpoint('large') { grid-template-columns: 1.4fr 1fr; gap: 4rem; align-items: start; }
	}
	.pole--editorial.flip .ed-grid { @include breakpoint('large') { grid-template-columns: 1fr 1.4fr; .ed-text { order: 2; } .ed-img { order: 1; } } }
	.ed-text {
		position: relative;
		z-index: 1;
		max-width: 60ch;
	}
	.dropcap {
		float: left;
		font-family: var(--f-display);
		font-style: italic;
		font-weight: 700;
		font-size: 5em;
		line-height: 0.8;
		padding: 0.05em 0.1em 0 0;
		color: var(--accent);
	}
	.ed-img {
		position: relative;
		z-index: 1;
		aspect-ratio: 3 / 4;
		overflow: hidden;
		@include breakpoint('large') { transform: translateY(2rem); }
		img { width: 100%; height: 100%; object-fit: cover; }
		.frame-tag {
			position: absolute;
			top: 1rem;
			left: 1rem;
			padding: 0.3rem 0.6rem;
			background: var(--gold);
			color: var(--ink);
			font-family: var(--f-mono);
			font-size: 0.72rem;
			letter-spacing: 0.15em;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		img, .cta { transition: none; }
	}
</style>
