<script>
	// Page Carte complète - Le Café des Délices
	// Tab-based navigation: content swaps with crossfade + staggered reveal
	import { onMount, tick } from 'svelte';
	import MenuCard from '../lib/MenuCard.svelte';
	import { menus, carte, menuSections, cuisine } from '../lib/data.js';

	// "formules" is a special first tab, then menuSections
	const allTabs = [{ id: 'formules', label: 'Formules' }, ...menuSections];

	let activeTab = $state('formules');
	let contentEl;
	let gsapLib = $state(null);

	// Direction for slide: 1 = right, -1 = left
	let direction = $state(1);

	// Track running tweens so we can kill them on interrupt
	let runningTweens = [];

	onMount(async () => {
		gsapLib = (await import('gsap')).gsap;
		await tick();
		animateIn();
	});

	function killRunning() {
		runningTweens.forEach((t) => t.kill());
		runningTweens = [];
	}

	function animateIn() {
		if (!gsapLib || !contentEl) return;
		const items = contentEl.querySelectorAll('.anim-item');
		if (!items.length) return;

		killRunning();
		const tween = gsapLib.fromTo(
			items,
			{ opacity: 0, y: 22, filter: 'blur(4px)' },
			{
				opacity: 1,
				y: 0,
				filter: 'blur(0px)',
				duration: 0.45,
				stagger: 0.04,
				ease: 'power2.out',
				clearProps: 'filter'
			}
		);
		runningTweens.push(tween);
	}

	async function switchTab(id) {
		if (id === activeTab) return;

		// Kill any in-progress animation immediately
		killRunning();

		const oldIdx = allTabs.findIndex((t) => t.id === activeTab);
		const newIdx = allTabs.findIndex((t) => t.id === id);
		direction = newIdx > oldIdx ? 1 : -1;

		// Swap content instantly (no animate-out wait)
		activeTab = id;
		await tick();

		// Animate in new content
		if (gsapLib && contentEl) {
			const items = contentEl.querySelectorAll('.anim-item');
			const tween = gsapLib.fromTo(
				items,
				{ opacity: 0, y: 24 * direction, filter: 'blur(3px)' },
				{
					opacity: 1,
					y: 0,
					filter: 'blur(0px)',
					duration: 0.38,
					stagger: 0.03,
					ease: 'power2.out',
					clearProps: 'filter'
				}
			);
			runningTweens.push(tween);
		}
	}

	// Get categories for active tab
	function getActiveCategories() {
		const section = menuSections.find((s) => s.id === activeTab);
		if (!section) return [];
		return section.categories
			.map((name) => carte.find((c) => c.categorie === name))
			.filter(Boolean);
	}
</script>

<svelte:head>
	<title>La Carte - Le Café des Délices</title>
	<meta
		name="description"
		content="Carte complète du Café des Délices à Ath - salades, grillades, burgers, pâtes, bières belges, cocktails, desserts maison."
	/>
</svelte:head>

<!-- ─── Hero ─── -->
<section class="hero">
	<span class="eyebrow">
		<span class="rule-line"></span>
		Carte du moment
	</span>

	<h1 class="title">
		<span class="line">La</span>
		<span class="huge"><em>Carte</em></span>
	</h1>

	<p class="lede">
		Tout est préparé sur place, à la commande. Ce qui n'est plus frais n'est plus servi. Si vous
		avez une allergie, une exigence, une curiosité - dites-le-nous, nous trouverons.
	</p>

	<div class="cuisine-times">
		<span class="cuisine-label">Service en cuisine</span>
		<span class="cuisine-hours">Midi · <strong>{cuisine.midi}</strong></span>
		<span class="cuisine-sep" aria-hidden="true">/</span>
		<span class="cuisine-hours">Soir · <strong>{cuisine.soir}</strong></span>
	</div>
</section>

