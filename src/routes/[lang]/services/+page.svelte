<script>
	import { ArrowUpRight, ArrowLeft } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';
	import TechnoElement from '$lib/comp/techno/techno_element.svelte';
	import MetaTags from '$lib/comp/metaTags.svelte';
	import { onMount } from 'svelte';
	import PageContent from '$lib/comp/PageContent.svelte';

	let isReady = $state(false);

	onMount(async () => {
		isReady = false;
		await new Promise((resolve) => setTimeout(resolve, 100));
		isReady = true;
	});

	function navigateToService(serviceId) {
		goto(`/${$settings.lang}/services/${serviceId}`);
	}

	function goBack() {
		goto(`/${$settings.lang}/`);
	}

	const pageTitle = {
		fr: 'Services Web & Informatiques - Développement, Design & Dépannage',
		en: 'Web & IT Services - Development, Design & Technical Support',
		ru: 'Веб и IT услуги - Разработка, Дизайн и Техподдержка'
	};

	const pageDescription = {
		fr: 'Services professionnels : création de sites web sur mesure, boutiques Shopify, design graphique, formation développement web, assistance informatique et dépannage électroménager. Devis gratuit.',
		en: 'Professional services: custom website creation, Shopify stores, graphic design, web development training, IT support and appliance repair. Free quote.',
		ru: 'Профессиональные услуги: создание сайтов на заказ, магазины Shopify, графический дизайн, обучение веб-разработке, IT-поддержка и ремонт техники. Бесплатная оценка.'
	};

	const pageHeading = {
		fr: 'Mes services',
		en: 'My Services',
		ru: 'Мои услуги'
	};

	const introText = {
		fr: 'Solutions complètes pour votre présence digitale et vos besoins techniques',
		en: 'Complete solutions for your digital presence and technical needs',
		ru: 'Комплексные решения для вашего цифрового присутствия и технических потребностей'
	};

	const servicesCountText = {
		fr: 'services disponibles pour vous accompagner',
		en: 'services available to support you',
		ru: 'доступных услуг для вашей поддержки'
	};

	// Données structurées JSON-LD pour le SEO
	const getStructuredData = () => {
		const services =
			$content.services?.map((service) => ({
				'@type': 'Service',
				name: service.name[$settings.lang],
				description: service.tagline[$settings.lang],
				provider: {
					'@type': 'Organization',
					name: 'Votre Entreprise' // Remplacez par votre nom
				},
				areaServed: 'BE', // Belgique - ajustez selon votre zone
				offers: {
					'@type': 'Offer',
					price: service.pricing[$settings.lang],
					priceCurrency: 'EUR'
				}
			})) || [];

		return {
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			itemListElement: services.map((service, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				item: service
			}))
		};
	};
</script>

