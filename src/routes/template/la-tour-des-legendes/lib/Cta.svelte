<script>
	let { cta = null, infos = null } = $props();

	function reservHref() {
		if (!cta?.reservation) return '/template/la-tour-des-legendes/reservation';
		const m = cta.reservation.methode;
		if (m === 'tel' && infos?.telephone) return `tel:${infos.telephone}`;
		if (m === 'email' && infos?.email) return `mailto:${infos.email}`;
		if (m === 'url' && cta.reservation.url) return cta.reservation.url;
		return '/template/la-tour-des-legendes/reservation';
	}
</script>

<section class="cta-section" aria-label="Réserver">
	<div class="bg" aria-hidden="true">
		<span class="word">Réserver</span>
		<span class="word italic">Réserver</span>
		<span class="word">Réserver</span>
	</div>

	<div class="content">
		<p class="eye">✦ Une table vous attend ✦</p>
		<h2>
			Venez écrire<br/>
			<em>l'histoire</em> avec nous
		</h2>
		<p class="lead">
			La Tour ouvre bientôt. Réservez dès aujourd'hui pour faire partie
			des premiers à pousser la porte.
		</p>
		<div class="acts">
			<a class="primary" href={reservHref()}>
				<span>{cta?.reservation?.label || 'Réserver'}</span>
				<span class="ar" aria-hidden="true">→</span>
			</a>
			<a class="secondary" href="/template/la-tour-des-legendes/contact">
				Nous contacter
			</a>
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.cta-section {
		position: relative;
		padding: 7rem 1.25rem;
		background: var(--accent-deep);
		color: var(--base);
		overflow: hidden;
		isolation: isolate;
		@include breakpoint('medium') { padding: 9rem 2.5rem; }
		@include breakpoint('large') { padding: 12rem 4rem; }
	}
	.bg {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
		font-family: var(--f-display);
		font-size: clamp(7rem, 22vw, 22rem);
		line-height: 0.85;
		font-weight: 900;
		color: rgba(255, 255, 255, 0.08);
		pointer-events: none;
		z-index: -1;
		.word { white-space: nowrap; }
		.word.italic { font-style: italic; color: rgba(255, 212, 71, 0.12); }
	}
	.content {
		max-width: 900px;
		margin: 0 auto;
		text-align: center;
		position: relative;
	}
	.eye {
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: 1.5rem;
	}
	h2 {
		font-family: var(--f-display);
		font-size: clamp(3rem, 9vw, 8rem);
		line-height: 0.92;
		letter-spacing: -0.02em;
		em { font-style: italic; color: var(--gold); }
	}
	.lead {
		font-family: var(--f-display);
		font-style: italic;
		font-size: clamp(1.1rem, 2vw, 1.4rem);
		line-height: 1.5;
		color: rgba(244, 244, 246, 0.85);
		max-width: 50ch;
		margin: 2rem auto 0;
	}
	.acts {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		justify-content: center;
		margin-top: 3rem;
		@include breakpoint('small') { flex-direction: row; }
	}
	.primary, .secondary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.7rem;
		padding: 1.2rem 2rem;
		font-family: var(--f-mono);
		font-size: 0.82rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		transition: all 0.3s;
	}
	.primary {
		background: var(--gold);
		color: var(--ink);
		.ar { transition: transform 0.3s; }
		&:hover {
			background: var(--base);
			.ar { transform: translateX(6px); }
		}
	}
	.secondary {
		border: 1px solid var(--gold);
		color: var(--gold);
		&:hover { background: var(--gold); color: var(--ink); }
	}
</style>
