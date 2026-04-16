// L'essenti'elles - salon data
// All content centralized here for easy client updates

/**
 * Regroupe les jours consécutifs ayant le même horaire.
 * [{j, h}] → [{label, h}]
 * Ex: Lundi–Vendredi 10h-19h, Samedi 9h-20h, Dimanche Fermé
 */
export function groupHoraires(horaires) {
	if (!horaires?.length) return [];

	const groups = [];
	let current = { jours: [horaires[0].j], h: horaires[0].h };

	for (let i = 1; i < horaires.length; i++) {
		if (horaires[i].h === current.h) {
			current.jours.push(horaires[i].j);
		} else {
			groups.push(current);
			current = { jours: [horaires[i].j], h: horaires[i].h };
		}
	}
	groups.push(current);

	return groups.map(({ jours, h }) => ({
		label: jours.length === 1 ? jours[0] : `${jours[0]} – ${jours[jours.length - 1]}`,
		h
	}));
}

export const salon = {
	name: "L'essenti'elles",
	tagline: "Un espace dédié à la beauté et au bien-être",
	description:
		"Où chaque détail est pensé pour vous sublimer dans un cadre chic et chaleureux. Venez vivre un moment de partage, de découverte et de convivialité.",
	phone: '0492 76 66 95',
	address: {
		street: 'Chaussée de Bruxelles 384',
		city: '7822 Ath',
		country: 'Belgique'
	},
	hours: [
		{ j: 'Lundi', h: '10h – 19h' },
		{ j: 'Mardi', h: '10h – 19h' },
		{ j: 'Mercredi', h: '10h – 19h' },
		{ j: 'Jeudi', h: '10h – 19h' },
		{ j: 'Vendredi', h: '10h – 19h' },
		{ j: 'Samedi', h: '9h – 20h' },
		{ j: 'Dimanche', h: 'Fermé' }
	],
	appointment: 'Uniquement sur rendez-vous'
};

export const nav = [
	{ label: 'Accueil', href: '/template/l-essentielles' },
	{ label: 'Esthétique', href: '/template/l-essentielles/esthetique' },
	{ label: 'Bien-être', href: '/template/l-essentielles/bien-etre' },
	{ label: 'Coiffure', href: '/template/l-essentielles/coiffure' },
	{ label: 'Contact', href: '/template/l-essentielles/contact' }
];

export const services = [
	{
		title: 'Esthétique',
		subtitle: 'Sublimer votre beauté naturelle',
		description:
			'Extensions de cils, manucure, épilation, maquillage… Chaque soin est réalisé avec précision pour révéler votre éclat.',
		href: '/template/l-essentielles/esthetique',
		// client: replace with real salon photo
		image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'
	},
	{
		title: 'Bien-être',
		subtitle: 'Une parenthèse de sérénité',
		description:
			'Head spa, massages, soins du visage… Offrez-vous un moment de détente absolue dans notre espace dédié.',
		href: '/template/l-essentielles/bien-etre',
		// client: replace with real salon photo
		image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'
	},
	{
		title: 'Coiffure',
		subtitle: 'L\'art de sublimer vos cheveux',
		description:
			'Coupes, colorations, balayages, soins capillaires… Nos coiffeuses vous accompagnent pour une chevelure resplendissante.',
		href: '/template/l-essentielles/coiffure',
		// client: replace with real salon photo
		image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80'
	}
];

export const testimonials = [
	{
		text: "Très bonne expérience au salon ! La coiffeuse a parfaitement compris ce que je voulais et m'a donné de très bons conseils. La coupe est exactement comme je l'imaginais. Salon propre, personnel agréable et prix raisonnables. Je recommande vivement !",
		author: 'Florine'
	},
	{
		text: "Je recommande vivement le salon L'Essenti'elles ! Un lieu où l'on se sent immédiatement détendue, accueillie avec douceur et professionnalisme. Les soins sont de grande qualité, réalisés avec attention et bienveillance. Une véritable parenthèse de bien-être.",
		author: 'Sarah'
	},
	{
		text: "Un endroit cosy, élégant où la beauté est un point essentiel. Mes cils sont parfaits et tiennent vraiment bien. Mes ongles de même. Très heureuse d'avoir découvert cet endroit.",
		author: 'Chloé'
	}
];

