<script>
	import { salon } from '../data.js';
	import { onMount } from 'svelte';

	let heroEl;

	onMount(async () => {
		const { gsap } = await import('gsap');

		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		tl.from('.hero-line', {
			y: 120,
			opacity: 0,
			duration: 1.2,
			stagger: 0.15
		})
			.from(
				'.hero-subtitle',
				{
					y: 30,
					opacity: 0,
					duration: 0.8
				},
				'-=0.4'
			)
			.from(
				'.hero-cta',
				{
					y: 20,
					opacity: 0,
					duration: 0.6
				},
				'-=0.3'
			)
			.from(
				'.hero-image',
				{
					scale: 1.15,
					opacity: 0,
					duration: 1.4,
					ease: 'power2.out'
				},
				0.3
			)
			.from(
				'.hero-scroll',
				{
					opacity: 0,
					y: -10,
					duration: 0.6
				},
				'-=0.3'
			);
	});
</script>

<section class="hero" bind:this={heroEl}>
	<div class="hero-content">
		<div class="hero-text">
			<div class="hero-line-wrap">
				<h1 class="hero-line">{salon.name}</h1>
			</div>
			<div class="hero-line-wrap">
				<p class="hero-line hero-accent">{salon.tagline}</p>
			</div>
			<p class="hero-subtitle">{salon.description}</p>
			<div class="hero-cta">
				<a href="/template/l-essentielles/contact" class="btn-primary">Prendre rendez-vous</a>
				<a href="#services" class="btn-secondary">Nos prestations</a>
			</div>
		</div>
		<div class="hero-visual">
			<!-- client: replace with real salon hero image -->
			<div class="hero-image-wrap">
				<img
					class="hero-image"
					src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80"
					alt="L'essenti'elles salon"
				/>
			</div>
			<div class="hero-badge">
				<span class="badge-text">{salon.appointment}</span>
				<span class="badge-phone">{salon.phone}</span>
			</div>
		</div>
	</div>

	<div class="hero-scroll">
		<span class="scroll-line"></span>
		<span class="scroll-text">Découvrir</span>
	</div>
</section>

<style lang="scss">
	@use '../styles/mixins' as *;

	.hero {
		min-height: 100vh;
		padding: 7rem 1.5rem 3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		overflow: hidden;

		@include breakpoint('medium') {
			padding: 8rem 3rem 4rem;
		}
	}

	.hero-content {
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: center;

		@include breakpoint('large') {
			grid-template-columns: 1fr 1fr;
			gap: 5rem;
		}
	}

	.hero-text {
		order: 2;

		@include breakpoint('large') {
			order: 1;
		}
	}

	.hero-line-wrap {
		overflow: hidden;
	}

	h1.hero-line {
		font-family: 'Cormorant Garamond', serif;
		font-size: clamp(2.8rem, 7vw, 5.5rem);
		font-weight: 300;
		line-height: 1.05;
		color: #1a1a1a;
		letter-spacing: -0.02em;
	}

	.hero-accent {
		font-family: 'Cormorant Garamond', serif;
		font-size: clamp(1.1rem, 2.5vw, 1.5rem);
		font-weight: 400;
		font-style: italic;
		color: #8b7d6b;
		margin-top: 0.75rem;
		letter-spacing: 0.02em;
	}

	.hero-subtitle {
		font-size: 0.95rem;
		line-height: 1.8;
		color: #777;
		margin-top: 1.75rem;
		max-width: 480px;
	}

	.hero-cta {
		display: flex;
		gap: 1rem;
		margin-top: 2.5rem;
		flex-wrap: wrap;
	}

	.btn-primary {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		padding: 1rem 2.5rem;
		background: #1a1a1a;
		color: #faf8f5;
		transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

		&:hover {
			background: #333;
			transform: translateY(-2px);
			box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
		}
	}

	.btn-secondary {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		padding: 1rem 2.5rem;
		border: 1px solid #c4bfb6;
		color: #666;
		transition: all 0.3s;

		&:hover {
			border-color: #1a1a1a;
			color: #1a1a1a;
		}
	}

	.hero-visual {
		order: 1;
		position: relative;

		@include breakpoint('large') {
			order: 2;
		}
	}

	.hero-image-wrap {
		overflow: hidden;
		aspect-ratio: 3/4;
		max-height: 70vh;

		@include breakpoint('large') {
			aspect-ratio: 4/5;
			max-height: none;
		}
	}

	.hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-badge {
		position: absolute;
		bottom: -1rem;
		left: -1rem;
		background: #faf8f5;
		padding: 1.25rem 1.75rem;
		box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		@include breakpoint('large') {
			bottom: 2rem;
			left: -3rem;
		}
	}

	.badge-text {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #8b7d6b;
	}

	.badge-phone {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.25rem;
		color: #1a1a1a;
		font-weight: 500;
	}

	.hero-scroll {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;

		@media (max-height: 700px) {
			display: none;
		}
	}

	.scroll-line {
		width: 1px;
		height: 40px;
		background: #c4bfb6;
		animation: scrollPulse 2s ease-in-out infinite;
	}

	.scroll-text {
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #999;
	}

	@keyframes scrollPulse {
		0%,
		100% {
			opacity: 0.3;
			transform: scaleY(0.6);
			transform-origin: top;
		}
		50% {
			opacity: 1;
			transform: scaleY(1);
		}
	}
</style>