<svelte:head>
	{#if isReady}
		<script type="application/ld+json">
            {JSON.stringify(getStructuredData())}
		</script>
	{/if}
</svelte:head>

<MetaTags
	title={pageTitle[$settings.lang]}
	description={pageDescription[$settings.lang]}
	keywords={$settings.lang === 'fr'
		? 'développement web, création site internet, boutique Shopify, design graphique, formation web, assistance informatique, dépannage PC, réparation électroménager, développeur freelance'
		: $settings.lang === 'en'
			? 'web development, website creation, Shopify store, graphic design, web training, IT support, PC repair, appliance repair, freelance developer'
			: 'веб-разработка, создание сайтов, магазин Shopify, графический дизайн, обучение веб, IT поддержка, ремонт ПК, ремонт техники'}
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
			<p class="subtitle">
				<strong>{$content.services?.length || 0}</strong>
				{servicesCountText[$settings.lang]}
			</p>
		</header>

		<section class="services-grid" aria-label="Liste des services">
			{#if $content.services}
				{#each $content.services as service, index}
					<article class="service-card-wrapper">
						<button
							class="grain no-effect service-card"
							onclick={() => navigateToService(service.id)}
							data-umami-event="click-service-{service.id}"
							aria-label="Découvrir le service {service.name[$settings.lang]}"
						>
							<div class="image">
								{#if service.image}
									<img
										src={service.image}
										alt="{service.name[$settings.lang]} - {service.tagline[$settings.lang]}"
										width="400"
										height="200"
										loading={index < 4 ? 'eager' : 'lazy'}
									/>
								{:else}
									<div class="placeholder" role="img" aria-label="Image de service"></div>
								{/if}
							</div>
							<div class="container">
								<span class="icon" aria-hidden="true">
									<ArrowUpRight />
								</span>
								<h2>{service.name[$settings.lang]}</h2>
								{#key $settings.lang}
									<p class="tagline">{service.tagline[$settings.lang]}</p>
								{/key}

								<div class="pricing">
									<span
										class="price"
										itemprop="offers"
										itemscope
										itemtype="https://schema.org/Offer"
									>
										<meta itemprop="priceCurrency" content="EUR" />
										<span itemprop="price">{service.pricing[$settings.lang]}</span>
									</span>
								</div>

								{#if service.technos && service.technos.length > 0}
									<div class="technos" aria-label="Technologies utilisées">
										{#each service.technos as techno}
											<TechnoElement {techno} />
										{/each}
									</div>
								{/if}
							</div>
						</button>
					</article>
				{/each}
			{/if}
		</section>

		<aside class="cta-section grain">
			<h2>
				{#if $settings.lang === 'fr'}
					Besoin d'un service personnalisé ?
				{:else if $settings.lang === 'en'}
					Need a custom service?
				{:else}
					Нужна индивидуальная услуга?
				{/if}
			</h2>
			<p>
				{#if $settings.lang === 'fr'}
					Contactez-moi pour discuter de votre projet et obtenir un devis gratuit adapté à vos
					besoins.
				{:else if $settings.lang === 'en'}
					Contact me to discuss your project and get a free quote tailored to your needs.
				{:else}
					Свяжитесь со мной, чтобы обсудить ваш проект и получить бесплатную оценку.
				{/if}
			</p>
			<a href="tel:+32485700737" class="no-effect grain action-button primary"> +32 485 700 737 </a>
		</aside>
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
			margin-bottom: 1rem;
			line-height: 1.6;

			@include breakpoint('small') {
				font-size: 1.25rem;
			}
		}

		.subtitle {
			font-size: 1rem;
			opacity: 0.75;
			font-weight: 400;

			strong {
				font-weight: 700;
				color: var(--color-primary);
			}
		}
	}

	.services-grid {
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

		.service-card-wrapper {
			.service-card {
				width: 100%;
				text-align: left;
				box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);
				overflow: hidden;
				display: flex;
				flex-direction: column;
				cursor: pointer;
				transition:
					transform 0.2s,
					box-shadow 0.2s;
				@include borderRadius('xsmall');

				&:hover {
					transform: translateY(-5px);
					box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.1);

					.container .technos {
						height: auto;
						opacity: 1;
						&:has(.techno) {
							margin-top: 0.5rem;
						}
					}
				}

				h2 {
					font-size: 1.25rem;
					max-width: 80%;
					font-weight: 600;
					margin: 0;
				}

				.tagline {
					opacity: 0.8;
					font-size: 0.95rem;
					margin-top: 0.5rem;
					line-height: 1.5;
				}

				.pricing {
					margin-top: 1rem;
					.price {
						font-weight: 600;
						font-size: 1.1rem;
						color: var(--color-primary);
					}
				}

				.image {
					width: 100%;
					height: 200px;
					position: relative;

					&::before {
						content: '';
						position: absolute;
						z-index: 1;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}

					img {
						object-fit: cover;
						width: 100%;
						height: 100%;
					}

					.placeholder {
						width: 100%;
						height: 100%;
						background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-gray-15) 100%);
					}
				}

				.container {
					padding: 1.25rem;
					position: relative;

					> .icon {
						top: 12px;
						right: 12px;
						width: 14px;
						position: absolute;
					}

					.technos {
						display: flex;
						gap: 0.6rem;
						flex-wrap: wrap;
						justify-content: flex-end;
						height: 0;
						overflow: hidden;
						opacity: 0;
						transition:
							margin-top 0.5s,
							height 0.5s,
							opacity 0.5s;
					}
				}
			}
		}
	}

	.cta-section {
		padding: 2rem;
		@include borderRadius('small');
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		h2 {
			font-size: 1.5rem;
			font-weight: 600;
		}

		p {
			opacity: 0.85;
			max-width: 600px;
			margin: 0 auto;
		}
		.action-button {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			padding: 0.5rem 4rem;
			font-weight: 600;
			cursor: pointer;
			min-height: 44px;
			@include borderRadius('xsmall');

			.icon {
				width: 18px;
				display: inline-flex;
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
