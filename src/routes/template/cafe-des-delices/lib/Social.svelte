<script>
	let { socials = [] } = $props();
	const socialsData = $derived(socials ?? []);

	const iconPaths = {
		facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
		instagram: 'M16 3H8a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5zm-4 12.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z',
		tiktok: 'M9 12a4 4 0 104 4V4a5 5 0 005 5',
		tripadvisor: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14a2 2 0 110-4 2 2 0 010 4zm4 0a2 2 0 110-4 2 2 0 010 4z'
	};

	const activeSocials = $derived(socialsData.filter(s => s.actif));
</script>

<section class="social" id="social">
	<span class="social__num">06 - Suivez-nous</span>

	<div class="social__inner">
		<div class="social__head">
			<h2 class="social__title">
				<span class="sur">Retrouvez-nous</span>
				<em class="it">en ligne</em>
			</h2>
			<p class="social__text">
				Nos grillades, nos bières, nos soirées. Suivez notre quotidien et ne manquez aucune nouveauté.
			</p>
		</div>

		<div class="social__grid">
			{#each activeSocials as s, i}
				<a
					href={s.url}
					target="_blank"
					rel="noopener noreferrer"
					class="social__card"
					style="--delay: {i * 0.08}s"
				>
					<span class="social__idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>

					<div class="social__icon-wrap">
						<svg class="social__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28">
							<path d={iconPaths[s.id] || iconPaths.facebook} />
						</svg>
					</div>

					<span class="social__label">{s.label}</span>

					<svg class="social__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
						<path d="M7 17L17 7M17 7H7M17 7v10" />
					</svg>
				</a>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.social {
		border-top: 1px solid var(--rule);
		padding: 5rem 1.25rem;
		position: relative;

		@include breakpoint('medium') {
			padding: 7rem 2rem;
		}
	}

	.social__num {
		position: absolute;
		top: 1.25rem;
		left: 1.25rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
		z-index: 4;

		@include breakpoint('medium') {
			top: 2rem;
			left: 2rem;
		}
	}

	.social__inner {
		max-width: 1400px;
		margin: 0 auto;
	}

	.social__head {
		margin-bottom: 3rem;

		@include breakpoint('medium') {
			margin-bottom: 4rem;
		}
	}

	.social__title {
		margin: 0 0 1.5rem;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.5rem, 6vw, 5.5rem);
		line-height: 0.85;
		letter-spacing: -0.04em;
	}

	.social__title .sur {
		display: block;
	}

	.social__title .it {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember);
		display: block;
		padding-left: 1.5rem;

		@include breakpoint('medium') {
			padding-left: 2rem;
		}
	}

	.social__text {
		font-family: var(--f-display);
		font-size: 1rem;
		line-height: 1.65;
		color: var(--slate-soft);
		margin: 0;
		max-width: 28rem;

		@include breakpoint('medium') {
			font-size: 1.05rem;
		}
	}

	/* ── Grid ── */
	.social__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1px;
		background: var(--rule);
		border: 1px solid var(--rule);

		@include breakpoint('medium') {
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		}
	}

	/* ── Card ── */
	.social__card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 2rem 1.5rem;
		min-height: 200px;
		background: var(--cream);
		text-decoration: none;
		color: var(--slate);
		position: relative;
		overflow: hidden;
		transition: background 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
					color 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);

		@include breakpoint('medium') {
			min-height: 260px;
			padding: 2rem;
		}

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: var(--slate);
			transform: translateY(100%);
			transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
			z-index: 0;
		}

		&:hover::before {
			transform: translateY(0);
		}

		&:hover {
			color: var(--cream);
		}

		&:hover .social__icon-wrap {
			border-color: rgba(241, 234, 216, 0.2);
		}

		&:hover .social__icon {
			stroke: var(--ember-light);
		}

		&:hover .social__arrow {
			transform: translate(3px, -3px);
			opacity: 1;
		}

		&:hover .social__idx {
			opacity: 0.15;
			color: var(--cream);
		}
	}

	.social__idx {
		position: absolute;
		top: 0.75rem;
		right: 1rem;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: 3.5rem;
		line-height: 1;
		letter-spacing: -0.04em;
		opacity: 0.06;
		z-index: 1;
		transition: opacity 0.4s, color 0.4s;
		user-select: none;
		pointer-events: none;
	}

	.social__icon-wrap {
		width: 52px;
		height: 52px;
		border: 1px solid var(--rule);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
		transition: border-color 0.4s;
	}

	.social__icon {
		stroke: var(--ember);
		transition: stroke 0.4s;
	}

	.social__label {
		font-family: var(--f-display);
		font-size: 1.15rem;
		font-weight: 400;
		letter-spacing: -0.02em;
		z-index: 1;
		margin-top: auto;
	}

	.social__arrow {
		position: absolute;
		bottom: 1.5rem;
		right: 1.5rem;
		opacity: 0;
		z-index: 1;
		transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
					opacity 0.35s;

		@include breakpoint('medium') {
			bottom: 2rem;
			right: 2rem;
		}
	}
</style>
