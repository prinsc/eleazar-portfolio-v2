<script>
	import { onMount } from 'svelte';
	import { Check } from 'lucide-svelte';

	let { tonnelle = null } = $props();

	const defaults = {
		texte:
			"La Tonnelle, c'est l'espace couvert que j'installe pour vos événements en extérieur. Je m'occupe du montage et du démontage, à l'endroit et au moment qui vous conviennent. Vous profitez, je gère.",
		atouts: [
			'Montage et démontage inclus',
			"Adapté à l'intérieur comme à l'extérieur",
			"Modulable selon votre nombre d'invités",
			'Installation rapide et propre'
		],
		photos: [
			'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
			'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80',
			'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
			'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1200&q=80'
		]
	};

	const texte = $derived(tonnelle?.texte ?? defaults.texte);
	const atouts = $derived(tonnelle?.atouts ?? defaults.atouts);
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
	});
</script>

<section class="tonnelle" id="tonnelle">
	<div class="wrap">
		<div class="top" bind:this={titleEl}>
			<div class="top__left">
				<span class="tag">Extérieur</span>
				<h2>La Tonnelle</h2>
				<p class="texte">{texte}</p>

				<ul class="atouts">
					{#each atouts as a}
						<li>
							<Check size={14} strokeWidth={2.5} />
							<span>{a}</span>
						</li>
					{/each}
				</ul>
			</div>

			<aside class="logo" aria-label="Logo La Tonnelle">
				<span class="logo__mark">T</span>
				<span class="logo__name">La Tonnelle</span>
				<span class="logo__meta">MJM · Ostiches</span>
			</aside>
		</div>

		<div class="gallery">
			{#each photos as src, i (src + i)}
				<figure class="cell" bind:this={photoEls[i]}>
					<!-- IMAGE CLIENT - remplacer par photo tonnelle réelle -->
					<img {src} alt="Tonnelle {i + 1}" loading="lazy" />
				</figure>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.tonnelle {
		padding: 5rem 1.25rem;
		border-bottom: 1px solid var(--line);
		background: var(--bg);

		@include breakpoint('medium') {
			padding: 6rem 2rem;
		}
	}

	.wrap {
		max-width: 1280px;
		margin: 0 auto;
	}

	.top {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-bottom: 2.5rem;

		@include breakpoint('medium') {
			grid-template-columns: 1fr auto;
			gap: 3rem;
			align-items: end;
		}
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
		margin: 0 0 1rem;
		font-family: var(--f-display);
		font-weight: 700;
		font-size: clamp(2rem, 5vw, 3.25rem);
		letter-spacing: -0.03em;
		line-height: 1.05;
		color: var(--text);
	}

	.texte {
		margin: 0 0 1.5rem;
		font-family: var(--f-body);
		font-size: 1rem;
		line-height: 1.65;
		color: var(--text-soft);
		max-width: 38rem;
	}

	.atouts {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.55rem;

		@include breakpoint('small') {
			grid-template-columns: 1fr 1fr;
		}

		li {
			display: flex;
			align-items: center;
			gap: 0.6rem;
			font-family: var(--f-body);
			font-size: 0.9rem;
			color: var(--text);

			:global(svg) {
				color: var(--red);
				flex-shrink: 0;
			}
		}
	}

	.logo {
		width: 160px;
		height: 160px;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;

		&__mark {
			font-family: var(--f-display);
			font-weight: 700;
			font-size: 3rem;
			line-height: 1;
			color: var(--red);
		}
		&__name {
			font-family: var(--f-display);
			font-weight: 600;
			font-size: 0.95rem;
			color: var(--text);
		}
		&__meta {
			font-family: var(--f-body);
			font-size: 0.72rem;
			color: var(--text-faint);
			margin-top: 0.15rem;
		}
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
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
			transform: scale(1.05);
		}
	}
</style>
