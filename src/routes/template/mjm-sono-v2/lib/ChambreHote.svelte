<script>
	import { onMount } from 'svelte';
	import { BedDouble, Wifi, Coffee, MapPin, ExternalLink, Home } from 'lucide-svelte';

	let { chambre = null } = $props();

	const defaults = {
		photos: [
			'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=85',
			'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=85',
			'https://images.unsplash.com/photo-1551776235-dde6d482980b?w=1200&q=85',
			'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85'
		],
		plateformes: [
			{ nom: 'Booking.com', url: '#' },
			{ nom: 'Airbnb', url: '#' },
			{ nom: 'Gîtes de Wallonie', url: '#' }
		]
	};

	const photos = $derived(chambre?.photos ?? defaults.photos);
	const plateformes = $derived(chambre?.plateformes ?? defaults.plateformes);

	let titleEl;
	let polaroidEls = $state([]);
	let cardEl;

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(titleEl, {
			opacity: 0,
			y: 30,
			duration: 1,
			ease: 'power3.out',
			scrollTrigger: { trigger: titleEl, start: 'top 85%' }
		});

		polaroidEls.forEach((el, i) => {
			if (!el) return;
			const rot = parseFloat(el.dataset.rot ?? 0);
			gsap.from(el, {
				opacity: 0,
				y: 50,
				rotation: rot - 8,
				duration: 0.9,
				delay: i * 0.12,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 92%' }
			});
		});

		if (cardEl) {
			gsap.from(cardEl, {
				opacity: 0,
				x: 40,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: { trigger: cardEl, start: 'top 88%' }
			});
		}
	});

	const rotations = [-3.5, 2, -1.5, 4];
</script>

