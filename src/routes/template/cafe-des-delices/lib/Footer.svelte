<script>
	import { infos, socials } from './data.js';

	const activeSocials = socials.filter(s => s.actif);

	const icons = {
		facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
		instagram: 'M16 3H8a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5zm-4 12.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z',
		tiktok: 'M9 12a4 4 0 104 4V4a5 5 0 005 5',
		tripadvisor: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14a2 2 0 110-4 2 2 0 010 4zm4 0a2 2 0 110-4 2 2 0 010 4z'
	};
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
		<div class="col">
			<span class="label">Ouverture</span>
			<p>
				Lu - Di : 10h00 - 22h00<br />
				Jeu : 09h00 - 22h00
			</p>
		</div>
		{#if activeSocials.length > 0}
		<div class="col col--right">
			<span class="label">Réseaux</span>
			<div class="social-links">
				{#each activeSocials as s}
					<a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} class="social-link">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
							<path d={icons[s.id] || icons.facebook} />
						</svg>
						<span>{s.label}</span>
					</a>
				{/each}
			</div>
		</div>
		{/if}
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
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
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

	.social-links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.social-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--slate);
		text-decoration: none;
		font-family: var(--f-display);
		font-size: 0.95rem;
		transition: color 0.3s ease;
	}
	.social-link:hover {
		color: var(--ember);
	}
	.social-link svg {
		flex-shrink: 0;
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
