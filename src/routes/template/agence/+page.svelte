<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';
	import MetaTags from '$lib/comp/metaTags.svelte';
	import { ArrowUpRight, ArrowRight, Check, X, Minus } from 'lucide-svelte';

	let isReady = $state(false);
	let openFaq = $state(null);

	onMount(async () => {
		await new Promise((r) => setTimeout(r, 80));
		isReady = true;
	});

	const t = {
		title: {
			fr: 'Agence Web Belgique — Alternative Freelance | Eléazar',
			en: 'Web Agency Belgium — Freelance Alternative | Eléazar',
			ru: 'Веб-агентство Бельгия — Альтернатива фрилансера | Eléazar'
		},
		description: {
			fr: "Agence web à Ath, Tournai, Hainaut. Pourquoi un développeur freelance senior coûte 40% moins cher qu'une agence web classique pour une qualité supérieure. Devis gratuit.",
			en: 'Web agency in Ath, Tournai, Hainaut. Why a senior freelance developer costs 40% less than a classic web agency for higher quality. Free quote.',
			ru: 'Веб-агентство в Ате, Турне, Эно. Почему фрилансер обходится на 40% дешевле классического веб-агентства при лучшем качестве.'
		},
		keywords: {
			fr: 'agence web, agence web belgique, agence web hainaut, agence web ath, agence web tournai, alternative agence web, développeur freelance, création site web, devis site internet',
			en: 'web agency, web agency belgium, web agency hainaut, freelance developer, website creation, web agency alternative',
			ru: 'веб-агентство, веб-агентство бельгия, фрилансер разработчик, создание сайта'
		},
		eyebrow: {
			fr: '— L’agence cachée',
			en: '— The hidden agency',
			ru: '— Скрытое агентство'
		},
		h1: {
			fr: 'Toute une',
			en: 'A full',
			ru: 'Целое'
		},
		h1Italic: {
			fr: 'agence web',
			en: 'web agency',
			ru: 'веб-агентство'
		},
		h1End: {
			fr: 'derrière un seul développeur.',
			en: 'behind a single developer.',
			ru: 'за одним разработчиком.'
		},
		lede: {
			fr: 'Pas de chef de projet inutile, pas de marge gonflée, pas de stagiaire qui code votre site. Juste un développeur senior qui fait le travail — et le facture honnêtement.',
			en: 'No useless project manager, no inflated margin, no intern coding your site. Just a senior developer doing the job — and charging honestly.',
			ru: 'Без лишнего проджект-менеджера, без раздутой маржи, без стажёра, кодящего ваш сайт. Просто senior разработчик, который делает работу — и берёт честно.'
		},
		ctaQuote: {
			fr: 'Demander un devis',
			en: 'Get a quote',
			ru: 'Запросить смету'
		},
		ctaSee: {
			fr: 'Voir le comparatif',
			en: 'See the comparison',
			ru: 'Смотреть сравнение'
		},
		stats: {
			fr: [
				{ n: '40%', l: 'moins cher qu’une agence web classique' },
				{ n: '1', l: 'seul interlocuteur, du devis à la mise en ligne' },
				{ n: '6 ans', l: 'd’expérience en développement web' },
				{ n: '0', l: 'intermédiaire entre vous et le code' }
			],
			en: [
				{ n: '40%', l: 'cheaper than a classic web agency' },
				{ n: '1', l: 'single contact, from quote to launch' },
				{ n: '6 yrs', l: 'of web development experience' },
				{ n: '0', l: 'middlemen between you and the code' }
			],
			ru: [
				{ n: '40%', l: 'дешевле классического агентства' },
				{ n: '1', l: 'контакт, от сметы до запуска' },
				{ n: '6 лет', l: 'опыта в веб-разработке' },
				{ n: '0', l: 'посредников между вами и кодом' }
			]
		},
		whyTitle: {
			fr: 'Pourquoi une agence web coûte si cher ?',
			en: 'Why does a web agency cost so much?',
			ru: 'Почему веб-агентство стоит так дорого?'
		},
		whyIntro: {
			fr: 'Le prix d’un site en agence n’est pas le prix du site. C’est le prix de tout le reste.',
			en: "The price of an agency website isn't the price of the site. It's the price of everything else.",
			ru: 'Цена сайта в агентстве — это не цена сайта. Это цена всего остального.'
		},
		why: {
			fr: [
				{
					t: 'Les locaux',
					d: 'Bureaux en centre-ville, baby-foot, machine à café Nespresso. Vous payez le loyer.',
					n: '01'
				},
				{
					t: 'La hiérarchie',
					d: 'Account manager, chef de projet, lead dev, dev junior, designer, QA. Cinq salaires. Un seul site.',
					n: '02'
				},
				{
					t: 'La marge',
					d: 'Une agence vise 30 à 50% de marge nette. C’est légitime — mais vous la financez à 100%.',
					n: '03'
				},
				{
					t: 'Le commercial',
					d: 'Quelqu’un est payé pour vous vendre quelque chose. Ce quelqu’un, vous le payez aussi.',
					n: '04'
				},
				{
					t: 'Les juniors',
					d: 'Le devis est signé par le senior. Le code est écrit par un junior facturé au tarif senior.',
					n: '05'
				},
				{
					t: 'Les délais',
					d: 'Votre projet attend dans une file. Trois mois pour un site vitrine, c’est devenu normal.',
					n: '06'
				}
			],
			en: [
				{
					t: 'The office',
					d: 'Downtown office, foosball, Nespresso machine. You pay the rent.',
					n: '01'
				},
				{
					t: 'The hierarchy',
					d: 'Account manager, project lead, lead dev, junior dev, designer, QA. Five salaries. One website.',
					n: '02'
				},
				{
					t: 'The margin',
					d: 'An agency aims for 30–50% net margin. Fair — but you fund it 100%.',
					n: '03'
				},
				{
					t: 'The salesperson',
					d: 'Someone is paid to sell you things. You pay that person too.',
					n: '04'
				},
				{
					t: 'The juniors',
					d: 'Quote signed by the senior. Code written by a junior billed at senior rate.',
					n: '05'
				},
				{
					t: 'The waiting line',
					d: 'Your project sits in a queue. Three months for a vitrine site is now considered normal.',
					n: '06'
				}
			],
			ru: [
				{
					t: 'Офис',
					d: 'Офис в центре, кикер, Nespresso. Вы платите аренду.',
					n: '01'
				},
				{
					t: 'Иерархия',
					d: 'Аккаунт-менеджер, проджект, лид-дев, джуниор, дизайнер, QA. Пять зарплат. Один сайт.',
					n: '02'
				},
				{
					t: 'Маржа',
					d: 'Агентство хочет 30–50% маржи. Справедливо — но вы платите 100%.',
					n: '03'
				},
				{
					t: 'Продажник',
					d: 'Кто-то получает деньги, чтобы вам продать. Этого кто-то — тоже оплачиваете вы.',
					n: '04'
				},
				{
					t: 'Джуниоры',
					d: 'Смету подписывает senior. Код пишет junior по ставке senior.',
					n: '05'
				},
				{
					t: 'Очередь',
					d: 'Ваш проект ждёт. Три месяца на сайт-визитку — теперь норма.',
					n: '06'
				}
			]
		},
		vsTitle: {
			fr: 'Agence web vs développeur freelance',
			en: 'Web agency vs freelance developer',
			ru: 'Агентство vs фрилансер'
		},
		vsIntro: {
			fr: 'Pour un site vitrine professionnel équivalent, voilà ce qui change.',
			en: 'For an equivalent professional vitrine website, here is what changes.',
			ru: 'Для эквивалентного сайта-визитки — вот что меняется.'
		},
		vsCols: {
			fr: { agency: 'Agence web classique', me: 'Eléazar — Freelance' },
			en: { agency: 'Classic web agency', me: 'Eléazar — Freelance' },
			ru: { agency: 'Классическое агентство', me: 'Eléazar — Фрилансер' }
		},
		vsRows: {
			fr: [
				{
					row: 'Prix moyen site vitrine',
					a: { v: '5 000 — 12 000 €', s: 'bad' },
					b: { v: '1 500 — 4 500 €', s: 'good' }
				},
				{
					row: 'Délai de livraison',
					a: { v: '8 à 16 semaines', s: 'bad' },
					b: { v: '2 à 6 semaines', s: 'good' }
				},
				{
					row: 'Interlocuteur',
					a: { v: 'Chef de projet (≠ développeur)', s: 'mid' },
					b: { v: 'Le développeur lui-même', s: 'good' }
				},
				{
					row: 'Code écrit par',
					a: { v: 'Junior, souvent', s: 'bad' },
					b: { v: 'Moi, toujours', s: 'good' }
				},
				{
					row: 'Stack moderne (Svelte, etc.)',
					a: { v: 'Rare — surtout WordPress', s: 'mid' },
					b: { v: 'Par défaut', s: 'good' }
				},
				{
					row: 'Hébergement & maintenance',
					a: { v: 'Abonnement obligatoire', s: 'bad' },
					b: { v: 'À la carte, vous décidez', s: 'good' }
				},
				{
					row: 'Modifications après livraison',
					a: { v: 'Devis pour chaque virgule', s: 'bad' },
					b: { v: 'Discussion humaine', s: 'good' }
				},
				{
					row: 'Réactivité',
					a: { v: 'Ticket → file → réponse', s: 'bad' },
					b: { v: 'Réponse directe', s: 'good' }
				}
			],
			en: [
				{
					row: 'Average vitrine site price',
					a: { v: '€5,000 — €12,000', s: 'bad' },
					b: { v: '€1,500 — €4,500', s: 'good' }
				},
				{
					row: 'Delivery time',
					a: { v: '8 to 16 weeks', s: 'bad' },
					b: { v: '2 to 6 weeks', s: 'good' }
				},
				{
					row: 'Your contact',
					a: { v: 'Project manager (≠ developer)', s: 'mid' },
					b: { v: 'The developer himself', s: 'good' }
				},
				{
					row: 'Code written by',
					a: { v: 'Junior, often', s: 'bad' },
					b: { v: 'Me, always', s: 'good' }
				},
				{
					row: 'Modern stack (Svelte, etc.)',
					a: { v: 'Rare — mostly WordPress', s: 'mid' },
					b: { v: 'By default', s: 'good' }
				},
				{
					row: 'Hosting & maintenance',
					a: { v: 'Mandatory subscription', s: 'bad' },
					b: { v: 'À la carte, you decide', s: 'good' }
				},
				{
					row: 'Post-launch tweaks',
					a: { v: 'Quote for every comma', s: 'bad' },
					b: { v: 'Human conversation', s: 'good' }
				},
				{
					row: 'Responsiveness',
					a: { v: 'Ticket → queue → answer', s: 'bad' },
					b: { v: 'Direct answer', s: 'good' }
				}
			],
			ru: [
				{
					row: 'Средняя цена сайта-визитки',
					a: { v: '5 000 — 12 000 €', s: 'bad' },
					b: { v: '1 500 — 4 500 €', s: 'good' }
				},
				{
					row: 'Срок выполнения',
					a: { v: '8 — 16 недель', s: 'bad' },
					b: { v: '2 — 6 недель', s: 'good' }
				},
				{
					row: 'Контакт',
					a: { v: 'Проджект (≠ разработчик)', s: 'mid' },
					b: { v: 'Сам разработчик', s: 'good' }
				},
				{
					row: 'Кто пишет код',
					a: { v: 'Часто junior', s: 'bad' },
					b: { v: 'Я, всегда', s: 'good' }
				},
				{
					row: 'Современный стек (Svelte и т.д.)',
					a: { v: 'Редко — обычно WordPress', s: 'mid' },
					b: { v: 'По умолчанию', s: 'good' }
				},
				{
					row: 'Хостинг и поддержка',
					a: { v: 'Обязательная подписка', s: 'bad' },
					b: { v: 'По выбору', s: 'good' }
				},
				{
					row: 'Правки после запуска',
					a: { v: 'Смета на каждую запятую', s: 'bad' },
					b: { v: 'Просто разговор', s: 'good' }
				},
				{
					row: 'Скорость ответа',
					a: { v: 'Тикет → очередь → ответ', s: 'bad' },
					b: { v: 'Прямой ответ', s: 'good' }
				}
			]
		},
		processTitle: {
			fr: 'Le process. Sans bullshit.',
			en: 'The process. No bullshit.',
			ru: 'Процесс. Без воды.'
		},
		process: {
			fr: [
				{ n: '01', t: 'Appel découverte', d: '30 min. Gratuit. Vous expliquez. Je pose des questions.' },
				{ n: '02', t: 'Devis chiffré', d: 'Sous 48h. Prix fixe. Pas de surprise en cours de route.' },
				{ n: '03', t: 'Maquette', d: 'Figma. Vous validez le design avant que je touche au code.' },
				{ n: '04', t: 'Développement', d: 'Vous suivez en direct sur une URL de preview. Pas de boîte noire.' },
				{ n: '05', t: 'Mise en ligne', d: 'Hébergement, nom de domaine, SEO de base, formation rapide.' },
				{ n: '06', t: 'Suivi', d: 'On reste en contact. Je ne disparais pas après le virement.' }
			],
			en: [
				{ n: '01', t: 'Discovery call', d: '30 min. Free. You explain. I ask questions.' },
				{ n: '02', t: 'Quote', d: 'Within 48h. Fixed price. No surprise mid-project.' },
				{ n: '03', t: 'Mockup', d: 'Figma. You approve the design before I write a line of code.' },
				{ n: '04', t: 'Build', d: 'You follow along on a live preview URL. No black box.' },
				{ n: '05', t: 'Launch', d: 'Hosting, domain, basic SEO, quick training session.' },
				{ n: '06', t: 'Aftercare', d: 'We stay in touch. I don’t vanish after the transfer.' }
			],
			ru: [
				{ n: '01', t: 'Звонок-знакомство', d: '30 мин. Бесплатно. Вы объясняете. Я уточняю.' },
				{ n: '02', t: 'Смета', d: '48 часов. Фикс. Без сюрпризов посреди.' },
				{ n: '03', t: 'Макет', d: 'Figma. Утверждаете до строки кода.' },
				{ n: '04', t: 'Разработка', d: 'Превью-ссылка в реальном времени. Без чёрного ящика.' },
				{ n: '05', t: 'Запуск', d: 'Хостинг, домен, базовое SEO, обучение.' },
				{ n: '06', t: 'Сопровождение', d: 'Остаёмся на связи. Не исчезаю после перевода.' }
			]
		},
		realTitle: {
			fr: 'Des sites livrés. Pas des promesses.',
			en: 'Sites delivered. Not promises.',
			ru: 'Сайты сделаны. Не обещания.'
		},
		realIntro: {
			fr: 'Quelques projets récents — chacun pensé, designé et codé sans intermédiaire.',
			en: 'A few recent projects — each thought through, designed and coded with no middleman.',
			ru: 'Несколько недавних проектов — каждый продуман, отдизайнен и закодирован без посредников.'
		},
		faqTitle: {
			fr: 'Les questions qu’on me pose vraiment',
			en: 'The questions I actually get',
			ru: 'Реальные вопросы клиентов'
		},
		faq: {
			fr: [
				{
					q: 'C’est quoi la différence entre vous et une vraie agence web ?',
					a: 'Une agence emploie 5 à 30 personnes et doit faire vivre tout ce monde. Moi je suis seul, je gère tout, je ne facture que mon temps. Pour 80% des projets PME, ça suffit largement — et vous économisez 30 à 50%.'
				},
				{
					q: 'Vous travaillez seul, donc qu’est-ce qui se passe si vous tombez malade ?',
					a: 'Question légitime. Je travaille avec un petit réseau de freelances de confiance pour les renforts. Et le code que je livre est propre, documenté, hébergé chez vous : n’importe quel développeur peut reprendre.'
				},
				{
					q: 'Vous êtes basé à Mainvault, vous travaillez avec qui ?',
					a: 'Ath, Tournai, Leuze-en-Hainaut, Lessines, Mons, Bruxelles — tout le Hainaut, et à distance partout en Belgique et en France. Le rendez-vous physique est possible mais rarement nécessaire.'
				},
				{
					q: 'Pourquoi pas WordPress ?',
					a: 'WordPress reste pertinent pour certains usages (blog éditorial gros volume). Mais pour un site vitrine moderne, rapide, sécurisé et qui se positionne bien sur Google, je préfère SvelteKit. Plus rapide, plus léger, mieux noté par Google.'
				},
				{
					q: 'Combien coûte un site avec vous ?',
					a: 'Site vitrine 4-6 pages : 1 500 à 3 000 €. Site sur mesure avec animations et back-office : 3 000 à 6 000 €. E-commerce Shopify : à partir de 2 000 €. Devis fixe, pas de surprise.'
				},
				{
					q: 'Et après la livraison ?',
					a: 'Vous êtes propriétaire de tout. Je propose un suivi mensuel optionnel (correctifs, petites évolutions, hébergement) à partir de 30 €/mois. Sans engagement.'
				}
			],
			en: [
				{
					q: 'What’s the difference between you and a real web agency?',
					a: 'An agency employs 5–30 people and has to feed all of them. I’m alone, I handle everything, I only bill my time. For 80% of SME projects that’s plenty — and you save 30–50%.'
				},
				{
					q: 'You work alone, what happens if you’re sick?',
					a: 'Fair question. I have a small network of trusted freelancers for backup. And the code I ship is clean, documented, hosted on your account — any developer can take over.'
				},
				{
					q: 'You’re based in Mainvault, who do you work with?',
					a: 'Ath, Tournai, Leuze, Lessines, Mons, Brussels — all of Hainaut, and remotely across Belgium and France. In-person meetings are possible but rarely needed.'
				},
				{
					q: 'Why not WordPress?',
					a: 'WordPress is still relevant for certain cases (high-volume editorial blog). For a modern, fast, secure vitrine that ranks well, I prefer SvelteKit. Faster, lighter, better Google scores.'
				},
				{
					q: 'How much does a site cost?',
					a: 'Vitrine 4-6 pages: €1,500 to €3,000. Custom build with animations and back-office: €3,000 to €6,000. Shopify e-commerce: from €2,000. Fixed quote, no surprises.'
				},
				{
					q: 'What about after launch?',
					a: 'You own everything. Optional monthly support (fixes, small additions, hosting) from €30/month. No lock-in.'
				}
			],
			ru: [
				{
					q: 'В чём разница с настоящим агентством?',
					a: 'В агентстве 5–30 человек, всех нужно кормить. Я один, делаю всё, считаю только своё время. Для 80% проектов МСП этого хватает — и вы экономите 30–50%.'
				},
				{
					q: 'Вы один — что если заболеете?',
					a: 'Логично. Есть сеть доверенных фрилансеров на подмену. Код чистый, документированный, хостинг ваш — любой разработчик подхватит.'
				},
				{
					q: 'Вы в Майнво, с кем работаете?',
					a: 'Ат, Турне, Лёз, Лессин, Монс, Брюссель — весь Эно, удалённо по Бельгии и Франции. Личные встречи возможны, редко нужны.'
				},
				{
					q: 'Почему не WordPress?',
					a: 'WordPress уместен для определённых задач. Но для современного быстрого сайта-визитки с хорошим SEO я выбираю SvelteKit. Быстрее, легче, лучше для Google.'
				},
				{
					q: 'Сколько стоит сайт?',
					a: 'Визитка 4-6 страниц: 1 500 — 3 000 €. Под ключ с анимациями и админкой: 3 000 — 6 000 €. Shopify: от 2 000 €. Фикс, без сюрпризов.'
				},
				{
					q: 'Что после запуска?',
					a: 'Всё ваше. Опциональная поддержка от 30 €/мес. Без обязательств.'
				}
			]
		},
		ctaTitle: {
			fr: 'Votre projet mérite mieux qu’un devis à 8 000 €.',
			en: 'Your project deserves better than an €8,000 quote.',
			ru: 'Ваш проект заслуживает лучшего, чем смета на 8000 €.'
		},
		ctaSub: {
			fr: 'Discussion gratuite, sans engagement, sans commercial qui vous rappelle six fois.',
			en: 'Free chat, no commitment, no salesperson calling six times.',
			ru: 'Бесплатный разговор, без обязательств, без назойливых звонков.'
		},
		ctaMail: {
			fr: 'Écrire un email',
			en: 'Send an email',
			ru: 'Написать email'
		},
		ctaCall: {
			fr: 'Appeler maintenant',
			en: 'Call now',
			ru: 'Позвонить'
		},
		footnote: {
			fr: 'Basé à Mainvault (Ath) — disponible dans tout le Hainaut occidental et à distance.',
			en: 'Based in Mainvault (Ath) — available across western Hainaut and remotely.',
			ru: 'Базирован в Майнво (Ат) — доступен по всему западному Эно и удалённо.'
		}
	};

	function toggleFaq(i) {
		openFaq = openFaq === i ? null : i;
	}

	function emailMe() {
		const subject = encodeURIComponent(
			$settings.lang === 'fr'
				? 'Projet web — demande de devis'
				: $settings.lang === 'en'
					? 'Web project — quote request'
					: 'Веб-проект — запрос сметы'
		);
		window.location.href = `mailto:eleazar@kltk.be?subject=${subject}`;
	}

	const faqSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: t.faq[$settings.lang].map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	});

	const serviceSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: 'Web Development Agency Alternative',
		provider: {
			'@type': 'Person',
			name: 'Eléazar Klyuvitkin',
			url: 'https://kltk.be'
		},
		areaServed: [
			{ '@type': 'City', name: 'Ath' },
			{ '@type': 'City', name: 'Tournai' },
			{ '@type': 'City', name: 'Mons' },
			{ '@type': 'City', name: 'Bruxelles' },
			{ '@type': 'AdministrativeArea', name: 'Hainaut' }
		],
		offers: {
			'@type': 'AggregateOffer',
			priceCurrency: 'EUR',
			lowPrice: '1500',
			highPrice: '6000'
		}
	});
