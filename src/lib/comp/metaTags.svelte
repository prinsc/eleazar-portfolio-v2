<script>
	import { settings } from '$lib/stores/settings.js';
	import { page } from '$app/stores';

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
		type = 'website',
		availableLocales = ['fr', 'en', 'ru'],
		defaultLocale = 'fr'
	} = $props();

	const urlMain = 'https://kltk.be';

	// Canonical SSR-safe : calculé depuis $page.url
	const canonicalUrl = $derived.by(() => {
		if (canonical) return canonical;
		if (!$page?.url) return urlMain;
		return `${urlMain}${$page.url.pathname}`;
	});

	// Hreflang : remplace le segment /fr/, /en/, /ru/ par chaque locale
	const hreflangLinks = $derived.by(() => {
		if (!$page?.url) return [];
		const pathname = $page.url.pathname;
		const langPattern = /^\/(fr|en|ru)(\/|$)/;

		return availableLocales.map((lang) => {
			const altPath = langPattern.test(pathname)
				? pathname.replace(langPattern, `/${lang}$2`)
				: `/${lang}${pathname}`;
			return { lang, href: `${urlMain}${altPath}` };
		});
	});

	const xDefaultHref = $derived.by(() => {
		if (!$page?.url) return urlMain;
		const pathname = $page.url.pathname;
		const langPattern = /^\/(fr|en|ru)(\/|$)/;
		const path = langPattern.test(pathname)
			? pathname.replace(langPattern, `/${defaultLocale}$2`)
			: `/${defaultLocale}${pathname}`;
		return `${urlMain}${path}`;
	});

	// Title/description tronqués (sans muter les props)
	const safeTitle = $derived(title.length > 60 ? title.slice(0, 60) + '...' : title);
	const safeDescription = $derived(
		description.length > 160 ? description.slice(0, 157) + '...' : description
	);

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
			streetAddress: 'Route de Frasnes 180',
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
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Services Web & Design',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Développement Web',
						description: 'Création de sites web sur mesure et applications web'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Design Graphique',
						description: "Création d'identité visuelle et design graphique"
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'E-commerce Shopify',
						description: 'Développement de boutiques en ligne Shopify'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Formation Web',
						description: 'Formation aux technologies web et outils digitaux'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Assistance Technique',
						description: 'Support technique et maintenance web'
					}
				}
			]
		}
	};

	// Échappement minimal pour injection sûre via {@html}
	const escapeJsonLd = (obj) =>
		JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');

	const jsonldHtml = $derived(escapeJsonLd(jsonld));
	const customSchemaHtml = $derived.by(() => {
		if (!schema) return [];
		return (Array.isArray(schema) ? schema : [schema]).map(escapeJsonLd);
	});
</script>

<svelte:head>
	<title>{safeTitle}</title>
	<meta name="description" content={safeDescription} />
	<meta name="robots" content={robots} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Hreflang : variantes linguistiques (SSR) -->
	{#each hreflangLinks as { lang, href }}
		<link rel="alternate" {href} hreflang={lang} />
	{/each}
	<link rel="alternate" href={xDefaultHref} hreflang="x-default" />

	<!-- Open Graph -->
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={safeTitle} />
	<meta property="og:description" content={safeDescription} />
	<meta property="og:type" content={type} />
	<meta property="og:locale" content={locale} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{siteName} - Banner" />
	<meta property="og:site_name" content={siteName} />

	<!-- Twitter -->
	<meta name="twitter:card" content={twitterCardType} />
	<meta name="twitter:title" content={safeTitle} />
	<meta name="twitter:description" content={safeDescription} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content="{siteName} - Banner" />
	<meta name="twitter:url" content={canonicalUrl} />
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

	<!-- Theme -->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	{#if $settings.theme === 'dark'}
		<meta name="theme-color" content="#000000" />
	{:else}
		<meta name="theme-color" content="#ffffff" />
	{/if}

	<!-- JSON-LD principal (SSR) -->
	{@html `<script type="application/ld+json">${jsonldHtml}</script>`}

	<!-- JSON-LD additionnel (SSR) -->
	{#each customSchemaHtml as s}
		{@html `<script type="application/ld+json">${s}</script>`}
	{/each}
</svelte:head>
