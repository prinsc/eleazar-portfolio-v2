<script>
	let { infos, horaires = [], cta } = $props();
</script>

<section class="infos" id="contact">
	<div class="container">
		<div class="left">
			<span class="eyebrow">— Nous trouver</span>
			<h2>Quai Saint-Jacques 4<br /><em>7800 Ath</em></h2>

			<dl class="meta">
				<div>
					<dt>Téléphone</dt>
					<dd><a href={`tel:${infos?.telephone?.replace(/\s/g, '')}`}>{infos?.telephone}</a></dd>
				</div>
				<div>
					<dt>Email</dt>
					<dd><a href={`mailto:${infos?.email}`}>{infos?.email}</a></dd>
				</div>
				<div>
					<dt>Site</dt>
					<dd><a href={infos?.siteWeb} target="_blank" rel="noopener">quai-n4.be</a></dd>
				</div>
			</dl>

			{#if cta?.reservation?.url}
				<a class="cta" href={cta.reservation.url} target="_blank" rel="noopener">
					{cta.reservation.label ?? 'Réserver une table'}
					<span>→</span>
				</a>
			{/if}
		</div>

		<div class="right">
			<div class="hours-head">
				<span class="badge">Horaires d'ouverture</span>
			</div>
			<ul class="hours">
				{#each horaires as h}
					<li class:closed={h.ferme}>
						<span class="day">{h.j}</span>
						{#if h.ferme}
							<span class="state">Fermé</span>
						{:else}
							<span class="periods">
								{#each h.periodes as p, i}
									{p.debut} — {p.fin}{#if i < h.periodes.length - 1}<span class="dot"> · </span>{/if}
								{/each}
							</span>
						{/if}
					</li>
				{/each}
			</ul>

			<div class="features">
				{#if infos?.terrasse}<span class="feat">Terrasse</span>{/if}
				{#if infos?.wifi}<span class="feat">Wi-Fi</span>{/if}
				{#if infos?.accesHandicape}<span class="feat">Accès PMR</span>{/if}
				<span class="feat">Voiturier sur demande</span>
				<span class="feat">Cave à vins</span>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.infos {
		padding: 5rem 1.25rem;
		background: var(--q-paper);
		border-top: 1px solid var(--q-line);

		@include breakpoint('large') {
			padding: 9rem 2.5rem;
		}
	}

	.container {
		max-width: 1300px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 4rem;

		@include breakpoint('large') {
			grid-template-columns: 1.1fr 1fr;
			gap: 6rem;
		}
	}

	.eyebrow {
		display: block;
		font-family: var(--q-mono);
		font-size: 0.7rem;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--q-gold-deep);
		margin-bottom: 1.5rem;
	}

	.left h2 {
		margin: 0 0 3rem;
		font-family: var(--q-display);
		font-weight: 300;
		font-size: clamp(2.25rem, 5.5vw, 4rem);
		line-height: 1.05;
		letter-spacing: -0.02em;
		color: var(--q-ink);

		em {
			font-style: italic;
			color: var(--q-emerald-deep);
		}
	}

	.meta {
		margin: 0 0 3rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		div {
			display: grid;
			grid-template-columns: 110px 1fr;
			gap: 1rem;
			align-items: baseline;
			padding-bottom: 1.25rem;
			border-bottom: 1px solid var(--q-line-soft);
		}

		dt {
			font-family: var(--q-mono);
			font-size: 0.65rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--q-gold-deep);
		}

		dd {
			margin: 0;
			font-family: var(--q-serif);
			font-size: 1.1rem;
			color: var(--q-ink);

			a {
				color: inherit;
				text-decoration: none;
				border-bottom: 1px solid transparent;
				transition: border-color 0.3s ease;

				&:hover {
					border-color: var(--q-gold);
				}
			}
		}
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		padding: 1.1rem 1.8rem;
		background: var(--q-emerald-deep);
		color: var(--q-gold-bright);
		border: 1px solid var(--q-emerald-deep);
		font-family: var(--q-sans);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		text-decoration: none;
		transition: background 0.3s ease, gap 0.3s ease;

		&:hover {
			background: var(--q-ink);
			border-color: var(--q-ink);
			gap: 1.5rem;
		}
	}

	.right {
		background: var(--q-ink);
		color: var(--q-cream);
		padding: 2.5rem 2rem;
		position: relative;

		&::before,
		&::after {
			content: '';
			position: absolute;
			width: 22px;
			height: 22px;
			border: 1px solid var(--q-gold);
			pointer-events: none;
		}

		&::before {
			top: 12px;
			left: 12px;
			border-right: none;
			border-bottom: none;
		}

		&::after {
			bottom: 12px;
			right: 12px;
			border-left: none;
			border-top: none;
		}

		@include breakpoint('large') {
			padding: 3.5rem 3rem;
		}
	}

	.hours-head {
		margin-bottom: 2rem;
		text-align: center;
	}

	.badge {
		display: inline-block;
		padding: 0.5rem 1rem;
		font-family: var(--q-mono);
		font-size: 0.65rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--q-gold-bright);
		border: 1px solid rgba(184, 148, 90, 0.4);
	}

	.hours {
		list-style: none;
		padding: 0;
		margin: 0 0 2.5rem;

		li {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			padding: 0.85rem 0;
			border-bottom: 1px solid rgba(236, 228, 210, 0.1);
			font-family: var(--q-serif);

			&:last-child {
				border-bottom: none;
			}

			&.closed {
				opacity: 0.45;
			}
		}

		.day {
			font-size: 1.05rem;
			color: var(--q-cream);
		}

		.periods {
			font-family: var(--q-mono);
			font-size: 0.8rem;
			letter-spacing: 0.06em;
			color: var(--q-gold-bright);
		}

		.dot {
			color: var(--q-gold);
			opacity: 0.5;
		}

		.state {
			font-family: var(--q-mono);
			font-size: 0.7rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--q-cream);
			opacity: 0.5;
		}
	}

	.features {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(236, 228, 210, 0.1);

		.feat {
			padding: 0.4rem 0.8rem;
			font-family: var(--q-mono);
			font-size: 0.65rem;
			letter-spacing: 0.16em;
			text-transform: uppercase;
			color: var(--q-cream);
			background: rgba(184, 148, 90, 0.1);
			border: 1px solid rgba(184, 148, 90, 0.2);
		}
	}
</style>
