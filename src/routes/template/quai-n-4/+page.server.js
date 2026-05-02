// Démo statique. Pas d'appel API. Données placeholder calquées sur le schéma KLTK.
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80';

export const load = async () => {
	return {
		infos: {
			nom: 'Quai n°4',
			ville: 'Ath',
			pays: 'Belgique',
			adresseComplete: 'Quai Saint-Jacques 4, 7800 Ath',
			email: 'reservation@quai-n4.be',
			telephone: '+32 68 30 02 97',
			siteWeb: 'https://www.quai-n4.be',
			description:
				"Restaurant gastronomique étoilé au Guide Michelin, au cœur de la cité des Géants. Maxence Bouralha et Charles-Maxime Legrand y composent une cuisine où le classicisme rencontre l'audace, sublimée par des sauces subtiles et des desserts d'une grande finesse technique.",
			wifi: true,
			terrasse: false,
			accesHandicape: true,
			etoilesMichelin: 1
		},
		horaires: [
			{ j: 'Lundi', ferme: true, periodes: [] },
			{ j: 'Mardi', ferme: true, periodes: [] },
			{ j: 'Mercredi', ferme: false, periodes: [{ debut: '12:00', fin: '14:00' }, { debut: '19:00', fin: '21:30' }] },
			{ j: 'Jeudi', ferme: false, periodes: [{ debut: '12:00', fin: '14:00' }, { debut: '19:00', fin: '21:30' }] },
			{ j: 'Vendredi', ferme: false, periodes: [{ debut: '12:00', fin: '14:00' }, { debut: '19:00', fin: '21:30' }] },
			{ j: 'Samedi', ferme: false, periodes: [{ debut: '12:00', fin: '14:00' }, { debut: '19:00', fin: '21:30' }] },
			{ j: 'Dimanche', ferme: true, periodes: [] }
		],
		cta: {
			reservation: { label: 'Réserver une table', methode: 'url', url: 'https://www.thefork.be' }
		},
		hero: {
			image: PLACEHOLDER_IMG, // PLACEHOLDER → image hero du restaurant
			alt: 'Salle du restaurant Quai n°4'
		},
		poles: [
			{
				num: '01',
				sur: 'Notre philosophie',
				titre: 'Cuisine étoilée, sensible & locale',
				texte:
					"Au Quai n°4, la cuisine est un dialogue entre la tradition et l'audace. Maxence Bouralha et Charles-Maxime Legrand composent des assiettes où chaque produit est choisi avec soin auprès de producteurs locaux belges. Une étoile Michelin obtenue en 2022 récompense une approche alliant classicisme et créativité.",
				cta: { label: 'Découvrir notre carte', href: '#carte' },
				img: PLACEHOLDER_IMG // PLACEHOLDER → photo cuisine / chef au travail
			},
			{
				num: '02',
				sur: 'Privatisation',
				titre: 'Vos événements, sur-mesure',
				texte:
					"Le Quai n°4 ouvre ses portes à vos événements les plus précieux. Notre espace privatisable accueille jusqu'à 30 convives dans un cadre élégant. Une équipe dédiée conçoit menus sur mesure et accords vins exclusifs.",
				cta: { label: 'Nous contacter', href: '#contact' },
				img: PLACEHOLDER_IMG // PLACEHOLDER → salle privatisée / dressage
			}
		],
		carte: {
			categories: [
				{
					name: 'Entrées',
					items: [
						{ name: 'Foie gras de canard', price: '32,00', description: 'Confit, brioche maison, chutney d\'oignons rouges' },
						{ name: 'Tartare de Saint-Jacques', price: '28,00', description: 'Citron caviar, huile de noisette torréfiée' },
						{ name: 'Velouté de panais & truffe', price: '24,00', description: 'Œuf parfait, copeaux de Tuber melanosporum' }
					]
				},
				{
					name: 'Plats',
					items: [
						{ name: 'Pigeon des Costières', price: '52,00', description: 'Cuisse confite, jus corsé au cacao, betterave fumée' },
						{ name: 'Turbot sauvage', price: '58,00', description: 'Beurre blanc à l\'oseille, poireaux brûlés' },
						{ name: 'Bœuf Holstein', price: '48,00', description: 'Pommes soufflées, sauce périgourdine' }
					]
				},
				{
					name: 'Desserts',
					items: [
						{ name: 'Soufflé Grand Marnier', price: '18,00', description: 'Glace vanille de Madagascar, sablé breton' },
						{ name: 'Chocolat & sarrasin', price: '18,00', description: 'Mousse Manjari, glace au sarrasin torréfié' }
					]
				}
			]
		},
		menus: [
			{
				name: 'Menu Découverte',
				price: '85',
				data: {
					sections: [
						{ titre: 'Mise en bouche', choix: "Suggestion du chef" },
						{ titre: 'Entrée', choix: "Foie gras — ou — Saint-Jacques" },
						{ titre: 'Plat', choix: "Turbot — ou — Pigeon" },
						{ titre: 'Dessert', choix: "Soufflé Grand Marnier" }
					]
				}
			},
			{
				name: 'Menu Signature',
				price: '145',
				data: {
					sections: [
						{ titre: 'Amuse-bouche', choix: 'Trilogie de la maison' },
						{ titre: 'Entrée froide', choix: 'Tartare de Saint-Jacques, citron caviar' },
						{ titre: 'Entrée chaude', choix: 'Velouté de panais & truffe, œuf parfait' },
						{ titre: 'Poisson', choix: 'Turbot sauvage, beurre blanc à l\'oseille' },
						{ titre: 'Viande', choix: 'Pigeon des Costières, jus au cacao' },
						{ titre: 'Pré-dessert', choix: 'Sorbet du jour' },
						{ titre: 'Dessert', choix: 'Chocolat & sarrasin' }
					]
				}
			}
		],
		galerie: [
			// PLACEHOLDER → photos réelles du client (salle, plats, équipe)
			{ src: PLACEHOLDER_IMG, alt: 'Salle principale', tall: true },
			{ src: PLACEHOLDER_IMG, alt: 'Dressage' },
			{ src: PLACEHOLDER_IMG, alt: 'Vue cuisine' },
			{ src: PLACEHOLDER_IMG, alt: 'Détail dressage', tall: true },
			{ src: PLACEHOLDER_IMG, alt: 'Cave à vin' },
			{ src: PLACEHOLDER_IMG, alt: 'Chef en cuisine' }
		],
		evenements: [
			{
				title: 'Masterclass — Les secrets du bouillon',
				date: '2026-06-21',
				description:
					"Charles-Maxime Legrand ouvre les coulisses du Quai n°4 le temps d'une masterclass unique. En 3 heures, il vous dévoile l'art du bouillon parfait. Session limitée à 8 participants.",
				image: PLACEHOLDER_IMG
			},
			{
				title: 'Dîner Saint-Valentin — Édition 2027',
				date: '2027-02-14',
				description:
					"Une soirée gastronomique exceptionnelle. Menu 6 services par Maxence Bouralha, accord champagne et grands crus de Bourgogne. Places très limitées.",
				image: PLACEHOLDER_IMG
			}
		],
		avis: [
			{
				auteur: 'Sophie Dupont',
				note: 5,
				texte: "Une expérience d'une rare élégance. Les sauces, d'une précision absolue. Le service, attentionné sans jamais s'imposer.",
				date: '2026-03-18'
			},
			{
				auteur: 'Marc Leroy',
				note: 5,
				texte: "Le pigeon est mémorable. Carte des vins remarquable, sommelier passionné. On ressort avec l'envie de revenir le lendemain.",
				date: '2026-03-02'
			},
			{
				auteur: 'Élise Hardy',
				note: 5,
				texte: "Une étoile largement méritée. Adresse rare en Wallonie picarde, à découvrir d'urgence.",
				date: '2026-02-14'
			}
		],
		socials: [
			{ id: 'instagram', label: 'Instagram', url: 'https://instagram.com', actif: true },
			{ id: 'facebook', label: 'Facebook', url: 'https://facebook.com', actif: true }
		]
	};
};
