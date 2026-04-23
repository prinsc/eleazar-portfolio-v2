<script>
	import { onMount } from 'svelte';

	let { tonnelle = null } = $props();

	const defaults = {
		texte:
			"La Tonnelle, c'est l'espace élégant que nous installons, montons et démontons pour vos événements en extérieur. Pratique, modulable, prête à accueillir vos invités - vous profitez, on gère.",
		photos: [
			'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
			'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=85',
			'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=85',
			'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1200&q=85',
			'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1200&q=85',
			'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=1200&q=85'
		]
	};

	const texte = $derived(tonnelle?.texte ?? defaults.texte);
	const photos = $derived(
		tonnelle?.photos && tonnelle.photos.length > 0 ? tonnelle.photos : defaults.photos
	);

	let titleEl;
	let photoEls = $state([]);

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
				delay: (i % 3) * 0.1,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 90%' }
			});
		});
	});
</script>

<section class="tonnelle" id="tonnelle">
	<div class="wrap">
		<div class="head" bind:this={titleEl}>
			<div class="head__col">
				<span class="eyebrow"><span class="rule"></span>Section 03 / Extérieur</span>
				<h2>La <em>Tonnelle</em></h2>
			</div>
			<div class="head__col head__col--right">
				<p class="texte">{texte}</p>
				<div class="logo-box" aria-label="Logo La Tonnelle">
					<span class="logo-box__mark">T.</span>
					<span class="logo-box__sub">La Tonnelle</span>
				</div>
			</div>
		</div>

		<div class="gallery">
			{#each photos as src, i (src + i)}
				<figure class="cell" bind:this={photoEls[i]} class:cell--tall={i === 1 || i === 4}>
					<!-- IMAGE CLIENT - remplacer par photo tonnelle réelle -->
					<img {src} alt="Ambiance tonnelle événement {i + 1}" loading="lazy" />
					<figcaption>
						<span>{String(i + 1).padStart(2, '0')}</span>
						<span class="cap">Tonnelle</span>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.tonnelle {
		padding: 6rem 1.25rem;
		border-bottom: 1px solid var(--rule);

		@include breakpoint('medium') {
			padding: 8rem 2rem;
		}
	}

	.wrap {
		max-width: 1400px;
		margin: 0 auto;
	}

	.head {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		margin-bottom: 4rem;

		@include breakpoint('large') {
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
			align-items: end;
		}
	}

	.head__col {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.head__col--right {
		gap: 2rem;
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

		.rule {
			display: inline-block;
			width: 42px;
			height: 1px;
			background: var(--gold);
		}
	}

	h2 {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(3rem, 10vw, 8rem);
		line-height: 0.9;
		letter-spacing: -0.045em;
		margin: 0;
		color: var(--bone);

		em {
			font-family: var(--f-display);
			font-style: italic;
			color: var(--gold);
			font-weight: 300;
		}
	}

	.texte {
		margin: 0;
		font-family: var(--f-body);
		font-size: 1rem;
		line-height: 1.7;
		color: var(--bone);
		max-width: 34rem;
	}

	.logo-box {
		width: 140px;
		height: 140px;
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
			pointer-events: none;
		}

		&__mark {
			font-family: var(--f-display);
			font-style: italic;
			font-weight: 400;
			font-size: 3rem;
			line-height: 1;
			color: var(--gold);
			letter-spacing: -0.04em;
		}

		&__sub {
			font-family: var(--f-mono);
			font-size: 9px;
			letter-spacing: 0.22em;
			text-transform: uppercase;
			color: var(--bone);
		}
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(3, 1fr);
			grid-auto-rows: 280px;
			gap: 1rem;
		}

		@include breakpoint('large') {
			grid-auto-rows: 320px;
		}
	}

	.cell {
		margin: 0;
		position: relative;
		overflow: hidden;
		background: var(--coal);
		aspect-ratio: 4 / 3;

		@include breakpoint('medium') {
			aspect-ratio: auto;
		}

		&--tall {
			@include breakpoint('medium') {
				grid-row: span 2;
			}
		}

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(30%) contrast(1.08) brightness(0.9);
			transition:
				transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1),
				filter 0.4s ease;
		}

		&:hover img {
			transform: scale(1.06);
			filter: grayscale(0%) contrast(1.1) brightness(1);
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

			.cap {
				color: var(--gold);
			}
		}
	}
</style>
