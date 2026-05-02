<script>
	let { carte } = $props();
	const cats = $derived(carte?.categories ?? []);
</script>

<section class="carte" id="carte">
	<div class="container">
		<header class="head">
			<span class="eyebrow">— La carte</span>
			<h2>
				Une lecture, <em>un voyage</em>
			</h2>
			<p class="intro">
				Chaque saison, nos chefs réécrivent la carte avec les producteurs belges. Quelques signatures
				demeurent — les autres se renouvellent au gré du marché.
			</p>
		</header>

		<div class="cats">
			{#each cats as cat}
				<div class="cat">
					<div class="cat-head">
						<h3>{cat.name}</h3>
						<span class="line"></span>
					</div>
					{#if cat.note}
						<p class="note">{cat.note}</p>
					{/if}
					<ul class="items">
						{#each cat.items ?? [] as item}
							<li>
								<div class="row">
									<span class="dish">{item.name}</span>
									<span class="dots" aria-hidden="true"></span>
									<span class="price">{item.price}<span class="eur"> €</span></span>
								</div>
								{#if item.description}
									<p class="desc">{item.description}</p>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.carte {
		position: relative;
		padding: 5rem 1.25rem;
		background: var(--q-emerald-deep);
		color: var(--q-cream);

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background-image:
				radial-gradient(circle at 15% 20%, rgba(184, 148, 90, 0.08), transparent 40%),
				radial-gradient(circle at 85% 80%, rgba(184, 148, 90, 0.06), transparent 50%);
			pointer-events: none;
		}

		@include breakpoint('large') {
			padding: 9rem 2.5rem;
		}
	}

	.container {
		position: relative;
		max-width: 1100px;
		margin: 0 auto;
		z-index: 2;
	}

	.head {
		text-align: center;
		margin-bottom: 5rem;

		.eyebrow {
			font-family: var(--q-mono);
			font-size: 0.7rem;
			letter-spacing: 0.24em;
			text-transform: uppercase;
			color: var(--q-gold);
			display: block;
			margin-bottom: 1.5rem;
		}

		h2 {
			margin: 0 0 1.5rem;
			font-family: var(--q-display);
			font-weight: 300;
			font-size: clamp(2.5rem, 6vw, 4.5rem);
			line-height: 1;
			letter-spacing: -0.02em;

			em {
				font-style: italic;
				background: linear-gradient(180deg, var(--q-gold-bright), var(--q-gold-deep));
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
			}
		}

		.intro {
			margin: 0 auto;
			max-width: 52ch;
			font-family: var(--q-serif);
			font-style: italic;
			font-size: 1.1rem;
			opacity: 0.82;
		}
	}

	.cats {
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(2, 1fr);
			gap: 4rem 5rem;
		}

		@include breakpoint('large') {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.cat-head {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;

		h3 {
			margin: 0;
			font-family: var(--q-display);
			font-style: italic;
			font-weight: 400;
			font-size: 1.5rem;
			color: var(--q-gold-bright);
			letter-spacing: 0.02em;
		}

		.line {
			flex: 1;
			height: 1px;
			background: linear-gradient(to right, var(--q-gold), transparent);
		}
	}

	.note {
		margin: -1.5rem 0 1.5rem;
		font-family: var(--q-mono);
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--q-gold);
		opacity: 0.7;
	}

	.items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;

		li {
			.row {
				display: flex;
				align-items: baseline;
				gap: 0.75rem;
			}

			.dish {
				font-family: var(--q-serif);
				font-size: 1.1rem;
				color: var(--q-cream);
				flex-shrink: 0;
			}

			.dots {
				flex: 1;
				border-bottom: 1px dotted rgba(184, 148, 90, 0.4);
				transform: translateY(-4px);
			}

			.price {
				font-family: var(--q-mono);
				font-size: 0.85rem;
				color: var(--q-gold-bright);
				letter-spacing: 0.04em;
				flex-shrink: 0;

				.eur {
					font-size: 0.7rem;
					opacity: 0.7;
				}
			}

			.desc {
				margin: 0.4rem 0 0;
				font-family: var(--q-serif);
				font-style: italic;
				font-size: 0.95rem;
				color: var(--q-cream);
				opacity: 0.6;
				max-width: 38ch;
			}
		}
	}
</style>
