<script>
	import { Download, FileText, FileImage, File } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { fichiers = null } = $props();

	const defaults = [
		{ nom: 'Logo MJM — fond transparent', type: 'PNG', taille: '2.1 MB', href: '#' },
		{ nom: 'Logo MJM — version monochrome', type: 'PNG', taille: '1.3 MB', href: '#' },
		{ nom: 'Dossier sponsoring 2026', type: 'PDF', taille: '4.7 MB', href: '#' },
		{ nom: 'Charte graphique', type: 'PDF', taille: '3.2 MB', href: '#' },
		{ nom: 'Kit visuel événements', type: 'ZIP', taille: '12.4 MB', href: '#' }
	];

	const items = $derived(fichiers && fichiers.length > 0 ? fichiers : defaults);

	function typeIcon(type) {
		const t = (type ?? '').toUpperCase();
		if (t === 'PDF') return FileText;
		if (t === 'PNG' || t === 'JPG' || t === 'SVG' || t === 'WEBP') return FileImage;
		return File;
	}

	let titleEl;
	let rowEls = $state([]);

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(titleEl, {
			opacity: 0,
			y: 40,
			duration: 1,
			ease: 'power3.out',
			scrollTrigger: { trigger: titleEl, start: 'top 80%' }
		});

		rowEls.forEach((el, i) => {
			if (!el) return;
			gsap.from(el, {
				opacity: 0,
				x: -24,
				duration: 0.7,
				delay: i * 0.05,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 90%' }
			});
		});
	});
</script>

<section class="telecharg" id="telechargements">
	<div class="wrap">
		<header class="head" bind:this={titleEl}>
			<div>
				<span class="eyebrow"><span class="rule"></span>Section 02 / Ressources</span>
				<h2>Téléchargements</h2>
				<p class="sub">Logos et supports publicitaires pour sponsoring &amp; partenaires.</p>
			</div>

			<aside class="logo-box" aria-label="Logo MJM Sonorisation">
				<span class="logo-box__mark">MJM</span>
				<span class="logo-box__sub">Sonorisation · Yohan</span>
				<span class="logo-box__note">Logo officiel</span>
			</aside>
		</header>

		<ul class="list">
			{#each items as f, i (f.nom + i)}
				{@const Icon = typeIcon(f.type)}
				<li class="row" bind:this={rowEls[i]}>
					<span class="row__num">{String(i + 1).padStart(2, '0')}</span>
					<span class="row__icon">
						<Icon size={18} strokeWidth={1.4} />
					</span>
					<span class="row__name">{f.nom}</span>
					<span class="row__type">{f.type}</span>
					<span class="row__size">{f.taille ?? ''}</span>
					<a class="row__action" href={f.href ?? '#'} aria-label="Télécharger {f.nom}">
						<Download size={14} strokeWidth={1.6} />
						<span>Télécharger</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.telecharg {
		padding: 6rem 1.25rem;
		border-bottom: 1px solid var(--rule);
		background: var(--coal);

		@include breakpoint('medium') {
			padding: 8rem 2rem;
		}
	}

	.wrap {
		max-width: 1400px;
		margin: 0 auto;
	}

	.head {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		margin-bottom: 4rem;
		align-items: end;

		@include breakpoint('medium') {
			grid-template-columns: 1fr auto;
			gap: 3rem;
		}
	}

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.9em;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--bone-soft);

		.rule { display: inline-block; width: 42px; height: 1px; background: var(--gold); }
	}

	h2 {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.5rem, 7vw, 5.5rem);
		line-height: 0.95;
		letter-spacing: -0.035em;
		margin: 1.25rem 0 0.75rem;
		color: var(--bone);
	}

	.sub {
		margin: 0;
		font-family: var(--f-display);
		font-style: italic;
		font-size: clamp(1rem, 1.5vw, 1.2rem);
		color: var(--bone-soft);
	}

	.logo-box {
		width: 180px;
		height: 180px;
		background: var(--graphite);
		border: 1px solid var(--rule-strong);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		position: relative;
		padding: 1rem;

		&::after {
			content: '';
			position: absolute;
			inset: 8px;
			border: 1px solid var(--rule);
			pointer-events: none;
		}

		&__mark {
			font-family: var(--f-display);
			font-weight: 600;
			font-size: 2.5rem;
			line-height: 1;
			color: var(--gold);
			letter-spacing: -0.02em;
		}

		&__sub {
			font-family: var(--f-mono);
			font-size: 9px;
			letter-spacing: 0.22em;
			text-transform: uppercase;
			color: var(--bone);
			text-align: center;
		}

		&__note {
			position: absolute;
			bottom: 0.6rem;
			font-family: var(--f-mono);
			font-size: 8px;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--bone-soft);
			opacity: 0.5;
		}
	}

	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--rule);
	}

	.row {
		display: grid;
		grid-template-columns: auto auto 1fr auto;
		align-items: center;
		gap: 1rem;
		padding: 1.25rem 0;
		border-bottom: 1px solid var(--rule);
		transition: background 0.3s ease, padding 0.35s ease;

		@include breakpoint('medium') {
			grid-template-columns: 50px 40px 1fr 80px 100px 180px;
			gap: 1.5rem;
			padding: 1.5rem 1rem;
		}

		&:hover {
			background: var(--graphite);
			padding-left: 1.5rem;

			.row__name { color: var(--gold); }
			.row__action {
				background: var(--gold);
				color: var(--void);
				border-color: var(--gold);
			}
		}
	}

	.row__num {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		color: var(--bone-soft);
	}

	.row__icon {
		color: var(--gold);
		display: inline-flex;
	}

	.row__name {
		font-family: var(--f-display);
		font-size: 1.05rem;
		color: var(--bone);
		transition: color 0.3s ease;
		grid-column: 1 / -1;

		@include breakpoint('medium') {
			grid-column: auto;
		}
	}

	.row__type,
	.row__size {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--bone-soft);
		display: none;

		@include breakpoint('medium') {
			display: inline;
		}
	}

	.row__action {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		padding: 0.7em 1em;
		border: 1px solid var(--rule-strong);
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--bone);
		transition: all 0.3s ease;
		grid-column: 1 / -1;
		justify-self: start;

		@include breakpoint('medium') {
			grid-column: auto;
			justify-self: end;
		}
	}
</style>
