<script>
	// Page Réservation - Le Café des Délices
	import { onMount, tick } from 'svelte';
	import Skeleton from '../lib/Skeleton.svelte';

	let { data } = $props();

	const infos = $derived(data.infos);
	const cuisine = $derived(data.cuisine);
	const apiReady = $derived(data.infos !== undefined);

	let gsapLib = $state(null);
	let formEl;

	// Form state
	let nom = $state('');
	let email = $state('');
	let telephone = $state('');
	let date = $state('');
	let heure = $state('');
	let couverts = $state('2');
	let message = $state('');
	let occasion = $state('');

	// Submission state (visual only - no backend)
	let submitted = $state(false);
	let submitting = $state(false);

	// Minimum date = today
	const today = new Date().toISOString().split('T')[0];

	// Available time slots
	const creneaux = [
		'12:00',
		'12:15',
		'12:30',
		'12:45',
		'13:00',
		'13:15',
		'13:30',
		'13:45',
		'14:00',
		'18:00',
		'18:15',
		'18:30',
		'18:45',
		'19:00',
		'19:15',
		'19:30',
		'19:45',
		'20:00',
		'20:15',
		'20:30',
		'20:45',
		'21:00',
		'21:15',
		'21:30'
	];

	const occasions = [
		'',
		'Anniversaire',
		'Repas d\u2019affaires',
		'Rendez-vous amoureux',
		'Repas de famille',
		'Entre amis',
		'Autre'
	];

	onMount(async () => {
		gsapLib = (await import('gsap')).gsap;
		await tick();
		animateIn();
	});

	function animateIn() {
		if (!gsapLib) return;
		const items = document.querySelectorAll('.anim-item');
		gsapLib.fromTo(
			items,
			{ opacity: 0, y: 28, filter: 'blur(4px)' },
			{
				opacity: 1,
				y: 0,
				filter: 'blur(0px)',
				duration: 0.5,
				stagger: 0.06,
				ease: 'power2.out',
				clearProps: 'filter'
			}
		);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		submitting = true;

		// Simulate sending (fake delay - backend comes later)
		await new Promise((r) => setTimeout(r, 1200));

		submitting = false;
		submitted = true;

		await tick();
		if (gsapLib) {
			const conf = document.querySelectorAll('.confirm .anim-item');
			gsapLib.fromTo(
				conf,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
			);
		}
	}

	function formatDate(d) {
		if (!d) return '';
		const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
		return new Date(d + 'T12:00:00').toLocaleDateString('fr-BE', opts);
	}
</script>

<svelte:head>
	<title>Réserver - Le Café des Délices</title>
	<meta
		name="description"
		content="Réservez votre table au Café des Délices à Ath. Restaurant-brasserie, grillades et bières belges, Grand Place d'Ath."
	/>
</svelte:head>

