<script>
	import { onMount } from 'svelte';
	import {
		Music2,
		Speaker,
		PartyPopper,
		Tent,
		Heart,
		Cake,
		Briefcase,
		Shirt,
		Image as ImageIcon
	} from 'lucide-svelte';

	let { prestations = null } = $props();

	// Fallback mock si l'API ne renvoie pas encore de prestations
	const defaults = [
		{
			titre: 'Défilés',
			description: 'Sonorisation rythmée et lumière scénique pour mettre en valeur chaque passage.',
			icone: 'Shirt'
		},
		{
			titre: 'Expositions',
			description: 'Ambiance sonore maîtrisée, diffusion homogène pour accompagner la visite.',
			icone: 'Image'
		},
		{
			titre: 'Soirées privées',
			description:
				'Du cocktail à la piste de danse - une progression musicale pensée pour vos invités.',
			icone: 'PartyPopper'
		},
		{
			titre: 'En salle & chapiteau',
			description: 'Matériel adapté à chaque configuration, intérieur comme extérieur.',
			icone: 'Tent'
		},
		{
			titre: 'Mariages',
			description:
				"Cérémonie, vin d'honneur, repas, soirée - une journée complète, une seule équipe.",
			icone: 'Heart'
		},
		{
			titre: 'Anniversaires',
			description: "Des 18 ans à la fête en famille, on adapte l'énergie à vos envies.",
			icone: 'Cake'
		},
		{
			titre: "Événements d'entreprise",
			description: "Séminaires, soirées d'entreprise, inaugurations - prestation sobre et pro.",
			icone: 'Briefcase'
		}
	];

	const items = $derived(
		(prestations && prestations.length > 0 ? prestations : defaults).map((p, i) => ({
			...p,
			num: String(i + 1).padStart(2, '0')
		}))
	);

	const iconMap = {
		Music: Music2,
		Music2,
		Speaker,
		PartyPopper,
		Tent,
		Heart,
		Cake,
		Briefcase,
		Shirt,
		Image: ImageIcon
	};

	let sectionEl;
	let titleEl;
	let cardEls = $state([]);

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

		cardEls.forEach((el, i) => {
			if (!el) return;
			gsap.from(el, {
				opacity: 0,
				y: 60,
				duration: 0.9,
				delay: (i % 3) * 0.08,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 88%' }
			});
		});
	});
</script>

<section class="prestations" id="prestations" bind:this={sectionEl}>
	<header class="head" bind:this={titleEl}>
		<span class="eyebrow"><span class="rule"></span>Section 01 / Prestations</span>
		<h2>
			Nos <em>prestations</em>
			<span class="head__sub">Son, lumière, animation - <span class="gold">clé en main</span>.</span
			>
		</h2>
	</header>

	<div class="grid">
		{#each items as item, i (item.titre + i)}
			{@const Icon = iconMap[item.icone] ?? Music2}
			<article class="card" bind:this={cardEls[i]}>
				<div class="card__top">
					<span class="card__num">{item.num}</span>
					<span class="card__icon">
						<Icon size={22} strokeWidth={1.4} />
					</span>
				</div>
				<h3 class="card__title">{item.titre}</h3>
				<p class="card__desc">{item.description ?? ''}</p>
				<div class="card__arrow" aria-hidden="true">
					<svg
						viewBox="0 0 24 24"
						width="18"
						height="18"
						fill="none"
						stroke="currentColor"
						stroke-width="1.3"
					>
						<path d="M5 12h14M13 6l6 6-6 6" />
					</svg>
				</div>
			</article>
		{/each}
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.prestations {
		padding: 6rem 1.25rem;
		border-bottom: 1px solid var(--rule);

		@include breakpoint('medium') {
			padding: 8rem 2rem;
		}
	}

	.head {
		max-width: 60rem;
		margin: 0 0 4rem;

		@include breakpoint('medium') {
			margin: 0 0 5rem;
		}
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
		font-size: clamp(2.5rem, 7vw, 5.5rem);
		line-height: 0.95;
		letter-spacing: -0.035em;
		margin: 1.25rem 0 0;
		color: var(--bone);

		em {
			font-family: var(--f-display);
			font-style: italic;
			color: var(--gold);
			font-weight: 300;
		}
	}

	.head__sub {
		display: block;
		margin-top: 1.25rem;
		font-family: var(--f-display);
		font-size: clamp(1rem, 1.6vw, 1.25rem);
		font-style: italic;
		font-weight: 300;
		color: var(--bone-soft);
		line-height: 1.5;

		.gold {
			color: var(--gold);
		}
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--rule);
		border: 1px solid var(--rule);

		@include breakpoint('medium') {
			grid-template-columns: 1fr 1fr;
		}

		@include breakpoint('large') {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.card {
		background: var(--void);
		padding: 2.25rem 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		position: relative;
		cursor: pointer;
		transition: background 0.4s ease;

		@include breakpoint('medium') {
			padding: 2.75rem 2rem;
			min-height: 300px;
		}

		&:hover {
			background: var(--graphite);

			.card__arrow {
				transform: translate(4px, -4px);
				color: var(--gold);
			}
			.card__title {
				color: var(--gold);
			}
			.card__icon {
				border-color: var(--gold);
				color: var(--gold);
			}
		}
	}

	.card__top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.card__num {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		color: var(--gold);
		opacity: 0.8;
	}

	.card__icon {
		width: 44px;
		height: 44px;
		border: 1px solid var(--rule-strong);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--bone);
		transition: all 0.35s ease;
	}

	.card__title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 400;
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--bone);
		transition: color 0.35s ease;
	}

	.card__desc {
		margin: 0;
		font-family: var(--f-body);
		font-size: 0.92rem;
		line-height: 1.65;
		color: var(--bone-soft);
		flex: 1;
	}

	.card__arrow {
		align-self: flex-end;
		color: var(--bone-soft);
		transition:
			transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
			color 0.3s ease;
	}
</style>
