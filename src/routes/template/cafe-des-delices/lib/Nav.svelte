<script>
	import { page } from '$app/stores';
	import LiveBadge from './LiveBadge.svelte';

	let { sections = {} } = $props();

	const base = '/template/cafe-des-delices';

	const staticLinks = [
		{ href: base, label: 'Maison', exact: true },
		{ href: `${base}/menu`, label: 'Carte' },
		{ href: `${base}/events`, label: 'Événements' }
	];

	const dynamicLinks = [
		{ href: `${base}/galerie`, label: 'Galerie', key: 'galerie' },
		{ href: `${base}/blog`, label: 'Blog', key: 'blog' }
	];

	const links = $derived([...staticLinks, ...dynamicLinks.filter((l) => sections[l.key])]);

	function isActive(href, exact) {
		const p = $page.url.pathname;
		if (exact) return p === href || p === `${href}/`;
		return p.startsWith(href);
	}

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	$effect(() => {
		$page.url.pathname;
		menuOpen = false;
	});

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = menuOpen ? 'hidden' : '';
		}
	});
</script>

<header class="topbar">
	<span class="topbar__left">Grand Place · Ath · Belgique</span>
	<span class="topbar__center"><LiveBadge /></span>
	<span class="topbar__right">Cuisine 12h00 - 14h30 · 18h00 - 22h00</span>
</header>

