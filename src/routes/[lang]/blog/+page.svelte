<script>
	import { Clock, ArrowRight } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { settings } from '$lib/stores/settings.js';
	import MetaTags from '$lib/comp/metaTags.svelte';
	import { onMount } from 'svelte';
	import PageContent from '$lib/comp/PageContent.svelte';
	import LoadingState from '$lib/comp/LoadingState.svelte';
	import blogData from '$lib/content/data_blog.json';

	let isReady = $state(false);
	let articles = $state(blogData.articles);
	let hoveredIndex = $state(-1);

	onMount(async () => {
		isReady = false;
		await new Promise((resolve) => setTimeout(resolve, 100));
		isReady = true;
	});

	function goBack() {
		goto(`/${$settings.lang}/`);
	}

	function goToArticle(slug) {
		goto(`/${$settings.lang}/blog/${slug}`);
	}

	const pageTitle = {
		fr: 'Blog - Conseils Électroménager, Dépannage & Informatique',
		en: 'Blog - Appliance Tips, Troubleshooting & IT',
		ru: 'Блог - Советы по технике, ремонту и ИТ'
	};

	const pageDescription = {
		fr: 'Découvrez nos articles et conseils sur le dépannage électroménager, la réparation informatique et les services techniques dans le Hainaut.',
		en: 'Discover our articles and tips on appliance repair, computer troubleshooting and technical services in Hainaut.',
		ru: 'Откройте для себя наши статьи и советы по ремонту бытовой техники, компьютерному ремонту и техническим услугам в Эно.'
	};

	const pageHeading = {
		fr: 'Blog & Actualités',
		en: 'Blog & News',
		ru: 'Блог и новости'
	};

	const introText = {
		fr: "Conseils, astuces et guides pratiques pour l'entretien et le dépannage de vos équipements",
		en: 'Tips, tricks and practical guides for maintaining and troubleshooting your equipment',
		ru: 'Советы, хитрости и практические руководства по обслуживанию и устранению неполадок вашего оборудования'
	};

	const readMoreText = {
		fr: 'Lire',
		en: 'Read',
		ru: 'Читать'
	};

	const readingTimeText = {
		fr: 'min',
		en: 'min',
		ru: 'мин'
	};

	const languageWarning = {
		fr: null,
		en: 'Most articles are only available in French. We are working on translations.',
		ru: 'Большинство статей доступны только на французском языке. Мы работаем над переводами.'
	};

	let hasLimitedTranslations = $derived($settings.lang !== 'fr');
</script>

<MetaTags
	title={pageTitle[$settings.lang]}
	description={pageDescription[$settings.lang]}
	keywords={$settings.lang === 'fr'
		? 'blog électroménager, conseils dépannage, réparation lave-vaisselle, entretien électroménager, astuces informatique, Ath, Hainaut'
		: $settings.lang === 'en'
			? 'appliance blog, repair tips, dishwasher repair, appliance maintenance, IT tips, Ath, Hainaut'
			: 'блог о технике, советы по ремонту, ремонт посудомоечной машины, обслуживание техники, советы по ИТ, Ат, Эно'}
/>

