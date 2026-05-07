<script>
	import PageHeader from '../lib/PageHeader.svelte';

	let nom = $state(''), email = $state(''), tel = $state(''), date = $state(''), heure = $state('19:30'), couverts = $state(2), msg = $state('');
	let sent = $state(false);
	let touched = $state({});

	function submit(e) {
		e.preventDefault();
		touched = { nom: true, email: true, date: true };
		if (!nom || !email || !date) return;
		sent = true;
	}
</script>

<svelte:head>
	<title>Réserver — La Tour des Légendes</title>
	<meta name="description" content="Réservez votre table à la Tour des Légendes." />
</svelte:head>

<PageHeader
	num="✦"
	kicker="Réservation"
	title="Réserver"
	italic="une table"
	lead="Quelques infos et c'est fait. Confirmation par e-mail dans la foulée."
/>

<section class="resa">
	<div class="grid">
		{#if sent}
			<div class="ok">
				<p class="big-tick">✦</p>
				<h2>Demande envoyée</h2>
				<p class="msg">
					Merci <em>{nom}</em>. Nous revenons vers vous à <strong>{email}</strong>
					dans les plus brefs délais pour confirmer votre table du <strong>{date}</strong> à <strong>{heure}</strong>.
				</p>
				<a class="back-h" href="/template/la-tour-des-legendes">← Retour à l'accueil</a>
			</div>
		{:else}
			<form class="form" onsubmit={submit} novalidate>
				<div class="row two">
					<label class:err={touched.nom && !nom}>
						<span>01 — Nom & prénom</span>
						<input type="text" bind:value={nom} onblur={() => (touched.nom = true)} required />
					</label>
					<label>
						<span>02 — Téléphone</span>
						<input type="tel" bind:value={tel} placeholder="+32 …" />
					</label>
				</div>

				<label class:err={touched.email && !email}>
					<span>03 — E-mail</span>
					<input type="email" bind:value={email} onblur={() => (touched.email = true)} required />
				</label>

				<div class="row three">
					<label class:err={touched.date && !date}>
						<span>04 — Date</span>
						<input type="date" bind:value={date} onblur={() => (touched.date = true)} required />
					</label>
					<label>
						<span>05 — Heure</span>
						<input type="time" bind:value={heure} />
					</label>
					<label>
						<span>06 — Couverts</span>
						<input type="number" min="1" max="20" bind:value={couverts} />
					</label>
				</div>

				<label>
					<span>07 — Message (allergies, occasion…)</span>
					<textarea rows="4" bind:value={msg}></textarea>
				</label>

				<button type="submit" class="submit">
					<span>Envoyer la demande</span>
					<span class="ar">→</span>
				</button>
				<p class="fineprint">
					Cette demande n'est pas une confirmation automatique — nous vous écrivons
					pour valider.
				</p>
			</form>
		{/if}

		<aside class="side">
			<p class="kick">✦ Pratique ✦</p>
			<dl>
				<div><dt>Service du midi</dt><dd>12:00 — 14:00</dd></div>
				<div><dt>Service du soir</dt><dd>18:00 — 22:00</dd></div>
				<div><dt>Fermé</dt><dd>Lundi & mardi</dd></div>
				<div><dt>Téléphone</dt><dd>Préférable pour groupes</dd></div>
			</dl>
			<div class="manifest">
				<p>
					<em>« Une table à la Tour, c'est avant tout une rencontre — appelez-nous, on s'arrange. »</em>
				</p>
			</div>
		</aside>
	</div>
</section>

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	.resa {
		padding: 4rem 1.25rem 8rem;
		max-width: 1200px;
		margin: 0 auto;
		@include breakpoint('medium') { padding: 5rem 2.5rem 10rem; }
	}
	.grid {
		display: grid;
		gap: 3rem;
		@include breakpoint('large') { grid-template-columns: 1.5fr 1fr; gap: 5rem; align-items: start; }
	}

	.form { display: flex; flex-direction: column; gap: 2rem; }
	.row { display: grid; gap: 2rem; }
	.row.two { @include breakpoint('small') { grid-template-columns: 1fr 1fr; } }
	.row.three { @include breakpoint('small') { grid-template-columns: 2fr 1fr 1fr; } }

	label {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		span {
			font-family: var(--f-mono);
			font-size: 0.7rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--ink-mute);
		}
		&.err input, &.err textarea { border-color: var(--accent); }
		&.err span { color: var(--accent); }
	}
	input, textarea {
		font-family: var(--f-display);
		font-size: 1.1rem;
		padding: 0.8rem 0;
		border: 0;
		border-bottom: 1px solid var(--ink);
		background: transparent;
		color: var(--ink);
		transition: border-color 0.2s;
		&:focus {
			outline: none;
			border-color: var(--accent);
		}
	}
	textarea {
		resize: vertical;
		font-family: var(--f-display);
	}
	.submit {
		align-self: flex-start;
		display: inline-flex;
		gap: 0.7rem;
		padding: 1.2rem 1.8rem;
		background: var(--ink);
		color: var(--gold);
		border: 0;
		font-family: var(--f-mono);
		font-size: 0.82rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		.ar { transition: transform 0.3s; }
		&:hover {
			background: var(--accent-deep);
			.ar { transform: translateX(6px); }
		}
	}
	.fineprint {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 0.9rem;
		color: var(--ink-mute);
		max-width: 50ch;
	}

	.side {
		.kick {
			font-family: var(--f-mono);
			font-size: 0.78rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--accent);
			margin-bottom: 1.5rem;
		}
		dl {
			display: flex;
			flex-direction: column;
			margin-bottom: 3rem;
		}
		dl div {
			display: flex;
			justify-content: space-between;
			padding: 1rem 0;
			border-bottom: 1px dashed var(--rule-strong);
		}
		dt { font-family: var(--f-mono); font-size: 0.75rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-mute); }
		dd { margin: 0; font-family: var(--f-display); }
	}
	.manifest p {
		font-family: var(--f-display);
		font-size: 1.15rem;
		line-height: 1.45;
		em { color: var(--accent); font-style: italic; }
	}

	.ok {
		text-align: center;
		padding: 4rem 1rem;
		grid-column: 1 / -1;
		max-width: 600px;
		margin: 0 auto;
	}
	.big-tick { font-size: 6rem; color: var(--accent); margin-bottom: 1rem; }
	.ok h2 { font-family: var(--f-display); font-size: 3rem; margin-bottom: 1.5rem; }
	.msg {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1.2rem;
		line-height: 1.5;
		margin-bottom: 3rem;
		em { color: var(--accent); }
		strong { font-weight: 600; font-style: normal; }
	}
	.back-h {
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		padding: 0.9rem 0;
		border-top: 1px solid var(--ink);
		border-bottom: 1px solid var(--ink);
		display: inline-block;
	}
</style>
