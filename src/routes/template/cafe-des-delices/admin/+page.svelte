<script>
	import DragList from './DragList.svelte';
	import {
		infos,
		horaires,
		cuisine,
		platDuJour,
		menus,
		poles,
		galerie,
		heroImage,
		carte,
		avis,
		menuSections,
		socials,
		alerteOuverture,
		fermetures,
		evenements,
		cta,
		seo,
		schema
	} from '../lib/data.js';

	// ── Auth ──
	let isLoggedIn = $state(false);
	let loginEmail = $state('');
	let loginPassword = $state('');
	let loginError = $state('');

	function handleLogin() {
		if (loginEmail && loginPassword) {
			isLoggedIn = true;
			loginError = '';
		} else {
			loginError = 'Veuillez remplir tous les champs.';
		}
	}

	// ── Navigation ──
	let activeTab = $state('infos');

	const sidebarGroups = [
		{
			label: 'Général',
			items: [
				{ id: 'infos', label: 'Informations' },
				{ id: 'horaires', label: 'Horaires' },
				{ id: 'alerte', label: 'Alerte' },
				{ id: 'evenements', label: 'Évènements' }
			]
		},
		{
			label: 'Contenu',
			items: [
				{ id: 'platdujour', label: 'Plat du jour' },
				{ id: 'menus', label: 'Menus' },
				{ id: 'poles', label: 'Pôles' },
				{ id: 'carte', label: 'Carte' },
				{ id: 'cta', label: "Appels à l'action" }
			]
		},
		{
			label: 'Médias',
			items: [
				{ id: 'hero', label: 'Hero' },
				{ id: 'galerie', label: 'Galerie' }
			]
		},
		{
			label: 'Réseaux',
			items: [{ id: 'socials', label: 'Réseaux sociaux' }]
		},
		{
			label: 'SEO & Référencement',
			items: [
				{ id: 'seo', label: 'SEO' },
				{ id: 'schema', label: 'Données structurées' }
			]
		},
		{
			label: 'Paramètres',
			items: [{ id: 'avis', label: 'Avis' }]
		}
	];

	// ── Editable state ──
	let editInfos = $state({
		email: infos.email,
		telephone: infos.telephone,
		siteWeb: infos.siteWeb,
		googlePlaceId: infos.googlePlaceId,
		googleMapsUrl: infos.googleMapsUrl,
		reservationUrl: infos.reservationUrl,
		parking: infos.parking,
		wifi: infos.wifi,
		wifiNom: infos.wifiNom,
		terrasse: infos.terrasse,
		accesHandicape: infos.accesHandicape,
		capaciteSalle: infos.capacite.salle,
		capaciteTerrasse: infos.capacite.terrasse
	});
	let editHoraires = $state(structuredClone(horaires));
	let editCuisine = $state(structuredClone(cuisine));
	let editPlatDuJour = $state({ ...structuredClone(platDuJour), actif: true });
	let editMenus = $state(structuredClone(menus));
	let editPoles = $state(structuredClone(poles));
	let editCarte = $state(structuredClone(carte));
	let editGalerie = $state(structuredClone(galerie));
	let editHeroImage = $state(heroImage);
	let editHeroAlt = $state('Vue principale du restaurant');
	let editSocials = $state(structuredClone(socials));
	let editAlerteOuverture = $state(structuredClone(alerteOuverture));
	let editFermetures = $state(structuredClone(fermetures));
	let editEvenements = $state(structuredClone(evenements));
	let editCta = $state(structuredClone(cta));
	let editSeo = $state(structuredClone(seo));
	let editSchema = $state(structuredClone(schema));
	let avisMinStars = $state(4);
	let carteFilter = $state('all');

	// ── Generic drag-reorder (for panels without DragList) ──
	let panelDragIndex = $state(null);
	let panelDragOver = $state(null);
	// Which panel index has its handle held down (mousedown)
	let panelArmed = $state(null);

	function panelHandleDown(i) { panelArmed = i; }
	function panelHandleUp()    { panelArmed = null; }

	function panelDragStart(e, i) {
		// Only allow drag when initiated from the handle
		if (panelArmed !== i) { e.preventDefault(); return; }
		panelDragIndex = i;
	}
	function panelDragOverFn(e, i) {
		e.preventDefault();
		panelDragOver = i;
	}
	function panelDrop(e, i, arr, setter) {
		e.preventDefault();
		if (panelDragIndex === null || panelDragIndex === i) {
			panelDragIndex = null;
			panelDragOver = null;
			return;
		}
		const next = [...arr];
		const [moved] = next.splice(panelDragIndex, 1);
		next.splice(i, 0, moved);
		setter(next);
		panelDragIndex = null;
		panelDragOver = null;
	}
	function panelDragEndFn() {
		panelDragIndex = null;
		panelDragOver = null;
		panelArmed = null;
	}

	// ── Mobile sidebar ──
	let sidebarOpen = $state(false);

	// ── Save ──
	let saveMessage = $state('');
	let saveVisible = $state(false);

	function save() {
		saveMessage = 'Modifications enregistrées';
		saveVisible = true;
		setTimeout(() => {
			saveVisible = false;
		}, 2500);
	}

	// ── Menu CRUD ──
	function addMenu() {
		editMenus.push({
			num: String(editMenus.length + 1).padStart(2, '0'),
			nom: 'Nouveau menu',
			prix: '0',
			sections: [
				{ titre: 'Entrée', choix: '' },
				{ titre: 'Plat', choix: '' },
				{ titre: 'Dessert', choix: '' }
			]
		});
	}
	function removeMenu(i) {
		editMenus.splice(i, 1);
	}
	function addMenuSection(mi) {
		editMenus[mi].sections.push({ titre: '', choix: '' });
	}
	function removeMenuSection(mi, si) {
		editMenus[mi].sections.splice(si, 1);
	}

	// ── Carte CRUD ──
	function addCarteItem(ci) {
		editCarte[ci].items.push({ nom: '', desc: '', prix: '' });
	}
	function removeCarteItem(ci, ii) {
		editCarte[ci].items.splice(ii, 1);
	}
	function addCarteCategory() {
		editCarte.push({ categorie: 'Nouvelle catégorie', items: [{ nom: '', desc: '', prix: '' }] });
	}
	function removeCarteCategory(ci) {
		editCarte.splice(ci, 1);
	}

	// ── Pôles CRUD ──
	function addPole() {
		const nextNum = String(editPoles.length + 1).padStart(2, '0');
		editPoles.push({
			num: nextNum,
			sur: 'Nouveau',
			titre: 'Pôle',
			texte: '',
			cta: { label: 'En savoir plus', href: '/template/cafe-des-delices/menu' },
			layout: 'classic',
			flip: false,
			img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80'
		});
	}
	function removePole(pi) {
		editPoles.splice(pi, 1);
	}

	// ── Fermetures CRUD ──
	function addFermeture() {
		editFermetures.push({ date: '', motif: '' });
	}
	function removeFermeture(i) {
		editFermetures.splice(i, 1);
	}

	// ── Évènements CRUD ──
	function addEvenement() {
		editEvenements.push({ titre: '', date: '', description: '', actif: true });
	}
	function removeEvenement(i) {
		editEvenements.splice(i, 1);
	}

	// ── Socials CRUD ──
	function addSocial() {
		editSocials.push({ id: 'nouveau', label: 'Nouveau réseau', url: '', actif: true });
	}
	function removeSocial(i) {
		editSocials.splice(i, 1);
	}
</script>

