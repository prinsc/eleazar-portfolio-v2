<script>
	import { onMount } from 'svelte';

	const base = '/template/mjm-sono';

	const links = [
		{ href: '#prestations', label: 'Prestations', num: '01' },
		{ href: '#telechargements', label: 'Téléchargements', num: '02' },
		{ href: '#tonnelle', label: 'Tonnelle', num: '03' },
		{ href: '#chambre', label: 'Chambre d\'hôte', num: '04' },
		{ href: '#confiance', label: 'Confiance', num: '05' },
		{ href: '#contact', label: 'Contact', num: '06' }
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

<header class="topbar" class:topbar--solid={scrolled}>
	<span class="topbar__left">Ostiches · Belgique · Depuis 30 ans</span>
	<span class="topbar__center">
		<span class="dot"></span>
		<span>Disponible pour votre événement</span>
	</span>
	<span class="topbar__right">GSM · +32 475 30 73 33</span>
</header>

<nav class="nav" class:nav--scrolled={scrolled} class:nav--open={menuOpen}>
	<a class="brand" href={base}>
		<span class="brand__mark">MJM</span>
		<span class="brand__sep"></span>
		<span class="brand__sub">Sonorisation <em>&amp; Yohan</em></span>
	</a>

	<ul class="links">
		{#each links as l}
			<li>
				<a href={l.href}>
					<span class="links__num">{l.num}</span>
					<span class="links__txt">{l.label}</span>
				</a>
			</li>
		{/each}
	</ul>

	<div class="nav__right">
		<a class="cta" href="#contact" aria-label="Demander un devis">
			<span>Devis</span>
			<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
				<path d="M5 12h14M13 6l6 6-6 6" />
			</svg>
		</a>
		<button
			class="burger"
			class:open={menuOpen}
			onclick={toggleMenu}
			aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
			aria-expanded={menuOpen}
		>
			<span></span>
			<span></span>
		</button>
	</div>
</nav>

<div class="fullmenu" class:fullmenu--open={menuOpen} aria-hidden={!menuOpen}>
	<div class="fullmenu__deco" aria-hidden="true">
		<span class="fullmenu__label">Menu</span>
		<div class="fullmenu__rule"></div>
		<span class="fullmenu__label">MJM / 01</span>
	</div>

	<nav class="fullmenu__nav" aria-label="Navigation principale">
		<ul class="fullmenu__list">
			{#each links as l, i}
				<li class="fullmenu__item" style="--i: {i}">
					<a href={l.href} class="fullmenu__link" onclick={closeMenu}>
						<span class="fullmenu__num">{l.num}</span>
						<span class="fullmenu__text">{l.label}</span>
					</a>
				</li>
			{/each}
		</ul>

		<a class="fullmenu__cta" href="#contact" onclick={closeMenu}>
			<span>Demander un devis</span>
			<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
				<path d="M5 12h14M13 6l6 6-6 6" />
			</svg>
		</a>
	</nav>

	<div class="fullmenu__footer">
		<p>337, route de Flobecq · 7804 Ostiches</p>
		<p>contact@mjmsono.be · +32 475 30 73 33</p>
	</div>
</div>

<style lang="scss">
	@use './styles/mixins' as *;

	.topbar {
		display: none;
		padding: 0.7rem 1.5rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--bone-soft);
		position: fixed;
		top: 0; left: 0; right: 0;
		z-index: 50;
		background: var(--void);
		border-bottom: 1px solid var(--rule);
		transition: opacity 0.4s ease, transform 0.4s ease;

		@include breakpoint('medium') {
			display: grid;
			grid-template-columns: 1fr auto 1fr;
			align-items: center;
			gap: 1rem;
		}

		&--solid {
			opacity: 0;
			transform: translateY(-100%);
			pointer-events: none;
		}
	}
	.topbar__left { justify-self: start; }
	.topbar__center {
		display: inline-flex;
		align-items: center;
		gap: 0.65em;
		justify-self: center;
		color: var(--bone);
	}
	.topbar__right { justify-self: end; }
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--gold);
		box-shadow: 0 0 0 3px rgba(201, 169, 107, 0.18);
		animation: pulse 2.4s ease-in-out infinite;
	}
	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.nav {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		padding: 1rem 1.25rem;
		background: transparent;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 60;
		transition: background 0.45s ease, backdrop-filter 0.45s ease, border-color 0.45s ease, padding 0.35s ease, top 0.4s ease;
		border-bottom: 1px solid transparent;

		@include breakpoint('medium') {
			top: 34px;
			padding: 1.25rem 2rem;
		}

		&--scrolled {
			top: 0;
			background: rgba(11, 11, 12, 0.82);
			backdrop-filter: saturate(140%) blur(14px);
			-webkit-backdrop-filter: saturate(140%) blur(14px);
			border-bottom-color: var(--rule);
			padding: 0.85rem 1.25rem;

			@include breakpoint('medium') {
				padding: 0.95rem 2rem;
			}
		}
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		color: var(--bone);
		position: relative;
		z-index: 61;
	}
	.brand__mark {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 1.4rem;
		letter-spacing: -0.02em;
		line-height: 1;
	}
	.brand__sep {
		width: 1px;
		height: 24px;
		background: var(--rule-strong);
	}
	.brand__sub {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--bone-soft);
		line-height: 1.2;
		max-width: 9ch;
	}
	.brand__sub em {
		color: var(--gold);
		font-style: normal;
	}

	.links {
		list-style: none;
		display: none;
		gap: 2rem;
		margin: 0;
		padding: 0;
		justify-content: center;

		@include breakpoint('xlarge') {
			display: flex;
		}
	}
	.links a {
		display: inline-flex;
		align-items: baseline;
		gap: 0.5em;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--bone-soft);
		padding: 0.3em 0;
		transition: color 0.3s ease;
		position: relative;
	}
	.links__num {
		font-size: 9px;
		color: var(--gold);
		opacity: 0.6;
	}
	.links a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background: var(--gold);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.links a:hover { color: var(--bone); }
	.links a:hover::after { transform: scaleX(1); }

	.nav__right {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		justify-self: end;
		position: relative;
		z-index: 61;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		padding: 0.7em 1.2em;
		border: 1px solid var(--rule-strong);
		border-radius: 0;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--bone);
		background: transparent;
		transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.cta:hover {
		background: var(--gold);
		color: var(--void);
		border-color: var(--gold);
	}

	.burger {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		width: 36px;
		height: 36px;
		padding: 4px;
		background: none;
		border: none;
		cursor: pointer;

		@include breakpoint('xlarge') {
			display: none;
		}
	}
	.burger span {
		display: block;
		height: 1px;
		background: var(--bone);
		transform-origin: center;
		transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.burger.open span:nth-child(1) { transform: translateY(3.5px) rotate(45deg); }
	.burger.open span:nth-child(2) { transform: translateY(-3.5px) rotate(-45deg); }

	.fullmenu {
		position: fixed;
		inset: 0;
		z-index: 59;
		background: var(--void);
		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-columns: 1fr;
		padding: 6rem 1.5rem 2rem;
		gap: 2rem;

		pointer-events: none;
		opacity: 0;
		clip-path: inset(0 0 100% 0);
		transition: opacity 0.5s ease, clip-path 0.55s cubic-bezier(0.16, 1, 0.3, 1);

		@include breakpoint('xlarge') {
			display: none !important;
		}

		@include breakpoint('medium') {
			grid-template-columns: 200px 1fr;
			padding: 7rem 3rem 3rem;
		}

		&--open {
			pointer-events: auto;
			opacity: 1;
			clip-path: inset(0 0 0% 0);
		}
	}

	.fullmenu__deco {
		display: none;

		@include breakpoint('medium') {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			padding-top: 0.5rem;
		}
	}
	.fullmenu__label {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--bone-soft);
		opacity: 0.5;
	}
	.fullmenu__rule {
		width: 1px;
		flex: 1;
		max-height: 160px;
		background: var(--rule);
	}

	.fullmenu__nav {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2.5rem;
	}

	.fullmenu__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.fullmenu__item {
		border-bottom: 1px solid var(--rule);
		overflow: hidden;

		transform: translateY(24px);
		opacity: 0;
		transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease;
		transition-delay: calc(var(--i) * 60ms + 80ms);

		.fullmenu--open & {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.fullmenu__link {
		display: flex;
		align-items: baseline;
		gap: 1.25rem;
		padding: 1rem 0;
		text-decoration: none;
		color: var(--bone-soft);
		transition: color 0.3s ease, gap 0.35s ease;

		&:hover {
			color: var(--bone);
			gap: 1.75rem;
		}
	}

	.fullmenu__num {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		color: var(--gold);
		flex-shrink: 0;
		line-height: 1;
		position: relative;
		top: -0.2em;
	}

	.fullmenu__text {
		font-family: var(--f-display);
		font-size: clamp(2rem, 8vw, 3.5rem);
		font-weight: 300;
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.fullmenu__cta {
		display: inline-flex;
		align-items: center;
		gap: 0.75em;
		padding: 1em 2em;
		border: 1px solid var(--gold);
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--gold);
		align-self: flex-start;
		transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);

		transform: translateY(16px);
		opacity: 0;
		transition-delay: 0.45s;

		.fullmenu--open & {
			transform: translateY(0);
			opacity: 1;
		}

		&:hover {
			background: var(--gold);
			color: var(--void);
		}
	}

	.fullmenu__footer {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--bone-soft);
		opacity: 0.5;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		grid-column: 1 / -1;

		p { margin: 0; }
	}
</style>
