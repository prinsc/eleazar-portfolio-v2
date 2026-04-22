<script>
	import { onMount } from 'svelte';

	let { partenaires = null } = $props();

	// Si API ne renvoie rien, on génère 8 emplacements placeholder
	const defaults = Array.from({ length: 8 }, (_, i) => ({
		name: `Partenaire ${String(i + 1).padStart(2, '0')}`,
		logo: null,
		url: '#'
	}));

	const items = $derived(partenaires && partenaires.length > 0 ? partenaires : defaults);

	let titleEl;
	let cellEls = $state([]);

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

		cellEls.forEach((el, i) => {
			if (!el) return;
			gsap.from(el, {
				opacity: 0,
				scale: 0.94,
				duration: 0.8,
				delay: i * 0.05,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 92%' }
			});
		});
	});
</script>

<section class="part" id="confiance">
	<div class="wrap">
		<header class="head" bind:this={titleEl}>
			<span class="eyebrow"><span class="rule"></span>Section 05 / Références</span>
			<h2>Ils nous ont <em>fait confiance</em></h2>
			<p class="sub">
				Plus de {items.length}+ partenaires et clients récurrents. <span class="gold">Merci.</span>
			</p>
		</header>

		<div class="grid">
			{#each items as p, i (p.name + i)}
				<a
					class="cell"
					href={p.url ?? '#'}
					target={p.url && p.url !== '#' ? '_blank' : undefined}
					rel="noopener"
					bind:this={cellEls[i]}
					aria-label={p.name}
				>
					{#if p.logo}
						<img src={p.logo} alt={p.name} loading="lazy" />
					{:else}
						<span class="cell__ph">
							<span class="cell__num">{String(i + 1).padStart(2, '0')}</span>
							<span class="cell__name">{p.name}</span>
						</span>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.part {
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
		font-size: clamp(2.5rem, 7vw, 5.5rem);
		line-height: 0.95;
		letter-spacing: -0.035em;
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
		color: var(--bone-soft);

		.gold { color: var(--gold); }
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1px;
		background: var(--rule);
		border: 1px solid var(--rule);

		@include breakpoint('small') {
			grid-template-columns: repeat(3, 1fr);
		}

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.cell {
		background: var(--void);
		aspect-ratio: 3 / 2;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		padding: 1.5rem;
		transition: background 0.35s ease;
		filter: grayscale(100%) opacity(0.55);

		&:hover {
			background: var(--graphite);
			filter: grayscale(0%) opacity(1);

			.cell__name { color: var(--gold); }
		}

		img {
			max-width: 100%;
			max-height: 60%;
			object-fit: contain;
			filter: brightness(1.2);
		}
	}

	.cell__ph {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		text-align: center;
	}

	.cell__num {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--gold);
	}

	.cell__name {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1.1rem;
		color: var(--bone);
		transition: color 0.3s ease;
	}
</style>
