<script>
	import Hero from './lib/components/Hero.svelte';
	import ServicesOverview from './lib/components/ServicesOverview.svelte';
	import Testimonials from './lib/components/Testimonials.svelte';
	import BookingBanner from './lib/components/BookingBanner.svelte';
	import { salon, groupHoraires } from './lib/data.js';
	import { onMount } from 'svelte';

	let { data } = $props();

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		// Parallax on about image
		gsap.to('.about-image img', {
			yPercent: -15,
			ease: 'none',
			scrollTrigger: {
				trigger: '.about-section',
				start: 'top bottom',
				end: 'bottom top',
				scrub: true
			}
		});

		// Reveal about section
		gsap.from('.about-text', {
			x: -60,
			opacity: 0,
			duration: 1,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: '.about-section',
				start: 'top 70%'
			}
		});

		// Hours section
		gsap.from('.hours-card', {
			y: 40,
			opacity: 0,
			duration: 0.8,
			stagger: 0.15,
			scrollTrigger: {
				trigger: '.hours-section',
				start: 'top 80%'
			}
		});
	});
	console.log(data);
</script>

<svelte:head>
	<title>{salon.name} - {salon.tagline}</title>
</svelte:head>

<Hero />

<!-- Photo mosaic band -->
<div class="photo-mosaic">
	<!-- client: replace with real salon photos -->
	<div class="mosaic-img">
		<img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80" alt="Salon" />
	</div>
	<div class="mosaic-img">
		<img
			src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80"
			alt="Nails"
		/>
	</div>
	<div class="mosaic-img">
		<img
			src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80"
			alt="Coiffure"
		/>
	</div>
	<div class="mosaic-img">
		<img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80" alt="Soin" />
	</div>
	<div class="mosaic-img">
		<img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80" alt="Massage" />
	</div>
</div>

<ServicesOverview />

<!-- Decorative ornament between sections -->
<div class="section-ornament">
	<span class="orn-line"></span>
	<span class="orn-diamond">◇</span>
	<span class="orn-line"></span>
</div>

<!-- About section -->
<section class="about-section">
	<!-- Grain texture overlay -->
	<div class="grain-overlay"></div>
	<div class="about-inner">
		<div class="about-image">
			<!-- client: replace with real salon interior photo -->
			<img
				src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80"
				alt="Intérieur du salon"
			/>
			<div class="image-frame"></div>
		</div>
		<div class="about-text">
			<span class="section-label">Notre salon</span>
			<h2>Un lieu pensé pour votre bien-être</h2>
			<p>
				Situé au cœur d'Ath, L'essenti'elles vous accueille dans un cadre raffiné où chaque détail a
				été pensé pour votre confort. Notre équipe passionnée met son savoir-faire à votre service
				pour vous offrir une expérience unique de beauté et de relaxation.
			</p>
			<p>
				Que vous veniez pour une coupe, un soin du visage, un massage ou une pose d'ongles, nous
				vous garantissons un moment de détente dans une atmosphère chaleureuse et élégante.
			</p>
			<div class="about-details">
				<div class="detail">
					<span class="detail-number">3</span>
					<span class="detail-label">univers de soins</span>
				</div>
				<div class="detail">
					<span class="detail-number">+50</span>
					<span class="detail-label">prestations</span>
				</div>
				<div class="detail">
					<span class="detail-number">5/5</span>
					<span class="detail-label">satisfaction</span>
				</div>
			</div>
		</div>
	</div>
</section>

<Testimonials />

