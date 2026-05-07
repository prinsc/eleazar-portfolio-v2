<script>
	let { message = '' } = $props();
	let dismissed = $state(false);
</script>

{#if !dismissed}
	<div class="alerte" role="status">
		<div class="track">
			<span>✦ {message}</span>
			<span aria-hidden="true">✦ {message}</span>
			<span aria-hidden="true">✦ {message}</span>
			<span aria-hidden="true">✦ {message}</span>
		</div>
		<button onclick={() => (dismissed = true)} aria-label="Fermer alerte">×</button>
	</div>
{/if}

<style lang="scss">
	.alerte {
		position: relative;
		background: var(--ink);
		color: var(--gold);
		font-family: var(--f-mono);
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		overflow: hidden;
		display: flex;
		align-items: center;
		height: 38px;
	}
	.track {
		display: flex;
		gap: 3rem;
		white-space: nowrap;
		animation: marquee 40s linear infinite;
		padding-left: 100%;
	}
	button {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: 1px solid currentColor;
		color: var(--gold);
		width: 22px;
		height: 22px;
		border-radius: 50%;
		font-size: 14px;
		line-height: 1;
		display: grid;
		place-items: center;
	}
	@keyframes marquee {
		from { transform: translateX(0); }
		to { transform: translateX(-100%); }
	}
	@media (prefers-reduced-motion: reduce) {
		.track { animation: none; padding-left: 1rem; }
	}
</style>
