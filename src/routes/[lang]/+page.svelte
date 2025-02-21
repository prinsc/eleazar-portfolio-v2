<script>
	import { ChevronDown, Sun, Moon, ExternalLink } from 'lucide-svelte';
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

	// Fonction pour changer de langue
	function switchLang() {
		isLangSwitched = !isLangSwitched;
		const currentIndex = $settings.langList.indexOf($settings.lang);
		const nextIndex = (currentIndex + 1) % $settings.langList.length;
		$settings.lang = $settings.langList[nextIndex];
		goto(`/${$settings.lang}/`);
	}

	// Fonction pour détecter le thème système initial
	function detectSystemTheme() {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	// Fonction pour appliquer le thème
	function applyTheme(theme) {
		document.documentElement.setAttribute('data-theme', theme);
		isDarkTheme = theme === 'dark';
		settings.update((currentSettings) => ({
			...currentSettings,
			theme: theme
		}));
	}
	// Mise à jour initiale du thème lors du montage
	onMount(async () => {
		isReady = false;
		// Récupère le thème préféré par l'utilisateur depuis localStorage
		const savedTheme = localStorage.getItem('user-theme');
		if (savedTheme) {
			applyTheme(savedTheme); // Applique le thème sauvegardé
		} else {
			// Sinon, applique le thème système
			const systemTheme = detectSystemTheme();
			applyTheme(systemTheme);
		}

		// Ajoute un écouteur pour détecter les changements futurs du thème système
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleThemeChange = () => {
			// Applique le thème système uniquement si l'utilisateur n'a pas choisi manuellement un thème
			if (!localStorage.getItem('user-theme')) {
				const newTheme = mediaQuery.matches ? 'dark' : 'light';
				applyTheme(newTheme);
			}
		};

		mediaQuery.addEventListener('change', handleThemeChange);
		await new Promise((resolve) => setTimeout(resolve, 100)); // Simule un temps de chargement
		isReady = true;
		// Nettoie l'écouteur lors du démontage du composant
		return () => mediaQuery.removeEventListener('change', handleThemeChange);
	});

	// Fonction pour basculer le thème manuellement
	function toggleTheme() {
		const currentTheme = $settings.theme;
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		isDarkTheme = !isDarkTheme;

		// Applique le nouveau thème et met à jour localStorage
		applyTheme(newTheme);
		localStorage.setItem('user-theme', newTheme); // Enregistre le choix de l'utilisateur
	}
</script>

<!-- Né pour coder, programmé pour réussir -->
<!-- 23 ans, la génération du Ctrl + Z -->

<svelte:head>
	<title>{$content.me.h1[$settings.lang]}</title>
	<meta charset="UTF-8" />
	<meta name="author" content="Eléazar Klyuvitkin" />
	<meta name="description" content={$content.site.description[$settings.lang]} />
	<link rel="canonical" href="https://kltk.be/{$settings.lang}" />
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content={isDarkTheme ? '#000' : '#ffffff'} />

	<meta property="og:title" content={$content.me.h1[$settings.lang]} />
	<meta property="og:description" content={$content.site.description[$settings.lang]} />
	<meta property="og:image" content="https://votre-site.com/assets/images/thumbnail.jpg" />
	<meta property="og:url" content="https://votre-site.com" />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={$content.me.h1[$settings.lang]} />
	<meta name="twitter:description" content={$content.site.description[$settings.lang]} />
	<meta name="twitter:image" content="https://votre-site.com/assets/images/thumbnail.jpg" />

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
				<p use:innerHtml={$content.me.description[$settings.lang]}>
					<!-- Autodidacte, je baigne dans le développement web depuis près de 9 ans. J’ai commencé avec la
				création de serveurs Minecraft, appris le Java en développant des plugins, puis enchaîné
				avec des sites web, des boutiques en ligne et des outils pour aider mon père dans son
				activité. Passionné par les défis techniques, j’ai aussi développé des jeux en ligne comme
				Catane et Skyjo. Toujours en avance sur mon apprentissage, j’ai renforcé mon expérience
				professionnelle lors de mon stage et job étudiant chez Webstanz. Je cherche à évoluer dans
				une équipe dynamique où les projets s’enchaînent et ne se ressemblent pas. -->
				</p>
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<address tabindex="0">{$content.me.location[$settings.lang]}</address>
			</div>
		</section>

		<section class="works" class:focused>
			<h2>{$content.site.course[$settings.lang]}</h2>

			{#each $content.school as school}
				<Experience data={school} />
			{/each}

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
			</div>
		</section>

		<section class="projects">
			<h2>{$content.site.projects[$settings.lang]} ({$content.projets.length})</h2>
			<Projets data={$content.projets} />
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
	main {
		max-width: 800px;
		padding: 2rem;
		margin: 0 auto;
	}
	h2 {
		font-weight: 400;
		font-size: 12px;
		text-transform: uppercase;
		margin: 0.8rem 0;
	}
	section,
	header {
		margin: 1rem 0;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0;
		gap: 2rem;
		h2 {
			text-transform: lowercase;
			font-weight: 400;
			line-height: 0.1em;
		}
		@include breakpoint('small') {
			padding: 0 2rem;
			gap: 1rem;
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
				box-shadow: 0 0 0 0 rgba(33, 222, 151, 0.5); /* Ajout d'une ombre pour un effet "halo" */
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
			@keyframes pulseEffect {
				0% {
					transform: scale(1);
					opacity: 1;
					box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.5);
				}
				50% {
					transform: scale(1.2);
					opacity: 0.7;
					box-shadow: 0 0 15px 5px rgba(0, 255, 0, 0.3); /* Élargissement de l'ombre */
				}
				100% {
					transform: scale(1);
					opacity: 1;
					box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.5);
				}
			}
		}
	}
	section.actions {
		height: 25px;
		position: relative;
		display: flex;
		justify-content: flex-end;

		button {
			min-height: 44px;
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
			}
		}
	}

	section.works {
		margin-top: 3rem;
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
			border-radius: 5px;
			overflow: hidden;
			box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);

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
