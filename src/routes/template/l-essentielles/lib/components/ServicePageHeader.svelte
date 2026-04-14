<script>
	import { salon } from '../data.js';
	import { onMount } from 'svelte';

	let { title = '', image = '' } = $props();

	onMount(async () => {
		const { gsap } = await import('gsap');

		gsap.from('.page-header-title', {
			y: 60,
			opacity: 0,
			duration: 1,
			ease: 'power3.out'
		});

		gsap.from('.page-header-rdv', {
			y: 20,
			opacity: 0,
			duration: 0.6,
			delay: 0.4,
			ease: 'power3.out'
		});

		if (document.querySelector('.page-header-image')) {
			gsap.from('.page-header-image', {
				scale: 1.1,
				opacity: 0,
				duration: 1.2,
				ease: 'power2.out',
				delay: 0.2
			});
		}
	});
</script>

<section class="page-header">
	{#if image}
		<div class="page-header-bg">
			<img class="page-header-image" src={image} alt={title} />
			<div class="page-header-overlay"></div>
		</div>
	{/if}
	<div class="page-header-content" class:has-image={!!image}>
		<h1 class="page-header-title">{title}</h1>
		<p class="page-header-rdv">{salon.appointment} au <strong>{salon.phone}</strong></p>
	</div>
</section>

<style lang="scss">
	@use '../styles/mixins' as *;

	.page-header {
		position: relative;
		padding: 10rem 1.5rem 4rem;
		background: #f3efe9;
		overflow: hidden;

		@include breakpoint('medium') {
			padding: 12rem 3rem 5rem;
		}
	}

	.page-header-bg {
		position: absolute;
		inset: 0;
	}

	.page-header-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.page-header-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(26, 26, 26, 0.4) 0%,
			rgba(26, 26, 26, 0.6) 100%
		);
	}

	.page-header-content {
		max-width: 1400px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
		text-align: center;

		&.has-image {
			.page-header-title {
				color: #faf8f5;
			}

			.page-header-rdv {
				color: rgba(250, 248, 245, 0.8);

				strong {
					color: #faf8f5;
				}
			}
		}
	}

	.page-header-title {
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 300;
		color: #1a1a1a;
		margin-bottom: 1rem;
		letter-spacing: -0.02em;
	}

	.page-header-rdv {
		font-size: 0.9rem;
		color: #777;
		letter-spacing: 0.05em;

		strong {
			color: #1a1a1a;
			font-weight: 500;
		}
	}
</style>
