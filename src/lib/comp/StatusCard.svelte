<script>
	let { children, title = null, variant = 'info' } = $props();
</script>

<div class="kl-status variant-{variant}" role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}>
	{#if title}<strong>{title}</strong>{/if}
	<span>{@render children?.()}</span>
</div>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	.kl-status {
		padding: 0.85rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		border-left: 3px solid;
		@include borderRadius('xsmall');

		strong {
			font-size: 0.8rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		span {
			font-size: 0.9rem;
			opacity: 0.85;
		}

		&.variant-success {
			border-color: var(--color-green-dark);
			strong { color: var(--color-green-dark); }
		}
		&.variant-info {
			border-color: var(--color-blue-dark);
			strong { color: var(--color-blue-dark); }
		}
		&.variant-warning {
			border-color: var(--color-orange-dark);
			strong { color: var(--color-orange-dark); }
		}
		&.variant-error {
			border-color: var(--color-red-dark);
			strong { color: var(--color-red-dark); }
		}
	}
</style>
