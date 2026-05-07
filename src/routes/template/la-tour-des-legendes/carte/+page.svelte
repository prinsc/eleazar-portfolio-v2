<script>
	import PageHeader from '../lib/PageHeader.svelte';
	let { data } = $props();
	const categories = $derived(data?.carte?.categories ?? []);
	const menus = $derived(data?.menus ?? []);
</script>

<svelte:head>
	<title>Carte — La Tour des Légendes</title>
	<meta name="description" content="La carte complète de la Tour des Légendes." />
</svelte:head>

<PageHeader
	num="03"
	kicker="Carte"
	title="Carte"
	italic="& formules"
	lead="Tout ce qu'on sert, classé par envies — boissons, plats, douceurs, formules."
/>

<section class="page">
	{#each categories as cat, i}
		<article class="cat">
			<header class="cat-h">
				<span class="num">{String(i + 1).padStart(2, '0')}</span>
				<h2>{cat.name}</h2>
				<span class="line" aria-hidden="true"></span>
			</header>

			{#if cat.note}<p class="note">{cat.note}</p>{/if}

			{#if cat.items?.length}
				<ul class="items">
					{#each cat.items as it}
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

			{#if cat.subcategories?.length}
				<div class="subs">
					{#each cat.subcategories as sub}
						<div class="sub">
							<h3>— {sub.name} —</h3>
							<ul class="items">
								{#each sub.items as it}
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
		</article>
	{/each}

	{#if menus.length}
		<article class="cat">
			<header class="cat-h">
				<span class="num">{String(categories.length + 1).padStart(2, '0')}</span>
				<h2>Formules</h2>
				<span class="line"></span>
			</header>
			<div class="formules">
				{#each menus as m, i}
					<div class="fcard">
						<div class="fhead">
							<span>№ {String(i + 1).padStart(2, '0')}</span>
							<span class="fp">{m.price}€</span>
						</div>
						<h3>{m.name}</h3>
						{#if m.data?.sections}
							<ul class="fsec">
								{#each m.data.sections as s}
									<li>
										<span class="ftitre">{s.titre}</span>
										<p>{s.choix}</p>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</div>
		</article>
	{/if}
</section>

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	.page {
		padding: 4rem 1.25rem 8rem;
		max-width: 1100px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 6rem;
		@include breakpoint('medium') { padding: 5rem 2.5rem 10rem; gap: 7rem; }
	}
	.cat-h {
		display: grid;
		grid-template-columns: auto auto 1fr;
		gap: 1.5rem;
		align-items: baseline;
		margin-bottom: 2.5rem;
		.num {
			font-family: var(--f-mono);
			font-size: 0.85rem;
			letter-spacing: 0.2em;
			color: var(--gold-deep);
			background: var(--ink);
			color: var(--gold);
			padding: 0.4rem 0.7rem;
			align-self: center;
		}
		h2 {
			font-family: var(--f-display);
			font-size: clamp(2rem, 5vw, 3.5rem);
			line-height: 1;
			letter-spacing: -0.02em;
		}
		.line { height: 1px; background: var(--ink); }
	}
	.note {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1rem;
		color: var(--ink-mute);
		margin-bottom: 2rem;
		max-width: 60ch;
	}
	.items {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.row {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		font-family: var(--f-display);
		font-size: clamp(1.1rem, 2vw, 1.4rem);
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
		max-width: 60ch;
	}
	.subs { margin-top: 3rem; display: grid; gap: 3rem; @include breakpoint('medium') { grid-template-columns: repeat(2, 1fr); } }
	.sub h3 {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1.1rem;
		color: var(--accent);
		margin-bottom: 1.5rem;
		text-align: center;
	}
	.formules {
		display: grid;
		gap: 2rem;
		@include breakpoint('medium') { grid-template-columns: repeat(2, 1fr); }
	}
	.fcard {
		padding: 2rem;
		border: 1px solid var(--ink);
		background: var(--base-warm);
	}
	.fhead {
		display: flex;
		justify-content: space-between;
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		padding-bottom: 1rem;
		margin-bottom: 1rem;
		border-bottom: 1px dashed var(--rule-strong);
		.fp { color: var(--accent); font-family: var(--f-display); font-style: italic; font-size: 1.5rem; letter-spacing: 0; text-transform: none; }
	}
	.fcard h3 {
		font-family: var(--f-display);
		font-size: 1.6rem;
		margin-bottom: 1.5rem;
	}
	.fsec { display: flex; flex-direction: column; gap: 1rem; }
	.fsec li { padding: 0.5rem 0; border-bottom: 1px dotted var(--rule); }
	.ftitre {
		font-family: var(--f-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--gold-deep);
	}
	.fsec p {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 0.95rem;
		line-height: 1.5;
		color: var(--ink-soft);
		margin-top: 0.4rem;
	}
</style>
