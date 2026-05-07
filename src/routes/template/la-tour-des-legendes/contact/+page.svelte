<script>
	import PageHeader from '../lib/PageHeader.svelte';

	let { data } = $props();
	const infos = $derived(data?.layout?.infos ?? null);

	let nom = $state(''), email = $state(''), sujet = $state('Information'), message = $state('');
	let sent = $state(false);
	function submit(e) {
		e.preventDefault();
		if (nom && email && message) sent = true;
	}
</script>

<svelte:head>
	<title>Contact — La Tour des Légendes</title>
	<meta name="description" content="Contactez la Tour des Légendes." />
</svelte:head>

<PageHeader
	num="07"
	kicker="Contact"
	title="Nous"
	italic="écrire"
	lead="Une question, un événement privé, une presse — écrivez-nous, on répond."
/>

<section class="ct">
	<div class="grid">
		<aside class="info">
			<div class="block">
				<p class="kick">— Adresse —</p>
				<p class="big">{infos?.adresseComplete || `${infos?.ville ?? 'Ath'}, ${infos?.pays ?? 'Belgique'}`}</p>
				{#if infos?.googleMapsUrl}<a href={infos.googleMapsUrl} target="_blank" rel="noopener" class="lk">Itinéraire ↗</a>{/if}
			</div>

			<div class="block">
				<p class="kick">— Téléphone —</p>
				{#if infos?.telephone}<a class="big" href={`tel:${infos.telephone}`}>{infos.telephone}</a>
				{:else}<p class="big">À venir</p>{/if}
			</div>

			<div class="block">
				<p class="kick">— E-mail —</p>
				{#if infos?.email}<a class="big" href={`mailto:${infos.email}`}>{infos.email}</a>
				{:else}<p class="big italic">contact@latourdeslegendes.be</p>
				<!-- PLACEHOLDER → vrai e-mail -->{/if}
			</div>

			<div class="map">
				<iframe
					title="Carte"
					src="https://www.openstreetmap.org/export/embed.html?bbox=3.76,50.62,3.79,50.64&layer=mapnik&marker=50.629,3.775"
					loading="lazy"
				></iframe>
			</div>
		</aside>

		<div class="form-side">
			{#if sent}
				<div class="ok">
					<p class="big-tick">✦</p>
					<h2>Merci, <em>{nom}</em></h2>
					<p>Votre message est parti. Nous revenons vers vous très vite.</p>
				</div>
			{:else}
				<form onsubmit={submit} novalidate>
					<p class="form-kick">— Formulaire —</p>
					<label>
						<span>01 — Nom</span>
						<input type="text" bind:value={nom} required />
					</label>
					<label>
						<span>02 — E-mail</span>
						<input type="email" bind:value={email} required />
					</label>
					<label>
						<span>03 — Sujet</span>
						<select bind:value={sujet}>
							<option>Information</option>
							<option>Réservation groupe</option>
							<option>Événement privé</option>
							<option>Presse</option>
							<option>Autre</option>
						</select>
					</label>
					<label>
						<span>04 — Message</span>
						<textarea rows="6" bind:value={message} required></textarea>
					</label>
					<button type="submit">
						<span>Envoyer</span>
						<span class="ar">→</span>
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	.ct {
		padding: 4rem 1.25rem 8rem;
		max-width: 1300px;
		margin: 0 auto;
		@include breakpoint('medium') { padding: 5rem 2.5rem 10rem; }
	}
	.grid {
		display: grid;
		gap: 4rem;
		@include breakpoint('large') { grid-template-columns: 1fr 1.2fr; gap: 5rem; align-items: start; }
	}
	.info { display: flex; flex-direction: column; gap: 2.5rem; }
	.block { padding-bottom: 1.5rem; border-bottom: 1px dashed var(--rule-strong); }
	.kick {
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 0.5rem;
	}
	.big {
		display: block;
		font-family: var(--f-display);
		font-size: clamp(1.4rem, 3vw, 2rem);
		line-height: 1.25;
		&.italic { font-style: italic; }
	}
	.lk { font-family: var(--f-mono); font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent-deep); margin-top: 0.5rem; display: inline-block; }
	.map {
		aspect-ratio: 4 / 3;
		border: 1px solid var(--ink);
		filter: grayscale(0.6) contrast(1.05);
		iframe { width: 100%; height: 100%; border: 0; }
	}

	.form-kick {
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--gold-deep);
		margin-bottom: 2rem;
	}
	form { display: flex; flex-direction: column; gap: 2rem; }
	label { display: flex; flex-direction: column; gap: 0.5rem; }
	label span { font-family: var(--f-mono); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-mute); }
	input, textarea, select {
		font-family: var(--f-display);
		font-size: 1.1rem;
		padding: 0.8rem 0;
		border: 0;
		border-bottom: 1px solid var(--ink);
		background: transparent;
		color: var(--ink);
	}
	input:focus, textarea:focus, select:focus { outline: none; border-color: var(--accent); }

	button {
		align-self: flex-start;
		display: inline-flex;
		gap: 0.7rem;
		padding: 1.1rem 1.8rem;
		background: var(--ink);
		color: var(--gold);
		border: 0;
		font-family: var(--f-mono);
		font-size: 0.82rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		.ar { transition: transform 0.3s; }
		&:hover { background: var(--accent-deep); .ar { transform: translateX(6px); } }
	}

	.ok {
		text-align: center;
		padding: 4rem 1rem;
		.big-tick { font-size: 6rem; color: var(--accent); margin-bottom: 1rem; }
		h2 { font-family: var(--f-display); font-size: 2.5rem; em { font-style: italic; color: var(--accent); } }
		p { font-family: var(--f-display); font-style: italic; font-size: 1.2rem; margin-top: 1rem; }
	}
</style>
