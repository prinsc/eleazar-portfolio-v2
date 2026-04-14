<script>
	import { onMount, onDestroy } from 'svelte';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

	let mapEl = $state(null);
	let count = $state('Chargement...');
	let mapInstance = null;
	let geojsonData = null;

	// Filtres
	let cutoffDate = $state('2026-01-01');
	let showBlue = $state(true);
	let showYellow = $state(true);
	let showRed = $state(true);

	const COLORS = {
		blue: '#7c83fd',
		yellow: '#f39c12',
		red: '#e74c3c'
	};

	function getColor(props) {
		const raw = props.urls;
		if (!raw || raw === '—') return 'red';

		let urls = raw;
		if (typeof raw === 'string') {
			try {
				urls = JSON.parse(raw);
			} catch {
				return 'red';
			}
		}

		if (!Array.isArray(urls) || urls.length === 0) return 'red';
		return urls.some((u) => u.type === 'website') ? 'blue' : 'yellow';
	}

	function passesFilter(props) {
		const raw = props.creation_datetime;
		if (!raw) return false;
		const cutoff = new Date(cutoffDate + 'T00:00:00');
		return new Date(raw) > cutoff;
	}

	function isColorVisible(colorKey) {
		if (colorKey === 'blue') return showBlue;
		if (colorKey === 'yellow') return showYellow;
		if (colorKey === 'red') return showRed;
		return true;
	}

	function buildPopupHTML(props) {
		const SKIP_KEYS = ['geo_point_2d', 'geo_shape', 'title', 'subtitle', 'urls'];
		const title = props.title ?? '—';
		const subtitle = props.subtitle ?? '';

		let urlsHtml = '<span style="color:#666">Aucune URL</span>';
		const raw = props.urls;

		if (raw && raw !== '—') {
			let urls = raw;
			if (typeof raw === 'string') {
				try {
					urls = JSON.parse(raw);
				} catch {
					urls = [];
				}
			}
			if (Array.isArray(urls) && urls.length > 0) {
				urlsHtml = urls
					.map((u) => {
						const color = u.type === 'website' ? '#7c83fd' : '#f39c12';
						const label = u.type ?? 'lien';
						return `<a href="${u.url}" target="_blank"
            style="display:inline-block; margin:3px 4px 3px 0; padding:4px 10px;
                   background:${color}22; border:1px solid ${color}88;
                   color:${color}; border-radius:20px; font-size:0.78rem;
                   text-decoration:none; font-weight:600;">
            🔗 ${label} ↗
          </a>`;
					})
					.join('');
			}
		}

		const rows = Object.entries(props)
			.filter(([k]) => !SKIP_KEYS.includes(k))
			.map(([k, v]) => {
				let display = v ?? '—';
				if (typeof display === 'string' && display.startsWith('http')) {
					display = `<a href="${display}" target="_blank" style="color:#7c83fd">${display}</a>`;
				}
				return `<tr><td>${k}</td><td>${display}</td></tr>`;
			})
			.join('');

		return `
      <div style="padding:10px 4px 6px;">
        <div style="font-size:1rem; font-weight:700; color:#fff; margin-bottom:2px;">${title}</div>
        <div style="font-size:0.82rem; color:#a0a0b0;">${subtitle}</div>
      </div>
      <div style=" border:1px solid #2e3150;
                  border-radius:8px; padding:10px; margin:8px 0;">
        <div style="font-size:0.72rem; color:#7c83fd; font-weight:700;
                    text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px;">
          🌐 Sites web & liens
        </div>
        ${urlsHtml}
      </div>
      <table style="width:100%; border-collapse:collapse; font-size:0.8rem;">${rows}</table>
    `;
	}

	function rebuildSource() {
		if (!mapInstance || !geojsonData || !mapInstance.isStyleLoaded()) return;

		const filtered = {
			type: 'FeatureCollection',
			features: geojsonData.features
				.filter((f) => {
					const colorKey = getColor(f.properties);
					return passesFilter(f.properties) && isColorVisible(colorKey);
				})
				.map((f) => ({
					...f,
					properties: {
						...f.properties,
						_color: COLORS[getColor(f.properties)],
						_popup: buildPopupHTML(f.properties)
					}
				}))
		};

		count = `${filtered.features.length.toLocaleString('fr-BE')} points affichés`;

		const source = mapInstance.getSource('contacts');
		if (source) {
			source.setData(filtered);
		}
	}

	// Reactive: re-render on filter change
	$effect(() => {
		// Track all filter state
		cutoffDate;
		showBlue;
		showYellow;
		showRed;
		rebuildSource();
	});

	onMount(async () => {
		const mapboxgl = (await import('mapbox-gl')).default;
		await import('mapbox-gl/dist/mapbox-gl.css');

		const res = await fetch('/assets/geojson/data.geojson');

		if (!res.ok) {
			console.error('Fetch échoué :', res.status, res.statusText);
			count = 'Erreur chargement données';
			return;
		}

		geojsonData = await res.json();
		console.log('GeoJSON chargé :', geojsonData?.features?.length, 'features');

		if (!geojsonData?.features) {
			count = 'Données invalides';
			return;
		}

		mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;

		mapInstance = new mapboxgl.Map({
			container: mapEl,
			style: 'mapbox://styles/mapbox/dark-v11',
			center: [4.5, 50.5],
			zoom: 7
		});

		mapInstance.on('load', async () => {
			try {
				const filtered = {
					type: 'FeatureCollection',
					features: geojsonData.features
						.filter((f) => {
							const colorKey = getColor(f.properties);
							return passesFilter(f.properties) && isColorVisible(colorKey);
						})
						.map((f) => ({
							...f,
							properties: {
								...f.properties,
								_color: COLORS[getColor(f.properties)],
								_popup: buildPopupHTML(f.properties)
							}
						}))
				};

				count = `${filtered.features.length.toLocaleString('fr-BE')} points affichés`;

				mapInstance.addSource('contacts', {
					type: 'geojson',
					data: filtered
				});

				mapInstance.addLayer({
					id: 'contacts-points',
					type: 'circle',
					source: 'contacts',
					paint: {
						'circle-radius': 6,
						'circle-color': ['get', '_color'],
						'circle-stroke-color': '#fff',
						'circle-stroke-width': 1,
						'circle-opacity': 0.75
					}
				});

				// Popup au clic
				mapInstance.on('click', 'contacts-points', (e) => {
					const props = e.features[0].properties;
					const coordinates = e.features[0].geometry.coordinates.slice();

					new mapboxgl.Popup({ maxWidth: '420px' })
						.setLngLat(coordinates)
						.setHTML(props._popup)
						.addTo(mapInstance);
				});

				// Curseur pointer au survol
				mapInstance.on('mouseenter', 'contacts-points', () => {
					mapInstance.getCanvas().style.cursor = 'pointer';
				});
				mapInstance.on('mouseleave', 'contacts-points', () => {
					mapInstance.getCanvas().style.cursor = '';
				});
			} catch (err) {
				console.error(err);
				count = 'Erreur : ' + err.message;
			}
		});
	});

	onDestroy(() => {
		mapInstance?.remove();
	});
