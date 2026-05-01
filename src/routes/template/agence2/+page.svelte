<script>
	import { onMount } from 'svelte';

	let isReady = $state(false);
	let openFaq = $state(null);
	let mouseX = $state(50);
	let mouseY = $state(50);

	onMount(async () => {
		await new Promise((r) => setTimeout(r, 60));
		isReady = true;
		const onMove = (e) => {
			mouseX = (e.clientX / window.innerWidth) * 100;
			mouseY = (e.clientY / window.innerHeight) * 100;
		};
		window.addEventListener('pointermove', onMove);
		return () => window.removeEventListener('pointermove', onMove);
	});

	const stats = [
		{ n: '500€', l: 'site qui roule, prix de base' },
		{ n: '1', l: 'mec, 1 cerveau, 0 intermédiaire' },
		{ n: '6 ANS', l: 'à coder du web qui fonctionne' },
		{ n: '∞', l: 'cafés bus pendant ce temps' }
	];

	const why = [
		{ t: 'LES LOCAUX', d: 'Bureaux centre-ville. Baby-foot. Nespresso. Tu paies le loyer.', tag: '#frais-fixes' },
		{ t: 'LA HIÉRARCHIE', d: 'Account, projet, lead, junior, design, QA. 5 salaires. 1 site.', tag: '#salaires' },
		{ t: 'LA MARGE', d: 'Une agence vise 30 à 50% net. Légitime — mais c’est toi qui paies.', tag: '#capital' },
		{ t: 'LE COMMERCIAL', d: 'Quelqu’un est payé pour te vendre. Ce quelqu’un, tu le paies.', tag: '#sales' },
		{ t: 'LES JUNIORS', d: 'Devis signé par le senior. Code écrit par un junior au tarif senior.', tag: '#bait' },
		{ t: 'LA FILE D’ATTENTE', d: 'Ton projet attend. 3 mois pour un site vitrine, c’est devenu normal.', tag: '#delays' }
	];

	const vsRows = [
		{ row: 'Prix site vitrine', a: '5000 — 12000€', b: 'Dès 500€' },
		{ row: 'Délai', a: '8 — 16 semaines', b: '2 — 6 semaines' },
		{ row: 'Ton interlocuteur', a: 'Chef de projet', b: 'Le dev lui-même' },
		{ row: 'Qui code ?', a: 'Junior, souvent', b: 'Moi, toujours' },
		{ row: 'Stack', a: 'WordPress mou', b: 'Svelte / Shopify' },
		{ row: 'Hébergement', a: 'Abo obligatoire', b: 'Tu choisis' },
		{ row: 'Modifs après', a: 'Devis chaque ligne', b: 'On en parle' },
		{ row: 'Réponse', a: 'Ticket → file', b: 'WhatsApp direct' }
	];

	const process = [
		{ n: '01', t: 'CALL', d: '30 min, gratuit. Tu expliques. Je pose des questions.' },
		{ n: '02', t: 'DEVIS', d: 'Sous 48h. Prix fixe. Pas de surprise en cours de route.' },
		{ n: '03', t: 'MAQUETTE', d: 'Figma. Tu valides avant que je touche au code.' },
		{ n: '04', t: 'DEV', d: 'Tu suis en direct sur une URL preview. Pas de boîte noire.' },
		{ n: '05', t: 'LIGNE', d: 'Hébergement, domaine, SEO de base, formation rapide.' },
		{ n: '06', t: 'APRÈS', d: 'On reste en contact. Je disparais pas après le virement.' }
	];

	const projets = [
		{
			name: 'Blinkr',
			date: '2024-2025',
			description: 'Plateforme dédiée à la découverte et au partage d’événements locaux.',
			image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop',
			link: 'https://blinkr.events'
		},
		{
			name: 'MJM Sonorisation',
			date: '2026',
			description: 'Site destiné à promouvoir les services d’un sonorisateur passionné.',
			image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop',
			link: 'https://mjmsono.com'
		},
		{
			name: 'Renaissance Coach',
			date: '2025',
			description: 'Site vitrine pour un coach de vie spécialisé en développement personnel.',
			image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=900&auto=format&fit=crop',
			link: 'https://renaissance-coach.be'
		},
		{
			name: 'Noumis Jewelry',
			date: '2025',
			description: 'Site e-commerce pour une marque de bijoux artisanaux.',
			image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&auto=format&fit=crop',
			link: 'https://noumis-jewelry.com'
		}
	];

	const faq = [
		{
			q: 'Sérieusement, 500€ pour un site ?',
			a: 'Oui. Site vitrine 1 page, design propre, mobile, hébergement 1 an inclus, formé pour gérer ton contenu. Si tu veux 5 pages, animations custom, back-office, e-commerce — on monte. Mais le ticket d’entrée est à 500€ et c’est négociable selon ton projet.'
		},
		{
			q: 'C’est quoi la différence avec une vraie agence ?',
			a: 'Une agence emploie 5 à 30 personnes. Faut tous les payer. Moi je suis seul, je gère tout, je facture mon temps. Pour 80% des projets PME, ça suffit largement — et tu économises 30 à 80%.'
		},
		{
			q: 'Tu travailles seul. Et si tu tombes malade ?',
			a: 'Question légitime. Je bosse avec un petit réseau de freelances de confiance pour les renforts. Et le code que je livre est propre, documenté, hébergé chez TOI : n’importe quel dev peut reprendre.'
		},
		{
			q: 'Tu bosses où ?',
			a: 'Basé à Mainvault (Ath). Je couvre tout le Hainaut — Tournai, Leuze, Lessines, Mons — et à distance partout en Belgique et en France. Le rendez-vous physique est possible mais rarement nécessaire.'
		},
		{
			q: 'Pourquoi pas WordPress ?',
			a: 'WordPress reste pertinent pour certains usages (blog éditorial gros volume). Pour un site vitrine moderne, rapide, sécurisé et bien noté par Google, je préfère SvelteKit. Plus rapide, plus léger, mieux ranké.'
		},
		{
			q: 'Et après la livraison ?',
			a: 'Tu es propriétaire de tout. Suivi mensuel optionnel (correctifs, petites évols, hébergement) à partir de 30€/mois. Sans engagement. Tu peux partir quand tu veux.'
		}
	];

	function toggleFaq(i) {
		openFaq = openFaq === i ? null : i;
	}

	function emailMe() {
		window.location.href = 'mailto:eleazar@kltk.be?subject=Projet%20web%20%E2%80%94%20demande%20de%20devis';
	}
