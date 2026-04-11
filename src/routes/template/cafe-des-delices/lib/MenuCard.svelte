<script>
	// Carte d'un menu (entrée/plat/dessert avec prix)
	let { menu } = $props();
</script>

<article class="card">
	<header class="card__head">
		<span class="card__num">N<sup>o</sup> {menu.num}</span>
		<h3 class="card__title">{menu.nom}</h3>
		<div class="card__price">
			<span class="amount">{menu.prix}</span>
			<span class="cur">€</span>
		</div>
	</header>

	<ul class="card__sections">
		{#each menu.sections as s}
			<li class="sec">
				<span class="sec__label">{s.titre}</span>
				<p class="sec__choix">{s.choix}</p>
			</li>
		{/each}
	</ul>
</article>

<style>
	.card {
		background: var(--cream);
		border: 1px solid var(--slate);
		padding: 2.5rem 2.5rem 3rem;
		position: relative;
		transition: background 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.card:hover {
		background: var(--cream-deep);
		transform: translateY(-4px);
	}
	.card::before {
		content: '';
		position: absolute;
		inset: 8px;
		border: 1px solid var(--rule);
		pointer-events: none;
	}

	.card__head {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: baseline;
		gap: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--rule);
		margin-bottom: 1.5rem;
	}
	.card__num {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}
	.card__title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 400;
		font-size: 1.75rem;
		letter-spacing: -0.015em;
	}
	.card__price {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 2.25rem;
		letter-spacing: -0.03em;
		line-height: 1;
	}
	.card__price .cur {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		font-size: 1rem;
		color: var(--ember);
		margin-left: 0.1em;
	}

	.card__sections {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.sec {
		padding: 1.1rem 0;
		border-bottom: 1px dashed var(--rule);
	}
	.sec:last-child {
		border-bottom: none;
	}
	.sec__label {
		display: block;
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--ember);
		margin-bottom: 0.4rem;
	}
	.sec__choix {
		margin: 0;
		font-family: var(--f-display);
		font-size: 1rem;
		line-height: 1.5;
		color: var(--slate);
	}

	@media (max-width: 700px) {
		.card {
			padding: 2rem 1.75rem 2.5rem;
		}
		.card__head {
			grid-template-columns: 1fr auto;
			gap: 0.75rem 1.25rem;
		}
		.card__num {
			grid-column: 1 / -1;
		}
		.card__title {
			font-size: 1.5rem;
		}
		.card__price {
			font-size: 1.85rem;
		}
	}
</style>
