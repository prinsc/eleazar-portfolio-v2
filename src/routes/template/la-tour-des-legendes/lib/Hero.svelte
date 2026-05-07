<script>
	import SignatureCurve from './SignatureCurve.svelte';
	let { hero = null, infos = null } = $props();

	const img = $derived(
		hero?.image ||
			'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&q=80'
	);
	// PLACEHOLDER → photo de la salle / brasserie / Maison des Géants

	let scrollY = $state(0);
	$effect(() => {
		const onScroll = () => (scrollY = window.scrollY);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
	const parY = $derived(scrollY * 0.18);
	const txtY = $derived(scrollY * -0.08);
</script>

<section class="hero" aria-label="Bienvenue à la Tour des Légendes">
	<!-- Numéro géant en arrière-plan -->
	<span class="ghost-num" aria-hidden="true">01</span>

	<div class="grid">
		<!-- Colonne gauche : titre éclaté -->
		<div class="col-text" style="transform: translateY({txtY}px);">
			<p class="eyebrow">
				<span class="bullet">✦</span>
				<span>Folklore · Terroir · Brasserie</span>
				<span class="bullet">✦</span>
			</p>
			<h1 class="display">
				<span class="row">
					<span class="word">La</span>
					<span class="kerned">Tour</span>
				</span>
				<span class="row offset">
					<span class="word italic">des</span>
					<span class="kerned italic">Légendes</span>
				</span>
			</h1>

			<div class="meta">
				<div class="cell">
					<span class="lab">Lieu</span>
					<span class="val">{infos?.ville ?? 'Ath'}, {infos?.pays ?? 'Belgique'}</span>
				</div>
				<div class="cell">
					<span class="lab">Esprit</span>
					<span class="val italic">Trois maisons,<br />une seule tour</span>
				</div>
				<div class="cell">
					<span class="lab">Statut</span>
					<span class="val pulse">
						<span class="dot"></span> Bientôt ouvert
					</span>
				</div>
			</div>
		</div>

		<!-- Colonne droite : image cadrée + badge -->
		<div class="col-img">
			<div class="frame" style="transform: translateY({-parY * 0.4}px);">
				<img
					src={img + (img.includes('?') ? '' : '?w=1200&auto=format&q=80')}
					alt={hero?.alt ?? 'Vue de la Tour des Légendes'}
				/>
			</div>
			<div class="badge" style="transform: rotate(-8deg) translateY({-parY * 0.2}px);">
				<svg viewBox="0 0 200 200" aria-hidden="true">
					<defs>
						<path id="circle" d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0" />
					</defs>
					<text font-family="Fira Mono" font-size="14" letter-spacing="3" fill="currentColor">
						<textPath href="#circle">FOLKLORE · TERROIR · GÉANTS · ATH · BIÈRE · </textPath>
					</text>
				</svg>
				<div class="badge-inner">
					<SignatureCurve size={42} color="var(--ink)" />
					<span class="b-line">Maison<br /><em>des Géants</em></span>
				</div>
			</div>
		</div>
	</div>

	<!-- Bandeau bas — citation manifeste -->
	<div class="manifest">
		<p>
			<span class="lead-l">Bienvenue</span>
			<br />une brasserie moderne et axée sur les produits locaux, et un musée où chaque détail de
			l'histoire de notre folklore <em>vibre</em> dans chacune des pièces.
		</p>
		<a class="scroll-cue" href="#poles">
			<span>Continuer</span>
			<span class="arr">↓</span>
		</a>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.hero {
		position: relative;
		padding: 4rem 1.25rem 2rem;
		overflow: hidden;
		min-height: calc(100vh - 80px);
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		@include breakpoint('medium') {
			padding: 5rem 2.5rem 3rem;
		}
		@include breakpoint('large') {
			padding: 6rem 4rem 3rem;
		}
	}

	.ghost-num {
		position: absolute;
		top: 10%;
		right: -2vw;
		font-family: var(--f-display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(20rem, 50vw, 60rem);
		line-height: 0.8;
		color: var(--base-deep);
		z-index: 0;
		pointer-events: none;
		user-select: none;
		opacity: 0.55;
	}

	.grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		flex: 1;
		align-items: center;

		@include breakpoint('large') {
			grid-template-columns: 1.2fr 1fr;
			gap: 4rem;
			align-items: stretch;
		}
	}

	.col-text {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--f-mono);
		font-size: 0.72rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--accent-deep);
		.bullet {
			color: var(--gold-deep);
		}
		animation: rise 1s 0.1s ease both;
	}

	.display {
		font-family: var(--f-display);
		font-weight: 500;
		font-size: clamp(3rem, 13vw, 11rem);
		line-height: 0.88;
		letter-spacing: -0.02em;

		.row {
			display: flex;
			align-items: baseline;
			gap: clamp(0.5rem, 2vw, 2rem);
			animation: rise 1s ease both;
		}
		.row.offset {
			padding-left: clamp(1rem, 6vw, 5rem);
			animation-delay: 0.12s;
		}
		.word {
			font-weight: 400;
			color: var(--ink-soft);
		}
		.kerned {
			letter-spacing: -0.04em;
		}
		.italic {
			font-style: italic;
			color: var(--accent);
		}
	}

	.meta {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		padding-top: 1.5rem;
		border-top: 1px dashed var(--rule-strong);
		max-width: 600px;
		@include breakpoint('small') {
			grid-template-columns: repeat(3, 1fr);
		}
		animation: rise 1s 0.3s ease both;
	}
	.cell {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		.lab {
			font-family: var(--f-mono);
			font-size: 0.65rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--ink-mute);
		}
		.val {
			font-family: var(--f-display);
			font-size: 1rem;
			line-height: 1.25;
			.italic,
			&.italic {
				font-style: italic;
			}
		}
		.val.italic {
			font-style: italic;
		}
		.pulse {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
		}
		.dot {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: var(--accent);
			animation: pulse 1.6s ease-in-out infinite;
		}
	}

	.col-img {
		position: relative;
		min-height: 50vh;
		@include breakpoint('large') {
			min-height: auto;
		}
	}
	.frame {
		position: relative;
		height: 100%;
		min-height: 60vh;
		overflow: hidden;
		clip-path: polygon(0 0, 100% 0, 100% 92%, 88% 100%, 0 100%);
		background: var(--ink);
		animation: rise 1.2s 0.2s ease both;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.8s ease;
		}
		&:hover img {
			transform: scale(1.04);
		}
	}
	.badge {
		position: absolute;
		bottom: -30px;
		left: -30px;
		width: 180px;
		height: 180px;
		background: var(--gold);
		border-radius: 50%;
		display: grid;
		place-items: center;
		color: var(--ink);
		animation:
			spin 30s linear infinite,
			rise 1s 0.5s ease both;
		box-shadow: 0 20px 40px -20px rgba(11, 11, 12, 0.4);

		@include breakpoint('large') {
			width: 220px;
			height: 220px;
			bottom: 40px;
			left: -60px;
		}

		svg {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			animation: spin 30s linear infinite reverse;
		}
	}
	.badge-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		text-align: center;
		.b-line {
			font-family: var(--f-display);
			font-size: 0.95rem;
			line-height: 1.05;
			em {
				color: var(--accent-deep);
				font-size: 1.1rem;
			}
		}
	}

	.manifest {
		position: relative;
		z-index: 1;
		margin-top: 3rem;
		padding-top: 2rem;
		display: grid;
		gap: 2rem;
		@include breakpoint('large') {
			grid-template-columns: 2fr auto;
			align-items: end;
			gap: 4rem;
		}
		p {
			font-family: var(--f-display);
			font-size: clamp(1.1rem, 2.2vw, 1.6rem);
			line-height: 1.45;
			max-width: 60ch;
			color: var(--ink-soft);
			em {
				color: var(--accent);
				font-style: italic;
			}
		}
		.lead-l {
			float: left;
			font-family: var(--f-display);
			font-style: italic;
			font-size: 3.5em;
			line-height: 0.85;
			padding-right: 0.15em;
			color: var(--accent);
			margin-top: 0.05em;
		}
	}
	.scroll-cue {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--f-mono);
		font-size: 0.72rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		padding: 0.8rem 0;
		border-top: 1px solid var(--ink);
		border-bottom: 1px solid var(--ink);
		.arr {
			animation: bounce 2s ease-in-out infinite;
		}
	}

	@keyframes rise {
		from {
			transform: translateY(30px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
	@keyframes spin {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.6);
			opacity: 0.4;
		}
	}
	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(4px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.badge,
		.badge svg,
		.dot,
		.arr,
		.row {
			animation: none !important;
		}
	}
</style>
