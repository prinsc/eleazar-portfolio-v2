<script>
	import { Instagram, Facebook } from 'lucide-svelte';

	let { infos = null, socials = null } = $props();

	const fallbackSocials = [
		{ id: 'facebook', url: '#' },
		{ id: 'instagram', url: '#' }
	];
	const activeSocials = $derived(
		(socials ?? []).filter((s) => s.actif).length > 0
			? (socials ?? []).filter((s) => s.actif)
			: fallbackSocials
	);
</script>

<footer class="footer">
	<div class="footer__huge" aria-hidden="true">MJM</div>

	<div class="footer__cols">
		<div class="col">
			<span class="label">Adresse</span>
			<p>
				MJM Sonorisation &amp; Yohan<br />
				337, route de Flobecq<br />
				7804 Ostiches, Belgique
			</p>
		</div>
		<div class="col">
			<span class="label">Contact</span>
			<p>
				<a href="mailto:{infos?.email ?? 'contact@mjmsono.be'}">{infos?.email ?? 'contact@mjmsono.be'}</a><br />
				<a href="tel:{(infos?.telephone ?? '+32475307333').replace(/\s/g, '')}">{infos?.telephone ?? '+32 475 30 73 33'}</a>
			</p>
		</div>
		<div class="col">
			<span class="label">Navigation</span>
			<p>
				<a href="#top">Accueil</a><br />
				<a href="#prestations">Prestations</a><br />
				<a href="#telechargements">Téléchargements</a><br />
				<a href="#tonnelle">Tonnelle</a><br />
				<a href="#chambre">Chambre d'hôte</a><br />
				<a href="#contact">Contact</a>
			</p>
		</div>
		<div class="col">
			<span class="label">Légal</span>
			<p>
				N° entreprise<br />
				{infos?.numeroEntreprise ?? 'BE 0819.776.395'}
			</p>
			<div class="socials">
				{#each activeSocials as s (s.id)}
					<a href={s.url} target="_blank" rel="noopener" aria-label={s.id}>
						{#if s.id === 'facebook'}
							<Facebook size={16} strokeWidth={1.5} />
						{:else if s.id === 'instagram'}
							<Instagram size={16} strokeWidth={1.5} />
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</div>

	<div class="footer__meta">
		<span>© 2025 MJM Sonorisation &amp; Yohan — Tous droits réservés</span>
		<span>
			Site réalisé par
			<a href="https://kltk.be" target="_blank" rel="noopener">Kltk</a>
		</span>
	</div>
</footer>

<style lang="scss">
	@use './styles/mixins' as *;

	.footer {
		padding: 5rem 1.5rem 2rem;
		background: var(--void);
		overflow: hidden;
		border-top: 1px solid var(--rule);

		@include breakpoint('medium') {
			padding: 6rem 2rem 2rem;
		}
	}

	.footer__huge {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(6rem, 30vw, 26rem);
		line-height: 0.78;
		letter-spacing: -0.06em;
		color: var(--bone);
		opacity: 0.06;
		white-space: nowrap;
		margin-bottom: 3rem;
		user-select: none;
	}

	.footer__cols {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 2.5rem;
		padding: 2.5rem 0;
		border-top: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
	}

	.col p {
		margin: 0;
		font-family: var(--f-body);
		font-size: 0.9rem;
		line-height: 1.7;
		color: var(--bone);

		a {
			color: var(--bone);
			text-decoration: none;
			transition: color 0.3s ease;

			&:hover { color: var(--gold); }
		}
	}

	.label {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--bone-soft);
		margin-bottom: 0.6rem;
	}

	.socials {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;

		a {
			width: 36px;
			height: 36px;
			border: 1px solid var(--rule-strong);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--bone);
			text-decoration: none;
			transition: all 0.3s ease;

			&:hover {
				background: var(--gold);
				color: var(--void);
				border-color: var(--gold);
			}
		}
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
		color: var(--bone-soft);
		flex-wrap: wrap;

		a {
			color: var(--gold);
			text-decoration: none;
			border-bottom: 1px solid transparent;

			&:hover { border-bottom-color: var(--gold); }
		}
	}
</style>
