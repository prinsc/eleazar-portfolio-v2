<script>
	let { menus = [] } = $props();
</script>

{#if menus?.length}
<section class="menus" aria-label="Formules & menus">
	<header class="mh">
		<p class="eye"><span>04</span> Formules</p>
		<h2>Pour les <em>occasions</em></h2>
	</header>

	<div class="grid">
		{#each menus as m, i}
			<article class="card" style="--i: {i};">
				<div class="card-head">
					<span class="num">№ {String(i + 1).padStart(2, '0')}</span>
					<span class="price">{m.price}€</span>
				</div>
				<h3>{m.name}</h3>
				{#if m.data?.sections?.length}
					<ul class="sections">
						{#each m.data.sections as s, j}
							<li>
								<div class="s-head">
									<span class="s-num">{String(j + 1).padStart(2, '0')}</span>
									<span class="s-titre">{s.titre}</span>
								</div>
								<p class="s-choix">{s.choix}</p>
							</li>
						{/each}
					</ul>
				{/if}
				<a class="card-cta" href="/template/la-tour-des-legendes/reservation">Réserver →</a>
			</article>
		{/each}
	</div>
</section>
{/if}

<style lang="scss">
	@use './styles/mixins' as *;

	.menus {
		padding: 4rem 1.25rem;
		background: var(--ink);
		color: var(--base);
		position: relative;
		overflow: hidden;
		@include breakpoint('medium') { padding: 6rem 2.5rem; }
		@include breakpoint('large') { padding: 8rem 4rem; }

		&::before {
			content: 'FORMULES · CARTE · TERROIR · BIÈRES · ';
			position: absolute;
			top: 1.5rem;
			left: 0;
			width: 200%;
			font-family: var(--f-mono);
			font-size: 0.72rem;
			letter-spacing: 0.3em;
			color: rgba(255, 212, 71, 0.25);
			white-space: nowrap;
			animation: scroll 60s linear infinite;
			pointer-events: none;
		}
	}
	.mh {
		max-width: 1400px;
		margin: 0 auto 4rem;
		.eye {
			font-family: var(--f-mono);
			font-size: 0.72rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--gold);
			margin-bottom: 1rem;
			display: inline-flex;
			align-items: center;
			gap: 1rem;
			span {
				padding: 0.3rem 0.6rem;
				background: var(--gold);
				color: var(--ink);
			}
		}
		h2 {
			font-family: var(--f-display);
			font-size: clamp(2.4rem, 7vw, 6rem);
			line-height: 0.95;
			em { font-style: italic; color: var(--gold); }
		}
	}
	.grid {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		@include breakpoint('medium') { grid-template-columns: repeat(2, 1fr); }
		@include breakpoint('large') { gap: 3rem; }
	}
	.card {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 212, 71, 0.18);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		position: relative;
		transition: border-color 0.3s, transform 0.4s;
		&:hover {
			border-color: var(--gold);
			transform: translateY(-4px);
		}
		@include breakpoint('medium') { padding: 3rem; }
	}
	.card-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-bottom: 1rem;
		margin-bottom: 1.5rem;
		border-bottom: 1px dashed rgba(255, 212, 71, 0.3);
		.num { font-family: var(--f-mono); font-size: 0.72rem; letter-spacing: 0.2em; color: var(--accent-soft); text-transform: uppercase; }
		.price {
			font-family: var(--f-display);
			font-style: italic;
			font-size: 2rem;
			color: var(--gold);
			line-height: 1;
		}
	}
	h3 {
		font-family: var(--f-display);
		font-size: clamp(1.8rem, 3.5vw, 2.6rem);
		line-height: 1;
		margin-bottom: 2rem;
	}
	.sections {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		flex: 1;
		margin-bottom: 2rem;
	}
	.s-head {
		display: flex;
		gap: 0.8rem;
		align-items: baseline;
		margin-bottom: 0.5rem;
		.s-num { font-family: var(--f-mono); font-size: 0.7rem; color: var(--gold); }
		.s-titre {
			font-family: var(--f-display);
			font-size: 1.15rem;
			color: var(--base);
			letter-spacing: 0.04em;
		}
	}
	.s-choix {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 0.95rem;
		line-height: 1.5;
		color: rgba(244, 244, 246, 0.7);
		padding-left: 2rem;
		@include clamp-lines(3);
	}
	.card-cta {
		display: inline-block;
		font-family: var(--f-mono);
		font-size: 0.74rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		padding: 1rem 0;
		border-top: 1px solid var(--gold);
		color: var(--gold);
		align-self: stretch;
		text-align: center;
		transition: background 0.2s, color 0.2s;
		&:hover { background: var(--gold); color: var(--ink); }
	}
	@keyframes scroll {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}
	@media (prefers-reduced-motion: reduce) {
		.menus::before, .card { animation: none; transition: none; }
	}
</style>
