<script>
	import { onMount } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public';

	let mapContainer;
	let map;

	// GeoJSON du Hainaut occidental (coordonnées approximatives)
	const hainautGeoJSON = {
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				properties: {
					name: 'Hainaut Occidental'
				},
				geometry: {
					type: 'Polygon',
					coordinates: [
						[
							[3.15, 50.35], // Sud-Ouest
							[3.15, 50.75], // Nord-Ouest
							[3.95, 50.75], // Nord-Est
							[3.95, 50.35], // Sud-Est
							[3.15, 50.35] // Fermeture du polygone
						]
					]
				}
			}
		]
	};

	onMount(() => {
		mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;

		map = new mapboxgl.Map({
			container: mapContainer,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [3.55, 50.55], // Centre du Hainaut occidental
			zoom: 8.5,
			attributionControl: false
		});

		map.addControl(new mapboxgl.AttributionControl({ compact: true }));
		map.addControl(new mapboxgl.NavigationControl(), 'top-right');

		map.on('load', () => {
			// Ajouter la source GeoJSON
			map.addSource('hainaut-source', {
				type: 'geojson',
				data: hainautGeoJSON
			});

			// Layer de remplissage
			map.addLayer({
				id: 'hainaut-fill',
				type: 'fill',
				source: 'hainaut-source',
				paint: {
					'fill-color': '#4CAF50',
					'fill-opacity': 0.2
				}
			});

			// Layer de contour
			map.addLayer({
				id: 'hainaut-outline',
				type: 'line',
				source: 'hainaut-source',
				paint: {
					'line-color': '#2E7D32',
					'line-width': 3
				}
			});

			// Effet hover
			map.on('mouseenter', 'hainaut-fill', () => {
				map.getCanvas().style.cursor = 'pointer';
				map.setPaintProperty('hainaut-fill', 'fill-opacity', 0.35);
			});

			map.on('mouseleave', 'hainaut-fill', () => {
				map.getCanvas().style.cursor = '';
				map.setPaintProperty('hainaut-fill', 'fill-opacity', 0.2);
			});

			// Marqueurs des villes principales
			const cities = [
				{ name: 'Ath', coordinates: [3.7783, 50.6294] },
				{ name: 'Tournai', coordinates: [3.3889, 50.6056] },
				{ name: 'Leuze-en-Hainaut', coordinates: [3.6167, 50.6] },
				{ name: 'Lessines', coordinates: [3.8333, 50.7167] },
				{ name: 'Mouscron', coordinates: [3.2167, 50.75] }
			];

			cities.forEach((city) => {
				const el = document.createElement('div');
				el.className = 'custom-marker';

				new mapboxgl.Marker(el)
					.setLngLat(city.coordinates)
					.setPopup(
						new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
							`<strong>${city.name}</strong>`
						)
					)
					.addTo(map);
			});
		});

		return () => map.remove();
	});
</script>

<div class="map-wrapper">
	<h2>Zone d'intervention</h2>
	<div class="map-container" bind:this={mapContainer}></div>
</div>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	.map-wrapper {
		margin: 3rem 0;

		h2 {
			font-size: 1.5rem;
			font-weight: 600;
			margin-bottom: 1.5rem;
		}

		.map-container {
			width: 100%;
			height: 400px;
			@include borderRadius('small');
			overflow: hidden;
			box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);

			@include breakpoint('small') {
				height: 500px;
			}
		}
	}
</style>
