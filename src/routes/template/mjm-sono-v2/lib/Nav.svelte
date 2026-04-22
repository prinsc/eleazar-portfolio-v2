<script>
	import { onMount } from 'svelte';

	const base = '/template/mjm-sono-v2';

	const links = [
		{ href: '#prestations', label: 'PRESTATIONS', ch: 'CH·01' },
		{ href: '#telechargements', label: 'PRESS·KIT', ch: 'CH·02' },
		{ href: '#tonnelle', label: 'TONNELLE', ch: 'CH·03' },
		{ href: '#chambre', label: 'HÔTE', ch: 'CH·04' },
		{ href: '#confiance', label: 'CLIENTS', ch: 'CH·05' },
		{ href: '#contact', label: 'CONTACT', ch: 'CH·06' }
	];

	let menuOpen = $state(false);
	let scrolled = $state(false);
	let now = $state('00:00:00');

	function toggleMenu() { menuOpen = !menuOpen; }
	function closeMenu() { menuOpen = false; }

	function tick() {
		const d = new Date();
		const h = String(d.getHours()).padStart(2, '0');
		const m = String(d.getMinutes()).padStart(2, '0');
		const s = String(d.getSeconds()).padStart(2, '0');
		now = `${h}:${m}:${s}`;
	}

	onMount(() => {
		tick();
		const id = setInterval(tick, 1000);
		const onScroll = () => { scrolled = window.scrollY > 40; };
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			clearInterval(id);
			window.removeEventListener('scroll', onScroll);
		};
	});

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = menuOpen ? 'hidden' : '';
		}
	});
</script>

<!-- Rail supérieur type bandeau LCD régie -->
<header class="rail" class:rail--hide={scrolled}>
	<span class="rail__slot">
		<span class="rail__dot rail__dot--green"></span>
		<span class="rail__txt">ON AIR · DISPO</span>
	</span>
	<span class="rail__slot rail__slot--center">
		<span class="rail__tc">[TC {now}]</span>
		<span class="rail__sep">//</span>
		<span class="rail__txt">OSTICHES · BE · 50.6617°N 3.6924°E</span>
	</span>
	<span class="rail__slot rail__slot--end">
		<span class="rail__txt">GSM · +32 475 30 73 33</span>
	</span>
</header>

