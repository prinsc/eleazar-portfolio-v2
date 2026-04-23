<script>
	import { onMount } from 'svelte';
	import { Check } from 'lucide-svelte';

	let { infos = null, sono = null, heroImage = null } = $props();

	const points = [
		'Une prestation professionnelle et soignée',
		'Une ambiance garantie du début à la fin',
		'Une passion au service de votre événement',
		'Une piste de danse toujours vivante'
	];

	const paragraphes = [
		"Avec MJM Sonorisation, profitez d'une prise en charge complète : sonorisation, éclairage et animation, pour un événement clé en main.",
		"Forts de plus de 30 ans d'expérience, nous mettons à votre service du matériel professionnel et un savoir-faire reconnu, pour un rendu à la hauteur de vos attentes.",
		'Toujours à la pointe de la technologie, nous faisons évoluer nos équipements pour vous offrir le meilleur.'
	];

	let heroEl;
	let eyebrowRule;
	let eyebrowText;
	let lineEls = $state([]);
	let subtitleEl;
	let photo1El, photo1ImgEl;
	let photo2El, photo2ImgEl;
	let ledeEl;
	let footerEl;
	let counterEl;

	const img1 = $derived(
		heroImage ?? 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&q=85'
		/* IMAGE CLIENT - remplacer par photo ambiance événement réelle */
	);
	const img2 = 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=85';
	/* IMAGE CLIENT - remplacer par photo lumière / scène réelle */

	onMount(async () => {
		const { gsap } = await import('gsap');

		gsap.set(heroEl, { visibility: 'visible' });

		gsap.set(eyebrowRule, { scaleX: 0, transformOrigin: 'left center' });
		gsap.set(eyebrowText, { opacity: 0, x: -8 });
		gsap.set(lineEls, { yPercent: 110 });
		gsap.set(subtitleEl, { opacity: 0, y: 16 });
		gsap.set(photo1El, { clipPath: 'inset(0 0 100% 0)' });
		gsap.set(photo1ImgEl, { scale: 1.25 });
		gsap.set(photo2El, { clipPath: 'inset(100% 0 0 0)' });
		gsap.set(photo2ImgEl, { scale: 1.25 });
		gsap.set(ledeEl, { opacity: 0, y: 20 });
		gsap.set(footerEl.children, { opacity: 0, y: 16 });
		gsap.set(counterEl, { opacity: 0 });

		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		tl.to(eyebrowRule, { scaleX: 1, duration: 0.85, ease: 'power2.inOut' })
			.to(eyebrowText, { opacity: 1, x: 0, duration: 0.55 }, '-=0.35')
			.to(lineEls, { yPercent: 0, duration: 1.15, stagger: 0.1, ease: 'expo.out' }, '-=0.25')
			.to(subtitleEl, { opacity: 1, y: 0, duration: 0.8 }, '-=0.7')
			.to(photo1El, { clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'expo.out' }, '-=1.2')
			.to(photo1ImgEl, { scale: 1, duration: 2.4, ease: 'power2.out' }, '<')
			.to(photo2El, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'expo.out' }, '-=1')
			.to(photo2ImgEl, { scale: 1, duration: 2.2, ease: 'power2.out' }, '<')
			.to(ledeEl, { opacity: 1, y: 0, duration: 0.9 }, '-=1.6')
			.to(footerEl.children, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, '-=0.5')
			.to(counterEl, { opacity: 1, duration: 0.6 }, '-=0.3');

		// Animation chiffre 30 ans
		const target = { v: 0 };
		gsap.to(target, {
			v: 30,
			duration: 1.8,
			delay: 1.2,
			ease: 'power2.out',
			onUpdate: () => {
				if (counterEl) counterEl.textContent = Math.round(target.v).toString();
			}
		});

		// Parallaxe léger scroll
		const onScroll = () => {
			const rect = heroEl.getBoundingClientRect();
			if (rect.bottom < 0 || rect.top > window.innerHeight) return;
			const progress = -rect.top / window.innerHeight;
			gsap.to(photo1ImgEl, {
				yPercent: progress * 14,
				duration: 0.9,
				ease: 'power2.out',
				overwrite: 'auto'
			});
			gsap.to(photo2ImgEl, {
				yPercent: progress * -10,
				duration: 0.9,
				ease: 'power2.out',
				overwrite: 'auto'
			});
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<section class="hero" id="top" bind:this={heroEl}>
	<div class="hero__marquee" aria-hidden="true">
		<div class="hero__marquee-track">
			{#each Array(3) as _, i (i)}
				<span>Sonorisation</span><span class="sep">×</span>
				<span>Éclairage</span><span class="sep">×</span>
				<span>Animation</span><span class="sep">×</span>
				<span>Depuis 1995</span><span class="sep">×</span>
			{/each}
		</div>
	</div>

	<div class="hero__grid">
		<div class="hero__left">
			<span class="hero__eyebrow">
				<span class="rule" bind:this={eyebrowRule}></span>
				<span class="eb-text" bind:this={eyebrowText}>
					Prestataire son · lumière · animation - {infos?.ville ?? 'Ostiches'}, {infos?.pays ??
						'Belgique'}
				</span>
			</span>

			<h1 class="hero__title">
				<span class="mask"
					><span class="line indent line--md" bind:this={lineEls[0]}><em>MJM</em></span></span
				>
				<span class="mask"
					><span class="line line--xl" bind:this={lineEls[1]}>Sonorisation</span></span
				>
			</h1>

			<p class="hero__subtitle" bind:this={subtitleEl}>
				Donnez une autre dimension à vos événements.<br />
				<span class="muted">Son, lumière, ambiance - nous créons des expériences uniques.</span>
			</p>

			<div class="hero__lede" bind:this={ledeEl}>
				<ul class="points">
					{#each points as p, i}
						<li style="--i: {i}">
							<Check size={14} strokeWidth={2} />
							<span>{p}</span>
						</li>
					{/each}
				</ul>

				<div class="paragraphes">
					{#each paragraphes as para}
						<p>{para}</p>
					{/each}
				</div>

				<a class="cta-primary" href="#contact">
					<span>Une question, un projet ? Contactez-nous</span>
					<svg
						viewBox="0 0 24 24"
						width="14"
						height="14"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path d="M5 12h14M13 6l6 6-6 6" />
					</svg>
				</a>

				<p class="tagline">
					MJM Sonorisation &amp; Yohan - <em>la signature de vos plus beaux événements.</em>
				</p>
			</div>
		</div>

		<div class="hero__right">
			<figure class="hero__photo hero__photo--1" bind:this={photo1El}>
				<img
					src={img1}
					alt="Ambiance événement - sonorisation scène"
					loading="eager"
					bind:this={photo1ImgEl}
				/>
				<figcaption>
					<span class="num">N<sup>o</sup> 01</span>
					<span class="cap">Sur scène</span>
				</figcaption>
			</figure>

			<div class="hero__counter">
				<span class="counter__num" bind:this={counterEl}>0</span>
				<div class="counter__meta">
					<span class="counter__unit">ans</span>
					<span class="counter__label">d'expérience terrain</span>
				</div>
			</div>

			<figure class="hero__photo hero__photo--2" bind:this={photo2El}>
				<img src={img2} alt="Ambiance lumière - mariage" loading="eager" bind:this={photo2ImgEl} />
				<figcaption>
					<span class="num">N<sup>o</sup> 02</span>
					<span class="cap">En lumière</span>
				</figcaption>
			</figure>
		</div>
	</div>

	<div class="hero__footer" bind:this={footerEl}>
		<span class="item">
			<span class="label">Zone</span>
			{sono?.zoneIntervention ?? 'Hainaut & nord de la France'}
		</span>
		<span class="item">
			<span class="label">Rayon</span>
			{sono?.rayonKm ?? 80} km autour d'Ostiches
		</span>
		<span class="item">
			<span class="label">Indoor / Outdoor</span>
			Intérieur &amp; extérieur
		</span>
		<span class="item item--right">
			<span class="label">Défiler</span>
			↓
		</span>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.hero {
		padding: 8rem 1.25rem 3rem;
		position: relative;
		visibility: hidden;
		border-bottom: 1px solid var(--rule);
		overflow: hidden;

		@include breakpoint('medium') {
			padding: 10rem 2rem 4rem;
		}
	}

	/* ── MARQUEE en fond, texte énorme, hyper sobre ── */
	.hero__marquee {
		position: absolute;
		top: 6.5rem;
		left: 0;
		right: 0;
		pointer-events: none;
		overflow: hidden;
		opacity: 0.06;
		user-select: none;
		z-index: 0;
	}
	.hero__marquee-track {
		display: inline-flex;
		gap: 1.5rem;
		white-space: nowrap;
		font-family: var(--f-display);
		font-style: italic;
		font-weight: 300;
		font-size: clamp(5rem, 14vw, 14rem);
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--bone);
		animation: marquee 42s linear infinite;

		span {
			display: inline-block;
		}
		.sep {
			color: var(--gold);
			font-style: normal;
		}
	}
	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-33.333%);
		}
	}

	.hero__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		position: relative;
		z-index: 1;

		@include breakpoint('large') {
			grid-template-columns: 1.15fr 1fr;
			gap: 4rem;
			align-items: stretch;
		}
	}

	.hero__left {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.hero__eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.9em;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--bone-soft);
	}
	.rule {
		display: inline-block;
		width: 42px;
		height: 1px;
		background: var(--gold);
	}

	.hero__title {
		margin: 1rem 0 0;
		font-family: var(--f-display);
		font-weight: 300;
		line-height: 0.88;
		letter-spacing: -0.04em;
		color: var(--bone);
	}
	.mask {
		display: block;
		overflow: hidden;
		padding-bottom: 0.08em;
	}
	.line {
		display: block;
		will-change: transform;
	}
	.line--md {
		font-size: clamp(2.5rem, 8vw, 5.5rem);
		line-height: 0.95;
		font-weight: 300;
	}
	.line--xl {
		font-size: clamp(4rem, 14vw, 11rem);
		line-height: 0.82;
		font-weight: 300;
		letter-spacing: -0.055em;
		margin-top: 0.03em;
	}
	.line--md.indent {
		padding-left: clamp(2rem, 8vw, 6rem);
	}
	.line--md em {
		font-family: var(--f-display);
		font-style: italic;
		font-weight: 300;
		color: var(--gold);
	}

	.hero__subtitle {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 300;
		font-style: italic;
		font-size: clamp(1.1rem, 2.2vw, 1.5rem);
		line-height: 1.45;
		color: var(--bone);
		max-width: 32rem;

		.muted {
			color: var(--bone-soft);
			font-style: normal;
			font-family: var(--f-body);
			font-size: 0.95rem;
			letter-spacing: 0;
		}
	}

	.hero__lede {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		max-width: 34rem;
	}

	.points {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;

		@include breakpoint('small') {
			grid-template-columns: 1fr 1fr;
			gap: 0.75rem 1.5rem;
		}

		li {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			font-family: var(--f-body);
			font-size: 0.92rem;
			font-weight: 400;
			color: var(--bone);
			padding: 0.4rem 0;
			border-top: 1px solid var(--rule);

			:global(svg) {
				color: var(--gold);
				flex-shrink: 0;
			}
		}
	}

	.paragraphes {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;

		p {
			margin: 0;
			font-family: var(--f-body);
			font-size: 0.95rem;
			line-height: 1.65;
			color: var(--bone-soft);
		}
	}

	.cta-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.75em;
		padding: 1.1em 1.6em;
		background: var(--gold);
		color: var(--void);
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		text-decoration: none;
		align-self: flex-start;
		transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
		border: 1px solid var(--gold);

		&:hover {
			background: transparent;
			color: var(--gold);
			gap: 1.2em;
		}
	}

	.tagline {
		margin: 0;
		font-family: var(--f-display);
		font-size: 0.95rem;
		line-height: 1.5;
		color: var(--bone-soft);
		padding-top: 1.25rem;
		border-top: 1px solid var(--rule);

		em {
			color: var(--bone);
			font-family: var(--f-display);
			font-style: italic;
		}
	}

	/* ── RIGHT column ── */
	.hero__right {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto;
		gap: 1rem;

		@include breakpoint('medium') {
			gap: 1.25rem;
		}

		@include breakpoint('large') {
			grid-template-rows: 1.25fr auto 1fr;
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem;
		}
	}

	.hero__photo {
		margin: 0;
		position: relative;
		overflow: hidden;
		aspect-ratio: 4 / 5;
		background: var(--coal);

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(25%) contrast(1.08) brightness(0.92);
			will-change: transform;
		}

		figcaption {
			position: absolute;
			left: 0.85rem;
			right: 0.85rem;
			bottom: 0.85rem;
			display: flex;
			justify-content: space-between;
			font-family: var(--f-mono);
			font-size: 9px;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--bone);
			text-shadow: 0 1px 10px rgba(0, 0, 0, 0.7);
		}
		figcaption .cap {
			color: var(--gold);
		}
	}

	.hero__photo--1 {
		grid-column: 1 / -1;

		@include breakpoint('large') {
			grid-column: 1 / -1;
			grid-row: 1 / 2;
			aspect-ratio: auto;
			min-height: 340px;
		}
	}

	.hero__photo--2 {
		@include breakpoint('large') {
			grid-column: 2 / 3;
			grid-row: 3 / 4;
			aspect-ratio: auto;
			min-height: 220px;
		}
	}

	.hero__counter {
		grid-column: 1 / -1;
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding: 1.25rem;
		background: var(--graphite);
		border: 1px solid var(--rule);

		@include breakpoint('large') {
			grid-column: 1 / 2;
			grid-row: 3 / 4;
			padding: 1.5rem;
		}
	}

	.counter__num {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(3.5rem, 9vw, 6rem);
		line-height: 0.85;
		color: var(--gold);
		letter-spacing: -0.04em;
		font-variant-numeric: tabular-nums;
	}
	.counter__meta {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.counter__unit {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1.1rem;
		color: var(--bone);
	}
	.counter__label {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--bone-soft);
	}

	/* ── FOOTER infos hero ── */
	.hero__footer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-top: 3.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--rule);

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
			gap: 2rem;
			margin-top: 4.5rem;
		}
	}
	.item {
		font-family: var(--f-body);
		font-size: 0.92rem;
		color: var(--bone);
	}
	.item--right {
		text-align: right;
		font-size: 1.1rem;
		color: var(--gold);
	}
	.label {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--bone-soft);
		margin-bottom: 0.4rem;
	}
</style>
