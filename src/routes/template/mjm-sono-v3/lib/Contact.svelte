<script>
	import { onMount } from 'svelte';
	import { Phone, Mail, Instagram, Facebook, MapPin, Send, Check } from 'lucide-svelte';

	let { infos = null, socials = null, cta = null } = $props();

	const adresse = $derived(infos?.adresseComplete ?? '337, route de Flobecq - 7804 Ostiches');
	const numeroEntreprise = $derived(infos?.numeroEntreprise ?? 'BE 0819.776.395');
	const telephone = $derived(infos?.telephone ?? cta?.principal?.valeur ?? '+32 475 30 73 33');
	const email = $derived(infos?.email ?? cta?.secondaire?.valeur ?? 'contact@mjmsono.be');

	const socialsList = $derived(socials?.filter((s) => s.actif) ?? []);

	let nom = $state('');
	let mail = $state('');
	let tel = $state('');
	let typeEvt = $state('');
	let date = $state('');
	let message = $state('');
	let submitting = $state(false);
	let success = $state(false);
	let error = $state('');

	const types = [
		'Mariage',
		'Anniversaire',
		'Soirée',
		"Événement d'entreprise",
		'Défilé',
		'Exposition',
		'Autre'
	];

	async function handleSubmit(e) {
		e.preventDefault();
		error = '';
		if (!nom || !mail || !message) {
			error = 'COMPLÉTER LES CHAMPS REQUIS [*]';
			return;
		}
		submitting = true;
		await new Promise((r) => setTimeout(r, 700));
		submitting = false;
		success = true;
	}

	let titleEl;
	let panelEl;
	let formEl;

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(titleEl, {
			opacity: 0,
			y: 30,
			duration: 1,
			ease: 'power3.out',
			scrollTrigger: { trigger: titleEl, start: 'top 85%' }
		});
		gsap.from(panelEl, {
			opacity: 0,
			x: -30,
			duration: 0.9,
			delay: 0.1,
			ease: 'power3.out',
			scrollTrigger: { trigger: panelEl, start: 'top 88%' }
		});
		gsap.from(formEl, {
			opacity: 0,
			x: 30,
			duration: 0.9,
			delay: 0.2,
			ease: 'power3.out',
			scrollTrigger: { trigger: formEl, start: 'top 88%' }
		});
	});

	function phoneHref(t) {
		return 'tel:' + String(t).replace(/\s/g, '');
	}
</script>

