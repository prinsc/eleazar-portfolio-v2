<script>
	let { children = null, size = 8, color = null, label = null } = $props();
</script>

<span
	class="kl-pulse-wrap"
	style:--s="{size}px"
	style:--c={color || 'rgba(33, 222, 151, 0.8)'}
>
	<span class="kl-pulse" aria-hidden="true"></span>
	{#if children}{@render children()}{:else if label}<span>{label}</span>{/if}
</span>

<style lang="scss">
	.kl-pulse-wrap {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
	}

	.kl-pulse {
		display: inline-flex;
		min-width: var(--s);
		min-height: var(--s);
		width: var(--s);
		height: var(--s);
		border-radius: 50%;
		background-color: var(--c);
		animation: pulseEffect 1.5s infinite ease-in-out;
		flex-shrink: 0;
	}
</style>
