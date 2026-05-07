<!-- Logo officiel La Tour des Légendes. Variants : 'black' | 'white'. Hauteur via prop. -->
<script>
	import black from '../assets/black.svg';
	import white from '../assets/white.svg';

	let { variant = 'black', height = 40, alt = 'La Tour des Légendes' } = $props();
	const src = $derived(variant === 'white' ? white : black);
</script>

<img class="logo" {src} {alt} style="height: {height}px;" />

<style lang="scss">
	.logo {
		display: block;
		width: auto;
		max-width: 100%;
	}
</style>
