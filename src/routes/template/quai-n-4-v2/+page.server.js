// Quai n°4 — données mock calquées sur le schéma API KLTK Studio.
// Pour brancher l'API live, remplacer le contenu de load() par un fetch
// vers https://admin.kltk.be/api/quai-n-4/all (Bearer ${env.QUAI_N_4_KEY}).

const data = {
  infos: {
    data: {
      nom: 'Quai n°4',
      ville: 'Ath',
      pays: 'Belgique',
      adresseComplete: 'Quai Saint-Jacques 4, 7800 Ath',
      email: 'contact@quai-n4.be',
      telephone: '+32 68 30 02 97',
      siteWeb: 'https://www.quai-n4.be',
      reservationUrl: 'https://www.thefork.be/restaurant/quai-n4',
      googleMapsUrl: 'https://maps.google.com',
      description:
        "Restaurant gastronomique étoilé au Guide Michelin, niché au bord de la Dendre. Maxence Bouralha et Charles-Maxime Legrand y composent une cuisine où le geste classique s'enroule autour d'audaces végétales et de sauces taillées au cordeau.",
      parking: 'Parking public à 80 m',
      wifi: true,
      terrasse: false,
      accesHandicape: true
    },
    updated_at: '2026-05-02T16:33:12.671266+00:00'
  },
  horaires: {
    data: [
      { j: 'Lundi', ferme: true, periodes: [] },
      { j: 'Mardi', ferme: true, periodes: [] },
      { j: 'Mercredi', ferme: false, periodes: [
        { debut: '12:00', fin: '14:00' }, { debut: '19:00', fin: '21:30' }
      ] },
      { j: 'Jeudi', ferme: false, periodes: [
        { debut: '12:00', fin: '14:00' }, { debut: '19:00', fin: '21:30' }
      ] },
      { j: 'Vendredi', ferme: false, periodes: [
        { debut: '12:00', fin: '14:00' }, { debut: '19:00', fin: '21:30' }
      ] },
      { j: 'Samedi', ferme: false, periodes: [
        { debut: '12:00', fin: '14:00' }, { debut: '19:00', fin: '21:30' }
      ] },
      { j: 'Dimanche', ferme: true, periodes: [] }
    ]
  },
  alerte: {
    data: {
      alerteOuverture: {
        actif: true,
        message: 'Congé annuel — du 03 au 18 août. Nous vous retrouvons le 19 avec une carte d\'arrière-saison.'
      },
      fermetures: [
        { date: '2026-12-25', motif: 'Noël' },
        { date: '2027-01-01', motif: 'Nouvel An' }
      ]
    }
  },
  cta: {
    data: {
      reservation: {
        label: 'Réserver une table',
        methode: 'url',
        url: 'https://www.thefork.be/restaurant/quai-n4'
      },
      commande: { actif: false, label: '', url: '' }
    }
  },
  socials: {
    data: [
      { id: 'instagram', url: 'https://instagram.com/quain4', actif: true, label: 'Instagram' },
      { id: 'facebook', url: 'https://facebook.com/quain4', actif: true, label: 'Facebook' },
      { id: 'michelin', url: 'https://guide.michelin.com', actif: true, label: 'Guide Michelin' }
    ]
  },
  avis: {
    data: {
      avis: [
        { auteur: 'Sophie Dupont', note: 5, texte: "Une lecture culinaire entière. La carbonnade y est sublimée par un fond brun d'une profondeur rare — on tient là un classicisme qui réinvente sans renier.", date: '2026-03-18',
          // PLACEHOLDER → photo client réelle si Google reviews
          photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80' },
        { auteur: 'Marc Leroy', note: 5, texte: "L'accord vins, à l'aveugle, m'a fait redécouvrir un Saumur que je croyais connaître. Le service tient le rythme d'une symphonie.", date: '2026-03-02',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80' },
        { auteur: 'Élise Vandenberghe', note: 5, texte: "Le dessert au sarrasin torréfié est, à lui seul, un voyage. On ressort plus léger et plus alerte qu'à l'arrivée.", date: '2026-02-21',
          photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80' },
        { auteur: 'Thomas Mercier', note: 4, texte: "Bel équilibre entre audace et précision. Quelques attentes en cuisine mais cela tient à la générosité du service. À refaire sans hésiter.", date: '2026-01-30',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80' }
      ],
      avisMinStars: { value: 4 }
    }
  },
  poles: {
    data: [
      {
        num: '01',
        sur: 'Notre philosophie',
        titre: 'Une cuisine au cordeau, jamais sans surprise',
        texte: "Au Quai n°4, la cuisine est un dialogue entre la rigueur et l'audace. Maxence et Charles-Maxime composent leurs assiettes autour de producteurs belges triés au cordeau — fermes maraîchères de la région d'Ath, pêcheurs de la mer du Nord, fromagers wallons. Ce qui change tout : un classicisme assumé, traversé d'éclats végétaux contemporains.",
        cta: { href: '#carte', label: 'Découvrir la carte' },
        // PLACEHOLDER → photo signature de l'équipe en cuisine
        img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1400&q=80',
        imgAlt: 'Dressage en cuisine au Quai n°4',
        flip: false,
        layout: 'editorial'
      },
      {
        num: '02',
        sur: 'Privatisations',
        titre: 'Vos célébrations, écrites sur mesure',
        texte: "Le Quai n°4 ouvre ses portes à vos événements précieux : dîners d'entreprise, anniversaires gastronomiques, célébrations intimes jusqu'à 30 convives. Menus sur mesure et accords vins exclusifs, conçus en complicité avec votre table.",
        cta: { href: '#cta', label: 'Composer une soirée' },
        img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80',
        // PLACEHOLDER → photo salle privatisée
        imgAlt: 'Salle privatisée du Quai n°4',
        flip: true,
        layout: 'classic'
      },
      {
        num: '03',
        sur: 'Le terroir',
        titre: 'Un rayon de 40 km autour de la Dendre',
        texte: "Les légumes-racines viennent de la ferme de Thoricourt, les pigeons d'Anderlues, les fromages de la vallée de la Sambre. Notre carte raconte un territoire — celui d'une Wallonie qui n'a plus rien à prouver.",
        cta: { href: '#poles', label: 'Nos producteurs' },
        // PLACEHOLDER → photo producteurs / marché
        img: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&q=80',
        imgAlt: 'Producteurs locaux',
        flip: false,
        layout: 'immersive'
      }
    ]
  },
  hero: {
    data: {
      alt: 'Salle du Quai n°4 dressée pour le service',
      // PLACEHOLDER → photo signature du restaurant (extérieur de nuit ou salle dressée)
      image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1800&q=85'
    }
  },
  carte: {
    categories: [
      {
        id: 'cat-1', name: 'Préludes', note: "À partager en début de service", sort_order: 0,
        items: [
          { name: 'Croquettes au fromage de Beloeil', price: '15,00', description: 'Pané maison, herbes du jardin, pickles de chou-fleur' },
          { name: 'Carpaccio de bœuf Holstein fumé au foin', price: '19,50', description: 'Huile de noisette, parmesan affiné 24 mois' },
          { name: 'Tartare de truite de l\'Eau d\'Heure', price: '21,00', description: 'Crème acidulée, oseille, pain noir torréfié' }
        ],
        subcategories: []
      },
      {
        id: 'cat-2', name: 'Plats de résistance', note: 'Accompagnements au choix : pommes grenailles, légumes du moment, gratin', sort_order: 1,
        items: [
          { name: 'Carbonnade athoise, fond brun à la Saint-Feuillien', price: '26,90', description: 'Cuisson lente 8h, frites taillées main' },
          { name: 'Tagliata de bœuf, façon carpaccio tiède', price: '32,50', description: 'Roquette, copeaux de Brie de Watou, vinaigrette à l\'érable' },
          { name: 'Pigeon d\'Anderlues, betterave et cassis', price: '38,00', description: 'Jus court à la fève tonka' }
        ],
        subcategories: [
          { name: 'Côté maraîcher', sort_order: 0, items: [
            { name: 'Risotto de petit épeautre, champignons des bois', price: '24,00', description: 'Beurre noisette, parmesan, truffe d\'été en saison' },
            { name: 'Légumes-racines, condiment au sarrasin', price: '22,00', description: 'Cuits aux feux de bois, jus végétal réduit' }
          ]}
        ]
      },
      {
        id: 'cat-3', name: 'Épilogues', note: null, sort_order: 2,
        items: [
          { name: 'Sarrasin torréfié, glace au lait ribot', price: '14,00', description: 'Caramel salé, crumble de sablé breton' },
          { name: 'Tarte fine aux poires de Thoricourt', price: '13,50', description: 'Glace vanille de Madagascar, tuile au miel' },
          { name: 'Plateau de fromages affinés (3 pièces)', price: '16,00', description: 'Sélection wallonne, pain aux noix' }
        ],
        subcategories: []
      }
    ]
  },
  menus: [
    {
      id: 'menu-1', name: 'Menu Découverte', price: '55',
      data: { sections: [
        { titre: 'Mise en bouche', choix: 'Surprise du chef' },
        { titre: 'Entrée', choix: 'Carpaccio Holstein — ou — Tartare de truite' },
        { titre: 'Plat', choix: 'Carbonnade athoise — ou — Risotto de petit épeautre' },
        { titre: 'Dessert', choix: 'Sarrasin torréfié — ou — Tarte fine aux poires' }
      ]}
    },
    {
      id: 'menu-2', name: 'Menu Signature', price: '95',
      data: { sections: [
        { titre: 'Amuse-bouches', choix: 'Trois propositions de saison' },
        { titre: 'Entrée froide', choix: 'Carpaccio fumé au foin' },
        { titre: 'Entrée chaude', choix: 'Œuf parfait, mousseline d\'oseille' },
        { titre: 'Poisson', choix: 'Saint-Pierre, beurre blanc à la verveine' },
        { titre: 'Viande', choix: 'Pigeon d\'Anderlues, betterave et cassis' },
        { titre: 'Pré-dessert', choix: 'Granité aux herbes du potager' },
        { titre: 'Dessert', choix: 'Sarrasin torréfié, glace au lait ribot' }
      ]}
    },
    {
      id: 'menu-3', name: 'Carte blanche', price: '140',
      data: { sections: [
        { titre: 'Format', choix: '7 services au gré du marché' },
        { titre: 'Accord vins', choix: 'Optionnel — +75€ par convive' },
        { titre: 'Réservation', choix: 'Sur demande, 48h à l\'avance' }
      ]}
    }
  ],
  galerie: [
    { id: 'g1', src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80', alt: 'Dressage à l\'assiette', label: 'Service du soir', tall: true, sort_order: 0 },
    // PLACEHOLDER → photos du restaurant client
    { id: 'g2', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80', alt: 'Salle', label: 'La salle', tall: false, sort_order: 1 },
    { id: 'g3', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80', alt: 'Détail dressage', label: 'Préludes', tall: false, sort_order: 2 },
    { id: 'g4', src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80', alt: 'Plat signature', label: 'Pigeon d\'Anderlues', tall: true, sort_order: 3 },
    { id: 'g5', src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80', alt: 'Dessert', label: 'Sarrasin torréfié', tall: false, sort_order: 4 },
    { id: 'g6', src: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=900&q=80', alt: 'Cave', label: 'Cave à vins', tall: false, sort_order: 5 },
    { id: 'g7', src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=900&q=80', alt: 'Détail bar', label: 'Apéritifs', tall: false, sort_order: 6 },
    { id: 'g8', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80', alt: 'Cuisine ouverte', label: 'En cuisine', tall: true, sort_order: 7 }
  ],
  evenements: [
    { id: 'e1', title: 'Masterclass — Les secrets du bouillon', date: '2026-06-21', active: true,
      description: "Charles-Maxime Legrand ouvre les coulisses du Quai n°4 : sélection des os, cuisson lente, clarification, assaisonnement. 3h, 8 participants, dégustation incluse.",
      // PLACEHOLDER → photo masterclass
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80' },
    { id: 'e2', title: 'Dîner de la Saint-Valentin — Édition 2027', date: '2027-02-14', active: true,
      description: "Menu 6 services par Maxence Bouralha, accord champagne et grands crus de Bourgogne, ambiance musicale live. Places très limitées.",
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80' },
    { id: 'e3', title: 'Soirée Vins natures de Wallonie', date: '2026-09-12', active: true,
      description: "Six vignerons wallons réunis le temps d'une soirée. Cinq services accordés, échanges en salle avec les producteurs.",
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80' }
  ],
  actualites: [
    { id: 'n1', title: 'Une étoile renouvelée pour 2026', date: '2026-03-04', active: true,
      summary: "Le Guide Michelin confirme l'étoile attribuée en 2022. Une fidélité qui salue trois années de constance.",
      content: "C'est avec émotion que nous accueillons cette nouvelle. Trois années qu'une équipe entière œuvre dans l'ombre de cette reconnaissance — sommeliers, commis, salle, intendance. L'étoile n'est jamais individuelle.",
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80' },
    { id: 'n2', title: 'Carte de printemps : asperges, morilles, agneau de lait', date: '2026-04-10', active: true,
      summary: "La nouvelle carte explore les premiers maraîchages de la saison. Asperges blanches de Malines, morilles des Ardennes, agneau pascal.",
      content: "Le printemps signe son retour avec une nouvelle carte. Les asperges blanches sont travaillées en deux services : crues, marinées au yuzu ; cuites au beurre noisette, mousseline parfumée à l'aspérule.",
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&q=80' },
    { id: 'n3', title: 'Charles-Maxime invité à Omnivore Paris', date: '2026-02-15', active: true,
      summary: "Notre chef présentera une assiette signature lors du festival Omnivore en mars 2026.",
      content: "Une fierté pour toute la maison. L'assiette présentée — pigeon d'Anderlues, betterave, cassis — sera l'occasion de saluer un savoir-faire wallon trop discret.",
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80' }
  ],
  partenaires: [
    // PLACEHOLDER → vrais logos partenaires
    { id: 'p1', name: 'Guide Michelin', url: 'https://guide.michelin.com', logo: 'https://images.unsplash.com/photo-1599933354471-1cdab1bb0e9c?w=240&q=80', sort_order: 0 },
    { id: 'p2', name: 'Gault & Millau', url: 'https://gaultmillau.com', logo: 'https://images.unsplash.com/photo-1599933354471-1cdab1bb0e9c?w=240&q=80', sort_order: 1 },
    { id: 'p3', name: 'Ferme de Thoricourt', url: '#', logo: 'https://images.unsplash.com/photo-1599933354471-1cdab1bb0e9c?w=240&q=80', sort_order: 2 },
    { id: 'p4', name: 'Caves Vandenberg', url: '#', logo: 'https://images.unsplash.com/photo-1599933354471-1cdab1bb0e9c?w=240&q=80', sort_order: 3 },
    { id: 'p5', name: 'Brasserie Saint-Feuillien', url: '#', logo: 'https://images.unsplash.com/photo-1599933354471-1cdab1bb0e9c?w=240&q=80', sort_order: 4 }
  ]
};

export const load = async () => {
  return data;
};
