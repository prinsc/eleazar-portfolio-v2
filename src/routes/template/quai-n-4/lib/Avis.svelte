<script>
	let { avis = [] } = $props();
</script>

<section class="avis">
	<div class="container">
		<header class="head">
			<span class="eyebrow">— Témoignages</span>
			<h2>Ce qu'ils <em>en disent</em></h2>
		</header>

		<div class="grid">
			{#each avis as a}
				<figure class="card">
					<div class="stars" aria-label={`${a.note} étoiles`}>
						{#each Array(a.note) as _}
							<span>✦</span>
						{/each}
					</div>
					<blockquote>
						<span class="qmark">“</span>{a.texte}
					</blockquote>
					<figcaption>
						<span class="auteur">— {a.auteur}</span>
						<span class="date">{new Date(a.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.avis {
		padding: 5rem 1.25rem;
		background: var(--q-emerald-deep);
		color: var(--q-cream);
		position: relative;

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background-image: radial-gradient(
				circle at 50% 0%,
				rgba(184, 148, 90, 0.1),
				transparent 50%
			);
			pointer-events: none;
		}

		@include breakpoint('large') {
			padding: 9rem 2.5rem;
		}
	}

	.container {
		position: relative;
		max-width: 1200px;
		margin: 0 auto;
		z-index: 2;
	}

	.head {
		text-align: center;
		margin-bottom: 4rem;

		.eyebrow {
			display: block;
			font-family: var(--q-mono);
			font-size: 0.7rem;
			letter-spacing: 0.24em;
			text-transform: uppercase;
			color: var(--q-gold);
			margin-bottom: 1.5rem;
		}

		h2 {
			margin: 0;
			font-family: var(--q-display);
			font-weight: 300;
			font-size: clamp(2.25rem, 5.5vw, 4rem);
			letter-spacing: -0.02em;

			em {
				font-style: italic;
				background: linear-gradient(180deg, var(--q-gold-bright), var(--q-gold-deep));
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
			}
		}
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;

		@include breakpoint('medium') {
			grid-template-columns: repeat(3, 1fr);
			gap: 2rem;
		}
	}

	.card {
		margin: 0;
		padding: 2.5rem 2rem;
		background: rgba(253, 252, 248, 0.04);
		border: 1px solid rgba(184, 148, 90, 0.25);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		transition: background 0.4s ease, border-color 0.4s ease, transform 0.4s ease;

		&:hover {
			background: rgba(253, 252, 248, 0.07);
			border-color: var(--q-gold);
			transform: translateY(-4px);
		}
	}

	.stars {
		display: inline-flex;
		gap: 0.4rem;
		color: var(--q-gold-bright);
		font-size: 0.85rem;
	}

	blockquote {
		margin: 0;
		font-family: var(--q-serif);
		font-style: italic;
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--q-cream);
		opacity: 0.92;
		flex: 1;

		.qmark {
			font-size: 2.4rem;
			color: var(--q-gold);
			vertical-align: -0.3em;
			line-height: 0;
			margin-right: 0.2rem;
		}
	}

	figcaption {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		padding-top: 1.25rem;
		border-top: 1px solid rgba(184, 148, 90, 0.2);

		.auteur {
			font-family: var(--q-display);
			font-style: italic;
			font-size: 1rem;
			color: var(--q-gold-bright);
		}

		.date {
			font-family: var(--q-mono);
			font-size: 0.65rem;
			letter-spacing: 0.16em;
			text-transform: uppercase;
			color: var(--q-cream);
			opacity: 0.5;
		}
	}
</style>
