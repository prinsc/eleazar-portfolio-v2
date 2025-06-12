<script>
	import { ChevronDown, Sun, Moon, ExternalLink, Download, MapPin } from 'lucide-svelte';
	import Experience from '$lib/comp/exp.svelte';
	import Projets from '$lib/comp/projects.svelte';
	import formatText from '$lib/utils/formatText';
	import innerHtml from '$lib/utils/innerHtml';
	import { fly, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';
	import { onMount } from 'svelte';

	let focused = $state(false);
	let isDarkTheme = $state($settings.theme === 'dark');
	let isLangSwitched = $state(false);
	let isReady = $state(false);

	function switchLang() {
		isLangSwitched = !isLangSwitched;
		const currentIndex = $settings.langList.indexOf($settings.lang);
		const nextIndex = (currentIndex + 1) % $settings.langList.length;
		$settings.lang = $settings.langList[nextIndex];
		goto(`/${$settings.lang}/`);
	}

	function detectSystemTheme() {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function applyTheme(theme) {
		document.documentElement.setAttribute('data-theme', theme);
		isDarkTheme = theme === 'dark';
		settings.update((currentSettings) => ({
			...currentSettings,
			theme: theme
		}));
	}

	onMount(async () => {
		isReady = false;
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
		await new Promise((resolve) => setTimeout(resolve, 100));
		isReady = true;
		return () => mediaQuery.removeEventListener('change', handleThemeChange);
	});

	function toggleTheme() {
		const currentTheme = $settings.theme;
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		isDarkTheme = !isDarkTheme;

		applyTheme(newTheme);
		localStorage.setItem('user-theme', newTheme);
	}
</script>

<!-- Né pour coder, programmé pour réussir -->
<!-- 23 ans, la génération du Ctrl + Z -->

<svelte:head>
	<title>{$content.me.h1[$settings.lang] || $content.me.h1['en']}</title>
	<meta charset="UTF-8" />
	<meta name="author" content="Eléazar Klyuvitkin" />
	<meta name="description" content={$content.site.description[$settings.lang]} />
	<link rel="canonical" href="https://kltk.be/{$settings.lang}" />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content={isDarkTheme ? '#000' : '#ffffff'} />

	<meta property="og:title" content={$content.me.h1[$settings.lang]} />
	<meta property="og:description" content={$content.site.description[$settings.lang]} />
	<meta property="og:image" content="https://kltk.be/assets/img/banner_meta.png" />
	<meta property="og:url" content="https://kltk.be" />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={$content.me.h1[$settings.lang]} />
	<meta name="twitter:description" content={$content.site.description[$settings.lang]} />
	<meta name="twitter:image" content="https://kltk.be/assets/img/banner_meta.png" />

	<meta
		name="keywords"
		content="développeur front-end, designer ui/ux, svelte, supabase, portfolio, développement web, création de sites interactifs"
	/>

	<link rel="icon" href="/favicon.ico" type="image/x-icon" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

{#if !isReady}
	<div class="loading">
		<div class="spinner"></div>
	</div>
{:else}
	<main>
		<header>
			<div class="element">
				<h1>{$content.me.h1[$settings.lang]}</h1>
				<h2>
					<a
						href="mailto:{$settings.email.address}?subject={$settings.email.subject[
							$settings.lang
						]}&body={$settings.email.body[$settings.lang]}"
						class="no-effect">eleazar@kltk.be</a
					>
				</h2>
			</div>

			<div class="element">
				<a href="https://cal.com/eleazar-kltk-bbheg9" class="no-effect" target="_blank">
					<span class="pulse"></span>
					<span>
						{$content.me.disponibility[$settings.lang]}
					</span>
					<span class="cal">
						[cal
						<span class="icon">
							<ExternalLink />
						</span>]
					</span>
				</a>
			</div>
		</header>

		<section class="actions">
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
		</section>

		<section class="me">
			<div class="left-side">
				<!-- svelte-ignore a11y_img_redundant_alt -->
				<img
					src="/assets/img/photo.webp"
					alt={$content.site.profilePicture[$settings.lang]}
					width="100%"
					height="100%"
				/>
			</div>
			<div class="right-side">
				<h2>{$content.me.h2[$settings.lang]}</h2>
				{#key $settings.lang}
					<p>
						{@html $content.me.description[$settings.lang]}
					</p>
				{/key}
				<!-- Autodidacte, je baigne dans le développement web depuis près de 9 ans. J’ai commencé avec la
				création de serveurs Minecraft, appris le Java en développant des plugins, puis enchaîné
				avec des sites web, des boutiques en ligne et des outils pour aider mon père dans son
				activité. Passionné par les défis techniques, j’ai aussi développé des jeux en ligne comme
				Catane et Skyjo. Toujours en avance sur mon apprentissage, j’ai renforcé mon expérience
				professionnelle lors de mon stage et job étudiant chez Webstanz. Je cherche à évoluer dans
				une équipe dynamique où les projets s’enchaînent et ne se ressemblent pas. -->
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<address tabindex="0">
					<div class="icon">
						<MapPin />
					</div>
					{$content.me.location[$settings.lang]}
				</address>
			</div>
		</section>

		<section class="works" class:focused>
			<h2>{$content.site.course[$settings.lang]}</h2>

			{#each $content.school as school}
				<Experience data={school} />
			{/each}
			<!-- 
			<button
				onclick={() => {
					focused = !focused;
				}}
			>
				<span class="icon">
					<ChevronDown strokeWidth={3} />
				</span>
				<h2>{$content.site.experience[$settings.lang]}</h2>
			</button>

			<div class="sub-element-container">
				{#each $content.exp as exp}
					<Experience data={exp} />
				{/each}
			</div> -->
		</section>

		<section class="projects">
			<h2>{$content.site.projects[$settings.lang]} ({$content.projets.length})</h2>
			<Projets data={$content.projets} />
		</section>

		<section class="works exp" class:focused>
			<button
				onclick={() => {
					focused = !focused;
				}}
			>
				<span class="icon">
					<ChevronDown strokeWidth={3} />
				</span>
				<h2>{$content.site.experience[$settings.lang]} ({$content.exp.length})</h2>
			</button>

			<div class="sub-element-container">
				{#each $content.exp as exp}
					<Experience data={exp} />
				{/each}
			</div>
		</section>

		<section class="resume">
			<a
				class="no-effect grain kl-container"
				href="/assets/Klyuvitkin_Eleazar.pdf"
				target="_blank"
				rel="noopener noreferrer"
			>
				<h2>
					{$content.site.resume[$settings.lang]}<span>.pdf</span>
					<span>({$content.site.resume.resumeOnlyFr[$settings.lang]})</span><br /><span>93.4ko</span
					>
				</h2>

				<div class="icon grain">
					<Download />
				</div>
			</a>
		</section>

		<section class="technos">
			<h2>{$content.site.technologies[$settings.lang]}</h2>
			<div class="cards">
				{#each $content.technos as techno}
					<div class="card grain">
						<div class="icon">
							<img src="/assets/icons/{techno}.svg" alt={techno} width="100%" height="100%" />
						</div>
						<span> {formatText(techno)} </span>
					</div>
				{/each}
			</div>
		</section>

		<div class="divider"></div>

		<section class="socials">
			<h2>{$content.site.socials[$settings.lang]}</h2>
			<div class="container">
				{#each $content.socials as social}
					<a
						class="no-effect"
						href={social.name === 'Email'
							? `mailto:${$settings.email.address}?subject=${encodeURIComponent($settings.email.subject[$settings.lang])}&body=${encodeURIComponent($settings.email.body[$settings.lang])}`
							: social.link}
						target="_blank"
						rel="noopener noreferrer"
						data-umami-event="click-{social.icon}"
					>
						<span class="icon">
							<img
								src={`/assets/icons/${social.icon}.svg`}
								alt={social.name}
								width="100%"
								height="100%"
							/>
						</span>
					</a>
				{/each}
			</div>
		</section>
	</main>
{/if}

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;
	@use 'lib/styles/utils/_animations' as *;

	main {
		max-width: 800px;
		padding: 2rem;
		margin: 0 auto;
	}
	section,
	header {
		margin: 2rem 0;
	}
	header {
		display: flex;
		padding: 0;
		gap: 2rem;
		flex-direction: column-reverse;
		.element {
			width: 100%;
			@include breakpoint('small') {
				width: auto;
			}
		}
		h2 {
			text-transform: lowercase;
			font-weight: 400;
			line-height: 0.1em;
		}
		@include breakpoint('small') {
			padding: 0 2rem;
			flex-direction: row;
			gap: 4rem;
			justify-content: space-between;
			align-items: center;
		}
		a {
			display: flex;
			align-items: center;
			gap: 0.8rem;
			font-weight: 500;
			.pulse {
				display: inline-flex;
				min-width: 6px;
				min-height: 6px;
				border-radius: 50%;
				background-color: rgba(33, 222, 151, 0.8);
				animation: pulseEffect 1.5s infinite ease-in-out;
				box-shadow: 0 0 0 0 rgba(33, 222, 151, 0.5);
			}
			.cal {
				display: flex;
				align-items: center;
				justify-content: center;
				.icon {
					margin-left: 0.25rem;
					width: 12px;
					display: inline-flex;
					opacity: 0.75;
				}
			}
		}
	}
	section.actions {
		position: relative;
		display: flex;
		justify-content: flex-end;
		min-height: 44px;
		margin: 0 !important;

		button {
			min-width: 44px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			span {
				position: absolute;
			}
			&.lang-switcher {
				font-weight: 600;
			}
		}
	}

	section.me {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 2rem;
		margin: 0 !important;
		@include breakpoint('small') {
			flex-direction: row;
		}
		.left-side {
			img {
				border-radius: 50%;
				min-width: 125px;
				width: 125px;
				box-shadow: 5px 5px 10px var(--color-gray-15);
			}
		}
		.right-side {
			h2 {
				font-weight: 600;
				margin-block: 0;
			}
			address {
				margin-top: 1rem;
				font-weight: 600;
				display: flex;
				align-items: center;
				gap: 0.5rem;
				.icon {
					width: 12px;
					display: inline-flex;
				}
			}
		}
	}

	section.resume {
		&:hover {
			.icon {
				transform: scale(0.9);
			}
		}
		a {
			padding: 1rem;
			padding-left: 2rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: row;
			h2 {
				font-weight: 600;
				span {
					font-weight: 400;
					text-transform: lowercase;
					font-size: 0.9em;
					opacity: 0.75;
					&:nth-last-child(1) {
						margin-top: 0.25rem;
						display: block;
					}
				}
			}
			.icon {
				padding: 1rem;
				overflow: hidden;
				transition: transform 0.2s;
				@include borderRadius('small');
			}
		}
	}

	section.works {
		// margin-top: 3rem;
		&.exp {
			margin: -1rem 0 !important;
		}
		&.focused {
			> button {
				.icon {
					transform: rotate(90deg);
				}
			}
			> .sub-element-container {
				height: max-content;
				opacity: 1;
			}
		}
		> button {
			display: flex;
			align-items: center;
			gap: 0.75rem;
			cursor: pointer;
			min-height: 44px;

			.icon {
				transition: transform 0.3s;
				display: inline-flex;
				width: 13px;
			}
		}

		> .sub-element-container {
			padding-left: 3rem;
			position: relative;
			overflow: hidden;
			height: 0;
			opacity: 0;
			transition:
				height 0.5s,
				opacity 0.5s;
			&::before {
				content: '';
				position: absolute;
				left: 0.5rem;
				top: 0;
				width: 2px;
				height: 100%;
				background-color: var(--color-primary);
				border-radius: 100px;
			}
		}
	}

	section.technos {
		.cards {
			display: flex;
			gap: 1rem;
			align-items: center;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.card {
			min-width: 75px;
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;
			padding: 1.5rem;
			overflow: hidden;
			box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);
			@include borderRadius('xsmall');
			&:hover {
				.icon {
					filter: grayscale(0);
				}
			}

			.icon {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 2rem;
				height: 2rem;
				filter: grayscale(1) invert(var(--invert));
				transition: filter 0.1s;
				img {
					height: 100%;
				}
			}

			span {
				opacity: 0.75;
				text-align: center;
				white-space: nowrap;
			}
		}
	}

	section.socials {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: space-between;
		h2 {
			display: inline-flex;
			align-items: center;
		}
		.container {
			display: flex;
			a {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				min-width: 44px;
				min-height: 44px;
				.icon {
					width: 16px;
					max-width: 16px;
					aspect-ratio: 1/1;

					img {
						filter: brightness(1) opacity(0.5) invert(var(--invert));
						transition: filter 0.1s;
					}
				}
				&:hover {
					.icon img {
						filter: brightness(1) opacity(1) invert(var(--invert));
					}
				}
			}
		}
	}
</style>
