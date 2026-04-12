<script>
	// Layout partagé entre TOUS les templates.
	// Affiche un gate copyright sur les sous-routes (pas sur l'index /template/).
	import { page } from '$app/stores';
	import CopyrightGate from './CopyrightGate.svelte';

	let { children } = $props();

	// Gate only on sub-template routes, not on /template/ index
	const isSubRoute = $derived($page.url.pathname !== '/template' && $page.url.pathname !== '/template/');
</script>

{#if isSubRoute}
	<CopyrightGate>
		{@render children()}
	</CopyrightGate>
{:else}
	{@render children()}
{/if}
