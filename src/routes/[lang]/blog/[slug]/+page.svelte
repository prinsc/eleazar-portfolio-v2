<script>
	import { ArrowLeft, Clock, Calendar, Tag, User } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';
	import MetaTags from '$lib/comp/metaTags.svelte';
	import { onMount } from 'svelte';
	import PageContent from '$lib/comp/PageContent.svelte';
	import RealizedProjects from '$lib/comp/RealizedProjects.svelte';
	import blogData from '$lib/content/data_blog.json';

	let isReady = $state(false);
	let activeHeadingId = $state('');

	// Utilisez $derived pour les valeurs calculées
	let article = $derived(blogData.articles.find((a) => a.slug === $page.params.slug));

	let relatedServices = $derived(
		article && article.relatedServices
			? $content.services?.filter((s) => article.relatedServices.includes(s.id)) || []
			: []
	);

	// Extraire les headings pour la table des matières
	let headings = $derived.by(() => {
		if (!article) return [];

		// Utiliser le contenu dans la langue actuelle ou français par défaut
		const content = article.content[$settings.lang] || article.content.fr || [];
		let headingIndex = 0;
		return content
			.map((block, index) => {
				if (block.type === 'heading') {
					const heading = {
						id: `heading-${headingIndex}`,
						text: block.text,
						level: block.level,
						contentIndex: index
					};
					headingIndex++;
					return heading;
				}
				return null;
			})
			.filter(Boolean);
	});

	onMount(async () => {
		isReady = false;
		await new Promise((resolve) => setTimeout(resolve, 100));
		isReady = true;

		// Observer pour détecter quel heading est actuellement visible
		const observerOptions = {
			rootMargin: '-120px 0px -60% 0px',
			threshold: [0, 0.25, 0.5, 0.75, 1]
		};

		let visibleHeadings = new Set();

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					visibleHeadings.add(entry.target.id);
				} else {
					visibleHeadings.delete(entry.target.id);
				}
			});

			// Prendre le premier heading visible
			if (visibleHeadings.size > 0) {
				// Trouver le heading le plus haut dans la page
				const headingElements = Array.from(visibleHeadings)
					.map((id) => document.getElementById(id))
					.filter(Boolean)
					.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

				if (headingElements.length > 0) {
					activeHeadingId = headingElements[0].id;
				}
			}
		}, observerOptions);

		// Attendre que les headings soient rendus
		setTimeout(() => {
			document.querySelectorAll('.article-body h2, .article-body h3').forEach((heading) => {
				observer.observe(heading);
			});
		}, 200);

		return () => observer.disconnect();
	});

	const readingTimeText = {
		fr: 'min de lecture',
		en: 'min read',
		ru: 'мин чтения'
	};

	const faqTitle = {
		fr: 'Questions fréquentes',
		en: 'Frequently Asked Questions',
		ru: 'Часто задаваемые вопросы'
	};

	const relatedServicesTitle = {
		fr: 'Services associés',
		en: 'Related Services',
		ru: 'Связанные услуги'
	};

	function goBack() {
		goto(`/${$settings.lang}/blog`);
	}

	function goToService(serviceId) {
		goto(`/${$settings.lang}/services/${serviceId}`);
	}

	const getStructuredData = () => {
		if (!article) return null;

		const structuredData = {
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: article.title[$settings.lang],
			description: article.metaDescription[$settings.lang],
			image: article.image,
			datePublished: article.publishDate,
			dateModified: article.lastModified || article.publishDate,
			author: {
				'@type': 'Person',
				name: article.author || 'Freelance Web'
			},
			publisher: {
				'@type': 'Organization',
				name: 'Freelance Web',
				logo: {
					'@type': 'ImageObject',
					url: 'https://kltk.be/favicon-32x32.png'
				}
			}
		};

		if (article.faq && article.faq.length > 0) {
			structuredData.mainEntity = {
				'@type': 'FAQPage',
				mainEntity: article.faq.map((item) => ({
					'@type': 'Question',
					name: item.question[$settings.lang],
					acceptedAnswer: {
						'@type': 'Answer',
						text: item.answer[$settings.lang]
					}
				}))
			};
		}

		return structuredData;
	};

	let headingCounter = 0;

	function renderContent(contentBlock) {
		switch (contentBlock.type) {
			case 'paragraph':
				return `<p>${contentBlock.text}</p>`;
			case 'heading':
				const id = `heading-${headingCounter}`;
				headingCounter++;
				return `<h${contentBlock.level} id="${id}">${contentBlock.text}</h${contentBlock.level}>`;
			case 'list':
				return `<ul>${contentBlock.items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
			default:
				return '';
		}
	}

	function scrollToHeading(id) {
		const element = document.getElementById(id);
		if (element) {
			const yOffset = -100; // Offset pour éviter que le titre soit caché sous le header
			const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
	}

	const tocTitle = {
		fr: 'Sommaire',
		en: 'Table of Contents',
		ru: 'Содержание'
	};

	const languageWarning = {
		fr: null, // Pas de message pour le français
		en: 'This article is only available in French. We are working on translations.',
		ru: 'Эта статья доступна только на французском языке. Мы работаем над переводами.'
	};

	// Vérifier si l'article a du contenu dans la langue actuelle
	let hasContentInCurrentLang = $derived(
		article && article.content && article.content[$settings.lang]
	);
	let showLanguageWarning = $derived(
		article && $settings.lang !== 'fr' && !hasContentInCurrentLang
	);
</script>

<svelte:head>
	{#if article && isReady}
		{@html `<script type="application/ld+json">${JSON.stringify(getStructuredData())}</script>`}
	{/if}
</svelte:head>

{#if article}
	<MetaTags
		title={article.title[$settings.lang]}
		description={article.metaDescription[$settings.lang]}
		keywords={article.tags?.join(', ')}
		imageUrl={article.image}
	/>
{/if}

{#if !isReady}
	<div class="loading" aria-label="Chargement en cours">
		<div class="spinner"></div>
	</div>
{:else if !article}
	<PageContent>
		<div class="not-found">
			<h1>Article non trouvé</h1>
			<button class="back-button" onclick={goBack}>Retour au blog</button>
		</div>
	</PageContent>
{:else}
	<PageContent
		toc={headings}
		tocTitle={tocTitle[$settings.lang]}
		{activeHeadingId}
		onHeadingClick={scrollToHeading}
	>
		<nav aria-label="Breadcrumb">
			<button class="back-button" onclick={goBack} aria-label="Retour au blog">
				<span class="icon" aria-hidden="true">
					<ArrowLeft />
				</span>
				<span>
					{#if $settings.lang === 'fr'}
						Retour au blog
					{:else if $settings.lang === 'en'}
						Back to blog
					{:else}
						Вернуться в блог
					{/if}
				</span>
			</button>
		</nav>

		<article class="blog-article">
			{#if showLanguageWarning && languageWarning[$settings.lang]}
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

			<header class="article-header">
				<div class="article-meta">
					<span class="date">
						<Calendar size={16} />
						{new Date(article.publishDate).toLocaleDateString(
							$settings.lang === 'fr' ? 'fr-BE' : $settings.lang === 'en' ? 'en-GB' : 'ru-RU'
						)}
					</span>
					<span class="reading-time">
						<Clock size={16} />
						{article.readingTime}
						{readingTimeText[$settings.lang]}
					</span>
					{#if article.author}
						<span class="author">
							<User size={16} />
							{article.author}
						</span>
					{/if}
				</div>

				<h1>{article.title[$settings.lang]}</h1>

				{#if article.category}
					<div class="category-badge">
						{article.category[$settings.lang]}
					</div>
				{/if}

				{#if article.image}
					<div class="featured-image">
						<img
							src={article.image}
							alt={article.imageAlt[$settings.lang] || article.title[$settings.lang]}
						/>
					</div>
				{/if}
			</header>

			<div class="article-body">
				{#each article.content[$settings.lang] || article.content.fr || [] as contentBlock, index}
					{#if index === 0}{((headingCounter = 0), '')}{/if}
					{@html renderContent(contentBlock)}
				{/each}
			</div>

			{#if article.tags && article.tags.length > 0}
				<div class="article-tags">
					<Tag size={16} />
					<div class="tags-list">
						{#each article.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				</div>
			{/if}

			{#if article.faq && article.faq.length > 0}
				<section class="faq-section">
					<h2>{faqTitle[$settings.lang]}</h2>
					<div class="faq-list">
						{#each article.faq as faqItem}
							<details class="faq-item grain">
								<summary>{faqItem.question[$settings.lang]}</summary>
								<p>{faqItem.answer[$settings.lang]}</p>
							</details>
						{/each}
					</div>
				</section>
			{/if}

			{#if relatedServices.length > 0}
				<section class="related-services">
					<h2>{relatedServicesTitle[$settings.lang]}</h2>
					<div class="services-grid">
						{#each relatedServices as service}
							<a
								class="service-card grain no-effect"
								href="/{$settings.lang}/services/{service.id}"
								aria-label="Découvrir le service {service.name[$settings.lang]}"
							>
								<h3>{service.name[$settings.lang]}</h3>
								<p>{service.tagline[$settings.lang]}</p>
								<span class="learn-more">En savoir plus →</span>
							</a>
						{/each}
					</div>
				</section>
			{/if}

			{#if article.realizedProjects && article.realizedProjects.length > 0}
				<RealizedProjects projects={article.realizedProjects} />
			{/if}
		</article>
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

	.not-found {
		text-align: center;
		padding: 4rem 0;

		h1 {
			margin-bottom: 2rem;
		}
	}

	.language-warning {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		margin-bottom: 2rem;
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

	.article-header {
		margin-bottom: 3rem;

		h1 {
			font-size: 2rem;
			font-weight: 700;
			line-height: 1.2;
			margin: 1.5rem 0;

			@include breakpoint('small') {
				font-size: 2.5rem;
			}
		}

		.article-meta {
			display: flex;
			gap: 1.5rem;
			flex-wrap: wrap;
			font-size: 0.9rem;
			opacity: 0.75;

			span {
				display: flex;
				align-items: center;
				gap: 0.4rem;
			}
		}

		.category-badge {
			display: inline-block;
			background: var(--color-primary);
			color: var(--color-white);
			padding: 0.4rem 0.8rem;
			border-radius: 4px;
			font-size: 0.85rem;
			font-weight: 600;
			margin-bottom: 1.5rem;
		}

		.featured-image {
			width: 100%;
			border-radius: 8px;
			overflow: hidden;
			margin-top: 2rem;

			img {
				width: 100%;
				object-fit: contain;
			}
		}
	}

	.article-body {
		font-size: 1.05rem;
		line-height: 1.8;
		margin-bottom: 3rem;

		:global(h2) {
			font-size: 1.75rem;
			font-weight: 700;
			margin: 2.5rem 0 1.25rem;
			line-height: 1.3;
		}

		:global(h3) {
			font-size: 1.4rem;
			font-weight: 600;
			margin: 2rem 0 1rem;
			line-height: 1.3;
		}

		:global(p) {
			margin-bottom: 1.5rem;
		}

		:global(ul) {
			margin: 1.5rem 0;
			padding-left: 1.5rem;

			:global(li) {
				margin-bottom: 0.75rem;
				padding-left: 0.5rem;
			}
		}

		:global(strong) {
			font-weight: 600;
			color: var(--color-primary);
		}

		:global(a) {
			color: var(--color-primary);
			text-decoration: underline;

			&:hover {
				opacity: 0.8;
			}
		}
	}

	.article-tags {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
		padding: 2rem 0;
		border-top: 1px solid var(--color-gray-15);
		border-bottom: 1px solid var(--color-gray-15);
		margin-bottom: 3rem;

		.tags-list {
			display: flex;
			gap: 0.5rem;
			flex-wrap: wrap;
		}

		.tag {
			background: var(--color-gray-10);
			padding: 0.4rem 0.8rem;
			border-radius: 4px;
			font-size: 0.85rem;
		}
	}

	.faq-section {
		@include borderRadius('small');
		margin-bottom: 3rem;

		h2 {
			font-size: 1.75rem;
			font-weight: 700;
			margin-bottom: 1.5rem;
		}

		.faq-list {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		.faq-item {
			border: 1px solid var(--color-gray-15);
			border-radius: 8px;
			padding: 1rem;
			cursor: pointer;
			overflow: hidden;

			summary {
				font-weight: 600;
				font-size: 1.05rem;
				cursor: pointer;
				list-style: none;
				display: flex;
				align-items: center;
				gap: 0.5rem;

				&::before {
					content: '▶';
					display: inline-block;
					transition: transform 0.2s;
				}
			}

			&[open] summary::before {
				transform: rotate(90deg);
			}

			p {
				margin-top: 1rem;
				padding-left: 1.5rem;
				opacity: 0.85;
				line-height: 1.6;
			}
		}
	}

	.related-services {
		margin-top: 3rem;

		h2 {
			font-size: 1.75rem;
			font-weight: 700;
			margin-bottom: 1.5rem;
		}

		.services-grid {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1.5rem;

			@include breakpoint('small') {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		.service-card {
			padding: 1.5rem;
			text-align: left;
			cursor: pointer;
			transition:
				transform 0.2s,
				box-shadow 0.2s;
			@include borderRadius('xsmall');

			&:hover {
				transform: translateY(-3px);
				box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);

				.learn-more {
					transform: translateX(5px);
				}
			}

			h3 {
				font-size: 1.15rem;
				font-weight: 600;
				margin-bottom: 0.5rem;
			}

			p {
				opacity: 0.8;
				font-size: 0.95rem;
				margin-bottom: 1rem;
			}

			.learn-more {
				display: inline-block;
				font-weight: 600;
				color: var(--color-primary);
				transition: transform 0.2s;
			}
		}
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50vh;
	}
</style>
