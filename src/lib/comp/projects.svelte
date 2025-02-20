<script>
	import {
		ArrowUpRight,
		ChevronDown,
		ChevronLeft,
		ChevronRight,
		MapPin,
		Fullscreen,
		Sun
	} from 'lucide-svelte';
	import Experience from '$lib/comp/exp.svelte';
	import formatText from '$lib/utils/formatText';
	import { TinySlider } from 'svelte-tiny-slider';
	import { fly } from 'svelte/transition';
	import { settings } from '$lib/stores/settings.js';
	import tippy from 'svelte-tippy';
	import TechnoElement from './techno/techno_element.svelte';
	import { content } from '$lib/stores/content.js';
	export let data = null;
</script>

<div class="slider">
	<TinySlider transitionDuration="500">
		{#snippet children({ sliderWidth })}
			{#each data as projet}
				<div class="item" style="--width: 100px;">
					<a
						href={projet.link ? projet.link : ''}
						class="grain no-effect"
						target={projet.link ? '_blank' : ''}
						onclick={() => (projet.link ? '' : window.open(projet.image))}
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
							<span class="icon">
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
						</div>
					</a>
				</div>
			{/each}
		{/snippet}

		{#snippet controls({ setIndex, currentIndex })}
			{#if currentIndex > 0}
				<button
					class="back grain"
					aria-label={$content.site.arialabel.previous[$settings.lang]}
					onclick={() => setIndex(currentIndex - 1)}
					transition:fly={{ x: 25 }}
				>
					<span class="icon">
						<ChevronLeft />
					</span>
				</button>
			{/if}

			{#if currentIndex < data.length - 2.5}
				<button
					class="next grain"
					aria-label={$content.site.arialabel.next[$settings.lang]}
					onclick={() => setIndex(currentIndex + 1)}
					transition:fly={{ x: -25 }}
				>
					<span class="icon">
						<ChevronRight />
					</span>
				</button>
			{/if}
		{/snippet}
	</TinySlider>
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
		.item {
			border-radius: 5px;
			padding: 1rem;
			width: calc(var(--width) * 3);
			@include breakpoint('medium') {
				width: calc(var(--width) * 2.5);
			}
			&:nth-child(1) {
				padding-left: 0;
			}
			&:nth-child(3) {
				padding-right: 0;
				margin-right: 1rem;
			}
			a {
				box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);
				border-radius: 5px;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				h3 {
					font-size: 1.25rem;
					font-weight: 600;
				}
				&:hover {
					.container .technos {
						height: auto;
						opacity: 1;
						&:has(.techno) {
							margin-top: 0.5rem;
						}
					}
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
