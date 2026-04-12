<script>
	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="admin-shell">
	{@render children()}
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
	}
	:global(body) {
		--bg-0: #09090b;
		--bg-1: #18181b;
		--bg-2: #27272a;
		--border: #3f3f46;
		--border-subtle: #2e2e33;
		--text-0: #fafafa;
		--text-1: #a1a1aa;
		--text-2: #71717a;
		--accent: #3b82f6;
		--accent-hover: #2563eb;
		--accent-muted: rgba(59, 130, 246, 0.12);
		--danger: #ef4444;
		--danger-muted: rgba(239, 68, 68, 0.12);
		--success: #22c55e;
		--success-muted: rgba(34, 197, 94, 0.12);
		--radius-sm: 4px;
		--radius: 6px;
		--radius-lg: 8px;
		--f-mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;

		background: var(--bg-0);
		color: var(--text-0);
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
	}
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	.admin-shell {
		min-height: 100vh;
	}
</style>
