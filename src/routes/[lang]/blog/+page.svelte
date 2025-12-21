<script>
	import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { settings } from '$lib/stores/settings.js';
	import MetaTags from '$lib/comp/metaTags.svelte';
	import { onMount } from 'svelte';
	import PageContent from '$lib/comp/PageContent.svelte';
	import blogData from '$lib/content/data_blog.json';

	let isReady = $state(false);
	let articles = $state(blogData.articles);

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
		fr: 'Conseils, astuces et guides pratiques pour l\'entretien et le dépannage de vos équipements',
		en: 'Tips, tricks and practical guides for maintaining and troubleshooting your equipment',
		ru: 'Советы, хитрости и практические руководства по обслуживанию и устранению неполадок вашего оборудования'
	};

	const readMoreText = {
		fr: 'Lire l\'article',
		en: 'Read article',
		ru: 'Читать статью'
	};

	const readingTimeText = {
		fr: 'min de lecture',
		en: 'min read',
		ru: 'мин чтения'
	};

	const languageWarning = {
		fr: null, // Pas de message pour le français
		en: 'Most articles are only available in French. We are working on translations.',
		ru: 'Большинство статей доступны только на французском языке. Мы работаем над переводами.'
	};

	// Vérifier si la langue actuelle a des traductions limitées
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
	<div class="loading" aria-label="Chargement en cours">
		<div class="spinner"></div>
	</div>
{:else}
	<PageContent>
		<nav aria-label="Breadcrumb">
			<button class="back-button" onclick={goBack} aria-label="Retour à l'accueil">
				<span class="icon" aria-hidden="true">
					<ArrowLeft />
				</span>
				<span>
					{#if $settings.lang === 'fr'}
						Retour à l'accueil
					{:else if $settings.lang === 'en'}
						Back to home
					{:else}
						Вернуться на главную
					{/if}
				</span>
			</button>
		</nav>

		<header>
			<h1>{pageHeading[$settings.lang]}</h1>
			<p class="intro">{introText[$settings.lang]}</p>
		</header>

		{#if hasLimitedTranslations && languageWarning[$settings.lang]}
			<div class="language-warning" role="alert">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="10"></circle>
					<line x1="12" y1="8" x2="12" y2="12"></line>
					<line x1="12" y1="16" x2="12.01" y2="16"></line>
				</svg>
				<p>{languageWarning[$settings.lang]}</p>
			</div>
		{/if}

		<section class="blog-grid" aria-label="Liste des articles">
			{#each articles as article}
				<article class="article-card grain">
					<button
						class="article-link"
						onclick={() => goToArticle(article.slug)}
						aria-label="Lire l'article {article.title[$settings.lang] || article.title.fr}"
					>
						{#if article.image}
							<div class="article-image">
								<img
									src={article.image}
									alt={article.imageAlt[$settings.lang] || article.imageAlt?.fr || article.title[$settings.lang] || article.title.fr}
									loading="lazy"
								/>
							</div>
						{/if}

						<div class="article-content">
							<div class="article-meta">
								<span class="date">
									<Calendar size={14} />
									{new Date(article.publishDate).toLocaleDateString($settings.lang === 'fr' ? 'fr-BE' : $settings.lang === 'en' ? 'en-GB' : 'ru-RU')}
								</span>
								<span class="reading-time">
									<Clock size={14} />
									{article.readingTime} {readingTimeText[$settings.lang]}
								</span>
							</div>

							<h2>{article.title[$settings.lang] || article.title.fr}</h2>

							<p class="excerpt">{article.excerpt[$settings.lang] || article.excerpt.fr}</p>

							{#if article.tags && article.tags.length > 0}
								<div class="tags">
									<Tag size={14} />
									{#each article.tags.slice(0, 3) as tag}
										<span class="tag">{tag}</span>
									{/each}
								</div>
							{/if}

							<span class="read-more">{readMoreText[$settings.lang]} →</span>
						</div>
					</button>
				</article>
			{/each}
		</section>
	</PageContent>
{/if}

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;
	@use 'lib/styles/utils/_animations' as *;

	.back-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 2rem;
		cursor: pointer;
		font-weight: 500;
		min-height: 44px;
		padding: 0.5rem 1rem;
		transition: opacity 0.2s;

		&:hover {
			opacity: 0.7;
		}

		.icon {
			width: 16px;
			display: inline-flex;
		}
	}

	header {
		margin: 2rem 0 3rem;

		h1 {
			font-size: 2rem;
			font-weight: 700;
			margin-bottom: 1rem;
			line-height: 1.2;

			@include breakpoint('small') {
				font-size: 2.5rem;
			}

			@include breakpoint('medium') {
				font-size: 3rem;
			}
		}

		.intro {
			font-size: 1.15rem;
			opacity: 0.85;
			line-height: 1.6;

			@include breakpoint('small') {
				font-size: 1.25rem;
			}
		}
	}

	.language-warning {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
		background: rgba(255, 193, 7, 0.1);
		border-left: 4px solid #ffc107;
		border-radius: 4px;
		font-size: 0.95rem;
		line-height: 1.5;
		color: var(--color-text);

		svg {
			flex-shrink: 0;
			margin-top: 0.1rem;
			color: #ffc107;
		}

		p {
			margin: 0;
		}
	}

	.blog-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin: 3rem 0;

		@include breakpoint('small') {
			grid-template-columns: repeat(2, 1fr);
		}

		@include breakpoint('medium') {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}
	}

	.article-card {
		overflow: hidden;
		box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		@include borderRadius('xsmall');

		&:hover {
			transform: translateY(-5px);
			box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);

			.article-image img {
				transform: scale(1.05);
			}

			.read-more {
				opacity: 1;
				transform: translateX(5px);
			}
		}
	}

	.article-link {
		display: block;
		width: 100%;
		text-align: left;
		cursor: pointer;
	}

	.article-image {
		width: 100%;
		height: 200px;
		overflow: hidden;
		position: relative;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.3s;
		}
	}

	.article-content {
		padding: 1.5rem;

		h2 {
			font-size: 1.35rem;
			font-weight: 600;
			margin: 1rem 0 0.75rem;
			line-height: 1.3;
		}

		.excerpt {
			opacity: 0.8;
			font-size: 0.95rem;
			line-height: 1.6;
			margin-bottom: 1rem;
		}
	}

	.article-meta {
		display: flex;
		gap: 1.5rem;
		font-size: 0.85rem;
		opacity: 0.7;
		margin-bottom: 0.5rem;

		span {
			display: flex;
			align-items: center;
			gap: 0.35rem;
		}
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		align-items: center;
		margin-top: 1rem;
		font-size: 0.8rem;
		opacity: 0.75;

		.tag {
			background: var(--color-gray-10);
			padding: 0.25rem 0.6rem;
			border-radius: 4px;
			font-size: 0.75rem;
		}
	}

	.read-more {
		display: inline-block;
		margin-top: 1rem;
		font-weight: 600;
		color: var(--color-primary);
		opacity: 0.8;
		transition:
			opacity 0.2s,
			transform 0.2s;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50vh;
	}
</style>