// - ESTHÉTIQUE -
export const esthetique = {
	title: 'Esthétique',
	sections: [
		{
			title: 'Beauté du regard',
			subsections: [
				{
					title: 'Extensions de cils',
					items: [
						{ name: 'Volume russe', price: '115 €' },
						{ name: 'Volume russe (retouche 3 sem.)', price: '70 €' },
						{ name: 'Volume russe (retouche 2 sem.)', price: '60 €' },
						{ name: 'Cil à cil', price: '90 €' },
						{ name: 'Cil à cil (retouche 3 sem.)', price: '60 €' },
						{ name: 'Cil à cil (retouche 2 sem.)', price: '50 €' },
						{ name: 'Dépose de cils avec soin', price: '20 €' }
					]
				},
				{
					title: 'Réhaussement de cils',
					items: [
						{ name: 'Réhaussement', price: '75 €' },
						{ name: 'Réhaussement avec teinture', price: '80 €' }
					]
				}
			]
		},
		{
			title: 'Manucure',
			subsections: [
				{
					title: 'Beauté des mains',
					items: [
						{ name: 'Pose gel complète', price: '60 €' },
						{ name: 'Remplissage', price: '45 €' },
						{ name: 'Semi-permanent', price: '35 €' },
						{ name: 'Dépose avec soin', price: '20 €' },
						{ name: 'Nail Art', price: 'sur devis' }
					],
					note: 'Si plus de 2 ongles cassés, comptabilisé comme pose complète.'
				},
				{
					title: 'Beauté des pieds',
					items: [
						{ name: 'Pédicure en gel', price: '50 €' },
						{ name: 'Pédicure semi-permanente', price: '35 €' }
					]
				}
			]
		},
		{
			title: 'Épilation & Sourcils',
			subsections: [
				{
					title: 'Épilation à la cire',
					items: [
						{ name: 'Aisselles', price: '10 €' },
						{ name: 'Demi-jambes', price: '15 €' },
						{ name: 'Jambes complètes', price: '25 €' },
						{ name: 'Maillot classique', price: '12 €' },
						{ name: 'Lèvre supérieure', price: '6 €' }
					]
				},
				{
					title: 'Sourcils',
					items: [
						{ name: 'Épilation cire des sourcils', price: '8 €' },
						{ name: 'Épilation pince des sourcils', price: '8 €' },
						{ name: 'Browlift', price: '70 €' },
						{ name: 'Browlift + teinture', price: '80 €' },
						{ name: 'Coloration sourcils + épilation', price: '35 €' }
					]
				}
			]
		},
		{
			title: 'Beauté du sourire',
			subsections: [
				{
					title: 'Blanchiment dentaire',
					items: [
						{ name: '1 séance (±45 min) + 1 à 3 teintes', price: '120 €' },
						{ name: '2 séances intense (±45 min/séance) + 10 teintes', price: '210 €' },
						{ name: 'Forfait duo (2 séances/personne)', price: '190 €/pp' },
						{ name: 'Kit à domicile', price: '150 €' }
					]
				}
			]
		},
		{
			title: 'Mise en beauté',
			subsections: [
				{
					title: 'Maquillage',
					items: [
						{ name: 'Maquillage naturel', detail: 'Effet frais et lumineux', price: '65 €' },
						{
							name: 'Maquillage évènement',
							detail: 'Soirée, anniversaire, shooting…',
							price: '85 €'
						},
						{
							name: 'Maquillage mariée',
							detail: 'Essai + jour J (personnalisé)',
							price: 'sur devis'
						}
					]
				}
			]
		}
	]
};

