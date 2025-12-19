<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';
	import MetaTags from '$lib/comp/metaTags.svelte';
	import {
		ArrowLeft,
		Calendar,
		Euro,
		ExternalLink,
		Code2,
		Palette,
		LayoutGrid,
		Wrench,
		GraduationCap,
		Monitor
	} from 'lucide-svelte';
	import TechnoElement from '$lib/comp/techno/techno_element.svelte';
	import { onMount } from 'svelte';
	import PageContent from '$lib/comp/PageContent.svelte';
	import RealizedProjects from '$lib/comp/RealizedProjects.svelte';

	const iconMap = {
		'code-2': Code2,
		palette: Palette,
		'layout-grid': LayoutGrid,
		wrench: Wrench,
		'graduation-cap': GraduationCap,
		monitor: Monitor
	};

	let service = $state(null);
	let isReady = $state(false);
	let IconComponent = $state(null);

	onMount(() => {
		const serviceId = $page.params.service;
		const foundService = $content.services?.find((s) => s.id === serviceId);

		if (!foundService) {
			goto(`/${$settings.lang}/`);
			return;
		}

		service = foundService;
		IconComponent = foundService.icon ? iconMap[foundService.icon] : null;
		isReady = true;
	});

	function goBack() {
		goto(`/${$settings.lang}/services`);
	}
</script>

