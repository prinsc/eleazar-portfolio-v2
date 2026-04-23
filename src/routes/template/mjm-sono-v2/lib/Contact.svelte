<script>
	import { onMount } from 'svelte';
	import { Phone, Mail, Instagram, Facebook, MapPin, Send, Check } from 'lucide-svelte';

	let { infos = null, socials = null, cta = null, form: formAction = null } = $props();

	const adresse = $derived(infos?.adresseComplete ?? '337, route de Flobecq - 7804 Ostiches');
	const numeroEntreprise = $derived(infos?.numeroEntreprise ?? 'BE 0819.776.395');
	const telephone = $derived(infos?.telephone ?? cta?.principal?.valeur ?? '+32 475 30 73 33');
	const email = $derived(infos?.email ?? cta?.secondaire?.valeur ?? 'contact@mjmsono.be');

	const socialsList = $derived(socials?.filter((s) => s.actif) ?? []);

	// Form state
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
			error = 'Merci de compléter les champs requis.';
			return;
		}
		submitting = true;
		// Mock : soumission factice - l'action `+page.server.js` renverra succès
		await new Promise((r) => setTimeout(r, 700));
		submitting = false;
		success = true;
	}

	let titleEl;
	let infoEl;
	let formEl;

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
		gsap.from(infoEl, {
			opacity: 0,
			y: 30,
			duration: 0.9,
			delay: 0.15,
			ease: 'power3.out',
			scrollTrigger: { trigger: infoEl, start: 'top 85%' }
		});
		gsap.from(formEl, {
			opacity: 0,
			y: 30,
			duration: 0.9,
			delay: 0.25,
			ease: 'power3.out',
			scrollTrigger: { trigger: formEl, start: 'top 85%' }
		});
	});

	function phoneHref(t) {
		return 'tel:' + String(t).replace(/\s/g, '');
	}
</script>

