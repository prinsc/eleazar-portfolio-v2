<script>
	import { settings } from '$lib/stores/settings.js';
	import { onMount } from 'svelte';

	let {
		title = 'Eléazar Klyuvitkin - Développeur Web Freelance Ath',
		description = 'Développeur web et designer freelance basé à Mainvault (Ath). Création de sites internet, boutiques Shopify, design graphique et formation. Services pour le Hainaut.',
		robots = 'index, follow',
		locale = 'fr_BE',
		imageUrl = 'https://kltk.be/assets/img/banner_meta.png',
		siteName = 'Eléazar Klyuvitkin',
		twitterCardType = 'summary_large_image',
		canonical = '',
		schema = null,
		type = 'website'
	} = $props();

	const urlMain = 'https://kltk.be';

	const jsonld = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': `${urlMain}/#organization`,
		name: 'Eléazar Klyuvitkin - Services Web & Design',
		url: urlMain,
		logo: `${urlMain}/favicon.svg`,
		image: imageUrl,
		description:
			'Développeur web freelance et designer graphique à Ath, spécialisé en création de sites internet, e-commerce Shopify et identité visuelle pour le Hainaut.',
		founder: {
			'@type': 'Person',
			name: 'Eléazar Klyuvitkin',
			jobTitle: 'Développeur Web Freelance & Designer',
			email: 'eleazar@kltk.be'
		},
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Mainvault',
			addressRegion: 'Hainaut',
			postalCode: '7812',
			addressCountry: 'BE'
		},
		areaServed: {
			'@type': 'Place',
			name: 'Hainaut occidental',
			geo: {
				'@type': 'GeoCircle',
				geoMidpoint: {
					'@type': 'GeoCoordinates',
					latitude: 50.628,
					longitude: 3.778
				},
				geoRadius: '30000'
			}
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 50.628,
			longitude: 3.778
		},
		priceRange: '€€',
		telephone: '+32',
		sameAs: [
			'https://github.com/prinsc',
			'https://www.linkedin.com/in/eléazar-k-235246243',
			'https://www.behance.net/prinss'
		],
		serviceType: [
			'Développement Web',
			'Design Graphique',
			'E-commerce Shopify',
			'Formation Web',
			'Assistance Technique'
		]
	};

	// Normaliser title et description
	$effect(() => {
		title = title.length > 60 ? title.slice(0, 60) + '...' : title;
		description = description.length > 160 ? description.slice(0, 157) + '...' : description;
	});

	onMount(async () => {
		if (typeof window !== 'undefined') {
			// Récupérer l'URL actuelle
			const currentUrl = new URL(window.location.href);
			canonical = currentUrl.href;

			// Ajouter ou mettre à jour la balise rel="canonical"
			let canonicalLink = document.querySelector('link[rel="canonical"]');
			if (!canonicalLink) {
				canonicalLink = document.createElement('link');
				canonicalLink.rel = 'canonical';
				document.head.appendChild(canonicalLink);
			}
			canonicalLink.href = canonical;
		}

		// Injecter le schema principal
		const scriptJsonld = document.createElement('script');
		scriptJsonld.type = 'application/ld+json';
		scriptJsonld.text = JSON.stringify(jsonld);
		document.head.appendChild(scriptJsonld);

		// Gérer schema personnalisé (objet ou tableau)
		const scriptElements = [];

		if (schema) {
			if (Array.isArray(schema)) {
				schema.forEach((s) => {
					const script = document.createElement('script');
					script.type = 'application/ld+json';
					script.text = JSON.stringify(s);
					document.head.appendChild(script);
					scriptElements.push(script);
				});
			} else {
				const script = document.createElement('script');
				script.type = 'application/ld+json';
				script.text = JSON.stringify(schema);
				document.head.appendChild(script);
				scriptElements.push(script);
			}
		}

		// Nettoyage pour navigation client-side
		return () => {
			if (scriptJsonld.parentNode) {
				document.head.removeChild(scriptJsonld);
			}
			scriptElements.forEach((script) => {
				if (script.parentNode) {
					document.head.removeChild(script);
				}
			});
		};
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content={robots} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:locale" content={locale} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{siteName} - Banner" />
	<meta property="og:site_name" content={siteName} />

	<!-- Twitter -->
	<meta name="twitter:card" content={twitterCardType} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content="{siteName} - Banner" />
	<meta name="twitter:url" content={canonical} />
	<meta name="twitter:domain" content="kltk.be" />

	<!-- Géolocalisation Belgique - Ath -->
	<meta name="geo.region" content="BE-WHT" />
	<meta name="geo.placename" content="Ath" />
	<meta name="geo.position" content="50.628;3.778" />
	<meta name="ICBM" content="50.628, 3.778" />

	<!-- Auteur -->
	<meta name="author" content="Eléazar Klyuvitkin, eleazar@kltk.be" />
	<meta name="designer" content="Eléazar Klyuvitkin, eleazar@kltk.be" />
	<meta name="MobileOptimized" content="360" />
	<meta name="application-name" content={siteName} />

	<!-- Favicons -->
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="icon" href="/favicon.ico" type="image/x-icon" />

	<!-- Theme -->
	<meta name="apple-mobile-web-app-title" content={siteName} />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	{#if $settings.theme === 'dark'}
		<meta name="theme-color" content="#000000" />
	{:else}
		<meta name="theme-color" content="#ffffff" />
	{/if}
</svelte:head>