{#if !isLoggedIn}
	<!-- ══════ LOGIN ══════ -->
	<div class="login-page">
		<div class="login-card">
			<div class="login-head">
				<svg
					class="login-logo"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					width="32"
					height="32"
				>
					<rect x="3" y="3" width="18" height="18" rx="4" />
					<path d="M9 9h6M9 13h4" />
				</svg>
				<h1>Dashboard</h1>
				<p>Connectez-vous pour gérer votre site</p>
			</div>

			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}
			>
				{#if loginError}
					<div class="field-error">{loginError}</div>
				{/if}
				<label class="field">
					<span>Email</span>
					<input type="email" bind:value={loginEmail} placeholder="votre@email.com" />
				</label>
				<label class="field">
					<span>Mot de passe</span>
					<input type="password" bind:value={loginPassword} placeholder="••••••••" />
				</label>
				<button type="submit" class="btn btn-accent full">Se connecter</button>
			</form>
			<p class="login-sub">Authentification Supabase bientôt disponible</p>
		</div>
	</div>
{:else}
	<!-- ══════ DASHBOARD ══════ -->
	<div class="dash" class:sidebar-open={sidebarOpen}>
		<!-- Sidebar -->
		<aside class="sidebar">
			<div class="sb-head">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					width="20"
					height="20"
				>
					<rect x="3" y="3" width="18" height="18" rx="4" /><path d="M9 9h6M9 13h4" />
				</svg>
				<span class="sb-title">Studio</span>
			</div>

			<!-- Client indicator -->
			<div class="sb-client">
				<div class="sb-client-dot"></div>
				<a href="/template/cafe-des-delices" class="no-effect" target="_blank">{infos.nom}</a>
			</div>

			<nav class="sb-nav">
				{#each sidebarGroups as group}
					<div class="sb-group">
						<div class="sb-group-label">{group.label}</div>
						{#each group.items as item}
							<button
								class="sb-item"
								class:active={activeTab === item.id}
								onclick={() => {
									activeTab = item.id;
									sidebarOpen = false;
								}}
							>
								{item.label}
							</button>
						{/each}
					</div>
				{/each}
			</nav>

			<div class="sb-foot">
				<button class="sb-item sb-logout" onclick={() => (isLoggedIn = false)}>Déconnexion</button>
			</div>
		</aside>

		{#if sidebarOpen}
			<div
				class="sidebar-overlay"
				role="button"
				tabindex="-1"
				onclick={() => (sidebarOpen = false)}
				onkeydown={(e) => e.key === 'Escape' && (sidebarOpen = false)}
			></div>
		{/if}

		<!-- Main -->
		<div class="main">
			<header class="topbar">
				<button class="hamburger" onclick={() => (sidebarOpen = !sidebarOpen)} aria-label="Menu">
					<span></span><span></span><span></span>
				</button>
				<h2>{sidebarGroups.flatMap((g) => g.items).find((t) => t.id === activeTab)?.label}</h2>
				<div class="topbar-right">
					<button class="btn btn-accent" onclick={save}>Enregistrer</button>
				</div>
			</header>

			<!-- Toast -->
			{#if saveVisible}
				<div class="toast">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						width="16"
						height="16"><path d="M20 6L9 17l-5-5" /></svg
					>
					{saveMessage}
				</div>
			{/if}

			<div class="content">
				<!-- ── INFOS ── -->
				{#if activeTab === 'infos'}
					<div class="panel">
						<div class="panel-head">
							<h3>Informations du restaurant</h3>
							<p>Les champs grisés ne sont pas modifiables depuis le dashboard.</p>
						</div>
						<div class="grid-2">
							<label class="field">
								<span>Nom</span>
								<input type="text" value={infos.nom} disabled />
							</label>
							<label class="field">
								<span>Ville</span>
								<input type="text" value={infos.ville} disabled />
							</label>
							<label class="field full">
								<span>Adresse complète</span>
								<input type="text" value={infos.adresseComplete} disabled />
							</label>
							<label class="field">
								<span>Email</span>
								<input type="email" bind:value={editInfos.email} />
							</label>
							<label class="field">
								<span>Téléphone</span>
								<input type="tel" bind:value={editInfos.telephone} />
							</label>
							<label class="field full">
								<span>Site web</span>
								<input
									type="url"
									bind:value={editInfos.siteWeb}
									placeholder="https://..."
									class="mono"
								/>
							</label>
							<label class="field full">
								<span>URL de réservation</span>
								<input
									type="url"
									bind:value={editInfos.reservationUrl}
									placeholder="TheFork, Resengo, ou mailto:..."
									class="mono"
								/>
							</label>
						</div>

						<div class="separator"></div>
						<div class="panel-head">
							<h3>Liens Google</h3>
							<p>
								Renseignez le Place ID pour activer les liens directs vers Google Maps et les avis.
							</p>
						</div>
						<div class="grid-2">
							<label class="field">
								<span>Google Place ID</span>
								<input
									type="text"
									bind:value={editInfos.googlePlaceId}
									placeholder="ChIJ..."
									class="mono"
								/>
							</label>
							<label class="field">
								<span>URL Google Maps</span>
								<input
									type="url"
									bind:value={editInfos.googleMapsUrl}
									placeholder="https://maps.google.com/..."
									class="mono"
								/>
							</label>
						</div>

						<div class="separator"></div>
						<div class="panel-head">
							<h3>Équipements & accessibilité</h3>
						</div>
						<div class="grid-2">
							<label class="field">
								<span>Parking</span>
								<input
									type="text"
									bind:value={editInfos.parking}
									placeholder="ex: Parking payant à 50m"
								/>
							</label>
							<label class="field">
								<span>Nom réseau Wi-Fi</span>
								<input type="text" bind:value={editInfos.wifiNom} class="mono" />
							</label>
							<label class="field">
								<span>Capacité salle (couverts)</span>
								<input type="number" bind:value={editInfos.capaciteSalle} min="0" class="mono" />
							</label>
							<label class="field">
								<span>Capacité terrasse (couverts)</span>
								<input type="number" bind:value={editInfos.capaciteTerrasse} min="0" class="mono" />
							</label>
						</div>
						<div class="toggle-row mt-16">
							<label class="toggle">
								<input type="checkbox" bind:checked={editInfos.terrasse} />
								<span class="toggle-track"><span class="toggle-thumb"></span></span>
							</label>
							<span class="toggle-label">Terrasse</span>
						</div>
						<div class="toggle-row">
							<label class="toggle">
								<input type="checkbox" bind:checked={editInfos.wifi} />
								<span class="toggle-track"><span class="toggle-thumb"></span></span>
							</label>
							<span class="toggle-label">Wi-Fi disponible</span>
						</div>
						<div class="toggle-row">
							<label class="toggle">
								<input type="checkbox" bind:checked={editInfos.accesHandicape} />
								<span class="toggle-track"><span class="toggle-thumb"></span></span>
							</label>
							<span class="toggle-label">Accès handicapé</span>
						</div>
					</div>

					<!-- ── HORAIRES ── -->
				{:else if activeTab === 'horaires'}
					<div class="panel">
						<div class="panel-head">
							<h3>Horaires d'ouverture</h3>
						</div>
						<div class="table-wrap">
							<table>
								<thead><tr><th>Jour</th><th>Horaires</th></tr></thead>
								<tbody>
									{#each editHoraires as h, i}
										<tr>
											<td class="cell-label">{h.j}</td>
											<td><input type="text" bind:value={editHoraires[i].h} /></td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
					<div class="panel">
						<div class="panel-head">
							<h3>Horaires cuisine</h3>
						</div>
						<div class="grid-2">
							<label class="field">
								<span>Midi</span>
								<input type="text" bind:value={editCuisine.midi} />
							</label>
							<label class="field">
								<span>Soir</span>
								<input type="text" bind:value={editCuisine.soir} />
							</label>
							<label class="field full">
								<span>Note de service</span>
								<input
									type="text"
									bind:value={editCuisine.noteService}
									placeholder="ex: Le bar est ouvert en continu de 10h à 22h"
								/>
							</label>
						</div>
						<div class="toggle-row mt-16">
							<label class="toggle">
								<input type="checkbox" bind:checked={editCuisine.serviceContinuWeekend} />
								<span class="toggle-track"><span class="toggle-thumb"></span></span>
							</label>
							<span class="toggle-label">Service continu le week-end</span>
						</div>
						<div class="toggle-row">
							<label class="toggle">
								<input type="checkbox" bind:checked={editCuisine.reservationConseilleeWeekend} />
								<span class="toggle-track"><span class="toggle-thumb"></span></span>
							</label>
							<span class="toggle-label">Réservation conseillée le week-end</span>
						</div>
					</div>

					<!-- ── PLAT DU JOUR ── -->
				{:else if activeTab === 'platdujour'}
					<div class="panel">
						<div class="panel-head">
							<h3>Plat du jour</h3>
						</div>
						<div class="toggle-row">
							<label class="toggle">
								<input type="checkbox" bind:checked={editPlatDuJour.actif} />
								<span class="toggle-track"><span class="toggle-thumb"></span></span>
							</label>
							<span class="toggle-label">{editPlatDuJour.actif ? 'Actif' : 'Désactivé'}</span>
							<span
								class="badge"
								class:badge-on={editPlatDuJour.actif}
								class:badge-off={!editPlatDuJour.actif}
							>
								{editPlatDuJour.actif ? 'Visible sur le site' : 'Masqué'}
							</span>
						</div>

						<div class="separator"></div>

						<div class="grid-2">
							<label class="field">
								<span>Mode d'affichage</span>
								<select bind:value={editPlatDuJour.type}>
									<option value="text">Texte</option>
									<option value="image">Image</option>
								</select>
							</label>
						</div>

						{#if editPlatDuJour.type === 'text'}
							<div class="grid-2 mt-16">
								<label class="field">
									<span>Nom du plat</span>
									<input type="text" bind:value={editPlatDuJour.nom} />
								</label>
								<label class="field">
									<span>Prix</span>
									<input type="text" bind:value={editPlatDuJour.prix} />
								</label>
								<label class="field full">
									<span>Description</span>
									<input type="text" bind:value={editPlatDuJour.description} />
								</label>
								<label class="field full">
									<span>Accompagnement</span>
									<input type="text" bind:value={editPlatDuJour.accompagnement} />
								</label>
								<label class="field">
									<span>Badge</span>
									<input type="text" bind:value={editPlatDuJour.badge} />
								</label>
							</div>
						{:else}
							<div class="grid-2 mt-16">
								<label class="field full">
									<span>URL de l'image</span>
									<input type="url" bind:value={editPlatDuJour.image} />
								</label>
								<label class="field full">
									<span>Texte alternatif</span>
									<input type="text" bind:value={editPlatDuJour.imageAlt} />
								</label>
							</div>
							{#if editPlatDuJour.image}
								<div class="img-preview mt-16">
									<img src={editPlatDuJour.image} alt={editPlatDuJour.imageAlt || ''} />
								</div>
							{/if}
						{/if}
					</div>

					<!-- ── MENUS ── -->
				{:else if activeTab === 'menus'}
					{#each editMenus as menu, mi}
						<div
							class="panel"
							class:panel-dragging={panelDragIndex === mi}
							class:panel-drag-over={panelDragOver === mi && panelDragIndex !== mi}
							role="listitem"
							draggable="true"
							ondragstart={(e) => panelDragStart(e, mi)}
							ondragover={(e) => panelDragOverFn(e, mi)}
							ondrop={(e) => panelDrop(e, mi, editMenus, (r) => (editMenus = r))}
							ondragend={panelDragEndFn}
						>
							<div class="panel-head row-between">
								<div class="row-drag-title">
									<button
										class="panel-drag-handle"
										type="button"
										aria-label="Déplacer"
										title="Glisser pour réordonner"
										onmousedown={() => panelHandleDown(mi)}
										onmouseup={panelHandleUp}
									>
										<svg viewBox="0 0 24 24" fill="none" width="14" height="14">
											<circle cx="9" cy="5" r="1.2" fill="currentColor" />
											<circle cx="15" cy="5" r="1.2" fill="currentColor" />
											<circle cx="9" cy="12" r="1.2" fill="currentColor" />
											<circle cx="15" cy="12" r="1.2" fill="currentColor" />
											<circle cx="9" cy="19" r="1.2" fill="currentColor" />
											<circle cx="15" cy="19" r="1.2" fill="currentColor" />
										</svg>
									</button>
									<h3>Menu {menu.num} — {menu.nom}</h3>
								</div>
								<button class="btn btn-danger-ghost btn-sm" onclick={() => removeMenu(mi)}
									>Supprimer</button
								>
							</div>
							<div class="grid-2">
								<label class="field">
									<span>Nom</span>
									<input type="text" bind:value={editMenus[mi].nom} />
								</label>
								<label class="field">
									<span>Prix (EUR)</span>
									<input type="text" bind:value={editMenus[mi].prix} class="mono" />
								</label>
							</div>

							<div class="separator"></div>

							{#each menu.sections as section, si}
								<div class="sub-row">
									<div class="sub-row-fields">
										<input
											type="text"
											bind:value={editMenus[mi].sections[si].titre}
											placeholder="Titre"
											class="input-bold"
										/>
										<textarea
											bind:value={editMenus[mi].sections[si].choix}
											rows="2"
											placeholder="Choix (ex: Plat A - ou - Plat B)"
										></textarea>
									</div>
									<button
										class="btn-icon btn-icon-danger"
										onclick={() => removeMenuSection(mi, si)}
										aria-label="Supprimer la section"
									>
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											width="14"
											height="14"><path d="M18 6L6 18M6 6l12 12" /></svg
										>
									</button>
								</div>
							{/each}
							<button class="btn btn-ghost btn-sm" onclick={() => addMenuSection(mi)}
								>+ Section</button
							>
						</div>
					{/each}
					<button class="btn btn-ghost full" onclick={addMenu}>+ Ajouter un menu</button>

					<!-- ── PÔLES ── -->
				{:else if activeTab === 'poles'}
					{#each editPoles as pole, pi}
						<div
							class="panel"
							class:panel-dragging={panelDragIndex === pi}
							class:panel-drag-over={panelDragOver === pi && panelDragIndex !== pi}
							role="listitem"
							draggable="true"
							ondragstart={(e) => panelDragStart(e, pi)}
							ondragover={(e) => panelDragOverFn(e, pi)}
							ondrop={(e) => panelDrop(e, pi, editPoles, (r) => (editPoles = r))}
							ondragend={panelDragEndFn}
						>
							<div class="panel-head row-between">
								<div class="row-drag-title">
									<button
										class="panel-drag-handle"
										type="button"
										aria-label="Déplacer"
										title="Glisser pour réordonner"
										onmousedown={() => panelHandleDown(pi)}
										onmouseup={panelHandleUp}
									>
										<svg viewBox="0 0 24 24" fill="none" width="14" height="14">
											<circle cx="9" cy="5" r="1.2" fill="currentColor" />
											<circle cx="15" cy="5" r="1.2" fill="currentColor" />
											<circle cx="9" cy="12" r="1.2" fill="currentColor" />
											<circle cx="15" cy="12" r="1.2" fill="currentColor" />
											<circle cx="9" cy="19" r="1.2" fill="currentColor" />
											<circle cx="15" cy="19" r="1.2" fill="currentColor" />
										</svg>
									</button>
									<h3>Pôle {pole.num} — {pole.sur} {pole.titre}</h3>
								</div>
								<button class="btn btn-danger-ghost btn-sm" onclick={() => removePole(pi)}
									>Supprimer</button
								>
							</div>
							<div class="grid-2">
								<label class="field">
									<span>Sur-titre</span>
									<input type="text" bind:value={editPoles[pi].sur} />
								</label>
								<label class="field">
									<span>Titre</span>
									<input type="text" bind:value={editPoles[pi].titre} />
								</label>
								<label class="field full">
									<span>Texte</span>
									<textarea bind:value={editPoles[pi].texte} rows="3"></textarea>
								</label>
								<label class="field">
									<span>Label CTA</span>
									<input type="text" bind:value={editPoles[pi].cta.label} />
								</label>
								<label class="field">
									<span>Lien CTA</span>
									<input type="text" bind:value={editPoles[pi].cta.href} class="mono" />
								</label>
								<label class="field full">
									<span>URL image</span>
									<input type="url" bind:value={editPoles[pi].img} />
								</label>
							</div>

							<div class="separator"></div>

							<div class="field-label">Disposition</div>
							<div class="layout-grid">
								{#each ['immersive', 'classic', 'editorial'] as layout}
									<button
										class="layout-opt"
										class:selected={editPoles[pi].layout === layout}
										onclick={() => (editPoles[pi].layout = layout)}
									>
										<div class="layout-thumb lt-{layout}">
											<div class="lt-img"></div>
											<div class="lt-txt">
												<div class="lt-line"></div>
												<div class="lt-line sm"></div>
											</div>
										</div>
										<span>{layout}</span>
									</button>
								{/each}
							</div>

							{#if editPoles[pi].layout !== 'immersive'}
								<div class="separator"></div>
								<div class="field-label">Sens (image / texte)</div>
								<div class="flip-grid">
									<button
										class="flip-opt"
										class:selected={!editPoles[pi].flip}
										onclick={() => (editPoles[pi].flip = false)}
									>
										<div class="flip-thumb">
											<div class="flip-img left"></div>
											<div class="flip-txt"></div>
										</div>
										<span>Image gauche</span>
									</button>
									<button
										class="flip-opt"
										class:selected={editPoles[pi].flip}
										onclick={() => (editPoles[pi].flip = true)}
									>
										<div class="flip-thumb">
											<div class="flip-txt"></div>
											<div class="flip-img right"></div>
										</div>
										<span>Image droite</span>
									</button>
								</div>
							{/if}
						</div>
					{/each}
					<button class="btn btn-ghost full" onclick={addPole}>+ Ajouter un pôle</button>

					<!-- ── CARTE ── -->
				{:else if activeTab === 'carte'}
					<div class="filter-bar">
						<button
							class="chip"
							class:active={carteFilter === 'all'}
							onclick={() => (carteFilter = 'all')}>Tout</button
						>
						{#each menuSections as ms}
							<button
								class="chip"
								class:active={carteFilter === ms.id}
								onclick={() => (carteFilter = ms.id)}>{ms.label}</button
							>
						{/each}
					</div>

					{#each editCarte as cat, ci}
						{@const visible =
							carteFilter === 'all' ||
							menuSections.find((s) => s.id === carteFilter)?.categories.includes(cat.categorie)}
						{@const draggable_cat = carteFilter === 'all'}
						{#if visible}
							<div
								class="panel"
								class:panel-dragging={draggable_cat && panelDragIndex === ci}
								class:panel-drag-over={draggable_cat &&
									panelDragOver === ci &&
									panelDragIndex !== ci}
								role="listitem"
								draggable={draggable_cat}
								ondragstart={draggable_cat ? (e) => panelDragStart(e, ci) : null}
								ondragover={draggable_cat ? (e) => panelDragOverFn(e, ci) : null}
								ondrop={draggable_cat
									? (e) => panelDrop(e, ci, editCarte, (r) => (editCarte = r))
									: null}
								ondragend={draggable_cat ? panelDragEndFn : null}
							>
								<div class="panel-head row-between">
									<div class="row-drag-title">
										{#if draggable_cat}
											<button
												class="panel-drag-handle"
												type="button"
												aria-label="Déplacer"
												title="Glisser pour réordonner"
												onmousedown={() => panelHandleDown(ci)}
												onmouseup={panelHandleUp}
											>
												<svg viewBox="0 0 24 24" fill="none" width="14" height="14">
													<circle cx="9" cy="5" r="1.2" fill="currentColor" />
													<circle cx="15" cy="5" r="1.2" fill="currentColor" />
													<circle cx="9" cy="12" r="1.2" fill="currentColor" />
													<circle cx="15" cy="12" r="1.2" fill="currentColor" />
													<circle cx="9" cy="19" r="1.2" fill="currentColor" />
													<circle cx="15" cy="19" r="1.2" fill="currentColor" />
												</svg>
											</button>
										{/if}
										<input type="text" bind:value={editCarte[ci].categorie} class="input-h3" />
									</div>
									<button
										class="btn btn-danger-ghost btn-sm"
										onclick={() => removeCarteCategory(ci)}>Supprimer</button
									>
								</div>
								{#if cat.note !== undefined}
									<input
										type="text"
										bind:value={editCarte[ci].note}
										class="input-note"
										placeholder="Note..."
									/>
								{/if}

								<DragList
									items={editCarte[ci].items}
									onreorder={(r) => {
										editCarte[ci].items = r;
									}}
								>
									{#snippet row({ item, index: ii })}
										<div class="carte-row">
											<div class="carte-fields">
												<input
													type="text"
													bind:value={editCarte[ci].items[ii].nom}
													placeholder="Nom"
												/>
												<input
													type="text"
													bind:value={editCarte[ci].items[ii].desc}
													placeholder="Description"
													class="text-muted"
												/>
												<input
													type="text"
													bind:value={editCarte[ci].items[ii].prix}
													placeholder="Prix"
													class="mono carte-prix"
												/>
											</div>
											<button
												class="btn-icon btn-icon-danger"
												onclick={() => removeCarteItem(ci, ii)}
												aria-label="Supprimer l'item"
											>
												<svg
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													width="14"
													height="14"><path d="M18 6L6 18M6 6l12 12" /></svg
												>
											</button>
										</div>
									{/snippet}
								</DragList>
								<button
									class="btn btn-ghost btn-sm"
									style="margin-top: 0.5rem;"
									onclick={() => addCarteItem(ci)}>+ Item</button
								>
							</div>
						{/if}
					{/each}
					{#if carteFilter !== 'all'}
						<p class="drag-filter-hint">Passez en vue "Tout" pour réordonner les catégories.</p>
					{/if}
					<button class="btn btn-ghost full" onclick={addCarteCategory}
						>+ Ajouter une catégorie</button
					>

					<!-- ── HERO ── -->
				{:else if activeTab === 'hero'}
					<div class="panel">
						<div class="panel-head">
							<h3>Image Hero</h3>
							<p>Image principale affichée en haut de la page d'accueil.</p>
						</div>
						<div class="grid-2">
							<label class="field full">
								<span>URL de l'image</span>
								<input type="url" bind:value={editHeroImage} />
							</label>
							<label class="field full">
								<span>Description (alt)</span>
								<input type="text" bind:value={editHeroAlt} />
							</label>
						</div>
						{#if editHeroImage}
							<div class="img-preview mt-16 hero-ratio">
								<img src={editHeroImage} alt={editHeroAlt} />
							</div>
						{/if}
					</div>

					<!-- ── GALERIE ── -->
				{:else if activeTab === 'galerie'}
					<div class="panel">
						<div class="panel-head">
							<h3>Galerie</h3>
							<p>Upload d'images disponible prochainement. Modifiez les textes et la visibilité.</p>
						</div>
						<div class="gal-grid">
							{#each editGalerie as img, i}
								<div
									class="gal-card"
									class:gal-hidden={img.visible === false}
									class:panel-dragging={panelDragIndex === i}
									class:panel-drag-over={panelDragOver === i && panelDragIndex !== i}
									role="listitem"
									draggable="true"
									ondragstart={(e) => panelDragStart(e, i)}
									ondragover={(e) => panelDragOverFn(e, i)}
									ondrop={(e) => panelDrop(e, i, editGalerie, (r) => (editGalerie = r))}
									ondragend={panelDragEndFn}
								>
									<div class="gal-thumb">
										<img src={img.src} alt={img.alt} />
										<button
											class="gal-eye"
											onclick={() =>
												(editGalerie[i].visible = editGalerie[i].visible === false ? true : false)}
										>
											{#if img.visible === false}
												<svg
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													width="16"
													height="16"
													><path
														d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
													/><line x1="1" y1="1" x2="23" y2="23" /></svg
												>
											{:else}
												<svg
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													width="16"
													height="16"
													><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
														cx="12"
														cy="12"
														r="3"
													/></svg
												>
											{/if}
										</button>
									</div>
									<div class="gal-fields">
										<input type="text" bind:value={editGalerie[i].alt} placeholder="Alt" />
										<input type="text" bind:value={editGalerie[i].label} placeholder="Label" />
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- ── RÉSEAUX SOCIAUX ── -->
				{:else if activeTab === 'socials'}
					<div class="panel">
						<div class="panel-head">
							<h3>Réseaux sociaux</h3>
							<p>
								Gérez vos liens vers les réseaux sociaux. Désactivez un réseau pour le masquer du
								site.
							</p>
						</div>

						{#each editSocials as social, i}
							<div class="sub-row">
								<div class="sub-row-fields" style="flex: 1;">
									<div class="grid-2" style="width: 100%;">
										<label class="field">
											<span>Identifiant</span>
											<select bind:value={editSocials[i].id}>
												<option value="facebook">Facebook</option>
												<option value="instagram">Instagram</option>
												<option value="tiktok">TikTok</option>
												<option value="tripadvisor">TripAdvisor</option>
												<option value="nouveau">Autre</option>
											</select>
										</label>
										<label class="field">
											<span>Label affiché</span>
											<input type="text" bind:value={editSocials[i].label} />
										</label>
										<label class="field full">
											<span>URL</span>
											<input
												type="url"
												bind:value={editSocials[i].url}
												placeholder="https://..."
												class="mono"
											/>
										</label>
									</div>
									<div class="toggle-row" style="margin-top: 0.5rem;">
										<label class="toggle">
											<input type="checkbox" bind:checked={editSocials[i].actif} />
											<span class="toggle-track"><span class="toggle-thumb"></span></span>
										</label>
										<span class="toggle-label">{editSocials[i].actif ? 'Actif' : 'Masqué'}</span>
									</div>
								</div>
								<button
									class="btn-icon btn-icon-danger"
									onclick={() => removeSocial(i)}
									aria-label="Supprimer le réseau"
								>
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										width="14"
										height="14"><path d="M18 6L6 18M6 6l12 12" /></svg
									>
								</button>
							</div>
							{#if i < editSocials.length - 1}
								<div class="separator"></div>
							{/if}
						{/each}
						<button class="btn btn-ghost full" style="margin-top: 1rem;" onclick={addSocial}
							>+ Ajouter un réseau</button
						>
					</div>

					<!-- ── ALERTE ── -->
				{:else if activeTab === 'alerte'}
					<div class="panel">
						<div class="panel-head">
							<h3>Alerte temporaire</h3>
							<p>
								Bandeau affiché sur le site pour informer les clients d'une fermeture ou d'une info
								importante.
							</p>
						</div>
						<div class="toggle-row">
							<label class="toggle">
								<input type="checkbox" bind:checked={editAlerteOuverture.actif} />
								<span class="toggle-track"><span class="toggle-thumb"></span></span>
							</label>
							<span class="toggle-label"
								>{editAlerteOuverture.actif ? 'Bandeau visible' : 'Masqué'}</span
							>
							<span
								class="badge"
								class:badge-on={editAlerteOuverture.actif}
								class:badge-off={!editAlerteOuverture.actif}
							>
								{editAlerteOuverture.actif ? 'Actif' : 'Désactivé'}
							</span>
						</div>
						<div class="separator"></div>
						<label class="field">
							<span>Message</span>
							<input
								type="text"
								bind:value={editAlerteOuverture.message}
								placeholder="ex: Fermé du 15 au 22 août — bonnes vacances !"
							/>
						</label>
					</div>

					<div class="panel">
						<div class="panel-head">
							<h3>Fermetures exceptionnelles</h3>
							<p>
								Jours de fermeture ponctuels (jours fériés, vacances…). Utilisés par le widget de
								statut.
							</p>
						</div>
						<DragList items={editFermetures} onreorder={(r) => (editFermetures = r)}>
							{#snippet row({ item: f, index: i })}
								<div class="sub-row">
									<div class="sub-row-fields" style="flex: 1;">
										<div class="grid-2" style="width: 100%;">
											<label class="field">
												<span>Date</span>
												<input type="date" bind:value={editFermetures[i].date} class="mono" />
											</label>
											<label class="field">
												<span>Motif</span>
												<input
													type="text"
													bind:value={editFermetures[i].motif}
													placeholder="ex: Noël"
												/>
											</label>
										</div>
									</div>
									<button
										class="btn-icon btn-icon-danger"
										onclick={() => removeFermeture(i)}
										aria-label="Supprimer"
									>
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											width="14"
											height="14"><path d="M18 6L6 18M6 6l12 12" /></svg
										>
									</button>
								</div>
								{#if i < editFermetures.length - 1}<div class="separator"></div>{/if}
							{/snippet}
						</DragList>
						<button class="btn btn-ghost full" style="margin-top: 1rem;" onclick={addFermeture}
							>+ Ajouter une fermeture</button
						>
					</div>

					<!-- ── ÉVÈNEMENTS ── -->
				{:else if activeTab === 'evenements'}
					<DragList items={editEvenements} onreorder={(r) => (editEvenements = r)}>
						{#snippet row({ item: ev, index: i })}
							<div
								class="panel"
								class:panel-dragging={panelDragIndex === i}
								class:panel-drag-over={panelDragOver === i && panelDragIndex !== i}
							>
								<div class="panel-head row-between">
									<h3>{ev.titre || 'Nouvel évènement'}</h3>
									<button class="btn btn-danger-ghost btn-sm" onclick={() => removeEvenement(i)}
										>Supprimer</button
									>
								</div>
								<div class="toggle-row">
									<label class="toggle">
										<input type="checkbox" bind:checked={editEvenements[i].actif} />
										<span class="toggle-track"><span class="toggle-thumb"></span></span>
									</label>
									<span class="toggle-label">{editEvenements[i].actif ? 'Visible' : 'Masqué'}</span>
									<span
										class="badge"
										class:badge-on={editEvenements[i].actif}
										class:badge-off={!editEvenements[i].actif}
									>
										{editEvenements[i].actif ? 'Actif' : 'Désactivé'}
									</span>
								</div>
								<div class="separator"></div>
								<div class="grid-2">
									<label class="field">
										<span>Titre</span>
										<input type="text" bind:value={editEvenements[i].titre} />
									</label>
									<label class="field">
										<span>Date</span>
										<input type="date" bind:value={editEvenements[i].date} class="mono" />
									</label>
									<label class="field full">
										<span>Description</span>
										<textarea bind:value={editEvenements[i].description} rows="3"></textarea>
									</label>
								</div>
							</div>
						{/snippet}
					</DragList>
					<button class="btn btn-ghost full" onclick={addEvenement}>+ Ajouter un évènement</button>

					<!-- ── CTA ── -->
				{:else if activeTab === 'cta'}
					<div class="panel">
						<div class="panel-head">
							<h3>Réservation</h3>
							<p>Bouton principal affiché sur l'accueil et dans la navigation.</p>
						</div>
						<div class="grid-2">
							<label class="field">
								<span>Label du bouton</span>
								<input type="text" bind:value={editCta.reservation.label} />
							</label>
							<label class="field">
								<span>Méthode</span>
								<select bind:value={editCta.reservation.methode}>
									<option value="url">Lien externe (TheFork, Resengo…)</option>
									<option value="tel">Téléphone</option>
									<option value="email">Email</option>
								</select>
							</label>
							<label class="field full">
								<span>URL / valeur</span>
								<input
									type="text"
									bind:value={editCta.reservation.url}
									placeholder="https://... ou +32... ou email@..."
									class="mono"
								/>
							</label>
						</div>
					</div>

					<div class="panel">
						<div class="panel-head">
							<h3>Commande en ligne</h3>
							<p>Activer si click & collect ou livraison disponibles.</p>
						</div>
						<div class="toggle-row">
							<label class="toggle">
								<input type="checkbox" bind:checked={editCta.commande.actif} />
								<span class="toggle-track"><span class="toggle-thumb"></span></span>
							</label>
							<span class="toggle-label">{editCta.commande.actif ? 'Actif' : 'Désactivé'}</span>
							<span
								class="badge"
								class:badge-on={editCta.commande.actif}
								class:badge-off={!editCta.commande.actif}
							>
								{editCta.commande.actif ? 'Visible' : 'Masqué'}
							</span>
						</div>
						{#if editCta.commande.actif}
							<div class="separator"></div>
							<div class="grid-2">
								<label class="field">
									<span>Label du bouton</span>
									<input type="text" bind:value={editCta.commande.label} />
								</label>
								<label class="field">
									<span>URL</span>
									<input
										type="url"
										bind:value={editCta.commande.url}
										placeholder="https://..."
										class="mono"
									/>
								</label>
							</div>
						{/if}
					</div>

					<!-- ── SEO ── -->
				{:else if activeTab === 'seo'}
					<div class="panel">
						<div class="panel-head">
							<h3>SEO — Métadonnées</h3>
							<p>
								Ces informations sont utilisées par Google, Facebook, Twitter et les applications de
								messagerie.
							</p>
						</div>
						<div class="grid-2">
							<label class="field full">
								<span>Titre par défaut</span>
								<input type="text" bind:value={editSeo.titleDefault} />
							</label>
							<label class="field full">
								<span>Description</span>
								<textarea bind:value={editSeo.description} rows="3"></textarea>
							</label>
							<label class="field full">
								<span>URL image Open Graph (1200×630)</span>
								<input
									type="url"
									bind:value={editSeo.ogImage}
									placeholder="https://..."
									class="mono"
								/>
							</label>
							<label class="field">
								<span>Locale</span>
								<input type="text" bind:value={editSeo.locale} class="mono" placeholder="fr_BE" />
							</label>
							<label class="field">
								<span>Twitter/X handle</span>
								<input
									type="text"
									bind:value={editSeo.twitterHandle}
									placeholder="@..."
									class="mono"
								/>
							</label>
						</div>
						{#if editSeo.ogImage}
							<div class="img-preview mt-16">
								<img src={editSeo.ogImage} alt="Open Graph preview" />
							</div>
						{/if}

						<div class="separator"></div>
						<div class="field-label">Mots-clés</div>
						<div class="tag-list">
							{#each editSeo.keywords as kw, ki}
								<div class="tag-item">
									<input type="text" bind:value={editSeo.keywords[ki]} />
									<button
										class="btn-icon btn-icon-danger"
										onclick={() => editSeo.keywords.splice(ki, 1)}
										aria-label="Supprimer"
									>
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											width="12"
											height="12"><path d="M18 6L6 18M6 6l12 12" /></svg
										>
									</button>
								</div>
							{/each}
						</div>
						<button
							class="btn btn-ghost btn-sm"
							style="margin-top: 0.5rem;"
							onclick={() => editSeo.keywords.push('')}>+ Mot-clé</button
						>
					</div>

					<!-- ── SCHEMA ── -->
				{:else if activeTab === 'schema'}
					<div class="panel">
						<div class="panel-head">
							<h3>Données structurées (rich snippets)</h3>
							<p>
								Informations transmises à Google pour les résultats enrichis (étoiles, menu,
								réservation…).
							</p>
						</div>
						<div class="grid-2">
							<label class="field">
								<span>Fourchette de prix</span>
								<select bind:value={editSchema.priceRange}>
									<option value="€">€ — Bon marché</option>
									<option value="€€">€€ — Moyen</option>
									<option value="€€€">€€€ — Haut de gamme</option>
									<option value="€€€€">€€€€ — Luxe</option>
								</select>
							</label>
							<label class="field">
								<span>Devises acceptées</span>
								<input type="text" bind:value={editSchema.currenciesAccepted} class="mono" />
							</label>
							<label class="field full">
								<span>URL de la carte / menu</span>
								<input type="text" bind:value={editSchema.hasMenu} class="mono" />
							</label>
						</div>

						<div class="separator"></div>
						<div class="field-label">Cuisines servies</div>
						<div class="tag-list">
							{#each editSchema.servesCuisine as c, ci}
								<div class="tag-item">
									<input type="text" bind:value={editSchema.servesCuisine[ci]} />
									<button
										class="btn-icon btn-icon-danger"
										onclick={() => editSchema.servesCuisine.splice(ci, 1)}
										aria-label="Supprimer"
									>
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											width="12"
											height="12"><path d="M18 6L6 18M6 6l12 12" /></svg
										>
									</button>
								</div>
							{/each}
						</div>
						<button
							class="btn btn-ghost btn-sm"
							style="margin-top: 0.5rem;"
							onclick={() => editSchema.servesCuisine.push('')}>+ Cuisine</button
						>

						<div class="separator"></div>
						<div class="field-label">Moyens de paiement</div>
						<div class="tag-list">
							{#each editSchema.paymentAccepted as p, pi}
								<div class="tag-item">
									<input type="text" bind:value={editSchema.paymentAccepted[pi]} />
									<button
										class="btn-icon btn-icon-danger"
										onclick={() => editSchema.paymentAccepted.splice(pi, 1)}
										aria-label="Supprimer"
									>
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											width="12"
											height="12"><path d="M18 6L6 18M6 6l12 12" /></svg
										>
									</button>
								</div>
							{/each}
						</div>
						<button
							class="btn btn-ghost btn-sm"
							style="margin-top: 0.5rem;"
							onclick={() => editSchema.paymentAccepted.push('')}>+ Paiement</button
						>

						<div class="separator"></div>
						<div class="toggle-row mt-16">
							<label class="toggle">
								<input type="checkbox" bind:checked={editSchema.acceptsReservations} />
								<span class="toggle-track"><span class="toggle-thumb"></span></span>
							</label>
							<span class="toggle-label">Accepte les réservations (Google)</span>
						</div>
					</div>

					<!-- ── AVIS ── -->
				{:else if activeTab === 'avis'}
					<div class="panel">
						<div class="panel-head">
							<h3>Avis Google</h3>
							<p>Les avis sont récupérés automatiquement. Filtrez par note minimale.</p>
						</div>
						<div class="grid-2">
							<label class="field">
								<span>Note minimale affichée</span>
								<select bind:value={avisMinStars}>
									<option value={1}>1 et plus</option>
									<option value={2}>2 et plus</option>
									<option value={3}>3 et plus</option>
									<option value={4}>4 et plus</option>
									<option value={5}>5 uniquement</option>
								</select>
							</label>
						</div>

						<div class="separator"></div>

						<div class="field-label">
							{avis.filter((a) => a.note >= avisMinStars).length} avis affichés sur {avis.length}
						</div>
						<div class="avis-list">
							{#each avis.filter((a) => a.note >= avisMinStars) as a}
								<div class="avis-row">
									<div class="avis-meta">
										<strong>{a.auteur}</strong>
										<span class="avis-stars">{'★'.repeat(a.note)}{'☆'.repeat(5 - a.note)}</span>
										<span class="text-muted">{a.date}</span>
									</div>
									<p class="text-muted">{a.texte}</p>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	/* ══════ LOGIN ══════ */
	a {
		color: var(--accent);
		text-decoration: underline;
	}
	a.no-effect {
		text-decoration: none;
	}
	.login-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}
	.login-card {
		background: var(--bg-1);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: 2rem;
		width: 100%;
		max-width: 380px;
	}
	.login-head {
		text-align: center;
		margin-bottom: 1.5rem;
	}
	.login-logo {
		color: var(--text-2);
		margin-bottom: 1rem;
	}
	.login-head h1 {
		font-size: 1.15rem;
		font-weight: 600;
		margin: 0 0 0.25rem;
	}
	.login-head p {
		font-size: 0.82rem;
		color: var(--text-2);
		margin: 0;
	}
	.login-card form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.login-sub {
		text-align: center;
		font-size: 0.72rem;
		color: var(--text-2);
		margin: 1rem 0 0;
	}
	.field-error {
		background: var(--danger-muted);
		border: 1px solid rgba(239, 68, 68, 0.3);
		color: #fca5a5;
		padding: 0.5rem 0.65rem;
		border-radius: var(--radius);
		font-size: 0.82rem;
	}

	/* ══════ FIELDS ══════ */
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.field span,
	.field-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--text-1);
		letter-spacing: 0.02em;
	}
	input,
	textarea,
	select {
		background: var(--bg-2);
		border: 1px solid transparent;
		border-radius: var(--radius);
		padding: 0.5rem 0.625rem;
		color: var(--text-0);
		font-size: 0.82rem;
		font-family: inherit;
		outline: none;
		width: 100%;
		transition: border-color 0.15s;
	}
	input:hover,
	textarea:hover,
	select:hover {
		border-color: var(--border);
	}
	input:focus,
	textarea:focus,
	select:focus {
		border-color: var(--accent);
	}
	input:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	input:disabled:hover {
		border-color: transparent;
	}
	textarea {
		resize: vertical;
	}
	select {
		cursor: pointer;
	}
	.mono {
		font-family: var(--f-mono);
		font-size: 0.8rem;
	}
	.text-muted {
		color: var(--text-1);
	}
	.input-bold {
		font-weight: 600;
		background: transparent;
		border-color: transparent;
		padding: 0.35rem 0.5rem;
	}
	.input-bold:hover {
		border-color: var(--border);
	}
	.input-bold:focus {
		border-color: var(--accent);
		background: var(--bg-2);
	}
	.input-h3 {
		font-size: 0.92rem;
		font-weight: 600;
		background: transparent;
		border-color: transparent;
		padding: 0.3rem 0.4rem;
	}
	.input-h3:hover {
		border-color: var(--border);
	}
	.input-h3:focus {
		border-color: var(--accent);
		background: var(--bg-2);
	}
	.input-note {
		font-size: 0.8rem;
		font-style: italic;
		color: var(--text-1);
		background: transparent;
		border-color: transparent;
		padding: 0.3rem 0.4rem;
		margin-bottom: 0.5rem;
	}
	.input-note:hover {
		border-color: var(--border);
	}
	.input-note:focus {
		border-color: var(--accent);
		background: var(--bg-2);
	}

	/* ══════ BUTTONS ══════ */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		border: none;
		border-radius: var(--radius);
		padding: 0.5rem 0.875rem;
		font-size: 0.82rem;
		font-weight: 500;
		font-family: inherit;
		cursor: pointer;
		transition:
			background 0.15s,
			border-color 0.15s,
			opacity 0.15s;
		white-space: nowrap;
	}
	.btn-accent {
		background: var(--accent);
		color: #fff;
	}
	.btn-accent:hover {
		background: var(--accent-hover);
	}
	.btn-ghost {
		background: transparent;
		color: var(--text-1);
		border: 1px dashed var(--border);
	}
	.btn-ghost:hover {
		border-color: var(--accent);
		color: var(--text-0);
	}
	.btn-danger-ghost {
		background: transparent;
		color: var(--danger);
		border: 1px solid transparent;
	}
	.btn-danger-ghost:hover {
		background: var(--danger-muted);
	}
	.btn-sm {
		padding: 0.3rem 0.6rem;
		font-size: 0.78rem;
	}
	.full {
		width: 100%;
	}

	.btn-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		color: var(--text-2);
		padding: 0.3rem;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition:
			color 0.15s,
			background 0.15s;
		flex-shrink: 0;
	}
	.btn-icon-danger:hover {
		color: var(--danger);
		background: var(--danger-muted);
	}

	/* ══════ DASHBOARD LAYOUT ══════ */
	.dash {
		display: grid;
		grid-template-columns: 220px 1fr;
		min-height: 100vh;
	}

	/* Sidebar */
	.sidebar {
		background: var(--bg-1);
		border-right: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		height: 100vh;
		overflow-y: auto;
		z-index: 30;
	}
	.sb-head {
		padding: 16px;
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--text-0);
	}
	.sb-title {
		font-weight: 600;
		font-size: 0.88rem;
	}
	.sb-client {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0 16px 12px;
		font-size: 0.78rem;
		color: var(--text-1);
	}
	.sb-client-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--success);
		flex-shrink: 0;
	}
	.sb-nav {
		flex: 1;
		padding: 0 8px;
	}
	.sb-group {
		margin-bottom: 4px;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}
	.sb-group-label {
		font-size: 0.68rem;
		font-weight: 600;
		color: var(--text-2);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 12px 8px 4px;
	}
	.sb-item {
		display: block;
		width: 100%;
		text-align: left;
		padding: 6px 8px;
		border: none;
		background: transparent;
		color: var(--text-1);
		font-size: 0.82rem;
		font-family: inherit;
		border-radius: var(--radius);
		cursor: pointer;
		transition:
			background 0.1s,
			color 0.1s;
	}
	.sb-item:hover {
		background: var(--bg-2);
		color: var(--text-0);
	}
	.sb-item.active {
		background: var(--accent-muted);
		color: var(--accent);
		font-weight: 500;
	}
	.sb-foot {
		padding: 8px;
		border-top: 1px solid var(--border-subtle);
	}
	.sb-logout:hover {
		color: var(--danger);
	}

	/* Main */
	.main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
	}
	.topbar {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 20px;
		border-bottom: 1px solid var(--border-subtle);
		background: var(--bg-0);
		position: sticky;
		top: 0;
		z-index: 20;
	}
	.topbar h2 {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 600;
		flex: 1;
	}
	.topbar-right {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.hamburger {
		display: none;
		flex-direction: column;
		gap: 4px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
	}
	.hamburger span {
		display: block;
		width: 18px;
		height: 2px;
		background: var(--text-1);
		border-radius: 1px;
	}

	/* Toast */
	.toast {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background: var(--bg-1);
		border: 1px solid var(--border);
		color: var(--success);
		padding: 10px 16px;
		border-radius: var(--radius);
		font-size: 0.82rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 8px;
		z-index: 100;
		animation: toast-in 0.2s ease-out;
	}
	@keyframes toast-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.content {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 900px;
	}

	/* ══════ PANELS ══════ */
	.panel {
		background: var(--bg-1);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		padding: 20px;
		transition:
			opacity 0.15s,
			outline 0.1s,
			background 0.1s;
	}
	.panel.panel-dragging {
		opacity: 0.4;
		cursor: grabbing;
	}
	.panel.panel-drag-over {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
		background: color-mix(in srgb, var(--bg-1) 90%, var(--accent));
	}
	.panel-head {
		margin-bottom: 16px;
	}
	.panel-head h3 {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 600;
	}
	.panel-head p {
		margin: 4px 0 0;
		font-size: 0.78rem;
		color: var(--text-2);
	}
	.row-between {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	/* drag handle in panel header */
	.row-drag-title {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.row-drag-title h3 {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 600;
	}
	.panel-drag-handle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: var(--radius-sm);
		color: var(--text-2);
		cursor: grab;
		flex-shrink: 0;
		background: transparent;
		border: none;
		padding: 0;
		transition:
			color 0.1s,
			background 0.1s;
	}
	.panel-drag-handle:hover {
		color: var(--text-1);
		background: var(--bg-2);
	}
	/* gal-card drag states reuse panel-dragging / panel-drag-over */
	.gal-card.panel-dragging {
		opacity: 0.4;
	}
	.gal-card.panel-drag-over {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	.grid-2 .full {
		grid-column: 1 / -1;
	}
	.mt-16 {
		margin-top: 16px;
	}
	.separator {
		height: 1px;
		background: var(--border-subtle);
		margin: 16px 0;
	}

	/* ══════ TOGGLE ══════ */
	.toggle-row {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0.5rem 0;
	}
	.toggle {
		position: relative;
		display: inline-block;
		width: 36px;
		height: 20px;
		flex-shrink: 0;
	}
	.toggle input {
		opacity: 0;
		width: 0;
		height: 0;
		position: absolute;
	}
	.toggle-track {
		position: absolute;
		inset: 0;
		background: var(--bg-2);
		border: 1px solid var(--border);
		border-radius: 999px;
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s;
	}
	.toggle-thumb {
		position: absolute;
		width: 14px;
		height: 14px;
		background: var(--text-2);
		border-radius: 50%;
		top: 2px;
		left: 2px;
		transition:
			transform 0.2s,
			background 0.2s;
	}
	.toggle input:checked + .toggle-track {
		background: var(--accent);
		border-color: var(--accent);
	}
	.toggle input:checked + .toggle-track .toggle-thumb {
		transform: translateX(16px);
		background: #fff;
	}
	.toggle-label {
		font-size: 0.82rem;
		font-weight: 500;
	}
	.badge {
		font-size: 0.7rem;
		font-weight: 500;
		padding: 2px 8px;
		border-radius: 999px;
	}
	.badge-on {
		background: var(--success-muted);
		color: var(--success);
	}
	.badge-off {
		background: var(--bg-2);
		color: var(--text-2);
	}

	/* ══════ TABLE ══════ */
	.table-wrap {
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th {
		text-align: left;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--text-2);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 6px 8px;
		border-bottom: 1px solid var(--border-subtle);
	}
	td {
		padding: 4px 8px;
		border-bottom: 1px solid rgba(46, 46, 51, 0.5);
	}
	.cell-label {
		font-weight: 500;
		white-space: nowrap;
		width: 110px;
		font-size: 0.82rem;
	}
	td input {
		background: transparent;
		border-color: transparent;
		padding: 4px 6px;
	}
	td input:hover {
		border-color: var(--border);
	}
	td input:focus {
		border-color: var(--accent);
		background: var(--bg-2);
	}

	/* ══════ SUB-ROWS (menus) ══════ */
	.sub-row {
		display: flex;
		gap: 8px;
		align-items: flex-start;
		padding: 8px;
		border-radius: var(--radius);
		margin-bottom: 4px;
		border: 1px solid var(--border-subtle);
		background: var(--bg-0);
	}
	.sub-row-fields {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	/* ══════ CARTE ══════ */
	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin-bottom: 4px;
	}
	.chip {
		background: var(--bg-1);
		border: 1px solid var(--border-subtle);
		color: var(--text-1);
		padding: 4px 10px;
		border-radius: 999px;
		font-size: 0.75rem;
		font-family: inherit;
		cursor: pointer;
		transition: all 0.15s;
	}
	.chip:hover {
		border-color: var(--border);
		color: var(--text-0);
	}
	.chip.active {
		background: var(--accent-muted);
		color: var(--accent);
		border-color: transparent;
		font-weight: 500;
	}

	/* DragList wraps carte items — keep bottom margin */
	:global(.carte-drag-wrap) {
		margin-bottom: 8px;
	}
	.carte-row {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 4px 4px 4px 0;
		border-radius: var(--radius-sm);
	}
	.drag-filter-hint {
		font-size: 0.76rem;
		color: var(--text-2);
		text-align: center;
		padding: 4px 0;
		margin: 0;
	}
	.carte-fields {
		display: grid;
		grid-template-columns: 1.5fr 2fr 90px;
		gap: 4px;
		flex: 1;
	}
	.carte-prix {
		text-align: right;
	}

	/* ══════ LAYOUT PREVIEWS ══════ */
	.layout-grid {
		display: flex;
		gap: 8px;
		margin-top: 8px;
	}
	.layout-opt {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 8px;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius);
		background: var(--bg-0);
		cursor: pointer;
		font-family: inherit;
		font-size: 0.72rem;
		color: var(--text-2);
		transition:
			border-color 0.15s,
			color 0.15s;
		min-width: 110px;
	}
	.layout-opt:hover {
		border-color: var(--border);
	}
	.layout-opt.selected {
		border-color: var(--accent);
		color: var(--accent);
	}

	.layout-thumb {
		width: 90px;
		height: 52px;
		border-radius: 3px;
		overflow: hidden;
		background: var(--bg-2);
		position: relative;
	}
	.lt-img {
		background: var(--border);
		position: absolute;
	}
	.lt-txt {
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.lt-line {
		height: 2px;
		background: var(--text-2);
		border-radius: 1px;
		width: 24px;
	}
	.lt-line.sm {
		width: 16px;
	}
	.lt-immersive .lt-img {
		inset: 0;
	}
	.lt-immersive .lt-txt {
		bottom: 6px;
		left: 50%;
		transform: translateX(-50%);
		align-items: center;
	}
	.lt-classic .lt-img {
		top: 4px;
		bottom: 4px;
		left: 4px;
		width: 36px;
		border-radius: 2px;
	}
	.lt-classic .lt-txt {
		top: 10px;
		right: 6px;
	}
	.lt-editorial .lt-img {
		top: 0;
		left: 0;
		right: 0;
		height: 24px;
	}
	.lt-editorial .lt-txt {
		bottom: 5px;
		left: 6px;
	}

	/* ── Flip picker ── */
	.flip-grid {
		display: flex;
		gap: 8px;
		margin-top: 8px;
	}
	.flip-opt {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 8px;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius);
		background: var(--bg-0);
		cursor: pointer;
		font-family: inherit;
		font-size: 0.72rem;
		color: var(--text-2);
		transition:
			border-color 0.15s,
			color 0.15s;
		min-width: 110px;
	}
	.flip-opt:hover {
		border-color: var(--border);
	}
	.flip-opt.selected {
		border-color: var(--accent);
		color: var(--accent);
	}
	.flip-thumb {
		width: 90px;
		height: 52px;
		border-radius: 3px;
		overflow: hidden;
		background: var(--bg-2);
		display: flex;
		gap: 4px;
		padding: 4px;
	}
	.flip-img {
		background: var(--border);
		border-radius: 2px;
		flex: 0 0 36px;
	}
	.flip-txt {
		flex: 1;
		background: var(--bg-1);
		border-radius: 2px;
	}

	/* ══════ GALLERY ══════ */
	.gal-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 12px;
	}
	.gal-card {
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius);
		overflow: hidden;
		transition: opacity 0.2s;
	}
	.gal-card.gal-hidden {
		opacity: 0.35;
	}
	.gal-thumb {
		position: relative;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background: var(--bg-2);
	}
	.gal-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.gal-eye {
		position: absolute;
		top: 6px;
		right: 6px;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(4px);
		border: none;
		border-radius: var(--radius-sm);
		padding: 4px;
		cursor: pointer;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.gal-fields {
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.gal-fields input {
		font-size: 0.78rem;
		padding: 4px 6px;
	}

	/* ══════ IMAGE PREVIEW ══════ */
	.img-preview {
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid var(--border-subtle);
	}
	.img-preview img {
		width: 100%;
		display: block;
		object-fit: cover;
	}
	.hero-ratio {
		max-height: 220px;
	}
	.hero-ratio img {
		height: 220px;
	}

	/* ══════ AVIS ══════ */
	/* ── tag list (SEO keywords, cuisines, paiements) ── */
	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.tag-item {
		display: flex;
		align-items: center;
		gap: 4px;
		background: var(--bg-2);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 2px 6px 2px 8px;
	}
	.tag-item input {
		border: none;
		background: transparent;
		width: 120px;
		font-size: 0.8rem;
		color: var(--text-1);
		padding: 2px 0;
	}
	.tag-item input:focus {
		outline: none;
	}

	.avis-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-top: 8px;
	}
	.avis-row {
		padding: 10px;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius);
	}
	.avis-meta {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 4px;
		font-size: 0.82rem;
	}
	.avis-stars {
		color: #eab308;
		font-size: 0.78rem;
	}
	.avis-row p {
		margin: 0;
		font-size: 0.8rem;
		line-height: 1.5;
	}

	/* ══════ RESPONSIVE ══════ */
	.sidebar-overlay {
		display: none;
	}

	@media (max-width: 768px) {
		.dash {
			grid-template-columns: 1fr;
		}
		.sidebar {
			position: fixed;
			left: -260px;
			top: 0;
			width: 260px;
			height: 100vh;
			transition: left 0.2s ease;
			z-index: 40;
		}
		.dash.sidebar-open .sidebar {
			left: 0;
		}
		.sidebar-overlay {
			display: block;
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.5);
			z-index: 35;
		}
		.hamburger {
			display: flex;
		}
		.grid-2 {
			grid-template-columns: 1fr;
		}
		.carte-fields {
			grid-template-columns: 1fr;
		}
		.content {
			padding: 12px;
		}
	}
</style>
