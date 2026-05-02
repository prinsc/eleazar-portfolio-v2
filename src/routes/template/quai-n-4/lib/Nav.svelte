<script>
	let { infos, cta } = $props();

	let scrolled = $state(false);
	let open = $state(false);

	function onScroll() {
		scrolled = window.scrollY > 60;
	}

	$effect(() => {
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const links = [
		{ href: '#philosophie', label: 'Le restaurant' },
		{ href: '#carte', label: 'La carte' },
		{ href: '#menus', label: 'Menus' },
		{ href: '#galerie', label: 'Galerie' },
		{ href: '#evenements', label: 'Événements' },
		{ href: '#contact', label: 'Contact' }
	];
</script>

<header class="nav" class:scrolled class:open>
	<div class="row">
		<a href="#top" class="brand" aria-label="Quai n°4 — accueil">
			<span class="mono">EST. 2018</span>
			<span class="word">Quai n°4</span>
			<span class="star" aria-label="Une étoile Michelin">✦</span>
		</a>

		<nav class="links" aria-label="Navigation principale">
			{#each links as l}
				<a href={l.href} onclick={() => (open = false)}>{l.label}</a>
			{/each}
		</nav>

		<div class="end">
			{#if cta?.reservation?.url}
				<a class="reserve" href={cta.reservation.url} target="_blank" rel="noopener">
					{cta.reservation.label ?? 'Réserver'}
					<span class="arr">→</span>
				</a>
			{/if}
			<button
				class="burger"
				aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
				aria-expanded={open}
				onclick={() => (open = !open)}
			>
				<span></span><span></span><span></span>
			</button>
		</div>
	</div>

	{#if open}
		<div class="sheet">
			{#each links as l}
				<a href={l.href} onclick={() => (open = false)}>{l.label}</a>
			{/each}
			{#if cta?.reservation?.url}
				<a class="sheet-reserve" href={cta.reservation.url} target="_blank" rel="noopener">
					{cta.reservation.label ?? 'Réserver'}
				</a>
			{/if}
		</div>
	{/if}
</header>

<style lang="scss">
	@use './styles/mixins' as *;

	.nav {
		position: sticky;
		top: 0;
		z-index: 80;
		background: transparent;
		transition: background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease;
		border-bottom: 1px solid transparent;

		&.scrolled {
			background: rgba(253, 252, 248, 0.86);
			backdrop-filter: blur(14px);
			-webkit-backdrop-filter: blur(14px);
			border-bottom: 1px solid var(--q-line);
		}
	}

	.row {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 1.5rem;
		padding: 1rem 1.25rem;

		@include breakpoint('large') {
			padding: 1.25rem 2.5rem;
		}
	}

	.brand {
		display: inline-flex;
		align-items: baseline;
		gap: 0.6rem;
		text-decoration: none;
		color: var(--q-ink);

		.mono {
			font-family: var(--q-mono);
			font-size: 0.65rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--q-gold-deep);
			display: none;

			@include breakpoint('medium') {
				display: inline;
			}
		}

		.word {
			font-family: var(--q-display);
			font-size: 1.35rem;
			font-weight: 400;
			letter-spacing: -0.01em;
			font-style: italic;
		}

		.star {
			font-size: 0.85rem;
			color: var(--q-gold);
			transform: translateY(-3px);
		}
	}

	.links {
		display: none;
		justify-content: center;
		gap: 2rem;

		@include breakpoint('large') {
			display: flex;
		}

		a {
			position: relative;
			font-family: var(--q-sans);
			font-size: 0.78rem;
			font-weight: 400;
			letter-spacing: 0.16em;
			text-transform: uppercase;
			text-decoration: none;
			color: var(--q-ink);
			padding: 0.4rem 0;
			transition: color 0.25s ease;

			&::after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				width: 0;
				height: 1px;
				background: var(--q-gold);
				transition: width 0.3s ease, left 0.3s ease;
			}

			&:hover {
				color: var(--q-gold-deep);
				&::after {
					width: 100%;
					left: 0;
				}
			}
		}
	}

	.end {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		justify-self: end;
	}

	.reserve {
		display: none;
		align-items: center;
		gap: 0.6rem;
		padding: 0.7rem 1.2rem;
		border: 1px solid var(--q-ink);
		background: var(--q-ink);
		color: var(--q-cream);
		font-family: var(--q-sans);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		border-radius: var(--q-radius);
		transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;

		.arr {
			transition: transform 0.3s ease;
		}

		&:hover {
			background: var(--q-emerald-deep);
			border-color: var(--q-emerald-deep);
			color: var(--q-gold-bright);
			.arr {
				transform: translateX(4px);
			}
		}

		@include breakpoint('medium') {
			display: inline-flex;
		}
	}

	.burger {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 38px;
		height: 38px;
		padding: 0 8px;
		background: transparent;
		border: 1px solid var(--q-line);
		border-radius: var(--q-radius);
		cursor: pointer;

		span {
			display: block;
			height: 1px;
			background: var(--q-ink);
			transition: transform 0.25s ease, opacity 0.25s ease;
		}

		@include breakpoint('large') {
			display: none;
		}
	}

	.nav.open .burger span:nth-child(1) {
		transform: translateY(6px) rotate(45deg);
	}
	.nav.open .burger span:nth-child(2) {
		opacity: 0;
	}
	.nav.open .burger span:nth-child(3) {
		transform: translateY(-6px) rotate(-45deg);
	}

	.sheet {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 1.5rem;
		background: var(--q-paper);
		border-top: 1px solid var(--q-line);

		a {
			font-family: var(--q-display);
			font-size: 1.6rem;
			font-style: italic;
			color: var(--q-ink);
			text-decoration: none;
			padding: 0.6rem 0;
			border-bottom: 1px solid var(--q-line-soft);
		}

		.sheet-reserve {
			margin-top: 1rem;
			font-family: var(--q-sans);
			font-style: normal;
			font-size: 0.75rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			background: var(--q-ink);
			color: var(--q-cream);
			padding: 1rem;
			text-align: center;
			border: none;
		}

		@include breakpoint('large') {
			display: none;
		}
	}
</style>
