<script>
	import { onMount } from 'svelte';
	import { BedDouble, Wifi, Coffee, MapPin, ExternalLink } from 'lucide-svelte';

	let { chambre = null } = $props();

	const defaults = {
		photos: [
			'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
			'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
			'https://images.unsplash.com/photo-1551776235-dde6d482980b?w=1200&q=80',
			'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80'
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
			y: 24,
			duration: 0.7,
			ease: 'power2.out',
			scrollTrigger: { trigger: titleEl, start: 'top 82%' }
		});

		photoEls.forEach((el, i) => {
			if (!el) return;
			gsap.from(el, {
				opacity: 0,
				y: 24,
				duration: 0.6,
				delay: i * 0.07,
				ease: 'power2.out',
				scrollTrigger: { trigger: el, start: 'top 90%' }
			});
		});

		if (cardEl) {
			gsap.from(cardEl, {
				opacity: 0,
				y: 24,
				duration: 0.7,
				ease: 'power2.out',
				scrollTrigger: { trigger: cardEl, start: 'top 85%' }
			});
		}
	});
</script>

<section class="chambre" id="chambre">
	<div class="wrap">
		<header class="head" bind:this={titleEl}>
			<span class="tag">Hébergement</span>
			<h2>Chambre d'hôte</h2>
			<p class="sub">
				Un espace calme à deux pas d'Ostiches. Idéal pour prolonger votre événement ou faire étape
				dans la région.
			</p>
		</header>

		<div class="content">
			<div class="gallery">
				{#each photos as src, i (src + i)}
					<figure class="cell" bind:this={photoEls[i]}>
						<!-- IMAGE CLIENT - remplacer par photo chambre réelle -->
						<img {src} alt="Chambre d'hôte {i + 1}" loading="lazy" />
					</figure>
				{/each}
			</div>

			<aside class="side">
				<article class="card" bind:this={cardEl}>
					<header class="card__head">
						<span class="card__name">La Halte de Flobecq</span>
						<span class="card__tag">Chambre d'hôte</span>
					</header>

					<ul class="infos">
						<li>
							<MapPin size={14} strokeWidth={1.8} /><span
								>337, route de Flobecq · 7804 Ostiches</span
							>
						</li>
						<li>
							<BedDouble size={14} strokeWidth={1.8} /><span>2 chambres · jusqu'à 4 personnes</span>
						</li>
						<li><Wifi size={14} strokeWidth={1.8} /><span>Wi-Fi inclus</span></li>
						<li><Coffee size={14} strokeWidth={1.8} /><span>Petit-déjeuner maison</span></li>
					</ul>

					<footer class="card__foot">
						<span>Votre contact</span>
						<strong>Yohan</strong>
					</footer>
				</article>

				<div class="platforms">
					<span class="platforms__label">Retrouvez-nous sur</span>
					<div class="platforms__list">
						{#each plateformes as p}
							<a href={p.url} class="platform" target="_blank" rel="noopener">
								<span>{p.nom}</span>
								<ExternalLink size={12} strokeWidth={2} />
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
		padding: 5rem 1.25rem;
		border-bottom: 1px solid var(--line);

		@include breakpoint('medium') {
			padding: 6rem 2rem;
		}
	}

	.wrap {
		max-width: 1280px;
		margin: 0 auto;
	}

	.head {
		max-width: 42rem;
		margin: 0 0 3rem;
	}

	.tag {
		display: inline-block;
		font-family: var(--f-body);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--red);
		margin-bottom: 0.75rem;
	}

	h2 {
		margin: 0 0 0.75rem;
		font-family: var(--f-display);
		font-weight: 700;
		font-size: clamp(2rem, 5vw, 3.25rem);
		letter-spacing: -0.03em;
		line-height: 1.05;
		color: var(--text);
	}

	.sub {
		margin: 0;
		font-family: var(--f-body);
		font-size: 1rem;
		line-height: 1.55;
		color: var(--text-soft);
	}

	.content {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@include breakpoint('large') {
			grid-template-columns: 1.3fr 1fr;
			gap: 2.5rem;
		}
	}

	.gallery {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;

		@include breakpoint('medium') {
			gap: 1rem;
		}
	}

	.cell {
		margin: 0;
		overflow: hidden;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 6px;
		aspect-ratio: 4 / 3;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.6s ease;
		}

		&:hover img {
			transform: scale(1.04);
		}
	}

	.side {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.card {
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 6px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.card__head {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--line);

		span:first-child {
			font-family: var(--f-display);
			font-weight: 600;
			font-size: 1.2rem;
			color: var(--text);
			letter-spacing: -0.01em;
		}
	}

	.card__name {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 1.2rem;
		color: var(--text);
	}

	.card__tag {
		font-family: var(--f-body);
		font-size: 0.78rem;
		color: var(--text-soft);
	}

	.infos {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;

		li {
			display: flex;
			align-items: center;
			gap: 0.6rem;
			font-family: var(--f-body);
			font-size: 0.88rem;
			color: var(--text);

			:global(svg) {
				color: var(--red);
				flex-shrink: 0;
			}
		}
	}

	.card__foot {
		padding-top: 1rem;
		border-top: 1px solid var(--line);
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-family: var(--f-body);
		font-size: 0.85rem;

		span {
			color: var(--text-soft);
		}
		strong {
			color: var(--text);
			font-weight: 600;
		}
	}

	.platforms {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.platforms__label {
		font-family: var(--f-body);
		font-size: 0.78rem;
		color: var(--text-soft);
	}

	.platforms__list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.platform {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.55rem 0.9rem;
		border: 1px solid var(--line);
		background: var(--surface);
		font-family: var(--f-body);
		font-size: 0.82rem;
		text-decoration: none;
		color: var(--text);
		border-radius: 4px;
		transition: all 0.2s ease;

		&:hover {
			border-color: var(--red);
			color: var(--red);
		}
	}
</style>