{#if !isReady}
	<LoadingState />
{:else}
	<PageContent>
		<header class="blog-header">
			<button class="back-link" onclick={goBack}>
				← {$settings.lang === 'fr' ? 'Accueil' : $settings.lang === 'en' ? 'Home' : 'Главная'}
			</button>
			<div class="header-content">
				<h1>{pageHeading[$settings.lang]}</h1>
				<p class="section-label">Journal</p>
				<p class="intro">{introText[$settings.lang]}</p>
			</div>
		</header>

		{#if hasLimitedTranslations && languageWarning[$settings.lang]}
			<div class="language-warning" role="alert">
				<p>{languageWarning[$settings.lang]}</p>
			</div>
		{/if}

		<section class="article-list" aria-label="Liste des articles">
			{#each articles as article, i}
				<button
					class="article-row"
					class:is-hovered={hoveredIndex === i}
					onclick={() => goToArticle(article.slug)}
					onmouseenter={() => (hoveredIndex = i)}
					onmouseleave={() => (hoveredIndex = -1)}
					aria-label="Lire l'article {article.title[$settings.lang] || article.title.fr}"
				>
					<span class="article-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>

					<span class="article-body">
						<span class="article-category"
							>{article.category?.[$settings.lang] || article.category?.fr || 'Guide'}</span
						>
						<span class="article-title">{article.title[$settings.lang] || article.title.fr}</span>
						<span class="article-excerpt"
							>{article.excerpt[$settings.lang] || article.excerpt.fr}</span
						>
					</span>

					<span class="article-aside">
						{#if article.image}
							<span class="article-thumb">
								<img src={article.image} alt="" aria-hidden="true" loading="lazy" />
							</span>
						{/if}
						<span class="article-meta">
							<span class="reading-time">
								<Clock size={11} />
								{article.readingTime}{readingTimeText[$settings.lang]}
							</span>
							<span class="read-cta">
								{readMoreText[$settings.lang]}
								<ArrowRight size={13} />
							</span>
						</span>
					</span>
				</button>
			{/each}
		</section>
	</PageContent>
{/if}

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	.blog-header {
		padding: 2rem 0 3rem;
		border-bottom: 1px solid var(--color-gray-15);
		margin-bottom: 0;

		.back-link {
			display: inline-flex;
			align-items: center;
			gap: 0.4rem;
			font-size: 0.78rem;
			letter-spacing: 0.04em;
			opacity: 0.5;
			cursor: pointer;
			transition: opacity 0.15s;
			margin-bottom: 2.5rem;
			text-transform: uppercase;

			&:hover {
				opacity: 1;
			}
		}

		.header-content {
			display: grid;
			gap: 0.75rem;

			@include breakpoint('medium') {
				grid-template-columns: auto 1fr;
				grid-template-rows: auto auto;
				column-gap: 2.5rem;
				align-items: start;
			}
		}

		.section-label {
			font-size: 0.72rem;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			opacity: 0.4;
			font-weight: 500;
			padding-top: 0.2rem;

			@include breakpoint('medium') {
				grid-row: 1;
				grid-column: 2;
			}
		}

		h1 {
			font-size: clamp(1.8rem, 5vw, 3.2rem) !important;
			font-weight: 700 !important;
			line-height: 1.1 !important;
			letter-spacing: -0.02em;
			margin: 0 !important;

			@include breakpoint('medium') {
				grid-row: 1 / 3;
				grid-column: 1;
			}
		}

		.intro {
			font-size: 0.88rem;
			opacity: 0.55;
			line-height: 1.6;
			max-width: 48ch;
			margin: 0;

			@include breakpoint('medium') {
				grid-row: 2;
				grid-column: 2;
			}
		}
	}

	.language-warning {
		padding: 0.75rem 1rem;
		margin: 1.5rem 0 0;
		border-left: 2px solid var(--color-yellow);
		font-size: 0.82rem;
		opacity: 0.75;

		p {
			margin: 0;
		}
	}

	.article-list {
		display: flex;
		flex-direction: column;
	}

	.article-row {
		display: grid;
		grid-template-columns: 2.5rem 1fr;
		gap: 0 1.25rem;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--color-gray-10);
		cursor: pointer;
		text-align: left;
		width: 100%;
		transition: background 0.15s;
		position: relative;

		@include breakpoint('small') {
			grid-template-columns: 3rem 1fr auto;
			gap: 0 1.5rem;
		}

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: var(--color-gray-05);
			opacity: 0;
			transition: opacity 0.15s;
			pointer-events: none;
			margin: 0 -1.5rem;
		}

		&.is-hovered::before {
			opacity: 1;
		}

		&.is-hovered .article-index {
			color: var(--primary-color-shamrock-600);
		}

		&.is-hovered .article-title {
			text-decoration: underline;
			text-underline-offset: 3px;
			text-decoration-thickness: 1px;
		}

		&.is-hovered .article-thumb img {
			transform: scale(1.05);
		}

		&.is-hovered .read-cta {
			opacity: 1;
			transform: translateX(3px);
		}
	}

	.article-index {
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		opacity: 0.3;
		padding-top: 0.25rem;
		transition:
			color 0.15s,
			opacity 0.15s;
		line-height: 1;
		align-self: start;
		flex-shrink: 0;
	}

	.article-body {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		min-width: 0;
	}

	.article-category {
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--primary-color-shamrock-600);
		font-weight: 500;
	}

	.article-title {
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		font-weight: 600;
		line-height: 1.3;
		color: var(--color-black);
		transition: text-decoration 0.1s;
	}

	.article-excerpt {
		font-size: 0.82rem;
		opacity: 0.55;
		line-height: 1.55;
		display: none;
		max-width: 60ch;

		@include breakpoint('small') {
			display: block;
		}
	}

	.article-aside {
		display: none;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 0.75rem;
		flex-shrink: 0;

		@include breakpoint('small') {
			display: flex;
		}
	}

	.article-thumb {
		width: 80px;
		height: 56px;
		overflow: hidden;
		border-radius: 4px;
		flex-shrink: 0;

		@include breakpoint('medium') {
			width: 100px;
			height: 68px;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.3s ease;
		}
	}

	.article-meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.35rem;
	}

	.reading-time {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.72rem;
		opacity: 0.4;
		letter-spacing: 0.02em;
		white-space: nowrap;
	}

	.read-cta {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--primary-color-shamrock-600);
		opacity: 0.7;
		transition:
			opacity 0.2s,
			transform 0.2s;
		white-space: nowrap;
	}
</style>
