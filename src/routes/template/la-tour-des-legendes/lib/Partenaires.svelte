<script>
	let { partenaires = [] } = $props();
</script>

{#if partenaires?.length}
<section class="part" aria-label="Partenaires">
	<div class="head">
		<span class="line"></span>
		<p class="eye">Avec ✦ le concours ✦ de</p>
		<span class="line"></span>
	</div>

	<div class="logos">
		{#each partenaires as p}
			<a href={p.url} target="_blank" rel="noopener" class="logo" aria-label={p.name}>
				<img src={p.logo} alt={p.name} loading="lazy" />
				<span class="nm">{p.name}</span>
			</a>
		{/each}
	</div>
</section>
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	.part {
		padding: 4rem 1.25rem;
		max-width: 1400px;
		margin: 0 auto;
		@include breakpoint('medium') { padding: 6rem 2.5rem; }
	}
	.head {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 3rem;
		.line { flex: 1; height: 1px; background: var(--rule-strong); }
		.eye {
			font-family: var(--f-mono);
			font-size: 0.78rem;
			letter-spacing: 0.25em;
			text-transform: uppercase;
			color: var(--ink-mute);
		}
	}
	.logos {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		@include breakpoint('small') { grid-template-columns: repeat(3, 1fr); }
		@include breakpoint('large') { grid-template-columns: repeat(6, 1fr); }
	}
	.logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 1.5rem;
		border: 1px solid var(--rule);
		transition: border-color 0.3s, transform 0.3s;
		img {
			width: 100%;
			height: 60px;
			object-fit: contain;
			filter: grayscale(1) opacity(0.6);
			transition: filter 0.3s;
		}
		.nm {
			font-family: var(--f-mono);
			font-size: 0.7rem;
			letter-spacing: 0.16em;
			text-transform: uppercase;
			color: var(--ink-mute);
		}
		&:hover {
			border-color: var(--ink);
			transform: translateY(-2px);
			img { filter: none; }
			.nm { color: var(--ink); }
		}
	}
</style>