<!-- ─── Tabs ─── -->
<nav class="tabs" aria-label="Sections de la carte">
	<div class="tabs__track">
		{#each allTabs as tab}
			<button
				class="tabs__btn"
				class:active={activeTab === tab.id}
				onclick={() => switchTab(tab.id)}
			>
				<span class="tabs__label">{tab.label}</span>
			</button>
		{/each}
	</div>
</nav>

<!-- ─── Tab content ─── -->
<section class="tab-content" bind:this={contentEl}>
	<div class="tab-inner">
		{#if activeTab === 'formules'}
			<!-- Formules tab -->
			<div class="formules-header anim-item">
				<span class="num">00 - Formules</span>
				<h2 class="formules-title">Nos Formules</h2>
				<p class="formules-sub">Du lundi au vendredi, uniquement les midis</p>
			</div>

			<div class="lunch-card anim-item">
				<div class="lunch-card__left">
					<span class="lunch-card__tag">Lunch</span>
					<span class="lunch-card__price">18,50<span class="cur">€</span></span>
				</div>
				<div class="lunch-card__right">
					<p>Entrée + Plat + Boisson chaude (café ou thé)</p>
				</div>
			</div>

			<div class="formules__grid">
				{#each menus as m, i}
					<div class="anim-item">
						<MenuCard menu={m} />
					</div>
				{/each}
			</div>
		{:else}
			<!-- Category tab -->
			{@const categories = getActiveCategories()}
			{#each categories as cat, cIdx}
				<div class="category anim-item">
					<div class="category__head">
						<h2 class="category__title">{cat.categorie}</h2>
						{#if cat.note}
							<p class="category__note">{cat.note}</p>
						{/if}
					</div>

					<ul class="items">
						{#each cat.items as item}
							<li class="item anim-item">
								<div class="item__top">
									<span class="item__name">{item.nom}</span>
									<span class="item__dots" aria-hidden="true"></span>
									<span class="item__price">{item.prix}</span>
								</div>
								{#if item.desc}
									<p class="item__desc">{item.desc}</p>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		{/if}
	</div>
</section>

<!-- ─── CTA bottom ─── -->
<section class="cta">
	<div class="cta__inner">
		<p class="cta__text">
			<em>Une faim ?</em> Nos cuisines sont ouvertes de 12h00 à 14h30 et de 18h00 à 22h00.
		</p>
		<a class="cta__link" href="/template/cafe-des-delices/reservation">
			<span>Réserver une table</span>
			<svg
				viewBox="0 0 24 24"
				width="14"
				height="14"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
			>
				<path d="M5 12h14M13 6l6 6-6 6" />
			</svg>
		</a>
	</div>
</section>

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	/* ── Hero ── */
	.hero {
		padding: 5rem 1.25rem 3rem;
		max-width: 1400px;
		margin: 0 auto;

		@include breakpoint('medium') {
			padding: 5rem 2rem 3rem;
		}
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.9em;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin-bottom: 3rem;
	}
	.rule-line {
		display: inline-block;
		width: 28px;
		height: 1px;
		background: var(--slate);
	}
	.title {
		margin: 0 0 2rem;
		font-family: var(--f-display);
		font-weight: 300;
		line-height: 0.88;
		letter-spacing: -0.035em;
	}
	.title .line {
		display: block;
		font-size: clamp(2.5rem, 8vw, 6rem);
	}
	.title .huge {
		display: block;
		padding-left: clamp(2rem, 8vw, 8rem);
	}
	.title .huge em {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		font-size: clamp(5rem, 20vw, 18rem);
		line-height: 0.82;
		color: var(--ember);
		letter-spacing: -0.04em;
	}
	.lede {
		max-width: 42rem;
		font-family: var(--f-display);
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--slate-soft);
		margin: 2rem 0 0;
	}

	.cuisine-times {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--rule);
		flex-wrap: wrap;
	}
	.cuisine-label {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin-right: 0.5rem;
	}
	.cuisine-hours {
		font-family: var(--f-display);
		font-size: 0.95rem;
		color: var(--slate);
	}
	.cuisine-hours strong {
		font-weight: 600;
		color: var(--ember);
	}
	.cuisine-sep {
		color: var(--rule);
		font-size: 0.8rem;
	}

	/* ── Tabs ── */
	.tabs {
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgba(241, 234, 216, 0.92);
		border-top: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}
	.tabs__track {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		gap: 0;
		overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
		padding: 0 1rem;

		@include breakpoint('medium') {
			padding: 0 2rem;
			justify-content: center;
		}
	}
	.tabs__track::-webkit-scrollbar {
		display: none;
	}
	.tabs__btn {
		flex-shrink: 0;
		padding: 1.1rem 1.3rem;
		background: none;
		border: none;
		cursor: pointer;
		position: relative;
		transition: color 0.3s ease;
		white-space: nowrap;
	}
	.tabs__label {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--slate-soft);
		transition: color 0.3s ease;
	}
	.tabs__btn:hover .tabs__label {
		color: var(--slate);
	}
	.tabs__btn.active .tabs__label {
		color: var(--ember);
		font-weight: 400;
	}
	.tabs__btn::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 2px;
		background: var(--ember);
		transition: all 0.4s cubic-bezier(0.22, 0.68, 0, 1.1);
		transform: translateX(-50%);
	}
	.tabs__btn.active::after {
		width: calc(100% - 2rem);
	}

	/* ── Tab content area ── */
	.tab-content {
		min-height: 60vh;
	}
	.tab-inner {
		max-width: 1000px;
		margin: 0 auto;
		padding: 3rem 1.25rem 5rem;

		@include breakpoint('medium') {
			padding: 4rem 2rem 6rem;
		}
	}

	/* ── Formules tab ── */
	.formules-header {
		margin-bottom: 2.5rem;
	}
	.num {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin-bottom: 0.5rem;
	}
	.formules-title {
		/* Present for heading hierarchy (h1 > h2 > h3), visually hidden */
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
	.formules-sub {
		margin: 0;
		font-family: var(--f-italic);
		font-style: italic;
		font-size: 1rem;
		color: var(--slate-soft);
	}

	.lunch-card {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 1.75rem 2.25rem;
		border: 1px solid var(--amber);
		background: linear-gradient(135deg, rgba(184, 133, 58, 0.05) 0%, transparent 50%);
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}
	.lunch-card__left {
		display: flex;
		align-items: baseline;
		gap: 1rem;
	}
	.lunch-card__tag {
		font-family: var(--f-italic);
		font-style: italic;
		font-size: 1.6rem;
		color: var(--amber);
		line-height: 1;
	}
	.lunch-card__price {
		font-family: var(--f-display);
		font-weight: 600;
		font-size: 2rem;
		color: var(--slate);
		letter-spacing: -0.02em;
		line-height: 1;
	}
	.lunch-card__price .cur {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		font-size: 0.85rem;
		color: var(--ember);
		margin-left: 0.12em;
	}
	.lunch-card__right p {
		margin: 0;
		font-family: var(--f-display);
		font-size: 1rem;
		color: var(--slate-soft);
		line-height: 1.5;
	}

	.formules__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@include breakpoint('medium') {
			grid-template-columns: 1fr 1fr;
		}
	}

	/* ── Category blocks ── */
	.category {
		margin-bottom: 3.5rem;

		&:last-child {
			margin-bottom: 0;
		}
	}
	.category__head {
		margin-bottom: 1rem;
		padding-bottom: 0.65rem;
		border-bottom: 1px solid var(--slate);
	}
	.category__title {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 400;
		font-size: 1.4rem;
		letter-spacing: -0.01em;
		color: var(--slate);
	}
	.category__note {
		margin: 0.4rem 0 0;
		font-family: var(--f-display);
		font-size: 0.85rem;
		font-style: italic;
		color: var(--slate-soft);
		line-height: 1.5;
	}

	/* ── Menu items ── */
	.items {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.item {
		padding: 0.7rem 0;
		border-bottom: 1px solid var(--rule);

		&:last-child {
			border-bottom: none;
		}
	}
	.item__top {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.75rem;
		align-items: baseline;
	}
	.item__name {
		font-family: var(--f-display);
		font-size: 1rem;
		color: var(--slate);
		line-height: 1.35;
	}
	.item__dots {
		height: 1px;
		min-width: 1.5rem;
		background-image: linear-gradient(to right, var(--rule) 50%, transparent 0%);
		background-size: 5px 1px;
		background-repeat: repeat-x;
		align-self: center;
	}
	.item__price {
		font-family: var(--f-mono);
		font-size: 12px;
		letter-spacing: 0.05em;
		color: var(--ember);
		white-space: nowrap;
		font-weight: 400;
	}
	.item__desc {
		margin: 0.25rem 0 0;
		font-family: var(--f-display);
		font-size: 0.85rem;
		font-style: italic;
		color: var(--slate-soft);
		line-height: 1.45;
		max-width: 38rem;
	}

	/* ── CTA ── */
	.cta {
		padding: 5rem 1.25rem;
		border-top: 1px solid var(--slate);
		background: var(--slate);
		color: var(--cream);

		@include breakpoint('medium') {
			padding: 7rem 2rem;
		}
	}
	.cta__inner {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		align-items: center;

		@include breakpoint('medium') {
			grid-template-columns: 1fr auto;
			gap: 3rem;
		}
	}
	.cta__text {
		margin: 0;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		line-height: 1.25;
		letter-spacing: -0.02em;
		color: var(--cream);
		max-width: 40rem;
	}
	.cta__text em {
		font-family: var(--f-italic);
		font-style: italic;
		color: #e8a48e; /* ember clair sur fond slate — 4.8:1 contrast */
	}
	.cta__link {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		padding: 1em 1.8em;
		border: 1px solid var(--cream);
		border-radius: 999px;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--cream);
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.cta__link:hover {
		background: var(--ember);
		border-color: var(--ember);
	}
</style>
