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
	import tippy from 'svelte-tippy';
	export let data = null;
</script>

<div class="slider">
	<TinySlider transitionDuration="500">
		{#snippet children({ sliderWidth })}
			{#each data as projet}
				<div class="item" style="width: {sliderWidth / 3}px">
					<a
						href={projet.link ? projet.link : ''}
						class="grain"
						target={projet.link ? '_blank' : ''}
						onclick={() => (projet.link ? '' : window.open(projet.image))}
					>
						<div class="image">
							<!-- svelte-ignore a11y_img_redundant_alt -->
							<img
								src={projet.image}
								alt="Image issue de {projet.name}"
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
							<h5>{projet.name}</h5>
							<p>{projet.description}</p>
							<div class="technos">
								{#each projet.technos as techno}
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
											<img
												src="/assets/icons/{techno}.svg"
												alt={techno}
												width="100%"
												height="100%"
											/>
										</span>
									</span>
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
					onclick={() => setIndex(currentIndex - 1)}
					transition:fly={{ x: 25 }}
				>
					<span class="icon">
						<ChevronLeft />
					</span>
				</button>
			{/if}

			{#if currentIndex < data.length - 3}
				<button
					class="next grain"
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
	// @import '~chocolat/dist/css/chocolat.css';

	.slider {
		position: relative;
		> button {
			position: absolute;
			top: calc(50% - 17.5px);
			border-radius: 50%;
			overflow: hidden;
			border: solid 1px rgba(0, 0, 0, 0.1);
			cursor: pointer;
			.icon {
				display: inline-flex;
				width: 35px;
				height: 35px;
				align-items: center;
				justify-content: center;
			}
			&.back {
				left: -50px;
			}
			&.next {
				right: -50px;
			}
		}
		.item {
			border-radius: 5px;
			padding: 1rem;
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
				h5 {
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
					height: 100px;
					position: relative;

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
						.techno {
							display: inline-flex;
							align-items: center;
							justify-content: center;
							.icon {
								width: 1rem;
								height: 1.5rem;
								img {
									width: 100%;
									height: 1rem;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
