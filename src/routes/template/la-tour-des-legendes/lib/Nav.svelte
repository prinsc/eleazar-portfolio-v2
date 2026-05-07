<script>
	import { page } from '$app/stores';
	import Logo from './Logo.svelte';

	let { infos = null, cta = null } = $props();
	let open = $state(false);
	let scrolled = $state(false);

	const links = [
		{ href: '/template/la-tour-des-legendes', label: 'Accueil', num: '01' },
		{ href: '/template/la-tour-des-legendes/about', label: 'Histoire', num: '02' },
		{ href: '/template/la-tour-des-legendes/carte', label: 'Carte', num: '03' },
		{ href: '/template/la-tour-des-legendes/galerie', label: 'Galerie', num: '04' },
		{ href: '/template/la-tour-des-legendes/evenements', label: 'Événements', num: '05' },
		{ href: '/template/la-tour-des-legendes/blog', label: 'Journal', num: '06' },
		{ href: '/template/la-tour-des-legendes/contact', label: 'Contact', num: '07' }
	];

	function reservationHref() {
		if (!cta?.reservation) return '/template/la-tour-des-legendes/reservation';
		const m = cta.reservation.methode;
		if (m === 'tel' && infos?.telephone) return `tel:${infos.telephone}`;
		if (m === 'email' && infos?.email) return `mailto:${infos.email}`;
		if (m === 'url' && cta.reservation.url) return cta.reservation.url;
		return '/template/la-tour-des-legendes/reservation';
	}

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 40);
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	$effect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => (document.body.style.overflow = '');
	});
</script>

