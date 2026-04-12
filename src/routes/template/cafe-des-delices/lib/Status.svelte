<script>
	// Bloc Statut : affiche l'état d'ouverture en direct + la météo d'Ath
	// avec une recommandation éditoriale ("Profitez du soleil", etc.)
	import { status, weather } from './status.js';
</script>

<div class="status">
	<div class="row row--open">
		<span class="dot" class:is-open={$status.open} aria-hidden="true"></span>
		<span class="label">{$status.label}</span>
		<span class="sep">·</span>
		<span class="detail">{$status.detail}</span>
	</div>

	{#if $weather && !$weather.error}
		<div class="row row--weather">
			<span class="icon" aria-hidden="true">
				{#if $weather.flavor === 'sunny' && $weather.isDay}
					<!-- soleil -->
					<svg
						viewBox="0 0 24 24"
						width="16"
						height="16"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<circle cx="12" cy="12" r="4" />
						<path
							d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
							stroke-linecap="round"
						/>
					</svg>
				{:else if $weather.flavor === 'sunny' && !$weather.isDay}
					<!-- lune -->
					<svg
						viewBox="0 0 24 24"
						width="16"
						height="16"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
					</svg>
				{:else if $weather.flavor === 'cloudy'}
					<!-- nuage -->
					<svg
						viewBox="0 0 24 24"
						width="16"
						height="16"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path d="M18 10a6 6 0 0 0-11.5-1.5A4 4 0 1 0 6 17h12a4 4 0 0 0 0-7z" />
					</svg>
				{:else if $weather.flavor === 'rain'}
					<!-- pluie -->
					<svg
						viewBox="0 0 24 24"
						width="16"
						height="16"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path d="M18 10a6 6 0 0 0-11.5-1.5A4 4 0 1 0 6 15h12a4 4 0 0 0 0-5z" />
						<path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3" stroke-linecap="round" />
					</svg>
				{:else if $weather.flavor === 'snow'}
					<!-- neige -->
					<svg
						viewBox="0 0 24 24"
						width="16"
						height="16"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path d="M12 2v20M4 6l16 12M4 18l16-12" stroke-linecap="round" />
					</svg>
				{/if}
			</span>
			<span class="temp">{$weather.temp}°</span>
			<span class="sep">·</span>
			<span class="wlabel">{$weather.label}, Ath</span>
		</div>

		{#if $status.open}
			<p class="reco"><em>{$weather.reco}</em></p>
		{/if}
	{:else if $weather === null}
		<div class="row row--weather is-loading">
			<span class="temp">-°</span>
			<span class="sep">·</span>
			<span class="wlabel">Météo à l'instant</span>
		</div>
	{/if}
</div>

<style lang="scss">
	@use './styles/mixins' as *;

	.status {
		padding: 1.5rem 0;
		border-top: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--slate);
	}
	.row--weather {
		margin-top: 0.75rem;
		color: var(--slate-soft);
	}
	.row--weather.is-loading {
		opacity: 0.4;
	}
	.sep {
		color: var(--slate-soft);
		opacity: 0.6;
	}

	.dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--slate-soft);
		position: relative;
	}
	.dot.is-open {
		background: var(--ember);
	}
	.dot.is-open::after {
		content: '';
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		border: 1px solid var(--ember);
		opacity: 0.5;
		animation: pulse 2s ease-out infinite;
	}
	@keyframes pulse {
		0% {
			transform: scale(0.6);
			opacity: 0.6;
		}
		100% {
			transform: scale(1.4);
			opacity: 0;
		}
	}

	.label {
		font-weight: 400;
		color: var(--slate);
	}
	.detail {
		color: var(--slate-soft);
	}

	.icon {
		display: inline-flex;
		color: var(--ember);
	}
	.temp {
		font-weight: 400;
		color: var(--slate);
	}
	.wlabel {
		letter-spacing: 0.14em;
	}

	.reco {
		margin: 0.75rem 0 0;
		font-family: var(--f-italic);
		font-style: italic;
		font-size: 1.15rem;
		line-height: 1.35;
		color: var(--slate);
		letter-spacing: -0.005em;

		@include breakpoint('medium') {
			font-size: 1.25rem;
		}
	}
	.reco em {
		color: var(--ember);
	}
</style>
