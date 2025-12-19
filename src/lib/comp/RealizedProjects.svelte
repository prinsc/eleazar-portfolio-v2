<script>
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { fly } from 'svelte/transition';
	import { settings } from '$lib/stores/settings.js';
	import Card from './Card.svelte';
	import { content } from '$lib/stores/content.js';

	let { projects = [] } = $props();

	// Récupérer les projets depuis data.json
	const allProjects = $content.projets || [];

	// Fusionner les projets référencés par ID avec les projets simples
	const displayProjects = $derived(
		projects
			.map((proj) => {
				// Si c'est juste un ID (string), chercher le projet dans data.json
				if (typeof proj === 'string') {
					const foundProject = allProjects.find((p) => p.name === proj);
					if (foundProject) {
						return {
							title: foundProject.name,
							description: foundProject.description[$settings.lang],
							image: foundProject.image,
							technos: foundProject.technos || [],
							link: foundProject.link,
							date: foundProject.date,
							isReference: true
						};
					}
					return null;
				}
				// Si c'est un objet complet (projet simple avec juste une photo)
				return {
					title: proj.name,
					description: proj.description ? proj.description[$settings.lang] : '',
					image: proj.image,
					technos: proj.technos || [],
					link: proj.link,
					date: proj.date,
					isReference: false
				};
			})
			.filter(Boolean)
	);

	let emblaApi;
	let canScrollPrev = $state(false);
	let canScrollNext = $state(true);

	function onInit(event) {
		emblaApi = event.detail;
		updateButtons();
		emblaApi.on('select', updateButtons);
		emblaApi.on('reInit', updateButtons);
	}

	function updateButtons() {
		if (!emblaApi) return;
		canScrollPrev = emblaApi.canScrollPrev();
		canScrollNext = emblaApi.canScrollNext();
	}

	function scrollPrev() {
		if (emblaApi) emblaApi.scrollPrev();
	}

	function scrollNext() {
		if (emblaApi) emblaApi.scrollNext();
	}

	const emblaOptions = {
		align: 'start',
		containScroll: 'trimSnaps',
		dragFree: true
	};
</script>

{#if displayProjects.length > 0}
	<div class="realized-projects">
		<h3>
			{displayProjects.length}
			{displayProjects.length > 1
				? $content.site.realizedProjects?.[$settings.lang] || 'projets réalisés'
				: $content.site.realizedProject?.[$settings.lang] || 'projet réalisé'}
		</h3>
		<div class="slider">
			<div class="embla" use:emblaCarouselSvelte={{ options: emblaOptions }} onemblaInit={onInit}>
				<div class="embla__container">
					{#each displayProjects as project}
						<div class="item">
							<Card
								title={project.title}
								description={project.description}
								image={project.image}
								technos={project.technos}
								link={project.link}
								date={project.date}
								dataUmamiEvent="click-realized-{project.title.toLowerCase().replace(/ /g, '-')}"
								tooltipContent={project.link || $content.site.soon[$settings.lang]}
								elementType="a"
							/>
						</div>
					{/each}
				</div>
			</div>

			{#if canScrollPrev}
				<button
					class="back grain"
					aria-label={$content.site.arialabel.previous[$settings.lang]}
					onclick={scrollPrev}
					transition:fly={{ x: 25 }}
				>
					<span class="icon">
						<ChevronLeft />
					</span>
				</button>
			{/if}

			{#if canScrollNext}
				<button
					class="next grain"
					aria-label={$content.site.arialabel.next[$settings.lang]}
					onclick={scrollNext}
					transition:fly={{ x: -25 }}
				>
					<span class="icon">
						<ChevronRight />
					</span>
				</button>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	.realized-projects {
		margin: 3rem 0;

		h3 {
			font-size: 1.5rem;
			font-weight: 600;
			margin-bottom: 1.5rem;
		}

		.slider {
			position: relative;

			> button {
				position: absolute;
				top: -35px;
				border-radius: 50%;
				overflow: hidden;
				border: solid 1px rgba(0, 0, 0, 0.1);
				cursor: pointer;
				transition: transform 0.1s;
				@include breakpoint('large') {
					position: absolute;
					top: calc(50% - 17.5px);
					border-radius: 50%;
					overflow: hidden;
					border: solid 1px rgba(0, 0, 0, 0.1);
					cursor: pointer;
				}
				&:active {
					transform: scale(0.9);
				}
				.icon {
					display: inline-flex;
					width: 35px;
					height: 35px;
					align-items: center;
					justify-content: center;
				}
				&.back {
					right: 50px;
					@include breakpoint('large') {
						right: initial;
						left: -50px;
					}
				}
				&.next {
					right: 0;
					@include breakpoint('large') {
						right: -50px;
					}
				}
			}

			.embla {
				overflow: hidden;
			}

			.embla__container {
				display: flex;
			}

			.item {
				padding: 1rem;
				flex: 0 0 calc(100%);
				min-width: 0;
				@include borderRadius('xsmall');
				@include breakpoint('small') {
					flex: 0 0 calc(50%);
				}
				@include breakpoint('large') {
					flex: 0 0 calc(30% + 2rem);
				}
				&:nth-child(1) {
					padding-left: 0;
				}
				&:last-child {
					padding-right: 0;
				}
			}
		}
	}
</style>
