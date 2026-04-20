<style lang="scss">
	@use './styles/mixins' as *;

	@keyframes shimmer {
		0% { background-position: -600px 0; }
		100% { background-position: 600px 0; }
	}

	.sk {
		--sk-bg: #e8e0d0;
		--sk-shine: linear-gradient(
			90deg,
			rgba(232, 224, 208, 0) 0%,
			rgba(255, 250, 240, 0.7) 50%,
			rgba(232, 224, 208, 0) 100%
		);
		background: var(--sk-bg);
		background-image: var(--sk-shine);
		background-size: 600px 100%;
		background-repeat: no-repeat;
		animation: shimmer 1.6s ease-in-out infinite;
		border-radius: 2px;
		display: block;
	}

	/* ── HERO ── */
	.hero-sk {
		padding: 3rem 1.25rem 2rem;

		@include breakpoint('medium') {
			padding: 4rem 2rem 3rem;
		}
	}

	.hero-sk__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;

		@include breakpoint('large') {
			grid-template-columns: 1.25fr 1fr;
			gap: 3rem;
			min-height: 75vh;
		}
	}

	.hero-sk__left {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.hero-sk__eyebrow {
		display: flex;
		align-items: center;
		gap: 0.9em;
	}

	.hero-sk__right {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.hero-sk__footer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-top: 3rem;
		padding-top: 1.25rem;
		border-top: 1px solid #e8e0d0;

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.hero-sk__footer-item {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	/* ── POLE ── */
	.pole-sk {
		border-top: 1px solid #e8e0d0;
		min-height: 85vh;
		display: flex;
		align-items: flex-end;
		position: relative;
		overflow: hidden;
	}

	.pole-sk__img {
		position: absolute;
		inset: 0;
		background: #d5ccc0;
		animation: shimmer 1.6s ease-in-out infinite;
		background-image: var(--sk-shine);
		background-size: 600px 100%;
		background-repeat: no-repeat;
	}

	.pole-sk__body {
		position: relative;
		z-index: 2;
		padding: 3rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 36rem;

		@include breakpoint('medium') {
			padding: 5rem 4rem;
		}
	}

	/* ── GALLERY ── */
	.gallery-sk {
		padding: 5rem 1.25rem;
		border-top: 1px solid #e8e0d0;
	}

	.gallery-sk__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
		margin-top: 3rem;

		@include breakpoint('large') {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.gallery-sk__cell {
		background: #d5ccc0;
		animation: shimmer 1.6s ease-in-out infinite;
		background-image: var(--sk-shine);
		background-size: 600px 100%;
		background-repeat: no-repeat;
	}
</style>

<!-- ── HERO SKELETON ── -->
<section class="hero-sk">
	<div class="hero-sk__grid">
		<div class="hero-sk__left">
			<div class="hero-sk__eyebrow">
				<span class="sk" style="width:36px;height:1px;"></span>
				<span class="sk" style="width:220px;height:11px;"></span>
			</div>
			<div style="display:flex;flex-direction:column;gap:0.5rem;margin-top:1rem;">
				<span class="sk" style="width:45%;height:clamp(2.8rem,9vw,6rem);"></span>
				<span class="sk" style="width:30%;height:clamp(2.8rem,9vw,6rem);margin-left:clamp(2.5rem,10vw,7rem);"></span>
				<span class="sk" style="width:100%;height:clamp(4rem,16vw,13rem);"></span>
			</div>
			<div style="display:flex;flex-direction:column;gap:0.75rem;max-width:32rem;">
				<span class="sk" style="width:100%;height:14px;"></span>
				<span class="sk" style="width:100%;height:14px;"></span>
				<span class="sk" style="width:70%;height:14px;"></span>
				<span class="sk" style="width:130px;height:11px;margin-top:0.5rem;"></span>
			</div>
		</div>
		<div class="hero-sk__right">
			<span class="sk" style="width:100%;aspect-ratio:4/5;display:block;flex:1;"></span>
			<div style="background:#d5ccc0;padding:1.25rem;display:flex;flex-direction:column;gap:0.5rem;">
				<div style="display:flex;justify-content:space-between;padding-bottom:0.65rem;border-bottom:1px solid rgba(0,0,0,0.08);">
					<span class="sk" style="width:80px;height:10px;background:#c0b8ac;"></span>
					<span class="sk" style="width:100px;height:10px;background:#c0b8ac;"></span>
				</div>
				<span class="sk" style="width:60%;height:18px;background:#c0b8ac;"></span>
				<span class="sk" style="width:100%;height:12px;background:#c0b8ac;"></span>
				<span class="sk" style="width:80%;height:12px;background:#c0b8ac;"></span>
			</div>
		</div>
	</div>
	<div class="hero-sk__footer">
		{#each [1,2,3,4] as _}
			<div class="hero-sk__footer-item">
				<span class="sk" style="width:60px;height:10px;"></span>
				<span class="sk" style="width:90px;height:14px;"></span>
			</div>
		{/each}
	</div>
</section>

<!-- ── POLES SKELETON (3 blocs) ── -->
{#each [1,2,3] as _}
	<section class="pole-sk">
		<div class="pole-sk__img"></div>
		<div class="pole-sk__body">
			<span class="sk" style="width:80px;height:10px;background:rgba(255,255,255,0.2);"></span>
			<span class="sk" style="width:50%;height:clamp(2.5rem,6vw,5rem);background:rgba(255,255,255,0.15);"></span>
			<span class="sk" style="width:65%;height:clamp(3rem,8vw,7rem);background:rgba(255,255,255,0.1);"></span>
			<span class="sk" style="width:100%;height:14px;background:rgba(255,255,255,0.1);"></span>
			<span class="sk" style="width:80%;height:14px;background:rgba(255,255,255,0.1);"></span>
			<span class="sk" style="width:120px;height:36px;background:rgba(255,255,255,0.1);border-radius:999px;margin-top:0.5rem;"></span>
		</div>
	</section>
{/each}

<!-- ── GALLERY SKELETON ── -->
<section class="gallery-sk">
	<div style="display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1rem;">
		<span class="sk" style="width:140px;height:10px;"></span>
		<span class="sk" style="width:300px;height:clamp(2rem,5vw,4rem);"></span>
	</div>
	<div class="gallery-sk__grid">
		{#each [1,2,3,4,5,6] as i}
			<div class="gallery-sk__cell" style="aspect-ratio:{i % 3 === 0 ? '3/4' : '4/3'};"></div>
		{/each}
	</div>
</section>
