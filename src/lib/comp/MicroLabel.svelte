<script>
	let { children, as = 'span' } = $props();
</script>

<svelte:element this={as} class="kl-micro-label">
	{@render children()}
</svelte:element>

<style lang="scss">
	.kl-micro-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		opacity: 0.5;
		font-weight: 500;
		display: inline-block;
	}
</style>
