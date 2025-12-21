<script>
	// ----------------------------
	// FORMULAIRE PRINCIPAL
	// ----------------------------

	let form = {
		numero: '',
		date: new Date().toISOString().slice(0, 10),

		fournisseur_nom: 'Eléazar Klyuvitkin',
		fournisseur_tva: '',
		fournisseur_adresse: '',

		client_nom: '',
		client_tva: '',
		client_adresse: '',

		items: [{ description: '', qte: 1, prix: 0 }]
	};

	let xml = '';
	let loading = false;

	// ----------------------------
	// GESTION DES LIGNES
	// ----------------------------

	function addItem() {
		form.items.push({ description: '', qte: 1, prix: 0 });
	}

	function removeItem(i) {
		form.items.splice(i, 1);
	}

	// ----------------------------
	// CALCUL AUTOMATIQUE
	// ----------------------------

	$: sousTotal = form.items.reduce((sum, item) => sum + item.qte * item.prix, 0);

	// franchise TVA → aucun taux
	$: total = sousTotal;

	// ----------------------------
	// GENERATION + EXPORT
	// ----------------------------

	async function generate() {
		loading = true;
		const res = await fetch('/fr/work', {
			method: 'POST',
			body: JSON.stringify(form)
		});
		xml = await res.text();
		loading = false;
	}

	function downloadXML() {
		const blob = new Blob([xml], { type: 'application/xml' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `facture-${form.numero}.xml`;
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<main>
	<h1>Créer une facture (XML UBL)</h1>

	<div class="grid">
		<div>
			<label>Numéro</label>
			<input bind:value={form.numero} />
		</div>
		<div>
			<label>Date</label>
			<input type="date" bind:value={form.date} />
		</div>
	</div>

	<h3>Fournisseur</h3>
	<input placeholder="Nom" bind:value={form.fournisseur_nom} />
	<input placeholder="TVA (BExxxxxxxx)" bind:value={form.fournisseur_tva} />
	<input placeholder="Adresse" bind:value={form.fournisseur_adresse} />

	<h3>Client</h3>
	<input placeholder="Nom entreprise" bind:value={form.client_nom} />
	<input placeholder="TVA" bind:value={form.client_tva} />
	<input placeholder="Adresse" bind:value={form.client_adresse} />

	<h3>Éléments de la facture</h3>

	{#each form.items as item, i}
		<div class="item">
			<textarea rows="2" placeholder="Description" bind:value={item.description}></textarea>

			<div class="grid">
				<div>
					<label>Quantité</label>
					<input type="number" bind:value={item.qte} min="1" />
				</div>
				<div>
					<label>Prix HTVA (€)</label>
					<input type="number" step="0.01" bind:value={item.prix} />
				</div>
			</div>

			<button class="remove" on:click={() => removeItem(i)} disabled={form.items.length === 1}>
				Supprimer
			</button>
		</div>
	{/each}

	<button class="add" on:click={addItem}>+ Ajouter une ligne</button>

	<h3>Récapitulatif</h3>
	<p>Sous-total : <strong>{sousTotal.toFixed(2)} €</strong></p>
	<p>Total (Franchise TVA) : <strong>{total.toFixed(2)} €</strong></p>

	<button on:click={generate} disabled={loading}>
		{loading ? 'Génération...' : 'Générer XML'}
	</button>

	{#if xml}
		<h2>XML généré</h2>
		<button on:click={downloadXML}>📄 Télécharger XML</button>
		<pre>{xml}</pre>
	{/if}
</main>

<style>
	main {
		max-width: 680px;
		margin: 50px auto;
		padding: 20px;
		font-family: system-ui, sans-serif;
	}
	label {
		font-size: 0.9rem;
		color: #333;
	}
	input,
	textarea {
		border: 1px solid #ccc;
		padding: 8px;
		font-size: 0.95rem;
		border-radius: 4px;
		width: 100%;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	button {
		margin-top: 15px;
		padding: 10px 18px;
		border: 1px solid #000;
		background: #000;
		color: #fff;
		font-size: 1rem;
		cursor: pointer;
	}
	button.add {
		background: #333;
	}
	button.remove {
		background: #900;
		border-color: #900;
	}
	.item {
		margin-bottom: 25px;
		padding: 15px;
		border: 1px solid #ddd;
		border-radius: 6px;
	}
	pre {
		margin-top: 20px;
		padding: 20px;
		background: #f5f5f5;
		border-radius: 6px;
		white-space: pre-wrap;
	}
</style>