<section class="contact" id="contact">
	<div class="wrap">
		<header class="head" bind:this={titleEl}>
			<span class="eyebrow"><span class="rule"></span>Section 06 / Échanger</span>
			<h2>
				Contactez-<em>nous</em>
			</h2>
			<p class="sub">Un événement, une idée ? Parlons-en. Réponse sous 24 à 48h.</p>
		</header>

		<div class="grid">
			<aside class="info" bind:this={infoEl}>
				<div class="info__block">
					<span class="label">Adresse</span>
					<p>
						<MapPin size={14} strokeWidth={1.5} />
						<span>{adresse}</span>
					</p>
					<p class="entreprise">N° entreprise · {numeroEntreprise}</p>
				</div>

				<div class="info__block">
					<span class="label">Direct</span>
					<a href={phoneHref(telephone)} class="contact-link">
						<Phone size={14} strokeWidth={1.5} />
						<span>{telephone}</span>
					</a>
					<a href="mailto:{email}" class="contact-link">
						<Mail size={14} strokeWidth={1.5} />
						<span>{email}</span>
					</a>
				</div>

				<div class="info__block">
					<span class="label">Réseaux</span>
					<div class="socials">
						{#each socialsList as s}
							{#if s.id === 'facebook' || s.label?.toLowerCase().includes('facebook')}
								<a href={s.url} target="_blank" rel="noopener" aria-label="Facebook">
									<Facebook size={16} strokeWidth={1.5} />
								</a>
							{:else if s.id === 'instagram' || s.label?.toLowerCase().includes('instagram')}
								<a href={s.url} target="_blank" rel="noopener" aria-label="Instagram">
									<Instagram size={16} strokeWidth={1.5} />
								</a>
							{:else}
								<a href={s.url} target="_blank" rel="noopener">{s.label}</a>
							{/if}
						{/each}
						{#if socialsList.length === 0}
							<a href="#" aria-label="Facebook"><Facebook size={16} strokeWidth={1.5} /></a>
							<a href="#" aria-label="Instagram"><Instagram size={16} strokeWidth={1.5} /></a>
						{/if}
					</div>
				</div>

				<div class="info__sig">
					<span class="info__sig-label">Votre interlocuteur</span>
					<span class="info__sig-name">Yohan</span>
					<span class="info__sig-role">Fondateur · 30 ans d'expérience</span>
				</div>
			</aside>

			<form
				class="form"
				onsubmit={handleSubmit}
				bind:this={formEl}
				method="POST"
				action="?/contact"
				novalidate
			>
				{#if success}
					<div class="success" role="status">
						<span class="success__icon"><Check size={32} strokeWidth={1.4} /></span>
						<h3>Message envoyé</h3>
						<p>Merci {nom || ''}. Yohan vous répond sous 24 à 48h.</p>
					</div>
				{:else}
					<div class="row row--2">
						<label class="field">
							<span>Nom <em>*</em></span>
							<input type="text" bind:value={nom} name="nom" required />
						</label>
						<label class="field">
							<span>Email <em>*</em></span>
							<input type="email" bind:value={mail} name="email" required />
						</label>
					</div>

					<div class="row row--2">
						<label class="field">
							<span>Téléphone</span>
							<input type="tel" bind:value={tel} name="telephone" />
						</label>
						<label class="field">
							<span>Date souhaitée</span>
							<input type="date" bind:value={date} name="date" />
						</label>
					</div>

					<label class="field">
						<span>Type d'événement</span>
						<select bind:value={typeEvt} name="type">
							<option value="">Sélectionner…</option>
							{#each types as t}
								<option value={t}>{t}</option>
							{/each}
						</select>
					</label>

					<label class="field">
						<span>Message <em>*</em></span>
						<textarea
							bind:value={message}
							name="message"
							rows="5"
							required
							placeholder="Lieu, nombre d'invités, style d'ambiance…"
						></textarea>
					</label>

					{#if error}
						<p class="error">{error}</p>
					{/if}

					<button type="submit" class="submit" disabled={submitting}>
						<span>{submitting ? 'Envoi…' : 'Envoyer'}</span>
						<Send size={14} strokeWidth={1.6} />
					</button>

					<p class="note">
						En envoyant ce formulaire, vous acceptez d'être recontacté par Yohan au sujet de votre
						demande.
					</p>
				{/if}
			</form>
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.contact {
		padding: 6rem 1.25rem;
		background: var(--coal);
		border-bottom: 1px solid var(--rule);

		@include breakpoint('medium') {
			padding: 8rem 2rem;
		}
	}

	.wrap {
		max-width: 1400px;
		margin: 0 auto;
	}

	.head {
		max-width: 50rem;
		margin-bottom: 4rem;
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

		.rule {
			display: inline-block;
			width: 42px;
			height: 1px;
			background: var(--gold);
		}
	}

	h2 {
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(3rem, 9vw, 7rem);
		line-height: 0.92;
		letter-spacing: -0.04em;
		margin: 1.25rem 0 1rem;
		color: var(--bone);

		em {
			font-family: var(--f-display);
			font-style: italic;
			color: var(--gold);
		}
	}

	.sub {
		margin: 0;
		font-family: var(--f-body);
		font-size: 1rem;
		color: var(--bone-soft);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;

		@include breakpoint('large') {
			grid-template-columns: 320px 1fr;
			gap: 4rem;
		}
	}

	/* ── INFO ── */
	.info {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.info__block {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--rule);

		p {
			margin: 0;
			display: flex;
			align-items: center;
			gap: 0.6rem;
			font-family: var(--f-body);
			font-size: 0.95rem;
			color: var(--bone);

			:global(svg) {
				color: var(--gold);
				flex-shrink: 0;
			}
		}

		.entreprise {
			font-family: var(--f-mono);
			font-size: 10px;
			letter-spacing: 0.16em;
			text-transform: uppercase;
			color: var(--bone-soft);
			padding-left: 1.4rem;
		}
	}

	.label {
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--bone-soft);
		margin-bottom: 0.25rem;
	}

	.contact-link {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		text-decoration: none;
		color: var(--bone);
		font-family: var(--f-body);
		font-size: 0.95rem;
		padding: 0.2rem 0;
		transition: color 0.3s ease;

		:global(svg) {
			color: var(--gold);
			flex-shrink: 0;
		}

		&:hover {
			color: var(--gold);
		}
	}

	.socials {
		display: flex;
		gap: 0.75rem;
		margin-top: 0.25rem;

		a {
			width: 40px;
			height: 40px;
			border: 1px solid var(--rule-strong);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--bone);
			text-decoration: none;
			transition: all 0.3s ease;

			&:hover {
				background: var(--gold);
				color: var(--void);
				border-color: var(--gold);
			}
		}
	}

	.info__sig {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 1.5rem;
		border: 1px solid var(--rule-strong);
		background: var(--graphite);

		&-label {
			font-family: var(--f-mono);
			font-size: 9px;
			letter-spacing: 0.22em;
			text-transform: uppercase;
			color: var(--bone-soft);
		}
		&-name {
			font-family: var(--f-display);
			font-style: italic;
			font-size: 2rem;
			color: var(--gold);
			line-height: 1;
		}
		&-role {
			font-family: var(--f-body);
			font-size: 0.82rem;
			color: var(--bone-soft);
		}
	}

	/* ── FORM ── */
	.form {
		background: var(--void);
		border: 1px solid var(--rule-strong);
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;

		@include breakpoint('medium') {
			padding: 2.5rem;
		}
	}

	.row {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: 1fr;

		@include breakpoint('small') {
			&--2 {
				grid-template-columns: 1fr 1fr;
			}
		}
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;

		> span {
			font-family: var(--f-mono);
			font-size: 10px;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--bone-soft);

			em {
				color: var(--gold);
				font-style: normal;
			}
		}

		input,
		select,
		textarea {
			font-family: var(--f-body);
			font-size: 0.95rem;
			background: transparent;
			border: none;
			border-bottom: 1px solid var(--rule-strong);
			padding: 0.7rem 0;
			color: var(--bone);
			outline: none;
			transition: border-color 0.3s ease;
			width: 100%;

			&:focus {
				border-bottom-color: var(--gold);
			}

			&::placeholder {
				color: var(--bone-soft);
				opacity: 0.5;
			}
		}

		select {
			appearance: none;
			cursor: pointer;
			background-image:
				linear-gradient(45deg, transparent 50%, var(--bone-soft) 50%),
				linear-gradient(135deg, var(--bone-soft) 50%, transparent 50%);
			background-position:
				calc(100% - 14px) 1rem,
				calc(100% - 9px) 1rem;
			background-size: 5px 5px;
			background-repeat: no-repeat;
			padding-right: 2rem;

			option {
				background: var(--void);
				color: var(--bone);
			}
		}

		textarea {
			resize: vertical;
			min-height: 120px;
			border-bottom: 1px solid var(--rule-strong);
		}
	}

	.error {
		margin: 0;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #e89c70;
	}

	.submit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.75em;
		padding: 1.1em 1.8em;
		background: var(--gold);
		color: var(--void);
		border: 1px solid var(--gold);
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		cursor: pointer;
		align-self: flex-start;
		transition: all 0.3s ease;

		&:hover:not(:disabled) {
			background: transparent;
			color: var(--gold);
		}

		&:disabled {
			opacity: 0.6;
			cursor: wait;
		}
	}

	.note {
		margin: 0;
		font-family: var(--f-mono);
		font-size: 10px;
		line-height: 1.6;
		letter-spacing: 0.08em;
		color: var(--bone-soft);
		opacity: 0.7;
	}

	/* ── Success ── */
	.success {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 3rem 1rem;
		gap: 0.5rem;

		&__icon {
			width: 72px;
			height: 72px;
			border: 1px solid var(--gold);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--gold);
			border-radius: 50%;
			margin-bottom: 1rem;
		}

		h3 {
			margin: 0;
			font-family: var(--f-display);
			font-size: 2rem;
			font-weight: 300;
			color: var(--bone);
		}

		p {
			margin: 0;
			font-family: var(--f-body);
			color: var(--bone-soft);
		}
	}
</style>
