<script>
	import Logo from './Logo.svelte';
	let { infos = null, socials = null, horaires = null, cta = null } = $props();

	const dayShort = {
		Lundi: 'Lun',
		Mardi: 'Mar',
		Mercredi: 'Mer',
		Jeudi: 'Jeu',
		Vendredi: 'Ven',
		Samedi: 'Sam',
		Dimanche: 'Dim'
	};
</script>

<footer class="ft">
	<div class="ft-top">
		<div class="anchor">
			<Logo variant="white" height={180} />
			<span class="loc">— Ath, Belgique —</span>
		</div>
	</div>

	<div class="ft-grid">
		<section class="col">
			<p class="eyebrow">01 — Adresse</p>
			{#if infos?.adresseComplete}
				<p class="addr">{infos.adresseComplete}</p>
			{:else}
				<p class="addr">{infos?.ville ?? 'Ath'}, {infos?.pays ?? 'Belgique'}</p>
			{/if}
			{#if infos?.googleMapsUrl}
				<a class="lnk" href={infos.googleMapsUrl} target="_blank" rel="noopener">Itinéraire ↗</a>
			{/if}
		</section>

		<section class="col">
			<p class="eyebrow">02 — Contact</p>
			{#if infos?.telephone}<a class="addr" href={`tel:${infos.telephone}`}>{infos.telephone}</a
				>{/if}
			{#if infos?.email}<a class="addr" href={`mailto:${infos.email}`}>{infos.email}</a>{/if}
		</section>

		<section class="col">
			<p class="eyebrow">03 — Horaires</p>
			<ul class="hrs">
				{#each horaires ?? [] as h}
					<li>
						<span class="d">{dayShort[h.j] ?? h.j}</span>
						{#if h.ferme}
							<span class="closed">fermé</span>
						{:else}
							<span class="p">
								{#each h.periodes as p, i}{p.debut}–{p.fin}{i < h.periodes.length - 1
										? ' / '
										: ''}{/each}
							</span>
						{/if}
					</li>
				{/each}
			</ul>
		</section>

		<section class="col">
			<p class="eyebrow">04 — Suivre</p>
			<ul class="soc">
				{#each (socials ?? []).filter((s) => s.actif) as s}
					<li><a href={s.url} target="_blank" rel="noopener">{s.label} ↗</a></li>
				{/each}
			</ul>
			{#if cta?.reservation}
				<a
					class="cta-foot"
					href={cta.reservation.methode === 'tel' && infos?.telephone
						? `tel:${infos.telephone}`
						: '/template/la-tour-des-legendes/reservation'}
				>
					Réserver une table →
				</a>
			{/if}
		</section>
	</div>

	<div class="ft-base">
		<p>© {new Date().getFullYear()} La Tour des Légendes — Tous droits réservés</p>
		<p class="signature">
			<a href="/template/la-tour-des-legendes/mentions-legales">Mentions légales</a>
			<span class="dot">✦</span>
			<a href="https://kltk.be" target="_blank" rel="noopener">Site par KLTK Studio</a>
		</p>
	</div>
</footer>

<style lang="scss">
	@use './styles/mixins' as *;

	.ft {
		background: var(--ink);
		color: var(--base);
		padding: 5rem 1.25rem 1.5rem;
		position: relative;
		overflow: hidden;

		@include breakpoint('medium') {
			padding: 7rem 2.5rem 2rem;
		}
		@include breakpoint('large') {
			padding: 9rem 4rem 2rem;
		}

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background-image: radial-gradient(
				circle at 50% 0%,
				rgba(173, 107, 178, 0.18),
				transparent 60%
			);
			pointer-events: none;
		}
	}

	.ft-top {
		display: grid;
		place-items: center;
		text-align: center;
		margin-bottom: 5rem;
		position: relative;
	}
	.anchor {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		:global(img) { width: auto; max-width: 80vw; }
	}
	.loc {
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.ft-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		max-width: 1400px;
		margin: 0 auto 5rem;
		position: relative;
		@include breakpoint('medium') {
			grid-template-columns: repeat(2, 1fr);
			gap: 3rem 4rem;
		}
		@include breakpoint('large') {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.eyebrow {
		font-family: var(--f-mono);
		font-size: 0.7rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: 1rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid rgba(255, 212, 71, 0.3);
	}
	.col a {
		transition: color 0.2s;
	}
	.col a:hover {
		color: var(--gold);
	}
	.addr {
		font-family: var(--f-display);
		font-size: 1.15rem;
		line-height: 1.4;
		margin-bottom: 0.5rem;
		display: block;
	}
	.lnk {
		font-family: var(--f-mono);
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--accent-soft);
		display: inline-block;
		margin-top: 0.5rem;
	}
	.hrs li {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		font-family: var(--f-mono);
		font-size: 0.8rem;
		padding: 0.4rem 0;
		border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
		.d {
			color: var(--gold);
		}
		.closed {
			opacity: 0.5;
			font-style: italic;
			font-family: var(--f-display);
		}
	}
	.soc li {
		padding: 0.4rem 0;
	}
	.soc a {
		font-family: var(--f-display);
		font-size: 1.05rem;
	}
	.cta-foot {
		display: inline-block;
		margin-top: 1.5rem;
		padding: 0.9rem 1.3rem;
		border: 1px solid var(--gold);
		color: var(--gold);
		font-family: var(--f-mono);
		font-size: 0.74rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		transition:
			background 0.2s,
			color 0.2s;
		&:hover {
			background: var(--gold);
			color: var(--ink) !important;
		}
	}

	.ft-base {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
		font-family: var(--f-mono);
		font-size: 0.72rem;
		letter-spacing: 0.06em;
		opacity: 0.7;
		position: relative;

		@include breakpoint('medium') {
			flex-direction: row;
			justify-content: space-between;
		}

		.signature {
			display: flex;
			align-items: center;
			gap: 0.6rem;
			.dot {
				color: var(--accent);
			}
			a:hover {
				color: var(--gold);
				opacity: 1;
			}
		}
	}
</style>
