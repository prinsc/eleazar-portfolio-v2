<script>
	import { Download, FileText, FileImage, File } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { fichiers = null } = $props();

	const defaults = [
		{ nom: 'Logo MJM - fond transparent', type: 'PNG', taille: '2.1 MB', href: '#' },
		{ nom: 'Logo MJM - version monochrome', type: 'PNG', taille: '1.3 MB', href: '#' },
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
			y: 30,
			duration: 0.9,
			ease: 'power3.out',
			scrollTrigger: { trigger: titleEl, start: 'top 85%' }
		});
		rowEls.forEach((el, i) => {
			if (!el) return;
			gsap.from(el, {
				opacity: 0,
				x: -30,
				duration: 0.6,
				delay: i * 0.05,
				ease: 'power3.out',
				scrollTrigger: { trigger: el, start: 'top 92%' }
			});
		});
	});
</script>

<section class="ds" id="telechargements">
	<!-- En-tête datasheet -->
	<div class="ds__head" bind:this={titleEl}>
		<div class="ds__head-l">
			<span class="ds__tag">SECTION/02 - DATA SHEET</span>
			<h2 class="ds__title">PRESS<span class="ds__amp">·</span>KIT</h2>
			<p class="ds__sub">
				Logos vectoriels et supports publicitaires. Téléchargement direct, format brut.
			</p>
		</div>

		<!-- Tag-id type étiquette équipement -->
		<div class="ds__tagid">
			<div class="ds__tagid-row">
				<span class="ds__tagid-k">MFG</span>
				<span class="ds__tagid-v">MJM SONORISATION</span>
			</div>
			<div class="ds__tagid-row">
				<span class="ds__tagid-k">SN</span>
				<span class="ds__tagid-v">BE-0819776395</span>
			</div>
			<div class="ds__tagid-row">
				<span class="ds__tagid-k">REV</span>
				<span class="ds__tagid-v">2026.A</span>
			</div>
			<div class="ds__tagid-row">
				<span class="ds__tagid-k">PWR</span>
				<span class="ds__tagid-v ds__tagid-v--hot">230V · 50Hz</span>
			</div>
			<div class="ds__tagid-barcode" aria-hidden="true">
				{#each Array(48) as _, i (i)}
					<span style="width: {1 + (i % 3)}px"></span>
				{/each}
			</div>
			<div class="ds__tagid-foot">UID · MJM-SONO-2026-OST-0001</div>
		</div>
	</div>

	<!-- Table type spec sheet -->
	<div class="ds__table">
		<div class="ds__th">
			<span>#</span>
			<span>FICHIER</span>
			<span>FMT</span>
			<span>TAILLE</span>
			<span>ACTION</span>
		</div>
		{#each items as f, i (f.nom + i)}
			{@const Icon = typeIcon(f.type)}
			<div class="ds__tr" bind:this={rowEls[i]}>
				<span class="ds__td ds__td--num">{String(i + 1).padStart(3, '0')}</span>
				<span class="ds__td ds__td--name">
					<span class="ds__td-ico"><Icon size={14} strokeWidth={1.5} /></span>
					<span>{f.nom}</span>
				</span>
				<span class="ds__td ds__td--type">{f.type}</span>
				<span class="ds__td ds__td--size">{f.taille ?? '-'}</span>
				<a class="ds__td ds__td--act" href={f.href ?? '#'} aria-label="Télécharger {f.nom}">
					<Download size={13} strokeWidth={1.6} />
					<span>GET</span>
				</a>
			</div>
		{/each}
	</div>

	<div class="ds__bottom">
		<span>END OF DOCUMENT · {items.length} ENTRIES</span>
		<span class="ds__bottom-sig">- Y/2026</span>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.ds {
		padding: 5rem 1.25rem 6rem;
		background: var(--panel);
		border-bottom: 1px solid var(--rule-hot);

		@include breakpoint('medium') {
			padding: 7rem 2rem;
		}
	}

	.ds__head {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		margin-bottom: 3rem;
		align-items: end;

		@include breakpoint('large') {
			grid-template-columns: 1fr 280px;
			gap: 3rem;
		}
	}
	.ds__tag {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.22em;
		color: var(--signal);
	}
	.ds__title {
		margin: 1rem 0 0.75rem;
		font-family: var(--f-display);
		font-weight: 900;
		font-size: clamp(2.5rem, 8vw, 6rem);
		line-height: 0.9;
		letter-spacing: -0.04em;
		text-transform: uppercase;
		color: var(--ink);
	}
	.ds__amp {
		color: var(--signal);
	}
	.ds__sub {
		margin: 0;
		font-family: var(--f-body);
		font-size: 1rem;
		line-height: 1.5;
		color: var(--ink-dim);
		max-width: 32rem;
	}

	/* Étiquette ID matériel */
	.ds__tagid {
		background: var(--bg);
		border: 1px solid var(--rule-hot);
		padding: 1rem 1.1rem;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		position: relative;

		&::before {
			content: 'EQUIPMENT TAG';
			position: absolute;
			top: -8px;
			left: 12px;
			background: var(--panel);
			padding: 0 0.5rem;
			color: var(--signal);
			font-size: 9px;
			letter-spacing: 0.22em;
		}
	}
	.ds__tagid-row {
		display: grid;
		grid-template-columns: 50px 1fr;
		gap: 0.75rem;
	}
	.ds__tagid-k {
		color: var(--ink-mute);
	}
	.ds__tagid-v {
		color: var(--ink);
	}
	.ds__tagid-v--hot {
		color: var(--signal);
	}
	.ds__tagid-barcode {
		display: flex;
		gap: 1px;
		align-items: stretch;
		height: 32px;
		margin-top: 0.6rem;
		padding-top: 0.6rem;
		border-top: 1px dashed var(--rule);

		span {
			background: var(--ink);
			min-width: 1px;
		}
		span:nth-child(3n) {
			background: transparent;
		}
		span:nth-child(5n) {
			background: transparent;
		}
	}
	.ds__tagid-foot {
		margin-top: 0.4rem;
		font-size: 9px;
		color: var(--ink-mute);
		text-align: center;
		letter-spacing: 0.18em;
	}

	/* TABLE */
	.ds__table {
		border: 1px solid var(--rule-hot);
		background: var(--bg);
	}
	.ds__th,
	.ds__tr {
		display: grid;
		grid-template-columns: 50px 1fr 60px 80px 90px;
		align-items: center;
		gap: 0.75rem;
		padding: 0.85rem 1rem;
		border-bottom: 1px solid var(--rule);

		@include breakpoint('medium') {
			grid-template-columns: 70px 1fr 80px 100px 110px;
			gap: 1.5rem;
			padding: 1rem 1.5rem;
		}
	}
	.ds__th {
		background: var(--panel-2);
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.2em;
		color: var(--signal);
		text-transform: uppercase;
		border-bottom: 1px solid var(--rule-hot);
	}
	.ds__tr {
		transition: background 0.25s ease;
		&:hover {
			background: var(--panel);
			.ds__td--name {
				color: var(--signal);
			}
			.ds__td--act {
				background: var(--signal);
				color: var(--bg);
				border-color: var(--signal);
			}
			.ds__td-ico {
				color: var(--signal);
			}
		}
		&:last-child {
			border-bottom: none;
		}
	}
	.ds__td {
		font-family: var(--f-body);
		font-size: 0.9rem;
		color: var(--ink);
		display: flex;
		align-items: center;
	}
	.ds__td--num {
		font-family: var(--f-mono);
		font-size: 11px;
		color: var(--ink-mute);
	}
	.ds__td--name {
		gap: 0.7rem;
		font-weight: 500;
		transition: color 0.25s ease;
		min-width: 0;
		span:last-child {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.ds__td-ico {
		color: var(--ink-dim);
		transition: color 0.25s ease;
		flex-shrink: 0;
	}
	.ds__td--type,
	.ds__td--size {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		color: var(--ink-dim);
	}
	.ds__td--act {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4em;
		padding: 0.5em 0.7em;
		border: 1px solid var(--rule-hot);
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-decoration: none;
		color: var(--ink);
		font-weight: 600;
		transition: all 0.25s ease;
	}

	.ds__bottom {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.22em;
		color: var(--ink-mute);
	}
	.ds__bottom-sig {
		color: var(--signal);
	}
</style>
