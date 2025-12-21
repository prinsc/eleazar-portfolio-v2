<script>
	import { settings } from '$lib/stores/settings.js';
	import Card from './Card.svelte';
	import EmblaCarousel from './EmblaCarousel.svelte';

	let { data = null } = $props();
</script>

<EmblaCarousel dragFree={false}>
	{#each data as service}
		<div class="item">
			<Card
				title={service.name[$settings.lang]}
				tagline={service.tagline[$settings.lang]}
				description={service.tagline[$settings.lang]}
				image={service.image}
				technos={service.technos}
				pricing={service.pricing[$settings.lang]}
				dataUmamiEvent="click-service-{service.id}"
				elementType="a"
				link={`/${$settings.lang}/services/${service.id}`}
			/>
		</div>
	{/each}
</EmblaCarousel>
