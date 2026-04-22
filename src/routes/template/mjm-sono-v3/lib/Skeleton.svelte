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
		--sk-bg: rgba(237, 230, 214, 0.05);
		--sk-shine: linear-gradient(
			90deg,
			rgba(237, 230, 214, 0) 0%,
			rgba(237, 230, 214, 0.12) 50%,
			rgba(237, 230, 214, 0) 100%
		);
		background: var(--sk-bg);
		background-image: var(--sk-shine);
		background-size: 600px 100%;
		background-repeat: no-repeat;
		animation: shimmer 1.6s ease-in-out infinite;
		display: block;
	}

	.hero-sk {
		padding: 8rem 1.25rem 3rem;

		@include breakpoint('medium') {
			padding: 10rem 2rem 4rem;
		}
	}

	.hero-sk__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;

		@include breakpoint('large') {
			grid-template-columns: 1.15fr 1fr;
			gap: 4rem;
		}
	}

	.hero-sk__left {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
</style>

{#if variant === 'home'}
	<section class="hero-sk">
		<div class="hero-sk__grid">
			<div class="hero-sk__left">
				<span class="sk" style="width:240px;height:11px;"></span>
				<div style="display:flex;flex-direction:column;gap:0.4rem;margin-top:1rem;">
					<span class="sk" style="width:30%;height:clamp(2.5rem,8vw,5rem);"></span>
					<span class="sk" style="width:75%;height:clamp(4rem,14vw,11rem);"></span>
					<span class="sk" style="width:45%;height:clamp(2.5rem,8vw,5rem);margin-left:clamp(2rem,8vw,6rem);"></span>
				</div>
				<div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:2rem;max-width:34rem;">
					<span class="sk" style="width:100%;height:14px;"></span>
					<span class="sk" style="width:85%;height:14px;"></span>
					<span class="sk" style="width:100%;height:14px;"></span>
					<span class="sk" style="width:70%;height:14px;"></span>
				</div>
			</div>
			<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
				<span class="sk" style="grid-column:1/-1;aspect-ratio:16/10;"></span>
				<span class="sk" style="grid-column:1/-1;height:100px;"></span>
				<span class="sk" style="aspect-ratio:1;"></span>
				<span class="sk" style="aspect-ratio:1;"></span>
			</div>
		</div>
	</section>
{/if}
