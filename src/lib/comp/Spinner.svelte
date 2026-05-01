<script>
	let { size = 32, thickness = 3, color = null } = $props();
</script>

<div
	class="kl-spinner"
	style:--s="{size}px"
	style:--t="{thickness}px"
	style:--c={color || 'var(--color-primary)'}
	role="status"
	aria-live="polite"
></div>

<style lang="scss">
	@keyframes kl-spin {
		to {
			transform: rotate(360deg);
		}
	}

	.kl-spinner {
		width: var(--s);
		height: var(--s);
		border: var(--t) solid var(--color-gray-15);
		border-top-color: var(--c);
		border-radius: 50%;
		animation: kl-spin 0.8s linear infinite;
	}
</style>
