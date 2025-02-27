<script>
	let { children } = $props();
	import '../lib/styles/main.scss'; // Import direct du SCSS
	import Cursor from '../lib/cursor.svelte';
</script>

{@render children()}

<!-- <Cursor /> -->

<style lang="scss">
</style>
