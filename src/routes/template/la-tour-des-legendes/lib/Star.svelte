<!-- Marqueur signature ✦ — décline en différentes tailles. -->
<script>
	let { size = 14, color = 'currentColor' } = $props();
</script>
<span class="star" style="--s: {size}px; color: {color};" aria-hidden="true">✦</span>
<style lang="scss">
	.star {
		display: inline-block;
		font-size: var(--s);
		line-height: 1;
		transform: translateY(-0.05em);
	}
</style>
