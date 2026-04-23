<script>
	import Skeleton from '../lib/Skeleton.svelte';

	let { data } = $props();

	const infos = $derived(data.infos);

	function normaliseEvent(e) {
		return {
			id: e.id ?? Math.random(),
			titre: e.title ?? e.titre ?? '',
			date: e.date ?? '',
			description: e.description ?? e.summary ?? '',
			image: e.image ?? null,
			actif: e.actif ?? true
		};
	}

	const events = $derived(
		data.events
			? data.events.map(normaliseEvent).sort((a, b) => new Date(a.date) - new Date(b.date))
			: null
	);

	function formatDate(str) {
		if (!str) return '';
		const d = new Date(str);
		return d.toLocaleDateString('fr-BE', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function formatMonth(str) {
		if (!str) return '';
		return new Date(str)
			.toLocaleDateString('fr-BE', { month: 'short' })
			.toUpperCase()
			.replace('.', '');
	}

	function formatDay(str) {
		if (!str) return '';
		return new Date(str).getDate();
	}

	const now = new Date();

	function isPast(dateStr) {
		if (!dateStr) return false;
		return new Date(dateStr) < now;
	}

	function daysUntil(dateStr) {
		if (!dateStr) return null;
		const diff = Math.ceil((new Date(dateStr) - now) / (1000 * 60 * 60 * 24));
		if (diff === 0) return "Aujourd'hui";
		if (diff === 1) return 'Demain';
		if (diff <= 7) return `Dans ${diff} jours`;
		return null;
	}
</script>

<svelte:head>
	<title>Événements - {infos?.nom ?? 'Le Café des Délices'}</title>
	<meta name="description" content="Les prochains événements au Café des Délices à Ath." />
</svelte:head>

{#if !events}
	<Skeleton variant="list" />
{:else}
	<header class="ev-hero">
		<div class="ev-hero__inner">
			<span class="eyebrow">Agenda</span>
			<h1 class="ev-hero__title">
				Ce qui<br /><em>arrive</em>
			</h1>
			{#if events.length === 0}
				<p class="ev-hero__sub">Aucun événement prévu pour le moment.</p>
			{:else}
				<p class="ev-hero__sub">{events.length} événement{events.length > 1 ? 's' : ''} à venir</p>
			{/if}
		</div>
		<a href="/template/cafe-des-delices" class="back">
			<svg
				viewBox="0 0 24 24"
				width="14"
				height="14"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
			>
				<path d="M19 12H5M11 6l-6 6 6 6" />
			</svg>
			Retour
		</a>
	</header>

	{#if events.length > 0}
		<div class="ev-list">
			{#each events as evt, i}
				<article class="ev-card" class:ev-card--past={isPast(evt.date)}>
					{#if evt.image}
						<!-- Image à remplacer par le client -->
						<figure class="ev-card__img">
							<img src={evt.image} alt={evt.titre} loading="lazy" />
							{#if !isPast(evt.date)}
								<div class="ev-card__img-overlay"></div>
							{/if}
						</figure>
					{:else}
						<figure class="ev-card__img ev-card__img--placeholder">
							<span class="ev-card__no-img">{formatDay(evt.date)}<br />{formatMonth(evt.date)}</span
							>
						</figure>
					{/if}

					<div class="ev-card__body">
						<div class="ev-card__meta">
							<div class="ev-date-badge">
								<span class="ev-date-badge__day">{formatDay(evt.date)}</span>
								<span class="ev-date-badge__month">{formatMonth(evt.date)}</span>
							</div>

							<div class="ev-card__tags">
								{#if isPast(evt.date)}
									<span class="ev-tag ev-tag--past">Passé</span>
								{:else}
									<span class="ev-tag ev-tag--upcoming">À venir</span>
									{#if daysUntil(evt.date)}
										<span class="ev-tag ev-tag--soon">{daysUntil(evt.date)}</span>
									{/if}
								{/if}
							</div>
						</div>

						<div class="ev-card__content">
							<h2 class="ev-name">{evt.titre}</h2>
							<time class="ev-fulldate">{formatDate(evt.date)}</time>
							{#if evt.description}
								<p class="ev-desc">{evt.description}</p>
							{/if}
						</div>

						<div class="ev-card__footer">
							{#if !isPast(evt.date)}
								<a href="/template/cafe-des-delices/reservation" class="ev-cta">
									Réserver une table
									<svg
										viewBox="0 0 24 24"
										width="12"
										height="12"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
									>
										<path d="M5 12h14M13 6l6 6-6 6" />
									</svg>
								</a>
							{/if}
						</div>
					</div>

					<span class="ev-card__index">{String(i + 1).padStart(2, '0')}</span>
				</article>
			{/each}
		</div>
	{:else}
		<div class="ev-empty">
			<span class="ev-empty__icon">○</span>
			<p>Aucun événement à venir.<br />Suivez-nous sur les réseaux pour ne rien rater.</p>
			<a href="/template/cafe-des-delices#social" class="ev-empty__link">
				Voir nos réseaux sociaux →
			</a>
		</div>
	{/if}
{/if}

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	/* ─── Hero ────────────────────────────────────────────── */
	.ev-hero {
		padding: 4rem 1.25rem 2.5rem;
		border-bottom: 1px solid var(--rule);
		display: flex;
		flex-direction: column;
		gap: 2rem;

		@include breakpoint('medium') {
			padding: 5rem 2rem 3rem;
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
		}
	}

	.eyebrow {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--ember);
		margin-bottom: 0.75rem;
	}

	.ev-hero__title {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		letter-spacing: -0.035em;
		line-height: 0.9;
		margin: 0 0 1rem;

		em {
			font-family: var(--f-italic);
			font-style: italic;
			color: var(--ember);
		}
	}

	.ev-hero__sub {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin: 0;
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate-soft);
		transition: color 0.2s ease;
		white-space: nowrap;
		align-self: flex-start;

		@include breakpoint('medium') {
			align-self: flex-end;
		}

		&:hover {
			color: var(--ember);
		}
	}

	/* ─── List ─────────────────────────────────────────────── */
	.ev-list {
		padding: 2rem 1.25rem 5rem;
		display: flex;
		flex-direction: column;
		gap: 0;

		@include breakpoint('medium') {
			padding: 2.5rem 2rem 6rem;
		}
	}

	/* ─── Card ─────────────────────────────────────────────── */
	.ev-card {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		border-bottom: 1px solid var(--rule);
		overflow: hidden;
		transition: background 0.25s ease;

		@include breakpoint('medium') {
			grid-template-columns: 220px 1fr;
		}

		@include breakpoint('large') {
			grid-template-columns: 280px 1fr;
		}

		&:first-child {
			border-top: 1px solid var(--rule);
		}

		&--past {
			opacity: 0.42;
		}

		&:not(.ev-card--past):hover {
			background: color-mix(in srgb, var(--ember) 3%, transparent);
		}

		&:not(.ev-card--past):hover .ev-card__img img {
			transform: scale(1.04);
		}

		&:not(.ev-card--past):hover .ev-cta {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* ─── Image ────────────────────────────────────────────── */
	.ev-card__img {
		margin: 0;
		overflow: hidden;
		height: 200px;
		position: relative;

		@include breakpoint('medium') {
			height: auto;
			min-height: 220px;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: grayscale(10%) saturate(0.9);
			transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
		}

		&--placeholder {
			background: var(--slate);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.ev-card__img-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			transparent 50%,
			color-mix(in srgb, var(--slate) 40%, transparent)
		);
		pointer-events: none;
	}

	.ev-card__no-img {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: 2rem;
		line-height: 1.1;
		text-align: center;
		color: var(--ember);
		letter-spacing: -0.03em;
		text-transform: uppercase;
	}

	/* ─── Body ─────────────────────────────────────────────── */
	.ev-card__body {
		padding: 1.5rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		@include breakpoint('medium') {
			padding: 2rem 2rem 2rem 2.5rem;
			gap: 1.25rem;
		}
	}

	/* ─── Meta (badge + tags) ──────────────────────────────── */
	.ev-card__meta {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.ev-date-badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: var(--slate);
		color: var(--cream);
		padding: 0.5rem 0.6rem;
		min-width: 3rem;
		flex-shrink: 0;

		&__day {
			font-family: var(--f-display);
			font-weight: 300;
			font-size: 1.5rem;
			line-height: 1;
			letter-spacing: -0.04em;
		}

		&__month {
			font-family: var(--f-mono);
			font-size: 8px;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--ember-light);
			margin-top: 0.15rem;
		}
	}

	.ev-card__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.ev-tag {
		display: inline-block;
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		padding: 0.2em 0.65em;
		border-radius: 999px;

		&--upcoming {
			background: var(--ember);
			color: var(--cream);
		}

		&--past {
			border: 1px solid var(--rule);
			color: var(--slate-soft);
		}

		&--soon {
			border: 1px solid var(--ember);
			color: var(--ember);
		}
	}

	/* ─── Content ──────────────────────────────────────────── */
	.ev-card__content {
		flex: 1;
	}

	.ev-name {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: clamp(1.15rem, 2.2vw, 1.5rem);
		letter-spacing: -0.02em;
		margin: 0 0 0.35rem;
		line-height: 1.15;
	}

	.ev-fulldate {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin-bottom: 0.85rem;
	}

	.ev-desc {
		font-family: var(--f-display);
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--slate-soft);
		margin: 0;
		max-width: 60ch;

		/* Clamp à 3 lignes */
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* ─── Footer / CTA ─────────────────────────────────────── */
	.ev-card__footer {
		min-height: 1.5rem;
	}

	.ev-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--ember);
		border-bottom: 1px solid var(--ember);
		padding-bottom: 0.15em;
		opacity: 0;
		transform: translateY(4px);
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;

		@media (hover: none) {
			opacity: 1;
			transform: none;
		}

		&:hover {
			opacity: 0.7;
		}
	}

	/* ─── Index watermark ──────────────────────────────────── */
	.ev-card__index {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		color: var(--rule);
		pointer-events: none;
		user-select: none;

		@include breakpoint('medium') {
			top: 1.5rem;
			right: 1.5rem;
		}
	}

	/* ─── Empty state ──────────────────────────────────────── */
	.ev-empty {
		padding: 6rem 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		&__icon {
			font-size: 3rem;
			color: var(--ember);
			opacity: 0.3;
		}

		p {
			font-family: var(--f-display);
			font-size: 1rem;
			line-height: 1.6;
			color: var(--slate-soft);
			margin: 0;
		}

		&__link {
			font-family: var(--f-mono);
			font-size: 10px;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--ember);
			text-decoration: none;
			border-bottom: 1px solid var(--ember);
			padding-bottom: 0.2em;
			transition: opacity 0.2s ease;

			&:hover {
				opacity: 0.7;
			}
		}
	}
</style>