</script>

<div id="wrapper">
	<div id="header">
		<h1>Contacts Wallonie</h1>
		<div id="controls">
			<label for="cutoff">Depuis le :</label>
			<input type="date" id="cutoff" bind:value={cutoffDate} />
		</div>
		<div id="status">
			<span id="count-badge">{count}</span>
		</div>
		<div class="legend">
			<button
				class="legend-btn"
				class:off={!showBlue}
				style="--c: {COLORS.blue}"
				onclick={() => (showBlue = !showBlue)}
			>
				<span class="dot">●</span> Website présent
			</button>
			<button
				class="legend-btn"
				class:off={!showYellow}
				style="--c: {COLORS.yellow}"
				onclick={() => (showYellow = !showYellow)}
			>
				<span class="dot">●</span> Autre URL
			</button>
			<button
				class="legend-btn"
				class:off={!showRed}
				style="--c: {COLORS.red}"
				onclick={() => (showRed = !showRed)}
			>
				<span class="dot">●</span> Aucune URL
			</button>
		</div>
	</div>
	<div id="map" bind:this={mapEl}></div>
</div>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Segoe UI', sans-serif;
		background: #0f1117;
		color: #e0e0e0;
		height: 100vh;
		overflow: hidden;
	}

	#wrapper {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	#header {
		background: #1a1d2e;
		padding: 10px 20px;
		display: flex;
		align-items: center;
		gap: 20px;
		border-bottom: 1px solid #2e3150;
		flex-shrink: 0;
		flex-wrap: wrap;
	}

	#header h1 {
		font-size: 1.1rem;
		font-weight: 600;
		color: #7c83fd;
	}

	#controls {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.82rem;
		color: #a0a0b0;
	}

	#controls input[type='date'] {
		background: #0f1117;
		color: #e0e0e0;
		border: 1px solid #2e3150;
		border-radius: 6px;
		padding: 4px 8px;
		font-size: 0.82rem;
		cursor: pointer;
	}

	#controls input[type='date']:focus {
		outline: none;
		border-color: #7c83fd88;
	}

	#status {
		font-size: 0.82rem;
		color: #a0a0b0;
	}

	#count-badge {
		background: #7c83fd22;
		color: #7c83fd;
		border: 1px solid #7c83fd55;
		border-radius: 20px;
		padding: 2px 10px;
		font-size: 0.78rem;
	}

	.legend {
		display: flex;
		gap: 8px;
		font-size: 0.78rem;
		align-items: center;
		margin-left: auto;
	}

	.legend-btn {
		display: flex;
		align-items: center;
		gap: 4px;
		background: none;
		border: 1px solid var(--c);
		border-radius: 20px;
		padding: 3px 10px;
		color: var(--c);
		font-size: 0.78rem;
		cursor: pointer;
		transition: opacity 0.2s;
		user-select: none;
	}

	.legend-btn .dot {
		color: var(--c);
	}

	.legend-btn.off {
		opacity: 0.4;
		text-decoration: line-through;
		border-style: dashed;
	}

	#map {
		flex: 1;
	}

	:global(.mapboxgl-popup-content) {
		background: #1a1d2e !important;
		color: #e0e0e0;
		border: 1px solid #2e3150;
		border-radius: 8px;
		max-height: 400px;
		overflow-y: auto;
		padding: 12px;
	}

	:global(.mapboxgl-popup-tip) {
		border-top-color: #1a1d2e !important;
		border-bottom-color: #1a1d2e !important;
	}
</style>
