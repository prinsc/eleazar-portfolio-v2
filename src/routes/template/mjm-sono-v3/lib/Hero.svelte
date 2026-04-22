<script>
	import { onMount } from 'svelte';
	import { Check } from 'lucide-svelte';

	let { infos = null, sono = null, heroImage = null } = $props();

	const points = [
		'Prestation pro & soignée',
		'Ambiance garantie début/fin',
		'Passion au service de l\'événement',
		'Piste de danse toujours vivante'
	];

	const paragraphes = [
		"Sonorisation, éclairage, animation — une prise en charge complète pour un événement clé en main.",
		"30+ années d'expérience terrain. Matériel professionnel, savoir-faire reconnu."
	];

	let heroEl;
	let titleLines = $state([]);
	let kickerEl;
	let ledeEl;
	let vuBars = $state([]);
	let stripEl;
	let counterEl;
	let bigImgEl;

	const img1 = $derived(
		heroImage ??
			'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800&q=85'
		/* IMAGE CLIENT — photo ambiance scène */
	);

	onMount(async () => {
		const { gsap } = await import('gsap');

		gsap.set(heroEl, { visibility: 'visible' });
		gsap.set(kickerEl, { opacity: 0, x: -20 });
		gsap.set(titleLines, { yPercent: 110 });
		gsap.set(ledeEl, { opacity: 0, y: 18 });
		gsap.set(stripEl?.children ?? [], { opacity: 0, y: 14 });
		gsap.set(counterEl, { opacity: 0 });
		gsap.set(bigImgEl, { scale: 1.15, opacity: 0 });

		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
		tl.to(kickerEl, { opacity: 1, x: 0, duration: 0.6 })
			.to(titleLines, { yPercent: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out' }, '-=0.2')
			.to(bigImgEl, { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' }, '-=1')
			.to(ledeEl, { opacity: 1, y: 0, duration: 0.8 }, '-=1.4')
			.to(stripEl?.children ?? [], { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 }, '-=0.6')
			.to(counterEl, { opacity: 1, duration: 0.5 }, '-=0.3');

		// Counter 30 ans
		const target = { v: 0 };
		gsap.to(target, {
			v: sono?.anneesExperience ?? 30,
			duration: 1.8,
			delay: 0.9,
			ease: 'power2.out',
			onUpdate: () => {
				if (counterEl) counterEl.textContent = Math.round(target.v).toString().padStart(2, '0');
			}
		});

		// VU-meter animation continue
		vuBars.forEach((bar, i) => {
			if (!bar) return;
			const loop = () => {
				const h = 20 + Math.random() * 80;
				gsap.to(bar, {
					height: `${h}%`,
					duration: 0.15 + Math.random() * 0.25,
					ease: 'power1.inOut',
					onComplete: loop
				});
			};
			gsap.delayedCall(i * 0.04, loop);
		});

		// Parallaxe image
		const onScroll = () => {
			if (!heroEl) return;
			const rect = heroEl.getBoundingClientRect();
			if (rect.bottom < 0 || rect.top > window.innerHeight) return;
			const p = -rect.top / window.innerHeight;
			gsap.to(bigImgEl, { yPercent: p * 18, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<section class="hero" id="top" bind:this={heroEl}>
	<!-- BG photo pleine largeur, traitée -->
	<div class="hero__bg">
		<img bind:this={bigImgEl} src={img1} alt="Ambiance événement — régie son et lumière" loading="eager" />
		<div class="hero__bg-tint"></div>
		<div class="hero__bg-grid" aria-hidden="true"></div>
	</div>

	<!-- Markers techniques coins -->
	<span class="corner corner--tl">+</span>
	<span class="corner corner--tr">+</span>
	<span class="corner corner--bl">+</span>
	<span class="corner corner--br">+</span>

	<!-- Strip info technique gauche verticale -->
	<aside class="spine" aria-hidden="true">
		<span>MJM/SONO/YOHAN</span>
		<span class="spine__sep">////</span>
		<span>REC · LIVE · BE</span>
	</aside>

	<!-- Contenu principal -->
	<div class="hero__main">
		<div class="kicker" bind:this={kickerEl}>
			<span class="kicker__sq"></span>
			<span class="kicker__tag">INPUT·01</span>
			<span class="kicker__sep">/</span>
			<span class="kicker__txt">
				SON · LUMIÈRE · ANIMATION — {infos?.ville ?? 'OSTICHES'}, {infos?.pays ?? 'BELGIQUE'}
			</span>
			<span class="kicker__peak">PEAK</span>
		</div>

		<h1 class="title">
			<span class="title__mask"><span class="title__line" bind:this={titleLines[0]}>DONNEZ</span></span>
			<span class="title__mask"><span class="title__line title__line--outline" bind:this={titleLines[1]}>UNE AUTRE</span></span>
			<span class="title__mask">
				<span class="title__line title__line--accent" bind:this={titleLines[2]}>
					<span class="title__slash">/</span>DIMENSION
				</span>
			</span>
			<span class="title__mask"><span class="title__line" bind:this={titleLines[3]}>À VOS ÉVÉNEMENTS.</span></span>
		</h1>

		<div class="lede" bind:this={ledeEl}>
			<div class="lede__left">
				{#each paragraphes as p}
					<p>{p}</p>
				{/each}
				<ul class="lede__pts">
					{#each points as p}
						<li>
							<Check size={12} strokeWidth={2.5} />
							<span>{p}</span>
						</li>
					{/each}
				</ul>

				<a href="#contact" class="lede__cta">
					<span class="lede__cta-bar"></span>
					<span>DEMANDER UN DEVIS</span>
					<span class="lede__cta-arrow">→</span>
				</a>
			</div>

			<!-- VU meter column -->
			<div class="vu" aria-hidden="true">
				<div class="vu__scale">
					<span>0 dB</span>
					<span class="vu__scale-mid">-12</span>
					<span>-∞</span>
				</div>
				<div class="vu__bars">
					{#each Array(22) as _, i (i)}
						<span class="vu__bar" class:vu__bar--hot={i < 3} bind:this={vuBars[i]}></span>
					{/each}
				</div>
				<div class="vu__label">SIGNAL / L</div>
			</div>
		</div>
	</div>

	<!-- Channel strip inférieur : infos en ligne type console -->
	<div class="strip" bind:this={stripEl}>
		<div class="strip__cell">
			<span class="strip__k">GAIN</span>
			<span class="strip__v strip__v--big" bind:this={counterEl}>00</span>
			<span class="strip__u">ANS · TERRAIN</span>
		</div>
		<div class="strip__cell">
			<span class="strip__k">ZONE</span>
			<span class="strip__v">{sono?.zoneIntervention ?? 'Hainaut & nord FR'}</span>
			<span class="strip__u">INTERVENTION</span>
		</div>
		<div class="strip__cell">
			<span class="strip__k">RADIUS</span>
			<span class="strip__v">{sono?.rayonKm ?? 80} <span class="strip__unit">KM</span></span>
			<span class="strip__u">AUTOUR OSTICHES</span>
		</div>
		<div class="strip__cell">
			<span class="strip__k">MODE</span>
			<span class="strip__v">IN · OUT</span>
			<span class="strip__u">INDOOR / OUTDOOR</span>
		</div>
		<div class="strip__cell strip__cell--scroll">
			<span class="strip__scroll">SCROLL ↓</span>
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.hero {
		position: relative;
		min-height: 100vh;
		padding: 7rem 0 0;
		visibility: hidden;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		@include breakpoint('medium') {
			padding: 8.5rem 0 0;
		}
	}

	/* ============ BG photo ============ */
	.hero__bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;

		img {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(55%) contrast(1.15) brightness(0.55) saturate(1.1);
			will-change: transform;
		}
	}
	.hero__bg-tint {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse at 70% 30%, rgba(255, 107, 26, 0.18), transparent 55%),
			linear-gradient(180deg, rgba(10, 10, 11, 0.7) 0%, rgba(10, 10, 11, 0.85) 60%, var(--bg) 100%);
	}
	.hero__bg-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(to right, rgba(242, 242, 239, 0.04) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(242, 242, 239, 0.04) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: radial-gradient(ellipse at center, black 0%, transparent 85%);
	}

	/* Coins techniques */
	.corner {
		position: absolute;
		color: var(--signal);
		font-family: var(--f-mono);
		font-size: 18px;
		z-index: 3;
		line-height: 1;
		&--tl { top: 5.5rem; left: 0.75rem; }
		&--tr { top: 5.5rem; right: 0.75rem; }
		&--bl { bottom: 0.75rem; left: 0.75rem; }
		&--br { bottom: 0.75rem; right: 0.75rem; }

		@include breakpoint('medium') {
			&--tl, &--tr { top: 6.5rem; }
			&--tl, &--bl { left: 1.25rem; }
			&--tr, &--br { right: 1.25rem; }
		}
	}

	/* Spine verticale */
	.spine {
		display: none;

		@include breakpoint('large') {
			display: flex;
			position: absolute;
			left: 1.5rem;
			top: 50%;
			transform: translateY(-50%) rotate(-90deg);
			transform-origin: left top;
			gap: 1rem;
			font-family: var(--f-mono);
			font-size: 10px;
			letter-spacing: 0.3em;
			color: var(--ink-mute);
			z-index: 3;
			white-space: nowrap;
		}
	}
	.spine__sep { color: var(--signal); }

	/* ============ MAIN ============ */
	.hero__main {
		position: relative;
		z-index: 2;
		padding: 1rem 1.25rem 3rem;
		flex: 1;
		display: flex;
		flex-direction: column;

		@include breakpoint('medium') {
			padding: 1.5rem 2rem 4rem;
		}

		@include breakpoint('large') {
			padding: 1.5rem 3.5rem 4rem;
		}
	}

	/* KICKER */
	.kicker {
		display: inline-flex;
		align-items: center;
		gap: 0.7em;
		padding: 0.5rem 0;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		color: var(--ink-dim);
		margin-bottom: 1.75rem;
		flex-wrap: wrap;

		@include breakpoint('medium') {
			font-size: 11px;
			margin-bottom: 2.25rem;
		}
	}
	.kicker__sq {
		width: 10px; height: 10px;
		background: var(--signal);
	}
	.kicker__tag {
		color: var(--signal);
		padding: 0.25em 0.55em;
		border: 1px solid var(--signal);
	}
	.kicker__sep { color: var(--ink-mute); }
	.kicker__txt { color: var(--ink); }
	.kicker__peak {
		margin-left: auto;
		padding: 0.25em 0.55em;
		background: var(--led);
		color: var(--bg);
		font-weight: 600;
		animation: peak 2s steps(2) infinite;
	}
	@keyframes peak {
		0%, 60% { opacity: 1; }
		70%, 100% { opacity: 0.3; }
	}

	/* TITRE */
	.title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 900;
		line-height: 0.88;
		letter-spacing: -0.035em;
		text-transform: uppercase;
		color: var(--ink);
	}
	.title__mask {
		display: block;
		overflow: hidden;
		padding: 0.03em 0;
	}
	.title__line {
		display: block;
		will-change: transform;
		font-size: clamp(2.4rem, 10vw, 8.5rem);
		line-height: 0.88;
	}
	.title__line--outline {
		color: transparent;
		-webkit-text-stroke: 1.5px var(--ink);
		font-weight: 900;
	}
	.title__line--accent {
		color: var(--signal);
	}
	.title__slash {
		color: var(--ink);
		font-weight: 400;
		font-family: var(--f-num);
		margin-right: 0.1em;
	}

	/* LEDE : text + VU meter */
	.lede {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-top: 2.25rem;
		align-items: start;

		@include breakpoint('medium') {
			grid-template-columns: 1fr auto;
			gap: 3rem;
			margin-top: 3rem;
		}
	}
	.lede__left {
		max-width: 44rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;

		p {
			margin: 0;
			font-family: var(--f-body);
			font-size: clamp(0.95rem, 1.5vw, 1.05rem);
			line-height: 1.6;
			color: var(--ink);
			max-width: 38rem;
		}
	}
	.lede__pts {
		list-style: none;
		margin: 0.5rem 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.5rem 1.5rem;

		@include breakpoint('small') {
			grid-template-columns: 1fr 1fr;
		}

		li {
			display: flex;
			align-items: center;
			gap: 0.6rem;
			font-family: var(--f-mono);
			font-size: 11px;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			color: var(--ink-dim);
			padding: 0.4rem 0;
			border-top: 1px solid var(--rule);

			:global(svg) { color: var(--signal); flex-shrink: 0; }
		}
	}
	.lede__cta {
		display: inline-flex;
		align-items: center;
		gap: 0.85em;
		margin-top: 1rem;
		padding: 1.1em 1.5em;
		background: var(--signal);
		color: var(--bg);
		font-family: var(--f-mono);
		font-weight: 600;
		font-size: 12px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		text-decoration: none;
		align-self: flex-start;
		transition: transform 0.3s ease, background 0.3s ease;

		&:hover {
			background: var(--ink);
			.lede__cta-arrow { transform: translateX(6px); }
		}
	}
	.lede__cta-bar {
		width: 30px; height: 2px;
		background: var(--bg);
	}
	.lede__cta-arrow {
		transition: transform 0.3s ease;
	}

	/* VU METER */
	.vu {
		display: none;

		@include breakpoint('medium') {
			display: flex;
			flex-direction: column;
			gap: 0.4rem;
			width: 90px;
			padding: 0.85rem;
			background: rgba(10, 10, 11, 0.55);
			border: 1px solid var(--rule-hot);
		}
	}
	.vu__scale {
		display: flex;
		justify-content: space-between;
		font-family: var(--f-mono);
		font-size: 8px;
		letter-spacing: 0.1em;
		color: var(--ink-mute);
	}
	.vu__scale-mid { color: var(--amber); }
	.vu__bars {
		display: grid;
		grid-template-columns: repeat(22, 1fr);
		gap: 2px;
		align-items: flex-end;
		height: 90px;
	}
	.vu__bar {
		background: var(--led);
		height: 30%;
		width: 100%;
		transform-origin: bottom;
	}
	.vu__bar--hot { background: var(--signal); }
	.vu__label {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.2em;
		color: var(--signal);
		text-align: center;
		margin-top: 0.2rem;
	}

	/* ============ STRIP inférieur ============ */
	.strip {
		position: relative;
		z-index: 2;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		border-top: 1px solid var(--rule-hot);
		background: rgba(10, 10, 11, 0.72);
		backdrop-filter: blur(6px);

		@include breakpoint('medium') {
			grid-template-columns: 1.3fr 1fr 1fr 1fr auto;
		}
	}
	.strip__cell {
		padding: 1rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		border-right: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);

		&:last-child { border-right: none; }

		@include breakpoint('medium') {
			padding: 1.25rem 1.5rem;
			border-bottom: none;
		}
	}
	.strip__k {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.25em;
		color: var(--signal);
	}
	.strip__v {
		font-family: var(--f-body);
		font-weight: 500;
		font-size: 0.95rem;
		color: var(--ink);
		line-height: 1.2;
	}
	.strip__v--big {
		font-family: var(--f-display);
		font-size: clamp(2rem, 4vw, 3rem);
		line-height: 0.9;
		letter-spacing: -0.03em;
		color: var(--signal);
		font-variant-numeric: tabular-nums;
	}
	.strip__unit { font-size: 0.85rem; color: var(--ink-dim); }
	.strip__u {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		color: var(--ink-mute);
		text-transform: uppercase;
	}
	.strip__cell--scroll {
		align-items: flex-end;
		justify-content: center;
	}
	.strip__scroll {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		color: var(--signal);
		animation: scrollPulse 1.8s ease-in-out infinite;
	}
	@keyframes scrollPulse {
		0%, 100% { transform: translateY(0); opacity: 1; }
		50% { transform: translateY(4px); opacity: 0.5; }
	}
</style>
