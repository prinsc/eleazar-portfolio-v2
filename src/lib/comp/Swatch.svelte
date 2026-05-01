<script>
	import { Copy, Check } from 'lucide-svelte';

	let { token, desc = null, copied = false, onclick = null } = $props();
</script>

<button class="kl-swatch" {onclick} aria-label="Copy {token}">
	<span class="chip" style:background="var({token})"></span>
	<span class="meta">
		<code>{token}</code>
		{#if desc}<span class="desc">{desc}</span>{/if}
	</span>
	<span class="copy-icon">
		{#if copied}<Check size={11} />{:else}<Copy size={11} />{/if}
	</span>
</button>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	.kl-swatch {
		all: unset;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		border: 1px solid var(--color-gray-15);
		@include borderRadius('xsmall');
		transition: border-color 0.15s;

		&:hover {
			border-color: var(--color-primary);
			.copy-icon {
				opacity: 1;
			}
		}

		.chip {
			width: 24px;
			height: 24px;
			border-radius: 4px;
			outline: 1px solid var(--color-gray-15);
			flex-shrink: 0;
		}

		.meta {
			flex: 1;
			min-width: 0;
			display: flex;
			flex-direction: column;
			gap: 0.1rem;

			code {
				font-family: ui-monospace, 'SFMono-Regular', monospace;
				font-size: 0.72rem;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.desc {
				font-size: 0.68rem;
				opacity: 0.6;
			}
		}

		.copy-icon {
			opacity: 0.4;
			display: inline-flex;
			transition: opacity 0.15s;
		}
	}
</style>
