<script>
	import { infos } from './data.js';
</script>

<footer class="footer">
	<div class="footer__huge">Délices</div>

	<div class="footer__cols">
		<div class="col">
			<span class="label">Adresse</span>
			<p>
				{infos.nom}<br />
				{infos.adresse}<br />
				{infos.ville}, {infos.pays}
			</p>
		</div>
		<div class="col">
			<span class="label">Contact</span>
			<p>
				<a href="mailto:{infos.email}">{infos.email}</a><br />
				<a href="tel:{infos.telephone}">{infos.telephone}</a>
			</p>
		</div>
		<div class="col">
			<span class="label">Navigation</span>
			<p>
				<a href="/template/cafe-des-delices">Maison</a><br />
				<a href="/template/cafe-des-delices/menu">Carte</a><br />
				<a href="/template/cafe-des-delices/reservation">Réserver</a>
			</p>
		</div>
		<div class="col col--right">
			<span class="label">Ouverture</span>
			<p>
				Lu - Di : 10h00 - 22h00<br />
				Jeu : 09h00 - 22h00
			</p>
		</div>
	</div>

	<div class="footer__meta">
		<span>© {infos.nom} - {infos.ville}, {infos.pays}</span>
		<span>Tous droits réservés</span>
	</div>
</footer>

<style>
	.footer {
		padding: 5rem 2rem 2rem;
		border-top: 1px solid var(--slate);
		overflow: hidden;
		background: var(--cream);
	}
	.footer__huge {
		font-family: var(--f-italic);
		font-style: italic;
		font-size: clamp(5rem, 22vw, 20rem);
		line-height: 0.78;
		letter-spacing: -0.04em;
		color: var(--ember);
		white-space: nowrap;
		margin-bottom: 3rem;
		user-select: none;
	}
	.footer__cols {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2.5rem;
		padding: 2rem 0;
		border-top: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
	}
	.col p {
		margin: 0;
		font-family: var(--f-display);
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--slate);
	}
	.col a {
		color: var(--slate);
		text-decoration: none;
		transition: color 0.3s ease;
	}
	.col a:hover {
		color: var(--ember);
	}
	.col--right {
		text-align: right;
	}
	.label {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin-bottom: 0.6rem;
	}

	.footer__meta {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		padding-top: 1.5rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}

	@media (max-width: 900px) {
		.footer {
			padding: 3rem 1.25rem 1.5rem;
		}
		.footer__cols {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
		.col--right {
			text-align: left;
		}
		.footer__meta {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
