import { writable } from 'svelte/store';
export const content = writable({
    me: {
        h1: {
            fr: 'Portfolio de Eléazar Klyuvitkin',
            en: "Eléazar Klyuvitkin's Portfolio",
            ru: 'Портфолио Eléazar Klyuvitkin'
        },
		h2: {
			fr:'23 ans, toutes ses dents',
			en:'23 years old, all his teeth',
			ru:'23 года, все зубы на месте'
		},
		description: {
    fr: `Je suis spécialisé en développement web, design, UI et UX, avec une expertise en Svelte et Supabase pour créer des plateformes interactives optimisées. Mon projet le plus abouti, <a href="https://blinkr.be" target="_blank">Blinkr</a>, reflète pleinement mes compétences en optimisation, ergonomie et gestion des données.`,
    en: `I specialize in web development, design, UI and UX, with expertise in Svelte and Supabase for creating optimized interactive platforms. My most accomplished project, <a href="https://blinkr.be" target="_blank">Blinkr</a>, fully reflects my skills in optimization, ergonomics, and data management.`,
    ru: `Я специализируюсь на веб-разработке, дизайне, UI и UX, с опытом работы в Svelte и Supabase для создания оптимизированных интерактивных платформ. Мой наиболее успешный проект, <a href="https://blinkr.be" target="_blank">Blinkr</a>, полностью отражает мои навыки в оптимизации, эргономике и управлении данными.`
},
location: {
	fr: 'Mainvault 7812, Belgique',
	en: 'Mainvault 7812, Belgium',
	ru: 'Майнво 7812, Бельгия'
},
        disponibility: {
            fr: 'disponible',
            en: 'available',
            ru: 'доступен'
        },
    },
	site: {	
		description: {
    fr: `Je suis spécialisé en développement web, design, UI et UX, avec une expertise en Svelte et Supabase pour créer des plateformes interactives optimisées.`,
    en: `I specialize in web development, design, UI and UX, with expertise in Svelte and Supabase for creating optimized interactive platforms.`,
    ru: `Я специализируюсь на веб-разработке, дизайне, UI и UX, с опытом работы в Svelte и Supabase для создания оптимизированных интерактивных платформ.`
},
		course: {
			fr: 'Parcours',
			en: 'Course',
			ru: 'Курс'
		},
		experience: {
			fr: 'Expérience',
			en: 'Experience',
			ru: 'Опыт'
		},
		projects: {
			fr: 'Projets',
			en: 'Projects',
			ru: 'Проекты'
		},
		technologies: {
			fr: 'Technologies',
			en: 'Technologies',
			ru: 'Технологии'
		},
		socials: {
			fr: 'Réseaux sociaux',
			en: 'Socials',
			ru: 'Социальные сети'
		},
	},
    school: [
        {
            title: {
                fr: 'Bachelier en Techniques graphiques',
                en: 'Bachelor in Graphic Techniques',
                ru: 'Бакалавр по графическим технологиям'
            },
            date: '2021 - sept. 2025',
            quantity: {
                fr: '3 ans et demi',
                en: '3 and a half years',
                ru: '3 с половиной года'
            },
            location: {
                name: 'HEH',
                logo: '/assets/img/heh.png',
                where: {
                    fr: 'Mons',
                    en: 'Mons',
                    ru: 'Монс'
                }
            },
            description: {
                fr: '<p>La formation en Techniques graphiques m’a permis de développer mes compétences en design graphique, en communication visuelle et en création de contenu multimédia. J’ai appris à maîtriser les logiciels de la suite Adobe, à concevoir des interfaces utilisateur et à réaliser des projets graphiques de qualité.</p><p>Aperçu de mes travaux : <a href="https://www.behance.net/prinss" target="_blank">Behance</a>, <a href="https://www.youtube.com/watch?v=a6xDLFfNXPE" target="_blank">Showreel</a></p>',
                en: '<p>The Graphic Techniques program allowed me to develop my skills in graphic design, visual communication, and multimedia content creation. I learned to master Adobe software, design user interfaces, and create high-quality graphic projects.</p><p>Overview of my work: <a href="https://www.behance.net/prinss" target="_blank">Behance</a>, <a href="https://www.youtube.com/watch?v=a6xDLFfNXPE" target="_blank">Showreel</a></p>',
                ru: '<p>Обучение в области графических технологий позволило мне развить навыки в графическом дизайне, визуальной коммуникации и создании мультимедийного контента. Я освоил программы Adobe, научился проектировать пользовательские интерфейсы и создавать качественные графические проекты.</p><p>Обзор моих работ: <a href="https://www.behance.net/prinss" target="_blank">Behance</a>, <a href="https://www.youtube.com/watch?v=a6xDLFfNXPE" target="_blank">Showreel</a></p>'
            },
            technos: [
                'maya',
                'autocad',
                'solidworks',
                'rhino',
                'adobe-indesign',
                'adobe-audition',
                'adobe-illustrator',
                'adobe-photoshop',
                'adobe-premiere',
                'adobe-after-effect',
                'adobe-xd',
                'html',
                'css',
                'js',
                'php',
                'c'
            ]
        },
        {
            title: {
                fr: 'Informatique',
                en: 'Computer Science',
                ru: 'Информатика'
            },
            date: '2016 - 2020',
            quantity: {
                fr: '4 ans',
                en: '4 years',
                ru: '4 года'
            },
            location: {
                name: 'Institut Saint-François de Sales',
                logo: '/assets/img/sfds.jpg',
                where: {
                    fr: 'Ath',
                    en: 'Ath',
                    ru: 'Ат'
                }
            },
            description: {
                fr: '<p>Ma formation en informatique m’a permis de développer mes compétences en programmation, en développement web et en outils bureautiques. J’ai appris à maîtriser les langages de programmation, à concevoir des sites web, à utiliser efficacement la suite Office.</p>',
                en: '<p>My computer science education allowed me to develop skills in programming, web development, and office tools. I learned to master programming languages, design websites, and effectively use the Microsoft Office suite.</p>',
                ru: '<p>Мое обучение в области информатики помогло мне развить навыки программирования, веб-разработки и работы с офисными приложениями. Я освоил языки программирования, научился создавать сайты и эффективно использовать пакет Microsoft Office.</p>'
            },
            technos: ['html', 'css', 'php', 'c++', 'c', 'java', 'excel', 'word', 'powerpoint']
        }
    ],
    exp: [
        {
            title: {
                fr: 'Développeur Front-end - Job étudiant',
                en: 'Front-end Developer - Student Job',
                ru: 'Фронтенд-разработчик — Студенческая работа'
            },
            date: {
				fr: 'juill. 2024 - août 2024',
				en: 'July 2024 - August 2024',
				ru: 'июль 2024 - август 2024'
			},
            quantity: {
                fr: '1 mois',
                en: '1 month',
                ru: '1 месяц'
            },
            location: {
                name: 'Webstanz',
                logo: '/assets/img/wz.png',
                where: {
                    fr: 'Mons',
                    en: 'Mons',
                    ru: 'Монс'
                }
            },
            description: {
                fr: '<p>Lors de mon job étudiant chez Webstanz, j’ai consolidé mes compétences sur Drupal en travaillant pleinement sur un projet client. Cette expérience m’a permis d’approfondir ma maîtrise du CMS et d’appliquer mes connaissances dans un cadre professionnel, tout en gagnant en efficacité et en autonomie.</p>',
                en: '<p>During my student job at Webstanz, I strengthened my skills with Drupal by fully working on a client project. This experience allowed me to deepen my mastery of the CMS and apply my knowledge in a professional setting, while improving my efficiency and autonomy.</p>',
                ru: '<p>Во время своей студенческой работы в Webstanz я укрепил свои навыки работы с Drupal, полностью участвуя в клиентском проекте. Этот опыт позволил мне углубить знания системы управления содержимым и применять их в профессиональной среде, одновременно повышая свою эффективность и самостоятельность.</p>'
            },
            technos: ['drupal', 'sass', 'js', 'github']
        },
        {
            title: {
                fr: 'Développeur Front-end - Stage',
                en: 'Front-end Developer - Internship',
                ru: 'Фронтенд-разработчик — Стажировка'
            },
            date: {
				fr:'févr. 2024 - mai 2024',
				en:'February 2024 - May 2024',
				ru:'февр. 2024 - май 2024'
			},
            quantity: {
                fr: '3 mois',
                en: '3 months',
                ru: '3 месяца'
            },
            location: {
                name: 'Webstanz',
                logo: '/assets/img/wz.png',
                where: {
                    fr: 'Mons',
                    en: 'Mons',
                    ru: 'Монс'
                }
            },
            description: {
                fr: '<p>Chez Webstanz, j’ai approfondi mes compétences en CSS avec SCSS, en JavaScript (manipulation du DOM, animation avec GSAP), ainsi qu’en Twig et PHP, en travaillant sur des projets concrets avec le CMS Drupal et en appliquant ces technologies de manière structurée.</p><p>J’ai également développé mon autonomie, ma gestion du temps avec des outils de timesheeting et ma capacité à m’adapter aux outils et méthodes de travail. Les réunions et échanges techniques m’ont permis de renforcer ma communication et ma compréhension des dynamiques d’équipe.</p>',
                en: '<p>At Webstanz, I deepened my skills in CSS with SCSS, JavaScript (DOM manipulation, animations with GSAP), as well as Twig and PHP, by working on concrete projects with the Drupal CMS and applying these technologies in a structured way.</p><p>I also developed my independence, time management with timesheeting tools, and my ability to adapt to tools and working methods. Technical meetings and discussions helped me strengthen my communication and understanding of team dynamics.</p>',
                ru: '<p>В Webstanz я углубил свои навыки работы с CSS через SCSS, JavaScript (управление DOM, анимации с GSAP), а также Twig и PHP, работая над конкретными проектами с использованием CMS Drupal и применяя эти технологии структурированно.</p><p>Я также развил свою самостоятельность, управление временем с помощью инструментов учета рабочего времени и способность адаптироваться к инструментам и методам работы. Технические совещания и обсуждения помогли мне укрепить навыки коммуникации и понимание динамики команды.</p>'
            },
            technos: ['drupal', 'sass', 'js', 'github']
        },
        {
            title: {
                fr: 'Associé webmaster',
                en: 'Webmaster Associate',
                ru: 'Соучредитель — Вебмастер'
            },
            date: {
				fr:'2020 - 2025',
				en:'2020 - 2025',
				ru:'2020 - 2025'
			},
            quantity: {
                fr: '5 ans',
                en: '5 years',
                ru: '5 лет'
            },
            location: {
                name: 'Vitl Electro',
                logo: '/assets/img/vitl.svg'
            },
            description: {
                fr: "<p>L'activité de mon père a nécessité la création d’un site web pour promouvoir ses services. J’ai pris en charge sa mise en ligne, sa promotion ainsi que sa maintenance. </p><p>Le site présentait ses prestations et offrait aux clients un formulaire de contact dédié. Il comprenait aussi un espace de gestion avec un back-office permettant d’administrer factures, devis et documents via un CRUD.</p>",
                en: "<p>My father's business required the creation of a website to promote his services. I took charge of its launch, promotion, and maintenance.</p><p>The site showcased his services and provided customers with a dedicated contact form. It also included a management area with a back-office allowing the administration of invoices, quotes, and documents via a CRUD system.</p>",
                ru: "<p>Для бизнеса моего отца потребовалось создание сайта для продвижения его услуг. Я взял на себя запуск, продвижение и поддержку сайта.</p><p>Сайт демонстрировал его услуги и предлагал клиентам специальную контактную форму. Он также включал раздел управления с административной панелью, позволяющей управлять счетами, сметами и документами через систему CRUD.</p>"
            },
            technos: ['php', 'sass', 'js', 'css', 'html', 'adobe-xd']
        }
    ],
    projets: [
        {
            name: 'Blinkr',
            description: {
                fr: "Plateforme dédié à la découverte et au partage d'événements locaux.",
                en: "Platform dedicated to discovering and sharing local events.",
                ru: "Платформа, посвященная открытию и обмену местными событиями."
            },
            image: '/assets/projects/blinkr_spoil.png',
            link: 'https://blinkr.be',
            technos: ['svelte-4', 'sass', 'js', 'typescript', 'figma', 'postgresql', 'supabase']
        },
        {
            name: 'Conquistador',
            description: {
                fr: 'Réplique des Colons de Catane version web',
                en: 'Web version replica of The Settlers of Catan',
                ru: 'Веб-версия реплики «Колонизаторов Катана»'
            },
            image: '/assets/projects/catane_spoil.png',
            // link: 'https://blinkr.be',
            technos: ['svelte-4', 'sass', 'js', 'socket-io']
        },
        {
            name: 'Moongo',
            description: {
                fr: 'Skyjo remasterisé, version web, disponible sur github',
                en: 'Remastered Skyjo, web version, available on GitHub',
                ru: 'Переработанный Skyjo, веб-версия, доступен на GitHub'
            },
            image: '/assets/projects/moongo_spoil.png',
            link: 'https://github.com/prinsc/skyjo',
            technos: ['jquery', 'sass', 'js', 'socket-io']
        },
        {
            name: 'Portfolio',
            description: {
                fr: 'Premier portfolio',
                en: 'First portfolio',
                ru: 'Первый портфолио'
            },
            image: '/assets/projects/portfolio.png',
            link: 'https://eleazar-portfolio-v1.netlify.app/',
            technos: ['sass', 'js']
        },
        {
            name: 'Vitl Electro',
            description: {
                fr: "Site destiné à promouvoir les services d'un électricien passionné",
                en: "Website aimed at promoting the services of a passionate electrician",
                ru: "Сайт, предназначенный для продвижения услуг страстного электрика"
            },
            image: '/assets/img/vitl.png',
            // link: 'https://blinkr.be',
            technos: ['php', 'sass', 'js', 'css', 'html', 'adobe-xd']
        }
    ],
    technos: ['svelte-4', 'drupal', 'sass', 'js', 'nodejs', 'figma', 'postgresql', 'supabase'],
    socials: [
		{
			name: 'Email',
			link: 'mailto:eleazar@kltk.be',
			icon: 'at'

		},
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/el%C3%A9azar-k-235246243/',
            icon: 'linkedin'
        },
        {
            name: 'GitHub',
            link: 'https://github.com/prinsc',
            icon: 'github'
        },
        {
            name: 'Instagram',
            link: 'https://www.instagram.com/prins.psd/',
            icon: 'instagram'
        },
        {
            name: 'Behance',
            link: 'https://www.behance.net/prinss',
            icon: 'behance'
        }
    ]
});