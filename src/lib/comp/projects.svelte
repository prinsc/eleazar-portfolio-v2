<script>
	import { settings } from '$lib/stores/settings.js';
	import Card from './Card.svelte';
	import EmblaCarousel from './EmblaCarousel.svelte';
	import { content } from '$lib/stores/content.js';

	let { data = null } = $props();
</script>

<EmblaCarousel dragFree={false}>
	{#each data as projet}
		<div class="item">
			<Card
				title={projet.name}
				description={projet.description[$settings.lang]}
				image={projet.image}
				technos={projet.technos}
				link={projet.link}
				date={projet.date}
				dataUmamiEvent="click-{projet.name.toLowerCase().replace(/ /g, '-')}"
				tooltipContent={projet.link || $content.site.soon[$settings.lang]}
				elementType="a"
			/>
		</div>
	{/each}
</EmblaCarousel>
