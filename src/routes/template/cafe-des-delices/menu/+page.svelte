<script>
	// Page Carte — menus détaillés du Café des Délices
	import MenuCard from '../lib/MenuCard.svelte';
	import { menus, infos } from '../lib/data.js';
</script>

<svelte:head>
	<title>Carte — Le Café des Délices</title>
	<meta name="description" content="Les menus du Café des Délices à Ath — grillades, bières belges." />
</svelte:head>

<section class="hero">
	<span class="eyebrow">
		<span class="rule"></span>
		Carte du moment · Susceptible d'évoluer
	</span>

	<h1 class="title">
		<span class="line">La</span>
		<span class="huge"><em>Carte</em></span>
	</h1>

	<p class="lede">
		Tout est préparé sur place, à la commande. Ce qui n'est plus frais n'est plus servi. Si vous avez
		une allergie, une exigence, une curiosité — dites-le-nous, nous trouverons.
	</p>
</section>

<section class="formules">
	<span class="num">01 — Formules</span>

	<div class="formules__grid">
		{#each menus as m}
			<MenuCard menu={m} />
		{/each}
	</div>
</section>

<section class="bieres">
	<span class="num">02 — À la pression, à la bouteille</span>

	<div class="bieres__grid">
		<h2 class="bieres__title">
			Une sélection<br />
			<em>de bières belges</em><br />
			d'exception.
		</h2>
		<div class="bieres__body">
			<p>
				Nous tirons en permanence quatre pressions qui tournent selon l'humeur de nos brasseurs — Orval,
				Chimay Bleue, Saison Dupont et une invitée surprise. En bouteille, nous conservons une cave d'une
				quarantaine de références, des grandes maisons trappistes aux micro-brasseries wallonnes.
			</p>
			<p>
				Demandez la carte des bières à votre serveur : elle est tenue à jour chaque semaine, et il y a
				souvent une pépite dont nous aimerions vous parler.
			</p>
			<p class="sig">— L'équipe du Café des Délices</p>
		</div>
	</div>
</section>

<section class="cta">
	<div class="cta__inner">
		<p class="cta__text">
			<em>Une faim ?</em> Une envie ? Nos cuisines sont ouvertes de 12h00 à 14h30 et de 18h00 à 22h00.
		</p>
		<a class="cta__link" href="/template/cafe-des-delices#visite">
			<span>Réserver une table</span>
			<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
				<path d="M5 12h14M13 6l6 6-6 6" />
			</svg>
		</a>
	</div>
</section>

<style>
	.hero {
		padding: 5rem 2rem 3rem;
		max-width: 1400px;
		margin: 0 auto;
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.9em;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin-bottom: 3rem;
	}
	.rule {
		display: inline-block;
		width: 28px;
		height: 1px;
		background: var(--slate);
	}
	.title {
		margin: 0 0 2rem;
		font-family: var(--f-display);
		font-weight: 300;
		line-height: 0.88;
		letter-spacing: -0.035em;
	}
	.title .line {
		display: block;
		font-size: clamp(2.5rem, 8vw, 6rem);
	}
	.title .huge {
		display: block;
		padding-left: clamp(2rem, 8vw, 8rem);
	}
	.title .huge em {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		font-size: clamp(5rem, 20vw, 18rem);
		line-height: 0.82;
		color: var(--ember);
		letter-spacing: -0.04em;
	}
	.lede {
		max-width: 42rem;
		font-family: var(--f-display);
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--slate-soft);
		margin: 2rem 0 0;
	}

	.formules {
		padding: 7rem 2rem;
		border-top: 1px solid var(--rule);
		position: relative;
		max-width: 1400px;
		margin: 0 auto;
	}
	.num {
		position: absolute;
		top: 2rem;
		left: 2rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}
	.formules__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-top: 2rem;
	}

	.bieres {
		padding: 7rem 2rem;
		border-top: 1px solid var(--rule);
		position: relative;
		max-width: 1400px;
		margin: 0 auto;
	}
	.bieres__grid {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: 5rem;
		align-items: start;
	}
	.bieres__title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2rem, 5vw, 4.5rem);
		line-height: 0.95;
		letter-spacing: -0.025em;
	}
	.bieres__title em {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--amber);
	}
	.bieres__body p {
		font-family: var(--f-display);
		font-size: 1.02rem;
		line-height: 1.7;
		color: var(--slate-soft);
		margin: 0 0 1.3rem;
	}
	.bieres__body .sig {
		font-family: var(--f-italic);
		font-style: italic;
		color: var(--slate);
	}

	.cta {
		padding: 7rem 2rem;
		border-top: 1px solid var(--slate);
		background: var(--slate);
		color: var(--cream);
	}
	.cta__inner {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 3rem;
		align-items: center;
	}
	.cta__text {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		line-height: 1.25;
		letter-spacing: -0.02em;
		color: var(--cream);
		max-width: 40rem;
	}
	.cta__text em {
		font-family: var(--f-italic);
		font-style: italic;
		color: var(--ember);
	}
	.cta__link {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		padding: 1em 1.8em;
		border: 1px solid var(--cream);
		border-radius: 999px;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--cream);
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.cta__link:hover {
		background: var(--ember);
		border-color: var(--ember);
	}

	@media (max-width: 900px) {
		.hero {
			padding: 3rem 1.25rem 2rem;
		}
		.formules,
		.bieres,
		.cta {
			padding: 5rem 1.25rem;
		}
		.num {
			top: 1.25rem;
			left: 1.25rem;
		}
		.formules__grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		.bieres__grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.cta__inner {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
