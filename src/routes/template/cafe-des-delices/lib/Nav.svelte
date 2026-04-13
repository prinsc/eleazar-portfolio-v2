<script>
	import { page } from '$app/stores';
	import LiveBadge from './LiveBadge.svelte';

	const base = '/template/cafe-des-delices';
	const links = [
		{ href: base, label: 'Maison', exact: true },
		{ href: `${base}/menu`, label: 'Carte' },
		{ href: `${base}#social`, label: 'Réseaux' },
		{ href: `${base}#visite`, label: 'Nous trouver' },
		{ href: `${base}/reservation`, label: 'Réserver' }
	];

	function isActive(href, exact) {
		const p = $page.url.pathname;
		if (exact) return p === href || p === `${href}/`;
		return p.startsWith(href);
	}
</script>

<header class="topbar">
	<span class="topbar__left">Grand Place · Ath · Belgique</span>
	<span class="topbar__center"><LiveBadge /></span>
	<span class="topbar__right">Cuisine 12h00 - 14h30 · 18h00 - 22h00</span>
</header>

<nav class="nav">
	<a class="brand" href={base}>
		<span class="brand__lg">Le Café</span>
		<em class="brand__it">des</em>
		<span class="brand__lg">Délices</span>
	</a>

	<ul class="links">
		{#each links as l}
			<li>
				<a href={l.href} class:active={isActive(l.href, l.exact)}>{l.label}</a>
			</li>
		{/each}
	</ul>

	<a class="cta" href="{base}/reservation" aria-label="Réserver une table">
		<span>Réserver une table</span>
		<svg
			viewBox="0 0 24 24"
			width="14"
			height="14"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			aria-hidden="true"
		>
			<path d="M5 12h14M13 6l6 6-6 6" />
		</svg>
	</a>
</nav>

<style lang="scss">
	@use './styles/mixins' as *;

	.topbar {
		display: none;
		padding: 0.7rem 1rem;
		border-bottom: 1px solid var(--rule);
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--slate-soft);

		@include breakpoint('medium') {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
			padding: 0.7rem 2rem;
		}
	}
	.topbar__left,
	.topbar__right {
		display: none;

		@include breakpoint('large') {
			display: inline;
		}
	}
	.topbar__center {
		flex: 1;
		text-align: center;
	}

	.nav {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--rule);
		background: var(--cream);
		position: sticky;
		top: 0;
		z-index: 50;

		@include breakpoint('large') {
			grid-template-columns: 1fr auto 1fr;
			padding: 1.5rem 2rem;
		}
	}

	.brand {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 1.2rem;
		letter-spacing: -0.01em;
		text-decoration: none;
		color: var(--slate);
		display: inline-flex;
		gap: 0.35em;
		align-items: baseline;
	}
	.brand__it {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember);
	}

	.links {
		list-style: none;
		display: none;
		gap: 2.25rem;
		margin: 0;
		padding: 0;
		justify-content: center;

		@include breakpoint('large') {
			display: flex;
		}
	}
	.links a {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate);
		position: relative;
		padding: 0.3em 0;
		transition: color 0.3s ease;
	}
	.links a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background: var(--ember);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.links a:hover,
	.links a.active {
		color: var(--ember);
	}
	.links a.active::after {
		transform: scaleX(1);
	}
	.links a:hover::after {
		transform: scaleX(1);
	}

	.cta {
		justify-self: end;
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		padding: 0.75em 1.25em;
		border: 1px solid var(--slate);
		border-radius: 999px;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate);
		background: transparent;
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.cta:hover {
		background: var(--slate);
		color: var(--cream);
	}

	.cta span {
		display: none;

		@include breakpoint('xsmall') {
			display: inline;
		}
	}
</style>
