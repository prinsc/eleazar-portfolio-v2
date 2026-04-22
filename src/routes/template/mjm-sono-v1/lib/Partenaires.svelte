<script>
	import { onMount } from 'svelte';

	let { partenaires = null } = $props();

	const defaults = Array.from({ length: 8 }, (_, i) => ({
		name: `Partenaire ${i + 1}`,
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
			opacity: 0, y: 24, duration: 0.7, ease: 'power2.out',
			scrollTrigger: { trigger: titleEl, start: 'top 82%' }
		});

		cellEls.forEach((el, i) => {
			if (!el) return;
			gsap.from(el, {
				opacity: 0, y: 16, duration: 0.5, delay: i * 0.04, ease: 'power2.out',
				scrollTrigger: { trigger: el, start: 'top 92%' }
			});
		});
	});
</script>

<section class="part" id="confiance">
	<div class="wrap">
		<header class="head" bind:this={titleEl}>
			<span class="tag">Références</span>
			<h2>Ils nous ont fait confiance</h2>
			<p class="sub">Quelques-uns des clients, salles et partenaires avec qui on bosse régulièrement.</p>
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
						<span class="cell__name">{p.name}</span>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.part {
		padding: 5rem 1.25rem;
		border-bottom: 1px solid var(--line);

		@include breakpoint('medium') {
			padding: 6rem 2rem;
		}
	}

	.wrap { max-width: 1280px; margin: 0 auto; }

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

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;

		@include breakpoint('small') {
			grid-template-columns: repeat(3, 1fr);
		}

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
			gap: 1rem;
		}
	}

	.cell {
		aspect-ratio: 3 / 2;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		padding: 1rem;
		transition: all 0.2s ease;
		filter: grayscale(100%);
		opacity: 0.7;

		&:hover {
			filter: grayscale(0%);
			opacity: 1;
			border-color: var(--line-strong);
			background: var(--surface-2);

			.cell__name { color: var(--red); }
		}

		img {
			max-width: 100%;
			max-height: 60%;
			object-fit: contain;
		}
	}

	.cell__name {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--text-soft);
		text-align: center;
		transition: color 0.2s ease;
	}
</style>
