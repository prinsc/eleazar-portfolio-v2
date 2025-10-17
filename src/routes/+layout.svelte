<script>
	import '../lib/styles/main.scss';
	import NeuroShader from '@prinsc/svelte-neuro-shader';
	import { browser } from '$app/environment';
	import { settings } from '$lib/stores/settings.js';

	let { children } = $props();

	let color = $state({ r: 0, g: 0, b: 0 });
	let speed = $state(0.0002);
	let scale = $state(8.5);

	// Observe le store `settings`
	$effect(() => {
		const theme = $settings.theme;
		if (!theme) return;

		// IMPORTANT : recréer un nouvel objet
		color = theme === 'dark' ? { r: 1, g: 1, b: 1 } : { r: 0, g: 0, b: 0 };
	});
</script>

{#if browser}
	<div class="neuro">
		<NeuroShader
			baseColor={color}
			timeSpeed={speed}
			initialScale={scale}
			colorTransitionSpeed={0.05}
		/>
	</div>
{/if}

{@render children()}

<!-- <Cursor /> -->

<style lang="scss">
	.neuro {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		pointer-events: none;
		opacity: 0.3;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100dvw;
			height: 100%;
			background: var(--color-white);
			background: radial-gradient(
				circle,
				var(--color-white) 40%,
				rgba(255, 255, 255, 0) 85%,
				rgba(255, 255, 255, 0) 100%
			);
			pointer-events: none;
		}
	}
</style>
