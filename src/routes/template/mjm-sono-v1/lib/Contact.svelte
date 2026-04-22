<script>
	import { onMount } from 'svelte';
	import { Phone, Mail, Instagram, Facebook, MapPin, Send, Check } from 'lucide-svelte';

	let { infos = null, socials = null, cta = null } = $props();

	const adresse = $derived(infos?.adresseComplete ?? '337, route de Flobecq — 7804 Ostiches');
	const numeroEntreprise = $derived(infos?.numeroEntreprise ?? 'BE 0819.776.395');
	const telephone = $derived(infos?.telephone ?? cta?.principal?.valeur ?? '0475 30 73 33');
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

	const types = ['Mariage', 'Anniversaire', 'Soirée', "Événement d'entreprise", 'Défilé', 'Exposition', 'Autre'];

	async function handleSubmit(e) {
		e.preventDefault();
		error = '';
		if (!nom || !mail || !message) {
			error = 'Merci de compléter les champs obligatoires.';
			return;
		}
		submitting = true;
		await new Promise((r) => setTimeout(r, 600));
		submitting = false;
		success = true;
	}

	let titleEl;
	let formEl;
	let infoEl;

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(titleEl, {
			opacity: 0, y: 24, duration: 0.7, ease: 'power2.out',
			scrollTrigger: { trigger: titleEl, start: 'top 82%' }
		});
		gsap.from(infoEl, {
			opacity: 0, y: 24, duration: 0.7, delay: 0.1, ease: 'power2.out',
			scrollTrigger: { trigger: infoEl, start: 'top 85%' }
		});
		gsap.from(formEl, {
			opacity: 0, y: 24, duration: 0.7, delay: 0.15, ease: 'power2.out',
			scrollTrigger: { trigger: formEl, start: 'top 85%' }
		});
	});

	function phoneHref(t) { return 'tel:' + String(t).replace(/\s/g, ''); }
</script>