<!-- Hours / Location -->
<section class="hours-section">
	<div class="hours-inner">
		<span class="section-label">Pratique</span>
		<h2>Horaires & Accès</h2>

		<div class="hours-grid">
			<div class="hours-card">
				<h3>Horaires</h3>
				{#each groupHoraires(data.horaires ?? salon.hours) as { label, h }}
					<div class="hour-row">
						<span>{label}</span>
						<span>{h}</span>
					</div>
				{/each}
			</div>

			<div class="hours-card">
				<h3>Adresse</h3>
				<p class="address">{salon.address.street}</p>
				<p class="address">{salon.address.city}</p>
				<p class="address-note">{salon.address.country}</p>
			</div>

			<div class="hours-card">
				<h3>Rendez-vous</h3>
				<p class="rdv-text">Toutes nos prestations se font uniquement sur rendez-vous.</p>
				<a href="tel:{salon.phone.replace(/\s/g, '')}" class="rdv-phone">{salon.phone}</a>
			</div>
		</div>
	</div>
</section>

<BookingBanner />

<style lang="scss">
	@use './lib/styles/mixins' as *;

	/* Photo mosaic band */
	.photo-mosaic {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		height: 200px;

		@include breakpoint('medium') {
			grid-template-columns: repeat(5, 1fr);
			height: 280px;
		}
	}

	.mosaic-img {
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
			filter: saturate(0.85);
		}

		&:hover img {
			transform: scale(1.08);
			filter: saturate(1);
		}

		&:nth-child(4),
		&:nth-child(5) {
			display: none;

			@include breakpoint('medium') {
				display: block;
			}
		}
	}

	/* Ornament */
	.section-ornament {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 3rem 0;
		background: #faf8f5;
	}

	.orn-line {
		width: 60px;
		height: 1px;
		background: #d4ccc0;
	}

	.orn-diamond {
		color: #8b7d6b;
		font-size: 1rem;
	}

	/* About */
	.about-section {
		padding: 6rem 1.5rem;
		position: relative;
		overflow: hidden;

		@include breakpoint('medium') {
			padding: 8rem 3rem;
		}
	}

	.grain-overlay {
		position: absolute;
		inset: 0;
		opacity: 0.03;
		pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
		background-repeat: repeat;
		background-size: 256px;
	}

	.about-inner {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: center;

		@include breakpoint('large') {
			grid-template-columns: 1fr 1fr;
			gap: 6rem;
		}
	}

	.about-image {
		overflow: hidden;
		aspect-ratio: 4/5;
		position: relative;

		img {
			width: 100%;
			height: 120%;
			object-fit: cover;
		}

		.image-frame {
			position: absolute;
			inset: 14px;
			border: 1px solid rgba(139, 125, 107, 0.25);
			pointer-events: none;
		}
	}

	.about-text {
		.section-label {
			font-size: 0.75rem;
			font-weight: 600;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: #8b7d6b;
			display: block;
			margin-bottom: 1rem;
		}

		h2 {
			font-size: clamp(1.8rem, 3.5vw, 2.75rem);
			font-weight: 300;
			color: #1a1a1a;
			margin-bottom: 1.5rem;
		}

		p {
			font-size: 0.95rem;
			line-height: 1.8;
			color: #666;
			margin-bottom: 1rem;
		}
	}

	.about-details {
		display: flex;
		gap: 2.5rem;
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid #e8e3dc;
	}

	.detail {
		display: flex;
		flex-direction: column;
	}

	.detail-number {
		font-family: 'Cormorant Garamond', serif;
		font-size: 2rem;
		font-weight: 500;
		color: #1a1a1a;
	}

	.detail-label {
		font-size: 0.8rem;
		color: #999;
		letter-spacing: 0.05em;
	}

	/* Hours */
	.hours-section {
		padding: 6rem 1.5rem;
		background: #fff;
		text-align: center;

		@include breakpoint('medium') {
			padding: 8rem 3rem;
		}
	}

	.hours-inner {
		max-width: 1100px;
		margin: 0 auto;

		.section-label {
			font-size: 0.75rem;
			font-weight: 600;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: #8b7d6b;
			display: block;
			margin-bottom: 1rem;
		}

		h2 {
			font-size: clamp(1.8rem, 4vw, 2.75rem);
			font-weight: 300;
			color: #1a1a1a;
			margin-bottom: 3.5rem;
		}
	}

	.hours-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(3, 1fr);
			gap: 2rem;
		}
	}

	.hours-card {
		padding: 2.5rem 2rem;
		background: #faf8f5;
		text-align: left;

		h3 {
			font-family: 'Cormorant Garamond', serif;
			font-size: 1.5rem;
			font-weight: 400;
			color: #1a1a1a;
			margin-bottom: 1.5rem;
			padding-bottom: 1rem;
			border-bottom: 1px solid #e8e3dc;
		}
	}

	.hour-row {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		font-size: 0.9rem;
		color: #555;
	}

	.address {
		font-size: 0.95rem;
		color: #555;
		line-height: 1.8;
	}

	.address-note {
		font-size: 0.85rem;
		color: #999;
		margin-top: 0.5rem;
	}

	.rdv-text {
		font-size: 0.9rem;
		color: #555;
		line-height: 1.7;
		margin-bottom: 1.5rem;
	}

	.rdv-phone {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
		color: #1a1a1a;
		font-weight: 500;
		border-bottom: 1px solid #c4bfb6;
		padding-bottom: 2px;
		transition: border-color 0.3s;

		&:hover {
			border-color: #1a1a1a;
		}
	}
</style>
