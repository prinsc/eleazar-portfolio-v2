<script>
	import { onMount } from 'svelte';
	import { Tent, Wind, Sun } from 'lucide-svelte';

	let { tonnelle = null } = $props();

	const defaults = {
		texte: "La Tonnelle, c'est l'espace élégant que nous installons et démontons pour vos événements en extérieur. Modulable, prête à accueillir vos invités — vous profitez, on gère.",
		photos: [
			'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=85',
			'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1400&q=85',
			'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&q=85',
			'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1400&q=85',
			'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1400&q=85'
		],
		specs: [
			{ k: 'SURFACE', v: '5×8 m', u: 'COUVERTURE' },
			{ k: 'CAPACITÉ', v: '~40 PAX', u: 'STANDING' },
			{ k: 'MONTAGE', v: '~2H', u: 'INCL. DÉCO' },
			{ k: 'EXTÉRIEUR', v: 'OK', u: 'TOUTES SAISONS' }
		]
	};

	const texte = $derived(tonnelle?.texte ?? defaults.texte);
	const photos = $derived(tonnelle?.photos && tonnelle.photos.length > 0 ? tonnelle.photos : defaults.photos);
	const specs = defaults.specs;

	let titleEl;
	let bigImgEl;
	let stripImgEls = $state([]);

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(titleEl, {
			opacity: 0, y: 30, duration: 1, ease: 'power3.out',
			scrollTrigger: { trigger: titleEl, start: 'top 85%' }
		});
		if (bigImgEl) {
			gsap.from(bigImgEl, {
				clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'expo.out',
				scrollTrigger: { trigger: bigImgEl, start: 'top 85%' }
			});
		}
		stripImgEls.forEach((el, i) => {
			if (!el) return;
			gsap.from(el, {
				opacity: 0, x: 40, duration: 0.7, delay: i * 0.08,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 92%' }
			});
		});
	});
</script>

