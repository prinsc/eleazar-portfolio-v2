<script>
	import Spinner from './Spinner.svelte';
	let { label = 'Chargement en cours', minHeight = '50vh', size = 32 } = $props();
</script>

<div class="kl-loading" style:min-height={minHeight} aria-label={label}>
	<Spinner {size} />
</div>

<style lang="scss">
	.kl-loading {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
</style>
