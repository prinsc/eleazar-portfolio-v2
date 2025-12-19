<script>
	import { ArrowUpRight, Fullscreen } from 'lucide-svelte';
	import tippy from 'svelte-tippy';
	import TechnoElement from './techno/techno_element.svelte';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';

	let {
		title,
		description,
		image,
		technos = [],
		link = null,
		onclick = null,
		date = null,
		pricing = null,
		tagline = null,
		showTechnosOnHover = true,
		dataUmamiEvent = null,
		tooltipContent = null,
		elementType = 'a'
	} = $props();

	const isButton = elementType === 'button';
	const isLink = elementType === 'a';
</script>

{#if isLink}
	<a
		href={link || '#!'}
		class="card grain no-effect"
		target={link ? '_blank' : undefined}
		data-umami-event={dataUmamiEvent}
	>
		<div class="image">
			{#if image}
				<img src={image} alt={title} width="100%" height="100%" />
			{:else}
				<div class="placeholder"></div>
			{/if}
		</div>
		<div class="container">
			<span
				class="icon"
				use:tippy={{
					content: tooltipContent || (link ? link : $content.site.soon[$settings.lang]),
					placement: 'left',
					theme: 'kltk',
					arrow: false,
					animation: 'perspective-subtle'
				}}
			>
				{#if !link}
					<Fullscreen />
				{:else}
					<ArrowUpRight />
				{/if}
			</span>
			<h3>{title}</h3>
			{#key $settings.lang}
				<p class:tagline={!!tagline}>{tagline || description}</p>
			{/key}

			{#if pricing}
				<div class="pricing">
					<span class="price">{pricing}</span>
				</div>
			{/if}

			<div class="technos" class:show-on-hover={showTechnosOnHover}>
				{#each technos as techno}
					<TechnoElement {techno} />
				{/each}
			</div>

			{#if date}
				<time>{date}</time>
			{/if}
		</div>
	</a>
{:else if isButton}
	<button class="card grain no-effect" {onclick} data-umami-event={dataUmamiEvent}>
		<div class="image">
			{#if image}
				<img src={image} alt={title} width="100%" height="100%" />
			{:else}
				<div class="placeholder"></div>
			{/if}
		</div>
		<div class="container">
			<span class="icon">
				<ArrowUpRight />
			</span>
			<h3>{title}</h3>
			{#key $settings.lang}
				<p class:tagline={!!tagline}>{tagline || description}</p>
			{/key}

			{#if pricing}
				<div class="pricing">
					<span class="price">{pricing}</span>
				</div>
			{/if}

			<div class="technos" class:show-on-hover={showTechnosOnHover}>
				{#each technos as techno}
					<TechnoElement {techno} />
				{/each}
			</div>

			{#if date}
				<time>{date}</time>
			{/if}
		</div>
	</button>
{/if}

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	.card {
		width: 100%;
		text-align: left;
		box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		@include borderRadius('xsmall');

		&:hover {
			.container .technos.show-on-hover {
				height: auto;
				opacity: 1;
				&:has(.techno) {
					margin-top: 0.5rem;
				}
			}
		}

		button {
			cursor: pointer;
			transition: transform 0.2s;

			&:hover {
				transform: translateY(-5px);
			}
		}

		h3 {
			font-size: 1.25rem;
			font-weight: 600;
			max-width: 80%;
		}

		.tagline {
			opacity: 0.8;
			font-size: 0.95rem;
			margin-top: 0.25rem;
		}

		.pricing {
			margin: 0.75rem 0;
			.price {
				font-weight: 600;
				font-size: 1.1rem;
				color: var(--color-primary);
			}
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

			.placeholder {
				width: 100%;
				height: 100%;
				background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-gray-15) 100%);
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

				&.show-on-hover {
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
</style>