<section class="tn" id="tonnelle">
	<!-- Header -->
	<header class="tn__head" bind:this={titleEl}>
		<div class="tn__head-l">
			<span class="tn__tag">SECTION/03 — OUTDOOR.MODULE</span>
			<h2 class="tn__title">
				LA<br />
				<span class="tn__title-stroke">TONNELLE</span>
			</h2>
		</div>
		<div class="tn__head-r">
			<p class="tn__txt">{texte}</p>
			<!-- Logo placeholder type signal box -->
			<div class="tn__logo">
				<div class="tn__logo-grid">
					<Tent size={28} strokeWidth={1.4} />
				</div>
				<div class="tn__logo-meta">
					<span class="tn__logo-name">LA TONNELLE</span>
					<span class="tn__logo-sub">MJM/MOD·OUT/v.2</span>
				</div>
			</div>
		</div>
	</header>

	<!-- Hero photo + specs en split -->
	<div class="tn__hero">
		<figure class="tn__big">
			<img bind:this={bigImgEl} src={photos[0]} alt="Tonnelle MJM — installation extérieure" loading="lazy" />
			<figcaption>
				<span class="tn__big-cap">[ FRAME 01/05 — SETUP ]</span>
				<span class="tn__big-coord">50.6617°N · 3.6924°E</span>
			</figcaption>

			<!-- Crosshair overlay -->
			<div class="tn__cross" aria-hidden="true">
				<span class="tn__cross-h"></span>
				<span class="tn__cross-v"></span>
				<span class="tn__cross-c"></span>
			</div>
		</figure>

		<div class="tn__specs">
			<div class="tn__specs-head">SPECIFICATIONS</div>
			{#each specs as s}
				<div class="tn__spec">
					<span class="tn__spec-k">{s.k}</span>
					<span class="tn__spec-v">{s.v}</span>
					<span class="tn__spec-u">{s.u}</span>
				</div>
			{/each}
			<div class="tn__specs-foot">
				<Wind size={12} strokeWidth={1.5} /><Sun size={12} strokeWidth={1.5} />
				<span>RATED FOR ALL CONDITIONS</span>
			</div>
		</div>
	</div>

	<!-- Strip horizontale photos additionnelles -->
	<div class="tn__strip">
		<div class="tn__strip-rail"></div>
		{#each photos.slice(1) as src, i (src + i)}
			<figure class="tn__cell" bind:this={stripImgEls[i]}>
				<!-- IMAGE CLIENT — photo tonnelle réelle -->
				<img src={src} alt="Tonnelle frame {i + 2}" loading="lazy" />
				<figcaption>FRAME 0{i + 2}/05</figcaption>
			</figure>
		{/each}
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.tn {
		padding: 5rem 1.25rem 6rem;
		background: var(--bg);
		border-bottom: 1px solid var(--rule-hot);

		@include breakpoint('medium') {
			padding: 7rem 2rem 8rem;
		}
	}

	/* HEAD */
	.tn__head {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		margin-bottom: 3rem;

		@include breakpoint('large') {
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
			align-items: end;
		}
	}
	.tn__tag {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.22em;
		color: var(--signal);
	}
	.tn__title {
		margin: 1rem 0 0;
		font-family: var(--f-display);
		font-weight: 900;
		font-size: clamp(3.5rem, 13vw, 11rem);
		line-height: 0.82;
		letter-spacing: -0.045em;
		text-transform: uppercase;
		color: var(--ink);
	}
	.tn__title-stroke {
		color: transparent;
		-webkit-text-stroke: 1.5px var(--signal);
	}
	.tn__head-r {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.tn__txt {
		margin: 0;
		font-family: var(--f-body);
		font-size: 1rem;
		line-height: 1.6;
		color: var(--ink-dim);
		max-width: 32rem;
	}
	.tn__logo {
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.85rem 1rem;
		border: 1px solid var(--rule-hot);
		background: var(--panel);
		align-self: flex-start;
	}
	.tn__logo-grid {
		width: 50px; height: 50px;
		background: var(--signal);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--bg);
	}
	.tn__logo-meta {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}
	.tn__logo-name {
		font-family: var(--f-display);
		font-size: 14px;
		letter-spacing: -0.01em;
		color: var(--ink);
	}
	.tn__logo-sub {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		color: var(--signal);
	}

	/* HERO photo + specs */
	.tn__hero {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		margin-bottom: 1rem;
		border: 1px solid var(--rule-hot);

		@include breakpoint('large') {
			grid-template-columns: 1.6fr 1fr;
		}
	}
	.tn__big {
		margin: 0;
		position: relative;
		overflow: hidden;
		aspect-ratio: 16 / 10;

		@include breakpoint('large') {
			aspect-ratio: auto;
		}

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(20%) contrast(1.1) brightness(0.9);
		}

		figcaption {
			position: absolute;
			top: 1rem; left: 1rem; right: 1rem;
			display: flex;
			justify-content: space-between;
			font-family: var(--f-mono);
			font-size: 10px;
			letter-spacing: 0.16em;
			color: var(--ink);
			text-shadow: 0 1px 8px rgba(0, 0, 0, 0.7);
		}
	}
	.tn__big-cap { color: var(--signal); }
	.tn__big-coord { color: var(--ink); opacity: 0.85; }

	/* Crosshair */
	.tn__cross {
		position: absolute;
		inset: 0;
		pointer-events: none;
		span { position: absolute; }
	}
	.tn__cross-h {
		top: 50%; left: 0; right: 0;
		height: 1px;
		background: rgba(255, 107, 26, 0.35);
		transform: translateY(-50%);
	}
	.tn__cross-v {
		left: 50%; top: 0; bottom: 0;
		width: 1px;
		background: rgba(255, 107, 26, 0.35);
		transform: translateX(-50%);
	}
	.tn__cross-c {
		top: 50%; left: 50%;
		width: 14px; height: 14px;
		border: 1px solid var(--signal);
		transform: translate(-50%, -50%);
	}

	.tn__specs {
		background: var(--panel);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		border-top: 1px solid var(--rule-hot);

		@include breakpoint('large') {
			border-top: none;
			border-left: 1px solid var(--rule-hot);
		}
	}
	.tn__specs-head {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		color: var(--signal);
		padding-bottom: 0.65rem;
		border-bottom: 1px solid var(--rule);
		margin-bottom: 0.4rem;
	}
	.tn__spec {
		display: grid;
		grid-template-columns: 90px 1fr 1fr;
		gap: 0.75rem;
		align-items: baseline;
		padding: 0.5rem 0;
		border-bottom: 1px dashed var(--rule);

		&:last-of-type { border-bottom: none; }
	}
	.tn__spec-k {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		color: var(--ink-dim);
	}
	.tn__spec-v {
		font-family: var(--f-display);
		font-size: 1.4rem;
		font-weight: 900;
		color: var(--signal);
		letter-spacing: -0.02em;
	}
	.tn__spec-u {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		color: var(--ink-mute);
		text-align: right;
	}
	.tn__specs-foot {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.5rem;
		padding-top: 0.65rem;
		border-top: 1px solid var(--rule);
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		color: var(--led);

		:global(svg) { color: var(--led); }
	}

	/* STRIP photos */
	.tn__strip {
		position: relative;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1px;
		background: var(--rule-hot);
		padding: 1px;
		margin-top: 1rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.tn__strip-rail {
		position: absolute;
		top: -0.5rem;
		left: 0; right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--signal), transparent);
	}
	.tn__cell {
		margin: 0;
		position: relative;
		overflow: hidden;
		background: var(--panel);
		aspect-ratio: 4 / 5;

		img {
			display: block;
			width: 100%; height: 100%;
			object-fit: cover;
			filter: grayscale(40%) contrast(1.08) brightness(0.85);
			transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s ease;
		}
		&:hover img {
			transform: scale(1.06);
			filter: grayscale(0%) contrast(1.1) brightness(1);
		}

		figcaption {
			position: absolute;
			bottom: 0.7rem; left: 0.7rem;
			font-family: var(--f-mono);
			font-size: 9px;
			letter-spacing: 0.2em;
			color: var(--signal);
			background: rgba(10, 10, 11, 0.8);
			padding: 0.25em 0.5em;
		}
	}
</style>