{#if service}
	<MetaTags
		title="{service.name[$settings.lang]} à Ath - Hainaut"
		description={service.description[$settings.lang]}
		imageUrl={service.image}
	/>
{/if}
{#if isReady && service}
	<PageContent>
		<button class="back-button" onclick={goBack}>
			<span class="icon">
				<ArrowLeft />
			</span>
			<span>{$content.site.back[$settings.lang]}</span>
		</button>

		<section class="service-header">
			<div class="service-image grain">
				{#if service.image}
					<img src={service.image} alt={service.name[$settings.lang]} width="100%" height="100%" />
				{:else}
					<div class="placeholder"></div>
				{/if}
			</div>

			<div class="service-intro">
				<div class="title-with-icon">
					{#if IconComponent}
						<div class="service-icon">
							<IconComponent />
						</div>
					{/if}
					<h1>{service.name[$settings.lang]}</h1>
				</div>
				<p class="tagline">{service.tagline[$settings.lang]}</p>
			</div>
		</section>

		<section class="service-details">
			<div class="description">
				<h2>{$content.site.description[$settings.lang]}</h2>
				<p>{service.description[$settings.lang]}</p>

				{#if service.longDescription}
					<div class="long-description">
						{#each service.longDescription[$settings.lang].split('\n\n') as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
				{/if}
			</div>

			{#if service.zone}
				<div class="zone-intervention grain">
					<h3>{$content.site.interventionZone[$settings.lang]}</h3>
					<p>{service.zone[$settings.lang]}</p>
				</div>
			{/if}

			{#if service.travelFee}
				<div class="travel-fee-notice grain">
					<p>{service.travelFee[$settings.lang]}</p>
				</div>
			{/if}

			<div class="info-cards">
				<div class="card grain">
					<div class="icon">
						<Euro />
					</div>
					<h3>{$content.site.pricing[$settings.lang]}</h3>
					<p>{service.pricing[$settings.lang]}</p>
				</div>

				<div class="card grain">
					<div class="icon">
						<Calendar />
					</div>
					<h3>{$content.site.duration[$settings.lang]}</h3>
					<p>{service.duration[$settings.lang]}</p>
				</div>
			</div>

			<div class="features">
				<h2>{$content.site.whatsIncluded[$settings.lang]}</h2>
				<ul>
					{#each service.features as feature}
						<li>{feature[$settings.lang]}</li>
					{/each}
				</ul>
			</div>

			{#if service.technos && service.technos.length > 0}
				<div class="technos">
					<h2>{$content.site.technologiesUsed[$settings.lang]}</h2>
					<div class="technos-list">
						{#each service.technos as techno}
							<TechnoElement {techno} />
						{/each}
					</div>
				</div>
			{/if}

			{#if service.realizedProjects && service.realizedProjects.length > 0}
				<RealizedProjects projects={service.realizedProjects} />
			{/if}
		</section>

		<section class="cta">
			<div class="grain kl-container">
				<h2>{$content.site.interestedInService[$settings.lang]}</h2>
				<p>{$content.site.letsDiscuss[$settings.lang]}</p>
				<a
					href="mailto:{$settings.email.address}?subject={encodeURIComponent(
						`${$content.site.inquirySubject[$settings.lang]} - ${service.name[$settings.lang]}`
					)}&body={encodeURIComponent($settings.email.body[$settings.lang])}"
					class="cta-button grain no-effect"
				>
					{$content.site.contactMe[$settings.lang]}
					<span class="icon">
						<ExternalLink />
					</span>
				</a>
			</div>
		</section>
	</PageContent>
{/if}

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	main {
		max-width: 800px;
		padding: 2rem;
		margin: 0 auto;
	}

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

	.service-header {
		margin-bottom: 3rem;

		.service-image {
			width: 100%;
			height: 250px;
			overflow: hidden;
			margin-bottom: 2rem;
			@include borderRadius('small');
			box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);

			@include breakpoint('small') {
				height: 300px;
			}

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			.placeholder {
				width: 100%;
				height: 100%;
				background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-gray-15) 100%);
			}
		}

		.service-intro {
			.title-with-icon {
				display: flex;
				align-items: center;
				gap: 2rem;
				margin-bottom: 2rem;

				.service-icon {
					display: inline-flex;
					padding: 0.75rem;
					background: var(--color-primary);
					color: var(--color-white);
					border-radius: 12px;
					width: 48px;
					height: 48px;
					aspect-ratio: 1/1;
					align-items: center;
					justify-content: center;

					@include breakpoint('small') {
						width: 56px;
						height: 56px;
						padding: 1rem;
					}
				}
			}

			h1 {
				font-size: 2rem;
				font-weight: 700;

				@include breakpoint('small') {
					font-size: 2.5rem;
				}
			}

			.tagline {
				font-size: 1.25rem;
				opacity: 0.8;
				font-weight: 500;
			}
		}
	}

	.service-details {
		.description {
			margin-bottom: 3rem;

			h2 {
				font-size: 1.5rem;
				font-weight: 600;
				margin-bottom: 1rem;
			}

			> p {
				font-size: 1.1rem;
				line-height: 1.8;
				font-weight: 500;
			}

			.long-description {
				margin-top: 2rem;
				padding-top: 2rem;
				border-top: 1px solid var(--color-gray-15);

				p {
					font-size: 1rem;
					line-height: 1.8;
					margin-bottom: 1.5rem;

					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}

		.zone-intervention {
			margin-bottom: 3rem;
			padding: 1.5rem;
			@include borderRadius('small');
			box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);

			h3 {
				font-size: 1.25rem;
				font-weight: 600;
				margin-bottom: 1rem;
			}

			p {
				font-size: 1rem;
				line-height: 1.6;
				opacity: 0.9;
			}
		}

		.travel-fee-notice {
			margin-bottom: 3rem;
			padding: 1.5rem;
			@include borderRadius('small');
			box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);

			p {
				font-size: 1rem;
				line-height: 1.6;
				font-weight: 500;
				margin: 0;
			}
		}

		.info-cards {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;
			margin-bottom: 3rem;

			@include breakpoint('small') {
				grid-template-columns: 1fr 1fr;
			}

			.card {
				padding: 1.5rem;
				@include borderRadius('small');
				box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);

				.icon {
					width: 24px;
					height: 24px;
					margin-bottom: 1rem;
					opacity: 0.7;
				}

				h3 {
					font-size: 0.9rem;
					text-transform: uppercase;
					font-weight: 600;
					opacity: 0.7;
					margin-bottom: 0.5rem;
				}

				p {
					font-size: 1.25rem;
					font-weight: 600;
				}
			}
		}

		.features {
			margin-bottom: 3rem;

			h2 {
				font-size: 1.5rem;
				font-weight: 600;
				margin-bottom: 1rem;
			}

			ul {
				list-style: none;
				padding: 0;

				li {
					padding: 0.75rem 0;
					padding-left: 1.5rem;
					position: relative;
					font-size: 1.05rem;

					&::before {
						content: '✓';
						position: absolute;
						left: 0;
						color: var(--color-green-dark);
						font-weight: 700;
					}
				}
			}
		}

		.technos {
			margin-bottom: 3rem;

			h2 {
				font-size: 1.5rem;
				font-weight: 600;
				margin-bottom: 1rem;
			}

			.technos-list {
				display: flex;
				gap: 1rem;
				flex-wrap: wrap;
			}
		}
	}

	.cta {
		margin: 4rem 0 2rem;

		.kl-container {
			padding: 3rem 2rem;
			text-align: center;
			@include borderRadius('small');
			overflow: hidden;

			h2 {
				font-size: 1.75rem;
				font-weight: 700;
				margin-bottom: 0.5rem;
			}

			p {
				font-size: 1.1rem;
				opacity: 0.8;
				margin-bottom: 2rem;
			}

			.cta-button {
				display: inline-flex;
				align-items: center;
				gap: 0.5rem;
				padding: 1rem 2rem;
				font-weight: 600;
				font-size: 1.1rem;
				@include borderRadius('xsmall');
				transition: transform 0.2s;
				overflow: hidden;
				box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);

				&:hover {
					transform: scale(1.05);
				}

				.icon {
					width: 18px;
					display: inline-flex;
				}
			}
		}
	}
</style>
