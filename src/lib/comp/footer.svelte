<script>
	import { settings } from '$lib/stores/settings.js';
	import PageContent from '$lib/comp/PageContent.svelte';

	const lang = $derived($settings.lang);

	const services = [
		{
			id: 'sites-web-sur-mesure',
			name: {
				fr: 'Création de sites web sur mesure',
				en: 'Custom Website Creation',
				ru: 'Создание индивидуальных веб-сайтов'
			}
		},
		{
			id: 'design-graphique-identite-visuelle',
			name: {
				fr: 'Design Graphique & Identité',
				en: 'Graphic Design & Branding',
				ru: 'Графический дизайн и брендинг'
			}
		},
		{
			id: 'boutique-en-ligne-shopify',
			name: {
				fr: 'Boutique en Ligne Shopify',
				en: 'Shopify Online Store',
				ru: 'Интернет-магазин Shopify'
			}
		},
		{
			id: 'formation-developpement-web',
			name: {
				fr: 'Formation Développement Web',
				en: 'Web Development Training',
				ru: 'Обучение веб-разработке'
			}
		},
		{
			id: 'assistance-technique-informatique',
			name: {
				fr: 'Assistance Technique Informatique',
				en: 'IT Technical Support',
				ru: 'ИТ техническая поддержка'
			}
		},
		{
			id: 'installation-reparation-electromenager',
			name: {
				fr: 'Installation & Réparation Électroménager',
				en: 'Home Appliance Installation & Repair',
				ru: 'Установка и ремонт бытовой техники'
			}
		},
		{
			id: 'services-electricite-installation',
			name: {
				fr: 'Dépannage & Électricité',
				en: 'Electrical Troubleshooting & Services',
				ru: 'Электрические услуги и ремонт'
			}
		},
		{
			id: 'installation-cameras-surveillance',
			name: {
				fr: 'Installation de Caméras de Surveillance',
				en: 'Security Camera Installation',
				ru: 'Установка камер видеонаблюдения'
			}
		}
	];

	const articles = [
		{
			slug: 'creation-site-internet-ath',
			title: {
				fr: 'Création Site Internet Ath',
				en: 'Website Creation Ath',
				ru: 'Создание сайта Ath'
			}
		},
		{
			slug: 'depannage-lave-vaisselle-ath',
			title: {
				fr: 'Dépannage Lave-Vaisselle à Ath',
				en: 'Dishwasher Repair Ath',
				ru: 'Ремонт посудомойки Ath'
			}
		},
		{
			slug: 'creation-site-web-ath',
			title: { fr: 'Création de Site Web à Ath', en: 'Web Design Ath', ru: 'Веб-сайт в Ath' }
		},
		{
			slug: 'reparation-ecran-laptop-hainaut',
			title: {
				fr: 'Réparation écran PC portable Hainaut',
				en: 'Laptop Screen Repair Hainaut',
				ru: 'Ремонт экрана ноутбука Эно'
			}
		},
		{
			slug: 'schema-unifilaire-plan-position-vincotte-ath',
			title: {
				fr: 'Schéma Unifilaire Vinçotte Ath',
				en: 'Single-Line Diagram Vincotte Ath',
				ru: 'Однолинейная схема Vinçotte Ath'
			}
		},
		{
			slug: 'guide-choisir-depanneur-ath-hainaut',
			title: {
				fr: 'Choisir un bon dépanneur à Ath',
				en: 'Choose a good technician in Ath',
				ru: 'Выбрать мастера в Ath'
			}
		},
		{
			slug: 'blinkr-events-agenda-evenements-ath-hainaut',
			title: {
				fr: 'Blinkr.events : agenda Ath & Hainaut',
				en: 'Blinkr.events: Ath & Hainaut agenda',
				ru: 'Blinkr.events: события Ath & Эно'
			}
		},
		{
			slug: 'pourquoi-memoire-ram-coute-cher',
			title: {
				fr: 'Pourquoi la RAM coûte-t-elle si cher ?',
				en: 'Why is RAM so expensive?',
				ru: 'Почему RAM стоит так дорого?'
			}
		},
		{
			slug: 'ordinateur-lent-solutions-ath',
			title: {
				fr: 'Ordinateur lent : solutions (Ath)',
				en: 'Slow computer: solutions (Ath)',
				ru: 'Медленный ПК: решения (Ath)'
			}
		},
		{
			slug: 'evenements-insolites-wallonie-toute-lannee',
			title: {
				fr: 'Événements insolites en Wallonie',
				en: 'Unusual events in Wallonia',
				ru: 'Необычные события в Валлонии'
			}
		},
		{
			slug: 'cout-site-web-professionnel-2025-ia',
			title: {
				fr: 'Coût site web professionnel 2025 + IA',
				en: 'Cost of a pro website in 2025 + AI',
				ru: 'Стоимость сайта в 2025 + ИИ'
			}
		},
		{
			slug: 'controle-rgie-vincotte-conformite-electrique-ath',
			title: {
				fr: 'Contrôle RGIE & Vinçotte à Ath',
				en: 'RGIE & Vincotte inspection Ath',
				ru: 'Проверка RGIE & Vinçotte Ath'
			}
		}
	];

	const projects = [
		{ href: 'https://renaissance-coach.be/', label: 'renaissance-coach.be' },
		{ href: 'https://mjmsono.com/', label: 'mjmsono.com' },
		{ href: 'https://blinkr.events/', label: 'blinkr.events' },
		{ href: 'https://noumis-jewelry.com/', label: 'noumis-jewelry.com' }
	];

	const heading = (key) =>
		({
			services: { fr: 'Services', en: 'Services', ru: 'Услуги' },
			blog: { fr: 'Blog', en: 'Blog', ru: 'Блог' },
			projects: { fr: 'Projets', en: 'Projects', ru: 'Проекты' }
		})[key][lang];