<section class="ct" id="contact">
	<header class="ct__head" bind:this={titleEl}>
		<div class="ct__head-meta">
			<span class="ct__tag">SECTION/06 - INPUT.LINE</span>
			<span class="ct__head-status">
				<span class="ct__head-led"></span>
				LIGNE OUVERTE
			</span>
		</div>
		<h2 class="ct__title">
			<span class="ct__title-pre">PRESS</span>
			<span class="ct__title-main">RECORD</span>
			<span class="ct__title-bracket">[</span>
		</h2>
		<p class="ct__sub">
			Un événement, une idée - appuyez sur <span class="ct__sub-rec">●</span> et envoyez-nous votre brief.
			Réponse sous 24 à 48h.
		</p>
	</header>

	<div class="ct__grid">
		<!-- Panel infos = patch panel -->
		<aside class="panel" bind:this={panelEl}>
			<div class="panel__top">
				<span>OUTPUT · CONTACT</span>
				<span class="panel__top-id">UID·MJM-Y-01</span>
			</div>

			<div class="panel__rows">
				<div class="panel__row">
					<span class="panel__k"><MapPin size={12} strokeWidth={1.5} /> ADR</span>
					<span class="panel__v">{adresse}</span>
				</div>
				<div class="panel__row">
					<span class="panel__k">REG</span>
					<span class="panel__v panel__v--mono">{numeroEntreprise}</span>
				</div>
				<div class="panel__sep"></div>
				<a class="panel__row panel__row--link" href={phoneHref(telephone)}>
					<span class="panel__k"><Phone size={12} strokeWidth={1.5} /> TEL</span>
					<span class="panel__v">{telephone}</span>
					<span class="panel__plug"></span>
				</a>
				<a class="panel__row panel__row--link" href="mailto:{email}">
					<span class="panel__k"><Mail size={12} strokeWidth={1.5} /> MAIL</span>
					<span class="panel__v">{email}</span>
					<span class="panel__plug"></span>
				</a>
				<div class="panel__sep"></div>
				<div class="panel__row panel__row--socials">
					<span class="panel__k">SOC</span>
					<div class="panel__socials">
						{#each socialsList as s}
							{#if s.id === 'facebook' || s.label?.toLowerCase().includes('facebook')}
								<a href={s.url} target="_blank" rel="noopener" aria-label="Facebook">
									<Facebook size={14} strokeWidth={1.5} />
								</a>
							{:else if s.id === 'instagram' || s.label?.toLowerCase().includes('instagram')}
								<a href={s.url} target="_blank" rel="noopener" aria-label="Instagram">
									<Instagram size={14} strokeWidth={1.5} />
								</a>
							{/if}
						{/each}
						{#if socialsList.length === 0}
							<a href="#" aria-label="Facebook"><Facebook size={14} strokeWidth={1.5} /></a>
							<a href="#" aria-label="Instagram"><Instagram size={14} strokeWidth={1.5} /></a>
						{/if}
					</div>
				</div>
			</div>

			<div class="panel__sig">
				<div class="panel__sig-top">
					<span class="panel__sig-k">SIGNATURE OPÉRATEUR</span>
					<span class="panel__sig-rec">REC</span>
				</div>
				<span class="panel__sig-name">YOHAN</span>
				<span class="panel__sig-role">FONDATEUR · 30 ANS DE SCÈNE</span>
			</div>

			<!-- Faux waveform -->
			<svg class="panel__wave" viewBox="0 0 200 30" aria-hidden="true">
				{#each Array(40) as _, i (i)}
					<rect
						x={i * 5}
						y={15 - (Math.sin(i * 0.6) * 8 + Math.cos(i * 1.2) * 4)}
						width="2"
						height={Math.abs(Math.sin(i * 0.6) * 8 + Math.cos(i * 1.2) * 4) * 2}
						fill="currentColor"
					/>
				{/each}
			</svg>
		</aside>

		<!-- Form = recording deck -->
		<form
			class="deck"
			onsubmit={handleSubmit}
			bind:this={formEl}
			method="POST"
			action="?/contact"
			novalidate
		>
			<div class="deck__top">
				<span class="deck__top-rec">
					<span class="deck__top-rec-dot"></span>
					RECORDING SESSION
				</span>
				<span class="deck__top-id">FORM·INPUT/v2</span>
			</div>

			{#if success}
				<div class="deck__success">
					<span class="deck__success-icon"><Check size={28} strokeWidth={2} /></span>
					<h3>SIGNAL REÇU</h3>
					<p>Merci {nom || 'pour votre message'}. Yohan vous répond sous 24-48h.</p>
				</div>
			{:else}
				<div class="deck__body">
					<div class="deck__row deck__row--2">
						<label class="deck__field">
							<span class="deck__lbl">NOM <em>*</em></span>
							<input type="text" bind:value={nom} name="nom" required autocomplete="name" />
						</label>
						<label class="deck__field">
							<span class="deck__lbl">EMAIL <em>*</em></span>
							<input type="email" bind:value={mail} name="email" required autocomplete="email" />
						</label>
					</div>

					<div class="deck__row deck__row--2">
						<label class="deck__field">
							<span class="deck__lbl">TÉL</span>
							<input type="tel" bind:value={tel} name="telephone" autocomplete="tel" />
						</label>
						<label class="deck__field">
							<span class="deck__lbl">DATE</span>
							<input type="date" bind:value={date} name="date" />
						</label>
					</div>

					<label class="deck__field">
						<span class="deck__lbl">TYPE D'ÉVÉNEMENT</span>
						<select bind:value={typeEvt} name="type">
							<option value="">-- SÉLECTIONNER --</option>
							{#each types as t}
								<option value={t}>{t.toUpperCase()}</option>
							{/each}
						</select>
					</label>

					<label class="deck__field">
						<span class="deck__lbl">MESSAGE <em>*</em></span>
						<textarea
							bind:value={message}
							name="message"
							rows="5"
							required
							placeholder="Lieu, nombre d'invités, style d'ambiance..."
						></textarea>
					</label>

					{#if error}
						<p class="deck__err"><span class="deck__err-led"></span>{error}</p>
					{/if}

					<div class="deck__transport">
						<button type="submit" class="deck__send" disabled={submitting}>
							<span class="deck__send-rec"></span>
							<span>{submitting ? 'TRANSMISSION...' : 'TRANSMETTRE'}</span>
							<Send size={14} strokeWidth={1.8} />
						</button>
						<p class="deck__note">EN ENVOYANT, VOUS ACCEPTEZ D'ÊTRE RECONTACTÉ PAR YOHAN.</p>
					</div>
				</div>
			{/if}
		</form>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.ct {
		padding: 5rem 1.25rem 6rem;
		background: var(--bg);
		border-bottom: 1px solid var(--rule-hot);
		position: relative;

		@include breakpoint('medium') {
			padding: 7rem 2rem 8rem;
		}
	}

	.ct__head {
		max-width: 60rem;
		margin: 0 0 3.5rem;
	}
	.ct__head-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		padding-bottom: 0.85rem;
		border-bottom: 1px dashed var(--rule);
		margin-bottom: 1.25rem;
	}
	.ct__tag {
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.22em;
		color: var(--signal);
	}
	.ct__head-status {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		color: var(--led);
	}
	.ct__head-led {
		width: 8px;
		height: 8px;
		background: var(--led);
		border-radius: 50%;
		box-shadow:
			0 0 0 2px rgba(34, 197, 94, 0.2),
			0 0 8px rgba(34, 197, 94, 0.5);
		animation: ledPulse 1.5s ease-in-out infinite;
	}
	@keyframes ledPulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}
	.ct__title {
		margin: 0 0 1rem;
		font-family: var(--f-display);
		font-weight: 900;
		font-size: clamp(2.75rem, 9vw, 7rem);
		line-height: 0.85;
		letter-spacing: -0.04em;
		text-transform: uppercase;
		color: var(--ink);
		display: flex;
		align-items: baseline;
		gap: 0.3em;
		flex-wrap: wrap;
	}
	.ct__title-pre {
		color: transparent;
		-webkit-text-stroke: 1.5px var(--ink);
	}
	.ct__title-main {
		color: var(--signal);
	}
	.ct__title-bracket {
		color: var(--ink-mute);
		font-family: var(--f-mono);
		font-weight: 400;
		font-size: 0.5em;
	}
	.ct__sub {
		margin: 0;
		font-family: var(--f-body);
		font-size: 1rem;
		color: var(--ink-dim);
		max-width: 36rem;
		line-height: 1.55;
	}
	.ct__sub-rec {
		color: var(--signal);
		font-size: 0.8em;
		animation: ledPulse 1.4s ease-in-out infinite;
	}

	/* GRID */
	.ct__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;

		@include breakpoint('large') {
			grid-template-columns: 360px 1fr;
			gap: 2rem;
		}
	}

	/* PANEL */
	.panel {
		background: var(--panel);
		border: 1px solid var(--rule-hot);
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.panel__top {
		display: flex;
		justify-content: space-between;
		padding: 0.7rem 1rem;
		background: var(--panel-2);
		border-bottom: 1px solid var(--rule-hot);
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		color: var(--signal);
	}
	.panel__top-id {
		color: var(--ink-mute);
	}

	.panel__rows {
		padding: 1rem 1rem;
		display: flex;
		flex-direction: column;
	}
	.panel__row {
		display: grid;
		grid-template-columns: 60px 1fr auto;
		gap: 0.85rem;
		align-items: center;
		padding: 0.7rem 0;
		text-decoration: none;
		color: var(--ink);
	}
	.panel__row--link {
		transition: color 0.25s ease;
		&:hover {
			color: var(--signal);
			.panel__plug {
				background: var(--led);
				box-shadow: 0 0 6px var(--led);
			}
		}
	}
	.panel__row--socials {
		grid-template-columns: 60px 1fr;
	}
	.panel__k {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		color: var(--signal);
		display: inline-flex;
		align-items: center;
		gap: 0.35em;
	}
	.panel__v {
		font-family: var(--f-body);
		font-size: 0.9rem;
	}
	.panel__v--mono {
		font-family: var(--f-mono);
		font-size: 0.82rem;
		letter-spacing: 0.06em;
		color: var(--ink-dim);
	}
	.panel__plug {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--ink-mute);
		transition: all 0.3s ease;
	}
	.panel__sep {
		height: 1px;
		background: var(--rule);
		margin: 0.3rem 0;
	}
	.panel__socials {
		display: flex;
		gap: 0.5rem;

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

	.panel__sig {
		padding: 1rem;
		background: var(--bg);
		border-top: 1px solid var(--rule-hot);
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.panel__sig-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.panel__sig-k {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.22em;
		color: var(--ink-mute);
	}
	.panel__sig-rec {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.22em;
		color: var(--bg);
		background: var(--signal);
		padding: 0.2em 0.45em;
		font-weight: 600;
	}
	.panel__sig-name {
		font-family: var(--f-display);
		font-size: 2.2rem;
		font-weight: 900;
		color: var(--signal);
		line-height: 1;
		letter-spacing: -0.03em;
		text-transform: uppercase;
	}
	.panel__sig-role {
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		color: var(--ink-dim);
	}

	.panel__wave {
		width: 100%;
		height: 30px;
		color: var(--signal);
		opacity: 0.6;
		border-top: 1px solid var(--rule-hot);
		padding: 4px 0;
	}

	/* DECK */
	.deck {
		background: var(--panel);
		border: 1px solid var(--rule-hot);
		display: flex;
		flex-direction: column;
	}
	.deck__top {
		display: flex;
		justify-content: space-between;
		padding: 0.85rem 1.25rem;
		background: var(--bg);
		border-bottom: 1px solid var(--rule-hot);
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
	}
	.deck__top-rec {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		color: var(--signal);
	}
	.deck__top-rec-dot {
		width: 8px;
		height: 8px;
		background: var(--signal);
		border-radius: 50%;
		animation: ledPulse 1.2s ease-in-out infinite;
	}
	.deck__top-id {
		color: var(--ink-mute);
	}

	.deck__body {
		padding: 1.5rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;

		@include breakpoint('medium') {
			padding: 2rem;
		}
	}

	.deck__row {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: 1fr;

		@include breakpoint('small') {
			&--2 {
				grid-template-columns: 1fr 1fr;
			}
		}
	}

	.deck__field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.deck__lbl {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		color: var(--signal);
		em {
			color: var(--led);
			font-style: normal;
			margin-left: 0.2em;
		}
	}

	.deck__field input,
	.deck__field select,
	.deck__field textarea {
		font-family: var(--f-body);
		font-size: 0.95rem;
		background: var(--bg);
		border: 1px solid var(--rule-hot);
		padding: 0.85rem 0.85rem;
		color: var(--ink);
		outline: none;
		transition:
			border-color 0.25s ease,
			box-shadow 0.25s ease;
		width: 100%;

		&:focus {
			border-color: var(--signal);
			box-shadow: inset 0 0 0 1px var(--signal);
		}

		&::placeholder {
			color: var(--ink-mute);
		}
	}

	.deck__field select {
		appearance: none;
		cursor: pointer;
		background-image:
			linear-gradient(45deg, transparent 50%, var(--signal) 50%),
			linear-gradient(135deg, var(--signal) 50%, transparent 50%);
		background-position:
			calc(100% - 14px) center,
			calc(100% - 9px) center;
		background-size: 5px 5px;
		background-repeat: no-repeat;
		padding-right: 2rem;

		option {
			background: var(--bg);
			color: var(--ink);
		}
	}

	.deck__field textarea {
		resize: vertical;
		min-height: 130px;
	}

	.deck__err {
		margin: 0;
		display: inline-flex;
		align-items: center;
		gap: 0.55em;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		color: var(--amber);
		padding: 0.7em 0.85em;
		border: 1px solid var(--amber);
		background: rgba(245, 158, 11, 0.05);
	}
	.deck__err-led {
		width: 8px;
		height: 8px;
		background: var(--amber);
		animation: ledPulse 0.8s ease-in-out infinite;
	}

	.deck__transport {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.85rem;
		margin-top: 0.5rem;
		padding-top: 1rem;
		border-top: 1px dashed var(--rule);

		@include breakpoint('small') {
			grid-template-columns: auto 1fr;
			align-items: center;
			gap: 1.25rem;
		}
	}
	.deck__send {
		display: inline-flex;
		align-items: center;
		gap: 0.65em;
		padding: 0.95em 1.5em;
		background: var(--signal);
		color: var(--bg);
		border: none;
		font-family: var(--f-mono);
		font-weight: 600;
		font-size: 12px;
		letter-spacing: 0.22em;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover:not(:disabled) {
			background: var(--ink);
			.deck__send-rec {
				background: var(--signal);
			}
		}
		&:disabled {
			opacity: 0.6;
			cursor: wait;
		}
	}
	.deck__send-rec {
		width: 8px;
		height: 8px;
		background: var(--bg);
		border-radius: 50%;
	}
	.deck__note {
		margin: 0;
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.18em;
		color: var(--ink-mute);
		line-height: 1.5;
	}

	.deck__success {
		padding: 4rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.65rem;
	}
	.deck__success-icon {
		width: 64px;
		height: 64px;
		background: var(--led);
		color: var(--bg);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
		box-shadow:
			0 0 0 4px rgba(34, 197, 94, 0.2),
			0 0 24px rgba(34, 197, 94, 0.5);
	}
	.deck__success h3 {
		margin: 0;
		font-family: var(--f-display);
		font-size: 2.25rem;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		color: var(--ink);
	}
	.deck__success p {
		margin: 0;
		font-family: var(--f-body);
		color: var(--ink-dim);
	}
</style>
