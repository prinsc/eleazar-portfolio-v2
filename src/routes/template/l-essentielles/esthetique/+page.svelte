<script>
	import ServicePageHeader from '../lib/components/ServicePageHeader.svelte';
	import PriceTable from '../lib/components/PriceTable.svelte';
	import BookingBanner from '../lib/components/BookingBanner.svelte';
	import { esthetique, salon } from '../lib/data.js';
	import { onMount } from 'svelte';

	// Photos for each section - client: replace with real salon photos
	const sectionImages = {
		'Beauté du regard': 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=700&q=80',
		Manucure: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&q=80',
		'Épilation & Sourcils':
			'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=700&q=80',
		'Beauté du sourire': 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=700&q=80',
		'Mise en beauté': 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=80'
	};

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.utils.toArray('.price-section').forEach((section) => {
			gsap.from(section, {
				y: 60,
				opacity: 0,
				duration: 0.9,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: section,
					start: 'top 80%'
				}
			});
		});

		// Parallax on section images
		gsap.utils.toArray('.section-image img').forEach((img) => {
			gsap.to(img, {
				yPercent: -12,
				ease: 'none',
				scrollTrigger: {
					trigger: img.closest('.section-image'),
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		});
	});
</script>

<svelte:head>
	<title>Esthétique - {salon.name}</title>
</svelte:head>

<ServicePageHeader
	title={esthetique.title}
	image="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=80"
/>

<!-- Decorative ornament -->
<div class="ornament-divider">
	<svg viewBox="0 0 200 20" class="ornament-svg">
		<path d="M0,10 Q50,0 100,10 Q150,20 200,10" stroke="#d4ccc0" stroke-width="0.5" fill="none" />
		<circle cx="100" cy="10" r="3" fill="#8b7d6b" />
		<line x1="70" y1="10" x2="90" y2="10" stroke="#d4ccc0" stroke-width="0.5" />
		<line x1="110" y1="10" x2="130" y2="10" stroke="#d4ccc0" stroke-width="0.5" />
	</svg>
</div>

<div class="page-content">
	<div class="content-inner">
		{#each esthetique.sections as section, i}
			<div class="price-section" class:reversed={i % 2 !== 0}>
				<!-- Section image -->
				<div class="section-image">
					<!-- client: replace with real salon photo -->
					<img
						src={sectionImages[section.title] ||
							'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80'}
						alt={section.title}
					/>
					<div class="image-frame"></div>
				</div>

				<!-- Section content -->
				<div class="section-content">
					<div class="section-header">
						<span class="section-number">0{i + 1}</span>
						<h2 class="section-title">{section.title}</h2>
						<div class="title-line"></div>
					</div>

					{#if section.subsections}
						{#each section.subsections as sub}
							<div class="subsection">
								<h3 class="subsection-title">{sub.title}</h3>
								<PriceTable items={sub.items} note={sub.note || ''} />
							</div>
						{/each}
					{/if}
				</div>
			</div>

			{#if i < esthetique.sections.length - 1}
				<div class="section-separator">
					<span class="sep-dot"></span>
					<span class="sep-line"></span>
					<span class="sep-dot"></span>
				</div>
			{/if}
		{/each}
	</div>
</div>

<BookingBanner />

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	.ornament-divider {
		text-align: center;
		padding: 2.5rem 0;
		background: #faf8f5;
	}

	.ornament-svg {
		width: 200px;
		height: 20px;
	}

	.page-content {
		padding: 2rem 1.5rem 4rem;
		background: #faf8f5;

		@include breakpoint('medium') {
			padding: 3rem 3rem 6rem;
		}
	}

	.content-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.price-section {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		align-items: start;

		@include breakpoint('large') {
			grid-template-columns: 0.45fr 0.55fr;
			gap: 4rem;
		}

		&.reversed {
			@include breakpoint('large') {
				direction: rtl;

				> * {
					direction: ltr;
				}
			}
		}
	}

	.section-image {
		position: relative;
		overflow: hidden;
		aspect-ratio: 3/4;

		@include breakpoint('large') {
			position: sticky;
			top: 6rem;
		}

		img {
			width: 100%;
			height: 120%;
			object-fit: cover;
		}

		.image-frame {
			position: absolute;
			inset: 12px;
			border: 1px solid rgba(255, 255, 255, 0.3);
			pointer-events: none;
		}
	}

	.section-content {
		padding: 0;

		@include breakpoint('large') {
			padding: 1rem 0;
		}
	}

	.section-header {
		margin-bottom: 2rem;
	}

	.section-number {
		font-family: 'Cormorant Garamond', serif;
		font-size: 0.9rem;
		font-weight: 400;
		color: #c4bfb6;
		letter-spacing: 0.1em;
		display: block;
		margin-bottom: 0.5rem;
	}

	.section-title {
		font-size: clamp(1.6rem, 3vw, 2.5rem);
		font-weight: 300;
		color: #1a1a1a;
		margin-bottom: 0.75rem;
	}

	.title-line {
		width: 60px;
		height: 1px;
		background: linear-gradient(to right, #8b7d6b, transparent);
	}

	.subsection {
		margin-bottom: 2.5rem;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.subsection-title {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.3rem;
		font-weight: 500;
		color: #8b7d6b;
		margin-bottom: 1rem;
		font-style: italic;
		display: flex;
		align-items: center;
		gap: 0.75rem;

		&::before {
			content: '✦';
			font-size: 0.6rem;
			color: #d4ccc0;
			font-style: normal;
		}
	}

	/* Section separator */
	.section-separator {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 3.5rem 0;

		@include breakpoint('medium') {
			padding: 4.5rem 0;
		}
	}

	.sep-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: #d4ccc0;
	}

	.sep-line {
		width: 60px;
		height: 1px;
		background: #e8e3dc;
	}
</style>
