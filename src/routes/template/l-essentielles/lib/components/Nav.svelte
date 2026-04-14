<script>
	import { salon, nav } from '../data.js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let scrolled = $state(false);
	let menuOpen = $state(false);

	// Pages with dark hero images need white nav text initially
	let hasImageHero = $derived(
		$page.url.pathname !== '/template/l-essentielles' &&
		$page.url.pathname !== '/template/l-essentielles/contact'
	);

	onMount(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function toggleMenu() {
		menuOpen = !menuOpen;
		document.body.style.overflow = menuOpen ? 'hidden' : '';
	}

	function closeMenu() {
		menuOpen = false;
		document.body.style.overflow = '';
	}
</script>

<header class:scrolled class:menuOpen class:hero-dark={hasImageHero && !scrolled}>
	<div class="nav-inner">
		<a href="/template/l-essentielles" class="logo" onclick={closeMenu}>
			<span class="logo-text">{salon.name}</span>
		</a>

		<nav class="desktop-nav">
			{#each nav as link}
				<a
					href={link.href}
					class="nav-link"
					class:active={$page.url.pathname === link.href}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<a href="/template/l-essentielles/contact" class="cta-btn desktop-only">Réserver</a>

		<button class="burger" class:open={menuOpen} onclick={toggleMenu} aria-label="Menu">
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
</header>

<!-- Mobile menu overlay -->
{#if menuOpen}
	<div class="mobile-overlay" onclick={closeMenu} role="presentation">
		<nav class="mobile-nav" onclick={(e) => e.stopPropagation()}>
			{#each nav as link, i}
				<a
					href={link.href}
					class="mobile-link"
					class:active={$page.url.pathname === link.href}
					onclick={closeMenu}
					style="animation-delay: {i * 0.08}s"
				>
					{link.label}
				</a>
			{/each}
			<a href="/template/l-essentielles/contact" class="mobile-cta" onclick={closeMenu}>
				Prendre rendez-vous
			</a>
			<p class="mobile-phone">{salon.phone}</p>
		</nav>
	</div>
{/if}

<style lang="scss">
	@use '../styles/mixins' as *;

	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		padding: 1.25rem 1.5rem;
		transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

		@include breakpoint('medium') {
			padding: 1.5rem 3rem;
		}

		/* Always solid on scroll */
		&.scrolled {
			background: rgba(250, 248, 245, 0.95);
			backdrop-filter: blur(20px);
			padding-top: 0.8rem;
			padding-bottom: 0.8rem;
			box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);

			.logo-text,
			.nav-link,
			.cta-btn {
				color: #1a1a1a;
			}

			.nav-link::after {
				background: #1a1a1a;
			}

			.cta-btn {
				border-color: #1a1a1a;

				&:hover {
					background: #1a1a1a;
					color: #faf8f5;
				}
			}

			.burger span {
				background: #1a1a1a;
			}
		}

		/* White text on dark hero images (service pages) */
		&.hero-dark {
			.logo-text {
				color: #fff;
				text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
			}

			.nav-link {
				color: rgba(255, 255, 255, 0.85);

				&:hover,
				&.active {
					color: #fff;
				}

				&::after {
					background: #fff;
				}
			}

			.cta-btn {
				border-color: rgba(255, 255, 255, 0.5);
				color: #fff;

				&:hover {
					background: #fff;
					color: #1a1a1a;
				}
			}

			.burger span {
				background: #fff;
			}
		}

		&.menuOpen {
			background: transparent;
			box-shadow: none;

			.logo-text {
				color: #1a1a1a;
				text-shadow: none;
			}

			.burger span {
				background: #1a1a1a;
			}
		}
	}

	.nav-inner {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		z-index: 1001;
	}

	.logo-text {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		color: #1a1a1a;
		transition: color 0.4s, text-shadow 0.4s;

		@include breakpoint('medium') {
			font-size: 1.75rem;
		}
	}

	.desktop-nav {
		display: none;

		@include breakpoint('large') {
			display: flex;
			gap: 2.5rem;
			align-items: center;
		}
	}

	.nav-link {
		font-size: 0.85rem;
		font-weight: 400;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #555;
		transition: color 0.3s;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			bottom: -4px;
			left: 0;
			width: 0;
			height: 1px;
			background: #1a1a1a;
			transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.3s;
		}

		&:hover,
		&.active {
			color: #1a1a1a;

			&::after {
				width: 100%;
			}
		}
	}

	.cta-btn {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		padding: 0.75rem 2rem;
		border: 1px solid #1a1a1a;
		color: #1a1a1a;
		transition: all 0.3s;

		&:hover {
			background: #1a1a1a;
			color: #faf8f5;
		}
	}

	.desktop-only {
		display: none;

		@include breakpoint('large') {
			display: inline-block;
		}
	}

	/* Burger */
	.burger {
		display: flex;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
		z-index: 1001;

		@include breakpoint('large') {
			display: none;
		}

		span {
			display: block;
			width: 24px;
			height: 1.5px;
			background: #1a1a1a;
			transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
			transform-origin: center;
		}

		&.open span:nth-child(1) {
			transform: translateY(6.5px) rotate(45deg);
		}

		&.open span:nth-child(2) {
			opacity: 0;
		}

		&.open span:nth-child(3) {
			transform: translateY(-6.5px) rotate(-45deg);
		}
	}

	/* Mobile overlay */
	.mobile-overlay {
		position: fixed;
		inset: 0;
		background: rgba(250, 248, 245, 0.98);
		backdrop-filter: blur(30px);
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.3s ease;
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.mobile-link {
		font-family: 'Cormorant Garamond', serif;
		font-size: 2rem;
		font-weight: 400;
		color: #999;
		transition: color 0.3s;
		opacity: 0;
		animation: slideUp 0.5s ease forwards;

		&:hover,
		&.active {
			color: #1a1a1a;
		}
	}

	.mobile-cta {
		margin-top: 1.5rem;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		padding: 1rem 2.5rem;
		border: 1px solid #1a1a1a;
		color: #1a1a1a;
		transition: all 0.3s;
		opacity: 0;
		animation: slideUp 0.5s ease forwards;
		animation-delay: 0.4s;

		&:hover {
			background: #1a1a1a;
			color: #faf8f5;
		}
	}

	.mobile-phone {
		font-size: 0.85rem;
		color: #999;
		letter-spacing: 0.08em;
		margin-top: 0.5rem;
		opacity: 0;
		animation: slideUp 0.5s ease forwards;
		animation-delay: 0.5s;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slideUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
