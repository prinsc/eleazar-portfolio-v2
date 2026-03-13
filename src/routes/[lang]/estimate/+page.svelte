<script>
	let step = 0;
	let sending = false;
	let success = false;
	let errorMsg = '';
	let contactError = '';
	let privacyError = '';

	const steps = [
		'Identité & Objectifs',
		'Budget & Planning',
		'Identité Visuelle & Assets',
		'Aspect Technique',
		'Contenu & Rédaction',
		'Preuves Sociales & Chiffres',
		'Fonctionnalités & Business',
		'Marketing & SEO',
		'Après-vente',
		'Obligations Légales',
		'Contact'
	];

	const lastStepIndex = steps.length - 1;

	let answers = {
		contact_name: '',
		contact_email: '',
		contact_phone: '',
		contact_company: '',
		objectif: '',
		cible: '',
		exemples: '',
		launch_date: '',
		budget: '',
		final_decider: '',
		logo: '',
		charte: '',
		photos: '',
		domaine: '',
		hebergement: '',
		dns_owner: '',
		textes: '',
		langues: '',
		pages: '',
		avis: '',
		chiffres: '',
		partenaires: '',
		conversion: '',
		contact_form: '',
		rendezvous: '',
		integrations: '',
		interactive_map: '',
		user_accounts: '',
		ecommerce: '',
		newsletter: '',
		seo_keywords: '',
		primary_action: '',
		seo_target: '',
		content_updates_owner: '',
		need_pro_email: '',
		privacy_accepted: false,
		mentions: '',
		rgpd: ''
	};

	function next() {
		if (step < steps.length) step++;
	}
	function back() {
		if (step > 0) step--;
	}

	function jumpToLastStep() {
		step = lastStepIndex;
	}

	function isValidEmail(email) {
		// Validation simple (fallback). Le backend valide aussi.
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
	}

	async function send() {
		sending = true;
		errorMsg = '';
		contactError = '';
		privacyError = '';

		const name = String(answers.contact_name || '').trim();
		const email = String(answers.contact_email || '').trim();
		if (!name) {
			contactError = 'Veuillez indiquer votre nom.';
			sending = false;
			return;
		}
		if (!email || !isValidEmail(email)) {
			contactError = 'Veuillez indiquer une adresse email valide.';
			sending = false;
			return;
		}
		if (!answers.privacy_accepted) {
			privacyError =
				"Veuillez accepter la politique de confidentialité avant d'envoyer votre demande.";
			sending = false;
			return;
		}
		try {
			const res = await fetch('/api/estimate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ answers })
			});
			const data = await res.json();
			if (res.ok) {
				success = true;
			} else {
				errorMsg = data?.error || 'Erreur serveur';
			}
		} catch (e) {
			errorMsg = e.message;
		} finally {
			sending = false;
		}
	}
</script>

