<script>
	import PageHeader from '../lib/PageHeader.svelte';
	import Logo from '../lib/Logo.svelte';
</script>

<svelte:head>
	<title>Histoire — La Tour des Légendes</title>
	<meta
		name="description"
		content="L'histoire de la Tour des Légendes — folklore d'Ath, terroir, brasserie."
	/>
</svelte:head>

<PageHeader
	num="02"
	kicker="Histoire"
	title="Trois maisons,"
	italic="une seule tour"
	lead="Aux origines, l'envie de créer un lieu qui rassemble folklore et produits du terroir."
/>

<section class="story">
	<div class="kick">
		<p>
			<span class="dropcap">B</span>ienvenue à la Tour des Légendes. Aux origines de ce projet, une
			intuition simple&nbsp;: rassembler en un même lieu le folklore d'Ath et les produits de notre
			terroir. Ce qui n'était qu'une envie est devenu, au fil des rencontres, une synergie entre
			<em>trois institutions locales</em> prêtes à relever un défi de taille — celui d'inaugurer la Tour
			des Légendes.
		</p>
	</div>

	<div class="rule">
		<span class="line" aria-hidden="true"></span>
		<Logo variant="black" height={56} />
		<span class="line" aria-hidden="true"></span>
	</div>

	<div class="grid">
		<article class="block">
			<p class="num">01</p>
			<h2>Une brasserie<br /><em>moderne</em></h2>
			<p>
				D'un côté, une brasserie axée sur les produits locaux — ceux de la
				<strong>Brasserie des Légendes</strong> et de la <strong>Distillerie de Biercée</strong>.
				Une carte qui change avec les saisons, des bières d'ici, une cuisine qui respecte les
				producteurs.
			</p>
		</article>
		<article class="block flip">
			<p class="num">02</p>
			<h2>La Maison<br /><em>des Géants</em></h2>
			<p>
				De l'autre, la Maison des Géants — plus flamboyante que jamais. Un musée où chaque détail de
				l'histoire de notre folklore vibre dans chacune des pièces. Goliath, Mademoiselle Victoire,
				Tirant l'Ancien — la Ducasse d'Ath dans toute sa splendeur.
			</p>
		</article>
		<article class="block">
			<p class="num">03</p>
			<h2>Continuer<br /><em>l'histoire</em></h2>
			<p>
				Ce projet n'est pas une nostalgie figée. C'est une invitation à <em>continuer</em> — à transmettre,
				à célébrer, à se rassembler. À écrire ensemble la suite d'un récit qui dure depuis cinq siècles.
			</p>
		</article>
	</div>

	<figure class="quote-block">
		<blockquote>
			<p>
				« <em>La Tour ne raconte pas le passé&nbsp;:<br /> elle le sert,</em><br />
				assiette par assiette,<br /> légende par légende. »
			</p>
		</blockquote>
		<figcaption>— L'équipe de la Tour</figcaption>
	</figure>

	<div class="image-row">
		<div class="im im--1">
			<img
				src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&q=80"
				alt="Salle du restaurant"
				loading="lazy"
			/>
			<!-- PLACEHOLDER → Photo réelle de la salle -->
			<span class="cap">№ 01 — La salle</span>
		</div>
		<div class="im im--2">
			<img
				src="https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?w=800&auto=format&q=80"
				alt="Bières belges"
				loading="lazy"
			/>
			<!-- PLACEHOLDER → Bières des Légendes -->
			<span class="cap">№ 02 — Les bières</span>
		</div>
		<div class="im im--3">
			<img
				src="https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=800&auto=format&q=80"
				alt="Géants d'Ath"
				loading="lazy"
			/>
			<!-- PLACEHOLDER → Géants de la Ducasse -->
			<span class="cap">№ 03 — Les Géants</span>
		</div>
	</div>

	<div class="closing">
		<p class="big">
			Toutes les informations sur l'ouverture et les réservations vous seront très bientôt
			communiquées. <em>En attendant</em> — suivez-nous, et embarquez dans l'aventure.
		</p>
		<a class="back" href="/template/la-tour-des-legendes">← Retour à l'accueil</a>
	</div>
