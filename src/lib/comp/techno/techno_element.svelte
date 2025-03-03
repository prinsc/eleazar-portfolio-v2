<script>
	import tippy from 'svelte-tippy';
	import formatText from '$lib/utils/formatText';
	import 'tippy.js/animations/perspective-subtle.css';

	export let techno = null;
</script>

<span
	class="techno"
	use:tippy={{
		content: `${formatText(techno)}`,
		placement: 'bottom',
		theme: 'kltk',
		arrow: false,
		animation: 'perspective-subtle'
	}}
>
	<span class="icon">
		<img src="/assets/icons/{techno}.svg" alt={techno} width="100%" height="100%" />
	</span>
</span>

<style lang="scss">
	:global(.tippy-box[data-theme='kltk']) {
		background-color: var(--color-white);
		color: var(--color-black) !important;
		box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
	}
	.techno {
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		filter: grayscale(1) opacity(0.75) invert(var(--invert));
		transition:
			filter 0.1s,
			transform 0.1s;
		user-select: none;
		.icon {
			width: 15px;
			aspect-ratio: 1/1;
			display: inline-flex;
			img {
				height: 100%;
			}
		}
		&:hover {
			filter: grayscale(0) opacity(1);
			transform: translateY(-1px);
		}
	}
</style>
