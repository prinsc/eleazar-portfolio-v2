<script>
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { fly } from 'svelte/transition';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';

	let { children, dragFree = false, speed = undefined } = $props();

	let emblaApi;
	let canScrollPrev = $state(false);
	let canScrollNext = $state(true);

	function onInit(event) {
		emblaApi = event.detail;
		updateButtons();
		emblaApi.on('select', updateButtons);
		emblaApi.on('reInit', updateButtons);
	}

	function updateButtons() {
		if (!emblaApi) return;
		canScrollPrev = emblaApi.canScrollPrev();
		canScrollNext = emblaApi.canScrollNext();
	}

	function scrollPrev() {
		if (emblaApi) emblaApi.scrollPrev();
	}

	function scrollNext() {
		if (emblaApi) emblaApi.scrollNext();
	}

	const emblaOptions = {
		align: 'start',
		containScroll: 'trimSnaps',
		dragFree,
		...(speed !== undefined && { speed })
	};
</script>

<div class="slider">
	<div class="embla" use:emblaCarouselSvelte={{ options: emblaOptions }} onemblaInit={onInit}>
		<div class="embla__container">
			{@render children()}
		</div>
	</div>

	{#if canScrollPrev}
		<button
			class="back grain"
			aria-label={$content.site.arialabel.previous[$settings.lang]}
			onclick={scrollPrev}
			transition:fly={{ x: 25 }}
		>
			<span class="icon">
				<ChevronLeft />
			</span>
		</button>
	{/if}

	{#if canScrollNext}
		<button
			class="next grain"
			aria-label={$content.site.arialabel.next[$settings.lang]}
			onclick={scrollNext}
			transition:fly={{ x: -25 }}
		>
			<span class="icon">
				<ChevronRight />
			</span>
		</button>
	{/if}
</div>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;
	.slider {
		position: relative;
		> button {
			position: absolute;
			top: -35px;
			border-radius: 50%;
			overflow: hidden;
			border: solid 1px rgba(0, 0, 0, 0.1);
			cursor: pointer;
			transition: transform 0.1s;
			@include breakpoint('large') {
				position: absolute;
				top: calc(50% - 17.5px);
				border-radius: 50%;
				overflow: hidden;
				border: solid 1px rgba(0, 0, 0, 0.1);
				cursor: pointer;
			}
			&:active {
				transform: scale(0.9);
			}
			.icon {
				display: inline-flex;
				width: 35px;
				height: 35px;
				align-items: center;
				justify-content: center;
			}
			&.back {
				right: 50px;
				@include breakpoint('large') {
					right: initial;
					left: -50px;
				}
			}
			&.next {
				right: 0;
				@include breakpoint('large') {
					right: -50px;
				}
			}
		}
		.embla {
			overflow: hidden;
		}
		.embla__container {
			display: flex;
		}
		:global(.item) {
			padding: 1rem;
			flex: 0 0 calc(100%);
			min-width: 0;
			@include borderRadius('xsmall');
			@include breakpoint('small') {
				flex: 0 0 calc(50%);
			}
			@include breakpoint('large') {
				flex: 0 0 calc(30% + 2rem);
			}
			&:nth-child(1) {
				padding-left: 0;
			}
			&:last-child {
				padding-right: 0;
			}
		}
	}
</style>
