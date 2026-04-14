<script>
	import { salon } from '../data.js';
	import { onMount } from 'svelte';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('.booking-banner', {
			opacity: 0,
			y: 40,
			duration: 0.8,
			scrollTrigger: {
				trigger: '.booking-banner',
				start: 'top 85%'
			}
		});
	});
</script>

<section class="booking-banner">
	<div class="banner-inner">
		<div class="banner-deco"></div>
		<h2>Prête à vivre l'expérience ?</h2>
		<p>Réservez votre moment de beauté et de bien-être dès maintenant.</p>
		<div class="banner-actions">
			<a href="/template/l-essentielles/contact" class="btn-light">Prendre rendez-vous</a>
			<a href="tel:{salon.phone.replace(/\s/g, '')}" class="btn-phone">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
				</svg>
				{salon.phone}
			</a>
		</div>
	</div>
</section>

<style lang="scss">
	@use '../styles/mixins' as *;

	.booking-banner {
		padding: 5rem 1.5rem;
		background: #1a1a1a;
		text-align: center;
		position: relative;
		overflow: hidden;

		@include breakpoint('medium') {
			padding: 6rem 3rem;
		}
	}

	.banner-inner {
		max-width: 700px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	.banner-deco {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 400px;
		height: 400px;
		border-radius: 50%;
		border: 1px solid rgba(250, 248, 245, 0.05);
		pointer-events: none;
	}

	h2 {
		font-family: 'Cormorant Garamond', serif;
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 300;
		color: #faf8f5;
		margin-bottom: 1rem;
	}

	p {
		font-size: 0.95rem;
		color: #999;
		line-height: 1.7;
		margin-bottom: 2.5rem;
	}

	.banner-actions {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;

		@include breakpoint('small') {
			flex-direction: row;
			justify-content: center;
		}
	}

	.btn-light {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		padding: 1rem 2.5rem;
		border: 1px solid rgba(250, 248, 245, 0.3);
		color: #faf8f5;
		transition: all 0.3s;

		&:hover {
			background: #faf8f5;
			color: #1a1a1a;
		}
	}

	.btn-phone {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		color: #8b7d6b;
		transition: color 0.3s;

		&:hover {
			color: #faf8f5;
		}
	}
</style>
