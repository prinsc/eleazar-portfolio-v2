<script>
	import { MapPin } from 'lucide-svelte';
	import tippy from 'svelte-tippy';
	import formatText from '$lib/utils/formatText';
	import 'tippy.js/animations/perspective-subtle.css';

	export let data = null;
</script>

<div class="element grain">
	<div class="header">
		<div class="left-side">
			<h3>{data.title}</h3>
			<h4>{data.date} <span>{data.quantity}</span></h4>
		</div>
		<div class="right-side">
			<div class="company">
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
			</div>
			{#if data.location.where}
				<span class="where">
					<span class="icon">
						<MapPin />
					</span>
					{data.location.where}
				</span>
			{/if}
		</div>
	</div>
	<div class="description">
		{@html data.description}
	</div>
	<div class="technos">
		{#each data.technos as techno}
			<span
				class="techno"
				use:tippy={{
					content: `${formatText(techno)}`,
					placement: 'bottom',
					theme: 'kltk',
					arrow: false,
					animation: 'perspective-subtle'
				}}
			>
				<span class="icon">
					<img src="/assets/icons/{techno}.svg" alt={techno} width="100%" height="100%" />
				</span>
			</span>
		{/each}
	</div>
</div>

<style lang="scss">
	:global(.tippy-box[data-theme='kltk']) {
		background-color: var(--color-white);
		box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
	}
	.element {
		// border-bottom: solid 1px rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
		padding: 2rem;
		border-radius: 10px;
		overflow: hidden;
		&:last-child {
			border-bottom: none;
		}

		h3 {
			font-weight: 600;
		}
		.header {
			display: flex;
			justify-content: space-between;
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
					margin-left: 1rem;
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
						&.logo {
							img {
								border-radius: 5px;
								max-width: 18px;
							}
							padding: 0.25rem;
						}
					}
				}
				.where {
					display: flex;
					gap: 0.15rem;
					.icon {
						width: 10px;
						display: inline-flex;
					}
					font-size: 12px;
					font-weight: 500;
					color: var(--color-gray-dark);
				}
			}
		}
		.description {
			:global(p) {
				margin: 0.75rem 0;
				line-height: 1.4em;
			}
		}
		.technos {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			.techno {
				padding: 0.25rem;
				display: flex;
				align-items: center;
				justify-content: center;
				filter: grayscale(1) opacity(0.75);
				transition:
					filter 0.1s,
					transform 0.1s;
				user-select: none;
				.icon {
					width: 15px;
					aspect-ratio: 1/1;
					display: inline-flex;
					img {
						height: 100%;
					}
				}
				&:hover {
					filter: grayscale(0) opacity(1);
					transform: translateY(-1px);
				}
			}
		}
	}
</style>