<header class="nav" class:scrolled>
	<a href="/template/la-tour-des-legendes" class="brand" aria-label="La Tour des Légendes — accueil">
		<Logo variant="black" height={48} />
	</a>

	<nav class="primary" aria-label="Navigation principale">
		<ul>
			{#each links.slice(0, 6) as l}
				<li>
					<a href={l.href} class:active={$page.url.pathname === l.href}>
						<span class="num">{l.num}</span>
						<span class="lab">{l.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="actions">
		<a class="reserver" href={reservationHref()}>
			<span>Réserver</span>
			<span aria-hidden="true">→</span>
		</a>
		<button class="burger" onclick={() => (open = !open)} aria-expanded={open} aria-label="Menu">
			<span class:o={open}></span>
			<span class:o={open}></span>
			<span class:o={open}></span>
		</button>
	</div>
</header>

{#if open}
	<div class="drawer" role="dialog" aria-modal="true">
		<button class="close" onclick={() => (open = false)} aria-label="Fermer">×</button>
		<div class="drawer-inner">
			<p class="eyebrow">Sommaire</p>
			<ul>
				{#each links as l, i}
					<li style="--i: {i}">
						<a href={l.href} onclick={() => (open = false)}>
							<span class="num">{l.num}</span>
							<span class="lab">{l.label}</span>
							<span class="ar">→</span>
						</a>
					</li>
				{/each}
			</ul>
			<div class="drawer-foot">
				<a href={reservationHref()} class="reserver big" onclick={() => (open = false)}>
					Réserver une table →
				</a>
				{#if infos?.adresseComplete || infos?.ville}
					<p class="adr">{infos?.adresseComplete || `${infos?.ville ?? 'Ath'}, ${infos?.pays ?? 'Belgique'}`}</p>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	.nav {
		position: sticky;
		top: 0;
		z-index: 100;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 2rem;
		padding: 1rem 1.25rem;
		background: rgba(244, 244, 246, 0.7);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-bottom: 1px solid transparent;
		transition: border-color 0.3s ease, padding 0.3s ease;

		&.scrolled {
			border-bottom-color: var(--rule);
			padding-block: 0.6rem;
		}
		@include breakpoint('medium') { padding: 1.25rem 2.5rem; }
		@include breakpoint('large') { padding: 1.5rem 4rem; }
	}

	.brand {
		display: flex;
		align-items: center;
		color: var(--ink);
		transition: transform 0.3s;
		:global(img) { transition: transform 0.4s; }
		&:hover :global(img) { transform: scale(1.04); }

		@include breakpoint('large') {
			:global(img) { height: 56px !important; }
		}
	}

	.primary {
		display: none;
		justify-self: center;
		@include breakpoint('xlarge') { display: block; }
		ul {
			display: flex;
			gap: 1.75rem;
		}
		a {
			display: inline-flex;
			gap: 0.4rem;
			align-items: baseline;
			font-size: 0.78rem;
			letter-spacing: 0.06em;
			text-transform: uppercase;
			color: var(--ink-soft);
			padding: 0.4rem 0;
			border-bottom: 1px solid transparent;
			transition: color 0.2s, border-color 0.3s;
			.num {
				font-family: var(--f-mono);
				color: var(--accent);
				font-size: 0.65rem;
			}
			&:hover, &.active {
				color: var(--ink);
				border-bottom-color: var(--ink);
			}
		}
	}

	.actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		justify-self: end;
		gap: 0.75rem;
		grid-column: 3;
	}
	.reserver {
		display: none;
		align-items: center;
		gap: 0.5rem;
		padding: 0.7rem 1.1rem;
		background: var(--ink);
		color: var(--gold);
		font-family: var(--f-mono);
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		border-radius: 999px;
		transition: background 0.2s, transform 0.2s;
		&:hover { background: var(--accent-deep); transform: translateY(-1px); }
		@include breakpoint('small') { display: inline-flex; }
		&.big {
			padding: 1rem 1.5rem;
			font-size: 0.82rem;
			background: var(--accent);
			color: var(--base);
			align-self: flex-start;
		}
	}
	.burger {
		--g: 5px;
		width: 38px;
		height: 38px;
		border: 1px solid var(--ink);
		background: var(--base);
		border-radius: 999px;
		position: relative;
		display: grid;
		place-items: center;
		span {
			position: absolute;
			width: 16px;
			height: 1.4px;
			background: var(--ink);
			transition: transform 0.3s, opacity 0.3s, top 0.3s;
		}
		span:nth-child(1) { top: 14px; }
		span:nth-child(2) { top: 18px; }
		span:nth-child(3) { top: 22px; }
		span.o:nth-child(1) { top: 18px; transform: rotate(45deg); }
		span.o:nth-child(2) { opacity: 0; }
		span.o:nth-child(3) { top: 18px; transform: rotate(-45deg); }
	}

	.drawer {
		position: fixed;
		inset: 0;
		background: var(--ink);
		color: var(--base);
		z-index: 999;
		overflow-y: auto;
		padding: 5rem 1.25rem 3rem;
		animation: slide 0.4s ease-out;

		@include breakpoint('medium') { padding: 6rem 4rem 4rem; }
	}
	.close {
		position: fixed;
		top: 1rem;
		right: 1.25rem;
		width: 44px;
		height: 44px;
		border: 1px solid var(--base);
		background: none;
		color: var(--base);
		font-size: 22px;
		border-radius: 999px;
		@include breakpoint('medium') { right: 2.5rem; }
	}
	.drawer-inner {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		gap: 2rem;
		@include breakpoint('large') { grid-template-columns: 1fr 1fr; align-items: end; }
	}
	.eyebrow {
		font-family: var(--f-mono);
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--gold);
		grid-column: 1 / -1;
	}
	.drawer ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		grid-column: 1;
	}
	.drawer li {
		animation: rise 0.45s ease both;
		animation-delay: calc(var(--i) * 0.04s + 0.1s);
	}
	.drawer a {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: baseline;
		gap: 1rem;
		padding: 0.6rem 0;
		font-family: var(--f-display);
		font-size: clamp(2rem, 7vw, 4.5rem);
		line-height: 1;
		border-bottom: 1px solid rgba(255, 255, 255, 0.12);
		transition: color 0.2s, padding-left 0.3s;
		.num {
			font-family: var(--f-mono);
			font-size: 0.7rem;
			color: var(--accent);
			letter-spacing: 0.15em;
			align-self: center;
		}
		.ar { font-size: 1.2rem; opacity: 0; transform: translateX(-10px); transition: 0.3s; align-self: center; }
		&:hover {
			color: var(--gold);
			padding-left: 0.5rem;
			.ar { opacity: 1; transform: translateX(0); }
		}
	}
	.drawer-foot {
		grid-column: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-top: 2rem;
		@include breakpoint('large') { grid-column: 2; padding-top: 0; }
	}
	.adr { font-family: var(--f-mono); font-size: 0.8rem; opacity: 0.6; }

	@keyframes slide {
		from { transform: translateY(-2%); opacity: 0; }
		to { transform: translateY(0); opacity: 1; }
	}
	@keyframes rise {
		from { transform: translateY(20px); opacity: 0; }
		to { transform: translateY(0); opacity: 1; }
	}
	@media (prefers-reduced-motion: reduce) {
		.drawer, .drawer li { animation: none; }
	}
</style>
