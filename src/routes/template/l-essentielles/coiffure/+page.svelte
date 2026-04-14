<script>
	import ServicePageHeader from '../lib/components/ServicePageHeader.svelte';
	import PriceTable from '../lib/components/PriceTable.svelte';
	import BookingBanner from '../lib/components/BookingBanner.svelte';
	import { coiffure, salon } from '../lib/data.js';
	import { onMount } from 'svelte';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.utils.toArray('.coiffure-section').forEach((section) => {
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

		// Parallax on gallery images
		gsap.utils.toArray('.gallery-img img').forEach((img) => {
			gsap.to(img, {
				yPercent: -10,
				ease: 'none',
				scrollTrigger: {
					trigger: img.parentElement,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		});
	});
</script>

<svelte:head>
	<title>Coiffure — {salon.name}</title>
</svelte:head>

<ServicePageHeader
	title={coiffure.title}
	image="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80"
/>

<!-- Intro with mini gallery -->
<section class="coiffure-intro">
	<div class="intro-inner">
		<div class="intro-text">
			<div class="intro-ornament">
				<span class="orn-line"></span>
				<span class="orn-diamond">◇</span>
				<span class="orn-line"></span>
			</div>
			<p>
				De la coupe au soin profond, nos coiffeuses vous accompagnent
				pour sublimer votre chevelure avec les meilleurs produits et techniques.
			</p>
		</div>
		<div class="mini-gallery">
			<!-- client: replace with real salon photos -->
			<div class="gallery-img">
				<img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&q=80" alt="Coiffure 1" />
			</div>
			<div class="gallery-img">
				<img src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&q=80" alt="Coiffure 2" />
			</div>
			<div class="gallery-img tall">
				<img src="https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=500&q=80" alt="Coiffure 3" />
			</div>
		</div>
	</div>
</section>

<div class="page-content">
	<div class="content-inner">
		{#each coiffure.sections as section, i}
			<div class="coiffure-section">
				<div class="section-header">
					<span class="section-number">0{i + 1}</span>
					<h2 class="section-title">{section.title}</h2>
					<div class="title-line"></div>
				</div>

				{#if section.items}
					<div class="table-wrap">
						<PriceTable items={section.items} note={section.note || ''} />
					</div>
				{/if}

				{#if section.subsections}
					<div class="subsections-grid">
						{#each section.subsections as sub}
							<div class="soin-card">
								<h3 class="soin-title">{sub.title}</h3>
								{#if sub.detail}
									<p class="soin-desc">{sub.detail}</p>
								{/if}
								<div class="soin-prices">
									<PriceTable items={sub.items} />
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			{#if i < coiffure.sections.length - 1}
				<div class="section-separator">
					<span class="sep-dot"></span>
					<span class="sep-line"></span>
					<span class="sep-dot"></span>
				</div>
			{/if}
		{/each}
	</div>
</div>

<!-- Photo band before CTA -->
<div class="photo-band">
	<!-- client: replace with real salon photos -->
	<div class="band-img"><img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80" alt="Salon" /></div>
	<div class="band-img"><img src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80" alt="Salon" /></div>
	<div class="band-img"><img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80" alt="Salon" /></div>
	<div class="band-img"><img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80" alt="Salon" /></div>
</div>

<BookingBanner />

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	/* Intro */
	.coiffure-intro {
		padding: 3.5rem 1.5rem;
		background: #faf8f5;

		@include breakpoint('medium') {
			padding: 4.5rem 3rem;
		}
	}

	.intro-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.intro-text {
		text-align: center;
		max-width: 600px;
		margin: 0 auto 3rem;
	}

	.intro-ornament {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.orn-line {
		width: 50px;
		height: 1px;
		background: #d4ccc0;
	}

	.orn-diamond {
		color: #8b7d6b;
		font-size: 0.9rem;
	}

	.intro-text p {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.2rem;
		font-style: italic;
		line-height: 1.8;
		color: #666;
	}

	.mini-gallery {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;

		@include breakpoint('medium') {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 1.25rem;
		}
	}

	.gallery-img {
		overflow: hidden;
		aspect-ratio: 4/5;

		&.tall {
			display: none;

			@include breakpoint('medium') {
				display: block;
			}
		}

		img {
			width: 100%;
			height: 120%;
			object-fit: cover;
			transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		}

		&:hover img {
			transform: scale(1.05);
		}
	}

	/* Content */
	.page-content {
		padding: 3rem 1.5rem 4rem;
		background: #faf8f5;

		@include breakpoint('medium') {
			padding: 4rem 3rem 6rem;
		}
	}

	.content-inner {
		max-width: 1100px;
		margin: 0 auto;
	}

	.section-header {
		margin-bottom: 2rem;
	}

	.section-number {
		font-family: 'Cormorant Garamond', serif;
		font-size: 0.9rem;
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

	.table-wrap {
		max-width: 800px;
	}

	/* Soins cards (subsections) */
	.subsections-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		margin-top: 1.5rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			gap: 2rem;
		}
	}

	.soin-card {
		background: #fff;
		border: 1px solid #e8e3dc;
		padding: 2rem;
		transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;

		&:hover {
			transform: translateY(-4px);
			box-shadow: 0 16px 40px rgba(0, 0, 0, 0.06);
			border-color: #8b7d6b;
		}
	}

	.soin-title {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.4rem;
		font-weight: 500;
		color: #1a1a1a;
		margin-bottom: 0.5rem;
	}

	.soin-desc {
		font-size: 0.85rem;
		line-height: 1.7;
		color: #999;
		margin-bottom: 1.25rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #f0ece6;
	}

	/* Photo band */
	.photo-band {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		height: 200px;

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
			height: 250px;
		}
	}

	.band-img {
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.6s ease;
		}

		&:hover img {
			transform: scale(1.08);
		}

		&:nth-child(3),
		&:nth-child(4) {
			display: none;

			@include breakpoint('medium') {
				display: block;
			}
		}
	}

	/* Separator */
	.section-separator {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 3rem 0;

		@include breakpoint('medium') {
			padding: 4rem 0;
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
