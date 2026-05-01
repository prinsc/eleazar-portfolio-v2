<script>
	let {
		children,
		href = null,
		onclick = null,
		variant = 'primary',
		size = 'md',
		icon = null,
		iconPosition = 'right',
		target = null,
		rel = null,
		ariaLabel = null,
		dataUmamiEvent = null,
		type = 'button',
		disabled = false,
		grain = true,
		fullWidth = false
	} = $props();

	const Tag = $derived(href ? 'a' : 'button');
</script>

<svelte:element
	this={Tag}
	href={href || undefined}
	type={!href ? type : undefined}
	{onclick}
	{target}
	{rel}
	disabled={!href ? disabled : undefined}
	aria-label={ariaLabel}
	data-umami-event={dataUmamiEvent}
	class="kl-btn no-effect variant-{variant} size-{size}"
	class:grain
	class:full-width={fullWidth}
	class:icon-left={iconPosition === 'left'}
>
	{#if icon && iconPosition === 'left'}
		<span class="icon">{@render icon()}</span>
	{/if}
	<span class="label">{@render children()}</span>
	{#if icon && iconPosition === 'right'}
		<span class="icon">{@render icon()}</span>
	{/if}
</svelte:element>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	.kl-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-weight: 600;
		cursor: pointer;
		text-decoration: none;
		transition:
			transform 0.15s ease,
			background-color 0.15s ease,
			color 0.15s ease,
			opacity 0.15s ease;
		min-height: 44px;
		white-space: nowrap;
		@include borderRadius('xsmall');

		&.full-width {
			width: 100%;
		}

		&[disabled] {
			opacity: 0.5;
			cursor: not-allowed;
		}

		&:not([disabled]):hover {
			transform: scale(1.02);
		}

		&:active {
			transform: scale(0.98);
		}

		.icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 16px;
			height: 16px;
			flex-shrink: 0;
			:global(svg) {
				width: 100%;
				height: 100%;
			}
		}

		&.size-sm {
			padding: 0.5rem 1rem;
			font-size: 0.875rem;
			min-height: 36px;
			.icon {
				width: 14px;
				height: 14px;
			}
		}
		&.size-md {
			padding: 0.75rem 1.5rem;
			font-size: 1rem;
		}
		&.size-lg {
			padding: 1rem 2rem;
			font-size: 1.1rem;
			.icon {
				width: 18px;
				height: 18px;
			}
		}

		&.variant-primary {
			background: var(--color-primary);
			color: var(--color-white);
			box-shadow: 2px 2px 6px var(--color-gray-15);
		}

		&.variant-secondary {
			background: var(--color-white);
			color: var(--color-primary);
			outline: solid 1px var(--color-gray-25);
			box-shadow: 2px 2px 3px var(--color-gray-05);
			&:hover {
				outline-color: var(--color-primary);
			}
		}

		&.variant-accent {
			background: var(--primary-color-shamrock-400);
			color: var(--color-black-fix);
			box-shadow: 2px 2px 6px var(--color-gray-15);
		}

		&.variant-ghost {
			background: transparent;
			color: inherit;
			&:hover {
				background: var(--color-gray-05);
			}
		}

		&.variant-link {
			background: transparent;
			color: inherit;
			padding: 0.25rem 0.5rem;
			min-height: 32px;
			font-weight: 500;
			text-decoration: underline;
			text-underline-offset: 4px;
			&:hover {
				opacity: 0.7;
				transform: none;
			}
		}
	}
</style>