<section class="estimate">
	<div class="grain kl-container">
		<header>
			<h1>Demande de devis - Site web</h1>
			<p class="subtitle">
				Étape {step + 1} / {steps.length + 1} -
				{step < steps.length ? steps[step] : 'Récapitulatif'}
			</p>
		</header>

		{#if step < steps.length}
			<!-- Step forms -->
			{#if step === 0}
				<div class="field">
					<label for="objectif">Quel est le but principal du site ?</label>
					<input
						id="objectif"
						bind:value={answers.objectif}
						placeholder="Ex: Vendre en ligne, présenter des services..."
					/>
				</div>

				<div class="field">
					<label for="cible">Qui est votre cible prioritaire ?</label>
					<input
						id="cible"
						bind:value={answers.cible}
						placeholder="Ex: Particuliers, professionnels..."
					/>
				</div>

				<div class="field">
					<label for="exemples"
						>Quels sont les 3 sites de concurrents ou d'exemples que vous aimez ?</label
					>
					<textarea
						id="exemples"
						rows="3"
						bind:value={answers.exemples}
						placeholder="Collez les URL + une phrase sur ce que vous aimez"
					></textarea>
				</div>
			{/if}

			{#if step === 1}
				<div class="dealbreaker">
					<h2>Budget & délai (dealbreakers)</h2>
					<p class="subtitle">
						Ces infos me permettent de vérifier tout de suite si le projet est réaliste.
					</p>
				</div>

				<div class="field">
					<label for="launch_date">Avez-vous une date de lancement impérative ?</label>
					<input
						id="launch_date"
						bind:value={answers.launch_date}
						placeholder="Ex: Avant le 15/04, pour un salon, pas de date fixe…"
					/>
				</div>

				<div class="field">
					<label for="budget">Quel budget avez-vous alloué à ce projet ?</label>
					<input
						id="budget"
						bind:value={answers.budget}
						placeholder="Ex: 1 500€–3 000€ / 3 000€–6 000€ / à définir"
					/>
				</div>

				<div class="field">
					<label for="final_decider">Qui est le décideur final ?</label>
					<input
						id="final_decider"
						bind:value={answers.final_decider}
						placeholder="Vous, associé, direction, etc."
					/>
				</div>
			{/if}

			{#if step === 2}
				<div class="field">
					<label for="logo">Avez-vous déjà un logo ?</label>
					<input
						id="logo"
						bind:value={answers.logo}
						placeholder="Oui (SVG/AI), Non, lien de téléchargement…"
					/>
				</div>

				<div class="field">
					<label for="charte">Avez-vous une charte graphique ?</label>
					<textarea
						id="charte"
						rows="2"
						bind:value={answers.charte}
						placeholder="Couleurs, polices imposées, références…"
					></textarea>
				</div>

				<div class="field">
					<label for="photos">Photos & Vidéos</label>
					<textarea
						id="photos"
						rows="2"
						bind:value={answers.photos}
						placeholder="Assets dispo ? Ou banque d’images libres de droits ?"
					></textarea>
				</div>
			{/if}

			{#if step === 3}
				<div class="field">
					<label for="domaine">Nom de domaine</label>
					<input id="domaine" bind:value={answers.domaine} placeholder="Ex: mondomaine.be" />
				</div>

				<div class="field">
					<label for="hebergement">Hébergement</label>
					<input
						id="hebergement"
						bind:value={answers.hebergement}
						placeholder="OVH / Hostinger / Non / À définir"
					/>
				</div>

				<div class="field">
					<label for="dns_owner">Qui gère actuellement votre nom de domaine / DNS ?</label>
					<textarea
						id="dns_owner"
						rows="2"
						bind:value={answers.dns_owner}
						placeholder="Ex: OVH / Hostinger / une agence / je ne sais pas / à créer"
					></textarea>
				</div>
			{/if}

			{#if step === 4}
				<div class="field">
					<label for="textes">Qui fournit les textes ?</label>
					<input
						id="textes"
						bind:value={answers.textes}
						placeholder="Vous / Moi (rédaction + SEO)"
					/>
				</div>

				<div class="field">
					<label for="langues">Langues</label>
					<input id="langues" bind:value={answers.langues} placeholder="FR / NL / EN" />
				</div>

				<div class="field">
					<label for="pages">Pages spécifiques</label>
					<textarea id="pages" rows="2" bind:value={answers.pages} placeholder="FAQ, Blog, Équipe…"
					></textarea>
				</div>
			{/if}

			{#if step === 5}
				<div class="field">
					<label for="avis">Avis clients</label>
					<input
						id="avis"
						bind:value={answers.avis}
						placeholder="Lien Google Business / témoignages…"
					/>
				</div>

				<div class="field">
					<label for="chiffres">Chiffres clés</label>
					<input
						id="chiffres"
						bind:value={answers.chiffres}
						placeholder="Ex: 10 ans d’expérience, 500 projets"
					/>
				</div>

				<div class="field">
					<label for="partenaires">Partenaires</label>
					<textarea
						id="partenaires"
						rows="2"
						bind:value={answers.partenaires}
						placeholder="Logos de partenaires/fournisseurs ?"
					></textarea>
				</div>
			{/if}

			{#if step === 6}
				<div class="field">
					<label for="conversion">Conversion</label>
					<input
						id="conversion"
						bind:value={answers.conversion}
						placeholder="Formulaire, WhatsApp, Calendly…"
					/>
				</div>

				<div class="field">
					<label for="contact_form">Avez-vous besoin d'un formulaire de contact spécifique ?</label>
					<textarea
						id="contact_form"
						rows="2"
						bind:value={answers.contact_form}
						placeholder="Ex: 6 champs, pièce jointe, choix de services, etc."
					></textarea>
				</div>

				<div class="field">
					<label for="rendezvous">Souhaitez-vous une prise de rendez-vous en ligne ?</label>
					<input
						id="rendezvous"
						bind:value={answers.rendezvous}
						placeholder="Ex: Calendly, Google Calendar, autre…"
					/>
				</div>

				<div class="field">
					<label for="integrations">Le site doit-il être relié à d'autres outils ?</label>
					<textarea
						id="integrations"
						rows="2"
						bind:value={answers.integrations}
						placeholder="Newsletter (Mailchimp), CRM, bouton WhatsApp, etc."
					></textarea>
				</div>

				<div class="field">
					<label for="interactive_map">Avez-vous besoin d'une carte interactive ?</label>
					<input
						id="interactive_map"
						bind:value={answers.interactive_map}
						placeholder="Ex: Oui (zones d'intervention), Non, à discuter"
					/>
				</div>

				<div class="field">
					<label for="user_accounts"
						>Y a-t-il des comptes utilisateurs / un espace client prévu ?</label
					>
					<input
						id="user_accounts"
						bind:value={answers.user_accounts}
						placeholder="Ex: Oui (connexion), Non, plus tard"
					/>
				</div>

				<div class="field">
					<label for="ecommerce">E-commerce</label>
					<input
						id="ecommerce"
						bind:value={answers.ecommerce}
						placeholder="Nb de produits, CSV/Excel dispo…"
					/>
				</div>

				<div class="field">
					<label for="newsletter">Newsletter</label>
					<input
						id="newsletter"
						bind:value={answers.newsletter}
						placeholder="Oui/Non + outil souhaité si déjà choisi"
					/>
				</div>
			{/if}

			{#if step === 7}
				<div class="dealbreaker">
					<h2>Marketing & SEO</h2>
				</div>

				<div class="field">
					<label for="seo_keywords">
						Quels sont les 3 mots-clés sur lesquels vous voulez que vos clients vous trouvent sur
						Google ?
					</label>
					<textarea
						id="seo_keywords"
						rows="2"
						bind:value={answers.seo_keywords}
						placeholder="Ex: électricien Ath, dépannage électroménager, création site vitrine…"
					></textarea>
				</div>

				<div class="field">
					<label for="primary_action"
						>Quelle est l'action principale que le visiteur doit faire ?</label
					>
					<input
						id="primary_action"
						bind:value={answers.primary_action}
						placeholder="Appeler, remplir un devis, prendre RDV, acheter…"
					/>
				</div>

				<div class="field">
					<label for="seo_target">Cible locale ou nationale ?</label>
					<input
						id="seo_target"
						bind:value={answers.seo_target}
						placeholder="Ex: Local (Ath + 30km) / Belgique / International"
					/>
				</div>
			{/if}

			{#if step === 8}
				<div class="dealbreaker">
					<h2>Après-vente (maintenance)</h2>
				</div>

				<div class="field">
					<label for="content_updates_owner">
						Qui s'occupera des mises à jour du contenu une fois le site en ligne ?
					</label>
					<input
						id="content_updates_owner"
						bind:value={answers.content_updates_owner}
						placeholder="Vous / Moi (forfait maintenance) / à définir"
					/>
				</div>

				<div class="field">
					<label for="need_pro_email"
						>Avez-vous besoin d'une adresse email pro (ex: contact@entreprise.be) ?</label
					>
					<input
						id="need_pro_email"
						bind:value={answers.need_pro_email}
						placeholder="Oui/Non + hébergeur (OVH, Google Workspace, etc.)"
					/>
				</div>
			{/if}

			{#if step === 9}
				<div class="field">
					<label for="mentions">Mentions légales (Belgique)</label>
					<input id="mentions" bind:value={answers.mentions} placeholder="BCE + TVA" />
				</div>

				<div class="field">
					<label for="rgpd">RGPD</label>
					<input
						id="rgpd"
						bind:value={answers.rgpd}
						placeholder="Politique existante ? Sinon modèle à adapter"
					/>
				</div>
			{/if}

			{#if step === 10}
				<section class="contact">
					<h2>Contact</h2>
					<p class="subtitle">Pour que je puisse vous recontacter rapidement.</p>
					<div class="contact-grid">
						<div class="field">
							<label for="contact_name">Nom *</label>
							<input
								id="contact_name"
								bind:value={answers.contact_name}
								placeholder="Votre nom"
								required
								autocomplete="name"
							/>
						</div>

						<div class="field">
							<label for="contact_email">Email *</label>
							<input
								id="contact_email"
								type="email"
								bind:value={answers.contact_email}
								placeholder="vous@exemple.com"
								required
								autocomplete="email"
							/>
						</div>

						<div class="field">
							<label for="contact_phone">Téléphone</label>
							<input
								id="contact_phone"
								type="tel"
								bind:value={answers.contact_phone}
								placeholder="+32 ..."
								autocomplete="tel"
							/>
						</div>

						<div class="field">
							<label for="contact_company">Société</label>
							<input
								id="contact_company"
								bind:value={answers.contact_company}
								placeholder="(optionnel)"
								autocomplete="organization"
							/>
						</div>
					</div>
					{#if contactError}<p class="status error">{contactError}</p>{/if}
				</section>
			{/if}

			<div class="controls">
				<button class="" on:click={back} disabled={step === 0}> Retour </button>
				<button class="grain" on:click={next}>Suivant</button>
				{#if step < lastStepIndex}
					<button class="grain" on:click={jumpToLastStep}>Aller à la dernière étape</button>
				{/if}
			</div>
		{:else}
			<!-- Summary -->
			<h2>Récapitulatif</h2>
			<div class="summary-contact">
				<h3>Contact</h3>
				<dl>
					<div class="row">
						<dt>Nom</dt>
						<dd>{answers.contact_name || '-'}</dd>
					</div>
					<div class="row">
						<dt>Email</dt>
						<dd>{answers.contact_email || '-'}</dd>
					</div>
					<div class="row">
						<dt>Téléphone</dt>
						<dd>{answers.contact_phone || '-'}</dd>
					</div>
					<div class="row">
						<dt>Société</dt>
						<dd>{answers.contact_company || '-'}</dd>
					</div>
				</dl>
			</div>

			<div class="summary">
				<div class="summary-grid">
					<section class="summary-section grain">
						<h3>1. Identité & Objectifs</h3>
						<dl>
							<div class="row">
								<dt>But principal</dt>
								<dd>{answers.objectif || '-'}</dd>
							</div>
							<div class="row">
								<dt>Cible prioritaire</dt>
								<dd>{answers.cible || '-'}</dd>
							</div>
							<div class="row">
								<dt>Sites exemples</dt>
								<dd class="multiline">{answers.exemples || '-'}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>2. Budget & Planning</h3>
						<dl>
							<div class="row">
								<dt>Date de lancement</dt>
								<dd>{answers.launch_date || '-'}</dd>
							</div>
							<div class="row">
								<dt>Budget</dt>
								<dd>{answers.budget || '-'}</dd>
							</div>
							<div class="row">
								<dt>Décideur final</dt>
								<dd>{answers.final_decider || '-'}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>3. Identité Visuelle & Assets</h3>
						<dl>
							<div class="row">
								<dt>Logo</dt>
								<dd>{answers.logo || '-'}</dd>
							</div>
							<div class="row">
								<dt>Charte graphique</dt>
								<dd class="multiline">{answers.charte || '-'}</dd>
							</div>
							<div class="row">
								<dt>Photos / Vidéos</dt>
								<dd class="multiline">{answers.photos || '-'}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>4. Aspect Technique (Infrastructure)</h3>
						<dl>
							<div class="row">
								<dt>Nom de domaine</dt>
								<dd>{answers.domaine || '-'}</dd>
							</div>
							<div class="row">
								<dt>Hébergement</dt>
								<dd>{answers.hebergement || '-'}</dd>
							</div>
							<div class="row">
								<dt>Domaine / DNS (gestion)</dt>
								<dd class="multiline">{answers.dns_owner || '-'}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>5. Contenu & Rédaction</h3>
						<dl>
							<div class="row">
								<dt>Textes</dt>
								<dd>{answers.textes || '-'}</dd>
							</div>
							<div class="row">
								<dt>Langues</dt>
								<dd>{answers.langues || '-'}</dd>
							</div>
							<div class="row">
								<dt>Pages spécifiques</dt>
								<dd class="multiline">{answers.pages || '-'}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>6. Preuves Sociales & Chiffres</h3>
						<dl>
							<div class="row">
								<dt>Avis clients</dt>
								<dd>{answers.avis || '-'}</dd>
							</div>
							<div class="row">
								<dt>Chiffres clés</dt>
								<dd>{answers.chiffres || '-'}</dd>
							</div>
							<div class="row">
								<dt>Partenaires</dt>
								<dd class="multiline">{answers.partenaires || '-'}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>7. Fonctionnalités & Business</h3>
						<dl>
							<div class="row">
								<dt>Conversion</dt>
								<dd>{answers.conversion || '-'}</dd>
							</div>
							<div class="row">
								<dt>Formulaire spécifique</dt>
								<dd class="multiline">{answers.contact_form || '-'}</dd>
							</div>
							<div class="row">
								<dt>Prise de rendez-vous</dt>
								<dd>{answers.rendezvous || '-'}</dd>
							</div>
							<div class="row">
								<dt>Intégrations</dt>
								<dd class="multiline">{answers.integrations || '-'}</dd>
							</div>
							<div class="row">
								<dt>Carte interactive</dt>
								<dd>{answers.interactive_map || '-'}</dd>
							</div>
							<div class="row">
								<dt>Comptes utilisateurs</dt>
								<dd>{answers.user_accounts || '-'}</dd>
							</div>
							<div class="row">
								<dt>E-commerce</dt>
								<dd>{answers.ecommerce || '-'}</dd>
							</div>
							<div class="row">
								<dt>Newsletter</dt>
								<dd>{answers.newsletter || '-'}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>8. Marketing & SEO</h3>
						<dl>
							<div class="row">
								<dt>Mots-clés</dt>
								<dd class="multiline">{answers.seo_keywords || '-'}</dd>
							</div>
							<div class="row">
								<dt>Action principale</dt>
								<dd>{answers.primary_action || '-'}</dd>
							</div>
							<div class="row">
								<dt>Cible</dt>
								<dd>{answers.seo_target || '-'}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>9. Après-vente</h3>
						<dl>
							<div class="row">
								<dt>Mises à jour contenu</dt>
								<dd>{answers.content_updates_owner || '-'}</dd>
							</div>
							<div class="row">
								<dt>Email pro</dt>
								<dd>{answers.need_pro_email || '-'}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>10. Obligations Légales (Belgique)</h3>
						<dl>
							<div class="row">
								<dt>Mentions légales</dt>
								<dd>{answers.mentions || '-'}</dd>
							</div>
							<div class="row">
								<dt>RGPD</dt>
								<dd>{answers.rgpd || '-'}</dd>
							</div>
						</dl>
					</section>
				</div>
			</div>
			{#if errorMsg}<p class="status error">{errorMsg}</p>{/if}
			{#if success}
				<p class="status success">
					Votre demande a été envoyée. Merci - je vous répondrai bientôt.
				</p>
			{:else}
				<div class="privacy-consent">
					<label class="checkbox">
						<input type="checkbox" bind:checked={answers.privacy_accepted} />
						<span>
							J'accepte la
							<a href="/fr/legal" target="_blank" rel="noreferrer">politique de confidentialité</a>
							et le traitement de mes données pour être recontacté.
						</span>
					</label>
					{#if privacyError}<p class="status error">{privacyError}</p>{/if}
				</div>

				<div class="controls">
					<button
						class="grain"
						on:click={() => {
							step = 0;
						}}>Modifier</button
					>
					<button class="grain" on:click={send} disabled={sending}>
						{sending ? 'Envoi...' : 'Envoyer la demande'}
					</button>
				</div>
			{/if}
		{/if}
	</div>
</section>

<style lang="scss">
	.estimate {
		max-width: 980px;
		margin: 2rem auto;
		padding: 0 1rem;

		.kl-container {
			padding: 2rem;
			overflow: hidden;
			border-radius: 10px;
		}

		header {
			margin-bottom: 1.5rem;
			.subtitle {
				opacity: 0.8;
			}
		}
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		margin: 1rem 0;

		label {
			font-weight: 500;
			opacity: 0.9;
		}

		input,
		textarea {
			background: var(--color-white);
			border: 0;
			padding: 0.9rem 1rem;
			min-height: 44px;
			box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.03);
			border-radius: 5px;
			transition:
				transform 0.15s,
				border-color 0.15s,
				box-shadow 0.15s;

			&:focus {
				border: 0;
				outline: 0;
				box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.06);
			}
		}

		textarea {
			min-height: 120px;
			resize: vertical;
		}
	}

	.contact {
		margin: 1rem 0 1.5rem;
		padding: 1rem;
		background: rgba(0, 0, 0, 0.02);
		border-radius: 5px;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;

		@media (max-width: 720px) {
			grid-template-columns: 1fr;
		}
	}
	button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		font-weight: 600;
		font-size: 1.1rem;
		border-radius: 5px;
		transition: transform 0.2s;
		overflow: hidden;
		text-decoration: none;
		cursor: pointer;
	}
	dd {
		margin: 0;
		opacity: 0.75;
		font-style: italic;
		margin-top: 0.25rem;
	}
	dt {
		font-weight: 500;
	}
	dl {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;
	}
	.controls {
		display: flex;
		gap: 0.75rem;
		margin-top: 1.25rem;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.row {
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: 0.75rem;
	}

	.multiline {
		white-space: pre-wrap;
	}
	/* IMPORTANT: pas de styles bouton ici pour ne pas toucher à ton design global. */

	.status {
		margin-top: 1rem;
		padding: 0.75rem 1rem;
		border-radius: 5px;

		&.error {
			border: solid 1px var(--color-red);
			background: rgba(255, 0, 0, 0.05);
		}
		&.success {
			border: solid 1px var(--color-primary);
			background: rgba(0, 200, 120, 0.05);
		}
	}

	.summary-section {
		margin: 2rem 0;
		padding: 2rem;
		border-radius: 10px;
	}

	.dealbreaker {
		margin: 0.5rem 0 1rem;
		p {
			opacity: 0.85;
			margin: 0.35rem 0 0;
		}
	}

	.privacy-consent {
		margin-top: 1rem;
		padding: 1rem;
		background: rgba(0, 0, 0, 0.02);
		border-radius: 10px;
	}

	.checkbox {
		display: grid;
		grid-template-columns: 20px 1fr;
		gap: 0.75rem;
		align-items: start;
		font-size: 0.95rem;
		line-height: 1.4;

		input {
			margin-top: 0.2rem;
		}

		a {
			text-decoration: underline;
		}
	}
</style>
