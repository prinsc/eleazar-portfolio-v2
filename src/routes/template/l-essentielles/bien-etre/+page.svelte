<script>
	import ServicePageHeader from '../lib/components/ServicePageHeader.svelte';
	import PriceTable from '../lib/components/PriceTable.svelte';
	import BookingBanner from '../lib/components/BookingBanner.svelte';
	import { bienEtre, salon } from '../lib/data.js';
	import { onMount } from 'svelte';

	// Photos per section - client: replace with real salon photos
	const sectionImages = {
		'Soin du visage': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
		'Head Spa': 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
		Massage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'
	};

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.utils.toArray('.wellness-section').forEach((section) => {
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

		gsap.utils.toArray('.experience-card').forEach((card, i) => {
			gsap.from(card, {
				y: 40,
				opacity: 0,
				duration: 0.7,
				delay: i * 0.12,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: card,
					start: 'top 85%'
				}
			});
		});
	});
</script>

<svelte:head>
	<title>Bien-être - {salon.name}</title>
</svelte:head>

<ServicePageHeader
	title={bienEtre.title}
	image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80"
/>

<!-- Intro text -->
<section class="wellness-intro">
	<div class="intro-inner">
		<div class="intro-ornament">
			<span class="orn-line"></span>
			<span class="orn-diamond">◇</span>
			<span class="orn-line"></span>
		</div>
		<p>
			Offrez-vous une pause hors du temps. Nos soins bien-être sont conçus pour vous envelopper de
			douceur, libérer vos tensions et éveiller vos sens.
		</p>
	</div>
</section>

<div class="page-content">
	<div class="content-inner">
		{#each bienEtre.sections as section, i}
			<div class="wellness-section">
				<!-- Full-width image banner for each section -->
				<div class="section-banner">
					<!-- client: replace with real salon photo -->
					<img
						src={sectionImages[section.title] ||
							'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'}
						alt={section.title}
					/>
					<div class="banner-overlay"></div>
					<div class="banner-content">
						<span class="banner-number">0{i + 1}</span>
						<h2 class="banner-title">{section.title}</h2>
					</div>
				</div>

				<!-- Cards or table depending on content type -->
				<div class="section-body">
					{#if section.items && section.items[0]?.detail}
						<div class="experience-grid">
							{#each section.items as item}
								<div class="experience-card">
									<div class="card-top">
										<div class="card-header">
											<h3>{item.name}</h3>
											{#if item.duration}
												<span class="duration">{item.duration}</span>
											{/if}
										</div>
										<div class="card-line"></div>
										<p class="card-desc">{item.detail}</p>
									</div>
									<div class="card-bottom">
										<span class="card-price">{item.price}</span>
										<a href="/template/l-essentielles/contact" class="card-book">Réserver</a>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div class="simple-table-wrap">
							<PriceTable items={section.items} />
						</div>
					{/if}
				</div>
			</div>

			{#if i < bienEtre.sections.length - 1}
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

	/* Intro */
	.wellness-intro {
		padding: 3.5rem 1.5rem;
		background: #faf8f5;
		text-align: center;

		@include breakpoint('medium') {
			padding: 4.5rem 3rem;
		}
	}

	.intro-inner {
		max-width: 650px;
		margin: 0 auto;
	}

	.intro-ornament {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1.75rem;
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

	.intro-inner p {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.2rem;
		font-style: italic;
		line-height: 1.8;
		color: #666;
	}

	/* Content */
	.page-content {
		padding: 0 1.5rem 4rem;
		background: #faf8f5;

		@include breakpoint('medium') {
			padding: 0 3rem 6rem;
		}
	}

	.content-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Section banner */
	.section-banner {
		position: relative;
		height: 280px;
		overflow: hidden;

		@include breakpoint('medium') {
			height: 350px;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.banner-overlay {
			position: absolute;
			inset: 0;
			background: linear-gradient(to right, rgba(26, 26, 26, 0.6) 0%, rgba(26, 26, 26, 0.2) 100%);
		}
	}

	.banner-content {
		position: absolute;
		bottom: 2rem;
		left: 2rem;

		@include breakpoint('medium') {
			bottom: 3rem;
			left: 3rem;
		}
	}

	.banner-number {
		font-family: 'Cormorant Garamond', serif;
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.6);
		letter-spacing: 0.15em;
		display: block;
		margin-bottom: 0.35rem;
	}

	.banner-title {
		font-size: clamp(1.8rem, 4vw, 2.75rem);
		font-weight: 300;
		color: #fff;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	}

	/* Section body */
	.section-body {
		padding: 2.5rem 0;

		@include breakpoint('medium') {
			padding: 3rem 0;
		}
	}

	.simple-table-wrap {
		max-width: 700px;
	}

	/* Experience cards */
	.experience-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}
	}

	.experience-card {
		background: #fff;
		border: 1px solid #e8e3dc;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition:
			transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
			box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
			border-color 0.3s;

		&:hover {
			transform: translateY(-6px);
			box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
			border-color: #8b7d6b;
		}
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.75rem;

		h3 {
			font-family: 'Cormorant Garamond', serif;
			font-size: 1.5rem;
			font-weight: 500;
			color: #1a1a1a;
		}
	}

	.duration {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #8b7d6b;
		white-space: nowrap;
		background: #f3efe9;
		padding: 0.3rem 0.75rem;
	}

	.card-line {
		width: 40px;
		height: 1px;
		background: #8b7d6b;
		margin-bottom: 1rem;
	}

	.card-desc {
		font-size: 0.9rem;
		line-height: 1.7;
		color: #777;
		margin-bottom: 1.5rem;
	}

	.card-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1.25rem;
		border-top: 1px solid #f0ece6;
	}

	.card-price {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.75rem;
		font-weight: 600;
		color: #1a1a1a;
	}

	.card-book {
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #8b7d6b;
		border-bottom: 1px solid #8b7d6b;
		padding-bottom: 2px;
		transition: color 0.3s;

		&:hover {
			color: #1a1a1a;
			border-color: #1a1a1a;
		}
	}

	/* Separator */
	.section-separator {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 2rem 0;
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
