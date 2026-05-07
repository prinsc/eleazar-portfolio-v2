<script>
	let { blog = [], full = false } = $props();
	const list = $derived(full ? blog.filter(b => b.status === 'publie') : blog.filter(b => b.status === 'publie').slice(0, 3));
	function fmt(d) { try { return new Date(d).toLocaleDateString('fr-BE', { day: '2-digit', month: 'long', year: 'numeric' }); } catch { return d; } }
</script>

{#if list.length}
<section id="journal" class="bg" aria-label="Journal">
	{#if !full}
		<header class="bh">
			<p class="eye"><span>09</span> Journal</p>
			<h2>
				Récits & <em>chroniques</em>
			</h2>
			<a class="see-all" href="/template/la-tour-des-legendes/blog">Tout le journal →</a>
		</header>
	{/if}

	<div class="list">
		{#each list as a, i}
			<a class="art" href={`/template/la-tour-des-legendes/blog/${a.slug}`} style="--i: {i}">
				<span class="big" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
				<div class="meta">
					{#if a.category}<span class="cat">{a.category}</span>{/if}
					<time>{fmt(a.date)}</time>
				</div>
				<h3>{a.title}</h3>
				<p class="sum">{a.summary}</p>
				<span class="auth">— par {a.author}</span>
				<span class="arr" aria-hidden="true">→</span>
			</a>
		{/each}
	</div>
</section>
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	.bg {
		padding: 6rem 1.25rem;
		max-width: 1400px;
		margin: 0 auto;
		@include breakpoint('medium') { padding: 8rem 2.5rem; }
		@include breakpoint('large') { padding: 10rem 4rem; }
	}
	.bh {
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

	.list { display: flex; flex-direction: column; }
	.art {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		padding: 2.5rem 0;
		border-top: 1px solid var(--ink);
		transition: padding 0.4s, background 0.3s;

		@include breakpoint('large') {
			grid-template-columns: 100px 220px 1fr auto;
			gap: 2rem;
			align-items: baseline;
		}

		&:last-child { border-bottom: 1px solid var(--ink); }
		&:hover {
			background: var(--base-deep);
			padding-inline: 1rem;
			.arr { transform: translateX(8px); color: var(--accent); }
			.big { color: var(--accent); }
		}
	}
	.big {
		font-family: var(--f-display);
		font-style: italic;
		font-size: clamp(2.5rem, 4vw, 4rem);
		line-height: 0.85;
		color: var(--rule-strong);
		transition: color 0.3s;
	}
	.meta {
		display: flex; flex-direction: column; gap: 0.3rem;
		font-family: var(--f-mono);
		font-size: 0.72rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		.cat { color: var(--accent-deep); font-weight: 500; }
		time { color: var(--ink-mute); }
	}
	h3 {
		font-family: var(--f-display);
		font-size: clamp(1.5rem, 3vw, 2.4rem);
		line-height: 1.05;
		max-width: 28ch;
	}
	.sum {
		display: none;
		@include breakpoint('large') {
			display: block;
			font-family: var(--f-display);
			font-style: italic;
			font-size: 0.95rem;
			color: var(--ink-mute);
			margin-top: 0.5rem;
			max-width: 36ch;
		}
	}
	.auth {
		font-family: var(--f-mono);
		font-size: 0.7rem;
		letter-spacing: 0.16em;
		color: var(--ink-mute);
		text-transform: uppercase;
	}
	.arr {
		font-size: 1.6rem;
		transition: transform 0.3s, color 0.3s;
		justify-self: end;
		align-self: center;
	}
</style>
