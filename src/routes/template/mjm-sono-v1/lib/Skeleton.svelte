<script>
	let { variant = 'home' } = $props();
</script>

<style lang="scss">
	@use './styles/mixins' as *;

	@keyframes shimmer {
		0% { background-position: -600px 0; }
		100% { background-position: 600px 0; }
	}

	.sk {
		background: var(--line);
		background-image: linear-gradient(
			90deg,
			rgba(237, 232, 232, 0) 0%,
			rgba(237, 232, 232, 0.08) 50%,
			rgba(237, 232, 232, 0) 100%
		);
		background-size: 600px 100%;
		background-repeat: no-repeat;
		animation: shimmer 1.6s ease-in-out infinite;
		display: block;
		border-radius: 3px;
	}

	.hero-sk {
		padding: 7rem 1.25rem 3rem;

		@include breakpoint('medium') { padding: 9rem 2rem 4rem; }
	}

	.hero-sk__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		max-width: 1280px;
		margin: 0 auto;

		@include breakpoint('large') {
			grid-template-columns: 1fr 1.1fr;
			gap: 4rem;
		}
	}
</style>

{#if variant === 'home'}
	<section class="hero-sk">
		<div class="hero-sk__grid">
			<div style="display:flex;flex-direction:column;gap:1rem;">
				<span class="sk" style="width:220px;height:28px;border-radius:999px;"></span>
				<span class="sk" style="width:90%;height:clamp(2.5rem,7vw,5rem);margin-top:1rem;"></span>
				<span class="sk" style="width:60%;height:clamp(2.5rem,7vw,5rem);"></span>
				<span class="sk" style="width:80%;height:18px;margin-top:1.5rem;"></span>
				<span class="sk" style="width:70%;height:18px;"></span>
				<div style="display:flex;gap:0.75rem;margin-top:1.5rem;">
					<span class="sk" style="width:180px;height:44px;"></span>
					<span class="sk" style="width:160px;height:44px;"></span>
				</div>
			</div>
			<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:1rem;">
				<span class="sk" style="aspect-ratio:4/5;"></span>
				<span class="sk" style="aspect-ratio:4/3;align-self:end;"></span>
			</div>
		</div>
	</section>
{/if}