</script>

<footer>
	<PageContent>
		<div class="footer-content">
			<div class="footer-col">
				<p class="col-heading">{heading('services')}</p>
				<ul>
					{#each services as s}
						<li>
							<a href="/{lang}/services/{s.id}" class="footer-link no-effect">
								{s.name[lang] ?? s.name.fr}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="footer-col">
				<p class="col-heading">{heading('blog')}</p>
				<ul>
					{#each articles as a}
						<li>
							<a href="/{lang}/blog/{a.slug}" class="footer-link no-effect">
								{a.title[lang] ?? a.title.fr}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="footer-col">
				<p class="col-heading">{heading('projects')}</p>
				<ul>
					{#each projects as p}
						<li>
							<a
								href={p.href}
								target="_blank"
								rel="noopener noreferrer"
								class="footer-link no-effect"
							>
								{p.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="footer-bottom">
			<p class="legal">© 2025 Eléazar Klyuvitkin – BE 1031.777.419</p>
			<p class="legal">TVA non applicable (franchise – art. 56bis CTVA)</p>
			<a href="/{lang}/legal" class="footer-link legal no-effect">
				{lang === 'fr'
					? 'Mentions légales'
					: lang === 'en'
						? 'Legal Notice'
						: 'Юридическая информация'}
			</a>
			<a href="/{lang}/cgu" class="footer-link legal no-effect">
				{lang === 'fr'
					? "Conditions générales d'utilisation"
					: lang === 'en'
						? 'Terms of Service'
						: 'Условия использования'}
			</a>
			<a href="/{lang}/guideline" class="footer-link legal no-effect"> Guideline </a>
		</div>
	</PageContent>
</footer>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	footer {
		.footer-content {
			max-width: 1200px;
			margin: 0 auto 2rem;
			display: grid;
			grid-template-columns: 1fr;
			gap: 2rem;

			@include breakpoint('small') {
				grid-template-columns: repeat(2, 1fr);
			}

			@include breakpoint('medium') {
				grid-template-columns: repeat(3, 1fr);
			}
		}

		.footer-col {
			.col-heading {
				font-size: 0.7rem;
				text-transform: uppercase;
				letter-spacing: 0.1em;
				opacity: 0.5;
				font-weight: 500;
				margin: 0 0 0.75rem;
			}

			ul {
				list-style: none;
				padding: 0;
				margin: 0;
				display: flex;
				flex-direction: column;
				li {
					font-size: 0.7rem;
				}
			}

			.footer-link {
				font-size: var(--typo-comment, 0.85rem);
				opacity: 0.7;
				text-decoration: none;

				&:hover {
					opacity: 1;
					text-decoration: underline;
				}
			}
		}

		.footer-bottom {
			max-width: 1200px;
			margin: 0 auto;
			padding-top: 2rem;
			border-top: 1px solid var(--color-gray-15);
			text-align: center;

			a {
				text-decoration: underline;
			}

			.legal {
				font-size: var(--typo-comment);
				opacity: 0.6;
				margin: 0.25rem 0;
			}
		}
	}
</style>
