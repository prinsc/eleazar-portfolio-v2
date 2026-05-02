<script>
	let { evenements = [] } = $props();

	function fmt(date) {
		try {
			return new Date(date).toLocaleDateString('fr-FR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			});
		} catch {
			return date;
		}
	}
</script>

<section class="evt" id="evenements">
	<div class="container">
		<header class="head">
			<span class="eyebrow">— Agenda</span>
			<h2>Rendez-vous <em>à venir</em></h2>
		</header>

		<div class="list">
			{#each evenements as e}
				<article class="evt-card">
					<div class="img">
						<img src={e.image} alt={e.title} loading="lazy" />
					</div>
					<div class="body">
						<time>{fmt(e.date)}</time>
						<h3>{e.title}</h3>
						<p>{e.description}</p>
						<a class="link" href="#contact">
							S'inscrire
							<svg width="28" height="8" viewBox="0 0 28 8" fill="none">
								<path d="M0 4 H26 M22 1 L26 4 L22 7" stroke="currentColor" stroke-width="1" />
							</svg>
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.evt {
		padding: 5rem 1.25rem;
		background: var(--q-paper);

		@include breakpoint('large') {
			padding: 9rem 2.5rem;
		}
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.head {
		margin-bottom: 4rem;

		.eyebrow {
			display: block;
			font-family: var(--q-mono);
			font-size: 0.7rem;
			letter-spacing: 0.24em;
			text-transform: uppercase;
			color: var(--q-gold-deep);
			margin-bottom: 1.5rem;
		}

		h2 {
			margin: 0;
			font-family: var(--q-display);
			font-weight: 300;
			font-size: clamp(2.25rem, 5.5vw, 4rem);
			letter-spacing: -0.02em;
			color: var(--q-ink);

			em {
				font-style: italic;
				color: var(--q-emerald-deep);
			}
		}
	}

	.list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@include breakpoint('large') {
			grid-template-columns: repeat(2, 1fr);
			gap: 3rem;
		}
	}

	.evt-card {
		display: grid;
		grid-template-rows: auto 1fr;
		background: var(--q-white);
		border: 1px solid var(--q-line);
		overflow: hidden;
		transition: transform 0.4s ease, box-shadow 0.4s ease;

		&:hover {
			transform: translateY(-4px);
			box-shadow: 0 30px 60px -40px rgba(8, 8, 6, 0.3);
		}
	}

	.img {
		position: relative;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: var(--q-beige);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.7s ease;
		}

		.evt-card:hover & img {
			transform: scale(1.05);
		}

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			background: linear-gradient(to bottom, transparent 60%, rgba(8, 8, 6, 0.3));
		}
	}

	.body {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		time {
			font-family: var(--q-mono);
			font-size: 0.7rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--q-gold-deep);
		}

		h3 {
			margin: 0;
			font-family: var(--q-display);
			font-style: italic;
			font-weight: 400;
			font-size: 1.5rem;
			color: var(--q-ink);
			line-height: 1.2;
		}

		p {
			margin: 0;
			font-family: var(--q-serif);
			font-size: 1rem;
			line-height: 1.6;
			color: var(--q-ink);
			opacity: 0.78;
		}
	}

	.link {
		margin-top: auto;
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-family: var(--q-sans);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--q-emerald-deep);
		padding-bottom: 0.4rem;
		border-bottom: 1px solid var(--q-gold);
		align-self: flex-start;
		transition: gap 0.3s ease;

		&:hover {
			gap: 1.2rem;
		}
	}
</style>
