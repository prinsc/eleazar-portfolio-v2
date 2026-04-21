<script>
	let { events = [] } = $props();

	function formatDate(str) {
		if (!str) return '';
		return new Date(str).toLocaleDateString('fr-BE', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	// Trier par date croissante, ne garder que les futurs ou récents (30 jours)
	const upcoming = $derived(
		events
			.filter((e) => {
				if (!e.date) return true;
				const d = new Date(e.date);
				const cutoff = new Date();
				cutoff.setDate(cutoff.getDate() - 1);
				return d >= cutoff;
			})
			.sort((a, b) => new Date(a.date) - new Date(b.date))
			.slice(0, 3)
	);
</script>

{#if upcoming.length > 0}
	<section class="evts">
		<div class="evts__head">
			<span class="evts__eyebrow">Agenda</span>
			<h2 class="evts__title">
				Ce qui<br /><em>arrive</em>
			</h2>
			<a href="/template/cafe-des-delices/events" class="evts__more">
				Tous les événements
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
		</div>

		<ul class="evts__list">
			{#each upcoming as evt}
				<li class="evts__item">
					<time class="evts__date">{formatDate(evt.date)}</time>
					<div class="evts__body">
						<h3 class="evts__name">{evt.title ?? evt.titre}</h3>
						{#if evt.description}
							<p class="evts__desc">{evt.description}</p>
						{/if}
					</div>
					<span class="evts__arrow">→</span>
				</li>
			{/each}
		</ul>
	</section>
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	.evts {
		padding: 4rem 1.25rem;
		border-top: 1px solid var(--rule);

		@include breakpoint('medium') {
			padding: 5rem 2rem;
			display: grid;
			grid-template-columns: 1fr 2fr;
			gap: 3rem;
			align-items: start;
		}
	}

	.evts__head {
		margin-bottom: 2.5rem;

		@include breakpoint('medium') {
			margin-bottom: 0;
			position: sticky;
			top: 6rem;
		}
	}

	.evts__eyebrow {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--ember);
		margin-bottom: 0.75rem;
	}

	.evts__title {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.2rem, 5vw, 3.5rem);
		letter-spacing: -0.03em;
		line-height: 0.9;
		margin: 0 0 1.5rem;

		em {
			font-family: var(--f-italic);
			font-style: italic;
			color: var(--ember);
		}
	}

	.evts__more {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate);
		border-bottom: 1px solid var(--slate);
		padding-bottom: 0.3em;
		transition: gap 0.3s ease;

		&:hover {
			gap: 0.85em;
		}
	}

	.evts__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.evts__item {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 1.5rem;
		align-items: start;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--rule);
		cursor: default;
		transition: background 0.2s ease;

		&:first-child {
			border-top: 1px solid var(--rule);
		}

		&:hover .evts__arrow {
			transform: translateX(4px);
			opacity: 1;
		}
	}

	.evts__date {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ember);
		padding-top: 0.25rem;
		white-space: nowrap;
	}

	.evts__name {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 1.05rem;
		letter-spacing: -0.01em;
		margin: 0 0 0.35rem;
	}

	.evts__desc {
		font-family: var(--f-display);
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--slate-soft);
		margin: 0;
	}

	.evts__arrow {
		font-family: var(--f-mono);
		font-size: 14px;
		color: var(--ember);
		opacity: 0.4;
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
		padding-top: 0.2rem;
	}
</style>
