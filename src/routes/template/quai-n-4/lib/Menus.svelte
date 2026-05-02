<script>
	let { menus = [], cta } = $props();
</script>

<section class="menus" id="menus">
	<div class="container">
		<header class="head">
			<span class="eyebrow">— Menus dégustation</span>
			<h2>L'expérience, <em>en plusieurs actes</em></h2>
		</header>

		<div class="cards">
			{#each menus as menu, i}
				<article class="card" class:featured={i === menus.length - 1}>
					<div class="card-head">
						<h3>{menu.name}</h3>
						<div class="price">
							<span class="eur">€</span>
							<span class="amount">{menu.price}</span>
							<span class="per">/ pers.</span>
						</div>
					</div>

					<div class="divider" aria-hidden="true">
						<span></span>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M8 1 L9.5 6.5 L15 8 L9.5 9.5 L8 15 L6.5 9.5 L1 8 L6.5 6.5 Z" fill="currentColor" />
						</svg>
						<span></span>
					</div>

					<ul class="sections">
						{#each menu.data?.sections ?? [] as s}
							<li>
								<span class="titre">{s.titre}</span>
								<span class="choix">{s.choix}</span>
							</li>
						{/each}
					</ul>

					{#if cta?.reservation?.url}
						<a class="reserve" href={cta.reservation.url} target="_blank" rel="noopener">
							Réserver ce menu
							<span>→</span>
						</a>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.menus {
		padding: 5rem 1.25rem;
		background: var(--q-paper);

		@include breakpoint('large') {
			padding: 9rem 2.5rem;
		}
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.head {
		text-align: center;
		margin-bottom: 4rem;

		.eyebrow {
			display: block;
			font-family: var(--q-mono);
			font-size: 0.7rem;
			letter-spacing: 0.24em;
			text-transform: uppercase;
			color: var(--q-gold-deep);
			margin-bottom: 1.5rem;
		}

		h2 {
			margin: 0;
			font-family: var(--q-display);
			font-weight: 300;
			font-size: clamp(2.25rem, 5.5vw, 4rem);
			line-height: 1;
			color: var(--q-ink);
			letter-spacing: -0.02em;

			em {
				font-style: italic;
				color: var(--q-emerald-deep);
			}
		}
	}

	.cards {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;

		@include breakpoint('large') {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}
	}

	.card {
		position: relative;
		padding: 2.5rem 2rem;
		background: var(--q-white);
		border: 1px solid var(--q-line);
		display: flex;
		flex-direction: column;
		transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;

		&:hover {
			transform: translateY(-4px);
			box-shadow: 0 30px 60px -40px rgba(8, 8, 6, 0.3);
			border-color: var(--q-gold);
		}

		&.featured {
			background: var(--q-ink);
			color: var(--q-cream);
			border-color: var(--q-ink);

			.card-head h3,
			.price .amount,
			.titre {
				color: var(--q-gold-bright);
			}

			.divider span {
				background: rgba(184, 148, 90, 0.4);
			}

			.divider svg {
				color: var(--q-gold);
			}

			.sections li {
				border-color: rgba(236, 228, 210, 0.12);
			}

			.choix {
				color: var(--q-cream);
				opacity: 0.85;
			}

			.reserve {
				background: var(--q-gold);
				color: var(--q-ink);
				border-color: var(--q-gold);

				&:hover {
					background: var(--q-gold-bright);
				}
			}
		}

		@include breakpoint('large') {
			padding: 3.5rem 3rem;
		}
	}

	.card-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		flex-wrap: wrap;

		h3 {
			margin: 0;
			font-family: var(--q-display);
			font-weight: 400;
			font-style: italic;
			font-size: 1.75rem;
			color: var(--q-ink);
		}
	}

	.price {
		display: inline-flex;
		align-items: baseline;
		gap: 0.3rem;

		.eur {
			font-family: var(--q-display);
			font-size: 1.2rem;
			color: var(--q-gold-deep);
		}

		.amount {
			font-family: var(--q-display);
			font-size: 2.4rem;
			color: var(--q-ink);
			line-height: 1;
		}

		.per {
			font-family: var(--q-mono);
			font-size: 0.7rem;
			text-transform: uppercase;
			letter-spacing: 0.16em;
			color: var(--q-gold-deep);
			margin-left: 0.3rem;
		}
	}

	.divider {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin: 2rem 0;
		color: var(--q-gold);

		span {
			flex: 1;
			height: 1px;
			background: var(--q-line);
		}
	}

	.sections {
		list-style: none;
		padding: 0;
		margin: 0 0 2rem;
		display: flex;
		flex-direction: column;
		flex: 1;

		li {
			padding: 1rem 0;
			border-bottom: 1px solid var(--q-line-soft);
			display: grid;
			grid-template-columns: minmax(110px, 1fr) 2.5fr;
			gap: 1rem;
			align-items: baseline;

			&:last-child {
				border-bottom: none;
			}
		}

		.titre {
			font-family: var(--q-mono);
			font-size: 0.65rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--q-gold-deep);
		}

		.choix {
			font-family: var(--q-serif);
			font-size: 1.05rem;
			color: var(--q-ink);
			line-height: 1.5;
		}
	}

	.reserve {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.4rem;
		background: var(--q-emerald-deep);
		border: 1px solid var(--q-emerald-deep);
		color: var(--q-gold-bright);
		font-family: var(--q-sans);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		text-decoration: none;
		transition: background 0.3s ease, color 0.3s ease;

		&:hover {
			background: var(--q-ink);
			border-color: var(--q-ink);
		}
	}
</style>
