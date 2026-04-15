<script>
	// CTA pill button - réutilisable dans tout le template.
	// variant: 'dark' (fond clair, texte sombre) | 'glass' (fond sombre/transparent, texte cream)
	let { href, label, variant = 'dark' } = $props();
</script>

<a class="cta cta--{variant}" {href}>
	<span>{label}</span>
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

<style>
	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.55em;
		padding: 0.9em 1.4em;
		border-radius: 999px;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		background: transparent;
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}

	.cta--dark {
		border: 1px solid var(--slate);
		color: var(--slate);
	}

	.cta--dark:hover {
		background: var(--ember);
		border-color: var(--ember);
		color: var(--cream);
	}

	.cta--glass {
		border: 1px solid rgba(241, 234, 216, 0.4);
		color: var(--cream);
		backdrop-filter: blur(4px);
	}

	.cta--glass:hover {
		background: var(--ember);
		border-color: var(--ember);
		color: var(--cream);
	}
</style>
