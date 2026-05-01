<script>
	let { radius = 'small', label = '', size = '' } = $props();
</script>

<div class="kl-radius-card">
	<div class="shape border-radius-{radius}"></div>
	<div class="info">
		<code>.border-radius-{radius}</code>
		{#if size}<span>{size}</span>{/if}
		{#if label && !size}<span>{label}</span>{/if}
	</div>
</div>

<style lang="scss">
	.kl-radius-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		.shape {
			aspect-ratio: 1/1;
			background: linear-gradient(
				135deg,
				var(--primary-color-shamrock-300) 0%,
				var(--primary-color-shamrock-500) 100%
			);
		}

		.info {
			display: flex;
			flex-direction: column;
			gap: 0.1rem;

			code {
				font-family: ui-monospace, 'SFMono-Regular', monospace;
				font-size: 0.72rem;
			}

			span {
				font-size: 0.68rem;
				opacity: 0.5;
			}
		}
	}
</style>
