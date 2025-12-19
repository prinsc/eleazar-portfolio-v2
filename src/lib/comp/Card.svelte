<script>
	import { ArrowUpRight, Fullscreen } from 'lucide-svelte';
	import tippy from 'svelte-tippy';
	import TechnoElement from './techno/techno_element.svelte';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';
	import Portal from 'svelte-portal';
	import { fly } from 'svelte/transition';
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
	const isDiv = elementType === 'div';

	let showLightbox = $state(false);

	function openLightbox() {
		showLightbox = true;
	}

	function closeLightbox() {
		showLightbox = false;
	}
</script>

{#if showLightbox && image}
	<Portal target="body">
		<button
			transition:fly={{ y: 20, duration: 200 }}
			class="lightbox"
			aria-label="Fermer l'image en plein écran"
			onclick={closeLightbox}
			onkeydown={(e) => e.key === 'Escape' && closeLightbox()}
		>
			<img src={image} alt={title} />
		</button>
	</Portal>
{/if}
{#if isLink}
	<a
		href={link || '#!'}
		class="card grain no-effect"
		target={link ? '_blank' : undefined}
		data-umami-event={dataUmamiEvent}
		onclick={!link
			? (e) => {
					e.preventDefault();
					openLightbox();
				}
			: undefined}
	>
		<div class="image">
			{#if image}
				<img src={image} alt={title} width="100%" height="100%" />
			{:else}
				<div class="placeholder"></div>
			{/if}
		</div>
		<div class="container">
			{#if link}
				<span
					class="icon"
					use:tippy={{
						content: tooltipContent || link,
						placement: 'left',
						theme: 'kltk',
						arrow: false,
						animation: 'perspective-subtle'
					}}
				>
					<ArrowUpRight />
				</span>
			{:else}
				<span class="icon">
					<Fullscreen />
				</span>
			{/if}
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
{:else if isDiv}
	<div
		class="card grain no-effect"
		role="button"
		tabindex="0"
		onclick={openLightbox}
		onkeydown={(e) => e.key === 'Enter' && openLightbox()}
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
					content: tooltipContent || 'Voir en grand',
					placement: 'left',
					theme: 'kltk',
					arrow: false,
					animation: 'perspective-subtle'
				}}
			>
				<Fullscreen />
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
	</div>
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

	.lightbox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100dvw;
		height: 100dvh;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		background: rgba(255, 255, 255, 0.8);

		img {
			max-width: 100dvw;
			max-height: 90dvh;
			object-fit: contain;
			border-radius: 8px;
		}
	}
</style>
