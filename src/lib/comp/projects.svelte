<script>
	import { ArrowUpRight, ChevronLeft, ChevronRight, Fullscreen } from 'lucide-svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { fly } from 'svelte/transition';
	import { settings } from '$lib/stores/settings.js';
	import tippy from 'svelte-tippy';
	import TechnoElement from './techno/techno_element.svelte';
	import { content } from '$lib/stores/content.js';

	export let data = null;

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
		dragFree: true
	};
</script>

<div class="slider">
	<div class="embla" use:emblaCarouselSvelte={{ options: emblaOptions }} onemblaInit={onInit}>
		<div class="embla__container">
			{#each data as projet}
				<div class="item">
					<a
						href={projet.link || '#!'}
						class="grain no-effect"
						dofollow
						target={projet.link ? '_blank' : undefined}
						data-umami-event="click-{projet.name.toLowerCase().replace(/ /g, '-')}"
					>
						<div class="image">
							<!-- svelte-ignore a11y_img_redundant_alt -->
							<img
								src={projet.image}
								alt="{$content.site.imageFrom[$settings.lang]} {projet.name}"
								width="100%"
								height="100%"
							/>
						</div>
						<div class="container">
							<span
								class="icon"
								use:tippy={{
									content: `${projet.link || $content.site.soon[$settings.lang]}`,
									placement: 'left',
									theme: 'kltk',
									arrow: false,
									animation: 'perspective-subtle'
								}}
							>
								{#if !projet.link}
									<Fullscreen />
								{:else}
									<ArrowUpRight />
								{/if}
							</span>
							<h3>{projet.name}</h3>
							{#key $settings.lang}
								<p>{projet.description[$settings.lang]}</p>
							{/key}

							<div class="technos">
								{#each projet.technos as techno}
									<TechnoElement {techno} />
								{/each}
							</div>
							<time>{projet.date}</time>
						</div>
					</a>
				</div>
			{/each}
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
		.item {
			padding: 1rem;
			flex: 0 0 calc(100% / 3);
			min-width: 0;
			@include borderRadius('xsmall');
			@include breakpoint('medium') {
				flex: 0 0 40%;
			}
			@include breakpoint('small') {
				flex: 0 0 80%;
			}
			&:nth-child(1) {
				padding-left: 0;
			}
			&:last-child {
				padding-right: 0;
			}
			a {
				box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);
				overflow: hidden;
				display: flex;
				flex-direction: column;
				@include borderRadius('xsmall');
				&:hover {
					.container .technos {
						height: auto;
						opacity: 1;
						&:has(.techno) {
							margin-top: 0.5rem;
						}
					}
				}
				h3 {
					font-size: 1.25rem;
					font-weight: 600;
				}
				time {
					font-size: 0.8rem;
					width: 100%;
					display: inline-flex;
					justify-content: flex-end;
					opacity: 0.5;
					margin-top: 0.5rem;
				}
				.image {
					width: 100%;
					height: 200px;
					position: relative;
					@include breakpoint('small') {
						height: 150px;
					}
					@include breakpoint('medium') {
						height: 100px;
					}
					&::before {
						content: '';
						position: absolute;
						z-index: 1;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
					img {
						object-fit: cover;
						width: inherit;
						height: inherit;
					}
				}
				.container {
					padding: 1rem;
					position: relative;
					> .icon {
						top: 10px;
						right: 10px;
						width: 14px;
						position: absolute;
					}
					.technos {
						display: flex;
						gap: 0.6rem;
						flex-wrap: wrap;
						justify-content: flex-end;
						height: 0;
						overflow: hidden;
						opacity: 0;
						transition:
							margin-top 0.5s,
							height 0.5s,
							opacity 0.5s;
					}
				}
			}
		}
	}
</style>
