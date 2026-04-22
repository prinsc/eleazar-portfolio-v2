<script>
	import { onMount } from 'svelte';
	import { Check, Phone, ArrowRight, MapPin } from 'lucide-svelte';

	let { infos = null, sono = null, heroImage = null } = $props();

	const points = [
		'Prestation professionnelle et soignée',
		'Ambiance garantie du début à la fin',
		'Passion au service de votre événement',
		'Piste de danse toujours vivante'
	];

	const paragraphes = [
		"Avec MJM Sonorisation & Yohan, profitez d'une prise en charge complète : sonorisation, éclairage et animation, pour un événement clé en main.",
		"Plus de 30 ans d'expérience, du matériel pro, et un interlocuteur unique — Yohan — du premier contact à la fin de soirée.",
		"Je fais évoluer régulièrement mon équipement pour vous offrir un rendu fiable, adapté à votre salle et à votre public."
	];

	const img1 = $derived(
		heroImage ??
			'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=80'
		/* IMAGE CLIENT — remplacer par photo réelle */
	);
	const img2 = 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&q=80';
	/* IMAGE CLIENT — remplacer par photo réelle */

	let heroEl;
	let titleEl;
	let lineEls = $state([]);
	let subEl;
	let ledeEl;
	let img1El, img2El;
	let footerEl;

	onMount(async () => {
		const { gsap } = await import('gsap');

		gsap.set(heroEl, { visibility: 'visible' });
		gsap.set(lineEls, { yPercent: 110 });
		gsap.set(subEl, { opacity: 0, y: 12 });
		gsap.set(ledeEl, { opacity: 0, y: 16 });
		gsap.set(img1El, { opacity: 0, y: 30 });
		gsap.set(img2El, { opacity: 0, y: 30 });
		gsap.set(footerEl.children, { opacity: 0, y: 10 });

		const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
		tl.to(lineEls, { yPercent: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' })
			.to(subEl, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
			.to(img1El, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
			.to(img2El, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
			.to(ledeEl, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
			.to(footerEl.children, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, '-=0.4');
	});
</script>

<section class="hero" id="top" bind:this={heroEl}>
	<div class="hero__inner">
		<header class="hero__head">
			<span class="available">
				<span class="available__dot"></span>
				<span>Disponible pour votre événement</span>
			</span>

			<h1 class="hero__title" bind:this={titleEl}>
				<span class="mask"><span class="line" bind:this={lineEls[0]}>MJM Sonorisation</span></span>
				<span class="mask"><span class="line line--accent" bind:this={lineEls[1]}>&amp; Yohan</span></span>
			</h1>

			<p class="hero__sub" bind:this={subEl}>
				Donnez une autre dimension à vos événements.<br />
				Son, lumière, ambiance — on s'occupe de tout.
			</p>
		</header>

		<div class="hero__body">
			<div class="hero__lede" bind:this={ledeEl}>
				<ul class="points">
					{#each points as p}
						<li>
							<span class="points__ic"><Check size={14} strokeWidth={2.5} /></span>
							<span>{p}</span>
						</li>
					{/each}
				</ul>

				<div class="paragraphes">
					{#each paragraphes as para}
						<p>{para}</p>
					{/each}
				</div>

				<div class="actions">
					<a class="btn btn--primary" href="#contact">
						<span>Demander un devis</span>
						<ArrowRight size={16} strokeWidth={2} />
					</a>
					<a class="btn btn--ghost" href="tel:+32475307333">
						<Phone size={15} strokeWidth={2} />
						<span>0475 30 73 33</span>
					</a>
				</div>
			</div>

			<div class="hero__media">
				<figure class="pic pic--big" bind:this={img1El}>
					<img src={img1} alt="Sonorisation en action" loading="eager" />
				</figure>
				<figure class="pic pic--small" bind:this={img2El}>
					<img src={img2} alt="Ambiance lumière mariage" loading="eager" />
				</figure>
			</div>
		</div>

		<div class="hero__footer" bind:this={footerEl}>
			<div class="kpi">
				<span class="kpi__num">30+</span>
				<span class="kpi__label">Années d'expérience</span>
			</div>
			<div class="kpi">
				<span class="kpi__num">{sono?.rayonKm ?? 80} km</span>
				<span class="kpi__label">Autour d'Ostiches</span>
			</div>
			<div class="kpi">
				<span class="kpi__num">Indoor &amp; outdoor</span>
				<span class="kpi__label">Salle ou chapiteau</span>
			</div>
			<div class="kpi kpi--zone">
				<MapPin size={14} strokeWidth={2} />
				<span>{sono?.zoneIntervention ?? 'Hainaut & nord de la France'}</span>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.hero {
		padding: 7rem 1.25rem 3rem;
		visibility: hidden;
		border-bottom: 1px solid var(--line);

		@include breakpoint('medium') {
			padding: 9rem 2rem 4rem;
		}
	}
	.hero__inner {
		max-width: 1280px;
		margin: 0 auto;
	}

	.hero__head {
		max-width: 48rem;
		margin-bottom: 3rem;
	}

	.available {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.45rem 0.85rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		font-family: var(--f-body);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--text-soft);
		background: var(--surface);
	}
	.available__dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--green);
		box-shadow: 0 0 0 3px rgba(111, 201, 122, 0.18);
	}

	.hero__title {
		margin: 1.25rem 0 1.25rem;
		font-family: var(--f-display);
		font-weight: 700;
		font-size: clamp(2.5rem, 7vw, 5.5rem);
		line-height: 0.95;
		letter-spacing: -0.035em;
		color: var(--text);
	}
	.mask { display: block; overflow: hidden; padding-bottom: 0.06em; }
	.line { display: block; will-change: transform; }
	.line--accent { color: var(--red); }

	.hero__sub {
		margin: 0;
		font-family: var(--f-body);
		font-size: clamp(1.05rem, 1.8vw, 1.3rem);
		line-height: 1.55;
		color: var(--text-soft);
		max-width: 34rem;
	}

	.hero__body {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;

		@include breakpoint('large') {
			grid-template-columns: 1fr 1.1fr;
			gap: 4rem;
			align-items: start;
		}
	}

	.hero__lede {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.points {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.5rem;

		@include breakpoint('small') {
			grid-template-columns: 1fr 1fr;
			gap: 0.6rem 1.5rem;
		}

		li {
			display: flex;
			align-items: center;
			gap: 0.7rem;
			font-family: var(--f-body);
			font-size: 0.92rem;
			color: var(--text);
		}
	}
	.points__ic {
		width: 24px;
		height: 24px;
		background: rgba(217, 75, 42, 0.12);
		border: 1px solid rgba(217, 75, 42, 0.35);
		color: var(--red);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		flex-shrink: 0;
	}

	.paragraphes {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		max-width: 36rem;

		p {
			margin: 0;
			font-family: var(--f-body);
			font-size: 0.95rem;
			line-height: 1.65;
			color: var(--text-soft);
		}
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.9rem 1.25rem;
		font-family: var(--f-body);
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
		border-radius: 4px;
		transition: all 0.2s ease;

		&--primary {
			background: var(--red);
			color: #fff;
			&:hover { background: var(--red-deep); }
		}

		&--ghost {
			background: transparent;
			color: var(--text);
			border: 1px solid var(--line-strong);
			&:hover {
				background: var(--surface);
				border-color: var(--text-soft);
			}
			:global(svg) { color: var(--red); }
		}
	}

	.hero__media {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;

		@include breakpoint('small') {
			grid-template-columns: 1.4fr 1fr;
			grid-template-rows: auto;
			gap: 1rem;
		}
	}

	.pic {
		margin: 0;
		overflow: hidden;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 6px;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.pic--big {
		aspect-ratio: 4 / 5;

		@include breakpoint('small') {
			aspect-ratio: 4 / 5;
		}
	}
	.pic--small {
		aspect-ratio: 4 / 3;

		@include breakpoint('small') {
			aspect-ratio: auto;
			align-self: end;
			height: 70%;
			margin-top: auto;
		}
	}

	.hero__footer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;
		margin-top: 4rem;
		border: 1px solid var(--line);
		border-radius: 6px;
		background: var(--surface);
		overflow: hidden;

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
			margin-top: 5rem;
		}
	}

	.kpi {
		padding: 1.25rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		border-right: 1px solid var(--line);
		border-bottom: 1px solid var(--line);

		@include breakpoint('medium') {
			border-bottom: none;
			padding: 1.5rem;

			&:last-child { border-right: none; }
		}

		&:nth-child(2n) { border-right: none; }
		&:nth-child(2n) { @include breakpoint('medium') { border-right: 1px solid var(--line); } }
		&:last-child { border-right: none; border-bottom: none; }
	}

	.kpi__num {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 1.4rem;
		color: var(--text);
		letter-spacing: -0.02em;
	}
	.kpi__label {
		font-family: var(--f-body);
		font-size: 0.8rem;
		color: var(--text-soft);
	}

	.kpi--zone {
		flex-direction: row;
		align-items: center;
		gap: 0.6rem;
		grid-column: 1 / -1;
		font-family: var(--f-body);
		font-size: 0.85rem;
		color: var(--text);

		:global(svg) { color: var(--red); flex-shrink: 0; }

		@include breakpoint('medium') {
			grid-column: auto;
		}
	}
</style>