// - BIEN-ÊTRE -
export const bienEtre = {
	title: 'Bien-être',
	sections: [
		{
			title: 'Soin du visage',
			items: [
				{ name: 'Nettoyage profond avec masque', price: '70 €' },
				{ name: 'Soin éclat express (30 min)', price: '40 €' }
			]
		},
		{
			title: 'Head Spa',
			items: [
				{
					name: 'Éveil',
					detail: 'Nettoyage du cuir chevelu avec massage crânien relaxant et rinçage sensoriel sous pluie d\'eau.',
					duration: '45 min',
					price: '90 €'
				},
				{
					name: 'Sérénité',
					detail: 'Nettoyage en profondeur, gommage, massage nuque/crâne/épaules, soin ciblé avec rinçage sous pluie d\'eau et vapeur douce.',
					duration: '60 min',
					price: '120 €'
				},
				{
					name: 'Harmonie',
					detail: 'Expérience premium avec massage prolongé, traitement et soin global du cuir chevelu. Rinçage sous pluie d\'eau et vapeur douce.',
					duration: '90 min',
					price: '165 €'
				}
			]
		},
		{
			title: 'Massage',
			items: [
				{
					name: 'Instant Précieux',
					detail: 'Une parenthèse de douceur pour relâcher les tensions et s\'offrir un moment rien qu\'à soi.',
					price: '60 €'
				},
				{
					name: 'Massage Harmonie',
					detail: 'Un massage enveloppant et apaisant pour détendre le corps et calmer l\'esprit.',
					price: '80 €'
				},
				{
					name: 'Rituel d\'exception',
					detail: 'Une expérience sensorielle profonde et réconfortante pour une détente absolue et immersive.',
					price: '100 €'
				}
			]
		}
	]
};

// - COIFFURE -
export const coiffure = {
	title: 'Coiffure',
	sections: [
		{
			title: 'Beauté des cheveux',
			items: [
				{ name: 'Shampooing + brushing', price: '30 €' },
				{ name: 'Shampooing + coupe + brushing', price: '65 €' },
				{ name: 'Coulage + brushing', price: 'à partir de 70 €' },
				{ name: 'Coulage + coupe + brushing', price: 'à partir de 85 €' },
				{ name: 'Coloration + brushing', price: 'à partir de 95 €' },
				{ name: 'Coloration + coupe + brushing', price: 'à partir de 115 €' },
				{ name: 'Balayage + brushing', price: 'à partir de 105 €' },
				{ name: 'Balayage + coupe + brushing', price: 'à partir de 120 €' },
				{ name: 'Extensions adhésives', price: 'sur devis' },
				{ name: "Coiffure d'évènement", price: 'à partir de 30 €' },
				{ name: 'Coupe homme', price: '20 €' },
				{ name: 'Coupe enfant', price: '15 €' }
			],
			note: 'Tarifs basés sur cheveux courts, varient selon la longueur.'
		},
		{
			title: 'Soins des cheveux',
			subsections: [
				{
					title: 'Lissage Discovery',
					items: [{ name: 'Lissage Discovery', price: 'sur devis' }]
				},
				{
					title: 'Botox Profond',
					detail:
						'Soin réparateur intense qui nourrit, hydrate et redonne brillance et souplesse aux cheveux abîmés. Durée : 5 à 7 mois.',
					items: [
						{ name: 'Court', price: '110 €' },
						{ name: 'Mi long', price: '150 €' },
						{ name: 'Long', price: '180 €' },
						{ name: 'Très long', price: '210 €' }
					]
				},
				{
					title: 'Botox Express',
					detail:
						'Traitement rapide qui hydrate, apporte douceur et brillance. Durée : 5 à 6 mois.',
					items: [
						{ name: 'Court', price: '70 €' },
						{ name: 'Mi long', price: '80 €' },
						{ name: 'Long', price: '90 €' },
						{ name: 'Très long', price: '115 €' }
					]
				},
				{
					title: 'Soin Genoma',
					detail:
						'Traitement reconstructeur profond qui régénère la fibre capillaire et renforce les cheveux fragilisés.',
					items: [
						{ name: 'Court', price: '100 €' },
						{ name: 'Mi long', price: '120 €' },
						{ name: 'Long', price: '140 €' },
						{ name: 'Très long', price: '160 €' }
					]
				}
			]
		}
	]
};
