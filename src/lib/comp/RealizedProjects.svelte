<script>
	import { settings } from '$lib/stores/settings.js';
	import Card from './Card.svelte';
	import EmblaCarousel from './EmblaCarousel.svelte';
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
</script>

{#if displayProjects.length > 0}
	<div class="realized-projects">
		<h3>
			{displayProjects.length}
			{displayProjects.length > 1
				? $content.site.realizedProjects?.[$settings.lang] || 'projets réalisés'
				: $content.site.realizedProject?.[$settings.lang] || 'projet réalisé'}
		</h3>
		<EmblaCarousel dragFree={false} speed={10}>
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
						target="_blank"
					/>
				</div>
			{/each}
		</EmblaCarousel>
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
	}
</style>
