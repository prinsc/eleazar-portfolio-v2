<script>
	import { page } from '$app/stores';
	import SignatureCurve from './lib/SignatureCurve.svelte';
</script>

<svelte:head>
	<title>{$page.status} — La Tour des Légendes</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="err">
	<div class="big-num" aria-hidden="true">{$page.status}</div>
	<div class="content">
		<SignatureCurve size={80} color="var(--accent)" />
		<p class="kick">— Page perdue —</p>
		<h1>
			Cette page a quitté<br/>
			<em>la Tour</em>
		</h1>
		<p class="lead">
			{$page.error?.message || 'La page recherchée semble s\'être égarée dans les couloirs du folklore.'}
			Reprenez le fil par l'entrée principale.
		</p>
		<a class="back" href="/template/la-tour-des-legendes">
			<span>Retour à l'accueil</span>
			<span class="ar">→</span>
		</a>
	</div>
</section>

<style lang="scss">
	@use './lib/styles/mixins' as *;

	.err {
		min-height: 80vh;
		display: grid;
		place-items: center;
		padding: 4rem 1.25rem;
		position: relative;
		overflow: hidden;
	}
	.big-num {
		position: absolute;
		font-family: var(--f-display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(20rem, 60vw, 60rem);
		line-height: 0.8;
		color: var(--base-deep);
		opacity: 0.6;
		z-index: 0;
		pointer-events: none;
	}
	.content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	.kick {
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--accent);
	}
	h1 {
		font-family: var(--f-display);
		font-size: clamp(2.5rem, 7vw, 5rem);
		line-height: 0.95;
		em { font-style: italic; color: var(--accent); }
	}
	.lead {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1.15rem;
		line-height: 1.5;
		color: var(--ink-soft);
		margin: 1rem 0 2rem;
	}
	.back {
		display: inline-flex;
		gap: 0.7rem;
		padding: 1rem 1.6rem;
		background: var(--ink);
		color: var(--gold);
		font-family: var(--f-mono);
		font-size: 0.82rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		transition: background 0.2s;
		.ar { transition: transform 0.3s; }
		&:hover { background: var(--accent-deep); .ar { transform: translateX(6px); } }
	}
</style>
