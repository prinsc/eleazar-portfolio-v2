<script>
	let { infos, socials = [] } = $props();
	const year = new Date().getFullYear();
</script>

<footer class="foot">
	<div class="container">
		<div class="brand-block">
			<span class="word">Quai n°4</span>
			<span class="star">✦</span>
			<p class="tag">Restaurant gastronomique étoilé · Ath, Belgique</p>
		</div>

		<nav class="nav-cols">
			<div>
				<span class="col-title">Restaurant</span>
				<a href="#carte">La carte</a>
				<a href="#menus">Menus</a>
				<a href="#galerie">Galerie</a>
			</div>
			<div>
				<span class="col-title">Maison</span>
				<a href="#philosophie">Philosophie</a>
				<a href="#evenements">Événements</a>
				<a href="#contact">Contact</a>
			</div>
			<div>
				<span class="col-title">Suivre</span>
				{#each socials.filter((s) => s.actif) as s}
					<a href={s.url} target="_blank" rel="noopener">{s.label}</a>
				{/each}
			</div>
		</nav>
	</div>

	<div class="strip">
		<span>© {year} {infos?.nom ?? 'Quai n°4'}</span>
		<span class="motto">— Le produit, le geste, le souvenir —</span>
		<span>Conçu avec soin</span>
	</div>
</footer>

<style lang="scss">
	@use './styles/mixins' as *;

	.foot {
		background: var(--q-ink);
		color: var(--q-cream);
		padding: 4rem 1.25rem 0;

		@include breakpoint('large') {
			padding: 6rem 2.5rem 0;
		}
	}

	.container {
		max-width: 1300px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		padding-bottom: 4rem;
		border-bottom: 1px solid rgba(184, 148, 90, 0.2);

		@include breakpoint('large') {
			grid-template-columns: 1fr 1.5fr;
			gap: 5rem;
		}
	}

	.brand-block {
		.word {
			font-family: var(--q-display);
			font-style: italic;
			font-size: 2.5rem;
			color: var(--q-cream);
		}

		.star {
			font-size: 1.2rem;
			color: var(--q-gold);
			margin-left: 0.4rem;
			vertical-align: top;
		}

		.tag {
			margin: 1rem 0 0;
			font-family: var(--q-serif);
			font-style: italic;
			font-size: 1rem;
			color: var(--q-cream);
			opacity: 0.65;
			max-width: 30ch;
		}
	}

	.nav-cols {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(3, 1fr);
		}

		div {
			display: flex;
			flex-direction: column;
			gap: 0.7rem;
		}

		.col-title {
			font-family: var(--q-mono);
			font-size: 0.65rem;
			letter-spacing: 0.22em;
			text-transform: uppercase;
			color: var(--q-gold);
			margin-bottom: 0.5rem;
		}

		a {
			font-family: var(--q-serif);
			font-size: 1rem;
			color: var(--q-cream);
			text-decoration: none;
			opacity: 0.8;
			transition: opacity 0.3s ease, color 0.3s ease;

			&:hover {
				opacity: 1;
				color: var(--q-gold-bright);
			}
		}
	}

	.strip {
		max-width: 1300px;
		margin: 0 auto;
		padding: 1.5rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		font-family: var(--q-mono);
		font-size: 0.65rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--q-cream);
		opacity: 0.5;
		text-align: center;

		.motto {
			color: var(--q-gold);
			opacity: 0.9;
		}

		@include breakpoint('medium') {
			flex-direction: row;
			justify-content: space-between;
			text-align: left;
		}
	}
</style>
