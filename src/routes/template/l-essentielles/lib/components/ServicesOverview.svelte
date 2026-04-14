<script>
	import { services } from '../data.js';
	import { onMount } from 'svelte';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('.service-card', {
			y: 80,
			opacity: 0,
			duration: 0.9,
			stagger: 0.2,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: '.services-grid',
				start: 'top 80%'
			}
		});

		gsap.from('.services-heading', {
			y: 40,
			opacity: 0,
			duration: 0.8,
			scrollTrigger: {
				trigger: '.services-section',
				start: 'top 80%'
			}
		});
	});
</script>

<section class="services-section" id="services">
	<div class="services-inner">
		<div class="services-header">
			<span class="services-label">Nos prestations</span>
			<h2 class="services-heading">Trois univers dédiés à votre beauté</h2>
		</div>

		<div class="services-grid">
			{#each services as service}
				<a href={service.href} class="service-card">
					<div class="card-image-wrap">
						<!-- client: replace with real salon photo -->
						<img src={service.image} alt={service.title} class="card-image" />
						<div class="card-overlay"></div>
					</div>
					<div class="card-content">
						<h3 class="card-title">{service.title}</h3>
						<p class="card-subtitle">{service.subtitle}</p>
						<p class="card-desc">{service.description}</p>
						<span class="card-link">
							Découvrir
							<svg width="20" height="10" viewBox="0 0 20 10" fill="none">
								<path d="M0 5h18m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="1" />
							</svg>
						</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use '../styles/mixins' as *;

	.services-section {
		padding: 6rem 1.5rem;
		background: #fff;

		@include breakpoint('medium') {
			padding: 8rem 3rem;
		}
	}

	.services-inner {
		max-width: 1400px;
		margin: 0 auto;
	}

	.services-header {
		text-align: center;
		margin-bottom: 4rem;

		@include breakpoint('medium') {
			margin-bottom: 5rem;
		}
	}

	.services-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #8b7d6b;
		display: block;
		margin-bottom: 1rem;
	}

	.services-heading {
		font-size: clamp(1.8rem, 4vw, 3rem);
		font-weight: 300;
		color: #1a1a1a;
	}

	.services-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(3, 1fr);
			gap: 2.5rem;
		}
	}

	.service-card {
		display: block;
		group: card;
		transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

		&:hover {
			transform: translateY(-6px);

			.card-image {
				transform: scale(1.08);
			}

			.card-overlay {
				opacity: 0.15;
			}

			.card-link svg {
				transform: translateX(4px);
			}
		}
	}

	.card-image-wrap {
		overflow: hidden;
		aspect-ratio: 3/4;
		position: relative;
		margin-bottom: 1.5rem;
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.card-overlay {
		position: absolute;
		inset: 0;
		background: #1a1a1a;
		opacity: 0;
		transition: opacity 0.4s;
	}

	.card-content {
		padding: 0 0.25rem;
	}

	.card-title {
		font-size: 1.75rem;
		color: #1a1a1a;
		margin-bottom: 0.25rem;
	}

	.card-subtitle {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.05rem;
		font-style: italic;
		color: #8b7d6b;
		margin-bottom: 0.75rem;
	}

	.card-desc {
		font-size: 0.9rem;
		line-height: 1.7;
		color: #777;
		margin-bottom: 1.25rem;
	}

	.card-link {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #1a1a1a;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;

		svg {
			transition: transform 0.3s;
		}
	}
</style>
