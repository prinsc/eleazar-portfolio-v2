<script>
	let {
		children,
		toc = null,
		tocTitle = '',
		activeHeadingId = '',
		onHeadingClick = null
	} = $props();

	let tocExpanded = $state(false);

	function toggleToc() {
		tocExpanded = !tocExpanded;
	}

	function replaceLastSpace(text) {
		const lastSpaceIndex = text.lastIndexOf(' ');
		if (lastSpaceIndex === -1) return text;
		return text.substring(0, lastSpaceIndex) + '\u00A0' + text.substring(lastSpaceIndex + 1);
	}
</script>

<main class="page-content" class:with-toc={toc !== null}>
	{#if toc !== null}
		<div class="content-wrapper">
			<div class="main-content">
				{@render children()}
			</div>

			{#if toc.length > 0}
				<aside class="table-of-contents" class:expanded={tocExpanded}>
					<div class="container">
						<button class="toc-toggle" onclick={toggleToc} aria-expanded={tocExpanded}>
							<h2>{tocTitle}</h2>
							<svg
								class="toggle-icon"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</button>
						<nav class="toc-content">
							<ul>
								{#each toc as heading}
									<li
										class="toc-item level-{heading.level}"
										class:active={activeHeadingId === heading.id}
									>
										<button onclick={() => onHeadingClick?.(heading.id)}>
											{@html replaceLastSpace(heading.text)}
										</button>
									</li>
								{/each}
							</ul>
						</nav>
					</div>
				</aside>
			{/if}
		</div>
	{:else}
		{@render children()}
	{/if}
</main>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	.page-content {
		padding: 2rem;
		margin: 0 auto;

		@include breakpoint('small') {
			padding: 2.5rem;
		}

		@include breakpoint('medium') {
			padding: 3rem;
		}

		&:not(.with-toc) {
			max-width: 800px;
		}

		&.with-toc {
			max-width: 1100px;
		}
	}

	.content-wrapper {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		@include breakpoint('large') {
			flex-direction: row;
			gap: 3rem;
		}
	}

	.main-content {
		flex: 1;
		min-width: 0;
		max-width: 800px;
		width: 100%;
		@include breakpoint('large') {
			max-width: 100%;
		}
	}

	.table-of-contents {
		flex-shrink: 0;
		position: static;
		top: 100px;
		width: 100%;
		order: -1;

		@include breakpoint('large') {
			width: 250px;
			position: sticky;
			margin-bottom: 2rem;
			border: none;
			background: transparent;
		}

		.container {
			padding-right: 1.5rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		.toc-toggle {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: none;
			border: none;
			cursor: pointer;
			padding: 1rem;
			border-bottom: 1px solid var(--color-gray-15);

			@include breakpoint('large') {
				cursor: default;
				pointer-events: none;
				padding: 0;
				border-bottom: 1px solid var(--color-gray-15);
				background: transparent;
				padding-bottom: 1rem;

				&:hover {
					background: transparent;
				}
			}

			h2 {
				font-weight: 600;
				padding-bottom: 0;
				border-bottom: none;
				margin: 0;
			}

			.toggle-icon {
				transition: transform 0.1s ease;
				flex-shrink: 0;

				@include breakpoint('large') {
					display: none;
				}
			}
		}

		&.expanded .toc-toggle .toggle-icon {
			transform: rotate(180deg);
		}

		.toc-content {
			max-height: 0;
			transition: max-height 0.3s ease;
			height: auto;
			overflow: hidden;

			@include breakpoint('large') {
				overflow: unset;
				margin-right: -5px;
				max-height: 75dvh;
			}
			// ici il faut un media query pour la hauteur et non la largeur
			@media (max-height: 300px) {
				height: 40dvh;
			}
			@media (max-height: 500px) {
				height: 50dvh;
			}
			@media (max-height: 600px) {
				height: 65dvh;
			}
		}

		&.expanded .toc-content {
			max-height: 1000px;
		}

		nav ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		.toc-item {
			margin: 0;
			padding: 0;

			button {
				width: 100%;
				text-align: left;
				background: none;
				border: none;
				padding: 0.5rem 0;
				cursor: pointer;
				line-height: 1.4;
				transition: all 0.1s;
				opacity: 0.7;
				color: inherit;
				border-left: 2px solid transparent;
				padding-left: 0.75rem;
				font-size: var(--typo-comment);
				&:hover {
					opacity: 1;
					color: var(--color-primary);
				}
			}

			&.active button {
				opacity: 1;
				// font-weight: 600;
				color: var(--color-primary);
				border-left-color: var(--color-primary);
			}

			&.level-2 button {
				padding-left: 0.75rem;
			}

			&.level-3 button {
				padding-left: 1.5rem;
				font-size: 0.85rem;
			}
		}

		// Style de la scrollbar
		&::-webkit-scrollbar {
			width: 6px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background: var(--color-gray-20);
			border-radius: 3px;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: var(--color-gray-30);
		}
	}
</style>
