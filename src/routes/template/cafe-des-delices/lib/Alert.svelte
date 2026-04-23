<script>
	// Bandeau alerte - données API (sections.alerte) uniquement
	let { alerte = null } = $props();

	const alerteData = $derived(() => {
		const raw = alerte?.data ?? alerte;
		if (raw?.actif && raw?.message) return raw;
		return null;
	});

	let dismissed = $state(false);
</script>

{#if alerteData() && !dismissed}
	<div class="alert" role="alert" aria-live="polite">
		<div class="alert__inner">
			<svg
				viewBox="0 0 24 24"
				width="16"
				height="16"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				aria-hidden="true"
				class="alert__icon"
			>
				<path
					d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
				/>
			</svg>
			<span class="alert__msg">{alerteData().message}</span>
		</div>
		<button class="alert__close" onclick={() => (dismissed = true)} aria-label="Fermer l'alerte">
			<svg
				viewBox="0 0 24 24"
				width="14"
				height="14"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="M18 6L6 18M6 6l12 12" />
			</svg>
		</button>
	</div>
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	.alert {
		background: var(--slate);
		color: var(--cream);
		padding: 0.75rem 1.25rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		position: relative;
		z-index: 60;
	}

	.alert__inner {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		flex: 1;
		min-width: 0;
	}

	.alert__icon {
		color: var(--ember-light);
		flex-shrink: 0;
	}

	.alert__msg {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		@include breakpoint('medium') {
			white-space: normal;
		}
	}

	.alert__close {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--cream);
		opacity: 0.5;
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 1;
		}
	}
</style>
