<script>
	import { ArrowLeft } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';

	let {
		href = null,
		label = null,
		onclick = null
	} = $props();

	function handleClick(e) {
		if (onclick) {
			onclick(e);
			return;
		}
		if (href) {
			e.preventDefault();
			goto(href);
		}
	}

	const text = $derived(label || $content.site.back?.[$settings.lang] || 'Back');
</script>

<button
	class="back-button no-effect"
	onclick={handleClick}
	aria-label={text}
>
	<span class="icon" aria-hidden="true">
		<ArrowLeft />
	</span>
	<span>{text}</span>
</button>

<style lang="scss">
	.back-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 2rem;
		cursor: pointer;
		font-weight: 500;
		min-height: 44px;
		padding: 0.5rem 1rem;
		transition: opacity 0.2s, transform 0.2s;

		&:hover {
			opacity: 0.7;
			.icon {
				transform: translateX(-3px);
			}
		}

		.icon {
			width: 16px;
			display: inline-flex;
			transition: transform 0.2s;
		}
	}
</style>
