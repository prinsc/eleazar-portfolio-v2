<script>
	import { onMount } from 'svelte';
	import Status from './Status.svelte';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

	let { horairesAPI = null, infos = null, cuisine = null } = $props();

	// Normalise la réponse API vers le format { j, h }[]
	// L'API retourne typiquement un objet par jour ou un tableau — on gère les deux
	function normaliseHoraires(raw) {
		if (!raw) return null;

		if (Array.isArray(raw)) {
			// Format API : { j, ferme, periodes: [{ debut, fin }] }
			if (raw[0]?.periodes !== undefined) {
				return raw.map((r) => ({
					j: r.j,
					ferme: r.ferme ?? false,
					h: r.ferme ? 'Fermé' : r.periodes.map((p) => `${p.debut} – ${p.fin}`).join(' / ')
				}));
			}

			// Format déjà normalisé : { j, h }
			if (raw[0]?.h !== undefined) return raw;

			// Format intermédiaire : { jour/day, heures/hours }
			return raw.map((r) => ({
				j: r.j ?? r.jour ?? r.day ?? '',
				ferme: false,
				h: r.h ?? r.heures ?? r.hours ?? ''
			}));
		}

		// Format objet : { lundi: '...', mardi: '...' }
		return Object.entries(raw).map(([k, v]) => ({
			j: k,
			ferme: false,
			h: v
		}));
	}

	const horaires = $derived(normaliseHoraires(horairesAPI) ?? []);

	let mapContainer;
	let mapLoaded = $state(false);

	onMount(async () => {
		const mapboxgl = (await import('mapbox-gl')).default;
		await import('mapbox-gl/dist/mapbox-gl.css');

		mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;

		// Coordinates: Grand Place d'Ath, Belgium
		const athCoords = [3.776396, 50.630975];
		// mapbox://styles/eleazarkltk/cmnditln3001901sd6avp4jyj
		const map = new mapboxgl.Map({
			container: mapContainer,
			// Warm monochrome style matching the cafe's cream/slate palette
			style: {
				version: 8,
				name: 'Cafe des Delices',
				sources: {
					'osm-tiles': {
						type: 'raster',
						tiles: [
							'https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/{z}/{x}/{y}?access_token=' +
								PUBLIC_MAPBOX_TOKEN
						],
						tileSize: 256
					}
				},
				layers: [
					{
						id: 'osm-tiles',
						type: 'raster',
						source: 'osm-tiles'
					}
				]
			},
			center: athCoords,
			zoom: 15.5,
			attributionControl: false,
			scrollZoom: false,
			interactive: true,
			pitch: 0
		});

		map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
		map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-left');

		// Custom marker element
		const markerEl = document.createElement('div');
		markerEl.innerHTML = `
			<div style="
				width: 40px; height: 40px;
				background: #c2471e;
				border: 3px solid #f1ead8;
				border-radius: 50%;
				box-shadow: 0 2px 12px rgba(194,71,30,0.45), 0 0 0 6px rgba(194,71,30,0.15);
				position: relative;
				cursor: pointer;
			">
				<div style="
					position: absolute; top: 50%; left: 50%;
					transform: translate(-50%, -50%);
					width: 10px; height: 10px;
					background: #f1ead8;
					border-radius: 50%;
				"></div>
			</div>
		`;

		const popup = new mapboxgl.Popup({
			offset: 28,
			closeButton: false,
			className: 'cdd-popup'
		}).setHTML(`
			<strong style="font-family: 'Fraunces', serif; font-size: 14px; color: #14100d;">
				Le Cafe des Delices
			</strong>
			<br/>
			<span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; color: #3a332c;">
				Grand Place 8, 7800 Ath
			</span>
		`);

		new mapboxgl.Marker({ element: markerEl }).setLngLat(athCoords).setPopup(popup).addTo(map);

		map.on('load', () => {
			mapLoaded = true;
		});

		return () => map.remove();
	});
</script>