</script>

<svelte:head>
	<title>Agence web Belgique — dès 500€ | Eléazar Freelance</title>
	<meta
		name="description"
		content="Agence web alternative à Ath, Tournai, Hainaut. Site web pro à partir de 500€ par un développeur freelance senior. Pas d’intermédiaire, pas de marge gonflée."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="rave"
	class:ready={isReady}
	style="--mx:{mouseX}%; --my:{mouseY}%;"
>
	<!-- Sticky top ticker -->
	<div class="ticker top" aria-hidden="true">
		<div class="ticker-track">
			{#each Array(8) as _}
				<span>★ À PARTIR DE 500€ ★ DEVIS GRATUIT ★ HAINAUT BELGIQUE ★ NO BS ★ REAL DEV ★ </span>
			{/each}
		</div>
	</div>

	<!-- HERO -->
	<section class="hero">
		<div class="hero-tag">
			<span class="bracket">&lt;</span>
			<span class="mono">/// agence-web.exe</span>
			<span class="blink">█</span>
			<span class="bracket">&gt;</span>
		</div>

		<h1 class="mega">
			<span class="line l1">UNE AGENCE WEB.</span>
			<span class="line l2">UN SEUL MEC.</span>
			<span class="line l3">ZÉRO BULLSHIT.</span>
		</h1>

		<div class="hero-bottom">
			<div class="hero-lede">
				<span class="arrow">→</span>
				<p>
					Pas de chef de projet inutile. Pas de stagiaire qui code ton site. Pas de marge à 50%.
					Juste un développeur qui fait le job — et qui te facture honnêtement.
				</p>
			</div>

			<div class="hero-price-card">
				<span class="from-label">À PARTIR DE</span>
				<span class="big-price">500€</span>
				<span class="negotiable">Négociable sur devis. Vraiment.</span>
				<div class="sticker sticker-1">NO BS</div>
				<div class="sticker sticker-2">★ HOT ★</div>
			</div>
		</div>

		<div class="hero-cta">
			<button class="btn btn-mag" onclick={emailMe}>Demande un devis →</button>
			<a class="btn btn-yel" href="#vs">Voir le match ↓</a>
		</div>
	</section>

	<!-- STATS BAND -->
	<section class="stats">
		{#each stats as s, i}
			<div class="stat" style="--i:{i}">
				<span class="stat-num">{s.n}</span>
				<span class="stat-lbl">{s.l}</span>
			</div>
		{/each}
	</section>

	<!-- WHY -->
	<section class="why">
		<div class="section-head">
			<span class="kicker mono">[ § 01 ] — anatomie d’un devis</span>
			<h2 class="mega-h2">POURQUOI UNE AGENCE FACTURE 8000€ ?</h2>
			<p class="lede">
				Le prix d’un site en agence n’est pas le prix du site. C’est le prix du reste.
			</p>
		</div>

		<div class="why-grid">
			{#each why as w, i}
				<article class="why-card" style="--i:{i}">
					<span class="why-tag mono">{w.tag}</span>
					<h3>{w.t}</h3>
					<p>{w.d}</p>
					<span class="why-x">✕</span>
				</article>
			{/each}
		</div>
	</section>

	<!-- VS -->
	<section class="vs" id="vs">
		<div class="section-head">
			<span class="kicker mono">[ § 02 ] — le match</span>
			<h2 class="mega-h2">AGENCE vs MOI</h2>
		</div>

		<div class="vs-wrap">
			<div class="vs-head">
				<div class="vs-empty"></div>
				<div class="vs-col-h agency">
					<span class="mono">A</span>
					<span class="lbl">AGENCE WEB</span>
				</div>
				<div class="vs-col-h me">
					<span class="mono">B</span>
					<span class="lbl">ELÉAZAR</span>
				</div>
			</div>

			{#each vsRows as row, i}
				<div class="vs-row" style="--i:{i}">
					<div class="vs-rowlbl">{row.row}</div>
					<div class="vs-cell loss">
						<span class="x">✕</span>
						<span>{row.a}</span>
					</div>
					<div class="vs-cell win">
						<span class="check">●</span>
						<span>{row.b}</span>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- BIG MARQUEE -->
	<div class="big-marquee" aria-hidden="true">
		<div class="big-marquee-track">
			<span>500€ · </span><span>NO MIDDLEMAN · </span><span>500€ · </span><span>HAINAUT · </span
			><span>500€ · </span><span>SVELTE · </span><span>500€ · </span><span>NO MIDDLEMAN · </span
			><span>500€ · </span><span>HAINAUT · </span><span>500€ · </span><span>SVELTE · </span>
		</div>
	</div>

	<!-- PROCESS -->
	<section class="process">
		<div class="section-head">
			<span class="kicker mono">[ § 03 ] — workflow</span>
			<h2 class="mega-h2">LE PROCESS. POINT.</h2>
		</div>

		<ol class="proc-list">
			{#each process as step, i}
				<li class="proc-step" style="--i:{i}">
					<span class="pn">{step.n}</span>
					<span class="pt">{step.t}</span>
					<span class="pd">{step.d}</span>
				</li>
			{/each}
		</ol>
	</section>

	<!-- REAL PROJECTS -->
	<section class="real">
		<div class="section-head">
			<span class="kicker mono">[ § 04 ] — sélection</span>
			<h2 class="mega-h2">DES VRAIS SITES. PAS DES PROMESSES.</h2>
		</div>

		<div class="real-grid">
			{#each projets as p, i}
				<a
					class="real-card"
					href={p.link}
					target="_blank"
					rel="noopener"
					style="--i:{i}"
				>
					<div class="real-img">
						<!-- Image placeholder Unsplash - à remplacer par client -->
						<img src={p.image} alt={p.name} loading="lazy" />
						<span class="real-badge mono">{p.date}</span>
					</div>
					<div class="real-meta">
						<h3>{p.name}</h3>
						<p>{p.description}</p>
						<span class="real-go mono">
							→ {p.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
						</span>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- FAQ -->
	<section class="faq">
		<div class="section-head">
			<span class="kicker mono">[ § 05 ] — F.A.Q</span>
			<h2 class="mega-h2">LES VRAIES QUESTIONS</h2>
		</div>

		<ul class="faq-list">
			{#each faq as f, i}
				<li class="faq-item" class:open={openFaq === i}>
					<button class="faq-q" onclick={() => toggleFaq(i)} aria-expanded={openFaq === i}>
						<span class="qn mono">{String(i + 1).padStart(2, '0')}</span>
						<span class="qt">{f.q}</span>
						<span class="qx">{openFaq === i ? '−' : '+'}</span>
					</button>
					{#if openFaq === i}
						<div class="faq-a">
							<p>{f.a}</p>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</section>

	<!-- FINAL CTA -->
	<section class="final">
		<div class="final-box">
			<span class="kicker mono">[ § 06 ] — maintenant</span>
			<h2 class="mega-h2">TON PROJET MÉRITE MIEUX QU’UN DEVIS À 8000€.</h2>
			<p class="lede">
				Discussion gratuite. Sans engagement. Sans commercial qui te rappelle 6 fois.
			</p>

			<div class="final-actions">
				<button class="btn btn-big btn-blk" onclick={emailMe}>EMAIL →</button>
				<a class="btn btn-big btn-yel" href="tel:+32485700737">APPELLE → +32 485 700 737</a>
			</div>

			<p class="footnote mono">
				Mainvault (Ath) — Hainaut occidental — Belgique entière en remote.
			</p>

			<div class="sticker-final">
				<span>★</span><span>500€</span><span>★</span>
			</div>
		</div>
	</section>

	<!-- Bottom ticker -->
	<div class="ticker bottom" aria-hidden="true">
		<div class="ticker-track reverse">
			{#each Array(8) as _}
				<span>● ELEAZAR.KLTK.BE ● MAINVAULT ATH BE ● eleazar@kltk.be ● +32 485 700 737 ● </span>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	/* ---------- LOCAL RESET ---------- */
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}
	:global(*) {
		margin: 0;
		padding: 0;
	}
	:global(html:focus-within) {
		scroll-behavior: smooth;
	}
	:global(a:not([class])) {
		text-decoration-skip-ink: auto;
	}
	:global(img),
	:global(picture),
	:global(svg),
	:global(video),
	:global(canvas) {
		max-width: 100%;
		height: auto;
		vertical-align: middle;
		font-style: italic;
		background-repeat: no-repeat;
		background-size: cover;
	}
	:global(input),
	:global(button),
	:global(textarea),
	:global(select) {
		font: inherit;
	}
	:global(body),
	:global(html) {
		scroll-behavior: smooth;
	}
	@media (prefers-reduced-motion: reduce) {
		:global(html:focus-within) {
			scroll-behavior: auto;
		}
		:global(*),
		:global(*::before),
		:global(*::after) {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
			transition: none;
		}
	}

	$bp-small: 676px;
	$bp-medium: 1024px;

	:global(.rave *) {
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
	}

	.rave {
		--ag-green: #00ff85;
		--ag-mag: #ff00aa;
		--ag-yel: #fff200;
		--ag-blk: #0a0a0a;
		--ag-wht: #ffffff;

		position: relative;
		background: var(--ag-green);
		color: var(--ag-blk);
		min-height: 100vh;
		overflow-x: hidden;
		isolation: isolate;
		opacity: 0;
		transition: opacity 0.4s ease;

		&.ready {
			opacity: 1;
		}

		&::before {
			content: '';
			position: fixed;
			inset: 0;
			pointer-events: none;
			z-index: 0;
			background: radial-gradient(
				600px circle at var(--mx) var(--my),
				rgba(255, 0, 170, 0.18),
				transparent 60%
			);
			mix-blend-mode: multiply;
			transition: background 0.2s ease;
		}

		&::after {
			content: '';
			position: fixed;
			inset: 0;
			pointer-events: none;
			z-index: 0;
			opacity: 0.12;
			background-image: repeating-linear-gradient(
				0deg,
				transparent 0,
				transparent 2px,
				rgba(0, 0, 0, 0.5) 2px,
				rgba(0, 0, 0, 0.5) 3px
			);
			mix-blend-mode: multiply;
		}
	}

	.mono {
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-weight: 500;
	}

	.lede {
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: clamp(0.95rem, 1.4vw, 1.15rem);
		line-height: 1.5;
		font-weight: 400;
		max-width: 60ch;
	}

	/* TICKERS */
	.ticker {
		position: relative;
		z-index: 5;
		background: var(--ag-blk);
		color: var(--ag-green);
		border-top: 4px solid var(--ag-blk);
		border-bottom: 4px solid var(--ag-blk);
		overflow: hidden;
		padding: 0.6rem 0;
		font-family: 'Anton', sans-serif;
		font-size: clamp(1rem, 2vw, 1.4rem);
		letter-spacing: 0.05em;

		&.top {
			border-top: none;
		}

		&.bottom {
			background: var(--ag-mag);
			color: var(--ag-blk);
		}
	}

	.ticker-track {
		display: flex;
		white-space: nowrap;
		animation: scroll-left 50s linear infinite;
		gap: 1rem;

		&.reverse {
			animation: scroll-right 60s linear infinite;
		}
	}

	@keyframes scroll-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@keyframes scroll-right {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(0);
		}
	}

	/* HERO */
	.hero {
		position: relative;
		z-index: 2;
		padding: clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem) clamp(2rem, 5vw, 4rem);
		max-width: 1500px;
		margin: 0 auto;
	}

	.hero-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.9rem;
		background: var(--ag-blk);
		color: var(--ag-green);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		margin-bottom: clamp(1.5rem, 3vw, 2.5rem);

		.bracket {
			color: var(--ag-mag);
		}

		.blink {
			color: var(--ag-mag);
			animation: blink 1s steps(2) infinite;
		}
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.mega {
		font-family: 'Anton', 'Arial Narrow', sans-serif;
		font-weight: 400;
		line-height: 0.85;
		letter-spacing: -0.02em;
		font-size: clamp(3.5rem, 14vw, 14rem);
		text-transform: uppercase;
		margin: 0 0 clamp(1.5rem, 3vw, 2.5rem);

		.line {
			display: block;
			color: var(--ag-blk);
			-webkit-text-stroke: 0;
			transition: transform 0.3s ease;

			&.l2 {
				color: var(--ag-mag);
				-webkit-text-stroke: 3px var(--ag-blk);
				padding-left: clamp(1rem, 6vw, 6rem);
				transform: skewX(-3deg);
			}

			&.l3 {
				color: transparent;
				-webkit-text-stroke: 3px var(--ag-blk);
				padding-left: clamp(2rem, 12vw, 12rem);
			}

			&:hover {
				transform: translate(4px, -4px) skewX(-2deg);
			}
		}
	}

	.hero-bottom {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		align-items: end;
		margin-bottom: clamp(2rem, 4vw, 3rem);

		@media (min-width: $bp-medium) {
			grid-template-columns: 1.5fr 1fr;
			gap: 3rem;
		}
	}

	.hero-lede {
		display: flex;
		gap: 1rem;

		.arrow {
			font-family: 'Anton', sans-serif;
			font-size: 2rem;
			line-height: 1;
			color: var(--ag-mag);
			flex-shrink: 0;
		}

		p {
			font-family: 'IBM Plex Mono', ui-monospace, monospace;
			font-size: clamp(1rem, 1.4vw, 1.2rem);
			line-height: 1.5;
			margin: 0;
			max-width: 50ch;
		}
	}

	.hero-price-card {
		position: relative;
		background: var(--ag-blk);
		color: var(--ag-yel);
		padding: 1.5rem 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		border: 4px solid var(--ag-blk);
		box-shadow: 8px 8px 0 var(--ag-mag);
		justify-self: end;
		max-width: 360px;
		width: 100%;

		.from-label {
			font-family: 'IBM Plex Mono', monospace;
			font-size: 0.75rem;
			letter-spacing: 0.25em;
			color: var(--ag-green);
		}

		.big-price {
			font-family: 'Anton', sans-serif;
			font-size: clamp(4rem, 10vw, 7rem);
			line-height: 0.85;
			color: var(--ag-yel);
			letter-spacing: -0.03em;
		}

		.negotiable {
			font-family: 'IBM Plex Mono', monospace;
			font-size: 0.75rem;
			color: var(--ag-wht);
			opacity: 0.75;
			margin-top: 0.4rem;
		}

		.sticker {
			position: absolute;
			font-family: 'Anton', sans-serif;
			font-size: 0.95rem;
			padding: 0.4rem 0.7rem;
			letter-spacing: 0.1em;
			border: 3px solid var(--ag-blk);
			animation: wobble 4s ease-in-out infinite;
		}

		.sticker-1 {
			top: -16px;
			left: -16px;
			transform: rotate(-12deg);
			background: var(--ag-yel);
			color: var(--ag-blk);
		}

		.sticker-2 {
			bottom: -14px;
			right: -14px;
			transform: rotate(8deg);
			background: var(--ag-mag);
			color: var(--ag-wht);
			animation-delay: 0.5s;
		}
	}

	@keyframes wobble {
		0%,
		100% {
			transform: rotate(var(--r, -12deg)) scale(1);
		}
		50% {
			transform: rotate(calc(var(--r, -12deg) + 4deg)) scale(1.05);
		}
	}

	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		font-family: 'Anton', sans-serif;
		font-size: clamp(1rem, 1.4vw, 1.15rem);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		text-decoration: none;
		border: 4px solid var(--ag-blk);
		cursor: pointer;
		background: var(--ag-wht);
		color: var(--ag-blk);
		border-radius: 0;
		transition: transform 0.15s ease, box-shadow 0.15s ease;
		box-shadow: 6px 6px 0 var(--ag-blk);

		&:hover {
			transform: translate(-3px, -3px);
			box-shadow: 9px 9px 0 var(--ag-blk);
		}

		&:active {
			transform: translate(2px, 2px);
			box-shadow: 2px 2px 0 var(--ag-blk);
		}

		&.btn-mag {
			background: var(--ag-mag);
			color: var(--ag-wht);
			box-shadow: 6px 6px 0 var(--ag-blk);
		}

		&.btn-yel {
			background: var(--ag-yel);
			color: var(--ag-blk);
		}

		&.btn-blk {
			background: var(--ag-blk);
			color: var(--ag-green);
			box-shadow: 6px 6px 0 var(--ag-mag);

			&:hover {
				box-shadow: 9px 9px 0 var(--ag-mag);
			}
		}

		&.btn-big {
			padding: 1.3rem 2rem;
			font-size: clamp(1.1rem, 1.6vw, 1.35rem);
		}
	}

	/* STATS */
	.stats {
		position: relative;
		z-index: 2;
		display: grid;
		grid-template-columns: 1fr 1fr;
		background: var(--ag-blk);
		border-top: 6px solid var(--ag-blk);
		border-bottom: 6px solid var(--ag-blk);

		@media (min-width: $bp-medium) {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stat {
		padding: clamp(1.5rem, 3vw, 2.5rem) 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border-right: 2px dashed rgba(0, 255, 133, 0.4);
		color: var(--ag-green);
		position: relative;

		&:last-child {
			border-right: none;
		}

		&:nth-child(2n) {
			background: #131313;
		}

		.stat-num {
			font-family: 'Anton', sans-serif;
			font-size: clamp(2.8rem, 6vw, 5rem);
			line-height: 0.9;
			color: var(--ag-yel);
			letter-spacing: -0.02em;
		}

		.stat-lbl {
			font-family: 'IBM Plex Mono', monospace;
			font-size: 0.8rem;
			letter-spacing: 0.12em;
			line-height: 1.5;
			color: var(--ag-green);
			text-transform: uppercase;
		}

		&:hover .stat-num {
			color: var(--ag-mag);
		}
	}

	/* SECTION HEAD */
	.section-head {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: clamp(2rem, 4vw, 3rem);
		max-width: 1000px;

		.kicker {
			display: inline-block;
			font-size: 0.8rem;
			padding: 0.4rem 0.8rem;
			background: var(--ag-blk);
			color: var(--ag-yel);
			align-self: flex-start;
			letter-spacing: 0.15em;
			text-transform: uppercase;
		}
	}

	.mega-h2 {
		font-family: 'Anton', 'Arial Narrow', sans-serif;
		font-weight: 400;
		font-size: clamp(2.5rem, 7vw, 6rem);
		line-height: 0.9;
		letter-spacing: -0.02em;
		text-transform: uppercase;
		color: var(--ag-blk);
		margin: 0;

		&::after {
			content: '_';
			color: var(--ag-mag);
			animation: blink 1s steps(2) infinite;
		}
	}

	/* WHY */
	.why {
		position: relative;
		z-index: 2;
		padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem);
		max-width: 1500px;
		margin: 0 auto;
	}

	.why-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;

		@media (min-width: $bp-small) {
			grid-template-columns: 1fr 1fr;
		}

		@media (min-width: $bp-medium) {
			grid-template-columns: repeat(3, 1fr);
			gap: 1.25rem;
		}
	}

	.why-card {
		position: relative;
		background: var(--ag-wht);
		border: 4px solid var(--ag-blk);
		padding: 1.5rem 1.5rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		box-shadow: 6px 6px 0 var(--ag-blk);
		transition: transform 0.2s ease, box-shadow 0.2s ease;

		&:nth-child(2n) {
			background: var(--ag-yel);
			transform: rotate(-0.6deg);
		}

		&:nth-child(3n) {
			background: var(--ag-mag);
			color: var(--ag-wht);
			transform: rotate(0.5deg);

			.why-tag {
				background: var(--ag-wht);
				color: var(--ag-blk);
			}

			.why-x {
				color: var(--ag-yel);
			}
		}

		&:hover {
			transform: translate(-3px, -3px) rotate(0deg);
			box-shadow: 10px 10px 0 var(--ag-blk);
			z-index: 3;
		}

		.why-tag {
			align-self: flex-start;
			font-family: 'IBM Plex Mono', monospace;
			font-size: 0.7rem;
			padding: 0.25rem 0.5rem;
			background: var(--ag-blk);
			color: var(--ag-green);
			letter-spacing: 0.1em;
		}

		h3 {
			font-family: 'Anton', sans-serif;
			font-weight: 400;
			font-size: clamp(1.4rem, 2.2vw, 1.85rem);
			line-height: 0.95;
			margin: 0;
			letter-spacing: -0.01em;
		}

		p {
			font-family: 'IBM Plex Mono', monospace;
			font-size: 0.85rem;
			line-height: 1.55;
			margin: 0;
		}

		.why-x {
			position: absolute;
			top: 0.5rem;
			right: 0.75rem;
			font-family: 'Anton', sans-serif;
			font-size: 1.5rem;
			color: var(--ag-mag);
			line-height: 1;
		}
	}

	/* VS */
	.vs {
		position: relative;
		z-index: 2;
		padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem);
		max-width: 1500px;
		margin: 0 auto;
	}

	.vs-wrap {
		border: 4px solid var(--ag-blk);
		background: var(--ag-wht);
		box-shadow: 10px 10px 0 var(--ag-blk);
	}

	.vs-head {
		display: grid;
		grid-template-columns: 1.4fr 1fr 1fr;
		background: var(--ag-blk);
		color: var(--ag-yel);
		border-bottom: 4px solid var(--ag-blk);
	}

	.vs-empty {
		border-right: 2px solid rgba(255, 242, 0, 0.3);
	}

	.vs-col-h {
		padding: 1rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		border-right: 2px solid rgba(255, 242, 0, 0.3);

		&:last-child {
			border-right: none;
		}

		.mono {
			font-size: 0.7rem;
			letter-spacing: 0.2em;
			color: var(--ag-green);
		}

		.lbl {
			font-family: 'Anton', sans-serif;
			font-size: clamp(1.05rem, 1.6vw, 1.4rem);
			letter-spacing: 0.05em;
		}

		&.me .lbl {
			color: var(--ag-mag);
		}
	}

	.vs-row {
		display: grid;
		grid-template-columns: 1.4fr 1fr 1fr;
		border-bottom: 2px solid var(--ag-blk);

		&:last-child {
			border-bottom: none;
		}

		&:nth-child(2n) {
			background: rgba(0, 255, 133, 0.15);
		}
	}

	.vs-rowlbl {
		padding: 1rem 1.25rem;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-weight: 500;
		border-right: 2px solid var(--ag-blk);
		display: flex;
		align-items: center;
	}

	.vs-cell {
		padding: 1rem 1.25rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 0.95rem;
		font-weight: 500;
		border-right: 2px solid var(--ag-blk);

		&:last-child {
			border-right: none;
		}

		.x,
		.check {
			width: 24px;
			height: 24px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-family: 'Anton', sans-serif;
			font-size: 1rem;
			flex-shrink: 0;
		}

		&.loss {
			color: var(--ag-blk);
			opacity: 0.85;

			.x {
				background: var(--ag-mag);
				color: var(--ag-wht);
			}
		}

		&.win {
			background: var(--ag-yel);
			color: var(--ag-blk);
			font-weight: 700;

			.check {
				background: var(--ag-blk);
				color: var(--ag-green);
			}
		}
	}

	/* BIG MARQUEE */
	.big-marquee {
		position: relative;
		z-index: 2;
		background: var(--ag-mag);
		color: var(--ag-yel);
		border-top: 6px solid var(--ag-blk);
		border-bottom: 6px solid var(--ag-blk);
		overflow: hidden;
		padding: 1.5rem 0;
		font-family: 'Anton', sans-serif;
		font-size: clamp(2.5rem, 8vw, 6rem);
		letter-spacing: -0.02em;
		text-transform: uppercase;
	}

	.big-marquee-track {
		display: flex;
		white-space: nowrap;
		animation: scroll-left 30s linear infinite;
		gap: 0;

		span {
			display: inline-block;
			padding-right: 1.5rem;

			&:nth-child(2n) {
				color: var(--ag-blk);
			}
		}
	}

	/* PROCESS */
	.process {
		position: relative;
		z-index: 2;
		padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem);
		max-width: 1500px;
		margin: 0 auto;
	}

	.proc-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.6rem;
	}

	.proc-step {
		display: grid;
		grid-template-columns: 80px 1fr;
		grid-template-rows: auto auto;
		gap: 0.4rem 1.5rem;
		padding: 1.25rem 1.5rem;
		background: var(--ag-blk);
		color: var(--ag-green);
		border: 4px solid var(--ag-blk);
		transition: transform 0.2s ease, background 0.2s ease;

		@media (min-width: $bp-small) {
			grid-template-columns: 100px 200px 1fr;
			grid-template-rows: auto;
			align-items: center;
		}

		&:hover {
			transform: translateX(8px);
			background: var(--ag-mag);
			color: var(--ag-wht);

			.pn {
				color: var(--ag-yel);
			}
			.pt {
				color: var(--ag-yel);
			}
		}

		.pn {
			font-family: 'Anton', sans-serif;
			font-size: clamp(2.5rem, 4vw, 3.5rem);
			line-height: 1;
			color: var(--ag-yel);
			grid-row: 1 / 3;
			align-self: center;

			@media (min-width: $bp-small) {
				grid-row: auto;
			}
		}

		.pt {
			font-family: 'Anton', sans-serif;
			font-size: clamp(1.4rem, 2.4vw, 2rem);
			letter-spacing: 0.05em;
			line-height: 1;
			color: var(--ag-green);
		}

		.pd {
			font-family: 'IBM Plex Mono', monospace;
			font-size: 0.85rem;
			line-height: 1.55;
			color: var(--ag-wht);
			opacity: 0.9;
		}
	}

	/* REAL */
	.real {
		position: relative;
		z-index: 2;
		padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem);
		max-width: 1500px;
		margin: 0 auto;
	}

	.real-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;

		@media (min-width: $bp-small) {
			grid-template-columns: 1fr 1fr;
		}

		@media (min-width: $bp-medium) {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}
	}

	.real-card {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: var(--ag-blk);
		background: var(--ag-wht);
		border: 4px solid var(--ag-blk);
		box-shadow: 8px 8px 0 var(--ag-blk);
		transition: transform 0.25s ease, box-shadow 0.25s ease;
		overflow: hidden;
		position: relative;

		&:nth-child(2n) {
			margin-top: 0;
			@media (min-width: $bp-medium) {
				margin-top: 2.5rem;
			}
		}

		&:hover {
			transform: translate(-4px, -4px);
			box-shadow: 12px 12px 0 var(--ag-mag);

			.real-img img {
				transform: scale(1.05);
			}

			.real-go {
				color: var(--ag-mag);
			}
		}
	}

	.real-img {
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: var(--ag-blk);
		position: relative;
		border-bottom: 4px solid var(--ag-blk);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.5s ease;
		}

		.real-badge {
			position: absolute;
			top: 0.75rem;
			left: 0.75rem;
			padding: 0.3rem 0.6rem;
			background: var(--ag-yel);
			color: var(--ag-blk);
			font-size: 0.7rem;
			letter-spacing: 0.1em;
			border: 2px solid var(--ag-blk);
		}
	}

	.real-meta {
		padding: 1.25rem 1.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		h3 {
			font-family: 'Anton', sans-serif;
			font-weight: 400;
			font-size: clamp(1.5rem, 2.4vw, 2rem);
			line-height: 0.95;
			margin: 0;
			letter-spacing: 0.01em;
		}

		p {
			margin: 0;
			font-family: 'IBM Plex Mono', monospace;
			font-size: 0.85rem;
			line-height: 1.5;
		}

		.real-go {
			margin-top: 0.4rem;
			font-size: 0.75rem;
			letter-spacing: 0.15em;
			text-transform: uppercase;
			transition: color 0.25s ease;
		}
	}

	/* FAQ */
	.faq {
		position: relative;
		z-index: 2;
		padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem);
		max-width: 1100px;
		margin: 0 auto;
	}

	.faq-list {
		list-style: none;
		padding: 0;
		margin: 0;
		border: 4px solid var(--ag-blk);
		background: var(--ag-wht);
		box-shadow: 8px 8px 0 var(--ag-mag);
	}

	.faq-item {
		border-bottom: 3px solid var(--ag-blk);

		&:last-child {
			border-bottom: none;
		}

		&.open {
			background: var(--ag-yel);

			.qx {
				color: var(--ag-mag);
				transform: rotate(90deg);
			}
		}
	}

	.faq-q {
		display: grid;
		grid-template-columns: 50px 1fr 40px;
		gap: 1rem;
		align-items: center;
		width: 100%;
		text-align: left;
		background: transparent;
		border: none;
		padding: 1.25rem 1.5rem;
		cursor: pointer;
		color: inherit;

		.qn {
			font-size: 0.85rem;
			color: var(--ag-mag);
			font-weight: 700;
		}

		.qt {
			font-family: 'Anton', sans-serif;
			font-weight: 400;
			font-size: clamp(1.05rem, 1.8vw, 1.4rem);
			line-height: 1.1;
			letter-spacing: 0.01em;
		}

		.qx {
			font-family: 'Anton', sans-serif;
			font-size: 1.8rem;
			color: var(--ag-blk);
			text-align: right;
			transition: transform 0.25s ease, color 0.25s ease;
		}

		&:hover .qt {
			color: var(--ag-mag);
		}
	}

	.faq-a {
		padding: 0 1.5rem 1.5rem 4.5rem;
		border-top: 2px dashed var(--ag-blk);
		padding-top: 1rem;

		p {
			margin: 0;
			font-family: 'IBM Plex Mono', monospace;
			font-size: 0.9rem;
			line-height: 1.65;
			max-width: 65ch;
		}
	}

	/* FINAL */
	.final {
		position: relative;
		z-index: 2;
		padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem);
		max-width: 1500px;
		margin: 0 auto;
	}

	.final-box {
		position: relative;
		background: var(--ag-blk);
		color: var(--ag-green);
		padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem);
		border: 4px solid var(--ag-blk);
		box-shadow: 12px 12px 0 var(--ag-mag);

		.kicker {
			background: var(--ag-mag);
			color: var(--ag-wht);
		}

		.mega-h2 {
			color: var(--ag-yel);

			&::after {
				color: var(--ag-mag);
			}
		}

		.lede {
			color: var(--ag-green);
		}

		.footnote {
			margin-top: 1.5rem;
			font-size: 0.75rem;
			letter-spacing: 0.15em;
			color: var(--ag-green);
			opacity: 0.7;
			text-transform: uppercase;
		}
	}

	.final-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 2rem;
	}

	.sticker-final {
		position: absolute;
		top: -28px;
		right: clamp(1rem, 4vw, 3rem);
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.6rem 1rem;
		background: var(--ag-yel);
		color: var(--ag-blk);
		border: 4px solid var(--ag-blk);
		font-family: 'Anton', sans-serif;
		font-size: 1.4rem;
		letter-spacing: 0.05em;
		transform: rotate(8deg);
		animation: wobble2 4s ease-in-out infinite;
	}

	@keyframes wobble2 {
		0%,
		100% {
			transform: rotate(8deg) scale(1);
		}
		50% {
			transform: rotate(12deg) scale(1.04);
		}
	}
</style>
