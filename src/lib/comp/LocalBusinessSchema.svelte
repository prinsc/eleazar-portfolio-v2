<script>
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';

	// Données structurées LocalBusiness pour le SEO local
	const localBusinessData = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: 'KLTK - Eléazar Klyuvitkin',
		alternateName: 'KLTK Services',
		description:
			'Développeur web freelance et prestataire de services techniques à Ath (Hainaut). Sites web sur mesure, design graphique, e-commerce Shopify, assistance informatique, électricité et électroménager.',
		image: 'https://kltk.be/assets/img/profile.webp',
		'@id': 'https://kltk.be',
		url: 'https://kltk.be',
		telephone: '+32-485-70-07-37', // À remplacer par ton vrai numéro
		email: 'eleazar@kltk.be',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '', // Tu peux laisser vide si tu ne veux pas afficher ton adresse exacte
			addressLocality: 'Mainvault',
			postalCode: '7812',
			addressRegion: 'Hainaut',
			addressCountry: 'BE'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 50.596,
			longitude: 3.458
		},
		areaServed: [
			{
				'@type': 'City',
				name: 'Ath'
			},
			{
				'@type': 'City',
				name: 'Tournai'
			},
			{
				'@type': 'City',
				name: 'Leuze-en-Hainaut'
			},
			{
				'@type': 'City',
				name: 'Lessines'
			},
			{
				'@type': 'City',
				name: 'Frasnes-lez-Anvaing'
			},
			{
				'@type': 'City',
				name: 'Ellezelles'
			},
			{
				'@type': 'City',
				name: 'Beloeil'
			},
			{
				'@type': 'City',
				name: 'Enghien'
			},
			{
				'@type': 'City',
				name: 'Silly'
			},
			{
				'@type': 'City',
				name: 'Chièvres'
			}
		],
		priceRange: '€€',
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '09:00',
				closes: '18:00'
			}
		],
		sameAs: [
			'https://www.linkedin.com/in/eléazar-k-235246243/',
			'https://github.com/prinsc',
			'https://www.behance.net/prinss'
		],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Services KLTK',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Développement Web sur Mesure',
						description:
							'Création de sites web modernes et performants avec SvelteKit, design responsive et optimisation SEO',
						areaServed: 'Hainaut occidental, Belgique'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Design Graphique & Identité Visuelle',
						description:
							'Création de logos, chartes graphiques et supports de communication pour entreprises',
						areaServed: 'Hainaut occidental, Belgique'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Boutique en Ligne Shopify',
						description:
							'Installation et personnalisation de boutiques e-commerce Shopify clé en main',
						areaServed: 'Hainaut occidental, Belgique'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Assistance Technique Informatique',
						description:
							'Dépannage PC, réparation ordinateurs, installation Windows et logiciels à domicile',
						areaServed: 'Ath, Tournai, Leuze-en-Hainaut et environs'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Installation Électroménager',
						description:
							'Installation et réparation de machine à laver, lave-vaisselle, réfrigérateur et tout électroménager',
						areaServed: 'Hainaut occidental, Belgique'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Services Électricité',
						description:
							'Dépannage électrique, installation prises et interrupteurs, schémas unifilaires RGIE',
						areaServed: 'Ath, Tournai et Hainaut occidental'
					}
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Installation Caméras de Surveillance',
						description:
							'Installation de systèmes de vidéosurveillance IP et filaires pour particuliers et commerces',
						areaServed: 'Hainaut occidental, Belgique'
					}
				}
			]
		}
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(localBusinessData)}<\/script>`}
</svelte:head>