</script>

<MetaTags
	title={t.title[$settings.lang]}
	description={t.description[$settings.lang]}
	keywords={t.keywords[$settings.lang]}
	schema={[faqSchema, serviceSchema]}
/>

<svelte:head>
	<link
		rel="preconnect"
		href="https://fonts.googleapis.com"
	/>
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=JetBrains+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="agence" class:ready={isReady}>
	<div class="grain-overlay" aria-hidden="true"></div>

	<!-- HERO -->
	<section class="hero">
		<div class="hero-grid">
			<div class="hero-rail">
				<span class="mono small">Eléazar — Mainvault, BE</span>
				<span class="mono small year">2026 / EST. 2020</span>
			</div>

			<div class="hero-main">
				<p class="eyebrow mono">{t.eyebrow[$settings.lang]}</p>
				<h1 class="display">
					<span class="line">{t.h1[$settings.lang]}</span>
					<span class="line italic accent">{t.h1Italic[$settings.lang]}</span>
					<span class="line">{t.h1End[$settings.lang]}</span>
				</h1>

				<p class="lede">{t.lede[$settings.lang]}</p>

				<div class="hero-cta">
					<button class="btn primary" onclick={emailMe}>
						<span>{t.ctaQuote[$settings.lang]}</span>
						<ArrowUpRight />
					</button>
					<a class="btn ghost" href="#vs">
						<span>{t.ctaSee[$settings.lang]}</span>
						<ArrowRight />
					</a>
				</div>
			</div>

			<div class="hero-mark" aria-hidden="true">
				<div class="mark-circle">
					<svg viewBox="0 0 200 200">
						<defs>
							<path
								id="circlePath"
								d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
							/>
						</defs>
						<text font-size="14" fill="currentColor" letter-spacing="3">
							<textPath href="#circlePath">
								HONEST · WEB · WORK · NO · MIDDLEMAN · HONEST · WEB · WORK · NO · MIDDLEMAN ·
							</textPath>
						</text>
					</svg>
					<div class="mark-inner">
						<span class="mono">①</span>
					</div>
				</div>
			</div>
		</div>

		<div class="hero-strip" aria-hidden="true">
			<span>SVELTEKIT</span><span>•</span><span>SHOPIFY</span><span>•</span><span>SUPABASE</span
			><span>•</span><span>FIGMA</span><span>•</span><span>HAINAUT</span><span>•</span
			><span>BELGIQUE</span><span>•</span><span>SVELTEKIT</span><span>•</span><span>SHOPIFY</span
			><span>•</span><span>SUPABASE</span><span>•</span><span>FIGMA</span><span>•</span
			><span>HAINAUT</span><span>•</span><span>BELGIQUE</span>
		</div>
	</section>

	<!-- STATS -->
	<section class="stats">
		<ul>
			{#each t.stats[$settings.lang] as s, i}
				<li style="--i:{i}">
					<span class="num">{s.n}</span>
					<span class="lbl">{s.l}</span>
				</li>
			{/each}
		</ul>
	</section>

	<!-- WHY -->
	<section class="why">
		<header class="section-head">
			<span class="mono kicker">§ 01 — Anatomie d’un devis d’agence</span>
			<h2 class="display">
				{t.whyTitle[$settings.lang]}
			</h2>
			<p class="lede">{t.whyIntro[$settings.lang]}</p>
		</header>

		<div class="why-grid">
			{#each t.why[$settings.lang] as w}
				<article class="why-card">
					<span class="why-num mono">{w.n}</span>
					<h3>{w.t}</h3>
					<p>{w.d}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- VS -->
	<section class="vs" id="vs">
		<header class="section-head">
			<span class="mono kicker">§ 02 — Le match</span>
			<h2 class="display">{t.vsTitle[$settings.lang]}</h2>
			<p class="lede">{t.vsIntro[$settings.lang]}</p>
		</header>

		<div class="vs-table" role="table">
			<div class="vs-row vs-head" role="row">
				<div class="vs-cell vs-label" role="columnheader"></div>
				<div class="vs-cell vs-col agency" role="columnheader">
					<span class="mono small">A</span>
					<strong>{t.vsCols[$settings.lang].agency}</strong>
				</div>
				<div class="vs-cell vs-col me" role="columnheader">
					<span class="mono small">B</span>
					<strong>{t.vsCols[$settings.lang].me}</strong>
				</div>
			</div>

			{#each t.vsRows[$settings.lang] as row}
				<div class="vs-row" role="row">
					<div class="vs-cell vs-label" role="cell">{row.row}</div>
					<div class="vs-cell vs-val" data-status={row.a.s} role="cell">
						<span class="ic">
							{#if row.a.s === 'bad'}<X size="14" />{:else if row.a.s === 'mid'}<Minus
									size="14"
								/>{:else}<Check size="14" />{/if}
						</span>
						<span>{row.a.v}</span>
					</div>
					<div class="vs-cell vs-val" data-status={row.b.s} role="cell">
						<span class="ic">
							{#if row.b.s === 'bad'}<X size="14" />{:else if row.b.s === 'mid'}<Minus
									size="14"
								/>{:else}<Check size="14" />{/if}
						</span>
						<span>{row.b.v}</span>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- PROCESS -->
	<section class="process">
		<header class="section-head">
			<span class="mono kicker">§ 03 — Workflow</span>
			<h2 class="display">{t.processTitle[$settings.lang]}</h2>
		</header>

		<ol class="process-list">
			{#each t.process[$settings.lang] as step, i}
				<li class="process-step" style="--i:{i}">
					<span class="step-num mono">{step.n}</span>
					<div class="step-body">
						<h3>{step.t}</h3>
						<p>{step.d}</p>
					</div>
					<span class="step-line" aria-hidden="true"></span>
				</li>
			{/each}
		</ol>
	</section>

	<!-- REAL PROJECTS -->
	<section class="real">
		<header class="section-head">
			<span class="mono kicker">§ 04 — Sélection</span>
			<h2 class="display">{t.realTitle[$settings.lang]}</h2>
			<p class="lede">{t.realIntro[$settings.lang]}</p>
		</header>

		<div class="real-grid">
			{#each $content.projets?.filter((p) => p.link)?.slice(0, 4) ?? [] as p, i}
				<a
					class="real-card no-effect"
					href={p.link}
					target="_blank"
					rel="noopener"
					style="--i:{i}"
				>
					<div class="real-img">
						<img src={p.image} alt={p.name} loading="lazy" />
					</div>
					<div class="real-meta">
						<span class="mono small">{p.date}</span>
						<h3>{p.name}</h3>
						<p>{p.description[$settings.lang]}</p>
						<span class="real-go mono">
							{p.link.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
						</span>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- FAQ -->
	<section class="faq">
		<header class="section-head">
			<span class="mono kicker">§ 05 — FAQ</span>
			<h2 class="display">{t.faqTitle[$settings.lang]}</h2>
		</header>

		<ul class="faq-list">
			{#each t.faq[$settings.lang] as f, i}
				<li class="faq-item" class:open={openFaq === i}>
					<button class="faq-q" onclick={() => toggleFaq(i)} aria-expanded={openFaq === i}>
						<span class="mono small idx">{String(i + 1).padStart(2, '0')}</span>
						<span class="q-text">{f.q}</span>
						<span class="q-toggle" aria-hidden="true">
							{openFaq === i ? '−' : '+'}
						</span>
					</button>
					{#if openFaq === i}
						<div class="faq-a">
							<p>{f.a}</p>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</section>

	<!-- FINAL CTA -->
	<section class="final-cta">
		<div class="final-grid">
			<div class="final-text">
				<span class="mono kicker">§ 06 — Maintenant</span>
				<h2 class="display italic">{t.ctaTitle[$settings.lang]}</h2>
				<p class="lede">{t.ctaSub[$settings.lang]}</p>
			</div>
			<div class="final-actions">
				<button class="btn primary big" onclick={emailMe}>
					<span>{t.ctaMail[$settings.lang]}</span>
					<ArrowUpRight />
				</button>
				<a class="btn ghost big" href="tel:+32485700737">
					<span>{t.ctaCall[$settings.lang]} · +32 485 700 737</span>
				</a>
				<p class="footnote mono small">{t.footnote[$settings.lang]}</p>
			</div>
		</div>
	</section>
</div>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	:global(.agence *) {
		font-family: 'Fraunces', Georgia, serif;
	}

	.agence {
		--ag-bg: #f5f1ea;
		--ag-ink: #131210;
		--ag-ink-soft: #4a463f;
		--ag-line: #1a1916;
		--ag-accent: #d63426;
		--ag-paper: #efe9df;
		--ag-good: #1f6d3d;
		--ag-bad: #c14338;
		--ag-mid: #8a8074;

		position: relative;
		background: var(--ag-bg);
		color: var(--ag-ink);
		min-height: 100vh;
		overflow: hidden;
		isolation: isolate;
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 0.6s ease,
			transform 0.6s ease;

		&.ready {
			opacity: 1;
			transform: none;
		}

		:global([data-theme='dark']) & {
			--ag-bg: #0e0d0b;
			--ag-ink: #f1ece2;
			--ag-ink-soft: #b9b1a3;
			--ag-line: #2a2823;
			--ag-paper: #15140f;
			--ag-accent: #ff6a4d;
			--ag-good: #7adfa1;
			--ag-bad: #ff8a7a;
			--ag-mid: #6f6c63;
		}
	}

	.grain-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		opacity: 0.55;
		mix-blend-mode: multiply;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
	}

	.mono {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		letter-spacing: 0.02em;
	}

	.mono.small {
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: var(--ag-ink-soft);
	}

	.display {
		font-family: 'Fraunces', Georgia, serif;
		font-weight: 350;
		letter-spacing: -0.02em;
		line-height: 0.95;
		font-size: clamp(2.6rem, 8vw, 6.5rem);
		font-variation-settings: 'opsz' 144;
	}

	.italic {
		font-style: italic;
		font-variation-settings: 'opsz' 144, 'SOFT' 100;
	}

	.accent {
		color: var(--ag-accent);
	}

	.lede {
		font-size: clamp(1.05rem, 1.8vw, 1.35rem);
		line-height: 1.5;
		font-weight: 350;
		max-width: 60ch;
		color: var(--ag-ink-soft);
	}

	/* ---------- HERO ---------- */
	.hero {
		position: relative;
		padding: clamp(2.5rem, 6vw, 5rem) clamp(1.25rem, 5vw, 4rem) 0;
		max-width: 1400px;
		margin: 0 auto;
		z-index: 1;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		padding-bottom: clamp(2rem, 4vw, 4rem);
		border-bottom: 1px solid var(--ag-line);
		position: relative;

		@include breakpoint('medium') {
			grid-template-columns: 80px 1fr 220px;
			gap: 3rem;
		}
	}

	.hero-rail {
		display: flex;
		justify-content: space-between;
		flex-direction: row;

		@include breakpoint('medium') {
			flex-direction: column;
			border-right: 1px solid var(--ag-line);
			padding-right: 1rem;
		}

		.year {
			@include breakpoint('medium') {
				writing-mode: vertical-rl;
				transform: rotate(180deg);
				margin-top: auto;
			}
		}
	}

	.hero-main {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	.eyebrow {
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.22em;
		color: var(--ag-accent);
	}

	.display .line {
		display: block;
	}

	.display .line.italic {
		padding-left: clamp(2rem, 8vw, 6rem);
	}

	.display .line:nth-child(3) {
		padding-left: clamp(1rem, 4vw, 3rem);
	}

	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.95rem 1.4rem;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		text-decoration: none;
		cursor: pointer;
		border: 1px solid var(--ag-line);
		background: transparent;
		color: var(--ag-ink);
		transition:
			background 0.25s ease,
			color 0.25s ease,
			transform 0.25s ease;
		border-radius: 0;

		&:hover {
			transform: translate(-2px, -2px);
			box-shadow: 4px 4px 0 var(--ag-line);
		}

		:global(svg) {
			width: 14px;
			height: 14px;
		}

		&.primary {
			background: var(--ag-ink);
			color: var(--ag-bg);
			border-color: var(--ag-ink);

			&:hover {
				background: var(--ag-accent);
				border-color: var(--ag-accent);
				color: #fff;
				box-shadow: 4px 4px 0 var(--ag-ink);
			}
		}

		&.ghost {
			&:hover {
				background: var(--ag-ink);
				color: var(--ag-bg);
			}
		}

		&.big {
			padding: 1.1rem 1.6rem;
			font-size: 13px;
		}
	}

	.hero-mark {
		display: none;

		@include breakpoint('medium') {
			display: block;
			align-self: end;
			justify-self: end;
		}
	}

	.mark-circle {
		position: relative;
		width: 180px;
		height: 180px;
		color: var(--ag-ink-soft);
		animation: spin 28s linear infinite;

		svg {
			width: 100%;
			height: 100%;
		}

		.mark-inner {
			position: absolute;
			inset: 0;
			display: grid;
			place-items: center;
			animation: spin 28s linear infinite reverse;
			font-size: 32px;
			color: var(--ag-accent);
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.hero-strip {
		display: flex;
		gap: 1.5rem;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.3em;
		padding: 1rem 0;
		color: var(--ag-ink-soft);
		overflow: hidden;
		white-space: nowrap;
		mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent);

		span {
			animation: marquee 40s linear infinite;
		}
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	/* ---------- STATS ---------- */
	.stats {
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 4rem);
		position: relative;
		z-index: 1;

		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: grid;
			grid-template-columns: 1fr 1fr;
			border-top: 1px solid var(--ag-line);
			border-left: 1px solid var(--ag-line);

			@include breakpoint('medium') {
				grid-template-columns: repeat(4, 1fr);
			}
		}

		li {
			padding: 1.75rem 1.25rem;
			border-right: 1px solid var(--ag-line);
			border-bottom: 1px solid var(--ag-line);
			display: flex;
			flex-direction: column;
			gap: 0.6rem;
			background: var(--ag-paper);
			position: relative;

			&::before {
				content: '';
				position: absolute;
				top: 0.5rem;
				right: 0.5rem;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background: var(--ag-accent);
				opacity: 0.7;
			}

			.num {
				font-family: 'Fraunces', Georgia, serif;
				font-style: italic;
				font-weight: 350;
				font-size: clamp(2.5rem, 6vw, 4.5rem);
				line-height: 0.9;
				font-variation-settings: 'opsz' 144;
			}

			.lbl {
				font-family: 'JetBrains Mono', ui-monospace, monospace;
				font-size: 11px;
				text-transform: uppercase;
				letter-spacing: 0.16em;
				color: var(--ag-ink-soft);
				line-height: 1.5;
			}
		}
	}

	/* ---------- SECTION HEAD ---------- */
	.section-head {
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		margin-bottom: clamp(2rem, 4vw, 3.5rem);
		max-width: 900px;

		.kicker {
			font-size: 11px;
			text-transform: uppercase;
			letter-spacing: 0.22em;
			color: var(--ag-accent);
		}
	}

	/* ---------- WHY ---------- */
	.why {
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 6rem) clamp(1.25rem, 5vw, 4rem);
		position: relative;
		z-index: 1;
	}

	.why-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		border-top: 1px solid var(--ag-line);
		border-left: 1px solid var(--ag-line);

		@include breakpoint('small') {
			grid-template-columns: 1fr 1fr;
		}

		@include breakpoint('medium') {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.why-card {
		padding: 1.75rem;
		border-right: 1px solid var(--ag-line);
		border-bottom: 1px solid var(--ag-line);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		background: var(--ag-paper);
		transition: background 0.3s ease;
		position: relative;

		&:hover {
			background: var(--ag-bg);

			.why-num {
				color: var(--ag-accent);
			}
		}

		.why-num {
			font-size: 11px;
			color: var(--ag-ink-soft);
			letter-spacing: 0.2em;
			transition: color 0.3s ease;
		}

		h3 {
			font-family: 'Fraunces', Georgia, serif;
			font-style: italic;
			font-weight: 400;
			font-size: 1.6rem;
			margin: 0;
			line-height: 1.1;
		}

		p {
			font-size: 0.95rem;
			line-height: 1.55;
			color: var(--ag-ink-soft);
			margin: 0;
		}
	}

	/* ---------- VS TABLE ---------- */
	.vs {
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 6rem) clamp(1.25rem, 5vw, 4rem);
		position: relative;
		z-index: 1;
	}

	.vs-table {
		border-top: 2px solid var(--ag-line);
		border-bottom: 2px solid var(--ag-line);
	}

	.vs-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-bottom: 1px solid var(--ag-line);

		@include breakpoint('small') {
			grid-template-columns: 1.5fr 1fr 1fr;
		}

		&:last-child {
			border-bottom: none;
		}

		&.vs-head {
			background: var(--ag-ink);
			color: var(--ag-bg);
			border-bottom: 2px solid var(--ag-line);

			.vs-cell {
				padding: 1.25rem 1rem;
				border-color: var(--ag-bg);
			}

			.vs-col {
				display: flex;
				flex-direction: column;
				gap: 0.4rem;

				.mono.small {
					color: var(--ag-bg);
					opacity: 0.6;
				}

				strong {
					font-family: 'Fraunces', Georgia, serif;
					font-style: italic;
					font-weight: 400;
					font-size: 1.05rem;
				}

				&.me strong {
					color: var(--ag-accent);
				}
			}
		}
	}

	.vs-cell {
		padding: 1rem 1rem;
		border-right: 1px solid var(--ag-line);

		&:last-child {
			border-right: none;
		}

		&.vs-label {
			grid-column: 1 / -1;
			background: var(--ag-paper);
			font-family: 'JetBrains Mono', ui-monospace, monospace;
			font-size: 11px;
			text-transform: uppercase;
			letter-spacing: 0.16em;
			color: var(--ag-ink-soft);
			border-bottom: 1px solid var(--ag-line);

			@include breakpoint('small') {
				grid-column: auto;
				border-bottom: none;
				background: transparent;
			}
		}

		&.vs-val {
			display: flex;
			align-items: flex-start;
			gap: 0.6rem;
			font-size: 0.95rem;
			line-height: 1.4;

			.ic {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 20px;
				height: 20px;
				flex-shrink: 0;
				margin-top: 2px;
				border-radius: 50%;
				border: 1px solid currentColor;
			}

			&[data-status='good'] {
				color: var(--ag-good);
			}

			&[data-status='bad'] {
				color: var(--ag-bad);
			}

			&[data-status='mid'] {
				color: var(--ag-mid);
			}
		}
	}

	/* ---------- PROCESS ---------- */
	.process {
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 6rem) clamp(1.25rem, 5vw, 4rem);
		position: relative;
		z-index: 1;
	}

	.process-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		counter-reset: step;
	}

	.process-step {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: 1.25rem;
		padding: 1.5rem 0;
		border-top: 1px solid var(--ag-line);
		position: relative;

		&:last-child {
			border-bottom: 1px solid var(--ag-line);
		}

		&:hover .step-num {
			color: var(--ag-accent);
			transform: translateX(-4px);
		}

		.step-num {
			font-family: 'Fraunces', Georgia, serif;
			font-style: italic;
			font-weight: 350;
			font-size: 2rem;
			color: var(--ag-ink-soft);
			line-height: 1;
			transition:
				color 0.3s ease,
				transform 0.3s ease;
		}

		.step-body {
			h3 {
				font-family: 'Fraunces', Georgia, serif;
				font-weight: 400;
				font-size: 1.35rem;
				margin: 0 0 0.4rem;
				line-height: 1.2;
			}

			p {
				margin: 0;
				color: var(--ag-ink-soft);
				font-size: 0.98rem;
				line-height: 1.55;
				max-width: 60ch;
			}
		}

		.step-line {
			display: none;
		}
	}

	/* ---------- REAL ---------- */
	.real {
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 6rem) clamp(1.25rem, 5vw, 4rem);
		position: relative;
		z-index: 1;
	}

	.real-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;

		@include breakpoint('small') {
			grid-template-columns: 1fr 1fr;
		}

		@include breakpoint('medium') {
			grid-template-columns: repeat(2, 1fr);
			gap: 2rem;
		}
	}

	.real-card {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: inherit;
		background: var(--ag-paper);
		border: 1px solid var(--ag-line);
		transition:
			transform 0.35s ease,
			box-shadow 0.35s ease;
		overflow: hidden;

		&:hover {
			transform: translate(-3px, -3px);
			box-shadow: 6px 6px 0 var(--ag-ink);

			.real-img img {
				transform: scale(1.04);
			}

			.real-go {
				color: var(--ag-accent);
			}
		}

		&:nth-child(even) {
			margin-top: 0;

			@include breakpoint('medium') {
				margin-top: 3rem;
			}
		}
	}

	.real-img {
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: var(--ag-bg);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.5s ease;
		}
	}

	.real-meta {
		padding: 1.25rem 1.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		h3 {
			font-family: 'Fraunces', Georgia, serif;
			font-style: italic;
			font-weight: 400;
			font-size: 1.5rem;
			margin: 0;
			line-height: 1.1;
		}

		p {
			margin: 0;
			color: var(--ag-ink-soft);
			font-size: 0.95rem;
			line-height: 1.5;
		}

		.real-go {
			margin-top: 0.4rem;
			font-size: 11px;
			text-transform: uppercase;
			letter-spacing: 0.18em;
			color: var(--ag-ink-soft);
			transition: color 0.3s ease;
		}
	}

	/* ---------- FAQ ---------- */
	.faq {
		max-width: 1100px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 6rem) clamp(1.25rem, 5vw, 4rem);
		position: relative;
		z-index: 1;
	}

	.faq-list {
		list-style: none;
		padding: 0;
		margin: 0;
		border-top: 1px solid var(--ag-line);
	}

	.faq-item {
		border-bottom: 1px solid var(--ag-line);

		&.open .q-text {
			color: var(--ag-accent);
		}
	}

	.faq-q {
		display: grid;
		grid-template-columns: 40px 1fr 30px;
		gap: 1rem;
		align-items: center;
		width: 100%;
		text-align: left;
		background: transparent;
		border: none;
		padding: 1.25rem 0;
		cursor: pointer;
		color: inherit;

		.idx {
			font-size: 11px;
			color: var(--ag-ink-soft);
		}

		.q-text {
			font-family: 'Fraunces', Georgia, serif;
			font-weight: 400;
			font-size: 1.15rem;
			line-height: 1.3;
			transition: color 0.25s ease;
		}

		.q-toggle {
			font-family: 'JetBrains Mono', ui-monospace, monospace;
			font-size: 1.3rem;
			color: var(--ag-accent);
			text-align: right;
		}

		&:hover .q-text {
			color: var(--ag-accent);
		}
	}

	.faq-a {
		padding: 0 0 1.5rem 56px;

		p {
			margin: 0;
			color: var(--ag-ink-soft);
			line-height: 1.65;
			font-size: 1rem;
			max-width: 65ch;
		}
	}

	/* ---------- FINAL CTA ---------- */
	.final-cta {
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 6rem) clamp(1.25rem, 5vw, 4rem) clamp(4rem, 10vw, 7rem);
		position: relative;
		z-index: 1;
	}

	.final-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		padding: clamp(2rem, 4vw, 3.5rem);
		background: var(--ag-ink);
		color: var(--ag-bg);
		border: 1px solid var(--ag-line);
		position: relative;

		&::before {
			content: '✱';
			position: absolute;
			top: -22px;
			right: 32px;
			font-size: 48px;
			color: var(--ag-accent);
			line-height: 1;
		}

		@include breakpoint('medium') {
			grid-template-columns: 1.3fr 1fr;
			gap: 3rem;
			align-items: center;
		}

		.kicker {
			color: var(--ag-accent);
		}

		.lede {
			color: var(--ag-bg);
			opacity: 0.75;
		}

		.display {
			color: var(--ag-bg);
			font-size: clamp(2rem, 4.5vw, 3.5rem);
		}
	}

	.final-actions {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.btn {
			width: 100%;
			justify-content: space-between;
			border-color: var(--ag-bg);
			color: var(--ag-bg);

			&.primary {
				background: var(--ag-accent);
				color: #fff;
				border-color: var(--ag-accent);

				&:hover {
					background: var(--ag-bg);
					color: var(--ag-ink);
					border-color: var(--ag-bg);
					box-shadow: 4px 4px 0 var(--ag-accent);
				}
			}

			&.ghost {
				&:hover {
					background: var(--ag-bg);
					color: var(--ag-ink);
				}
			}
		}

		.footnote {
			margin-top: 0.5rem;
			color: var(--ag-bg);
			opacity: 0.55;
			line-height: 1.5;
		}
	}
</style>