</section>

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	.story {
		padding: 4rem 1.25rem 8rem;
		max-width: 1100px;
		margin: 0 auto;
		@include breakpoint('medium') {
			padding: 5rem 2.5rem 10rem;
		}
		@include breakpoint('large') {
			padding: 6rem 4rem 12rem;
		}
	}
	.kick p {
		font-family: var(--f-display);
		font-size: clamp(1.2rem, 2.5vw, 1.6rem);
		line-height: 1.55;
		color: var(--ink-soft);
		max-width: 60ch;
		margin: 0 auto;
		em {
			color: var(--accent);
			font-style: italic;
		}
		strong {
			font-weight: 600;
		}
	}
	.dropcap {
		float: left;
		font-family: var(--f-display);
		font-style: italic;
		font-weight: 700;
		font-size: 5em;
		line-height: 0.8;
		padding: 0.05em 0.1em 0 0;
		color: var(--accent);
	}
	.rule {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin: 4rem 0;
		.line { flex: 1; height: 1px; background: var(--rule-strong); }
	}

	.grid {
		display: grid;
		gap: 4rem;
		margin-bottom: 6rem;
		@include breakpoint('large') {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 3rem;
		}
	}
	.block {
		.num {
			font-family: var(--f-mono);
			font-size: 0.78rem;
			letter-spacing: 0.2em;
			color: var(--accent);
			padding-bottom: 1rem;
			margin-bottom: 1.5rem;
			border-bottom: 1px solid var(--ink);
		}
		h2 {
			font-family: var(--f-display);
			font-size: clamp(1.8rem, 4vw, 2.6rem);
			line-height: 0.95;
			margin-bottom: 1.5rem;
			em {
				font-style: italic;
				color: var(--accent);
			}
		}
		p {
			font-family: var(--f-display);
			font-size: 1rem;
			line-height: 1.55;
			color: var(--ink-soft);
			em {
				color: var(--accent);
				font-style: italic;
			}
		}
	}

	.quote-block {
		text-align: center;
		padding: 6rem 0;
		margin: 4rem 0;
		border-top: 1px dashed var(--rule-strong);
		border-bottom: 1px dashed var(--rule-strong);
		blockquote p {
			font-family: var(--f-display);
			font-size: clamp(1.6rem, 4vw, 3rem);
			line-height: 1.25;
			color: var(--ink);
			em {
				color: var(--accent);
				font-style: italic;
			}
		}
		figcaption {
			margin-top: 2rem;
			font-family: var(--f-mono);
			font-size: 0.78rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--ink-mute);
		}
	}

	.image-row {
		display: grid;
		gap: 1.5rem;
		margin-bottom: 6rem;
		@include breakpoint('medium') {
			grid-template-columns: 1.2fr 0.8fr 1fr;
		}
		.im {
			position: relative;
			overflow: hidden;
			aspect-ratio: 3 / 4;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			&.im--2 {
				@include breakpoint('medium') {
					transform: translateY(2rem);
				}
			}
			&.im--3 {
				@include breakpoint('medium') {
					transform: translateY(-1rem);
				}
			}
			.cap {
				position: absolute;
				bottom: 0.75rem;
				left: 0.75rem;
				padding: 0.3rem 0.6rem;
				background: var(--gold);
				color: var(--ink);
				font-family: var(--f-mono);
				font-size: 0.7rem;
				letter-spacing: 0.15em;
				text-transform: uppercase;
			}
		}
	}

	.closing {
		text-align: center;
		.big {
			font-family: var(--f-display);
			font-style: italic;
			font-size: clamp(1.4rem, 3vw, 2.2rem);
			line-height: 1.4;
			max-width: 50ch;
			margin: 0 auto 3rem;
			em {
				color: var(--accent);
			}
		}
		.back {
			display: inline-block;
			padding: 1rem 1.5rem;
			border: 1px solid var(--ink);
			font-family: var(--f-mono);
			font-size: 0.78rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			transition:
				background 0.2s,
				color 0.2s;
			&:hover {
				background: var(--ink);
				color: var(--gold);
			}
		}
	}
</style>
