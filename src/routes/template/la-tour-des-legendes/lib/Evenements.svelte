<script>
	let { evenements = [], full = false } = $props();
	const list = $derived(full ? evenements : evenements.slice(0, 4));

	function fmtDay(d) {
		try { return new Date(d).toLocaleDateString('fr-BE', { day: '2-digit' }); } catch { return ''; }
	}
	function fmtMonth(d) {
		try { return new Date(d).toLocaleDateString('fr-BE', { month: 'short' }).replace('.', ''); } catch { return ''; }
	}
	function fmtYear(d) {
		try { return new Date(d).toLocaleDateString('fr-BE', { year: 'numeric' }); } catch { return ''; }
	}
</script>

{#if list?.length}
<section id="evenements" class="ev" aria-label="Événements">
	{#if !full}
		<header class="eh">
			<p class="eye"><span>07</span> Agenda</p>
			<h2>Ce qu'on <em>prépare</em></h2>
			<a class="see-all" href="/template/la-tour-des-legendes/evenements">Tout l'agenda →</a>
		</header>
	{/if}

	<ol class="timeline">
		{#each list as e, i}
			<li class="ev-item" style="--i: {i};">
				<div class="date">
					<span class="day">{fmtDay(e.date)}</span>
					<span class="mo">{fmtMonth(e.date)}</span>
					<span class="yr">{fmtYear(e.date)}</span>
				</div>
				<div class="rule" aria-hidden="true">
					<span class="dot"></span>
				</div>
				<a class="card" href={`/template/la-tour-des-legendes/evenements/${e.id}`}>
					{#if e.image}
						<div class="thumb">
							<img src={e.image} alt={e.title} loading="lazy" />
						</div>
					{/if}
					<div class="body">
						<h3>{e.title}</h3>
						<p class="desc">{e.description}</p>
						<span class="more">Lire la suite →</span>
					</div>
				</a>
			</li>
		{/each}
	</ol>
</section>
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	.ev {
		padding: 6rem 1.25rem;
		max-width: 1400px;
		margin: 0 auto;
		@include breakpoint('medium') { padding: 8rem 2.5rem; }
		@include breakpoint('large') { padding: 10rem 4rem; }
	}
	.eh {
		display: grid;
		gap: 1rem;
		margin-bottom: 4rem;
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
			display: inline-flex; gap: 1rem; align-items: center;
			span { padding: 0.3rem 0.6rem; background: var(--ink); color: var(--gold); }
		}
		h2 {
			font-family: var(--f-display);
			font-size: clamp(2.4rem, 7vw, 6rem);
			line-height: 0.95;
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

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.ev-item {
		display: grid;
		grid-template-columns: 80px 24px 1fr;
		gap: 1.25rem;
		align-items: stretch;
		@include breakpoint('medium') { grid-template-columns: 120px 32px 1fr; gap: 2rem; }
	}
	.date {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-start;
		padding-top: 1rem;
		text-align: right;
		.day {
			font-family: var(--f-display);
			font-style: italic;
			font-size: clamp(2.5rem, 5vw, 4rem);
			line-height: 0.85;
			color: var(--accent);
		}
		.mo {
			font-family: var(--f-mono);
			font-size: 0.7rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			margin-top: 0.4rem;
		}
		.yr { font-family: var(--f-mono); font-size: 0.7rem; opacity: 0.5; margin-top: 0.2rem; }
	}
	.rule {
		position: relative;
		display: grid;
		justify-items: center;
		&::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			width: 1px;
			background: var(--rule-strong);
		}
		.dot {
			position: relative;
			width: 12px;
			height: 12px;
			background: var(--gold);
			border: 2px solid var(--ink);
			border-radius: 50%;
			margin-top: 1.5rem;
			z-index: 1;
		}
	}
	.card {
		display: grid;
		grid-template-columns: 1fr;
		background: var(--base);
		border: 1px solid var(--rule);
		padding: 1.5rem;
		gap: 1rem;
		transition: border-color 0.3s, transform 0.3s;
		@include breakpoint('medium') { grid-template-columns: 200px 1fr; padding: 1.5rem; gap: 1.5rem; }
		&:hover {
			border-color: var(--ink);
			transform: translateX(4px);
			.more { padding-left: 0.5rem; }
		}
	}
	.thumb {
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background: var(--base-deep);
		img { width: 100%; height: 100%; object-fit: cover; }
	}
	.body { display: flex; flex-direction: column; gap: 0.6rem; }
	h3 {
		font-family: var(--f-display);
		font-size: clamp(1.4rem, 3vw, 2rem);
		line-height: 1.05;
	}
	.desc {
		font-family: var(--f-display);
		font-size: 0.95rem;
		line-height: 1.5;
		color: var(--ink-soft);
		@include clamp-lines(2);
	}
	.more {
		margin-top: auto;
		font-family: var(--f-mono);
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--accent-deep);
		transition: padding 0.3s;
	}
</style>
