<script>
	import { menus } from './data.js';
	import MenuCard from './MenuCard.svelte';
</script>

<section class="menus" id="menus">
	<span class="menus__num">03 — Nos menus</span>

	<header class="menus__head">
		<h2 class="menus__title">
			Deux formules,<br />
			<em>une seule cuisine</em>
		</h2>
		<p class="menus__sub">
			Nos menus évoluent avec la saison et l'humeur du chef. Voici ceux du moment.
			La carte complète, avec les plats à la pièce et la sélection de bières, est à deux clics.
		</p>
	</header>

	<div class="menus__grid">
		{#each menus as m}
			<MenuCard menu={m} />
		{/each}
	</div>

	<footer class="menus__foot">
		<a class="menus__link" href="/template/cafe-des-delices/menu">
			<span>Voir la carte complète</span>
			<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
				<path d="M5 12h14M13 6l6 6-6 6" />
			</svg>
		</a>
	</footer>
</section>

<style>
	.menus {
		padding: 7rem 2rem;
		border-top: 1px solid var(--rule);
		position: relative;
	}
	.menus__num {
		position: absolute;
		top: 2rem;
		left: 2rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}

	.menus__head {
		max-width: 1400px;
		margin: 0 auto 4rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: end;
	}
	.menus__title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.2rem, 5.5vw, 5rem);
		line-height: 0.95;
		letter-spacing: -0.03em;
	}
	.menus__title em {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember);
	}
	.menus__sub {
		font-family: var(--f-display);
		font-size: 1rem;
		line-height: 1.6;
		color: var(--slate-soft);
		margin: 0;
		max-width: 32rem;
	}

	.menus__grid {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.menus__foot {
		max-width: 1400px;
		margin: 3.5rem auto 0;
		display: flex;
		justify-content: center;
	}
	.menus__link {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate);
		text-decoration: none;
		padding-bottom: 0.4em;
		border-bottom: 1px solid var(--slate);
		transition: gap 0.3s ease, color 0.3s ease, border-color 0.3s ease;
	}
	.menus__link:hover {
		gap: 1em;
		color: var(--ember);
		border-color: var(--ember);
	}

	@media (max-width: 900px) {
		.menus {
			padding: 5rem 1.25rem;
		}
		.menus__num {
			top: 1.25rem;
			left: 1.25rem;
		}
		.menus__head {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.menus__grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
