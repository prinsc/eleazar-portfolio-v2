<script>
	let { infos, hero, cta } = $props();
</script>

<section class="hero" id="top">
	<div class="leaf leaf-tl" aria-hidden="true">
		<svg viewBox="0 0 200 200" fill="none">
			<path d="M20 180 C 60 120, 100 80, 180 30" stroke="currentColor" stroke-width="1" />
			<path d="M40 170 C 80 130, 110 100, 160 70" stroke="currentColor" stroke-width="0.6" opacity="0.7" />
			<ellipse cx="50" cy="160" rx="14" ry="6" transform="rotate(-40 50 160)" stroke="currentColor" stroke-width="0.6" />
			<ellipse cx="90" cy="125" rx="16" ry="7" transform="rotate(-35 90 125)" stroke="currentColor" stroke-width="0.6" />
			<ellipse cx="135" cy="85" rx="14" ry="6" transform="rotate(-30 135 85)" stroke="currentColor" stroke-width="0.6" />
		</svg>
	</div>
	<div class="leaf leaf-br" aria-hidden="true">
		<svg viewBox="0 0 200 200" fill="none">
			<path d="M180 20 C 140 80, 100 120, 20 170" stroke="currentColor" stroke-width="1" />
			<ellipse cx="150" cy="40" rx="14" ry="6" transform="rotate(140 150 40)" stroke="currentColor" stroke-width="0.6" />
			<ellipse cx="110" cy="80" rx="16" ry="7" transform="rotate(145 110 80)" stroke="currentColor" stroke-width="0.6" />
			<ellipse cx="65" cy="125" rx="14" ry="6" transform="rotate(150 65 125)" stroke="currentColor" stroke-width="0.6" />
		</svg>
	</div>

	<div class="grid">
		<aside class="meta">
			<div class="ribbon">
				<span class="dot"></span>
				<span>Cité des Géants — Ath, Belgique</span>
			</div>
			<div class="star-row">
				<span class="star">✦</span>
				<span class="label">Une étoile</span>
				<span class="sep">·</span>
				<span class="label">Guide Michelin</span>
			</div>
		</aside>

		<div class="title-block">
			<p class="kicker">Restaurant gastronomique</p>
			<h1>
				<span class="line">Quai</span>
				<span class="line">
					<span class="amp">n°</span><span class="num">4</span>
				</span>
			</h1>
			<p class="lede">
				{infos?.description ?? 'Une cuisine de saison, sensible et précise.'}
			</p>
		</div>

		<div class="image-frame">
			<div class="frame-inner">
				<img
					src={hero?.image ?? 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80'}
					alt={hero?.alt ?? 'Quai n°4'}
					loading="eager"
				/>
				<div class="frame-corner tl"></div>
				<div class="frame-corner tr"></div>
				<div class="frame-corner bl"></div>
				<div class="frame-corner br"></div>
			</div>
			<div class="caption">
				<span class="num">— 01</span>
				<span>Salle principale, sous les lustres d'origine</span>
			</div>
		</div>

		<div class="bottom">
			<div class="quote">
				<span class="qmark">“</span>
				Le produit, d'abord. Le geste, ensuite. Le souvenir, toujours.
			</div>
			<div class="actions">
				{#if cta?.reservation?.url}
					<a class="btn primary" href={cta.reservation.url} target="_blank" rel="noopener">
						{cta.reservation.label ?? 'Réserver une table'}
					</a>
				{/if}
				<a class="btn ghost" href="#carte">Voir la carte</a>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.hero {
		position: relative;
		padding: 2rem 1.25rem 4rem;
		overflow: hidden;
		background:
			radial-gradient(circle at 80% 0%, rgba(184, 148, 90, 0.07), transparent 55%),
			radial-gradient(circle at 0% 100%, rgba(15, 77, 58, 0.05), transparent 60%),
			var(--q-paper);

		@include breakpoint('large') {
			padding: 3rem 2.5rem 6rem;
			min-height: 92vh;
		}
	}

	.leaf {
		position: absolute;
		width: 320px;
		height: 320px;
		color: var(--q-emerald);
		opacity: 0.18;
		pointer-events: none;

		&-tl {
			top: 4rem;
			left: -4rem;
		}
		&-br {
			bottom: 0;
			right: -4rem;
		}

		@include breakpoint('large') {
			width: 460px;
			height: 460px;
			opacity: 0.22;
		}
	}

	.grid {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@include breakpoint('large') {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: auto 1fr auto;
			gap: 3rem 4rem;
			align-items: start;
		}
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-family: var(--q-mono);
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--q-gold-deep);

		@include breakpoint('large') {
			grid-column: 1 / 2;
			grid-row: 1 / 2;
		}
	}

	.ribbon {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;

		.dot {
			width: 6px;
			height: 6px;
			background: var(--q-emerald);
			border-radius: 50%;
			box-shadow: 0 0 0 4px rgba(15, 77, 58, 0.12);
		}
	}

	.star-row {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;

		.star {
			font-size: 1rem;
			color: var(--q-gold);
		}
		.sep {
			opacity: 0.5;
		}
	}

	.title-block {
		@include breakpoint('large') {
			grid-column: 1 / 2;
			grid-row: 2 / 3;
			align-self: end;
		}
	}

	.kicker {
		margin: 0 0 1rem;
		font-family: var(--q-mono);
		font-size: 0.7rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--q-emerald-deep);
	}

	h1 {
		margin: 0;
		font-family: var(--q-display);
		font-weight: 300;
		font-size: clamp(4.5rem, 18vw, 12rem);
		line-height: 0.85;
		letter-spacing: -0.04em;
		color: var(--q-ink);

		.line {
			display: block;
		}

		.line:nth-child(2) {
			padding-left: 1.5em;
			font-style: italic;
			color: var(--q-emerald-deep);
		}

		.amp {
			font-size: 0.5em;
			vertical-align: 0.45em;
			letter-spacing: 0;
			color: var(--q-gold);
			font-style: normal;
			margin-right: 0.05em;
		}

		.num {
			background: linear-gradient(180deg, var(--q-gold-bright) 0%, var(--q-gold-deep) 100%);
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
		}
	}

	.lede {
		margin: 1.5rem 0 0;
		max-width: 38ch;
		font-family: var(--q-serif);
		font-size: 1.1rem;
		font-style: italic;
		line-height: 1.55;
		color: var(--q-ink);
		opacity: 0.78;

		@include breakpoint('large') {
			font-size: 1.25rem;
		}
	}

	.image-frame {
		position: relative;

		@include breakpoint('large') {
			grid-column: 2 / 3;
			grid-row: 1 / 3;
		}
	}

	.frame-inner {
		position: relative;
		aspect-ratio: 4 / 5;
		overflow: hidden;
		background: var(--q-cream);
		box-shadow: var(--q-shadow);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: saturate(0.92) contrast(1.04);
			transition: transform 0.8s ease;
		}

		&:hover img {
			transform: scale(1.03);
		}

		.frame-corner {
			position: absolute;
			width: 28px;
			height: 28px;
			border: 1px solid var(--q-gold);
			pointer-events: none;

			&.tl {
				top: 12px;
				left: 12px;
				border-right: none;
				border-bottom: none;
			}
			&.tr {
				top: 12px;
				right: 12px;
				border-left: none;
				border-bottom: none;
			}
			&.bl {
				bottom: 12px;
				left: 12px;
				border-right: none;
				border-top: none;
			}
			&.br {
				bottom: 12px;
				right: 12px;
				border-left: none;
				border-top: none;
			}
		}
	}

	.caption {
		display: flex;
		gap: 1rem;
		align-items: baseline;
		margin-top: 1rem;
		font-family: var(--q-mono);
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--q-ink);
		opacity: 0.6;

		.num {
			color: var(--q-gold-deep);
			opacity: 1;
		}
	}

	.bottom {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-top: 2rem;
		border-top: 1px solid var(--q-line);

		@include breakpoint('medium') {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		@include breakpoint('large') {
			grid-column: 1 / -1;
			grid-row: 3 / 4;
			margin-top: 2rem;
		}
	}

	.quote {
		font-family: var(--q-display);
		font-style: italic;
		font-size: 1.1rem;
		max-width: 42ch;
		color: var(--q-emerald-deep);
		line-height: 1.4;

		.qmark {
			font-size: 2rem;
			color: var(--q-gold);
			vertical-align: -0.25em;
			margin-right: 0.2rem;
		}

		@include breakpoint('large') {
			font-size: 1.3rem;
		}
	}

	.actions {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 1.6rem;
		font-family: var(--q-sans);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		text-decoration: none;
		border-radius: var(--q-radius);
		transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;

		&.primary {
			background: var(--q-emerald-deep);
			color: var(--q-gold-bright);
			border: 1px solid var(--q-emerald-deep);

			&:hover {
				background: var(--q-ink);
				border-color: var(--q-ink);
			}
		}

		&.ghost {
			background: transparent;
			border: 1px solid var(--q-ink);
			color: var(--q-ink);

			&:hover {
				background: var(--q-ink);
				color: var(--q-cream);
			}
		}
	}
</style>
