<script>
	let { carte = null } = $props();
	const categories = $derived(carte?.categories ?? []);
	let activeIdx = $state(0);
	const active = $derived(categories[activeIdx] ?? null);
</script>

<section id="carte" class="carte" aria-label="Carte du restaurant">
	<header class="ch">
		<p class="eye"><span>03</span> Carte du jour</p>
		<h2>
			Quelques mots<br/>
			<em>sur ce qu'on sert</em>
		</h2>
		<a class="see-all" href="/template/la-tour-des-legendes/carte">
			Voir la carte complète
			<span aria-hidden="true">→</span>
		</a>
	</header>

	{#if categories.length}
		<div class="tabs" role="tablist">
			{#each categories as c, i}
				<button
					role="tab"
					aria-selected={activeIdx === i}
					class:active={activeIdx === i}
					onclick={() => (activeIdx = i)}
				>
					<span class="t-num">{String(i + 1).padStart(2, '0')}</span>
					<span class="t-lab">{c.name}</span>
				</button>
			{/each}
		</div>

		{#if active}
			<div class="menu">
				{#if active.items?.length}
					<ul class="items">
						{#each active.items.slice(0, 6) as it}
							<li>
								<div class="row">
									<span class="name">{it.name}</span>
									<span class="dots" aria-hidden="true"></span>
									<span class="price">{it.price}€</span>
								</div>
								{#if it.description}<p class="desc">{it.description}</p>{/if}
							</li>
						{/each}
					</ul>
				{/if}

				{#if active.subcategories?.length}
					<div class="subs">
						{#each active.subcategories as sub}
							<div class="sub">
								<h4>{sub.name}</h4>
								<ul class="items">
									{#each sub.items.slice(0, 4) as it}
										<li>
											<div class="row">
												<span class="name">{it.name}</span>
												<span class="dots" aria-hidden="true"></span>
												<span class="price">{it.price}€</span>
											</div>
											{#if it.description}<p class="desc">{it.description}</p>{/if}
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	{:else}
		<p class="empty">La carte se prépare. Reviens très vite.</p>
	{/if}
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.carte {
		padding: 6rem 1.25rem 4rem;
		max-width: 1400px;
		margin: 0 auto;
		@include breakpoint('medium') { padding: 8rem 2.5rem 6rem; }
		@include breakpoint('large') { padding: 10rem 4rem 8rem; }
	}
	.ch {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
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
			display: flex; align-items: center; gap: 1rem;
			span {
				display: inline-block;
				padding: 0.3rem 0.6rem;
				background: var(--ink);
				color: var(--gold);
			}
		}
		h2 {
			font-family: var(--f-display);
			font-size: clamp(2.4rem, 6.5vw, 5.5rem);
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
			display: inline-flex;
			gap: 0.6rem;
			justify-self: start;
			transition: gap 0.3s, color 0.2s;
			&:hover { gap: 1.2rem; color: var(--accent-deep); }
		}
	}

	.tabs {
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;
		margin-bottom: 3rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--rule);
		scrollbar-width: thin;
		button {
			flex-shrink: 0;
			background: none;
			border: 1px solid var(--rule);
			padding: 0.7rem 1.2rem;
			border-radius: 999px;
			display: inline-flex;
			gap: 0.6rem;
			align-items: baseline;
			transition: all 0.2s;
			.t-num { font-family: var(--f-mono); font-size: 0.7rem; color: var(--accent); }
			.t-lab { font-family: var(--f-display); font-size: 1rem; }
			&:hover { border-color: var(--ink); }
			&.active {
				background: var(--ink);
				color: var(--base);
				border-color: var(--ink);
				.t-num { color: var(--gold); }
			}
		}
	}

	.menu { display: grid; gap: 3rem; }

	.items {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.items li { padding: 0; }
	.row {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		font-family: var(--f-display);
		font-size: 1.3rem;
		.name { font-weight: 500; }
		.price { font-family: var(--f-mono); font-size: 0.95rem; color: var(--accent-deep); white-space: nowrap; }
		.dots {
			flex: 1;
			height: 1px;
			@include dashed-rule(var(--rule-strong));
			align-self: end;
			margin-bottom: 0.4rem;
		}
	}
	.desc {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 0.95rem;
		color: var(--ink-mute);
		margin-top: 0.3rem;
	}
	.subs { display: grid; gap: 2.5rem; @include breakpoint('medium') { grid-template-columns: repeat(2, 1fr); } }
	.sub h4 {
		font-family: var(--f-mono);
		font-size: 0.7rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--gold-deep);
		margin-bottom: 1.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--rule);
	}
	.empty {
		font-family: var(--f-display);
		font-style: italic;
		text-align: center;
		padding: 4rem 0;
		color: var(--ink-mute);
	}
</style>
