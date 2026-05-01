<script>
	let { children, bordered = true } = $props();
</script>

<code class="kl-code" class:bordered>
	{@render children()}
</code>

<style lang="scss">
	.kl-code {
		font-family: ui-monospace, 'SFMono-Regular', monospace;
		font-size: 0.85em;
		padding: 0.1rem 0.35rem;
		border-radius: 3px;

		&.bordered {
			border: 1px solid var(--color-gray-15);
		}
	}
</style>
