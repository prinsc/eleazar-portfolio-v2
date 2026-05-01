<script>
	let { children, size = 'md' } = $props();
</script>

<p class="kl-caption size-{size}">
	{@render children()}
</p>

<style lang="scss">
	.kl-caption {
		opacity: 0.65;
		margin: 0 0 1rem;

		&.size-sm {
			font-size: 0.7rem;
			opacity: 0.6;
			margin-bottom: 0.5rem;
		}

		&.size-md {
			font-size: 0.85rem;
		}

		:global(code) {
			font-family: ui-monospace, 'SFMono-Regular', monospace;
			padding: 0.1rem 0.35rem;
			border: 1px solid var(--color-gray-15);
			border-radius: 3px;
			font-size: 0.85em;
		}
	}
</style>
