<script>
	import { onMount } from 'svelte';
	import {
		Music2,
		Shirt,
		Image as ImageIcon,
		PartyPopper,
		Tent,
		Heart,
		Cake,
		Briefcase,
		Speaker
	} from 'lucide-svelte';

	let { prestations = null } = $props();

	const defaults = [
		{
			titre: 'Mariages',
			description:
				"Cérémonie, vin d'honneur, repas, soirée - tout le parcours sonore sur une seule prestation.",
			icone: 'Heart'
		},
		{
			titre: 'Anniversaires',
			description:
				"18 ans, 50 ans, fête de famille - on adapte l'ambiance à l'âge et à l'énergie de la salle.",
			icone: 'Cake'
		},
		{
			titre: 'Soirées privées',
			description:
				'Du cocktail à la piste de danse, une progression musicale pensée pour vos invités.',
			icone: 'PartyPopper'
		},
		{
			titre: "Événements d'entreprise",
			description: 'Séminaires, inaugurations, fêtes du personnel - prestation sobre et pro.',
			icone: 'Briefcase'
		},
		{
			titre: 'Défilés',
			description:
				'Sonorisation rythmée pour mettre en valeur chaque passage, en salle ou en plein air.',
			icone: 'Shirt'
		},
		{
			titre: 'Expositions',
			description: 'Diffusion homogène, ambiance sonore discrète pour accompagner la visite.',
			icone: 'ImageIcon'
		},
		{
			titre: 'Salle & chapiteau',
			description:
				'Matériel adapté à chaque configuration, intérieur comme extérieur, petit ou grand volume.',
			icone: 'Tent'
		}
	];

	const items = $derived(prestations && prestations.length > 0 ? prestations : defaults);

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
		Image: ImageIcon,
		ImageIcon
	};

	let titleEl;
	let cardEls = $state([]);

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

		cardEls.forEach((el, i) => {
			if (!el) return;
			gsap.from(el, {
				opacity: 0,
				y: 24,
				duration: 0.6,
				delay: (i % 3) * 0.07,
				ease: 'power2.out',
				scrollTrigger: { trigger: el, start: 'top 90%' }
			});
		});
	});
</script>

<section class="prestations" id="prestations">
	<div class="wrap">
		<header class="head" bind:this={titleEl}>
			<h2>Les prestations</h2>
			<p class="head__sub">
				Du mariage à la soirée d'entreprise, je m'adapte à votre événement et à votre budget.
			</p>
		</header>

		<div class="grid">
			{#each items as item, i (item.titre + i)}
				{@const Icon = iconMap[item.icone] ?? Music2}
				<article class="card" bind:this={cardEls[i]}>
					<span class="card__ic">
						<Icon size={20} strokeWidth={1.8} />
					</span>
					<h3>{item.titre}</h3>
					<p>{item.description ?? ''}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.prestations {
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

	h2 {
		margin: 0 0 0.75rem;
		font-family: var(--f-display);
		font-weight: 700;
		font-size: clamp(2rem, 5vw, 3.25rem);
		letter-spacing: -0.03em;
		color: var(--text);
		line-height: 1.05;
	}

	.head__sub {
		margin: 0;
		font-family: var(--f-body);
		font-size: 1rem;
		line-height: 1.55;
		color: var(--text-soft);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;

		@include breakpoint('small') {
			grid-template-columns: 1fr 1fr;
		}

		@include breakpoint('large') {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.card {
		padding: 1.75rem;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		transition:
			border-color 0.2s ease,
			background 0.2s ease,
			transform 0.2s ease;

		&:hover {
			background: var(--surface-2);
			border-color: var(--line-strong);
			transform: translateY(-2px);

			.card__ic {
				background: var(--red);
				color: #fff;
				border-color: var(--red);
			}
		}

		h3 {
			margin: 0;
			font-family: var(--f-display);
			font-weight: 600;
			font-size: 1.2rem;
			color: var(--text);
			letter-spacing: -0.01em;
		}

		p {
			margin: 0;
			font-family: var(--f-body);
			font-size: 0.9rem;
			line-height: 1.6;
			color: var(--text-soft);
		}
	}

	.card__ic {
		width: 40px;
		height: 40px;
		background: transparent;
		border: 1px solid var(--line-strong);
		color: var(--red);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: all 0.2s ease;
	}
</style>
