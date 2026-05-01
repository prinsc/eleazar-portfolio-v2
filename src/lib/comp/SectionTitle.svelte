<script>
	let {
		children,
		level = 2,
		count = null,
		icon = null,
		size = 'default'
	} = $props();

	const Tag = $derived(`h${level}`);
</script>

<svelte:element this={Tag} class="kl-section-title size-{size}">
	{#if icon}
		<span class="icon">{@render icon()}</span>
	{/if}
	<span class="text">{@render children()}</span>
	{#if count !== null}
		<span class="count">({count})</span>
	{/if}
</svelte:element>

<style lang="scss">
	.kl-section-title {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;

		.icon {
			display: inline-flex;
			align-items: center;
			width: 1em;
			height: 1em;
			:global(svg) {
				width: 100%;
				height: 100%;
			}
		}

		.count {
			opacity: 0.5;
			font-weight: 400;
		}

		&.size-display {
			font-size: 2rem;
			font-weight: 700;
			line-height: 1.2;
			text-transform: none;
		}

		&.size-large {
			font-size: 1.5rem;
			font-weight: 600;
			text-transform: none;
		}
	}
</style>
