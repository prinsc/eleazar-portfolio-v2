<script>
	let { children } = $props();
</script>

<main class="page-content">
	{@render children()}
</main>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	.page-content {
		max-width: 800px;
		padding: 2rem;
		margin: 0 auto;

		@include breakpoint('small') {
			padding: 2.5rem;
		}

		@include breakpoint('medium') {
			padding: 3rem;
		}
	}
</style>
