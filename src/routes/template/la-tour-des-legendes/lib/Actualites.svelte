<script>
	let { actualites = [] } = $props();
	const list = $derived((actualites ?? []).filter(a => a.active));
	function fmt(d) { try { return new Date(d).toLocaleDateString('fr-BE', { day: '2-digit', month: 'long', year: 'numeric' }); } catch { return d; } }
</script>

{#if list.length}
<section class="news" aria-label="Actualités">
	<header class="nh">
		<p class="eye"><span>08</span> Brèves</p>
		<h2>Actualités</h2>
	</header>

	<div class="grid">
		{#each list as n, i}
			<article class="brev" style="--i: {i};">
				<span class="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
				<time class="date">{fmt(n.date)}</time>
				<h3>{n.title}</h3>
				<p class="sum">{n.summary || n.content}</p>
				<a class="ln" href="/template/la-tour-des-legendes/blog">Lire →</a>
			</article>
		{/each}
	</div>
</section>
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	.news {
		padding: 4rem 1.25rem;
		max-width: 1400px;
		margin: 0 auto;
		@include breakpoint('medium') { padding: 6rem 2.5rem; }
		@include breakpoint('large') { padding: 8rem 4rem; }
	}
	.nh {
		margin-bottom: 3rem;
		.eye {
			font-family: var(--f-mono);
			font-size: 0.72rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--accent);
			display: inline-flex; gap: 1rem; align-items: center;
			margin-bottom: 1rem;
			span { padding: 0.3rem 0.6rem; background: var(--ink); color: var(--gold); }
		}
		h2 {
			font-family: var(--f-display);
			font-size: clamp(2rem, 5vw, 3.5rem);
			em { font-style: italic; color: var(--accent); }
		}
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		@include breakpoint('medium') { grid-template-columns: repeat(2, 1fr); }
		@include breakpoint('large') { grid-template-columns: repeat(3, 1fr); gap: 3rem; }
	}
	.brev {
		position: relative;
		padding: 2rem 0 1.5rem;
		border-top: 2px solid var(--ink);
		.num {
			position: absolute;
			top: -1.2rem;
			right: 0;
			font-family: var(--f-mono);
			font-size: 0.72rem;
			letter-spacing: 0.2em;
			background: var(--base);
			padding: 0 0.5rem;
			color: var(--accent);
		}
	}
	.date {
		font-family: var(--f-mono);
		font-size: 0.72rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ink-mute);
		display: block;
		margin-bottom: 1rem;
	}
	h3 {
		font-family: var(--f-display);
		font-size: 1.5rem;
		line-height: 1.15;
		margin-bottom: 0.75rem;
	}
	.sum {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1rem;
		line-height: 1.5;
		color: var(--ink-soft);
		@include clamp-lines(3);
		margin-bottom: 1.25rem;
	}
	.ln {
		font-family: var(--f-mono);
		font-size: 0.74rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent-deep);
	}
</style>
