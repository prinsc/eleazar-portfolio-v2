<script>
	import { onMount } from 'svelte';
	import { Phone, Menu, X } from 'lucide-svelte';

	const links = [
		{ href: '#prestations', label: 'Prestations' },
		{ href: '#tonnelle', label: 'Tonnelle' },
		{ href: '#chambre', label: "Chambre d'hôte" },
		{ href: '#confiance', label: 'Références' },
		{ href: '#contact', label: 'Contact' }
	];

	let menuOpen = $state(false);
	let scrolled = $state(false);

	function toggleMenu() { menuOpen = !menuOpen; }
	function closeMenu() { menuOpen = false; }

	onMount(() => {
		const onScroll = () => { scrolled = window.scrollY > 40; };
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = menuOpen ? 'hidden' : '';
		}
	});
</script>

<nav class="nav" class:nav--scrolled={scrolled}>
	<a class="brand" href="#top" onclick={closeMenu}>
		<span class="brand__dot" aria-hidden="true"></span>
		<span class="brand__txt">
			<strong>MJM Sonorisation</strong>
			<span class="brand__sub">&amp; Yohan</span>
		</span>
	</a>

	<ul class="links">
		{#each links as l}
			<li><a href={l.href}>{l.label}</a></li>
		{/each}
	</ul>

	<div class="nav__right">
		<a class="tel" href="tel:+32475307333" aria-label="Appeler Yohan">
			<Phone size={14} strokeWidth={2} />
			<span>0475 30 73 33</span>
		</a>
		<a class="cta" href="#contact" onclick={closeMenu}>Demander un devis</a>

		<button
			class="burger"
			onclick={toggleMenu}
			aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
			aria-expanded={menuOpen}
		>
			{#if menuOpen}
				<X size={22} strokeWidth={2} />
			{:else}
				<Menu size={22} strokeWidth={2} />
			{/if}
		</button>
	</div>
</nav>

<div class="fullmenu" class:fullmenu--open={menuOpen} aria-hidden={!menuOpen}>
	<ul class="fullmenu__list">
		{#each links as l, i}
			<li class="fullmenu__item" style="--i: {i}">
				<a href={l.href} onclick={closeMenu}>{l.label}</a>
			</li>
		{/each}
	</ul>

	<div class="fullmenu__foot">
		<a class="fullmenu__cta" href="#contact" onclick={closeMenu}>Demander un devis</a>
		<a class="fullmenu__tel" href="tel:+32475307333">
			<Phone size={16} strokeWidth={2} />
			<span>+32 475 30 73 33</span>
		</a>
	</div>
</div>

<style lang="scss">
	@use './styles/mixins' as *;

	.nav {
		position: fixed;
		top: 0; left: 0; right: 0;
		z-index: 60;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 2rem;
		padding: 1rem 1.25rem;
		background: transparent;
		transition: background 0.3s ease, border-color 0.3s ease, padding 0.3s ease;
		border-bottom: 1px solid transparent;

		@include breakpoint('medium') {
			padding: 1.25rem 2rem;
		}

		&--scrolled {
			background: rgba(18, 20, 23, 0.92);
			backdrop-filter: saturate(140%) blur(10px);
			-webkit-backdrop-filter: saturate(140%) blur(10px);
			border-bottom-color: var(--line);
			padding: 0.85rem 1.25rem;

			@include breakpoint('medium') {
				padding: 0.9rem 2rem;
			}
		}
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: var(--text);
	}
	.brand__dot {
		width: 8px;
		height: 8px;
		background: var(--red);
		border-radius: 50%;
		flex-shrink: 0;
	}
	.brand__txt {
		display: flex;
		flex-direction: column;
		line-height: 1.1;

		strong {
			font-family: var(--f-display);
			font-weight: 700;
			font-size: 1rem;
			letter-spacing: -0.01em;
		}
	}
	.brand__sub {
		font-family: var(--f-body);
		font-size: 0.72rem;
		color: var(--text-soft);
	}

	.links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: none;
		gap: 1.75rem;
		justify-content: center;

		@include breakpoint('large') {
			display: flex;
		}

		a {
			font-family: var(--f-body);
			font-size: 0.875rem;
			font-weight: 500;
			text-decoration: none;
			color: var(--text-soft);
			transition: color 0.2s ease;

			&:hover { color: var(--text); }
		}
	}

	.nav__right {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		justify-self: end;
	}

	.tel {
		display: none;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--f-body);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text);
		text-decoration: none;
		padding: 0.55rem 0.85rem;
		transition: color 0.2s ease;

		@include breakpoint('medium') {
			display: inline-flex;
		}

		:global(svg) { color: var(--red); }

		&:hover { color: var(--red); }
	}

	.cta {
		display: none;
		padding: 0.7rem 1.1rem;
		background: var(--red);
		color: #fff;
		font-family: var(--f-body);
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		border-radius: 4px;
		transition: background 0.2s ease;

		@include breakpoint('medium') {
			display: inline-block;
		}

		&:hover { background: var(--red-deep); }
	}

	.burger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: none;
		border: 1px solid var(--line);
		color: var(--text);
		cursor: pointer;
		border-radius: 4px;

		@include breakpoint('large') {
			display: none;
		}
	}

	.fullmenu {
		position: fixed;
		inset: 0;
		z-index: 59;
		background: var(--bg);
		padding: 6rem 1.5rem 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		opacity: 0;
		pointer-events: none;
		transform: translateY(-8px);
		transition: opacity 0.3s ease, transform 0.3s ease;

		@include breakpoint('large') { display: none !important; }

		&--open {
			opacity: 1;
			pointer-events: auto;
			transform: translateY(0);
		}
	}

	.fullmenu__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.fullmenu__item {
		border-bottom: 1px solid var(--line);

		opacity: 0;
		transform: translateY(10px);
		transition: opacity 0.35s ease, transform 0.4s ease;
		transition-delay: calc(var(--i) * 40ms + 80ms);

		.fullmenu--open & {
			opacity: 1;
			transform: translateY(0);
		}

		a {
			display: block;
			padding: 1.1rem 0;
			font-family: var(--f-display);
			font-weight: 600;
			font-size: 1.6rem;
			text-decoration: none;
			color: var(--text);
		}
	}

	.fullmenu__foot {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding-top: 1.5rem;
	}

	.fullmenu__cta {
		text-align: center;
		padding: 1rem;
		background: var(--red);
		color: #fff;
		font-family: var(--f-body);
		font-size: 0.95rem;
		font-weight: 600;
		text-decoration: none;
		border-radius: 4px;
	}

	.fullmenu__tel {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 0.9rem;
		border: 1px solid var(--line);
		font-family: var(--f-body);
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text);
		text-decoration: none;
		border-radius: 4px;

		:global(svg) { color: var(--red); }
	}
</style>
