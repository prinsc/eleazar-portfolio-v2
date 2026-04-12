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
		prix: '40',
		sections: [
			{
				titre: 'Entrée',
				choix: 'Duo de croquettes de fromage — ou — Scampis à l\u2019ail'
			},
			{
				titre: 'Plat',
				choix:
					'Burger Délice — ou — Boulettes à la liégeoise — ou — Carbonnade Athoise maison'
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
		prix: '50',
		sections: [
			{
				titre: 'Entrée',
				choix:
					'Carpaccio de bœuf Holshtein fumé — ou — Foie gras'
			},
			{
				titre: 'Plat',
				choix: 'Tagliata de bœuf — ou — Pâtes aux scampis — ou — Burger au choix'
			},
			{
				titre: 'Dessert',
				choix: 'Mousse au chocolat — ou — Dame Blanche — ou — Gourmand'
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

// ── Carte complète (depuis le PDF du client) ──────────────────────────

export const carte = [
	{
		categorie: 'Salades',
		items: [
			{ nom: 'Salade de chèvre', desc: 'Salade composée, pomme, noix, chèvre sur toast', prix: '18,50' },
			{ nom: 'Salade de chèvre (sans lardons)', prix: '17,50' },
			{ nom: 'Salade végétarienne', desc: 'Salade, poivrons grillés, avocat, pommes de terre sautées à l\u2019ail', prix: '17,50' },
			{ nom: 'Salade de poulet grillé', desc: 'Salade composée, parmesan, croûtons, vinaigrette à l\u2019ail, poulet mariné grillé', prix: '20,50' },
			{ nom: 'Salade Périgord', desc: 'Foie gras poêlé sur son pain d\u2019épice, magret de canard fumé', prix: '26,00' }
		]
	},
	{
		categorie: 'Croques',
		items: [
			{ nom: 'Croque Monsieur', prix: '13,50' },
			{ nom: 'Croque Madame', prix: '14,50' },
			{ nom: 'Croque bolognaise', prix: '15,50' },
			{ nom: 'Croque du chef', desc: 'Couvert de son pesto, parmesan, oignon, tomate', prix: '17,50' },
			{ nom: 'Croque tartiflette', prix: '17,50' }
		]
	},
	{
		categorie: 'Entrées',
		items: [
			{ nom: 'Croquettes aux crevettes maison Duo / Trio', prix: '21,00 / 22,50' },
			{ nom: 'Croquettes au fromage maison Duo / Trio', desc: 'Ferme de Thoricourt', prix: '15,00 / 16,00' },
			{ nom: 'Carpaccio de bœuf Holshtein fumé', prix: '19,50' },
			{ nom: 'Scampis du chef ou beurre à l\u2019ail (5 pièces)', prix: '16,50' },
			{ nom: 'Terrine de foie gras, pain brioché, confits d\u2019oignons aux fruits rouges', prix: '19,90' },
			{ nom: 'Foie gras poêlé sur son pain d\u2019épice et ses pommes caramélisées', prix: '21,00' }
		]
	},
	{
		categorie: 'Plats',
		items: [
			{ nom: 'Carbonnade athoise maison', prix: '19,90' },
			{ nom: 'Vol au vent maison', prix: '18,90' },
			{ nom: 'Boulettes à la liégeoise maison', prix: '19,50' },
			{ nom: 'Boulettes sauce tomate maison', prix: '18,50' },
			{ nom: 'Jambonneau à la dijonnaise maison', prix: '24,50' },
			{ nom: 'Langue de bœuf sauce madère maison', prix: '21,00' },
			{ nom: 'Tartare de bœuf préparé', prix: '19,50' },
			{ nom: 'Tartare de bœuf non préparé', prix: '19,50' },
			{ nom: 'Tartare de bœuf italien', prix: '21,00' },
			{ nom: 'Scampis du chef ou à l\u2019ail (10 pièces)', prix: '24,50' },
			{ nom: 'Aller-retour à la belge', desc: 'Steak haché nature à préparer façon tartare', prix: '21,00' },
			{ nom: 'Tagliata de steak assaisonnée façon carpaccio', prix: '26,50' },
			{ nom: 'Tartiflette', prix: '16,50' },
			{ nom: 'Duo de solettes meunière', prix: '26,50' }
		]
	},
	{
		categorie: 'Pâtes',
		items: [
			{ nom: 'Spaghetti bolognaise', prix: '16,50' },
			{ nom: 'Tagliatelles fraîches sauce crème pistache burrata', prix: '19,50' },
			{ nom: 'Tagliatelles aux scampis sauce tomate à l\u2019ail (8 pièces)', prix: '22,50' },
			{ nom: 'Penne sauce 4 fromages et son crumble de Parme', prix: '17,50' }
		]
	},
	{
		categorie: 'Burgers',
		items: [
			{ nom: 'Le Délice', desc: 'Beef maison 220g, sauce Giant, cornichons, tomates, salade, oignons, fromage à la Gouyasse', prix: '19,90' },
			{ nom: 'Le Chèvre', desc: 'Beef maison 220g, pain rustique, fromage de chèvre, miel, lardons, tomates séchées, noix, pomme', prix: '20,90' },
			{ nom: 'Le Végé', desc: 'Burger de légumes, rösti, chèvre, poivron grillé, sauce à l\u2019aneth', prix: '17,50' },
			{ nom: 'Le Chicken', desc: 'Poulet mariné, pain bagnat, parmesan, croûtons, tomate, fromage', prix: '18,50' },
			{ nom: 'Le Burger Périgord', desc: 'Beef, escalope de foie gras poêlée, magret de canard fumé, confits d\u2019oignons aux fruits rouges, tomates, salades', prix: '22,50' },
			{ nom: 'Le Burger raclette', desc: 'Beef, fromage raclette, röstis, sauce poivre, cornichons, tomates, roquette', prix: '20,50' }
		]
	},
	{
		categorie: 'Grillades',
		items: [
			{ nom: 'Steak de bœuf (320g)', prix: '25,50' },
			{ nom: 'Onglet à l\u2019échalote (ou autre sauce)', prix: '26,00' },
			{ nom: 'Brochette de bœuf géante (420g)', prix: '25,50' },
			{ nom: 'Entrecôte de bœuf (+/- 420g)', prix: '32,50' },
			{ nom: 'Ribs basse température façon USA (800g)', prix: '26,50' }
		],
		note: 'Accompagnements : Frites / croquettes / röstis / pomme de terre (grenaille) / pâte au beurre. Supplément accompagnement : 2,50'
	},
	{
		categorie: 'Sauces maison',
		items: [
			{ nom: 'Sauce maison', desc: 'Archiduc, Béarnaise, Roquefort, à la bière, Dijonnaise, Poivre vert', prix: '4,00' },
			{ nom: 'Mayonnaise', prix: '1,20' },
			{ nom: 'Ketchup', prix: '1,00' }
		]
	},
	{
		categorie: 'À grignoter, pour l\u2019apéro',
		items: [
			{ nom: 'Croque apéro', prix: '10,50' },
			{ nom: 'Calamars frits, sauce à l\u2019ail', prix: '10,50' },
			{ nom: 'Camembert rôti', prix: '9,50' },
			{ nom: 'Planche Délice', desc: 'Tapenade d\u2019olives, ribs, charcuterie, fromage', prix: '21,50' },
			{ nom: 'Planche royale', desc: 'Calamars frits, 1/2 croque, ribs, charcuterie, fromage, rillette, tapenade d\u2019olives, chips', prix: '28,50' },
			{ nom: 'Portion du chef', desc: 'Rillette, salami et fromage', prix: '10,50' }
		]
	},
	{
		categorie: 'Desserts',
		items: [
			{ nom: 'Café glacé, glace moka', prix: '6,00' },
			{ nom: 'Café glacé, glace moka (caramel ou noisette)', prix: '7,50' },
			{ nom: 'Mousse au chocolat', prix: '10,00' },
			{ nom: 'Mousse au chocolat au coulis de fruits rouges', prix: '10,00' },
			{ nom: 'Pain Délice glacé au caramel beurre salé maison', prix: '11,00' },
			{ nom: 'Moelleux au chocolat maison', prix: '11,50' },
			{ nom: 'Brownies maison et sa glace vanille', prix: '10,00' },
			{ nom: 'Crème brûlée', prix: '10,00' },
			{ nom: 'Flan caramel beurre salé', prix: '9,50' },
			{ nom: 'Gourmand (5 mignardises)', desc: '+ boisson chaude prix selon la carte', prix: '9,00' },
			{ nom: 'Crêpes au sucre blanc (2 pièces)', prix: '8,00' },
			{ nom: 'Crêpes au chocolat (2 pièces)', prix: '9,00' },
			{ nom: 'Crêpes mikado (2 pièces)', prix: '11,50' },
			{ nom: 'Crêpes flambées au Grand Marnier, marmelade à l\u2019orange et sa glace vanille', prix: '13,50' },
			{ nom: 'Dame blanche', prix: '11,00' },
			{ nom: 'Dame noire', prix: '12,00' },
			{ nom: 'Brésilienne', prix: '11,50' },
			{ nom: 'Coupe fraises (en saison)', prix: '13,00' },
			{ nom: 'Coupe colonel', desc: 'Sorbet citron et vodka', prix: '13,00' },
			{ nom: 'Coupe une boule', prix: '3,80' },
			{ nom: 'Coupe deux boules', prix: '7,50' },
			{ nom: 'Coupe trois boules', desc: 'Vanille / chocolat / moka / speculoos / caramel beurre salé / pistache / sorbet citron / sorbet melon / sorbet framboise', prix: '10,50' },
			{ nom: 'Petit pot de chocolat', prix: '3,00' }
		],
		note: 'Tous nos desserts sont faits maison.'
	},
	{
		categorie: 'Plats enfants',
		note: 'En-dessous de 12 ans',
		items: [
			{ nom: 'Nuggets maison', prix: '9,50' },
			{ nom: 'Spaghetti Bolognaise', prix: '9,50' },
			{ nom: 'Steak enfant', prix: '13,50' },
			{ nom: 'Boulettes sauce tomate', prix: '10,50' }
		]
	},
	{
		categorie: 'Vins',
		items: [
			{ nom: 'Vin rouge', desc: 'Verre / 1/4 / 1/2 / Bouteille', prix: '5,00 / 9,50 / 12,50 / 20,00' },
			{ nom: 'Vin blanc', desc: 'Verre / 1/4 / 1/2 / Bouteille', prix: '5,00 / 9,50 / 12,50 / 20,00' },
			{ nom: 'Vin rosé', desc: 'Verre / 1/4 / 1/2 / Bouteille', prix: '5,00 / 9,50 / 12,50 / 20,00' },
			{ nom: 'Vin moelleux (Muscat)', desc: 'Verre / Bouteille', prix: '5,00 / 20,00' },
			{ nom: 'Cava', desc: 'Coupe / Bouteille', prix: '8,00 / 31,50' }
		]
	},
	{
		categorie: 'Boissons chaudes',
		items: [
			{ nom: 'Café', prix: '3,00' },
			{ nom: 'Déca', prix: '3,00' },
			{ nom: 'Expresso', prix: '3,00' },
			{ nom: 'Thé', prix: '3,50' },
			{ nom: 'Café glacé', prix: '4,50' },
			{ nom: 'Café glacé aromatisé caramel ou noisettes', prix: '4,50' },
			{ nom: 'Vin chaud', prix: '5,50' },
			{ nom: 'Cappuccino', desc: 'Mousse de lait ou crème chantilly', prix: '3,80' },
			{ nom: 'Latte Macchiato', prix: '4,60' },
			{ nom: 'Latte Macchiato aromatisé', desc: 'Caramel ou noisette', prix: '5,80' },
			{ nom: 'Chocolat chaud', desc: 'Choco-O-lait', prix: '4,80' },
			{ nom: 'Véritable Irish Coffee', prix: '9,00' },
			{ nom: 'Le Chouffe Irish', prix: '9,00' },
			{ nom: 'Italian Coffee', prix: '9,00' },
			{ nom: 'Bailey\u2019s Coffee', prix: '9,00' }
		]
	},
	{
		categorie: 'Softs',
		items: [
			{ nom: 'Eau plate Gerolsteinner 25cl', prix: '2,80' },
			{ nom: 'Eau plate 1/2l Gerolsteinner', prix: '5,20' },
			{ nom: 'Eau pétillante Gerolsteinner 25cl', prix: '2,80' },
			{ nom: 'Eau pétillante 1/2l Gerolsteinner', prix: '5,20' },
			{ nom: 'Ice tea pétillant', prix: '3,10' },
			{ nom: 'Ice tea Pêche', prix: '3,10' },
			{ nom: 'Pepsi', prix: '3,10' },
			{ nom: 'Pepsi Max', prix: '3,10' },
			{ nom: 'Orangeade Mirinda', prix: '3,10' },
			{ nom: 'Seven Up', prix: '3,10' },
			{ nom: 'Schweppes Tonic', prix: '3,10' },
			{ nom: 'Schweppes Hibiscus', prix: '4,90' },
			{ nom: 'Schweppes Agrumes', prix: '3,10' },
			{ nom: 'Jus de pomme (Pom d\u2019Happy)', prix: '3,80' },
			{ nom: 'Jus de pomme-cerise (Pom d\u2019Happy)', prix: '3,80' },
			{ nom: 'Jus de pomme pétillant (Pom d\u2019Happy)', prix: '3,80' },
			{ nom: 'Supplément sirop', prix: '0,70' }
		]
	},
	{
		categorie: 'Apéritifs',
		items: [
			{ nom: 'Apéritif Délice', desc: 'Multifruit, sirop d\u2019orgeat, vodka', prix: '8,50' },
			{ nom: 'Kir', prix: '8,50' },
			{ nom: 'Kir Royal', prix: '9,50' },
			{ nom: 'Picon', prix: '6,50' },
			{ nom: 'Picon vin blanc', prix: '8,00' },
			{ nom: 'Picon maison', prix: '9,80' },
			{ nom: 'Picon bière', prix: '5,50' },
			{ nom: 'Martini blanc', prix: '8,50' },
			{ nom: 'Martini rouge', prix: '8,50' },
			{ nom: 'Cynar', prix: '9,00' },
			{ nom: 'Pisang orange', prix: '7,00' },
			{ nom: 'Get 27', prix: '6,00' },
			{ nom: 'Get 27 pétillant', prix: '7,00' },
			{ nom: 'Ricard', prix: '5,50' },
			{ nom: 'Mauresque', prix: '6,80' },
			{ nom: 'Porto blanc', prix: '5,00' },
			{ nom: 'Porto rouge', prix: '5,00' },
			{ nom: 'Pineau', prix: '5,00' },
			{ nom: 'Batida', prix: '8,50' },
			{ nom: 'Batida ananas', prix: '9,00' },
			{ nom: 'Campari', prix: '8,00' },
			{ nom: 'Campari orange', prix: '10,00' },
			{ nom: 'Gin Tonic Hibiscus', prix: '12,50' },
			{ nom: 'Gin Bombay Saphire', prix: '12,50' },
			{ nom: 'Gin Panda', prix: '12,50' },
			{ nom: 'Gin Caviar grand cru', prix: '14,50' },
			{ nom: 'Bacardi blanc ou brun Coca', prix: '10,50' },
			{ nom: 'Whisky coca', prix: '10,50' }
		]
	},
	{
		categorie: 'Apéritifs sans alcool',
		items: [
			{ nom: 'Pisang orange sans alcool', prix: '6,00' },
			{ nom: 'Gin tonic sans alcool', prix: '10,00' }
		]
	},
	{
		categorie: 'Mocktails',
		items: [
			{ nom: 'L\u2019Exotique', desc: 'Jus de cranberry, jus de pomme, jus d\u2019ananas, jus de citron, sirop de cassis', prix: '8,50' },
			{ nom: 'La Violette', desc: 'Jus de cranberry, jus de pomme, sirop de violette', prix: '8,50' },
			{ nom: 'Le Chose', desc: 'Jus de fruit au choix, Tonic', prix: '8,00' },
			{ nom: 'Limonade Maison', desc: 'Jus de citron jaune, sucre brun, eau pétillante', prix: '6,50' },
			{ nom: 'Virgin Mojito', prix: '8,50' },
			{ nom: 'Ginger', desc: 'Gingembre, 1/2 citron vert pressé, 1/2 orange pressée, tonic', prix: '8,50' }
		]
	},
	{
		categorie: 'Cocktails',
		items: [
			{ nom: 'Mojito', desc: 'Rhum brun, menthe fraîche, citron vert, eau pétillante, glace pilée', prix: '10,00' },
			{ nom: 'Mojito Royal', desc: 'Rhum brun, menthe fraîche, citron vert, cava, glace pilée', prix: '12,50' },
			{ nom: 'Negroni', desc: 'Gin, bitter, Martini', prix: '13,50' },
			{ nom: 'Apérol Spritz', desc: 'Apérol, Cava', prix: '9,50' },
			{ nom: 'Hugo Spritz', desc: 'Liqueur de fleur de sureau, menthe fraîche, cava', prix: '9,50' },
			{ nom: 'Limoncello Spritz', prix: '9,50' },
			{ nom: 'Spritz violette', prix: '9,50' },
			{ nom: 'Moscow mule', desc: 'Vodka, Ginger Schweppes, jus citron vert', prix: '13,50' },
			{ nom: 'Archange', desc: 'Citron vert, sucre de canne, gin Archange, mousseux', prix: '11,00' },
			{ nom: 'Porn star martini', desc: 'Passoa, vodka, sirop de vanille, cava', prix: '12,50' },
			{ nom: 'Expresso martini', desc: 'Expresso, vodka, liqueur de café, sucre de canne', prix: '13,50' },
			{ nom: 'Ginger Rhum', desc: 'Rhum, gingembre, 1/2 citron vert pressé, 1/2 orange pressée, tonic', prix: '11,50' }
		]
	},
	{
		categorie: 'Bières au fût',
		items: [
			{ nom: 'Légendaire 5% 25cl', prix: '3,00' },
			{ nom: 'Légendaire 33cl', prix: '3,50' },
			{ nom: 'Légendaire 50cl', prix: '5,80' },
			{ nom: 'Saison Dupont Bio 5,5% 25cl', prix: '3,20' },
			{ nom: 'Quintine blonde 8% 33cl', prix: '4,50' },
			{ nom: 'Queue de charrue 9% 33cl', prix: '4,50' },
			{ nom: 'Dégustation de bière au fût (4 bières)', prix: '9,50' },
			{ nom: 'Bière du mois (à découvrir)', prix: 'Prix selon la bière' }
		]
	},
	{
		categorie: 'Bières bouteilles',
		items: [
			{ nom: 'Gueuze pêche 2,5% 25cl', prix: '3,50' },
			{ nom: 'Hoegaarden Blanche 3% 25cl', prix: '3,50' },
			{ nom: 'Hoegaarden rosée 3% 25cl', prix: '4,00' },
			{ nom: 'Kriek Liefmans 4% 25cl', prix: '4,00' },
			{ nom: 'La corne no limits (sans alcool) 0% 33cl', prix: '4,50' },
			{ nom: 'Gouyasse 6% 33cl', prix: '4,00' },
			{ nom: 'Orval 6,2% 33cl', prix: '4,90' },
			{ nom: 'Leffe brune 6,5% 33cl', prix: '4,30' },
			{ nom: 'Leffe blonde 6,6% 33cl', prix: '4,20' },
			{ nom: 'Triple karmeliet 8,4% 33cl', prix: '4,80' },
			{ nom: 'Quintine ambrée 8,5% 33cl', prix: '4,90' },
			{ nom: 'Duvel 8,5% 33cl', prix: '4,90' },
			{ nom: 'Chimay bleue 9% 33cl', prix: '4,50' },
			{ nom: 'Corne triple 9% 33cl', prix: '4,70' },
			{ nom: 'Paix Dieu 10% 33cl', prix: '5,00' },
			{ nom: 'Bush 12% 33cl', prix: '4,80' },
			{ nom: 'Pêche mel bush 8,5% 50cl', prix: '8,50' },
			{ nom: 'Moinette 8,5% 75cl', prix: '9,50' }
		]
	},
	{
		categorie: 'Digestifs',
		items: [
			{ nom: 'Liqueur de café Chouffe', prix: '7,50' },
			{ nom: 'Limoncello', prix: '9,00' },
			{ nom: 'Cointreau', prix: '9,00' },
			{ nom: 'Amaretto Disaronno', prix: '9,00' },
			{ nom: 'Bailey\u2019s', prix: '9,00' },
			{ nom: 'Calvados', prix: '9,00' },
			{ nom: 'Mandarine Napoléon', prix: '9,50' },
			{ nom: 'Eau de Villée', prix: '9,50' },
			{ nom: 'Biercine', prix: '10,50' },
			{ nom: 'Poire à l\u2019Armagnac', prix: '9,50' },
			{ nom: 'Cynar', prix: '9,00' },
			{ nom: 'Grand Marnier', prix: '9,50' },
			{ nom: 'Chartreuse verte', prix: '12,50' }
		]
	},
	{
		categorie: 'Rhum',
		items: [
			{ nom: 'Don Papa', prix: '12,50' },
			{ nom: 'Diplomatico 12 ans', prix: '14,50' },
			{ nom: 'Zacapa 23 ans', prix: '14,50' }
		]
	},
	{
		categorie: 'Whisky',
		items: [
			{ nom: 'Jack Daniel\u2019s', prix: '9,50' },
			{ nom: 'Chivas Regal', prix: '12,50' }
		]
	},
	{
		categorie: 'Cognac',
		items: [
			{ nom: 'Cognac VS', prix: '9,00' },
			{ nom: 'Bisquit & Dubouché Cognac', prix: '12,50' }
		]
	}
];

// Regroupement logique pour la navigation dans la page menu
export const menuSections = [
	{ id: 'manger', label: 'Manger', categories: ['Salades', 'Croques', 'Entrées', 'Plats', 'Pâtes', 'Burgers', 'Grillades', 'Sauces maison', 'À grignoter, pour l\u2019apéro'] },
	{ id: 'desserts', label: 'Desserts', categories: ['Desserts'] },
	{ id: 'enfants', label: 'Enfants', categories: ['Plats enfants'] },
	{ id: 'boissons', label: 'Boissons', categories: ['Softs', 'Boissons chaudes', 'Vins'] },
	{ id: 'bieres', label: 'Bières', categories: ['Bières au fût', 'Bières bouteilles'] },
	{ id: 'aperitifs', label: 'Apéritifs & Cocktails', categories: ['Apéritifs', 'Apéritifs sans alcool', 'Mocktails', 'Cocktails'] },
	{ id: 'digestifs', label: 'Digestifs & Spiritueux', categories: ['Digestifs', 'Rhum', 'Whisky', 'Cognac'] }
];
