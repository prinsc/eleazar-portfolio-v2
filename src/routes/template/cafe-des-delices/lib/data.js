// Données du template Café des Délices — toutes les infos textuelles centralisées.
// Le client remplacera les URLs Unsplash par ses propres photos plus tard.

export const infos = {
	nom: 'Le Café des Délices',
	ville: 'Ath',
	pays: 'Belgique',
	adresse: 'Grand Place d\u2019Ath',
	adresseComplete: 'Grand Place, 7800 Ath, Belgique',
	email: 'info@lecafedesdelices-ath.com',
	telephone: '+32 68 00 00 00', // placeholder — à remplacer
	fonde: '—'
};

export const horaires = [
	{ j: 'Lundi', h: '10h00 — 22h00' },
	{ j: 'Mardi', h: '10h00 — 22h00' },
	{ j: 'Mercredi', h: '10h00 — 22h00' },
	{ j: 'Jeudi', h: '09h00 — 22h00' },
	{ j: 'Vendredi', h: '10h00 — 22h00' },
	{ j: 'Samedi', h: '10h00 — 22h00' },
	{ j: 'Dimanche', h: '10h00 — 22h00' }
];

export const cuisine = {
	midi: '12h00 — 14h30',
	soir: '18h00 — 22h00'
};

// Les deux menus repris du site existant
export const menus = [
	{
		num: '01',
		nom: 'Menu Délices',
		prix: '38',
		sections: [
			{
				titre: 'Entrée',
				choix: 'Duo de croquettes de fromage — ou — Pâté maison sur toast'
			},
			{
				titre: 'Plat',
				choix:
					'Burger Délice — ou — Tagliatelles sauce roquefort et éclats de noix — ou — Macaroni au gratin'
			},
			{
				titre: 'Dessert',
				choix: 'Dame Blanche — ou — Dame Noire'
			}
		]
	},
	{
		num: '02',
		nom: 'Menu Grand Délices',
		prix: '48',
		sections: [
			{
				titre: 'Entrée',
				choix:
					'Carpaccio de bœuf Holstein fumé — ou — Foie gras, confit d\u2019oignon aux fruits rouges'
			},
			{
				titre: 'Plat',
				choix: 'Tagliata de bœuf — ou — Pâtes aux scampis — ou — Burger au choix'
			},
			{
				titre: 'Dessert',
				choix: 'Mousse au chocolat — ou — Coupe Dame Blanche — ou — Gourmand'
			}
		]
	}
];

// Les deux pôles narratifs du lieu
export const poles = [
	{
		num: '01',
		sur: 'Délices',
		titre: 'Grillés',
		texte:
			'Spécialistes de la grillade authentique. Des viandes sélectionnées avec soin, travaillées à la flamme, servies sans chichi. Un burger qui tient debout, une tagliata qui fond, une terrasse qui prolonge l\u2019été. C\u2019est ici.',
		cta: { label: 'Voir la carte', href: '/template/cafe-des-delices/menu' },
		// À remplacer par la vraie photo du client
		img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1400&q=80'
	},
	{
		num: '02',
		sur: 'Moments',
		titre: 'Maltés',
		texte:
			'Une sélection de bières belges d\u2019exception. Des classiques incontournables aux pépites artisanales, chaque verre raconte un terroir. Installez-vous en terrasse, sur la Grand Place, et prenez le temps.',
		cta: { label: 'Notre sélection', href: '/template/cafe-des-delices/menu' },
		// À remplacer par la vraie photo du client
		img: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=1400&q=80'
	}
];

// Galerie ambiance
export const galerie = [
	{
		src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80',
		alt: 'Grillade au feu de bois',
		label: 'Au grill'
	},
	{
		src: 'https://images.unsplash.com/photo-1555658636-6e4a36218be7?w=1200&q=80',
		alt: 'Bière belge en terrasse',
		label: 'À la pression'
	},
	{
		src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
		alt: 'Salle du restaurant',
		label: 'En salle'
	},
	{
		src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200&q=80',
		alt: 'Terrasse ensoleillée',
		label: 'Sur la place'
	}
];

// Image hero principale
export const heroImage =
	// À remplacer par la vraie photo du client
	'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1800&q=85';
