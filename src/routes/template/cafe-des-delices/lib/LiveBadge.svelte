<script>
	// Badge compact "Ouvert · ferme dans 2h15" pour la topbar
	import { status } from './status.js';
</script>

<span class="badge">
	<span class="dot" class:is-open={$status.open} aria-hidden="true"></span>
	<span class="lbl">{$status.label}</span>
	<span class="sep">·</span>
	<span class="det">{$status.detail}</span>
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}
	.dot {
		display: inline-block;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--slate-soft);
		position: relative;
	}
	.dot.is-open {
		background: var(--ember);
	}
	.dot.is-open::after {
		content: '';
		position: absolute;
		inset: -3px;
		border-radius: 50%;
		border: 1px solid var(--ember);
		opacity: 0.5;
		animation: livepulse 2s ease-out infinite;
	}
	@keyframes livepulse {
		0% {
			transform: scale(0.6);
			opacity: 0.6;
		}
		100% {
			transform: scale(1.5);
			opacity: 0;
		}
	}
	.lbl {
		color: var(--ember);
		font-weight: 400;
	}
	.sep {
		opacity: 0.5;
	}
	.det {
		color: var(--slate-soft);
	}
</style>
