<script>
	import { onMount } from 'svelte';
	import { BedDouble, Wifi, Coffee, MapPin, ExternalLink } from 'lucide-svelte';

	let { chambre = null } = $props();

	const defaults = {
		photos: [
			'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=85',
			'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1400&q=85',
			'https://images.unsplash.com/photo-1551776235-dde6d482980b?w=1400&q=85',
			'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1400&q=85'
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
	let photoEls = $state([]);
	let cardEl;

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(titleEl, {
			opacity: 0,
			y: 40,
			duration: 1,
			ease: 'power3.out',
			scrollTrigger: { trigger: titleEl, start: 'top 80%' }
		});

		photoEls.forEach((el, i) => {
			if (!el) return;
			gsap.from(el, {
				opacity: 0,
				y: 60,
				duration: 0.9,
				delay: i * 0.1,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 90%' }
			});
		});

		if (cardEl) {
			gsap.from(cardEl, {
				opacity: 0,
				y: 40,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: { trigger: cardEl, start: 'top 85%' }
			});
		}
	});
</script>

<section class="chambre" id="chambre">
	<div class="wrap">
		<header class="head" bind:this={titleEl}>
			<span class="eyebrow"><span class="rule"></span>Section 04 / Hébergement</span>
			<h2>Chambre <em>d'hôte</em></h2>
			<p class="sub">
				Un espace paisible à deux pas de l'activité. Idéal pour prolonger un événement ou séjourner à Ostiches.
			</p>
		</header>

		<div class="content">
			<div class="gallery">
				{#each photos as src, i (src + i)}
					<figure class="cell" bind:this={photoEls[i]}>
						<!-- IMAGE CLIENT — remplacer par photo chambre d'hôte réelle -->
						<img src={src} alt="Chambre d'hôte {i + 1}" loading="lazy" />
						<figcaption>
							<span>{String(i + 1).padStart(2, '0')}</span>
						</figcaption>
					</figure>
				{/each}
			</div>

			<aside class="side">
				<article class="card" bind:this={cardEl}>
					<header class="card__head">
						<span class="card__tag">Carte de visite</span>
						<span class="card__mark">Yohan</span>
					</header>

					<div class="card__body">
						<h3>La Halte de Flobecq</h3>
						<p class="card__desc">
							Chambre d'hôte — ambiance contemporaine, cuisine partagée, jardin privatif.
						</p>

						<ul class="card__infos">
							<li><MapPin size={14} strokeWidth={1.5} /><span>337, route de Flobecq · 7804 Ostiches</span></li>
							<li><BedDouble size={14} strokeWidth={1.5} /><span>2 chambres · 4 personnes</span></li>
							<li><Wifi size={14} strokeWidth={1.5} /><span>Wi-Fi fibre inclus</span></li>
							<li><Coffee size={14} strokeWidth={1.5} /><span>Petit-déjeuner maison</span></li>
						</ul>
					</div>

					<footer class="card__foot">
						<span class="card__sig">Signé</span>
						<span class="card__name">Yohan</span>
					</footer>
				</article>

				<div class="logo-box" aria-label="Logo Chambre d'hôte">
					<span class="logo-box__mark">H.</span>
					<span class="logo-box__sub">Halte · Ostiches</span>
				</div>

				<div class="platforms">
					<h4>Retrouvez-nous sur les plateformes</h4>
					<div class="platforms__list">
						{#each plateformes as p}
							<a href={p.url} class="platform" target="_blank" rel="noopener">
								<span>{p.nom}</span>
								<ExternalLink size={12} strokeWidth={1.5} />
							</a>
						{/each}
					</div>
				</div>
			</aside>
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.chambre {
		padding: 6rem 1.25rem;
		border-bottom: 1px solid var(--rule);
		background: var(--coal);

		@include breakpoint('medium') {
			padding: 8rem 2rem;
		}
	}

	.wrap {
		max-width: 1400px;
		margin: 0 auto;
	}

	.head {
		max-width: 50rem;
		margin-bottom: 4rem;
	}

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.9em;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--bone-soft);

		.rule { display: inline-block; width: 42px; height: 1px; background: var(--gold); }
	}

	h2 {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(3rem, 9vw, 7rem);
		line-height: 0.92;
		letter-spacing: -0.04em;
		margin: 1.25rem 0 1rem;
		color: var(--bone);

		em {
			font-family: var(--f-display);
			font-style: italic;
			color: var(--gold);
		}
	}

	.sub {
		margin: 0;
		font-family: var(--f-body);
		font-size: 1rem;
		line-height: 1.65;
		color: var(--bone-soft);
	}

	.content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;

		@include breakpoint('large') {
			grid-template-columns: 1.3fr 1fr;
			gap: 3rem;
		}
	}

	.gallery {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.cell {
		margin: 0;
		position: relative;
		overflow: hidden;
		background: var(--graphite);
		aspect-ratio: 4 / 5;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(30%) contrast(1.08) brightness(0.92);
			transition: transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s ease;
		}
		&:hover img {
			transform: scale(1.05);
			filter: grayscale(0%);
		}

		figcaption {
			position: absolute;
			bottom: 0.8rem;
			left: 0.8rem;
			font-family: var(--f-mono);
			font-size: 9px;
			letter-spacing: 0.2em;
			color: var(--gold);
		}
	}

	.side {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* ── Carte de visite ── */
	.card {
		background: var(--void);
		border: 1px solid var(--rule-strong);
		padding: 1.75rem;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;

		&::before {
			content: '';
			position: absolute;
			inset: 8px;
			border: 1px solid var(--rule);
			pointer-events: none;
		}

		@include breakpoint('medium') {
			padding: 2rem;
		}
	}

	.card__head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--rule);
	}

	.card__tag {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--bone-soft);
	}

	.card__mark {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1.25rem;
		color: var(--gold);
	}

	.card__body h3 {
		margin: 0 0 0.5rem;
		font-family: var(--f-display);
		font-weight: 400;
		font-size: 1.6rem;
		line-height: 1.1;
		color: var(--bone);
	}

	.card__desc {
		margin: 0 0 1.25rem;
		font-family: var(--f-body);
		font-size: 0.9rem;
		color: var(--bone-soft);
		line-height: 1.55;
	}

	.card__infos {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;

		li {
			display: flex;
			align-items: center;
			gap: 0.7rem;
			font-family: var(--f-body);
			font-size: 0.88rem;
			color: var(--bone);

			:global(svg) {
				color: var(--gold);
				flex-shrink: 0;
			}
		}
	}

	.card__foot {
		padding-top: 1rem;
		border-top: 1px solid var(--rule);
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.card__sig {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--bone-soft);
	}

	.card__name {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1.5rem;
		color: var(--gold);
	}

	/* ── logo ── */
	.logo-box {
		width: 120px;
		height: 120px;
		background: var(--graphite);
		border: 1px solid var(--rule-strong);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			inset: 6px;
			border: 1px solid var(--rule);
		}

		&__mark {
			font-family: var(--f-display);
			font-style: italic;
			font-size: 2.4rem;
			line-height: 1;
			color: var(--gold);
		}

		&__sub {
			font-family: var(--f-mono);
			font-size: 8px;
			letter-spacing: 0.22em;
			text-transform: uppercase;
			color: var(--bone);
		}
	}

	/* ── plateformes ── */
	.platforms h4 {
		margin: 0 0 1rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--bone-soft);
		font-weight: 500;
	}

	.platforms__list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.platform {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		padding: 0.65em 1em;
		border: 1px solid var(--rule-strong);
		font-family: var(--f-body);
		font-size: 0.85rem;
		text-decoration: none;
		color: var(--bone);
		transition: all 0.3s ease;

		&:hover {
			background: var(--gold);
			color: var(--void);
			border-color: var(--gold);
		}
	}
</style>