<section class="visite" id="visite">
	<span class="visite__num">05 - Nous trouver</span>

	<div class="visite__grid">
		<div class="col col--intro">
			<h2 class="visite__title">
				Poussez<br />
				<em>la porte,</em><br />
				nous sommes<br />
				là.
			</h2>
			<p class="addr">
				{infos?.nom ?? ''}<br />
				{infos?.adresse ?? ''}<br />
				{infos?.ville ?? ''}{infos?.pays ? `, ${infos.pays}` : ''}
			</p>
			<div class="contact">
				{#if infos?.email}<a href="mailto:{infos.email}">{infos.email}</a>{/if}
				{#if infos?.telephone}<a href="tel:{infos.telephone}">{infos.telephone}</a>{/if}
			</div>
		</div>

		<div class="col col--hours">
			<Status />
			<span class="label">Horaires du lieu</span>
			<ul class="hours">
				{#each horaires as h}
					<li class:is-closed={h.ferme}>
						<span>{h.j}</span>
						<span class="dots" aria-hidden="true"></span>
						<span>{h.h}</span>
					</li>
				{/each}
			</ul>

			{#if cuisine?.midi || cuisine?.soir}
			<div class="kitchen">
				<span class="label">Service en cuisine</span>
				<p>
					{#if cuisine?.midi}Midi · <strong>{cuisine.midi}</strong><br />{/if}
					{#if cuisine?.soir}Soir · <strong>{cuisine.soir}</strong>{/if}
				</p>
			</div>
			{/if}
		</div>

		<div class="col col--map">
			<div class="map" bind:this={mapContainer} class:map--loaded={mapLoaded}>
				{#if !mapLoaded}
					<div class="map__placeholder">
						<svg
							viewBox="0 0 24 24"
							width="32"
							height="32"
							fill="none"
							stroke="currentColor"
							stroke-width="1"
							opacity="0.4"
						>
							<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
							<circle cx="12" cy="9" r="2.5" />
						</svg>
					</div>
				{/if}
			</div>
			<span class="map__cap">{infos?.adresse ?? ''}{infos?.ville ? ` - ${infos.ville}` : ''}</span>

			<a class="reserv" href="/template/cafe-des-delices/reservation">
				<span>Réserver une table</span>
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

<style lang="scss">
	@use './styles/mixins' as *;

	.visite {
		padding: 5rem 1.25rem;
		border-top: 1px solid var(--rule);
		position: relative;

		@include breakpoint('medium') {
			padding: 7rem 2rem;
		}
	}
	.visite__num {
		position: absolute;
		top: 1.25rem;
		left: 1.25rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);

		@include breakpoint('medium') {
			top: 2rem;
			left: 2rem;
		}
	}
	.visite__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		max-width: 1400px;
		margin: 0 auto;
		align-items: start;

		@include breakpoint('large') {
			grid-template-columns: 1.3fr 1fr 1.2fr;
			gap: 4rem;
		}
	}
	.visite__title {
		margin: 0 0 2rem;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.2rem, 5vw, 4.5rem);
		line-height: 0.95;
		letter-spacing: -0.025em;
	}
	.visite__title em {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember);
	}
	.addr {
		font-family: var(--f-display);
		font-size: 1.05rem;
		line-height: 1.55;
		color: var(--slate);
		margin: 0 0 1.25rem;
	}
	.contact {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
	}
	.contact a {
		color: var(--slate);
		text-decoration: none;
		border-bottom: 1px solid var(--slate);
		padding-bottom: 0.25em;
		align-self: flex-start;
		transition:
			color 0.3s ease,
			border-color 0.3s ease;
	}
	.contact a:hover {
		color: var(--ember);
		border-color: var(--ember);
	}

	.label {
		display: block;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin: 0.6rem 0;
	}
	.hours {
		list-style: none;
		margin: 0 0 2rem;
		padding: 0;
		border-top: 1px solid var(--rule);
	}
	.hours li.is-closed {
		opacity: 0.4;
	}
	.hours li {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.75rem;
		align-items: center;
		padding: 0.85rem 0;
		border-bottom: 1px solid var(--rule);
		font-family: var(--f-display);
		font-size: 0.95rem;
	}
	.hours .dots {
		height: 1px;
		background-image: linear-gradient(to right, var(--rule) 50%, transparent 0%);
		background-size: 5px 1px;
		background-repeat: repeat-x;
	}
	.kitchen p {
		margin: 0;
		font-family: var(--f-display);
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--slate);
	}
	.kitchen strong {
		font-family: var(--f-display);
		font-weight: 600;
		color: var(--ember);
	}

	.map {
		width: 100%;
		aspect-ratio: 1;
		border: 1px solid var(--slate);
		color: var(--slate);
		background: var(--cream-deep);
		position: relative;
		overflow: hidden;
	}
	.map--loaded {
		border-color: var(--rule);
	}
	.map__placeholder {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--slate-soft);
	}
	/* Style the Mapbox popup to match the cafe aesthetic */
	.map :global(.mapboxgl-popup-content) {
		background: var(--cream);
		border: 1px solid var(--rule);
		border-radius: 0;
		padding: 0.9rem 1.1rem;
		box-shadow: 0 4px 20px rgba(20, 16, 13, 0.12);
	}
	.map :global(.mapboxgl-popup-tip) {
		border-top-color: var(--cream);
	}
	.map :global(.mapboxgl-ctrl-group) {
		border-radius: 0;
		border: 1px solid var(--rule);
		box-shadow: none;
	}
	.map :global(.mapboxgl-ctrl-group button) {
		width: 32px;
		height: 32px;
	}
	.map__cap {
		display: block;
		margin-top: 0.75rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}
	.reserv {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		margin-top: 1.5rem;
		padding: 0.9em 1.4em;
		border: 1px solid var(--slate);
		border-radius: 999px;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate);
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.reserv:hover {
		background: var(--ember);
		border-color: var(--ember);
		color: var(--cream);
	}

	.col--hours {
		padding-top: 1rem;

		@include breakpoint('large') {
			padding-top: 0.5rem;
		}
	}
</style>
