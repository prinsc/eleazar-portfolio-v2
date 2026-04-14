<script>
	let { items = [], note = '' } = $props();
</script>

<div class="price-table">
	{#each items as item}
		<div class="price-row">
			<div class="price-info">
				<span class="price-name">{item.name}</span>
				{#if item.detail}
					<span class="price-detail">{item.detail}</span>
				{/if}
				{#if item.duration}
					<span class="price-duration">{item.duration}</span>
				{/if}
			</div>
			<span class="price-dots"></span>
			<span class="price-value">{item.price}</span>
		</div>
	{/each}
	{#if note}
		<p class="price-note">{note}</p>
	{/if}
</div>

<style lang="scss">
	.price-table {
		width: 100%;
	}

	.price-row {
		display: flex;
		align-items: baseline;
		padding: 1rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
		transition: background 0.2s;

		&:hover {
			background: rgba(139, 125, 107, 0.04);
		}

		&:last-of-type {
			border-bottom: none;
		}
	}

	.price-info {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		max-width: 65%;
	}

	.price-name {
		font-size: 1.05rem;
		color: #1a1a1a;
		font-weight: 500;
	}

	.price-detail {
		font-size: 0.8rem;
		color: #999;
		font-style: italic;
		margin-top: 0.2rem;
		line-height: 1.5;
	}

	.price-duration {
		font-size: 0.75rem;
		color: #8b7d6b;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin-top: 0.2rem;
	}

	.price-dots {
		flex: 1;
		border-bottom: 2px dotted #d4ccc0;
		margin: 0 1rem;
		min-width: 2rem;
		align-self: center;
		margin-bottom: 2px;
	}

	.price-value {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.35rem;
		font-weight: 600;
		color: #1a1a1a;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.price-note {
		font-size: 0.8rem;
		color: #999;
		font-style: italic;
		margin-top: 1.25rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(0, 0, 0, 0.06);
		line-height: 1.6;
	}
</style>
