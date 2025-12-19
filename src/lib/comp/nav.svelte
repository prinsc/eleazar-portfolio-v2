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

		// Récupérer le chemin actuel sans la langue
		const currentPath = $page.url.pathname;
		const pathWithoutLang = currentPath.replace(/^\/(fr|en|ru)/, '');

		// Mettre à jour la langue
		$settings.lang = newLang;

		// Rediriger vers le même chemin avec la nouvelle langue
		goto(`/${newLang}${pathWithoutLang}`);
	}
</script>

<nav class="main-nav">
	<div class="nav-container">
		<div class="logo">
			<a class="no-effect name" href={`/${$settings.lang}/`}>Eléazar</a>
			<span> • </span>
			<a class="no-effect" href={`/${$settings.lang}/services`}
				>{$content.site.myServices[$settings.lang]}</a
			>
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
		</div>
	</div>
</nav>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

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
					background: var(--color-gray-5);
				}

				span {
					position: absolute;
				}

				&.theme-switcher {
					.icon {
						width: 18px;
						display: inline-flex;
					}
				}

				&.lang-switcher {
					font-weight: 600;
					font-size: 0.9rem;
				}
			}
		}
	}
</style>
