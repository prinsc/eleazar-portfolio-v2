<script>
	import { testimonials } from '../data.js';
	import { onMount } from 'svelte';

	let current = $state(0);
	let interval;

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('.testimonials-section', {
			opacity: 0,
			y: 60,
			duration: 0.8,
			scrollTrigger: {
				trigger: '.testimonials-section',
				start: 'top 80%'
			}
		});

		interval = setInterval(() => {
			current = (current + 1) % testimonials.length;
		}, 6000);

		return () => clearInterval(interval);
	});

	function goTo(i) {
		current = i;
		clearInterval(interval);
		interval = setInterval(() => {
			current = (current + 1) % testimonials.length;
		}, 6000);
	}
</script>

<section class="testimonials-section">
	<div class="testimonials-inner">
		<span class="section-label">Témoignages</span>
		<h2 class="section-title">Ce que disent nos clientes</h2>

		<div class="testimonial-carousel">
			{#each testimonials as t, i}
				<div class="testimonial" class:active={i === current}>
					<blockquote>
						<span class="quote-mark">"</span>
						<p>{t.text}</p>
					</blockquote>
					<cite>- {t.author}</cite>
				</div>
			{/each}
		</div>

		<div class="dots">
			{#each testimonials as _, i}
				<button
					class="dot"
					class:active={i === current}
					onclick={() => goTo(i)}
					aria-label="Témoignage {i + 1}"
				></button>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use '../styles/mixins' as *;

	.testimonials-section {
		padding: 6rem 1.5rem;
		background: #f3efe9;

		@include breakpoint('medium') {
			padding: 8rem 3rem;
		}
	}

	.testimonials-inner {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.section-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #8b7d6b;
		display: block;
		margin-bottom: 1rem;
	}

	.section-title {
		font-size: clamp(1.8rem, 4vw, 2.75rem);
		font-weight: 300;
		color: #1a1a1a;
		margin-bottom: 3.5rem;
	}

	.testimonial-carousel {
		position: relative;
		min-height: 200px;
	}

	.testimonial {
		position: absolute;
		inset: 0;
		opacity: 0;
		transform: translateY(15px);
		transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		pointer-events: none;
		display: flex;
		flex-direction: column;
		align-items: center;

		&.active {
			opacity: 1;
			transform: translateY(0);
			pointer-events: auto;
			position: relative;
		}
	}

	.quote-mark {
		font-family: 'Cormorant Garamond', serif;
		font-size: 5rem;
		line-height: 0.5;
		color: #d4ccc0;
		display: block;
		margin-bottom: 1rem;
	}

	blockquote p {
		font-family: 'Cormorant Garamond', serif;
		font-size: clamp(1.15rem, 2.5vw, 1.4rem);
		font-weight: 400;
		font-style: italic;
		line-height: 1.8;
		color: #444;
	}

	cite {
		display: block;
		margin-top: 2rem;
		font-style: normal;
		font-size: 0.85rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #8b7d6b;
	}

	.dots {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 2.5rem;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: 1px solid #c4bfb6;
		background: transparent;
		cursor: pointer;
		transition: all 0.3s;
		padding: 0;

		&.active {
			background: #8b7d6b;
			border-color: #8b7d6b;
			transform: scale(1.2);
		}

		&:hover {
			border-color: #8b7d6b;
		}
	}
</style>
