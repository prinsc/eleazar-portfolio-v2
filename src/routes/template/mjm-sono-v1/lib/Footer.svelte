<script>
	import { Instagram, Facebook, Phone, Mail } from 'lucide-svelte';

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
	<div class="wrap">
		<div class="grid">
			<div class="col col--brand">
				<div class="brand">
					<span class="brand__dot"></span>
					<strong>MJM Sonorisation &amp; Yohan</strong>
				</div>
				<p>
					337, route de Flobecq<br />
					7804 Ostiches, Belgique
				</p>
				<p class="entreprise">N° entreprise · {infos?.numeroEntreprise ?? 'BE 0819.776.395'}</p>
			</div>

			<div class="col">
				<span class="label">Contact</span>
				<a href="tel:{(infos?.telephone ?? '+32475307333').replace(/\s/g, '')}">
					<Phone size={13} strokeWidth={2} />
					<span>{infos?.telephone ?? '0475 30 73 33'}</span>
				</a>
				<a href="mailto:{infos?.email ?? 'contact@mjmsono.be'}">
					<Mail size={13} strokeWidth={2} />
					<span>{infos?.email ?? 'contact@mjmsono.be'}</span>
				</a>
			</div>

			<div class="col">
				<span class="label">Navigation</span>
				<a href="#top">Accueil</a>
				<a href="#prestations">Prestations</a>
				<a href="#tonnelle">Tonnelle</a>
				<a href="#chambre">Chambre d'hôte</a>
				<a href="#contact">Contact</a>
			</div>

			<div class="col">
				<span class="label">Réseaux</span>
				<div class="socials">
					{#each activeSocials as s (s.id)}
						<a href={s.url} target="_blank" rel="noopener" aria-label={s.id}>
							{#if s.id === 'facebook'}
								<Facebook size={15} strokeWidth={2} />
							{:else if s.id === 'instagram'}
								<Instagram size={15} strokeWidth={2} />
							{/if}
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="meta">
			<span>© 2025 MJM Sonorisation &amp; Yohan — Tous droits réservés</span>
			<span>Site réalisé par <a href="https://kltk.be" target="_blank" rel="noopener">Kltk</a></span>
		</div>
	</div>
</footer>

<style lang="scss">
	@use './styles/mixins' as *;

	.footer {
		background: var(--bg);
		border-top: 1px solid var(--line);
		padding: 3rem 1.25rem 1.5rem;

		@include breakpoint('medium') {
			padding: 4rem 2rem 1.5rem;
		}
	}

	.wrap { max-width: 1280px; margin: 0 auto; }

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		padding-bottom: 2rem;
		border-bottom: 1px solid var(--line);

		@include breakpoint('medium') {
			grid-template-columns: 1.5fr 1fr 1fr 1fr;
		}
	}

	.col {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;

		a {
			display: inline-flex;
			align-items: center;
			gap: 0.45rem;
			font-family: var(--f-body);
			font-size: 0.88rem;
			color: var(--text-soft);
			text-decoration: none;
			transition: color 0.2s ease;

			:global(svg) { color: var(--text-faint); }

			&:hover {
				color: var(--red);
				:global(svg) { color: var(--red); }
			}
		}
	}

	.col--brand {
		grid-column: 1 / -1;

		@include breakpoint('medium') {
			grid-column: span 1;
		}

		p {
			margin: 0.35rem 0 0;
			font-family: var(--f-body);
			font-size: 0.88rem;
			line-height: 1.55;
			color: var(--text-soft);
		}

		.entreprise {
			font-size: 0.78rem;
			color: var(--text-faint);
			margin-top: 0.6rem;
		}
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;

		strong {
			font-family: var(--f-display);
			font-weight: 700;
			font-size: 1rem;
			color: var(--text);
			letter-spacing: -0.01em;
		}
	}

	.brand__dot {
		width: 8px;
		height: 8px;
		background: var(--red);
		border-radius: 50%;
	}

	.label {
		display: block;
		font-family: var(--f-body);
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text);
		margin-bottom: 0.4rem;
	}

	.socials {
		display: flex;
		gap: 0.5rem;

		a {
			width: 34px;
			height: 34px;
			border: 1px solid var(--line);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--text-soft);
			border-radius: 4px;
			transition: all 0.2s ease;
			padding: 0;

			&:hover {
				background: var(--red);
				color: #fff;
				border-color: var(--red);
			}
		}
	}

	.meta {
		padding-top: 1.25rem;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		font-family: var(--f-body);
		font-size: 0.78rem;
		color: var(--text-faint);

		a {
			color: var(--text);
			text-decoration: none;

			&:hover { color: var(--red); }
		}
	}
</style>
