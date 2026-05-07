<script>
	let { avis = null } = $props();
	const list = $derived(avis?.avis ?? []);
	const minStars = $derived(avis?.avisMinStars?.value ?? 4);
	const filtered = $derived(list.filter(a => a.note >= minStars));

	let active = $state(0);

	function fmt(d) {
		try {
			return new Date(d).toLocaleDateString('fr-BE', { month: 'long', year: 'numeric' });
		} catch { return d; }
	}
</script>

{#if filtered.length}
<section class="avis" aria-label="Avis clients">
	<div class="grid">
		<aside class="side">
			<p class="eye"><span>06</span> Paroles</p>
			<h2>
				Ce qu'<em>on</em><br/>en dit
			</h2>
			<div class="rating">
				<div class="stars">
					{#each Array(5) as _, i}
						<span class:on={i < Math.round(filtered.reduce((s, a) => s + a.note, 0) / filtered.length)}>★</span>
					{/each}
				</div>
				<p class="num">
					{(filtered.reduce((s, a) => s + a.note, 0) / filtered.length).toFixed(1)} <span>/ 5</span>
				</p>
				<p class="cnt">— sur {filtered.length} avis</p>
			</div>
		</aside>

		<div class="quote">
			{#each filtered as a, i}
				{#if i === active}
					<blockquote class="card">
						<span class="open" aria-hidden="true">"</span>
						<p>{a.texte}</p>
						<footer>
							<div class="who">
								<span class="auth">— {a.auteur}</span>
								<span class="when">{fmt(a.date)}</span>
							</div>
							<div class="rt">
								{#each Array(5) as _, j}
									<span class:on={j < a.note}>★</span>
								{/each}
							</div>
						</footer>
					</blockquote>
				{/if}
			{/each}

			{#if filtered.length > 1}
				<div class="dots-nav" role="tablist">
					{#each filtered as _, i}
						<button
							onclick={() => (active = i)}
							class:active={active === i}
							aria-label={`Avis ${i + 1}`}
						></button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	.avis {
		padding: 6rem 1.25rem;
		background: var(--base-warm);
		position: relative;
		@include breakpoint('medium') { padding: 8rem 2.5rem; }
		@include breakpoint('large') { padding: 10rem 4rem; }
	}
	.grid {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		gap: 3rem;
		@include breakpoint('large') {
			grid-template-columns: 1fr 2fr;
			gap: 5rem;
			align-items: start;
		}
	}
	.side {
		.eye {
			font-family: var(--f-mono);
			font-size: 0.72rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--accent);
			display: inline-flex; gap: 1rem; align-items: center;
			margin-bottom: 1.5rem;
			span { padding: 0.3rem 0.6rem; background: var(--ink); color: var(--gold); }
		}
		h2 {
			font-family: var(--f-display);
			font-size: clamp(2.4rem, 7vw, 6rem);
			line-height: 0.95;
			em { font-style: italic; color: var(--accent); }
			margin-bottom: 2.5rem;
		}
	}
	.rating {
		padding-top: 2rem;
		border-top: 1px dashed var(--rule-strong);
		.stars {
			font-size: 1.4rem;
			color: var(--rule-strong);
			margin-bottom: 0.5rem;
			.on { color: var(--gold-deep); }
		}
		.num {
			font-family: var(--f-display);
			font-size: 3rem;
			line-height: 1;
			span { font-size: 1.2rem; color: var(--ink-mute); }
		}
		.cnt {
			font-family: var(--f-mono);
			font-size: 0.74rem;
			letter-spacing: 0.14em;
			text-transform: uppercase;
			color: var(--ink-mute);
			margin-top: 0.5rem;
		}
	}
	.quote { position: relative; }
	.card {
		position: relative;
		padding: 3rem 0;
		animation: rise 0.5s ease;
	}
	.open {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 8rem;
		line-height: 0.7;
		color: var(--accent);
		position: absolute;
		top: -1rem;
		left: -0.2em;
		opacity: 0.3;
	}
	.card p {
		font-family: var(--f-display);
		font-size: clamp(1.4rem, 3vw, 2.4rem);
		line-height: 1.35;
		color: var(--ink);
		max-width: 26ch;
		position: relative;
		z-index: 1;
	}
	.card footer {
		display: flex;
		justify-content: space-between;
		align-items: end;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px solid var(--rule);
	}
	.who { display: flex; flex-direction: column; gap: 0.2rem; }
	.auth {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1.1rem;
	}
	.when {
		font-family: var(--f-mono);
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--ink-mute);
	}
	.rt { font-size: 1rem; color: var(--rule-strong); .on { color: var(--gold-deep); } }
	.dots-nav {
		display: flex;
		gap: 0.75rem;
		margin-top: 2rem;
		button {
			width: 32px;
			height: 2px;
			background: var(--rule-strong);
			border: 0;
			padding: 0;
			cursor: pointer;
			transition: background 0.2s, height 0.2s;
			&:hover { background: var(--ink); }
			&.active { background: var(--accent); height: 3px; }
		}
	}
	@keyframes rise {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
