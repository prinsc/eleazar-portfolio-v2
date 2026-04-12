<script>
	let step = $state(0);
	let sending = $state(false);
	let success = $state(false);
	let errorMsg = $state('');
	let contactError = $state('');
	let privacyError = $state('');

	const steps = [
		'Projet & Objectifs',
		'Budget & Planning',
		'Design & Identité',
		'Contenu & Rédaction',
		'Technique & Infra',
		'Fonctionnalités',
		'E-commerce',
		'Preuves Sociales',
		'SEO & Analytics',
		'Maintenance & Formation',
		'Légal & RGPD',
		'Contact'
	];

	// Helper pour toggle une valeur dans un champ de type array
	function toggleArray(field, value) {
		const arr = answers[field];
		if (!Array.isArray(arr)) {
			answers[field] = [value];
			return;
		}
		const idx = arr.indexOf(value);
		if (idx === -1) arr.push(value);
		else arr.splice(idx, 1);
	}

	function inArray(field, value) {
		return Array.isArray(answers[field]) && answers[field].includes(value);
	}

	// Formatage pour le récapitulatif
	function fmt(value) {
		if (value === true) return 'Oui';
		if (value === false) return 'Non';
		if (Array.isArray(value)) return value.length ? value.join(', ') : '-';
		if (value === '' || value === null || value === undefined) return '-';
		return String(value);
	}

	const lastStepIndex = steps.length - 1;

	let answers = $state({
		// ─────────────────────────────────────────────
		// CONTACT
		// ─────────────────────────────────────────────
		contact_name: '',
		contact_email: '',
		contact_phone: '',
		contact_company: '',

		// ─────────────────────────────────────────────
		// PROJET (objectifs, budget, planning)
		// ─────────────────────────────────────────────
		objectif: '',
		cible: '',
		exemples: '',
		launch_date: '',
		budget: '',
		final_decider: '',

		// ─────────────────────────────────────────────
		// DESIGN & IDENTITÉ VISUELLE
		// ─────────────────────────────────────────────
		logo: '', // boolean/string : existant ?
		charte: '', // charte graphique dispo ?
		photos: '', // assets photo/vidéo
		design_from_scratch: '', // boolean - full custom ou thème
		theme_preference: '', // free / paid / to_define   (si !design_from_scratch)
		theme_name: '', // si thème connu            (si !design_from_scratch)
		design_inspiration: '', // URLs de sites qui plaisent
		design_mood: [], // array: modern, minimaliste, coloré, corporate, fun, luxe

		// ─────────────────────────────────────────────
		// CONTENU & RÉDACTION
		// ─────────────────────────────────────────────
		textes: '', // qui rédige
		langues: [], // array: fr, nl, en, de, autre
		i18n_owner: '', // si langues.length > 1
		pages: '', // pages spécifiques
		blog_needed: '', // boolean
		blog_owner: '', // si blog_needed : qui rédige
		video_needed: '', // boolean
		video_source: '', // si video_needed : client / à produire / embed

		// ─────────────────────────────────────────────
		// TECHNIQUE (infra, CMS, perf)
		// ─────────────────────────────────────────────
		domaine: '', // boolean : domaine existant ?
		domain_help_needed: '', // si !domaine : aide achat ?
		hebergement: '', // existing / needed / included_in_offer
		hebergement_provider: '', // si hebergement === 'existing'
		dns_owner: '', // qui gère actuellement les DNS
		cms_preference: '', // headless / shopify / drupal / aucun / à définir
		performance_priority: '', // standard / optimisé / core_web_vitals_strict
		accessibility_needed: '', // boolean - WCAG

		// ─────────────────────────────────────────────
		// FONCTIONNALITÉS GÉNÉRALES
		// ─────────────────────────────────────────────
		conversion: '',
		contact_form: '',
		rendezvous: '',
		integrations: [], // array : google_analytics, meta_pixel, google_ads, crm, erp, calendly, stripe, mollie, autre
		interactive_map: '', // boolean
		map_provider: '', // si interactive_map : google / mapbox / osm
		map_features: [], // si interactive_map : markers / itinéraires / zones / clustering
		user_accounts: '', // boolean
		user_accounts_features: [], // si user_accounts : historique, wishlist, profil, abonnement
		user_accounts_auth: '', // si user_accounts : email/password, google oauth, magic link
		newsletter: '', // boolean
		newsletter_tool: '', // si newsletter : mailchimp / klaviyo / brevo / autre / à définir

		// ─────────────────────────────────────────────
		// E-COMMERCE (conditionnel - ecommerce === true)
		// ─────────────────────────────────────────────
		ecommerce: '', // boolean maître
		ecommerce_platform: '', // shopify / woocommerce / prestashop / custom / other
		shopify_plan_exists: '', // boolean (si platform === shopify)
		shopify_theme_preference: '', // free / paid / custom_liquid / headless_sveltekit
		ecommerce_products_count: '', // number
		ecommerce_products_ready: '', // boolean - CSV/ERP dispo
		ecommerce_variants: '', // boolean - variantes taille/couleur
		ecommerce_payment_methods: [], // array : bancontact, visa, paypal, virement, autre
		ecommerce_shipping: '', // bpost / dhl / mondial_relay / click_collect / other
		ecommerce_shipping_type: '', // fixed / calculated / free_above
		ecommerce_b2b: '', // boolean - vente pro
		ecommerce_erp: '', // boolean - ERP à connecter
		ecommerce_erp_name: '', // si ecommerce_erp

		// ─────────────────────────────────────────────
		// PREUVES SOCIALES
		// ─────────────────────────────────────────────
		avis: '',
		chiffres: '',
		partenaires: '',

		// ─────────────────────────────────────────────
		// SEO & ANALYTICS
		// ─────────────────────────────────────────────
		seo_keywords: '',
		primary_action: '',
		seo_target: '',
		google_search_console: '', // boolean
		sitemap_needed: '', // boolean
		cookie_banner_needed: '', // boolean - RGPD

		// ─────────────────────────────────────────────
		// MAINTENANCE & SUIVI
		// ─────────────────────────────────────────────
		content_updates_owner: '',
		maintenance_needed: '', // none / ponctuel / mensuel / annuel
		maintenance_scope: [], // updates, backups, monitoring, support, content
		maintenance_budget_monthly: '',
		need_pro_email: '',

		// ─────────────────────────────────────────────
		// FORMATION
		// ─────────────────────────────────────────────
		training_needed: '', // boolean
		training_scope: [], // produits, articles, commandes, analytics

		// ─────────────────────────────────────────────
		// LÉGAL & RGPD
		// ─────────────────────────────────────────────
		mentions: '',
		rgpd: '',
		invoice_tool: '', // outil de facturation connecté ?
		legal_pages_needed: [], // mentions légales, CGV, politique confidentialité, CGU
		privacy_accepted: false
	});

	/**
	 * Détermine si un champ conditionnel doit être affiché
	 * en fonction des réponses actuelles. À brancher sur chaque
	 * sous-question dans le template via {#if shouldShow('field')}.
	 */
	function shouldShow(field) {
		switch (field) {
			// ── E-commerce ───────────────────────────
			case 'ecommerce_platform':
			case 'ecommerce_products_count':
			case 'ecommerce_products_ready':
			case 'ecommerce_variants':
			case 'ecommerce_payment_methods':
			case 'ecommerce_shipping':
			case 'ecommerce_shipping_type':
			case 'ecommerce_b2b':
			case 'ecommerce_erp':
				return answers.ecommerce === true || answers.ecommerce === 'true';
			case 'shopify_plan_exists':
			case 'shopify_theme_preference':
				return answers.ecommerce_platform === 'shopify';
			case 'ecommerce_erp_name':
				return answers.ecommerce_erp === true || answers.ecommerce_erp === 'true';

			// ── Comptes utilisateurs ─────────────────
			case 'user_accounts_features':
			case 'user_accounts_auth':
				return answers.user_accounts === true || answers.user_accounts === 'true';

			// ── Newsletter ───────────────────────────
			case 'newsletter_tool':
				return answers.newsletter === true || answers.newsletter === 'true';

			// ── Carte interactive ────────────────────
			case 'map_provider':
			case 'map_features':
				return answers.interactive_map === true || answers.interactive_map === 'true';

			// ── Langues ──────────────────────────────
			case 'i18n_owner':
				return Array.isArray(answers.langues) && answers.langues.length > 1;

			// ── Domaine ──────────────────────────────
			case 'domain_help_needed':
				return answers.domaine === false || answers.domaine === 'false';

			// ── Hébergement ──────────────────────────
			case 'hebergement_provider':
				return answers.hebergement === 'existing';

			// ── Design ───────────────────────────────
			case 'theme_preference':
			case 'theme_name':
				return answers.design_from_scratch === false || answers.design_from_scratch === 'false';

			// ── Contenu ──────────────────────────────
			case 'blog_owner':
				return answers.blog_needed === true || answers.blog_needed === 'true';
			case 'video_source':
				return answers.video_needed === true || answers.video_needed === 'true';

			// ── Maintenance ──────────────────────────
			case 'maintenance_scope':
			case 'maintenance_budget_monthly':
				return answers.maintenance_needed && answers.maintenance_needed !== 'none';

			// ── Formation ────────────────────────────
			case 'training_scope':
				return answers.training_needed === true || answers.training_needed === 'true';

			default:
				return true;
		}
	}

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
			<div class="progress">
				<div class="progress-bar" style="width: {((step + 1) / (steps.length + 1)) * 100}%"></div>
			</div>

			<!-- Step forms -->
			{#if step === 0}
				<div class="field">
					<label for="objectif">Quel est le but principal du site ?</label>
					<input
						id="objectif"
						bind:value={answers.objectif}
						placeholder="Ex: générer 10 demandes de devis/mois, vendre mes formations en ligne, remplacer mon Linktree…"
					/>
				</div>

				<div class="field">
					<label for="cible">Qui est votre cible prioritaire ?</label>
					<input
						id="cible"
						bind:value={answers.cible}
						placeholder="Ex: jeunes mariés 25-35 ans en Wallonie, restaurateurs indépendants, parents d'élèves en primaire…"
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
						placeholder="Ex: linear.app (animations fluides), oatly.com (ton décalé), aesop.com (typographie élégante)"
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
						placeholder="Ex: avant le salon Batibouw du 22/02, pour la rentrée scolaire, avant l'ouverture de ma boutique en mai…"
					/>
				</div>

				<div class="field">
					<label for="budget">Quel budget avez-vous alloué à ce projet ?</label>
					<input
						id="budget"
						bind:value={answers.budget}
						placeholder="Ex: enveloppe max 4 500€ HTVA, 2 000€ + maintenance étalée, je préfère qu'on en discute…"
					/>
				</div>

				<div class="field">
					<label for="final_decider">Qui est le décideur final ?</label>
					<input
						id="final_decider"
						bind:value={answers.final_decider}
						placeholder="Ex: moi seul, mon associée Sophie valide aussi, conseil d'administration en fin de mois…"
					/>
				</div>
			{/if}

			{#if step === 2}
				<div class="field">
					<label for="logo">Avez-vous déjà un logo ?</label>
					<input
						id="logo"
						bind:value={answers.logo}
						placeholder="Ex: oui en .ai vectoriel, juste un PNG basse def, non mais j'ai un nom de marque, à créer…"
					/>
				</div>

				<div class="field">
					<label for="charte">Avez-vous une charte graphique ?</label>
					<textarea
						id="charte"
						rows="2"
						bind:value={answers.charte}
						placeholder="Ex: vert sapin #2D5016 + crème, police Inter imposée, PDF charte de 12 pages dispo, juste un moodboard Pinterest…"
					></textarea>
				</div>

				<div class="field">
					<label for="photos">Photos & Vidéos disponibles</label>
					<textarea
						id="photos"
						rows="2"
						bind:value={answers.photos}
						placeholder="Ex: 200 photos pro shootées en studio, drone vidéo de l'atelier, rien encore (shooting à prévoir), Unsplash en attendant…"
					></textarea>
				</div>

				<div class="field">
					<label>Design sur-mesure ou thème existant ?</label>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.design_from_scratch} value={true} /> Sur-mesure
							(full custom)</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.design_from_scratch} value={false} /> Thème existant
							adapté</label
						>
					</div>
				</div>

				{#if shouldShow('theme_preference')}
					<div class="field sub">
						<label for="theme_preference">Préférence de thème</label>
						<select id="theme_preference" bind:value={answers.theme_preference}>
							<option value="">- Choisir -</option>
							<option value="free">Gratuit</option>
							<option value="paid">Payant</option>
							<option value="to_define">À définir ensemble</option>
						</select>
					</div>
				{/if}

				{#if shouldShow('theme_name')}
					<div class="field sub">
						<label for="theme_name">Nom du thème (si déjà choisi)</label>
						<input
							id="theme_name"
							bind:value={answers.theme_name}
							placeholder="Ex: Dawn (Shopify), Astra Pro (WP), Impulse, à choisir ensemble…"
						/>
					</div>
				{/if}

				<div class="field">
					<label for="design_inspiration">Inspirations (URLs)</label>
					<textarea
						id="design_inspiration"
						rows="2"
						bind:value={answers.design_inspiration}
						placeholder="Ex: stripe.com (j'adore les dégradés), notion.so (la grille), un site qui m'a marqué chez un concurrent en Allemagne…"
					></textarea>
				</div>

				<div class="field">
					<label>Ambiance design (plusieurs choix possibles)</label>
					<div class="checkbox-group">
						{#each ['modern', 'minimaliste', 'coloré', 'corporate', 'fun', 'luxe'] as mood}
							<label class="chip">
								<input
									type="checkbox"
									checked={inArray('design_mood', mood)}
									onchange={() => toggleArray('design_mood', mood)}
								/>
								<span>{mood}</span>
							</label>
						{/each}
					</div>
				</div>
			{/if}

			{#if step === 3}
				<div class="field">
					<label for="textes">Qui fournit les textes ?</label>
					<input
						id="textes"
						bind:value={answers.textes}
						placeholder="Ex: j'ai déjà tout dans un Google Doc, ma stagiaire en com s'en occupe, j'aimerais que tu rédiges + optimises SEO…"
					/>
				</div>

				<div class="field">
					<span class="group-label">Langues du site (plusieurs choix possibles)</span>
					<div class="checkbox-group">
						{#each ['fr', 'nl', 'en', 'de', 'autre'] as lang}
							<label class="chip">
								<input
									type="checkbox"
									checked={inArray('langues', lang)}
									onchange={() => toggleArray('langues', lang)}
								/>
								<span>{lang.toUpperCase()}</span>
							</label>
						{/each}
					</div>
				</div>

				{#if shouldShow('i18n_owner')}
					<div class="field sub">
						<label for="i18n_owner">Qui gère les traductions ?</label>
						<input
							id="i18n_owner"
							bind:value={answers.i18n_owner}
							placeholder="Ex: ma sœur est traductrice NL, agence Berlitz pour l'EN, DeepL relu par moi, je compte sur toi…"
						/>
					</div>
				{/if}

				<div class="field">
					<label for="pages">Pages spécifiques souhaitées</label>
					<textarea
						id="pages"
						rows="2"
						bind:value={answers.pages}
						placeholder="Ex: configurateur de cuisine, page « avant/après » avec slider, journal de bord du chantier, espace presse, calculateur de devis instantané, page recrutement avec quiz…"
					></textarea>
				</div>

				<div class="field">
					<span class="group-label">Blog / actualités nécessaires ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.blog_needed} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.blog_needed} value={false} /> Non</label
						>
					</div>
				</div>

				{#if shouldShow('blog_owner')}
					<div class="field sub">
						<label for="blog_owner">Qui rédige les articles ?</label>
						<input
							id="blog_owner"
							bind:value={answers.blog_owner}
							placeholder="Ex: 1 article/mois rédigé par moi, ghostwriter externe, IA + relecture, on en discute…"
						/>
					</div>
				{/if}

				<div class="field">
					<span class="group-label">Vidéos nécessaires ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.video_needed} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.video_needed} value={false} /> Non</label
						>
					</div>
				</div>

				{#if shouldShow('video_source')}
					<div class="field sub">
						<label for="video_source">Source des vidéos</label>
						<select id="video_source" bind:value={answers.video_source}>
							<option value="">- Choisir -</option>
							<option value="client">Fournies par le client</option>
							<option value="to_produce">À produire</option>
							<option value="embed">Embed YouTube/Vimeo</option>
						</select>
					</div>
				{/if}
			{/if}

			{#if step === 4}
				<div class="field">
					<span class="group-label">Avez-vous déjà un nom de domaine ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.domaine} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.domaine} value={false} /> Non</label
						>
					</div>
				</div>

				{#if shouldShow('domain_help_needed')}
					<div class="field sub">
						<span class="group-label"
							>Souhaitez-vous de l'aide pour choisir/acheter un domaine ?</span
						>
						<div class="radio-group">
							<label class="radio"
								><input type="radio" bind:group={answers.domain_help_needed} value={true} /> Oui</label
							>
							<label class="radio"
								><input type="radio" bind:group={answers.domain_help_needed} value={false} /> Non</label
							>
						</div>
					</div>
				{/if}

				<div class="field">
					<label for="hebergement">Hébergement</label>
					<select id="hebergement" bind:value={answers.hebergement}>
						<option value="">- Choisir -</option>
						<option value="existing">J'ai déjà un hébergeur</option>
						<option value="needed">J'en ai besoin</option>
						<option value="included_in_offer">À inclure dans l'offre</option>
					</select>
				</div>

				{#if shouldShow('hebergement_provider')}
					<div class="field sub">
						<label for="hebergement_provider">Quel hébergeur ?</label>
						<input
							id="hebergement_provider"
							bind:value={answers.hebergement_provider}
							placeholder="Ex: OVH Perso depuis 2019, Infomaniak (Suisse), o2switch, hébergé chez mon beau-frère sur un Raspberry Pi…"
						/>
					</div>
				{/if}

				<div class="field">
					<label for="dns_owner">Qui gère actuellement les DNS ?</label>
					<textarea
						id="dns_owner"
						rows="2"
						bind:value={answers.dns_owner}
						placeholder="Ex: l'agence qui a fait l'ancien site (plus joignable), mon comptable a tout en main, c'est sur le compte Gandi de mon ex-associé, aucune idée…"
					></textarea>
				</div>

				<div class="field">
					<label for="cms_preference">Préférence CMS / stack</label>
					<select id="cms_preference" bind:value={answers.cms_preference}>
						<option value="">- Choisir -</option>
						<option value="headless">Headless (SvelteKit + CMS)</option>
						<option value="shopify">Shopify</option>
						<option value="drupal">Drupal</option>
						<option value="wordpress">WordPress</option>
						<option value="none">Aucun (statique)</option>
						<option value="to_define">À définir ensemble</option>
					</select>
				</div>

				<div class="field">
					<label for="performance_priority">Niveau de performance attendu</label>
					<select id="performance_priority" bind:value={answers.performance_priority}>
						<option value="">- Choisir -</option>
						<option value="standard">Standard</option>
						<option value="optimized">Optimisé</option>
						<option value="core_web_vitals_strict">Core Web Vitals strict</option>
					</select>
				</div>

				<div class="field">
					<span class="group-label">Conformité accessibilité (WCAG) requise ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.accessibility_needed} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.accessibility_needed} value={false} /> Non</label
						>
					</div>
				</div>
			{/if}

			{#if step === 5}
				<div class="field">
					<label for="conversion">Objectif de conversion principal</label>
					<input
						id="conversion"
						bind:value={answers.conversion}
						placeholder="Ex: réservation directe d'une table, devis automatisé envoyé par mail, click-to-call mobile, scan QR vers WhatsApp Business…"
					/>
				</div>

				<div class="field">
					<label for="contact_form">Formulaire de contact spécifique ?</label>
					<textarea
						id="contact_form"
						rows="2"
						bind:value={answers.contact_form}
						placeholder="Ex: upload de plans PDF jusqu'à 20 Mo, sélecteur de date d'intervention, champ conditionnel selon type de bien (maison/appart), captcha invisible…"
					></textarea>
				</div>

				<div class="field">
					<label for="rendezvous">Prise de rendez-vous en ligne ?</label>
					<input
						id="rendezvous"
						bind:value={answers.rendezvous}
						placeholder="Ex: Cal.com synchronisé sur 3 collaborateurs, créneaux de 45 min uniquement le mardi, paiement d'acompte avant validation…"
					/>
				</div>

				<div class="field">
					<span class="group-label">Intégrations avec d'autres outils</span>
					<div class="checkbox-group">
						{#each ['google_analytics', 'meta_pixel', 'google_ads', 'crm', 'erp', 'calendly', 'stripe', 'mollie', 'autre'] as tool}
							<label class="chip">
								<input
									type="checkbox"
									checked={inArray('integrations', tool)}
									onchange={() => toggleArray('integrations', tool)}
								/>
								<span>{tool.replace('_', ' ')}</span>
							</label>
						{/each}
					</div>
				</div>

				<div class="field">
					<span class="group-label">Carte interactive ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.interactive_map} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.interactive_map} value={false} /> Non</label
						>
					</div>
				</div>

				{#if shouldShow('map_provider')}
					<div class="field sub">
						<label for="map_provider">Fournisseur de carte</label>
						<select id="map_provider" bind:value={answers.map_provider}>
							<option value="">- Choisir -</option>
							<option value="google">Google Maps</option>
							<option value="mapbox">Mapbox</option>
							<option value="osm">OpenStreetMap</option>
						</select>
					</div>
				{/if}

				{#if shouldShow('map_features')}
					<div class="field sub">
						<span class="group-label">Fonctionnalités de la carte</span>
						<div class="checkbox-group">
							{#each ['markers', 'itinéraires', 'zones', 'clustering'] as feat}
								<label class="chip">
									<input
										type="checkbox"
										checked={inArray('map_features', feat)}
										onchange={() => toggleArray('map_features', feat)}
									/>
									<span>{feat}</span>
								</label>
							{/each}
						</div>
					</div>
				{/if}

				<div class="field">
					<span class="group-label">Espace client / comptes utilisateurs ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.user_accounts} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.user_accounts} value={false} /> Non</label
						>
					</div>
				</div>

				{#if shouldShow('user_accounts_features')}
					<div class="field sub">
						<span class="group-label">Fonctionnalités du compte</span>
						<div class="checkbox-group">
							{#each ['historique commandes', 'wishlist', 'profil', 'abonnement'] as feat}
								<label class="chip">
									<input
										type="checkbox"
										checked={inArray('user_accounts_features', feat)}
										onchange={() => toggleArray('user_accounts_features', feat)}
									/>
									<span>{feat}</span>
								</label>
							{/each}
						</div>
					</div>
				{/if}

				{#if shouldShow('user_accounts_auth')}
					<div class="field sub">
						<label for="user_accounts_auth">Méthode d'authentification</label>
						<select id="user_accounts_auth" bind:value={answers.user_accounts_auth}>
							<option value="">- Choisir -</option>
							<option value="email_password">Email / mot de passe</option>
							<option value="google_oauth">Google OAuth</option>
							<option value="magic_link">Magic link</option>
						</select>
					</div>
				{/if}

				<div class="field">
					<span class="group-label">Newsletter ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.newsletter} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.newsletter} value={false} /> Non</label
						>
					</div>
				</div>

				{#if shouldShow('newsletter_tool')}
					<div class="field sub">
						<label for="newsletter_tool">Outil de newsletter</label>
						<select id="newsletter_tool" bind:value={answers.newsletter_tool}>
							<option value="">- Choisir -</option>
							<option value="mailchimp">Mailchimp</option>
							<option value="klaviyo">Klaviyo</option>
							<option value="brevo">Brevo</option>
							<option value="autre">Autre</option>
							<option value="to_define">À définir</option>
						</select>
					</div>
				{/if}
			{/if}

			{#if step === 6}
				<div class="field">
					<span class="group-label">Avez-vous besoin d'une boutique en ligne ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.ecommerce} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.ecommerce} value={false} /> Non</label
						>
					</div>
				</div>

				{#if shouldShow('ecommerce_platform')}
					<div class="field sub">
						<label for="ecommerce_platform">Plateforme e-commerce</label>
						<select id="ecommerce_platform" bind:value={answers.ecommerce_platform}>
							<option value="">- Choisir -</option>
							<option value="shopify">Shopify</option>
							<option value="woocommerce">WooCommerce</option>
							<option value="prestashop">PrestaShop</option>
							<option value="custom">Custom (SvelteKit)</option>
							<option value="other">Autre</option>
						</select>
					</div>

					{#if shouldShow('shopify_plan_exists')}
						<div class="field sub">
							<span class="group-label">Avez-vous déjà un plan Shopify ?</span>
							<div class="radio-group">
								<label class="radio"
									><input type="radio" bind:group={answers.shopify_plan_exists} value={true} /> Oui</label
								>
								<label class="radio"
									><input type="radio" bind:group={answers.shopify_plan_exists} value={false} /> Non</label
								>
							</div>
						</div>
					{/if}

					{#if shouldShow('shopify_theme_preference')}
						<div class="field sub">
							<label for="shopify_theme_preference">Thème Shopify</label>
							<select id="shopify_theme_preference" bind:value={answers.shopify_theme_preference}>
								<option value="">- Choisir -</option>
								<option value="free">Gratuit</option>
								<option value="paid">Payant</option>
								<option value="custom_liquid">Custom Liquid</option>
								<option value="headless_sveltekit">Headless SvelteKit</option>
							</select>
						</div>
					{/if}

					<div class="field sub">
						<label for="ecommerce_products_count">Nombre de produits</label>
						<input
							id="ecommerce_products_count"
							type="number"
							min="0"
							bind:value={answers.ecommerce_products_count}
							placeholder="Ex: 12 produits artisanaux, ~350 SKU avec variantes, 2 000+ pièces auto importées d'un fournisseur…"
						/>
					</div>

					<div class="field sub">
						<span class="group-label">Catalogue prêt (CSV / ERP dispo) ?</span>
						<div class="radio-group">
							<label class="radio"
								><input type="radio" bind:group={answers.ecommerce_products_ready} value={true} /> Oui</label
							>
							<label class="radio"
								><input type="radio" bind:group={answers.ecommerce_products_ready} value={false} /> Non</label
							>
						</div>
					</div>

					<div class="field sub">
						<span class="group-label">Variantes produits (taille, couleur…) ?</span>
						<div class="radio-group">
							<label class="radio"
								><input type="radio" bind:group={answers.ecommerce_variants} value={true} /> Oui</label
							>
							<label class="radio"
								><input type="radio" bind:group={answers.ecommerce_variants} value={false} /> Non</label
							>
						</div>
					</div>

					<div class="field sub">
						<span class="group-label">Moyens de paiement (Bancontact quasi obligatoire en 🇧🇪)</span>
						<div class="checkbox-group">
							{#each ['bancontact', 'visa', 'paypal', 'virement', 'autre'] as pay}
								<label class="chip">
									<input
										type="checkbox"
										checked={inArray('ecommerce_payment_methods', pay)}
										onchange={() => toggleArray('ecommerce_payment_methods', pay)}
									/>
									<span>{pay}</span>
								</label>
							{/each}
						</div>
					</div>

					<div class="field sub">
						<label for="ecommerce_shipping">Transporteur / livraison</label>
						<select id="ecommerce_shipping" bind:value={answers.ecommerce_shipping}>
							<option value="">- Choisir -</option>
							<option value="bpost">Bpost</option>
							<option value="dhl">DHL</option>
							<option value="mondial_relay">Mondial Relay</option>
							<option value="click_collect">Click & Collect</option>
							<option value="other">Autre</option>
						</select>
					</div>

					<div class="field sub">
						<label for="ecommerce_shipping_type">Type de frais de port</label>
						<select id="ecommerce_shipping_type" bind:value={answers.ecommerce_shipping_type}>
							<option value="">- Choisir -</option>
							<option value="fixed">Forfait fixe</option>
							<option value="calculated">Calculés (poids/zone)</option>
							<option value="free_above">Gratuits au-dessus de X€</option>
						</select>
					</div>

					<div class="field sub">
						<span class="group-label">Vente aussi aux professionnels (B2B) ?</span>
						<div class="radio-group">
							<label class="radio"
								><input type="radio" bind:group={answers.ecommerce_b2b} value={true} /> Oui</label
							>
							<label class="radio"
								><input type="radio" bind:group={answers.ecommerce_b2b} value={false} /> Non</label
							>
						</div>
					</div>

					<div class="field sub">
						<span class="group-label">ERP / logiciel de gestion à connecter ?</span>
						<div class="radio-group">
							<label class="radio"
								><input type="radio" bind:group={answers.ecommerce_erp} value={true} /> Oui</label
							>
							<label class="radio"
								><input type="radio" bind:group={answers.ecommerce_erp} value={false} /> Non</label
							>
						</div>
					</div>

					{#if shouldShow('ecommerce_erp_name')}
						<div class="field sub">
							<label for="ecommerce_erp_name">Nom de l'ERP</label>
							<input
								id="ecommerce_erp_name"
								bind:value={answers.ecommerce_erp_name}
								placeholder="Ex: Odoo Community v16, Horus comptabilité, EBP Gestion Co, un Excel maison synchronisé via Zapier…"
							/>
						</div>
					{/if}
				{/if}
			{/if}

			{#if step === 7}
				<div class="field">
					<label for="avis">Avis clients</label>
					<input
						id="avis"
						bind:value={answers.avis}
						placeholder="Ex: 4,8/5 sur 127 avis Google, captures d'écran d'emails clients, vidéos témoignages tournées au salon, rien encore…"
					/>
				</div>

				<div class="field">
					<label for="chiffres">Chiffres clés</label>
					<input
						id="chiffres"
						bind:value={answers.chiffres}
						placeholder="Ex: 1 247 chantiers livrés, 0 retard en 2025, 38 tonnes de matériaux recyclés, présent dans 4 provinces…"
					/>
				</div>

				<div class="field">
					<label for="partenaires">Partenaires</label>
					<textarea
						id="partenaires"
						rows="2"
						bind:value={answers.partenaires}
						placeholder="Ex: revendeur agréé Bosch + Velux, certifié RGIE, membre de la Fédération Horeca Wallonie, partenariat avec l'asbl Empreintes…"
					></textarea>
				</div>
			{/if}

			{#if step === 8}
				<div class="dealbreaker">
					<h2>SEO & Analytics</h2>
				</div>

				<div class="field">
					<label for="seo_keywords">3 mots-clés cibles sur Google</label>
					<textarea
						id="seo_keywords"
						rows="2"
						bind:value={answers.seo_keywords}
						placeholder="Ex: réparation lave-vaisselle Tournai, cours de yoga prénatal Mons, traiteur mariage bio Brabant wallon…"
					></textarea>
				</div>

				<div class="field">
					<label for="primary_action">Action principale attendue du visiteur</label>
					<input
						id="primary_action"
						bind:value={answers.primary_action}
						placeholder="Ex: télécharger mon catalogue PDF, réserver une visite d'atelier, s'inscrire à la prochaine session de formation…"
					/>
				</div>

				<div class="field">
					<label for="seo_target">Cible géographique</label>
					<input
						id="seo_target"
						bind:value={answers.seo_target}
						placeholder="Ex: 25 km autour d'Ath uniquement, Hainaut + Nord de la France, toute la Belgique francophone, Europe DACH…"
					/>
				</div>

				<div class="field">
					<span class="group-label">Configurer Google Search Console ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.google_search_console} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.google_search_console} value={false} /> Non</label
						>
					</div>
				</div>

				<div class="field">
					<span class="group-label">Sitemap XML à générer ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.sitemap_needed} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.sitemap_needed} value={false} /> Non</label
						>
					</div>
				</div>

				<div class="field">
					<span class="group-label">Bannière cookies (RGPD) ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.cookie_banner_needed} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.cookie_banner_needed} value={false} /> Non</label
						>
					</div>
				</div>
			{/if}

			{#if step === 9}
				<div class="dealbreaker">
					<h2>Maintenance & Formation</h2>
				</div>

				<div class="field">
					<label for="content_updates_owner"
						>Qui mettra à jour le contenu après la mise en ligne ?</label
					>
					<input
						id="content_updates_owner"
						bind:value={answers.content_updates_owner}
						placeholder="Ex: ma secrétaire mettra à jour les horaires, je veux pouvoir changer les prix moi-même, je préfère t'envoyer les modifs par mail…"
					/>
				</div>

				<div class="field">
					<label for="maintenance_needed">Type de maintenance</label>
					<select id="maintenance_needed" bind:value={answers.maintenance_needed}>
						<option value="">- Choisir -</option>
						<option value="none">Aucune</option>
						<option value="ponctuel">Ponctuelle</option>
						<option value="mensuel">Mensuelle</option>
						<option value="annuel">Annuelle</option>
					</select>
				</div>

				{#if shouldShow('maintenance_scope')}
					<div class="field sub">
						<span class="group-label">Périmètre de la maintenance</span>
						<div class="checkbox-group">
							{#each ['updates', 'backups', 'monitoring', 'support', 'content'] as s}
								<label class="chip">
									<input
										type="checkbox"
										checked={inArray('maintenance_scope', s)}
										onchange={() => toggleArray('maintenance_scope', s)}
									/>
									<span>{s}</span>
								</label>
							{/each}
						</div>
					</div>
				{/if}

				{#if shouldShow('maintenance_budget_monthly')}
					<div class="field sub">
						<label for="maintenance_budget_monthly">Budget mensuel estimé (€)</label>
						<input
							id="maintenance_budget_monthly"
							bind:value={answers.maintenance_budget_monthly}
							placeholder="Ex: 50€/mois pour les essentiels, 120€/mois avec ajout de contenus, à voir selon ta proposition…"
						/>
					</div>
				{/if}

				<div class="field">
					<label for="need_pro_email">Adresse email pro (ex: contact@entreprise.be) ?</label>
					<input
						id="need_pro_email"
						bind:value={answers.need_pro_email}
						placeholder="Ex: oui contact@ + bonjour@ sur Google Workspace, déjà sur OVH mais à migrer, juste un alias forwardé vers Gmail…"
					/>
				</div>

				<div class="field">
					<span class="group-label">Formation back-office nécessaire ?</span>
					<div class="radio-group">
						<label class="radio"
							><input type="radio" bind:group={answers.training_needed} value={true} /> Oui</label
						>
						<label class="radio"
							><input type="radio" bind:group={answers.training_needed} value={false} /> Non</label
						>
					</div>
				</div>

				{#if shouldShow('training_scope')}
					<div class="field sub">
						<span class="group-label">Périmètre de la formation</span>
						<div class="checkbox-group">
							{#each ['gestion produits', 'articles', 'commandes', 'analytics'] as s}
								<label class="chip">
									<input
										type="checkbox"
										checked={inArray('training_scope', s)}
										onchange={() => toggleArray('training_scope', s)}
									/>
									<span>{s}</span>
								</label>
							{/each}
						</div>
					</div>
				{/if}
			{/if}

			{#if step === 10}
				<div class="field">
					<label for="mentions">Mentions légales (Belgique)</label>
					<input
						id="mentions"
						bind:value={answers.mentions}
						placeholder="Ex: BCE 0123.456.789, TVA BE0123456789, siège social rue X à Mons, n° d'agréation IPI 506.123…"
					/>
				</div>

				<div class="field">
					<label for="rgpd">RGPD</label>
					<input
						id="rgpd"
						bind:value={answers.rgpd}
						placeholder="Ex: politique rédigée par mon avocat en 2023, j'ai juste un modèle CCI à adapter, rien encore - à créer from scratch…"
					/>
				</div>

				<div class="field">
					<label for="invoice_tool">Outil de facturation à connecter ?</label>
					<input
						id="invoice_tool"
						bind:value={answers.invoice_tool}
						placeholder="Ex: Billit synchronisé à mon compte BNP, Horus via mon comptable, je facture encore au format Word…"
					/>
				</div>

				<div class="field">
					<span class="group-label">Pages légales nécessaires</span>
					<div class="checkbox-group">
						{#each ['mentions légales', 'CGV', 'politique confidentialité', 'CGU'] as p}
							<label class="chip">
								<input
									type="checkbox"
									checked={inArray('legal_pages_needed', p)}
									onchange={() => toggleArray('legal_pages_needed', p)}
								/>
								<span>{p}</span>
							</label>
						{/each}
					</div>
				</div>
			{/if}

			{#if step === 11}
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
				<button class="" onclick={back} disabled={step === 0}> Retour </button>
				<button class="grain" onclick={next}>Suivant</button>
				{#if step < lastStepIndex}
					<button class="grain" onclick={jumpToLastStep}>Aller à la dernière étape</button>
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
						<h3>1. Projet & Objectifs</h3>
						<dl>
							<div class="row">
								<dt>But principal</dt>
								<dd>{fmt(answers.objectif)}</dd>
							</div>
							<div class="row">
								<dt>Cible</dt>
								<dd>{fmt(answers.cible)}</dd>
							</div>
							<div class="row">
								<dt>Exemples</dt>
								<dd class="multiline">{fmt(answers.exemples)}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>2. Budget & Planning</h3>
						<dl>
							<div class="row">
								<dt>Lancement</dt>
								<dd>{fmt(answers.launch_date)}</dd>
							</div>
							<div class="row">
								<dt>Budget</dt>
								<dd>{fmt(answers.budget)}</dd>
							</div>
							<div class="row">
								<dt>Décideur final</dt>
								<dd>{fmt(answers.final_decider)}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>3. Design & Identité</h3>
						<dl>
							<div class="row">
								<dt>Logo</dt>
								<dd>{fmt(answers.logo)}</dd>
							</div>
							<div class="row">
								<dt>Charte</dt>
								<dd class="multiline">{fmt(answers.charte)}</dd>
							</div>
							<div class="row">
								<dt>Photos / vidéos</dt>
								<dd class="multiline">{fmt(answers.photos)}</dd>
							</div>
							<div class="row">
								<dt>Sur-mesure</dt>
								<dd>{fmt(answers.design_from_scratch)}</dd>
							</div>
							<div class="row">
								<dt>Thème</dt>
								<dd>{fmt(answers.theme_preference)}</dd>
							</div>
							<div class="row">
								<dt>Nom thème</dt>
								<dd>{fmt(answers.theme_name)}</dd>
							</div>
							<div class="row">
								<dt>Inspirations</dt>
								<dd class="multiline">{fmt(answers.design_inspiration)}</dd>
							</div>
							<div class="row">
								<dt>Ambiance</dt>
								<dd>{fmt(answers.design_mood)}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>4. Contenu & Rédaction</h3>
						<dl>
							<div class="row">
								<dt>Textes</dt>
								<dd>{fmt(answers.textes)}</dd>
							</div>
							<div class="row">
								<dt>Langues</dt>
								<dd>{fmt(answers.langues)}</dd>
							</div>
							<div class="row">
								<dt>Gestion i18n</dt>
								<dd>{fmt(answers.i18n_owner)}</dd>
							</div>
							<div class="row">
								<dt>Pages spéc.</dt>
								<dd class="multiline">{fmt(answers.pages)}</dd>
							</div>
							<div class="row">
								<dt>Blog</dt>
								<dd>{fmt(answers.blog_needed)}</dd>
							</div>
							<div class="row">
								<dt>Rédacteur blog</dt>
								<dd>{fmt(answers.blog_owner)}</dd>
							</div>
							<div class="row">
								<dt>Vidéos</dt>
								<dd>{fmt(answers.video_needed)}</dd>
							</div>
							<div class="row">
								<dt>Source vidéo</dt>
								<dd>{fmt(answers.video_source)}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>5. Technique & Infra</h3>
						<dl>
							<div class="row">
								<dt>Domaine existant</dt>
								<dd>{fmt(answers.domaine)}</dd>
							</div>
							<div class="row">
								<dt>Aide domaine</dt>
								<dd>{fmt(answers.domain_help_needed)}</dd>
							</div>
							<div class="row">
								<dt>Hébergement</dt>
								<dd>{fmt(answers.hebergement)}</dd>
							</div>
							<div class="row">
								<dt>Hébergeur</dt>
								<dd>{fmt(answers.hebergement_provider)}</dd>
							</div>
							<div class="row">
								<dt>DNS (gestion)</dt>
								<dd class="multiline">{fmt(answers.dns_owner)}</dd>
							</div>
							<div class="row">
								<dt>CMS</dt>
								<dd>{fmt(answers.cms_preference)}</dd>
							</div>
							<div class="row">
								<dt>Performance</dt>
								<dd>{fmt(answers.performance_priority)}</dd>
							</div>
							<div class="row">
								<dt>Accessibilité</dt>
								<dd>{fmt(answers.accessibility_needed)}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>6. Fonctionnalités</h3>
						<dl>
							<div class="row">
								<dt>Conversion</dt>
								<dd>{fmt(answers.conversion)}</dd>
							</div>
							<div class="row">
								<dt>Formulaire</dt>
								<dd class="multiline">{fmt(answers.contact_form)}</dd>
							</div>
							<div class="row">
								<dt>RDV en ligne</dt>
								<dd>{fmt(answers.rendezvous)}</dd>
							</div>
							<div class="row">
								<dt>Intégrations</dt>
								<dd>{fmt(answers.integrations)}</dd>
							</div>
							<div class="row">
								<dt>Carte</dt>
								<dd>{fmt(answers.interactive_map)}</dd>
							</div>
							<div class="row">
								<dt>Fournisseur carte</dt>
								<dd>{fmt(answers.map_provider)}</dd>
							</div>
							<div class="row">
								<dt>Options carte</dt>
								<dd>{fmt(answers.map_features)}</dd>
							</div>
							<div class="row">
								<dt>Comptes users</dt>
								<dd>{fmt(answers.user_accounts)}</dd>
							</div>
							<div class="row">
								<dt>Fonctions compte</dt>
								<dd>{fmt(answers.user_accounts_features)}</dd>
							</div>
							<div class="row">
								<dt>Auth</dt>
								<dd>{fmt(answers.user_accounts_auth)}</dd>
							</div>
							<div class="row">
								<dt>Newsletter</dt>
								<dd>{fmt(answers.newsletter)}</dd>
							</div>
							<div class="row">
								<dt>Outil newsletter</dt>
								<dd>{fmt(answers.newsletter_tool)}</dd>
							</div>
						</dl>
					</section>

					{#if answers.ecommerce === true}
						<section class="summary-section grain">
							<h3>7. E-commerce</h3>
							<dl>
								<div class="row">
									<dt>Plateforme</dt>
									<dd>{fmt(answers.ecommerce_platform)}</dd>
								</div>
								<div class="row">
									<dt>Plan Shopify</dt>
									<dd>{fmt(answers.shopify_plan_exists)}</dd>
								</div>
								<div class="row">
									<dt>Thème Shopify</dt>
									<dd>{fmt(answers.shopify_theme_preference)}</dd>
								</div>
								<div class="row">
									<dt>Nb produits</dt>
									<dd>{fmt(answers.ecommerce_products_count)}</dd>
								</div>
								<div class="row">
									<dt>Catalogue prêt</dt>
									<dd>{fmt(answers.ecommerce_products_ready)}</dd>
								</div>
								<div class="row">
									<dt>Variantes</dt>
									<dd>{fmt(answers.ecommerce_variants)}</dd>
								</div>
								<div class="row">
									<dt>Paiements</dt>
									<dd>{fmt(answers.ecommerce_payment_methods)}</dd>
								</div>
								<div class="row">
									<dt>Livraison</dt>
									<dd>{fmt(answers.ecommerce_shipping)}</dd>
								</div>
								<div class="row">
									<dt>Frais de port</dt>
									<dd>{fmt(answers.ecommerce_shipping_type)}</dd>
								</div>
								<div class="row">
									<dt>B2B</dt>
									<dd>{fmt(answers.ecommerce_b2b)}</dd>
								</div>
								<div class="row">
									<dt>ERP</dt>
									<dd>{fmt(answers.ecommerce_erp)}</dd>
								</div>
								<div class="row">
									<dt>Nom ERP</dt>
									<dd>{fmt(answers.ecommerce_erp_name)}</dd>
								</div>
							</dl>
						</section>
					{/if}

					<section class="summary-section grain">
						<h3>8. Preuves sociales</h3>
						<dl>
							<div class="row">
								<dt>Avis</dt>
								<dd>{fmt(answers.avis)}</dd>
							</div>
							<div class="row">
								<dt>Chiffres</dt>
								<dd>{fmt(answers.chiffres)}</dd>
							</div>
							<div class="row">
								<dt>Partenaires</dt>
								<dd class="multiline">{fmt(answers.partenaires)}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>9. SEO & Analytics</h3>
						<dl>
							<div class="row">
								<dt>Mots-clés</dt>
								<dd class="multiline">{fmt(answers.seo_keywords)}</dd>
							</div>
							<div class="row">
								<dt>Action principale</dt>
								<dd>{fmt(answers.primary_action)}</dd>
							</div>
							<div class="row">
								<dt>Cible géo</dt>
								<dd>{fmt(answers.seo_target)}</dd>
							</div>
							<div class="row">
								<dt>Search Console</dt>
								<dd>{fmt(answers.google_search_console)}</dd>
							</div>
							<div class="row">
								<dt>Sitemap</dt>
								<dd>{fmt(answers.sitemap_needed)}</dd>
							</div>
							<div class="row">
								<dt>Cookie banner</dt>
								<dd>{fmt(answers.cookie_banner_needed)}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>10. Maintenance & Formation</h3>
						<dl>
							<div class="row">
								<dt>MAJ contenu</dt>
								<dd>{fmt(answers.content_updates_owner)}</dd>
							</div>
							<div class="row">
								<dt>Maintenance</dt>
								<dd>{fmt(answers.maintenance_needed)}</dd>
							</div>
							<div class="row">
								<dt>Périmètre</dt>
								<dd>{fmt(answers.maintenance_scope)}</dd>
							</div>
							<div class="row">
								<dt>Budget mensuel</dt>
								<dd>{fmt(answers.maintenance_budget_monthly)}</dd>
							</div>
							<div class="row">
								<dt>Email pro</dt>
								<dd>{fmt(answers.need_pro_email)}</dd>
							</div>
							<div class="row">
								<dt>Formation</dt>
								<dd>{fmt(answers.training_needed)}</dd>
							</div>
							<div class="row">
								<dt>Périmètre formation</dt>
								<dd>{fmt(answers.training_scope)}</dd>
							</div>
						</dl>
					</section>

					<section class="summary-section grain">
						<h3>11. Légal & RGPD</h3>
						<dl>
							<div class="row">
								<dt>Mentions légales</dt>
								<dd>{fmt(answers.mentions)}</dd>
							</div>
							<div class="row">
								<dt>RGPD</dt>
								<dd>{fmt(answers.rgpd)}</dd>
							</div>
							<div class="row">
								<dt>Facturation</dt>
								<dd>{fmt(answers.invoice_tool)}</dd>
							</div>
							<div class="row">
								<dt>Pages légales</dt>
								<dd>{fmt(answers.legal_pages_needed)}</dd>
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
						onclick={() => {
							step = 0;
						}}>Modifier</button
					>
					<button class="grain" onclick={send} disabled={sending}>
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

	.progress {
		height: 6px;
		background: rgba(0, 0, 0, 0.06);
		border-radius: 999px;
		overflow: hidden;
		margin-bottom: 1.5rem;
	}
	.progress-bar {
		height: 100%;
		background: var(--color-primary, #00c878);
		transition: width 0.35s ease;
	}

	.group-label {
		font-weight: 500;
		opacity: 0.9;
		display: block;
		margin-bottom: 0.35rem;
	}

	.checkbox-group,
	.radio-group {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem;
	}

	.chip,
	.radio {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		cursor: pointer;
		// background: var(--color-white);
		// border-radius: 999px;
		// box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.03);
		font-size: 0.9rem;
		text-transform: capitalize;
		&:has(input:checked) {
			// background: var(--color-primary, #00c878);
			// color: var(--color-green);
			font-weight: 700;
		}
	}

	select {
		background: var(--color-white);
		border: 0;
		padding: 0.9rem 1rem;
		min-height: 44px;
		box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.03);
		border-radius: 5px;
		font: inherit;
		color: var(--color-black);
		option {
			color: var(--color-black);
		}
	}

	.field.sub {
		margin-left: 1rem;
		padding-left: 1rem;
		border-left: 2px solid rgba(0, 0, 0, 0.08);
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