<section class="ch" id="chambre">
	<header class="ch__head" bind:this={titleEl}>
		<div class="ch__head-meta">
			<span class="ch__tag">SECTION/04 - STAY.MODULE</span>
			<span class="ch__co">37 RUE DE FLOBECQ · 7804 OST · BE</span>
		</div>
		<h2 class="ch__title">
			CHAMBRE
			<span class="ch__title-it">d'hôte<span class="ch__title-dot">.</span></span>
		</h2>
		<p class="ch__sub">
			Un espace paisible à deux pas de l'activité. Idéal pour prolonger un événement ou simplement
			séjourner.
		</p>
	</header>

	<div class="ch__main">
		<!-- Polaroid stack scattered -->
		<div class="ch__stack">
			{#each photos as src, i (src + i)}
				<figure
					class="ch__poly"
					bind:this={polaroidEls[i]}
					data-rot={rotations[i] ?? 0}
					style="--rot: {rotations[i] ?? 0}deg; --i: {i}"
				>
					<!-- IMAGE CLIENT - photo chambre d'hôte -->
					<div class="ch__poly-img">
						<img {src} alt="Chambre d'hôte vue {i + 1}" loading="lazy" />
						<span class="ch__poly-corner">+</span>
					</div>
					<figcaption class="ch__poly-cap">
						<span>HALTE · 0{i + 1}/04</span>
						<span class="ch__poly-time">EXP {15 + i * 3}s</span>
					</figcaption>
				</figure>
			{/each}
		</div>

		<!-- Carte de visite type fiche d'enregistrement -->
		<aside class="ch__card" bind:this={cardEl}>
			<div class="ch__card-band">
				<span>BOOKING SHEET</span>
				<span class="ch__card-band-led"></span>
			</div>

			<div class="ch__card-body">
				<div class="ch__card-logo">
					<Home size={20} strokeWidth={1.4} />
				</div>

				<h3 class="ch__card-title">La Halte de Flobecq</h3>
				<p class="ch__card-desc">
					Ambiance contemporaine, cuisine partagée, jardin privatif. À 30 min de Lille, 1h de
					Bruxelles.
				</p>

				<dl class="ch__card-list">
					<div class="ch__card-row">
						<dt><MapPin size={13} strokeWidth={1.5} /></dt>
						<dd>337 rte de Flobecq · 7804 Ostiches</dd>
					</div>
					<div class="ch__card-row">
						<dt><BedDouble size={13} strokeWidth={1.5} /></dt>
						<dd>2 chambres · 4 personnes</dd>
					</div>
					<div class="ch__card-row">
						<dt><Wifi size={13} strokeWidth={1.5} /></dt>
						<dd>Wi-Fi fibre inclus</dd>
					</div>
					<div class="ch__card-row">
						<dt><Coffee size={13} strokeWidth={1.5} /></dt>
						<dd>Petit-déjeuner maison</dd>
					</div>
				</dl>

				<div class="ch__card-sig">
					<span class="ch__card-sig-k">SIGNED BY</span>
					<span class="ch__card-sig-v">YOHAN</span>
					<span class="ch__card-sig-stamp">- EST.1995</span>
				</div>
			</div>

			<!-- Plateformes -->
			<div class="ch__card-plf">
				<span class="ch__card-plf-label">RÉSERVER VIA</span>
				<div class="ch__card-plf-list">
					{#each plateformes as p}
						<a href={p.url} class="ch__card-plf-link" target="_blank" rel="noopener">
							<span>{p.nom}</span>
							<ExternalLink size={11} strokeWidth={1.6} />
						</a>
					{/each}
				</div>
			</div>
		</aside>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.ch {
		padding: 5rem 1.25rem 6rem;
		background: var(--panel);
		border-bottom: 1px solid var(--rule-hot);
		position: relative;

		@include breakpoint('medium') {
			padding: 7rem 2rem 8rem;
		}

		/* gros gradient ambiance chaude bas */
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 50%;
			background: radial-gradient(ellipse at 80% 100%, rgba(255, 107, 26, 0.07), transparent 60%);
			pointer-events: none;
		}
	}

	.ch__head {
		max-width: 60rem;
		margin-bottom: 3.5rem;
		position: relative;
		z-index: 2;
	}
	.ch__head-meta {
		display: flex;
		justify-content: space-between;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
		padding-bottom: 0.85rem;
		border-bottom: 1px dashed var(--rule);
	}
	.ch__tag {
		color: var(--signal);
	}
	.ch__co {
		color: var(--ink-dim);
	}
	.ch__title {
		margin: 0 0 1rem;
		font-family: var(--f-display);
		font-weight: 900;
		font-size: clamp(3rem, 11vw, 9rem);
		line-height: 0.85;
		letter-spacing: -0.045em;
		text-transform: uppercase;
		color: var(--ink);
	}
	.ch__title-it {
		font-family: 'Archivo', sans-serif;
		font-style: italic;
		font-weight: 300;
		text-transform: lowercase;
		color: var(--signal);
		letter-spacing: -0.03em;
	}
	.ch__title-dot {
		color: var(--ink);
	}
	.ch__sub {
		margin: 0;
		font-family: var(--f-body);
		font-size: 1rem;
		color: var(--ink-dim);
		max-width: 32rem;
		line-height: 1.55;
	}

	/* MAIN */
	.ch__main {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		position: relative;
		z-index: 2;

		@include breakpoint('large') {
			grid-template-columns: 1.3fr 1fr;
			gap: 4rem;
			align-items: start;
		}
	}

	/* STACK polaroids dispersés */
	.ch__stack {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem 0.75rem;
		padding: 1rem 0;

		@include breakpoint('medium') {
			gap: 2rem 1rem;
			padding: 2rem 1rem;
		}
	}

	.ch__poly {
		margin: 0;
		background: var(--ink);
		padding: 8px 8px 30px;
		transform: rotate(var(--rot));
		transition:
			transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
			z-index 0s 0.4s;
		position: relative;
		box-shadow:
			0 4px 18px rgba(0, 0, 0, 0.45),
			0 0 0 1px rgba(0, 0, 0, 0.3);

		@include breakpoint('medium') {
			padding: 10px 10px 38px;

			&:nth-child(1) {
				transform: rotate(var(--rot)) translateY(0);
			}
			&:nth-child(2) {
				transform: rotate(var(--rot)) translateY(20px);
			}
			&:nth-child(3) {
				transform: rotate(var(--rot)) translateY(-10px);
			}
			&:nth-child(4) {
				transform: rotate(var(--rot)) translateY(15px);
			}
		}

		&:hover {
			transform: rotate(0deg) scale(1.04);
			z-index: 5;
			transition:
				transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
				z-index 0s 0s;
		}
	}
	.ch__poly-img {
		position: relative;
		aspect-ratio: 1;
		overflow: hidden;
		background: var(--bg);

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: contrast(0.95) saturate(0.85);
		}
	}
	.ch__poly-corner {
		position: absolute;
		top: 6px;
		right: 6px;
		font-family: var(--f-mono);
		color: var(--signal);
		background: rgba(10, 10, 11, 0.7);
		padding: 0 4px;
		font-size: 12px;
		line-height: 1;
	}
	.ch__poly-cap {
		display: flex;
		justify-content: space-between;
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.16em;
		color: var(--bg);
		padding-top: 0.75rem;
	}
	.ch__poly-time {
		color: var(--signal-deep);
	}

	/* CARD */
	.ch__card {
		background: var(--bg);
		border: 1px solid var(--rule-hot);
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.ch__card-band {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.7rem 1rem;
		background: var(--signal);
		color: var(--bg);
		font-family: var(--f-mono);
		font-weight: 600;
		font-size: 11px;
		letter-spacing: 0.22em;
	}
	.ch__card-band-led {
		width: 8px;
		height: 8px;
		background: var(--bg);
		border-radius: 50%;
		animation: blinkLed 1.4s steps(2) infinite;
	}
	@keyframes blinkLed {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0.2;
		}
	}

	.ch__card-body {
		padding: 1.5rem 1.5rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.ch__card-logo {
		width: 48px;
		height: 48px;
		border: 1px solid var(--rule-hot);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--signal);
	}
	.ch__card-title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 900;
		font-size: 1.65rem;
		line-height: 1;
		letter-spacing: -0.02em;
		text-transform: uppercase;
		color: var(--ink);
	}
	.ch__card-desc {
		margin: 0;
		font-family: var(--f-body);
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--ink-dim);
	}
	.ch__card-list {
		margin: 0.5rem 0 0;
		display: flex;
		flex-direction: column;
		gap: 0;
		border-top: 1px solid var(--rule);
	}
	.ch__card-row {
		display: grid;
		grid-template-columns: 24px 1fr;
		gap: 0.75rem;
		align-items: center;
		padding: 0.55rem 0;
		border-bottom: 1px solid var(--rule);
		font-family: var(--f-body);
		font-size: 0.88rem;
		color: var(--ink);

		dt,
		dd {
			margin: 0;
		}
		dt {
			color: var(--signal);
			display: flex;
			align-items: center;
		}
	}
	.ch__card-sig {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		padding-top: 0.85rem;
		border-top: 1px dashed var(--rule);
		flex-wrap: wrap;
	}
	.ch__card-sig-k {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.22em;
		color: var(--ink-mute);
	}
	.ch__card-sig-v {
		font-family: var(--f-display);
		font-size: 1.5rem;
		color: var(--signal);
		letter-spacing: -0.01em;
	}
	.ch__card-sig-stamp {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.22em;
		color: var(--ink-dim);
		margin-left: auto;
	}

	.ch__card-plf {
		padding: 1.25rem 1.5rem 1.5rem;
		border-top: 1px solid var(--rule-hot);
		background: var(--panel-2);
	}
	.ch__card-plf-label {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		color: var(--signal);
		margin-bottom: 0.65rem;
	}
	.ch__card-plf-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
	.ch__card-plf-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		padding: 0.5em 0.85em;
		border: 1px solid var(--rule-hot);
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-decoration: none;
		color: var(--ink);
		transition: all 0.25s ease;

		&:hover {
			background: var(--signal);
			color: var(--bg);
			border-color: var(--signal);
		}
	}
</style>
