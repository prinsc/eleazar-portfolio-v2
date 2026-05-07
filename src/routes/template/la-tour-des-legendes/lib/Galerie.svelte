<script>
	let { galerie = [], full = false } = $props();
	let idx = $state(-1);
	const items = $derived(full ? galerie : galerie.slice(0, 9));

	function open(i) { idx = i; }
	function close() { idx = -1; }
	function next() { idx = (idx + 1) % items.length; }
	function prev() { idx = (idx - 1 + items.length) % items.length; }

	$effect(() => {
		if (idx < 0) return;
		const onKey = (e) => {
			if (e.key === 'Escape') close();
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') prev();
		};
		window.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			window.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	});
</script>

{#if galerie?.length}
<section id="galerie" class="gal" aria-label="Galerie">
	{#if !full}
		<header class="gh">
			<p class="eye"><span>05</span> Galerie</p>
			<h2>Le lieu, en <em>fragments</em></h2>
			<a class="see-all" href="/template/la-tour-des-legendes/galerie">Voir tout →</a>
		</header>
	{/if}

	<div class="masonry">
		{#each items as item, i}
			<button
				class="cell"
				class:tall={item.tall || i % 5 === 2}
				class:wide={i % 7 === 3}
				onclick={() => open(i)}
				style="--i: {i};"
				aria-label={`Voir image ${i + 1}`}
			>
				<img src={item.src} alt={item.alt || `Image ${i + 1}`} loading="lazy" />
				{#if item.label}<span class="lab">{item.label}</span>{/if}
				<span class="ix">№ {String(i + 1).padStart(2, '0')}</span>
			</button>
		{/each}
	</div>
</section>

{#if idx >= 0}
	<div class="lb" role="dialog" aria-modal="true" onclick={close}>
		<button class="lb-close" onclick={close} aria-label="Fermer">×</button>
		<button class="lb-prev" onclick={(e) => { e.stopPropagation(); prev(); }} aria-label="Précédente">←</button>
		<img src={items[idx].src} alt={items[idx].alt || ''} onclick={(e) => e.stopPropagation()} />
		<button class="lb-next" onclick={(e) => { e.stopPropagation(); next(); }} aria-label="Suivante">→</button>
		<p class="lb-meta">
			<span>№ {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
			{#if items[idx].label}<span class="lb-lab">{items[idx].label}</span>{/if}
		</p>
	</div>
{/if}
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	.gal {
		padding: 4rem 1.25rem;
		max-width: 1600px;
		margin: 0 auto;
		@include breakpoint('medium') { padding: 6rem 2.5rem; }
		@include breakpoint('large') { padding: 8rem 4rem; }
	}
	.gh {
		display: grid;
		gap: 1rem;
		margin-bottom: 3rem;
		@include breakpoint('large') {
			grid-template-columns: auto 1fr auto;
			align-items: end;
			gap: 4rem;
		}
		.eye {
			font-family: var(--f-mono);
			font-size: 0.72rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--accent);
			display: flex; align-items: center; gap: 1rem;
			span { padding: 0.3rem 0.6rem; background: var(--ink); color: var(--gold); }
		}
		h2 {
			font-family: var(--f-display);
			font-size: clamp(2.2rem, 6vw, 5rem);
			line-height: 1;
			em { font-style: italic; color: var(--accent); }
		}
		.see-all {
			font-family: var(--f-mono);
			font-size: 0.78rem;
			text-transform: uppercase;
			letter-spacing: 0.16em;
			padding: 0.9rem 0;
			border-top: 1px solid var(--ink);
			border-bottom: 1px solid var(--ink);
			justify-self: start;
			transition: padding 0.3s;
			&:hover { padding-inline: 1rem; }
		}
	}

	.masonry {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
		grid-auto-rows: 140px;
		grid-auto-flow: dense;
		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
			gap: 1rem;
			grid-auto-rows: 180px;
		}
		@include breakpoint('large') {
			grid-template-columns: repeat(6, 1fr);
			grid-auto-rows: 200px;
		}
	}
	.cell {
		position: relative;
		grid-row: span 2;
		grid-column: span 1;
		overflow: hidden;
		border: 0;
		background: var(--base-deep);
		padding: 0;
		cursor: pointer;
		transition: transform 0.4s;

		&.tall { grid-row: span 3; }
		&.wide { grid-column: span 2; }

		img {
			width: 100%; height: 100%; object-fit: cover;
			transition: transform 0.6s, filter 0.4s;
			filter: saturate(0.95);
		}
		.lab, .ix {
			position: absolute;
			font-family: var(--f-mono);
			font-size: 0.7rem;
			letter-spacing: 0.15em;
			text-transform: uppercase;
			padding: 0.3rem 0.5rem;
			background: var(--ink);
			color: var(--gold);
			opacity: 0;
			transition: opacity 0.3s;
		}
		.ix { top: 0.5rem; right: 0.5rem; }
		.lab { bottom: 0.5rem; left: 0.5rem; background: var(--gold); color: var(--ink); }
		&:hover {
			img { transform: scale(1.05); filter: saturate(1.1); }
			.lab, .ix { opacity: 1; }
		}
		&:focus-visible img { transform: scale(1.05); }
	}

	.lb {
		position: fixed;
		inset: 0;
		background: rgba(11, 11, 12, 0.96);
		z-index: 1000;
		display: grid;
		place-items: center;
		padding: 2rem;
		animation: fade 0.3s ease;
		img {
			max-width: 90vw;
			max-height: 80vh;
			object-fit: contain;
		}
	}
	.lb-close, .lb-prev, .lb-next {
		position: fixed;
		background: none;
		border: 1px solid var(--base);
		color: var(--base);
		width: 48px; height: 48px;
		border-radius: 50%;
		font-size: 22px;
		display: grid; place-items: center;
		transition: background 0.2s, color 0.2s;
		&:hover { background: var(--gold); color: var(--ink); border-color: var(--gold); }
	}
	.lb-close { top: 2rem; right: 2rem; }
	.lb-prev { left: 2rem; top: 50%; transform: translateY(-50%); }
	.lb-next { right: 2rem; top: 50%; transform: translateY(-50%); }
	.lb-meta {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex; gap: 1rem; align-items: center;
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--base);
		.lb-lab { color: var(--gold); }
	}

	@keyframes fade {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@media (prefers-reduced-motion: reduce) {
		.cell, .cell img, .lb { transition: none; animation: none; }
	}
</style>
