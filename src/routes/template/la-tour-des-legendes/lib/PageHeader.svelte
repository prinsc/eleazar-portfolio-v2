<script>
	let { num = '', kicker = '', title = '', italic = '', lead = '' } = $props();
</script>

<header class="ph">
	<div class="bg-num" aria-hidden="true">{num}</div>
	<div class="inner">
		{#if kicker}<p class="kick">✦ {kicker} ✦</p>{/if}
		<h1>
			{#if title}<span>{title}</span>{/if}
			{#if italic}<em>{italic}</em>{/if}
		</h1>
		{#if lead}<p class="lead">{lead}</p>{/if}
	</div>
</header>

<style lang="scss">
	@use './styles/mixins' as *;

	.ph {
		position: relative;
		padding: 6rem 1.25rem 4rem;
		overflow: hidden;
		border-bottom: 1px dashed var(--rule-strong);
		@include breakpoint('medium') { padding: 8rem 2.5rem 5rem; }
		@include breakpoint('large') { padding: 10rem 4rem 6rem; }
	}
	.bg-num {
		position: absolute;
		top: 30%;
		right: -3vw;
		font-family: var(--f-display);
		font-style: italic;
		font-weight: 900;
		font-size: clamp(15rem, 35vw, 40rem);
		line-height: 0.8;
		color: var(--base-deep);
		opacity: 0.7;
		pointer-events: none;
		user-select: none;
		z-index: 0;
	}
	.inner {
		position: relative;
		z-index: 1;
		max-width: 1400px;
		margin: 0 auto;
	}
	.kick {
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1.5rem;
	}
	h1 {
		font-family: var(--f-display);
		font-size: clamp(3rem, 11vw, 9rem);
		line-height: 0.9;
		letter-spacing: -0.02em;
		span { display: block; }
		em { font-style: italic; color: var(--accent); display: block; padding-left: 1ch; }
	}
	.lead {
		margin-top: 2rem;
		font-family: var(--f-display);
		font-style: italic;
		font-size: clamp(1.1rem, 2vw, 1.4rem);
		line-height: 1.5;
		color: var(--ink-soft);
		max-width: 50ch;
	}
</style>
