<script>
	import { MapPin } from 'lucide-svelte';
	import { settings } from '$lib/stores/settings.js';
	import TechnoElement from '$lib/comp/techno/techno_element.svelte';
	import innerHtml from '$lib/utils/innerHtml';
	export let data = null;
</script>

<div class="grain kl-container">
	<div class="header">
		<div class="left-side">
			<h3>{data.title[$settings.lang]}</h3>
			{#if data.quantity}
				<h4>{data.date[$settings.lang]} <span>{data.quantity[$settings.lang]}</span></h4>
			{:else}
				<h4>{data.date[$settings.lang]}</h4>
			{/if}
		</div>
		<div class="right-side">
			<a
				class="company no-effect"
				href={data.location.url || '#!'}
				target={data.location.url ? '_blank' : undefined}
			>
				{#if data.location.logo}
					<span class="logo">
						<img
							src={data.location.logo}
							alt="Logo de {data.location.name}"
							width="100%"
							height="100%"
						/>
					</span>
				{/if}
				<span class="name">{data.location.name}</span>
			</a>
			{#if data.location.where}
				<span class="where">
					<span class="icon">
						<MapPin />
					</span>
					{data.location.where[$settings.lang]}
				</span>
			{/if}
		</div>
	</div>
	{#key $settings.lang}
		<div class="description">
			{@html data.description[$settings.lang]}
		</div>
	{/key}
	<div class="technos">
		{#each data.technos as techno}
			<TechnoElement {techno} />
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	.kl-container {
		// border-bottom: solid 1px rgba(0, 0, 0, 0.1);
		&:last-child {
			border-bottom: none;
		}

		h3 {
			font-weight: 600;
		}
		.header {
			display: flex;
			justify-content: space-between;
			gap: 1rem;
			h4 {
				font-weight: 300;
				font-size: 12px;
				text-transform: uppercase;
			}
			.left-side {
				display: flex;
				flex-direction: column;
				gap: -0.25rem;
				span {
					font-weight: 600;
					text-transform: lowercase;
					color: var(--color-primary);
					white-space: nowrap;
				}
			}
			.right-side {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				gap: 0.2rem;
				.company {
					display: flex;
					flex-direction: row;
					gap: 0.5rem;
					align-items: center;
					span {
						display: inline-flex;
						font-weight: 500;
						text-align: right;
						&.logo {
							img {
								max-width: 18px;
								@include borderRadius('xsmall');
							}
							display: none;
							padding: 0.25rem;
							@include breakpoint('small') {
								display: inline-flex;
							}
						}
					}
				}
				.where {
					display: flex;
					gap: 0.15rem;
					color: var(--color-gray);
					.icon {
						width: 10px;
						display: inline-flex;
					}
					font-size: 12px;
					font-weight: 500;
					color: var(--color-gray);
				}
			}
		}
		.description {
			:global(p) {
				margin: 0.75rem 0;
			}
		}
		.technos {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
		}
	}
</style>
