<script>
	import { onMount } from 'svelte';

	let { partenaires = null } = $props();

	const defaults = Array.from({ length: 10 }, (_, i) => ({
		name: `PARTENAIRE·${String(i + 1).padStart(2, '0')}`,
		logo: null,
		url: '#'
	}));

	const items = $derived(partenaires && partenaires.length > 0 ? partenaires : defaults);

	let titleEl;

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
	});
</script>

<section class="pt" id="confiance">
	<header class="pt__head" bind:this={titleEl}>
		<div class="pt__head-l">
			<span class="pt__tag">SECTION/05 - TRUST.LOG</span>
			<h2 class="pt__title">
				ILS NOUS ONT<br />
				<span class="pt__title-hot">FAIT CONFIANCE</span>
			</h2>
		</div>
		<div class="pt__head-r">
			<div class="pt__counter">
				<span class="pt__counter-v">{items.length}+</span>
				<span class="pt__counter-u">CLIENTS<br />RÉCURRENTS</span>
			</div>
			<p class="pt__sig">
				MERCI. <span class="pt__sig-d">- SIGNAL FROM Y/2026</span>
			</p>
		</div>
	</header>

	<!-- Ticker tape : 2 rangées qui défilent en sens opposés -->
	<div class="pt__tape pt__tape--top" aria-hidden="true">
		<div class="pt__tape-track pt__tape-track--rtl">
			{#each Array(3) as _, k (k)}
				{#each items as p, i (p.name + i + k)}
					<a
						class="pt__chip"
						href={p.url ?? '#'}
						target={p.url && p.url !== '#' ? '_blank' : undefined}
						rel="noopener"
					>
						{#if p.logo}
							<img src={p.logo} alt={p.name} loading="lazy" />
						{:else}
							<span class="pt__chip-num">{String(i + 1).padStart(2, '0')}</span>
							<span class="pt__chip-name">{p.name}</span>
						{/if}
						<span class="pt__chip-sep">×</span>
					</a>
				{/each}
			{/each}
		</div>
	</div>

	<div class="pt__tape pt__tape--bot" aria-hidden="true">
		<div class="pt__tape-track pt__tape-track--ltr">
			{#each Array(3) as _, k (k)}
				{#each [...items].reverse() as p, i (p.name + i + 'r' + k)}
					<a
						class="pt__chip pt__chip--alt"
						href={p.url ?? '#'}
						target={p.url && p.url !== '#' ? '_blank' : undefined}
						rel="noopener"
					>
						{#if p.logo}
							<img src={p.logo} alt={p.name} loading="lazy" />
						{:else}
							<span class="pt__chip-name">{p.name}</span>
							<span class="pt__chip-num">·{String(items.length - i).padStart(2, '0')}</span>
						{/if}
						<span class="pt__chip-sep">+</span>
					</a>
				{/each}
			{/each}
		</div>
	</div>

	<!-- Stats bar inférieure -->
	<div class="pt__stats">
		<div class="pt__stat">
			<span class="pt__stat-k">SETS LIVRÉS</span>
			<span class="pt__stat-v">2400+</span>
		</div>
		<div class="pt__stat">
			<span class="pt__stat-k">HEURES SCÈNE</span>
			<span class="pt__stat-v">15K+</span>
		</div>
		<div class="pt__stat">
			<span class="pt__stat-k">RÉGIONS</span>
			<span class="pt__stat-v">BE/FR</span>
		</div>
		<div class="pt__stat">
			<span class="pt__stat-k">UPTIME</span>
			<span class="pt__stat-v pt__stat-v--led">99.9%</span>
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.pt {
		padding: 5rem 0 0;
		background: var(--bg);
		border-bottom: 1px solid var(--rule-hot);
		overflow: hidden;

		@include breakpoint('medium') {
			padding: 7rem 0 0;
		}
	}

	.pt__head {
		padding: 0 1.25rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-bottom: 3.5rem;

		@include breakpoint('medium') {
			padding: 0 2rem;
		}

		@include breakpoint('large') {
			grid-template-columns: 1fr auto;
			gap: 3rem;
			align-items: end;
		}
	}
	.pt__tag {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.22em;
		color: var(--signal);
	}
	.pt__title {
		margin: 1rem 0 0;
		font-family: var(--f-display);
		font-weight: 900;
		font-size: clamp(2.5rem, 8vw, 6rem);
		line-height: 0.88;
		letter-spacing: -0.04em;
		text-transform: uppercase;
		color: var(--ink);
	}
	.pt__title-hot {
		color: var(--signal);
	}

	.pt__head-r {
		display: flex;
		align-items: end;
		gap: 1.5rem;
	}
	.pt__counter {
		display: flex;
		align-items: baseline;
		gap: 0.65rem;
		padding: 0.85rem 1.1rem;
		border: 1px solid var(--rule-hot);
		background: var(--panel);
	}
	.pt__counter-v {
		font-family: var(--f-display);
		font-size: clamp(2rem, 4vw, 3rem);
		color: var(--signal);
		font-weight: 900;
		letter-spacing: -0.04em;
		line-height: 0.9;
	}
	.pt__counter-u {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		color: var(--ink-dim);
		line-height: 1.3;
	}
	.pt__sig {
		margin: 0;
		font-family: var(--f-display);
		font-size: 1.5rem;
		color: var(--ink);
		font-weight: 900;
		text-transform: uppercase;
	}
	.pt__sig-d {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		color: var(--ink-mute);
		font-weight: 400;
		margin-top: 0.3rem;
	}

	/* TAPE */
	.pt__tape {
		overflow: hidden;
		border-top: 1px solid var(--rule-hot);
		border-bottom: 1px solid var(--rule);
		padding: 1.5rem 0;
		background: var(--panel);

		&--bot {
			background: var(--bg);
			border-top: none;
			border-bottom: 1px solid var(--rule-hot);
		}
	}
	.pt__tape-track {
		display: inline-flex;
		gap: 1.5rem;
		white-space: nowrap;
		will-change: transform;

		&--rtl {
			animation: tapeRTL 50s linear infinite;
		}
		&--ltr {
			animation: tapeLTR 60s linear infinite;
		}
	}
	@keyframes tapeRTL {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-33.333%);
		}
	}
	@keyframes tapeLTR {
		from {
			transform: translateX(-33.333%);
		}
		to {
			transform: translateX(0);
		}
	}

	.pt__chip {
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.65rem 1.1rem;
		text-decoration: none;
		color: var(--ink);
		border: 1px solid var(--rule-hot);
		font-family: var(--f-mono);
		font-size: 13px;
		letter-spacing: 0.1em;
		transition: all 0.3s ease;
		flex-shrink: 0;

		&:hover {
			background: var(--signal);
			color: var(--bg);
			border-color: var(--signal);

			.pt__chip-num {
				color: var(--bg);
				opacity: 0.7;
			}
			.pt__chip-sep {
				color: var(--bg);
			}
		}
	}
	.pt__chip--alt {
		background: var(--panel);
	}
	.pt__chip-num {
		color: var(--signal);
		font-size: 11px;
	}
	.pt__chip-name {
		font-weight: 500;
	}
	.pt__chip-sep {
		color: var(--ink-mute);
		font-size: 16px;
		margin-left: 0.5rem;
	}
	.pt__chip img {
		max-height: 28px;
		max-width: 100px;
		object-fit: contain;
		filter: grayscale(100%) brightness(2);
	}

	/* STATS */
	.pt__stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		background: var(--bg);

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.pt__stat {
		padding: 1.5rem 1.5rem;
		border-right: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
		display: flex;
		flex-direction: column;
		gap: 0.4rem;

		&:nth-child(2n) {
			border-right: none;
		}

		@include breakpoint('medium') {
			border-bottom: none;
			padding: 2rem;

			&:nth-child(2n) {
				border-right: 1px solid var(--rule);
			}
			&:last-child {
				border-right: none;
			}
		}
	}
	.pt__stat-k {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		color: var(--ink-mute);
	}
	.pt__stat-v {
		font-family: var(--f-display);
		font-size: clamp(2rem, 4vw, 2.75rem);
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 0.95;
		color: var(--ink);
	}
	.pt__stat-v--led {
		color: var(--led);
		text-shadow: 0 0 12px rgba(34, 197, 94, 0.4);
	}
</style>
