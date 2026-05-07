<!-- Skeleton loader dans le ton — bandes papier crème + accent mauve discret. -->
<script>
	let { variant = 'page' } = $props();
</script>

<div class="skel skel--{variant}" role="status" aria-label="Chargement">
	{#if variant === 'page'}
		<div class="skel-hero">
			<div class="bar bar--display"></div>
			<div class="bar bar--display short"></div>
			<div class="bar bar--meta"></div>
		</div>
		<div class="skel-grid">
			{#each Array(6) as _}
				<div class="card">
					<div class="bar img"></div>
					<div class="bar tiny"></div>
					<div class="bar med"></div>
				</div>
			{/each}
		</div>
	{:else if variant === 'card'}
		<div class="bar img"></div>
		<div class="bar tiny"></div>
		<div class="bar med"></div>
	{:else}
		<div class="bar med"></div>
		<div class="bar short"></div>
	{/if}
</div>

<style lang="scss">
	@use './styles/mixins' as *;

	.skel {
		padding: 4rem 1.25rem;
		@include breakpoint('medium') { padding: 6rem 2.5rem; }
	}
	.skel-hero { margin-bottom: 4rem; }
	.skel-grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr;
		@include breakpoint('medium') { grid-template-columns: repeat(3, 1fr); }
	}
	.bar {
		background: linear-gradient(90deg, var(--base-deep) 0%, rgba(173, 107, 178, 0.12) 50%, var(--base-deep) 100%);
		background-size: 200% 100%;
		animation: shimmer 2.4s ease-in-out infinite;
		border-radius: 2px;
	}
	.bar--display { height: clamp(48px, 9vw, 140px); width: 80%; margin-bottom: 0.5rem; }
	.bar--display.short { width: 50%; }
	.bar--meta { height: 14px; width: 30%; margin-top: 1rem; }
	.bar.img { aspect-ratio: 4 / 3; height: auto; margin-bottom: 0.75rem; }
	.bar.tiny { height: 10px; width: 30%; margin-bottom: 0.4rem; }
	.bar.med { height: 18px; width: 70%; }
	.bar.short { height: 14px; width: 40%; margin-top: 0.5rem; }
	.card { display: block; }
	@keyframes shimmer {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}
	@media (prefers-reduced-motion: reduce) {
		.bar { animation: none; }
	}
</style>
