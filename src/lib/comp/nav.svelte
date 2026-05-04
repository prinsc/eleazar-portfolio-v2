<script>
	import { Sun, Moon } from 'lucide-svelte';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let isDarkTheme = $state($settings.theme === 'dark');
	let isLangSwitched = $state(false);
	let menuOpen = $state(false);

	function detectSystemTheme() {
		if (typeof window === 'undefined') return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function applyTheme(theme) {
		if (typeof document === 'undefined') return;
		document.documentElement.setAttribute('data-theme', theme);
		isDarkTheme = theme === 'dark';
		settings.update((currentSettings) => ({
			...currentSettings,
			theme: theme
		}));
	}

	onMount(() => {
		const savedTheme = localStorage.getItem('user-theme');
		if (savedTheme) {
			applyTheme(savedTheme);
		} else {
			const systemTheme = detectSystemTheme();
			applyTheme(systemTheme);
		}

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleThemeChange = () => {
			if (!localStorage.getItem('user-theme')) {
				const newTheme = mediaQuery.matches ? 'dark' : 'light';
				applyTheme(newTheme);
			}
		};

		mediaQuery.addEventListener('change', handleThemeChange);
		return () => mediaQuery.removeEventListener('change', handleThemeChange);
	});

	function toggleTheme() {
		const currentTheme = $settings.theme;
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		isDarkTheme = !isDarkTheme;
		applyTheme(newTheme);
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('user-theme', newTheme);
		}
	}

	function switchLang() {
		isLangSwitched = !isLangSwitched;
		const currentIndex = $settings.langList.indexOf($settings.lang);
		const nextIndex = (currentIndex + 1) % $settings.langList.length;
		const newLang = $settings.langList[nextIndex];
		const currentPath = $page.url.pathname;
		const pathWithoutLang = currentPath.replace(/^\/(fr|en|ru)/, '');
		$settings.lang = newLang;
		goto(`/${newLang}${pathWithoutLang}`);
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = menuOpen ? 'hidden' : '';
		}
	}

	function closeMenu() {
		menuOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	const navLinks = $derived([
		{ href: `/${$settings.lang}/`, label: 'Eléazar', index: '01' },
		{
			href: `/${$settings.lang}/services`,
			label: $content.site.myServices[$settings.lang],
			index: '02'
		},
		{ href: `/${$settings.lang}/blog`, label: 'Blog', index: '03' },
		{ href: `/template`, label: 'Templates', index: '04' }
	]);
</script>

<nav class="main-nav">
	<div class="nav-container">
		<!-- Desktop logo/links -->
		<div class="logo desktop-only">
			<a class="no-effect name" href={`/${$settings.lang}/`}>Eléazar</a>
			<span class="sep"> • </span>
			<a class="no-effect" href={`/${$settings.lang}/services`}
				>{$content.site.myServices[$settings.lang]}</a
			>
			<span class="sep"> • </span>
			<a class="no-effect" href={`/${$settings.lang}/blog`}>blog</a>
			<span class="sep"> • </span>
			<a class="no-effect" href={`/template`}>templates</a>
		</div>

		<!-- Mobile logo -->
		<div class="logo mobile-only">
			<a class="no-effect name" href={`/${$settings.lang}/`} onclick={closeMenu}>Eléazar</a>
		</div>

		<div class="nav-actions">
			<button
				onclick={toggleTheme}
				class="theme-switcher"
				aria-label={$content.site.arialabel.themeSwitch[$settings.lang]}
			>
				{#if isDarkTheme}
					<span class="icon" transition:fly={{ y: isDarkTheme ? 20 : -20 }}>
						<Sun />
					</span>
				{:else}
					<span class="icon" transition:fly={{ y: isDarkTheme ? -20 : 20 }}>
						<Moon />
					</span>
				{/if}
			</button>

			<button
				onclick={switchLang}
				class="lang-switcher"
				aria-label={$content.site.arialabel.langSwitch[$settings.lang]}
			>
				{#if isLangSwitched}
					<span transition:fly={{ y: isLangSwitched ? 20 : -20 }}>
						{$settings.lang.toUpperCase()}
					</span>
				{:else}
					<span transition:fly={{ y: isLangSwitched ? -20 : 20 }}>
						{$settings.lang.toUpperCase()}
					</span>
				{/if}
			</button>

			<!-- Hamburger button — mobile only -->
			<button
				class="hamburger mobile-only"
				class:is-open={menuOpen}
				onclick={toggleMenu}
				aria-label="Menu"
				aria-expanded={menuOpen}
			>
				<span class="bar bar-1"></span>
				<span class="bar bar-2"></span>
				<span class="bar bar-3"></span>
			</button>
		</div>
	</div>
</nav>

<!-- Mobile fullscreen overlay -->
<div class="mobile-menu" class:is-open={menuOpen} aria-hidden={!menuOpen}>
	<div class="mobile-menu-inner">
		<nav class="mobile-nav" aria-label="Menu principal">
			{#each navLinks as link, i}
				<a
					href={link.href}
					class="mobile-nav-link no-effect"
					style="--delay: {i * 80}ms"
					onclick={closeMenu}
				>
					<span class="link-index">{link.index}</span>
					<span class="link-label">{link.label}</span>
					<span class="link-arrow">→</span>
				</a>
			{/each}
		</nav>

		<div class="mobile-menu-footer">
			<span class="footer-label">© {new Date().getFullYear()} Eléazar</span>
		</div>
	</div>
</div>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	/* ─── NAV BAR ─────────────────────────────────────────── */
	.main-nav {
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		backdrop-filter: blur(10px);
		background: var(--color-white-75);
		border-bottom: 1px solid var(--color-gray-15);

		.nav-container {
			max-width: 800px;
			margin: 0 auto;
			padding: 1rem 2rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.logo {
			cursor: pointer;
			font-size: 1.1rem;
			display: flex;
			align-items: center;
			gap: 1rem;

			.name {
				text-transform: uppercase;
			}

			a:not(.name) {
				text-decoration: underline;
				text-underline-offset: 4px;
			}
		}

		.nav-actions {
			display: flex;
			gap: 0.5rem;
			align-items: center;

			button {
				min-width: 44px;
				min-height: 44px;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				transition: opacity 0.2s;
				border-radius: 8px;

				&:hover {
					opacity: 0.7;
					background: var(--color-gray-10);
				}

				&:not(.hamburger) span {
					position: absolute;
				}

				&.theme-switcher .icon {
					width: 18px;
					display: inline-flex;
				}

				&.lang-switcher {
					font-weight: 600;
					font-size: 0.9rem;
				}
			}
		}
	}

	/* ─── VISIBILITY HELPERS ──────────────────────────────── */
	.desktop-only {
		display: flex !important;

		@media (max-width: 575px) {
			display: none !important;
		}
	}

	.mobile-only {
		display: none !important;

		@media (max-width: 575px) {
			display: flex !important;
		}
	}

	/* ─── HAMBURGER BUTTON ────────────────────────────────── */
	.hamburger {
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 44px;
		height: 44px;
		padding: 10px;
		border-radius: 8px;
		cursor: pointer;
		position: relative;

		.bar {
			display: block;
			width: 50%;
			height: 1.5px;
			background: var(--color-black);
			border-radius: 2px;
			transform-origin: center;
			transition:
				transform 0.35s cubic-bezier(0.76, 0, 0.24, 1),
				opacity 0.25s ease,
				width 0.3s ease;
		}

		.bar-3 {
			width: 40%;
		}
		.bar-1 {
			width: 40%;
		}

		&.is-open {
			background: var(--color-gray-05);
			.bar-1 {
				transform: translateY(6.5px) rotate(45deg);
				width: 100%;
			}
			.bar-2 {
				opacity: 0;
				transform: scaleX(0);
			}
			.bar-3 {
				transform: translateY(-6.5px) rotate(-45deg);
				width: 100%;
			}
		}
	}

	/* ─── MOBILE MENU OVERLAY ─────────────────────────────── */
	.mobile-menu {
		position: fixed;
		inset: 0;
		z-index: 999;
		background: var(--color-white);
		display: none;
		flex-direction: column;
		pointer-events: none;
		clip-path: inset(0 0 100% 0);
		transition: clip-path 0.55s cubic-bezier(0.76, 0, 0.24, 1);

		@media (max-width: 575px) {
			display: flex;
		}

		&.is-open {
			pointer-events: all;
			clip-path: inset(0 0 0% 0);
		}
	}

	.mobile-menu-inner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		padding: 7rem 2rem 3rem;
	}

	/* ─── MOBILE NAV LINKS ────────────────────────────────── */
	.mobile-nav {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.mobile-nav-link {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding: 1.25rem 0;
		border-bottom: 1px solid var(--color-gray-15);
		text-decoration: none;
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms),
			transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms);

		&:first-child {
			border-top: 1px solid var(--color-gray-15);
		}

		.link-index {
			font-size: 10px;
			color: var(--color-gray);
			font-variant-numeric: tabular-nums;
			letter-spacing: 0.05em;
			flex-shrink: 0;
			transition: color 0.2s;
		}

		.link-label {
			font-size: 28px;
			font-weight: 500;
			color: var(--color-black);
			text-transform: uppercase;
			letter-spacing: -0.02em;
			line-height: 1;
			flex: 1;
			transition: color 0.2s;
		}

		.link-arrow {
			font-size: 18px;
			color: var(--color-gray-35);
			opacity: 0;
			transform: translateX(-8px);
			transition:
				opacity 0.2s ease,
				transform 0.2s ease,
				color 0.2s;
		}

		&:hover {
			.link-index,
			.link-label,
			.link-arrow {
				color: var(--primary-color-shamrock-500);
			}
			.link-arrow {
				opacity: 1;
				transform: translateX(0);
			}
		}
	}

	/* État ouvert — géré via JS en ajoutant la classe sur .mobile-menu,
	   mais Svelte scope empêche le sélecteur parent. On utilise :global. */
	:global(.mobile-menu.is-open) .mobile-nav-link {
		opacity: 1;
		transform: translateY(0);
	}

	/* ─── MOBILE MENU FOOTER ──────────────────────────────── */
	.mobile-menu-footer {
		margin-top: auto;
		padding-top: 2rem;
		opacity: 0;
		transform: translateY(12px);
		transition:
			opacity 0.4s ease 350ms,
			transform 0.4s ease 350ms;

		.footer-label {
			font-size: 11px;
			color: var(--color-gray-50);
			letter-spacing: 0.08em;
			text-transform: uppercase;
		}
	}

	:global(.mobile-menu.is-open) .mobile-menu-footer {
		opacity: 1;
		transform: translateY(0);
	}
</style>