<section class="contact" id="contact">
	<div class="wrap">
		<header class="head" bind:this={titleEl}>
			<span class="tag">Contact</span>
			<h2>Parlons de votre événement</h2>
			<p class="sub">
				Un projet, une date à caler, une question sur le matériel ? Appelez ou envoyez un message.
				Réponse sous 24 à 48h.
			</p>
		</header>

		<div class="grid">
			<aside class="info" bind:this={infoEl}>
				<a class="block block--link" href={phoneHref(telephone)}>
					<span class="block__ic"><Phone size={18} strokeWidth={2} /></span>
					<div>
						<span class="block__lbl">Téléphone</span>
						<span class="block__val">{telephone}</span>
					</div>
				</a>

				<a class="block block--link" href="mailto:{email}">
					<span class="block__ic"><Mail size={18} strokeWidth={2} /></span>
					<div>
						<span class="block__lbl">Email</span>
						<span class="block__val">{email}</span>
					</div>
				</a>

				<div class="block">
					<span class="block__ic"><MapPin size={18} strokeWidth={2} /></span>
					<div>
						<span class="block__lbl">Adresse</span>
						<span class="block__val">{adresse}</span>
						<span class="block__meta">N° entreprise · {numeroEntreprise}</span>
					</div>
				</div>

				<div class="socials">
					{#each socialsList as s}
						{#if s.id === 'facebook' || s.label?.toLowerCase().includes('facebook')}
							<a href={s.url} target="_blank" rel="noopener" aria-label="Facebook">
								<Facebook size={16} strokeWidth={2} />
							</a>
						{:else if s.id === 'instagram' || s.label?.toLowerCase().includes('instagram')}
							<a href={s.url} target="_blank" rel="noopener" aria-label="Instagram">
								<Instagram size={16} strokeWidth={2} />
							</a>
						{/if}
					{/each}
					{#if socialsList.length === 0}
						<a href="#" aria-label="Facebook"><Facebook size={16} strokeWidth={2} /></a>
						<a href="#" aria-label="Instagram"><Instagram size={16} strokeWidth={2} /></a>
					{/if}
				</div>

				<div class="sig">
					<span class="sig__lbl">Votre interlocuteur</span>
					<strong>Yohan</strong>
					<span class="sig__role">Fondateur · 30 ans d'expérience</span>
				</div>
			</aside>

			<form class="form" onsubmit={handleSubmit} bind:this={formEl} method="POST" action="?/contact" novalidate>
				{#if success}
					<div class="success" role="status">
						<span class="success__ic"><Check size={28} strokeWidth={2} /></span>
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
						<textarea bind:value={message} name="message" rows="5" required placeholder="Lieu, nombre d'invités, style d'ambiance…"></textarea>
					</label>

					{#if error}
						<p class="error">{error}</p>
					{/if}

					<button type="submit" class="submit" disabled={submitting}>
						<span>{submitting ? 'Envoi…' : 'Envoyer le message'}</span>
						<Send size={15} strokeWidth={2} />
					</button>

					<p class="note">
						En envoyant ce formulaire, vous acceptez d'être recontacté par Yohan au sujet de votre demande.
					</p>
				{/if}
			</form>
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.contact {
		padding: 5rem 1.25rem;
		background: var(--surface);
		border-bottom: 1px solid var(--line);

		@include breakpoint('medium') {
			padding: 6rem 2rem;
		}
	}

	.wrap { max-width: 1280px; margin: 0 auto; }

	.head {
		max-width: 42rem;
		margin: 0 0 3rem;
	}

	.tag {
		display: inline-block;
		font-family: var(--f-body);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--red);
		margin-bottom: 0.75rem;
	}

	h2 {
		margin: 0 0 0.75rem;
		font-family: var(--f-display);
		font-weight: 700;
		font-size: clamp(2rem, 5vw, 3.25rem);
		letter-spacing: -0.03em;
		line-height: 1.05;
		color: var(--text);
	}

	.sub {
		margin: 0;
		font-family: var(--f-body);
		font-size: 1rem;
		line-height: 1.55;
		color: var(--text-soft);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@include breakpoint('large') {
			grid-template-columns: 320px 1fr;
			gap: 3rem;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.block {
		display: flex;
		align-items: flex-start;
		gap: 0.9rem;
		padding: 1rem 1.1rem;
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: 6px;
		text-decoration: none;
		color: var(--text);
		transition: all 0.2s ease;

		&--link:hover {
			border-color: var(--red);

			.block__ic {
				background: var(--red);
				color: #fff;
				border-color: var(--red);
			}
		}
	}

	.block__ic {
		width: 36px;
		height: 36px;
		border: 1px solid var(--line-strong);
		color: var(--red);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		flex-shrink: 0;
		transition: all 0.2s ease;
	}

	.block__lbl {
		display: block;
		font-family: var(--f-body);
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-faint);
		margin-bottom: 0.15rem;
	}

	.block__val {
		display: block;
		font-family: var(--f-body);
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--text);
		line-height: 1.4;
	}

	.block__meta {
		display: block;
		font-family: var(--f-body);
		font-size: 0.78rem;
		color: var(--text-soft);
		margin-top: 0.25rem;
	}

	.socials {
		display: flex;
		gap: 0.5rem;
		padding: 0.25rem 0;

		a {
			width: 40px;
			height: 40px;
			border: 1px solid var(--line);
			background: var(--bg);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: var(--text);
			text-decoration: none;
			border-radius: 4px;
			transition: all 0.2s ease;

			&:hover {
				background: var(--red);
				color: #fff;
				border-color: var(--red);
			}
		}
	}

	.sig {
		margin-top: 0.5rem;
		padding: 1.1rem 1.1rem;
		background: var(--bg);
		border: 1px solid var(--line);
		border-left: 3px solid var(--red);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;

		&__lbl {
			font-family: var(--f-body);
			font-size: 0.72rem;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.08em;
			color: var(--text-faint);
		}
		strong {
			font-family: var(--f-display);
			font-weight: 700;
			font-size: 1.35rem;
			color: var(--text);
		}
		&__role {
			font-family: var(--f-body);
			font-size: 0.82rem;
			color: var(--text-soft);
		}
	}

	.form {
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: 6px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.1rem;

		@include breakpoint('medium') {
			padding: 2rem;
		}
	}

	.row {
		display: grid;
		gap: 1.1rem;
		grid-template-columns: 1fr;

		@include breakpoint('small') {
			&--2 { grid-template-columns: 1fr 1fr; }
		}
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;

		> span {
			font-family: var(--f-body);
			font-size: 0.78rem;
			font-weight: 600;
			color: var(--text);

			em {
				color: var(--red);
				font-style: normal;
			}
		}

		input, select, textarea {
			font-family: var(--f-body);
			font-size: 0.95rem;
			background: var(--surface);
			border: 1px solid var(--line);
			padding: 0.75rem 0.9rem;
			color: var(--text);
			outline: none;
			border-radius: 4px;
			transition: border-color 0.2s ease;
			width: 100%;

			&:focus { border-color: var(--red); }

			&::placeholder {
				color: var(--text-faint);
			}
		}

		select {
			appearance: none;
			cursor: pointer;
			background-image: linear-gradient(45deg, transparent 50%, var(--text-soft) 50%),
				linear-gradient(135deg, var(--text-soft) 50%, transparent 50%);
			background-position: calc(100% - 14px) center, calc(100% - 9px) center;
			background-size: 5px 5px;
			background-repeat: no-repeat;
			padding-right: 2rem;

			option { background: var(--surface); color: var(--text); }
		}

		textarea {
			resize: vertical;
			min-height: 120px;
		}
	}

	.error {
		margin: 0;
		font-family: var(--f-body);
		font-size: 0.85rem;
		color: #e8896f;
	}

	.submit {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 0.95rem 1.4rem;
		background: var(--red);
		color: #fff;
		border: none;
		font-family: var(--f-body);
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		align-self: flex-start;
		border-radius: 4px;
		transition: background 0.2s ease;

		&:hover:not(:disabled) { background: var(--red-deep); }
		&:disabled { opacity: 0.6; cursor: wait; }
	}

	.note {
		margin: 0;
		font-family: var(--f-body);
		font-size: 0.78rem;
		line-height: 1.5;
		color: var(--text-faint);
	}

	.success {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 2.5rem 1rem;
		gap: 0.4rem;

		&__ic {
			width: 60px;
			height: 60px;
			background: rgba(111, 201, 122, 0.12);
			border: 1px solid rgba(111, 201, 122, 0.5);
			color: var(--green);
			display: inline-flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			margin-bottom: 0.75rem;
		}

		h3 {
			margin: 0;
			font-family: var(--f-display);
			font-size: 1.5rem;
			font-weight: 700;
			color: var(--text);
		}

		p {
			margin: 0;
			font-family: var(--f-body);
			color: var(--text-soft);
		}
	}
</style>
