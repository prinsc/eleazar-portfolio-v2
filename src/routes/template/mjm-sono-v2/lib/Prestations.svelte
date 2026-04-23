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
			description: 'Du cocktail à la piste de danse - une progression musicale pensée.',
			icone: 'PartyPopper'
		},
		{
			titre: 'Salle & chapiteau',
			description: 'Matériel adapté à chaque configuration, intérieur comme extérieur.',
			icone: 'Tent'
		},
		{
			titre: 'Mariages',
			description: "Cérémonie, vin d'honneur, repas, soirée - une seule équipe, une journée.",
			icone: 'Heart'
		},
		{
			titre: 'Anniversaires',
			description: "Des 18 ans à la fête en famille, on adapte l'énergie à vos envies.",
			icone: 'Cake'
		},
		{
			titre: 'Entreprise',
			description: 'Séminaires, soirées, inaugurations - prestation sobre et pro.',
			icone: 'Briefcase'
		},
		{
			titre: 'Sur mesure',
			description: 'Une demande spécifique ? On compose le set selon votre brief.',
			icone: 'Speaker'
		}
	];

	const items = $derived(
		(prestations && prestations.length > 0 ? prestations : defaults).map((p, i) => ({
			...p,
			ch: String(i + 1).padStart(2, '0'),
			level: 60 + Math.floor(Math.random() * 35)
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

	let titleEl;
	let cardEls = $state([]);

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

		cardEls.forEach((el, i) => {
			if (!el) return;
			gsap.from(el, {
				opacity: 0,
				y: 40,
				duration: 0.7,
				delay: (i % 4) * 0.06,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 90%' }
			});
			// fader animation au scroll
			const fader = el.querySelector('.ch__fader-knob');
			const level = el.dataset.level;
			if (fader && level) {
				gsap.from(fader, {
					bottom: '0%',
					duration: 1.2,
					ease: 'power2.out',
					scrollTrigger: { trigger: el, start: 'top 85%' }
				});
			}
		});
	});
</script>

<section class="prestations" id="prestations">
	<header class="head" bind:this={titleEl}>
		<div class="head__top">
			<span class="head__tag">SECTION/01 - RACK·OUT</span>
			<span class="head__count">[ {String(items.length).padStart(2, '0')} CANAUX ACTIFS ]</span>
		</div>
		<h2 class="head__title">
			NOS<br />
			<span class="head__accent">PRESTATIONS</span>
		</h2>
		<p class="head__sub">
			Chaque prestation est un canal séparé, mixé selon votre cahier des charges.
			<span class="head__sig">- SON / LUMIÈRE / ANIMATION.</span>
		</p>
	</header>

	<div class="rack">
		{#each items as item, i (item.titre + i)}
			{@const Icon = iconMap[item.icone] ?? Music2}
			<article class="ch" bind:this={cardEls[i]} data-level={item.level}>
				<div class="ch__head">
					<span class="ch__num">{item.ch}</span>
					<span class="ch__led"></span>
				</div>
				<div class="ch__icon">
					<Icon size={20} strokeWidth={1.6} />
				</div>
				<h3 class="ch__title">{item.titre}</h3>
				<p class="ch__desc">{item.description ?? ''}</p>

				<!-- Mini fader visuel -->
				<div class="ch__fader" aria-hidden="true">
					<div class="ch__fader-track">
						{#each Array(11) as _, j (j)}
							<span class="ch__fader-tick"></span>
						{/each}
					</div>
					<span class="ch__fader-knob" style="bottom: {item.level}%"></span>
				</div>

				<div class="ch__foot">
					<span class="ch__lvl">{item.level} dB</span>
					<span class="ch__on">CH·{item.ch}</span>
				</div>
			</article>
		{/each}
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.prestations {
		padding: 5rem 1.25rem 6rem;
		background: var(--bg);
		position: relative;
		border-top: 1px solid var(--rule-hot);
		border-bottom: 1px solid var(--rule-hot);

		@include breakpoint('medium') {
			padding: 7rem 2rem 8rem;
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 1px;
			background: linear-gradient(90deg, transparent, var(--signal) 50%, transparent);
			opacity: 0.4;
		}
	}

	.head {
		max-width: 70rem;
		margin: 0 0 4rem;

		@include breakpoint('medium') {
			margin: 0 0 5rem;
		}
	}
	.head__top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 0.85rem;
		border-bottom: 1px dashed var(--rule-hot);
		flex-wrap: wrap;
	}
	.head__tag {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.22em;
		color: var(--signal);
		font-weight: 500;
	}
	.head__count {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		color: var(--ink-dim);
	}
	.head__title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 900;
		font-size: clamp(3rem, 11vw, 9rem);
		line-height: 0.85;
		letter-spacing: -0.04em;
		text-transform: uppercase;
		color: var(--ink);
	}
	.head__accent {
		color: var(--signal);
		display: inline-block;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			right: -0.15em;
			top: 0.18em;
			bottom: 0.2em;
			width: 0.08em;
			background: var(--signal);
			animation: cursorBlink 1s steps(2) infinite;
		}
	}
	@keyframes cursorBlink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}
	.head__sub {
		margin: 1.5rem 0 0;
		font-family: var(--f-body);
		font-size: clamp(1rem, 1.6vw, 1.15rem);
		line-height: 1.5;
		color: var(--ink-dim);
		max-width: 38rem;
	}
	.head__sig {
		display: block;
		margin-top: 0.5rem;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		color: var(--signal);
	}

	/* ===== RACK : grille de canaux verticaux type console ===== */
	.rack {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1px;
		background: var(--rule-hot);
		border: 1px solid var(--rule-hot);
		padding: 1px;

		@include breakpoint('small') {
			grid-template-columns: repeat(3, 1fr);
		}

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.ch {
		background: var(--panel);
		padding: 1.5rem 1.1rem 1.25rem;
		display: grid;
		grid-template-rows: auto auto auto 1fr auto auto;
		gap: 0.85rem;
		min-height: 380px;
		position: relative;
		transition: background 0.3s ease;

		@include breakpoint('medium') {
			min-height: 460px;
			padding: 1.75rem 1.25rem 1.5rem;
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 3px;
			background: var(--signal);
			transform: scaleX(0);
			transform-origin: left;
			transition: transform 0.45s ease;
		}

		&:hover {
			background: var(--panel-2);
			&::before {
				transform: scaleX(1);
			}
			.ch__icon {
				color: var(--signal);
				border-color: var(--signal);
			}
			.ch__title {
				color: var(--signal);
			}
			.ch__led {
				background: var(--led);
				box-shadow:
					0 0 0 2px rgba(34, 197, 94, 0.2),
					0 0 8px rgba(34, 197, 94, 0.6);
			}
		}
	}

	.ch__head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.ch__num {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		color: var(--ink-mute);
	}
	.ch__led {
		width: 8px;
		height: 8px;
		background: var(--ink-mute);
		border-radius: 50%;
		transition: all 0.3s ease;
	}

	.ch__icon {
		width: 42px;
		height: 42px;
		border: 1px solid var(--rule-hot);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--ink);
		transition: all 0.3s ease;
	}

	.ch__title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 900;
		font-size: 1.35rem;
		line-height: 0.95;
		letter-spacing: -0.02em;
		text-transform: uppercase;
		color: var(--ink);
		transition: color 0.3s ease;
	}

	.ch__desc {
		margin: 0;
		font-family: var(--f-body);
		font-size: 0.85rem;
		line-height: 1.5;
		color: var(--ink-dim);
	}

	/* Mini fader */
	.ch__fader {
		position: relative;
		height: 80px;
		width: 100%;
		background: var(--bg);
		border: 1px solid var(--rule);
		padding: 4px;
	}
	.ch__fader-track {
		position: absolute;
		inset: 6px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.ch__fader-tick {
		height: 1px;
		background: var(--rule-hot);
		width: 100%;
		&:nth-child(odd) {
			background: var(--ink-mute);
			width: 70%;
		}
	}
	.ch__fader-knob {
		position: absolute;
		left: 4px;
		right: 4px;
		height: 14px;
		background: var(--signal);
		border-radius: 1px;
		transition: bottom 0.3s ease;

		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			right: 0;
			height: 1px;
			background: var(--bg);
			transform: translateY(-50%);
		}
	}

	.ch__foot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.65rem;
		border-top: 1px dashed var(--rule);
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
	}
	.ch__lvl {
		color: var(--led);
	}
	.ch__on {
		color: var(--ink-mute);
	}
</style>
