<script>
	import { onMount } from 'svelte';
	import { heroImage } from './data.js';

	let heroEl;
	let eyebrowRule;
	let eyebrowText;
	let lineEls = $state([]);
	let photoEl;
	let photoImgEl;
	let ledeEl;
	let footerEl;

	onMount(async () => {
		const { gsap } = await import('gsap');

		// Etat initial
		gsap.set(eyebrowRule, { scaleX: 0, transformOrigin: 'left center' });
		gsap.set(eyebrowText, { opacity: 0, x: -8 });
		gsap.set(lineEls, { yPercent: 110 });
		gsap.set(photoEl, { clipPath: 'inset(0 0 100% 0)' });
		gsap.set(photoImgEl, { scale: 1.2 });
		gsap.set(ledeEl, { opacity: 0, y: 20 });
		gsap.set(footerEl.children, { opacity: 0, y: 16 });

		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		tl.to(eyebrowRule, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' })
			.to(eyebrowText, { opacity: 1, x: 0, duration: 0.6 }, '-=0.4')
			.to(
				lineEls,
				{
					yPercent: 0,
					duration: 1.1,
					stagger: 0.12,
					ease: 'expo.out'
				},
				'-=0.3'
			)
			.to(
				photoEl,
				{
					clipPath: 'inset(0 0 0% 0)',
					duration: 1.3,
					ease: 'expo.out'
				},
				'-=1.1'
			)
			.to(
				photoImgEl,
				{
					scale: 1,
					duration: 2.4,
					ease: 'power2.out'
				},
				'<'
			)
			.to(
				ledeEl,
				{
					opacity: 1,
					y: 0,
					duration: 1
				},
				'-=0.8'
			)
			.to(
				footerEl.children,
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					stagger: 0.08
				},
				'-=0.6'
			);

		// Parallaxe léger sur l'image au scroll
		const onScroll = () => {
			const rect = heroEl.getBoundingClientRect();
			if (rect.bottom < 0 || rect.top > window.innerHeight) return;
			const progress = -rect.top / window.innerHeight;
			gsap.to(photoImgEl, {
				yPercent: progress * 12,
				duration: 0.8,
				ease: 'power2.out',
				overwrite: 'auto'
			});
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<section class="hero" id="top" bind:this={heroEl}>
	<div class="hero__grid">
		<!-- COLONNE GAUCHE : tout le texte -->
		<div class="hero__left">
			<span class="hero__eyebrow">
				<span class="rule" bind:this={eyebrowRule}></span>
				<span class="eb-text" bind:this={eyebrowText}>Restaurant · Grand Place d'Ath · Belgique</span>
			</span>

			<h1 class="hero__title">
				<span class="mask"><span class="line line--sm" bind:this={lineEls[0]}>Le Café</span></span>
				<span class="mask"><span class="line line--sm indent" bind:this={lineEls[1]}><em>des</em></span></span>
				<span class="mask"><span class="line line--xl" bind:this={lineEls[2]}>Délices</span></span>
			</h1>

			<div class="hero__lede" bind:this={ledeEl}>
				<p>
					Grillades à la flamme, bières belges d'exception, terrasse au cœur de la Grand Place. Le même lieu
					depuis toujours, servi avec la même attention — qu'il soit 13 heures un mardi midi ou 21 heures un
					samedi soir.
				</p>
				<a class="more" href="#grilles">
					<span>Voir les deux faces du lieu</span>
					<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M12 5v14M6 13l6 6 6-6" />
					</svg>
				</a>
			</div>
		</div>

		<!-- COLONNE DROITE : photo plein hauteur -->
		<figure class="hero__photo" bind:this={photoEl}>
			<!-- Image à remplacer par le client -->
			<img src={heroImage} alt="Grillade en cuisine" loading="eager" bind:this={photoImgEl} />
			<figcaption>
				<span class="num">N<sup>o</sup> 01</span>
				<span class="cap">À la flamme</span>
			</figcaption>
		</figure>
	</div>

	<div class="hero__footer" bind:this={footerEl}>
		<span class="item">
			<span class="label">Adresse</span>
			Grand Place, Ath
		</span>
		<span class="item">
			<span class="label">Ouvert</span>
			Tous les jours
		</span>
		<span class="item">
			<span class="label">Spécialités</span>
			Grillades · Bières
		</span>
		<span class="item item--right">
			<span class="label">Faites défiler</span>
			↓
		</span>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.hero {
		padding: 3rem 1.25rem 2rem;
		position: relative;

		@include breakpoint('medium') {
			padding: 4rem 2rem 3rem;
		}
	}

	.hero__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;

		@include breakpoint('large') {
			grid-template-columns: 1.25fr 1fr;
			gap: 3rem;
			align-items: stretch;
			min-height: 75vh;
		}
	}

	.hero__left {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2.5rem;
	}

	/* ============================================================
	   EYEBROW
	   ============================================================ */
	.hero__eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.9em;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}
	.rule {
		display: inline-block;
		width: 36px;
		height: 1px;
		background: var(--slate);
	}
	.eb-text {
		display: inline-block;
	}

	/* ============================================================
	   TITRE
	   ============================================================ */
	.hero__title {
		margin: 1.5rem 0 0;
		font-family: var(--f-display);
		font-weight: 300;
		line-height: 0.85;
		letter-spacing: -0.035em;
	}
	.mask {
		display: block;
		overflow: hidden;
		padding-bottom: 0.06em; /* marge pour éviter le crop sur les descendants g/y */
	}
	.line {
		display: block;
		will-change: transform;
	}
	.line--sm {
		font-size: clamp(2.8rem, 9vw, 6rem);
		line-height: 0.95;
	}
	.line--sm.indent {
		padding-left: clamp(2.5rem, 10vw, 7rem);
	}
	.line--sm em {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember);
	}
	.line--xl {
		font-size: clamp(4rem, 16vw, 13rem);
		line-height: 0.82;
		font-weight: 300;
		letter-spacing: -0.055em;
		margin-top: 0.05em;
	}

	/* ============================================================
	   LEDE (paragraphe + lien)
	   ============================================================ */
	.hero__lede {
		max-width: 32rem;
	}
	.hero__lede p {
		font-family: var(--f-display);
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.65;
		color: var(--slate-soft);
		margin: 0 0 1.5rem;

		@include breakpoint('medium') {
			font-size: 1.05rem;
		}
	}
	.more {
		display: inline-flex;
		align-items: center;
		gap: 0.55em;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate);
		text-decoration: none;
		padding-bottom: 0.35em;
		border-bottom: 1px solid var(--slate);
		transition: gap 0.3s ease;
	}
	.more:hover {
		gap: 0.9em;
	}

	/* ============================================================
	   PHOTO
	   ============================================================ */
	.hero__photo {
		margin: 0;
		position: relative;
		overflow: hidden;
		aspect-ratio: 4 / 5;

		@include breakpoint('large') {
			aspect-ratio: auto;
			height: 100%;
		}
	}
	.hero__photo img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(12%) contrast(1.05);
		will-change: transform;
	}
	figcaption {
		position: absolute;
		left: 1rem;
		right: 1rem;
		bottom: 1rem;
		display: flex;
		justify-content: space-between;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--cream);
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
	}
	figcaption .cap {
		color: var(--ember);
	}

	/* ============================================================
	   FOOTER INFOS
	   ============================================================ */
	.hero__footer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-top: 3rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--rule);

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
			gap: 2rem;
			margin-top: 4rem;
		}
	}
	.item {
		font-family: var(--f-display);
		font-size: 0.95rem;
		color: var(--slate);
	}
	.item--right {
		text-align: right;
		font-size: 1.1rem;
	}
	.label {
		display: block;
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin-bottom: 0.35rem;
	}
</style>
