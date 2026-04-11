<script>
	// Root layout volontairement minimal.
	// Tout ce qui est global au site (styles, Nav, NeuroShader, Footer...)
	// vit désormais dans src/routes/[lang]/+layout.svelte, de sorte que
	// les routes /template/* n'en héritent PAS et restent 100 % autonomes.
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	let { children } = $props();

	// Track QR code visitors with Umami
	$effect(() => {
		if (browser && $page.url.searchParams.get('from') === 'qr') {
			if (typeof umami !== 'undefined') {
				umami.track('qr-code-visit');
			}
		}
	});
</script>

{@render children()}