<nav class="nav" class:nav--scrolled={scrolled} class:nav--open={menuOpen}>
	<!-- Brand = module rack carré -->
	<a class="mark" href={base} aria-label="MJM Sonorisation">
		<span class="mark__grid">
			<span class="mark__letter">M</span>
			<span class="mark__letter">J</span>
			<span class="mark__letter">M</span>
			<span class="mark__dot"></span>
		</span>
		<span class="mark__meta">
			<span>SONO/YOHAN</span>
			<span class="mark__meta-sub">v.30 · EST·1995</span>
		</span>
	</a>

	<!-- Index numéroté style patch bay -->
	<ul class="index">
		{#each links as l}
			<li>
				<a href={l.href}>
					<span class="index__ch">{l.ch}</span>
					<span class="index__label">{l.label}</span>
				</a>
			</li>
		{/each}
	</ul>

	<div class="end">
		<a class="quote" href="#contact">
			<span class="quote__led"></span>
			<span>DEVIS</span>
			<span class="quote__sq"></span>
		</a>
		<button
			class="burger"
			class:open={menuOpen}
			onclick={toggleMenu}
			aria-label={menuOpen ? 'Fermer' : 'Menu'}
			aria-expanded={menuOpen}
		>
			<span></span><span></span><span></span>
		</button>
	</div>
</nav>

<div class="sheet" class:sheet--open={menuOpen} aria-hidden={!menuOpen}>
	<div class="sheet__grid">
		<div class="sheet__side">
			<span class="sheet__k">INDEX</span>
			<span class="sheet__v">{String(links.length).padStart(2, '0')} CH</span>
			<span class="sheet__rule"></span>
			<span class="sheet__k">TC</span>
			<span class="sheet__v sheet__v--mono">{now}</span>
			<span class="sheet__rule"></span>
			<span class="sheet__k">STATUS</span>
			<span class="sheet__v sheet__v--on">ON AIR</span>
		</div>

		<ul class="sheet__list">
			{#each links as l, i}
				<li class="sheet__item" style="--i: {i}">
					<a href={l.href} class="sheet__link" onclick={closeMenu}>
						<span class="sheet__ch">{l.ch}</span>
						<span class="sheet__text">{l.label}</span>
						<span class="sheet__arrow">→</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<div class="sheet__foot">
		<span>337 ROUTE DE FLOBECQ · 7804 OSTICHES</span>
		<a href="#contact" class="sheet__cta" onclick={closeMenu}>
			<span>DEMANDER UN DEVIS</span>
			<span class="sheet__cta-sq"></span>
		</a>
	</div>
</div>

<style lang="scss">
	@use './styles/mixins' as *;

	/* ========== RAIL LCD supérieur ========== */
	.rail {
		display: none;
		padding: 0.55rem 1.25rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--ink-dim);
		position: fixed;
		top: 0; left: 0; right: 0;
		z-index: 50;
		background: var(--panel);
		border-bottom: 1px solid var(--rule-hot);
		transition: transform 0.4s ease, opacity 0.4s ease;

		@include breakpoint('medium') {
			display: grid;
			grid-template-columns: 1fr 2fr 1fr;
			align-items: center;
			gap: 1rem;
		}

		&--hide {
			transform: translateY(-100%);
			opacity: 0;
			pointer-events: none;
		}
	}
	.rail__slot {
		display: inline-flex;
		align-items: center;
		gap: 0.7em;
		&--center { justify-self: center; color: var(--ink); }
		&--end { justify-self: end; }
	}
	.rail__dot {
		width: 8px; height: 8px;
		display: inline-block;
		&--green {
			background: var(--led);
			box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2), 0 0 12px rgba(34, 197, 94, 0.55);
			animation: pulseLed 1.8s ease-in-out infinite;
		}
	}
	@keyframes pulseLed {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}
	.rail__tc { color: var(--signal); letter-spacing: 0.08em; }
	.rail__sep { color: var(--ink-mute); }

	/* ========== NAV principale ========== */
	.nav {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: stretch;
		padding: 0;
		background: rgba(10, 10, 11, 0.68);
		backdrop-filter: saturate(160%) blur(16px);
		-webkit-backdrop-filter: saturate(160%) blur(16px);
		position: fixed;
		top: 0;
		left: 0; right: 0;
		z-index: 60;
		border-bottom: 1px solid var(--rule);
		transition: top 0.4s ease, background 0.45s ease, border-color 0.4s ease;

		@include breakpoint('medium') {
			top: 34px;
		}

		&--scrolled {
			top: 0;
			background: rgba(10, 10, 11, 0.92);
			border-bottom-color: var(--rule-hot);
		}
	}

	/* Brand mark = module carré */
	.mark {
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		text-decoration: none;
		color: var(--ink);
		padding: 0.75rem 1.25rem;
		border-right: 1px solid var(--rule);
		position: relative;
		z-index: 61;

		@include breakpoint('medium') {
			padding: 0.75rem 1.5rem;
		}
	}
	.mark__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 1px;
		width: 36px;
		height: 36px;
		background: var(--rule-hot);
		padding: 1px;
		background-clip: padding-box;
	}
	.mark__letter {
		background: var(--signal);
		color: var(--bg);
		font-family: var(--f-display);
		font-size: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}
	.mark__letter:nth-child(3) { background: var(--ink); }
	.mark__dot {
		background: var(--led);
		box-shadow: inset 0 0 4px rgba(34, 197, 94, 0.8);
	}
	.mark__meta {
		display: none;
		flex-direction: column;
		gap: 0.15rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.14em;
		line-height: 1.1;
		color: var(--ink);

		@include breakpoint('small') {
			display: flex;
		}
	}
	.mark__meta-sub {
		color: var(--signal);
		font-size: 9px;
	}

	/* Index patch bay */
	.index {
		list-style: none;
		margin: 0;
		padding: 0;
		display: none;
		align-items: stretch;
		justify-content: flex-end;

		@include breakpoint('xlarge') {
			display: flex;
		}
	}
	.index li { display: flex; }
	.index a {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 0.15rem;
		padding: 0 1.1rem;
		text-decoration: none;
		border-left: 1px solid var(--rule);
		transition: background 0.3s ease, color 0.3s ease;
		position: relative;

		&:hover {
			background: var(--signal);
			.index__ch { color: var(--bg); opacity: 0.8; }
			.index__label { color: var(--bg); }
		}
	}
	.index__ch {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		color: var(--signal);
	}
	.index__label {
		font-family: var(--f-mono);
		font-weight: 500;
		font-size: 11px;
		letter-spacing: 0.14em;
		color: var(--ink);
	}

	/* End block */
	.end {
		display: flex;
		align-items: stretch;
		border-left: 1px solid var(--rule);
		position: relative;
		z-index: 61;
	}
	.quote {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		padding: 0 1.25rem;
		background: var(--signal);
		color: var(--bg);
		text-decoration: none;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		font-weight: 600;
		transition: background 0.3s ease;

		&:hover { background: var(--ink); }
	}
	.quote__led {
		width: 7px; height: 7px;
		background: var(--bg);
		border-radius: 50%;
	}
	.quote__sq {
		width: 8px; height: 8px;
		border: 1.5px solid var(--bg);
	}

	.burger {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 54px;
		padding: 0 1rem;
		background: none;
		border: none;
		border-left: 1px solid var(--rule);
		cursor: pointer;

		@include breakpoint('xlarge') { display: none; }

		span {
			display: block;
			height: 2px;
			background: var(--ink);
			transform-origin: center;
			transition: transform 0.35s ease, opacity 0.3s;

			&:nth-child(1) { width: 100%; }
			&:nth-child(2) { width: 70%; background: var(--signal); }
			&:nth-child(3) { width: 100%; }
		}
	}
	.burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
	.burger.open span:nth-child(2) { opacity: 0; }
	.burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

	/* ========== SHEET (menu mobile plein écran) ========== */
	.sheet {
		position: fixed;
		inset: 0;
		z-index: 59;
		background: var(--bg);
		display: grid;
		grid-template-rows: 1fr auto;
		padding: 6rem 0 0;
		pointer-events: none;
		opacity: 0;
		clip-path: inset(0 0 100% 0);
		transition: opacity 0.4s ease, clip-path 0.55s cubic-bezier(0.16, 1, 0.3, 1);

		@include breakpoint('xlarge') { display: none !important; }

		&--open {
			pointer-events: auto;
			opacity: 1;
			clip-path: inset(0 0 0% 0);
		}
	}
	.sheet__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;

		@include breakpoint('medium') {
			grid-template-columns: 220px 1fr;
		}
	}
	.sheet__side {
		display: none;
		padding: 1.25rem 1.5rem;
		border-right: 1px solid var(--rule);
		flex-direction: column;
		gap: 0.5rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;

		@include breakpoint('medium') { display: flex; }
	}
	.sheet__k { color: var(--ink-mute); }
	.sheet__v { color: var(--ink); font-size: 13px; }
	.sheet__v--mono { color: var(--signal); }
	.sheet__v--on {
		color: var(--led);
		&::before {
			content: '●';
			margin-right: 0.4em;
			font-size: 10px;
		}
	}
	.sheet__rule {
		height: 1px;
		background: var(--rule);
		margin: 0.65rem 0;
	}

	.sheet__list {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.sheet__item {
		border-bottom: 1px solid var(--rule);
		transform: translateY(20px);
		opacity: 0;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
		transition-delay: calc(var(--i) * 55ms + 100ms);

		.sheet--open & {
			transform: translateY(0);
			opacity: 1;
		}
	}
	.sheet__link {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 1.25rem;
		padding: 1.1rem 1.5rem;
		text-decoration: none;
		color: var(--ink);
		transition: background 0.3s ease, padding-left 0.3s ease;

		&:hover {
			background: var(--panel);
			padding-left: 2rem;
			.sheet__arrow { color: var(--signal); transform: translateX(4px); }
		}
	}
	.sheet__ch {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		color: var(--signal);
	}
	.sheet__text {
		font-family: var(--f-display);
		font-size: clamp(1.75rem, 7vw, 3rem);
		letter-spacing: -0.01em;
		line-height: 1;
	}
	.sheet__arrow {
		color: var(--ink-mute);
		font-family: var(--f-mono);
		font-size: 18px;
		transition: color 0.3s, transform 0.3s;
	}

	.sheet__foot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.1rem 1.5rem;
		border-top: 1px solid var(--rule-hot);
		gap: 1rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		color: var(--ink-dim);
	}
	.sheet__cta {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		padding: 0.7em 1em;
		background: var(--signal);
		color: var(--bg);
		text-decoration: none;
		font-weight: 600;
	}
	.sheet__cta-sq {
		width: 8px; height: 8px;
		border: 1.5px solid var(--bg);
	}
</style>
