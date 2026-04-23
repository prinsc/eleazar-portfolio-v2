<script>
	import { Instagram, Facebook } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { infos = null, socials = null } = $props();

	const fallbackSocials = [
		{ id: 'facebook', url: '#' },
		{ id: 'instagram', url: '#' }
	];
	const activeSocials = $derived(
		(socials ?? []).filter((s) => s.actif).length > 0
			? (socials ?? []).filter((s) => s.actif)
			: fallbackSocials
	);

	let now = $state('00:00:00');

	onMount(() => {
		const tick = () => {
			const d = new Date();
			now = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
		};
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});
</script>

<footer class="ft">
	<!-- Status bar : LED readout -->
	<div class="ft__bar">
		<span class="ft__bar-slot ft__bar-slot--green">
			<span class="ft__bar-led"></span> END OF SIGNAL · 2026
		</span>
		<span class="ft__bar-slot">
			<span class="ft__bar-tc">[ TC {now} ]</span>
		</span>
		<span class="ft__bar-slot ft__bar-slot--end"> GAIN - 30 ANS · OUTPUT - STABLE </span>
	</div>

	<!-- Mega-block typo MJM scénique avec waveform overlay -->
	<div class="ft__mega" aria-hidden="true">
		<span class="ft__mega-pre">SIGNATURE.</span>
		<span class="ft__mega-mark">MJM</span>
		<svg class="ft__mega-wave" viewBox="0 0 800 80" preserveAspectRatio="none">
			{#each Array(80) as _, i (i)}
				<rect
					x={i * 10}
					y={40 - (Math.sin(i * 0.3) * 18 + Math.cos(i * 0.7) * 12)}
					width="3"
					height={Math.abs(Math.sin(i * 0.3) * 18 + Math.cos(i * 0.7) * 12) * 2}
					fill="currentColor"
				/>
			{/each}
		</svg>
	</div>

	<!-- Cols infos -->
	<div class="ft__cols">
		<div class="ft__col">
			<span class="ft__k">[ ADR ]</span>
			<p>
				MJM SONORISATION<br />
				337 ROUTE DE FLOBECQ<br />
				7804 OSTICHES · BE
			</p>
		</div>
		<div class="ft__col">
			<span class="ft__k">[ SIGNAL ]</span>
			<p>
				<a href="mailto:{infos?.email ?? 'contact@mjmsono.be'}"
					>{infos?.email ?? 'contact@mjmsono.be'}</a
				><br />
				<a href="tel:{(infos?.telephone ?? '+32475307333').replace(/\s/g, '')}"
					>{infos?.telephone ?? '+32 475 30 73 33'}</a
				>
			</p>
		</div>
		<div class="ft__col">
			<span class="ft__k">[ NAV ]</span>
			<p class="ft__nav">
				<a href="#top">ACCUEIL</a>
				<a href="#prestations">PRESTATIONS</a>
				<a href="#telechargements">PRESS·KIT</a>
				<a href="#tonnelle">TONNELLE</a>
				<a href="#chambre">HÔTE</a>
				<a href="#contact">CONTACT</a>
			</p>
		</div>
		<div class="ft__col">
			<span class="ft__k">[ LEGAL ]</span>
			<p>
				N° ENTREPRISE<br />
				{infos?.numeroEntreprise ?? 'BE 0819.776.395'}
			</p>
			<div class="ft__socials">
				{#each activeSocials as s (s.id)}
					<a href={s.url} target="_blank" rel="noopener" aria-label={s.id}>
						{#if s.id === 'facebook'}
							<Facebook size={14} strokeWidth={1.5} />
						{:else if s.id === 'instagram'}
							<Instagram size={14} strokeWidth={1.5} />
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</div>

	<!-- Bottom -->
	<div class="ft__bot">
		<span>© 2026 MJM SONORISATION - ALL RIGHTS RESERVED</span>
		<span class="ft__bot-r">
			BUILT BY <a href="https://kltk.be" target="_blank" rel="noopener">KLTK</a> · PRESS [Q] TO EXIT
		</span>
	</div>
</footer>

<style lang="scss">
	@use './styles/mixins' as *;

	.ft {
		padding: 0;
		background: var(--bg);
		overflow: hidden;
		border-top: 1px solid var(--rule-hot);
	}

	/* Status bar */
	.ft__bar {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.5rem;
		padding: 0.7rem 1.25rem;
		background: var(--panel);
		border-bottom: 1px solid var(--rule-hot);
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		color: var(--ink-dim);

		@include breakpoint('medium') {
			grid-template-columns: 1fr 1fr 1fr;
			padding: 0.7rem 2rem;
		}
	}
	.ft__bar-slot {
		display: inline-flex;
		align-items: center;
		gap: 0.55em;
	}
	.ft__bar-slot--green {
		color: var(--led);
	}
	.ft__bar-slot--end {
		justify-content: flex-end;
		color: var(--signal);
	}
	.ft__bar-slot:nth-child(2) {
		justify-content: center;
		color: var(--signal);
	}
	.ft__bar-tc {
		color: var(--signal);
	}
	.ft__bar-led {
		width: 8px;
		height: 8px;
		background: var(--led);
		border-radius: 50%;
		box-shadow: 0 0 6px var(--led);
		animation: ftLed 1.5s ease-in-out infinite;
	}
	@keyframes ftLed {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	/* Mega block */
	.ft__mega {
		position: relative;
		padding: 4rem 1.25rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		@include breakpoint('medium') {
			padding: 6rem 2rem 3rem;
		}
	}
	.ft__mega-pre {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.3em;
		color: var(--signal);
		margin-bottom: 0.75rem;
	}
	.ft__mega-mark {
		font-family: var(--f-display);
		font-weight: 900;
		font-size: clamp(8rem, 35vw, 28rem);
		line-height: 0.78;
		letter-spacing: -0.07em;
		color: var(--ink);
		text-transform: uppercase;
		user-select: none;
	}
	.ft__mega-wave {
		width: 100%;
		height: 60px;
		color: var(--signal);
		opacity: 0.6;
		margin-top: 1rem;
	}

	/* Cols */
	.ft__cols {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0;
		padding: 0;
		border-top: 1px solid var(--rule-hot);
		border-bottom: 1px solid var(--rule-hot);

		@include breakpoint('medium') {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	.ft__col {
		padding: 1.5rem 1.25rem;
		border-right: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);

		&:nth-child(2n) {
			border-right: none;
		}
		&:nth-last-child(-n + 2) {
			border-bottom: none;
		}

		@include breakpoint('medium') {
			padding: 2rem;
			border-bottom: none;
			&:nth-child(2n) {
				border-right: 1px solid var(--rule);
			}
			&:last-child {
				border-right: none;
			}
		}

		p {
			margin: 0;
			font-family: var(--f-mono);
			font-size: 11px;
			line-height: 1.7;
			letter-spacing: 0.08em;
			color: var(--ink);

			a {
				color: var(--ink);
				text-decoration: none;
				transition: color 0.25s ease;
				&:hover {
					color: var(--signal);
				}
			}
		}
	}
	.ft__k {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		color: var(--signal);
		margin-bottom: 0.85rem;
	}
	.ft__nav {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}
	.ft__socials {
		display: flex;
		gap: 0.4rem;
		margin-top: 1rem;

		a {
			width: 32px;
			height: 32px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			border: 1px solid var(--rule-hot);
			color: var(--ink);
			text-decoration: none;
			transition: all 0.25s ease;

			&:hover {
				background: var(--signal);
				color: var(--bg);
				border-color: var(--signal);
			}
		}
	}

	/* Bot */
	.ft__bot {
		display: flex;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1rem 1.25rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		color: var(--ink-mute);
		flex-wrap: wrap;

		@include breakpoint('medium') {
			padding: 1.25rem 2rem;
		}

		a {
			color: var(--signal);
			text-decoration: none;
			border-bottom: 1px solid transparent;
			&:hover {
				border-bottom-color: var(--signal);
			}
		}
	}
	.ft__bot-r {
		text-align: right;
	}
</style>
