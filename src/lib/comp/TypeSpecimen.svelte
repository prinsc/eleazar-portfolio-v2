<script>
	let { label, token = null, sample } = $props();
</script>

<div class="kl-type-row">
	<div class="left">
		<span class="tag">{label}</span>
		{#if token}<code>{token}</code>{/if}
	</div>
	<div class="right typo-size-{label.toLowerCase()}">{sample}</div>
</div>

<style lang="scss">
	.kl-type-row {
		display: grid;
		grid-template-columns: 100px 1fr;
		align-items: baseline;
		gap: 1.25rem;
		padding: 0.6rem 0;
		border-top: 1px solid var(--color-gray-10);

		.left {
			display: flex;
			flex-direction: column;
			gap: 0.2rem;

			.tag {
				font-size: 0.7rem;
				text-transform: uppercase;
				opacity: 0.5;
				letter-spacing: 0.1em;
			}

			code {
				font-family: ui-monospace, 'SFMono-Regular', monospace;
				font-size: 0.7rem;
				opacity: 0.7;
			}
		}

		.right {
			font-weight: 500;
			line-height: 1.2;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>