<nav class="nav" class:nav--open={menuOpen}>
	<a class="brand" href={base}>
		<span class="brand__lg">Le Café</span>
		<em class="brand__it">des</em>
		<span class="brand__lg">Délices</span>
	</a>

	<ul class="links">
		{#each links as l}
			<li>
				<a href={l.href} class:active={isActive(l.href, l.exact)}>{l.label}</a>
			</li>
		{/each}
	</ul>

	<div class="nav__right">
		<a class="cta" href="{base}/reservation" aria-label="Réserver une table">
			<span>Réserver une table</span>
			<svg
				viewBox="0 0 24 24"
				width="14"
				height="14"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				aria-hidden="true"
			>
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
			<span class="burger__line"></span>
			<span class="burger__line"></span>
		</button>
	</div>
</nav>

<!-- Fullscreen mobile menu -->
<div class="fullmenu" class:fullmenu--open={menuOpen} aria-hidden={!menuOpen}>
	<!-- Colonne gauche : déco -->
	<div class="fullmenu__deco" aria-hidden="true">
		<span class="fullmenu__label">Menu</span>
		<div class="fullmenu__rule"></div>
	</div>

	<!-- Colonne droite : liens -->
	<nav class="fullmenu__nav" aria-label="Navigation principale">
		<ul class="fullmenu__list">
			{#each links as l, i}
				<li class="fullmenu__item" style="--i: {i}">
					<a
						href={l.href}
						class="fullmenu__link"
						class:active={isActive(l.href, l.exact)}
						onclick={closeMenu}
					>
						<span class="fullmenu__num">0{i + 1}</span>
						<span class="fullmenu__text">{l.label}</span>
					</a>
				</li>
			{/each}
		</ul>

		<a class="fullmenu__cta" href="{base}/reservation" onclick={closeMenu}>
			<span>Réserver une table</span>
			<svg
				viewBox="0 0 24 24"
				width="16"
				height="16"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				aria-hidden="true"
			>
				<path d="M5 12h14M13 6l6 6-6 6" />
			</svg>
		</a>
	</nav>

	<!-- Bas : infos -->
	<div class="fullmenu__footer">
		<p>Grand Place · Ath · Belgique</p>
		<p>Cuisine 12h - 14h30 · 18h - 22h</p>
	</div>
</div>

<style lang="scss">
	@use './styles/mixins' as *;

	/* ─── TOPBAR ─── */
	.topbar {
		display: none;
		padding: 0.7rem 1rem;
		border-bottom: 1px solid var(--rule);
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--slate-soft);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		background: var(--cream);

		@include breakpoint('medium') {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
			padding: 0.7rem 2rem;
		}
	}
	.topbar__left,
	.topbar__right {
		display: none;
		@include breakpoint('large') {
			display: inline;
		}
	}
	.topbar__center {
		flex: 1;
		text-align: center;
	}

	/* ─── NAV ─── */
	.nav {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--rule);
		background: var(--cream);
		position: sticky;
		top: 0;
		z-index: 60;
		transition:
			background 0.4s ease,
			border-color 0.4s ease;

		@include breakpoint('large') {
			grid-template-columns: 1fr auto 1fr;
			padding: 1.5rem 2rem;
		}

		&--open {
			background: var(--slate);
			border-color: rgba(255, 255, 255, 0.08);

			.brand {
				color: var(--cream);
			}
			.brand__it {
				color: var(--ember-light);
			}
			.cta {
				border-color: rgba(241, 234, 216, 0.3);
				color: var(--cream);
			}
			.cta:hover {
				background: var(--cream);
				color: var(--slate);
			}
		}
	}

	/* ─── BRAND ─── */
	.brand {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 1.2rem;
		letter-spacing: -0.01em;
		text-decoration: none;
		color: var(--slate);
		display: inline-flex;
		gap: 0.35em;
		align-items: baseline;
		transition: color 0.4s ease;
		position: relative;
		z-index: 61;
	}
	.brand__it {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember);
		transition: color 0.4s ease;
	}

	/* ─── DESKTOP LINKS ─── */
	.links {
		list-style: none;
		display: none;
		gap: 2.25rem;
		margin: 0;
		padding: 0;
		justify-content: center;

		@include breakpoint('large') {
			display: flex;
		}
	}
	.links a {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate);
		position: relative;
		padding: 0.3em 0;
		transition: color 0.3s ease;
	}
	.links a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background: var(--ember);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.links a:hover,
	.links a.active {
		color: var(--ember);
	}
	.links a.active::after,
	.links a:hover::after {
		transform: scaleX(1);
	}

	/* ─── NAV RIGHT ─── */
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
		padding: 0.75em 1.25em;
		border: 1px solid var(--slate);
		border-radius: 999px;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate);
		background: transparent;
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.cta:hover {
		background: var(--slate);
		color: var(--cream);
	}
	.cta span {
		display: none;
		@include breakpoint('xsmall') {
			display: inline;
		}
	}

	/* ─── BURGER ─── */
	.burger {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 7px;
		width: 36px;
		height: 36px;
		padding: 4px;
		background: none;
		border: none;
		cursor: pointer;
		flex-shrink: 0;

		@include breakpoint('large') {
			display: none;
		}
	}

	.burger__line {
		display: block;
		height: 1px;
		background: var(--slate);
		transform-origin: center;
		transition:
			transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
			width 0.3s ease;

		.nav--open & {
			background: var(--cream);
		}
	}

	.burger.open .burger__line:nth-child(1) {
		transform: translateY(4px) rotate(45deg);
	}
	.burger.open .burger__line:nth-child(2) {
		transform: translateY(-4px) rotate(-45deg);
	}

	/* ─── FULLSCREEN MENU ─── */
	.fullmenu {
		position: fixed;
		inset: 0;
		z-index: 59;
		background: var(--slate);
		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-columns: 1fr;
		padding: 6rem 1.75rem 2rem;
		gap: 2rem;

		pointer-events: none;
		opacity: 0;
		clip-path: inset(0 0 100% 0);
		transition:
			opacity 0.5s ease,
			clip-path 0.55s cubic-bezier(0.16, 1, 0.3, 1);

		@include breakpoint('large') {
			display: none !important;
		}

		@include breakpoint('medium') {
			grid-template-columns: 180px 1fr;
			grid-template-rows: 1fr auto;
			padding: 7rem 3rem 3rem;
		}

		&--open {
			pointer-events: auto;
			opacity: 1;
			clip-path: inset(0 0 0% 0);
		}
	}

	/* Colonne gauche déco - visible à partir de medium */
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
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: rgba(241, 234, 216, 0.3);
	}

	.fullmenu__rule {
		width: 1px;
		flex: 1;
		max-height: 120px;
		background: rgba(241, 234, 216, 0.12);
	}

	/* Nav principale */
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
		gap: 0;
	}

	.fullmenu__item {
		border-bottom: 1px solid rgba(241, 234, 216, 0.08);
		overflow: hidden;

		transform: translateY(24px);
		opacity: 0;
		transition:
			transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.45s ease;
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
		color: rgba(241, 234, 216, 0.55);
		transition:
			color 0.3s ease,
			gap 0.35s ease;

		&:hover,
		&.active {
			color: var(--cream);
			gap: 1.75rem;
		}

		&.active .fullmenu__text {
			font-style: italic;
			color: var(--ember-light);
		}
	}

	.fullmenu__num {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		color: rgba(241, 234, 216, 0.25);
		flex-shrink: 0;
		line-height: 1;
		position: relative;
		top: -0.1em;

		.fullmenu__link:hover &,
		.fullmenu__link.active & {
			color: var(--ember-light);
		}
	}

	.fullmenu__text {
		font-family: var(--f-display);
		font-size: clamp(2rem, 8vw, 3.5rem);
		font-weight: 300;
		letter-spacing: -0.02em;
		line-height: 1;
		transition:
			color 0.3s ease,
			font-style 0.3s ease;
	}

	/* CTA réservation */
	.fullmenu__cta {
		display: inline-flex;
		align-items: center;
		gap: 0.75em;
		padding: 1em 2em;
		border: 1px solid rgba(241, 234, 216, 0.25);
		border-radius: 999px;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--cream);
		background: transparent;
		align-self: flex-start;
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);

		transform: translateY(16px);
		opacity: 0;
		transition:
			background 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
			color 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.45s,
			opacity 0.4s ease 0.45s;

		.fullmenu--open & {
			transform: translateY(0);
			opacity: 1;
		}

		&:hover {
			background: var(--cream);
			color: var(--slate);
			border-color: var(--cream);
		}
	}

	/* Footer infos */
	.fullmenu__footer {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(241, 234, 216, 0.2);
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		grid-column: 1 / -1;

		transform: translateY(8px);
		opacity: 0;
		transition:
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s,
			opacity 0.4s ease 0.5s;

		.fullmenu--open & {
			transform: translateY(0);
			opacity: 1;
		}

		p {
			margin: 0;
		}
	}
</style>
