<script>
	// Gate component: blocks template access until user acknowledges copyright.
	// Stored in localStorage as 'kltk-template-copyright-accepted'.
	// Shown once per browser, not per template.
	import { browser } from '$app/environment';

	let { children } = $props();

	const STORAGE_KEY = 'kltk-template-copyright-accepted';

	let accepted = $state(false);
	let checked = $state(false);
	let loaded = $state(false);

	$effect(() => {
		if (!browser) return;
		accepted = localStorage.getItem(STORAGE_KEY) === '1';
		loaded = true;
	});

	function handleAccept() {
		if (!checked) return;
		localStorage.setItem(STORAGE_KEY, '1');
		accepted = true;
	}
</script>

{#if !loaded}
	<!-- SSR / loading: render nothing to avoid flash -->
{:else if accepted}
	{@render children()}
{:else}
	<div class="gate-backdrop">
		<div class="gate-card" data-sveltekit-preload-data="false">
			<div class="gate-icon">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					width="32"
					height="32"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M15 9.354a4 4 0 10.5 3.146" />
				</svg>
			</div>

			<h2 class="gate-title">Contenu protégé</h2>

			<p class="gate-text">
				Cette page est une demonstration realisee par
				<strong>kltk.be</strong>. L'ensemble du contenu (code, design, animations, mise en page) est
				protégé par le droit d'auteur et reste la propriete exclusive de son auteur.
			</p>
			<p class="gate-text">
				Toute reproduction, copie ou reutilisation sans autorisation ecrite est strictement
				interdite.
			</p>

			<label class="gate-check">
				<input type="checkbox" bind:checked />
				<span class="gate-checkbox">
					{#if checked}
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							width="14"
							height="14"><path d="M20 6L9 17l-5-5" /></svg
						>
					{/if}
				</span>
				<span
					>J'ai lu et j'accepte les <a href="/fr/cgu" target="_blank" rel="noopener noreferrer"
						>conditions generales d'utilisation</a
					></span
				>
			</label>

			<button class="gate-btn" disabled={!checked} onclick={handleAccept}>
				Acceder a la demonstration
			</button>

			<a class="gate-back" href="/fr#realisations">Retourner au portfolio</a>
		</div>
	</div>
{/if}

<style>
	.gate-backdrop {
		position: fixed;
		inset: 0;
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background: #0a0a0a;
	}

	.gate-card {
		background: #141414;
		border: 1px solid #2a2a2a;
		border-radius: 12px;
		padding: 2.5rem 2rem;
		max-width: 480px;
		width: 100%;
		text-align: center;
		font-family:
			system-ui,
			-apple-system,
			'Segoe UI',
			sans-serif;
		color: #e5e5e5;
		-webkit-font-smoothing: antialiased;
	}

	.gate-icon {
		margin-bottom: 1.25rem;
		color: #a1a1aa;
	}

	.gate-title {
		font-size: 1.35rem;
		font-weight: 600;
		margin: 0 0 1rem;
		letter-spacing: -0.02em;
		color: #fafafa;
	}

	.gate-text {
		font-size: 0.875rem;
		line-height: 1.65;
		color: #a1a1aa;
		margin: 0 0 0.5rem;
	}

	.gate-text strong {
		color: #e5e5e5;
	}

	.gate-check {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		margin: 1.5rem 0 1.25rem;
		font-size: 0.85rem;
		color: #a1a1aa;
		cursor: pointer;
		text-align: left;
		line-height: 1.5;
	}

	.gate-check input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.gate-checkbox {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		border: 1px solid #3f3f46;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1px;
		transition:
			border-color 0.2s,
			background 0.2s;
		background: #1a1a1a;
	}

	.gate-check input:checked + .gate-checkbox {
		background: #3b82f6;
		border-color: #3b82f6;
	}

	.gate-checkbox svg {
		stroke: #fff;
	}

	.gate-check a {
		color: #3b82f6;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.gate-check a:hover {
		color: #60a5fa;
	}

	.gate-btn {
		display: block;
		width: 100%;
		padding: 0.75rem 1.5rem;
		background: #3b82f6;
		color: #fff;
		font-size: 0.875rem;
		font-weight: 500;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition:
			background 0.2s,
			opacity 0.2s;
		font-family: inherit;
	}

	.gate-btn:hover:not(:disabled) {
		background: #2563eb;
	}

	.gate-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.gate-back {
		display: inline-block;
		margin-top: 1rem;
		font-size: 0.8rem;
		color: #71717a;
		text-decoration: none;
		transition: color 0.2s;
	}

	.gate-back:hover {
		color: #a1a1aa;
	}
</style>