{#if !apiReady}
	<Skeleton variant="reservation" />
{:else}
<!-- ─── Hero ─── -->
<section class="hero">
	<span class="eyebrow anim-item">
		<span class="rule-line"></span>
		Réservation
	</span>

	<h1 class="title anim-item">
		<span class="line">Votre</span>
		<span class="huge"><em>Table</em></span>
	</h1>

	<p class="lede anim-item">
		Terrasse sur la Grand Place ou salle intérieure, midi ou soir - choisissez votre moment. Nous
		nous occupons du reste.
	</p>
</section>

{#if !submitted}
	<!-- ─── Form ─── -->
	<section class="resa" bind:this={formEl}>
		<form class="form" onsubmit={handleSubmit}>
			<!-- Left: form fields -->
			<div class="form__fields">
				<div class="field-group anim-item">
					<span class="group-label">Quand</span>
					<div class="field-row">
						<div class="field">
							<label for="date">Date</label>
							<input type="date" id="date" bind:value={date} min={today} required />
						</div>
						<div class="field">
							<label for="heure">Heure</label>
							<select id="heure" bind:value={heure} required>
								<option value="" disabled>Choisir</option>
								{#each creneaux as c}
									<option value={c}>{c}</option>
								{/each}
							</select>
						</div>
						<div class="field field--small">
							<label for="couverts">Couverts</label>
							<select id="couverts" bind:value={couverts}>
								{#each Array.from({ length: 12 }, (_, i) => i + 1) as n}
									<option value={String(n)}>{n}</option>
								{/each}
								<option value="13+">13+</option>
							</select>
						</div>
					</div>
				</div>

				<div class="field-group anim-item">
					<span class="group-label">Qui</span>
					<div class="field-row">
						<div class="field">
							<label for="nom">Nom</label>
							<input
								type="text"
								id="nom"
								bind:value={nom}
								placeholder="Votre nom"
								required
								autocomplete="name"
							/>
						</div>
					</div>
					<div class="field-row">
						<div class="field">
							<label for="email">Email</label>
							<input
								type="email"
								id="email"
								bind:value={email}
								placeholder="votre@email.com"
								required
								autocomplete="email"
							/>
						</div>
						<div class="field">
							<label for="telephone">Téléphone</label>
							<input
								type="tel"
								id="telephone"
								bind:value={telephone}
								placeholder="+32 ..."
								autocomplete="tel"
							/>
						</div>
					</div>
				</div>

				<div class="field-group anim-item">
					<span class="group-label">Détails</span>
					<div class="field-row">
						<div class="field">
							<label for="occasion">Occasion</label>
							<select id="occasion" bind:value={occasion}>
								{#each occasions as o}
									<option value={o}>{o || 'Aucune en particulier'}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="field-row">
						<div class="field">
							<label for="message">Message <span class="opt">(optionnel)</span></label>
							<textarea
								id="message"
								bind:value={message}
								rows="3"
								placeholder="Allergies, demandes particulières, placement en terrasse..."
							></textarea>
						</div>
					</div>
				</div>

				<div class="form__actions anim-item">
					<button type="submit" class="submit" disabled={submitting}>
						{#if submitting}
							<span class="spinner"></span>
							<span>Envoi en cours...</span>
						{:else}
							<span>Confirmer la réservation</span>
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
						{/if}
					</button>

					<p class="form__note">
						Vous recevrez une confirmation par email. Pour les groupes de plus de 12 personnes,
						contactez-nous directement.
					</p>
				</div>
			</div>

			<!-- Right: info sidebar -->
			<aside class="form__aside anim-item">
				{#if cuisine?.midi || cuisine?.soir}
				<div class="aside-block">
					<span class="aside-label">Service en cuisine</span>
					<p>
						{#if cuisine?.midi}Midi · <strong>{cuisine.midi}</strong><br />{/if}
						{#if cuisine?.soir}Soir · <strong>{cuisine.soir}</strong>{/if}
					</p>
				</div>
				{/if}

				{#if infos?.telephone || infos?.email}
				<div class="aside-block">
					<span class="aside-label">Nous contacter</span>
					<p>
						{#if infos?.telephone}<a href="tel:{infos.telephone}">{infos.telephone}</a><br />{/if}
						{#if infos?.email}<a href="mailto:{infos.email}">{infos.email}</a>{/if}
					</p>
				</div>
				{/if}

				{#if infos?.adresse}
				<div class="aside-block">
					<span class="aside-label">Adresse</span>
					<p>
						{infos.adresse}<br />
						{infos?.ville ?? ''}{infos?.pays ? `, ${infos.pays}` : ''}
					</p>
				</div>
				{/if}

				<div class="aside-note">
					<p>
						Pour les groupes, les privatisations ou les demandes particulières, merci de nous
						appeler directement ou d'envoyer un email.
					</p>
				</div>
			</aside>
		</form>
	</section>
{:else}
	<!-- ─── Confirmation ─── -->
	<section class="confirm">
		<div class="confirm__inner">
			<div class="confirm__icon anim-item">
				<svg
					viewBox="0 0 48 48"
					width="48"
					height="48"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<circle cx="24" cy="24" r="22" opacity="0.3" />
					<path d="M14 24l7 7 13-13" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</div>

			<h2 class="confirm__title anim-item">
				C'est <em>noté.</em>
			</h2>

			<div class="confirm__details anim-item">
				<div class="detail-row">
					<span class="detail-label">Date</span>
					<span class="detail-value">{formatDate(date)}</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Heure</span>
					<span class="detail-value">{heure}</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Couverts</span>
					<span class="detail-value">{couverts}</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Nom</span>
					<span class="detail-value">{nom}</span>
				</div>
				{#if occasion}
					<div class="detail-row">
						<span class="detail-label">Occasion</span>
						<span class="detail-value">{occasion}</span>
					</div>
				{/if}
			</div>

			<p class="confirm__text anim-item">
				Un email de confirmation sera envoyé à <strong>{email}</strong>.<br />
				{#if infos?.telephone}
					Pour toute modification, contactez-nous au
					<a href="tel:{infos.telephone}">{infos.telephone}</a>.
				{/if}
			</p>

			<div class="confirm__actions anim-item">
				<a class="btn-back" href="/template/cafe-des-delices">
					<svg
						viewBox="0 0 24 24"
						width="14"
						height="14"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path d="M19 12H5M11 18l-6-6 6-6" />
					</svg>
					<span>Retour à l'accueil</span>
				</a>
				<a class="btn-carte" href="/template/cafe-des-delices/menu">
					<span>Consulter la carte</span>
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
			</div>
		</div>
	</section>
{/if}
{/if}

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	/* ── Hero ── */
	.hero {
		padding: 5rem 1.25rem 3rem;
		max-width: 1400px;
		margin: 0 auto;

		@include breakpoint('medium') {
			padding: 5rem 2rem 3rem;
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
		color: var(--slate-soft);
		margin-bottom: 3rem;
	}
	.rule-line {
		display: inline-block;
		width: 28px;
		height: 1px;
		background: var(--slate);
	}
	.title {
		margin: 0 0 2rem;
		font-family: var(--f-display);
		font-weight: 300;
		line-height: 0.88;
		letter-spacing: -0.035em;
	}
	.title .line {
		display: block;
		font-size: clamp(2.5rem, 8vw, 6rem);
	}
	.title .huge {
		display: block;
		padding-left: clamp(2rem, 8vw, 8rem);
	}
	.title .huge em {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		font-size: clamp(5rem, 20vw, 18rem);
		line-height: 0.82;
		color: var(--ember);
		letter-spacing: -0.04em;
	}
	.lede {
		max-width: 42rem;
		font-family: var(--f-display);
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--slate-soft);
		margin: 2rem 0 0;
	}

	/* ── Form section - dark slate background ── */
	.resa {
		background: var(--slate);
		border-top: 1px solid var(--slate);
		padding: 4rem 1.25rem 5rem;

		@include breakpoint('medium') {
			padding: 5rem 2rem 6rem;
		}
	}
	.form {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;

		@include breakpoint('large') {
			grid-template-columns: 1fr 320px;
			gap: 5rem;
		}
	}

	/* ── Field groups ── */
	.field-group {
		margin-bottom: 2.5rem;
	}
	.group-label {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--ember-light);
		margin-bottom: 1.25rem;
		padding-bottom: 0.6rem;
		border-bottom: 1px solid rgba(241, 234, 216, 0.1);
	}
	.field-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-bottom: 1rem;

		@include breakpoint('xsmall') {
			grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		}
	}
	.field--small {
		max-width: 120px;
	}
	.field label {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(241, 234, 216, 0.5);
		margin-bottom: 0.5rem;
	}
	.opt {
		text-transform: none;
		letter-spacing: 0.05em;
		opacity: 0.6;
	}
	.field input,
	.field select,
	.field textarea {
		width: 100%;
		padding: 0.85rem 1rem;
		background: rgba(241, 234, 216, 0.06);
		border: 1px solid rgba(241, 234, 216, 0.15);
		color: var(--cream);
		font-family: var(--f-display);
		font-size: 1rem;
		line-height: 1.4;
		transition:
			border-color 0.3s ease,
			background 0.3s ease;
		outline: none;
	}
	.field input::placeholder,
	.field textarea::placeholder {
		color: rgba(241, 234, 216, 0.25);
		font-style: italic;
	}
	.field input:focus,
	.field select:focus,
	.field textarea:focus {
		border-color: var(--ember);
		background: rgba(241, 234, 216, 0.09);
	}
	.field select {
		cursor: pointer;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23f1ead8' stroke-width='1.5'%3E%3Cpath d='M3 4.5l3 3 3-3'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.9rem center;
		padding-right: 2.5rem;
	}
	.field select option {
		background: var(--slate);
		color: var(--cream);
	}
	.field textarea {
		resize: vertical;
		min-height: 80px;
	}

	/* ── Submit ── */
	.form__actions {
		margin-top: 1rem;
	}
	.submit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.7em;
		width: 100%;
		padding: 1.1em 2em;
		background: var(--ember);
		border: 1px solid var(--ember);
		color: var(--cream);
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);

		@include breakpoint('xsmall') {
			width: auto;
		}
	}
	.submit:hover:not(:disabled) {
		background: #c2471e;
		border-color: #c2471e;
		transform: translateY(-1px);
	}
	.submit:disabled {
		opacity: 0.7;
		cursor: wait;
	}
	.spinner {
		display: inline-block;
		width: 14px;
		height: 14px;
		border: 1.5px solid rgba(241, 234, 216, 0.3);
		border-top-color: var(--cream);
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	.form__note {
		margin: 1.25rem 0 0;
		font-family: var(--f-display);
		font-size: 0.85rem;
		line-height: 1.5;
		color: rgba(241, 234, 216, 0.35);
		font-style: italic;
		max-width: 30rem;
	}

	/* ── Aside ── */
	.form__aside {
		padding-top: 0.5rem;

		@include breakpoint('large') {
			padding-left: 2.5rem;
			border-left: 1px solid rgba(241, 234, 216, 0.1);
		}
	}
	.aside-block {
		margin-bottom: 2rem;
	}
	.aside-label {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(241, 234, 216, 0.4);
		margin-bottom: 0.6rem;
	}
	.aside-block p {
		margin: 0;
		font-family: var(--f-display);
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--cream);
	}
	.aside-block strong {
		color: var(--ember-light);
		font-weight: 600;
	}
	.aside-block a {
		color: var(--cream);
		text-decoration: none;
		border-bottom: 1px solid rgba(241, 234, 216, 0.2);
		padding-bottom: 0.15em;
		transition:
			color 0.3s ease,
			border-color 0.3s ease;
	}
	.aside-block a:hover {
		color: var(--ember-light);
		border-color: var(--ember-light);
	}
	.aside-note {
		margin-top: 2.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(241, 234, 216, 0.1);
	}
	.aside-note p {
		margin: 0;
		font-family: var(--f-italic);
		font-style: italic;
		font-size: 0.9rem;
		line-height: 1.5;
		color: rgba(241, 234, 216, 0.4);
	}

	/* ── Confirmation ── */
	.confirm {
		background: var(--slate);
		padding: 5rem 1.25rem 7rem;
		min-height: 60vh;
		display: flex;
		align-items: center;

		@include breakpoint('medium') {
			padding: 6rem 2rem 8rem;
		}
	}
	.confirm__inner {
		max-width: 640px;
		margin: 0 auto;
		width: 100%;
	}
	.confirm__icon {
		color: var(--ember-light);
		margin-bottom: 2rem;
	}
	.confirm__title {
		margin: 0 0 2.5rem;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		line-height: 0.95;
		letter-spacing: -0.03em;
		color: var(--cream);
	}
	.confirm__title em {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember-light);
	}
	.confirm__details {
		border-top: 1px solid rgba(241, 234, 216, 0.12);
		margin-bottom: 2.5rem;
	}
	.detail-row {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 1rem;
		padding: 0.85rem 0;
		border-bottom: 1px solid rgba(241, 234, 216, 0.08);
		align-items: baseline;
	}
	.detail-label {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(241, 234, 216, 0.4);
	}
	.detail-value {
		font-family: var(--f-display);
		font-size: 1rem;
		color: var(--cream);
	}
	.confirm__text {
		margin: 0 0 2.5rem;
		font-family: var(--f-display);
		font-size: 0.95rem;
		line-height: 1.6;
		color: rgba(241, 234, 216, 0.55);
	}
	.confirm__text strong {
		color: var(--cream);
		font-weight: 400;
	}
	.confirm__text a {
		color: var(--ember-light);
		text-decoration: none;
		border-bottom: 1px solid rgba(232, 164, 142, 0.3);
		padding-bottom: 0.1em;
		transition: border-color 0.3s ease;
	}
	.confirm__text a:hover {
		border-color: var(--ember-light);
	}
	.confirm__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.btn-back,
	.btn-carte {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		padding: 0.9em 1.5em;
		border: 1px solid rgba(241, 234, 216, 0.25);
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--cream);
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.btn-back:hover,
	.btn-carte:hover {
		background: rgba(241, 234, 216, 0.08);
		border-color: rgba(241, 234, 216, 0.4);
	}
	.btn-carte {
		background: var(--ember);
		border-color: var(--ember);
	}
	.btn-carte:hover {
		background: #c2471e;
		border-color: #c2471e;
	}
</style>
