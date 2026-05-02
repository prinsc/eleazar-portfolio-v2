<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Atelier from './lib/Atelier.svelte';

	let isReady = $state(false);
	let openFaq = $state(null);

	let atelierEl;
	let stackEl;
	let inclusEl;

	const stack = [
		{ n: 'SvelteKit', v: 'framework', d: 'Pages rendues côté serveur, instantanées au clic.' },
		{
			n: 'Svelte 5',
			v: 'composants',
			d: 'Réactivité fine, bundle léger, pas de virtual DOM lourd.'
		},
		{ n: 'GSAP', v: 'animation', d: 'Mouvements précis, scroll-driven, calés au pixel.' },
		{ n: 'Matter.js', v: 'physics 2D', d: 'Le bac à sable que vous venez de lancer, par exemple.' },
		{ n: 'Three.js', v: '3D / WebGL', d: 'Quand un produit mérite un rendu volumétrique.' },
		{ n: 'Mapbox GL', v: 'cartographie', d: 'Cartes vectorielles fluides, stylées sur mesure.' },
		{
			n: 'Supabase',
			v: 'back-office',
			d: 'Authentification, base de données, fichiers — sans serveur à entretenir.'
		},
		{ n: 'Vercel', v: 'hébergement', d: 'Déploiement à chaque commit, CDN mondial, zéro friction.' }
	];

	const inclus = [
		{
			t: 'Code source à vous',
			d: 'Vous repartez avec les sources sur GitHub. Pas d’otage technique.'
		},
		{
			t: 'Hébergement an 1',
			d: 'Mise en ligne, certificat HTTPS, nom de domaine .be ou .com inclus.'
		},
		{
			t: 'Performance Lighthouse',
			d: 'Score visé > 90 sur les quatre axes. Mesuré avant livraison.'
		},
		{ t: 'Accessibilité AA', d: 'Contrastes, alt, focus, navigation clavier. Lisible par tous.' },
		{ t: 'SEO de base', d: 'Sitemap, balises Open Graph, données structurées Schema.org.' },
		{ t: 'RGPD-ready', d: 'Bandeau cookies si pertinent, mentions légales, hébergement UE.' },
		{ t: 'Formation 1 h', d: 'Comment changer un texte, une photo, ajouter une page.' },
		{
			t: 'Assistance 30 jours',
			d: 'Petits ajustements post-livraison sans facturation supplémentaire.'
		}
	];

	let pressEl;
	let pressSheetEl;
	let heroEl;
	let mastheadEl;
	let dropcapEl;
	let editoEl;
	let bigquoteEl;
	let bigquoteTextEl;
	let statsEl;
	let whyGridEl;
	let vsHeadEl;
	let vsCardsEl;
	let procListEl;
	let realGridEl;
	let faqListEl;
	let finalEl;
	let marqueeEl;
	let pricecardEl;

	let cleanups = [];

	const stats = [
		{ n: '500', suffix: '€', l: 'Ticket d’entrée. Tout compris.' },
		{ n: '3', suffix: 'j', l: 'Délai mini. Site MJM Sono livré en 3 jours.' },
		{ n: '6', suffix: 'ans', l: 'À livrer du web qui marche.' },
		{ n: '01', suffix: '', l: 'Interlocuteur unique. Le dev.' }
	];

	const why = [
		{
			t: 'Les locaux',
			d: 'Bureaux centre-ville. Baby-foot. Nespresso.',
			tag: 'overhead',
			c: 'Vous payez le loyer.'
		},
		{
			t: 'La hiérarchie',
			d: 'Account, projet, lead, junior, design, QA.',
			tag: 'salaires',
			c: 'Cinq salaires. Un seul site.'
		},
		{
			t: 'La marge',
			d: 'Une agence vise 30 à 50% de marge nette.',
			tag: 'capital',
			c: 'Légitime. Mais c’est vous qui financez.'
		},
		{
			t: 'Le commercial',
			d: 'Quelqu’un est payé pour vous vendre.',
			tag: 'sales',
			c: 'Vous payez aussi cette personne.'
		},
		{
			t: 'Les juniors',
			d: 'Le devis est signé par le senior.',
			tag: 'bait',
			c: 'Le code est écrit par un junior facturé senior.'
		},
		{
			t: 'La file d’attente',
			d: 'Votre projet attend dans une queue.',
			tag: 'delays',
			c: 'Trois mois pour un site vitrine.'
		}
	];

	const vsCards = [
		{
			label: 'Le prix',
			a: { v: '5 000 — 12 000 €', t: 'agence' },
			b: { v: 'Dès 500 €', t: 'eleazar' },
			diff: '−93%',
			note: 'Un site vitrine pro chez moi, c’est dix fois moins cher qu’en agence.'
		},
		{
			label: 'Le délai',
			a: { v: '8 à 16 semaines', t: 'agence' },
			b: { v: '3 à 14 jours', t: 'eleazar' },
			diff: '×8 plus rapide',
			note: 'MJM Sonorisation a été livré en 3 jours. Renaissance Coach en 9.'
		},
		{
			label: 'L’interlocuteur',
			a: { v: 'Un chef de projet', t: 'agence' },
			b: { v: 'Le développeur', t: 'eleazar' },
			diff: 'zéro relais',
			note: 'Vous parlez à la personne qui code. Pas à un intermédiaire.'
		},
		{
			label: 'Qui code',
			a: { v: 'Un junior, souvent', t: 'agence' },
			b: { v: 'Moi, toujours', t: 'eleazar' },
			diff: '6 ans d’xp',
			note: 'Pas de bait & switch : le devis et le code, c’est la même personne.'
		},
		{
			label: 'La technologie',
			a: { v: 'Solution datée', t: 'agence' },
			b: { v: 'Outils 2026', t: 'eleazar' },
			diff: 'à jour',
			note: 'Sites rapides, sécurisés, bien placés sur Google. Sans surcouche inutile.'
		},
		{
			label: 'Après livraison',
			a: { v: 'Devis pour chaque ligne', t: 'agence' },
			b: { v: 'On en discute', t: 'eleazar' },
			diff: 'humain',
			note: 'Une virgule à corriger ? Un WhatsApp suffit. Pas un bon de commande.'
		}
	];

	const process = [
		{
			n: '01',
			t: 'L’appel découverte',
			d: 'Trente minutes, gratuit. Vous expliquez. Je pose des questions. C’est aussi simple que ça.'
		},
		{
			n: '02',
			t: 'Le devis chiffré',
			d: 'Sous 48 heures. Prix fixe, ferme. Pas de surprise en cours de route.'
		},
		{
			n: '03',
			t: 'La maquette',
			d: 'Vous voyez le design en image avant que je touche au code. Vous validez, on avance.'
		},
		{
			n: '04',
			t: 'Le développement',
			d: 'Vous suivez en direct sur un lien privé. Aucune boîte noire. 3 à 14 jours selon la complexité.'
		},
		{
			n: '05',
			t: 'La mise en ligne',
			d: 'Mise en ligne, nom de domaine, visibilité Google de base, formation rapide pour gérer le contenu.'
		},
		{ n: '06', t: 'Le suivi', d: 'On reste en contact. Je ne disparais pas après le virement.' }
	];

	const projets = [
		{
			name: 'MJM Sonorisation',
			date: '2026',
			cat: 'Vitrine',
			delay: '3 jours',
			description:
				'Site vitrine pour un sonorisateur passionné. Maquette, dev, mise en ligne — bouclé en trois jours.',
			image:
				'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop',
			link: 'https://mjmsono.com'
		},
		{
			name: 'Renaissance Coach',
			date: '2025',
			cat: 'Vitrine',
			delay: '9 jours',
			description: 'Site vitrine pour un coach de vie spécialisé en développement personnel.',
			image:
				'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=900&auto=format&fit=crop',
			link: 'https://renaissance-coach.be'
		},
		{
			name: 'Blinkr',
			date: '2024–2025',
			cat: 'Plateforme',
			delay: '6 mois',
			description:
				'Plateforme dédiée à la découverte et au partage d’événements locaux. Un projet plus ambitieux.',
			image:
				'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop',
			link: 'https://blinkr.events'
		},
		{
			name: 'Noumis Jewelry',
			date: '2025',
			cat: 'E-commerce',
			delay: '3 semaines',
			description: 'Boutique en ligne pour une marque de bijoux artisanaux.',
			image:
				'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&auto=format&fit=crop',
			link: 'https://noumis-jewelry.com'
		}
	];

	const faq = [
		{
			q: 'Qu’est-ce qui n’est PAS inclus dans les 500 € ?',
			a: 'Pour cadrer les attentes : le ticket à 500 € couvre une vitrine une page avec vos textes et vos photos. Ce qu’il faut ajouter au-dessus : multi-pages (+700 €), animations sur-mesure (+300 à 1 200 €), prise de photos pro (devis photographe), copywriting (devis rédacteur), espace boutique (à partir de 2 000 €), application métier (sur devis). Tout est listé clairement avant signature, jamais en cours de route.'
		},
		{
			q: 'Trois jours pour un site, c’est pas trop court ?',
			a: 'Pour un site vitrine bien cadré, où le client a ses textes et ses photos, trois jours suffisent. C’est ce qu’on a fait avec MJM Sonorisation en 2026. Pour des projets plus ambitieux (e-commerce, plateforme, animations sur-mesure), comptez de deux à six semaines.'
		},
		{
			q: 'C’est quoi la différence avec une vraie agence ?',
			a: 'Une agence emploie 5 à 30 personnes. Faut tous les payer. Moi je suis seul, je gère tout, je facture mon temps. Pour 80% des projets PME ça suffit largement — et vous économisez 30 à 80%.'
		},
		{
			q: 'Vous travaillez seul. Et si vous tombez malade ?',
			a: 'Question légitime. Je travaille avec un petit réseau d’indépendants de confiance pour les renforts. Et tout ce que je livre vous appartient : un autre professionnel peut reprendre la main sans difficulté.'
		},
		{
			q: 'Vous bossez où ?',
			a: 'Basé à Mainvault (Ath). Je couvre tout le Hainaut — Tournai, Leuze, Lessines, Mons — et à distance partout en Belgique et en France. Le rendez-vous physique est possible mais rarement nécessaire.'
		},
		{
			q: 'Et après la livraison ?',
			a: 'Vous êtes propriétaire de tout. Suivi mensuel optionnel (corrections, petites évolutions, mise en ligne) à partir de 30 €/mois. Sans engagement. Vous pouvez partir quand vous voulez.'
		}
	];

	function toggleFaq(i) {
		openFaq = openFaq === i ? null : i;
	}

	function emailMe() {
		window.location.href =
			'mailto:eleazar@kltk.be?subject=Projet%20web%20%E2%80%94%20demande%20de%20devis';
	}

	onMount(async () => {
		await new Promise((r) => setTimeout(r, 60));
		isReady = true;

		if (!browser) return;

		const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
			import('gsap'),
			import('gsap/ScrollTrigger')
		]);

		gsap.registerPlugin(ScrollTrigger);

		// ---------- PRESS SHEET : reveal éditorial scroll-driven ----------
		const initPress = () => {
			if (!pressEl) return;

			// reveal feuille + parallax léger
			if (pressSheetEl) {
				gsap.fromTo(
					pressSheetEl,
					{ y: 60, rotate: -1.5, opacity: 0 },
					{
						y: 0,
						rotate: -0.8,
						opacity: 1,
						duration: 1.1,
						ease: 'power3.out',
						scrollTrigger: { trigger: pressEl, start: 'top 75%' }
					}
				);

				gsap.to(pressSheetEl, {
					yPercent: -8,
					ease: 'none',
					scrollTrigger: {
						trigger: pressEl,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 0.6
					}
				});
			}

			// stagger des notes éditoriales
			const notes = pressEl.querySelectorAll('.press-note');
			notes.forEach((note, i) => {
				gsap.fromTo(
					note,
					{ opacity: 0, y: 30, x: i % 2 === 0 ? -20 : 20 },
					{
						opacity: 1,
						y: 0,
						x: 0,
						duration: 0.8,
						ease: 'power3.out',
						scrollTrigger: { trigger: note, start: 'top 85%' }
					}
				);
			});

			// stamp tampon
			const stamp = pressEl.querySelector('.press-stamp');
			if (stamp) {
				gsap.fromTo(
					stamp,
					{ scale: 0.4, rotate: -25, opacity: 0 },
					{
						scale: 1,
						rotate: -12,
						opacity: 1,
						duration: 0.7,
						ease: 'back.out(2.4)',
						scrollTrigger: { trigger: stamp, start: 'top 80%' }
					}
				);
			}
		};

		// ---------- GSAP : reveals ----------

		// Masthead split title fade in
		if (mastheadEl) {
			const tl = gsap.timeline();
			tl.from(mastheadEl.querySelectorAll('.mast-top, .mast-bottom'), {
				opacity: 0,
				y: -10,
				duration: 0.7,
				stagger: 0.08,
				ease: 'power2.out'
			})
				.from(
					mastheadEl.querySelector('.mast-title .serif:first-child'),
					{ y: '110%', opacity: 0, duration: 0.9, ease: 'expo.out' },
					0.05
				)
				.from(
					mastheadEl.querySelector('.mast-title em'),
					{ y: '110%', opacity: 0, duration: 0.9, ease: 'expo.out' },
					0.18
				);
		}

		// Hero kicker / title / dropcap / actions / pricecard stagger
		if (heroEl) {
			gsap.from(heroEl.querySelectorAll('.kicker, .hero-title, .dropcap, .byline, .hero-actions'), {
				opacity: 0,
				y: 24,
				duration: 0.9,
				stagger: 0.12,
				delay: 0.4,
				ease: 'power3.out'
			});

			gsap.from(heroEl.querySelector('.hero-rail'), {
				opacity: 0,
				x: -20,
				duration: 0.9,
				delay: 0.3,
				ease: 'power3.out'
			});

			if (pricecardEl) {
				gsap.from(pricecardEl, {
					opacity: 0,
					x: 40,
					rotate: 4,
					duration: 1,
					delay: 0.5,
					ease: 'power3.out'
				});
				gsap.to(pricecardEl, {
					y: -8,
					rotate: 1,
					duration: 4,
					ease: 'sine.inOut',
					yoyo: true,
					repeat: -1
				});
			}
		}

		// Stats count-up + reveal
		if (statsEl) {
			gsap.from(statsEl.querySelectorAll('.stat'), {
				opacity: 0,
				y: 30,
				stagger: 0.1,
				duration: 0.7,
				ease: 'power3.out',
				scrollTrigger: { trigger: statsEl, start: 'top 80%' }
			});

			statsEl.querySelectorAll('.stat-num').forEach((el) => {
				const target = Number(el.dataset.n || '0');
				const suffix = el.dataset.suffix || '';
				const padded = el.dataset.padded === '1';
				const obj = { v: 0 };
				gsap.to(obj, {
					v: target,
					duration: 1.6,
					ease: 'power2.out',
					scrollTrigger: { trigger: el, start: 'top 85%' },
					onUpdate: () => {
						let val = Math.round(obj.v);
						let str = padded && val < 10 ? '0' + val : String(val);
						if (target === Infinity) str = '∞';
						el.textContent = str + suffix;
					}
				});
			});
		}

		// WHY cards stagger
		if (whyGridEl) {
			gsap.from(whyGridEl.querySelectorAll('.why-card'), {
				opacity: 0,
				y: 40,
				stagger: 0.07,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: { trigger: whyGridEl, start: 'top 80%' }
			});
		}

		// BIG QUOTE : mask reveal on words + pin
		if (bigquoteEl && bigquoteTextEl) {
			const text = bigquoteTextEl.textContent;
			bigquoteTextEl.innerHTML = text
				.split(/(\s+)/)
				.map((w) => (w.trim() ? `<span class="word"><span class="inner">${w}</span></span>` : w))
				.join('');

			gsap.from(bigquoteEl.querySelector('.quote-mark'), {
				opacity: 0,
				y: 60,
				scale: 0.7,
				duration: 1,
				ease: 'expo.out',
				scrollTrigger: { trigger: bigquoteEl, start: 'top 75%' }
			});

			gsap.from(bigquoteTextEl.querySelectorAll('.word .inner'), {
				yPercent: 110,
				opacity: 0,
				stagger: 0.04,
				duration: 0.8,
				ease: 'expo.out',
				scrollTrigger: {
					trigger: bigquoteEl,
					start: 'top 70%',
					end: 'top 30%',
					scrub: 1
				}
			});

			gsap.from(bigquoteEl.querySelector('cite'), {
				opacity: 0,
				y: 20,
				duration: 0.8,
				ease: 'power2.out',
				scrollTrigger: { trigger: bigquoteEl, start: 'top 50%' }
			});
		}

		// VS cards : reveal + parallax tilt on hover
		if (vsHeadEl) {
			gsap.from(vsHeadEl, {
				opacity: 0,
				y: 30,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: { trigger: vsHeadEl, start: 'top 85%' }
			});
		}
		if (vsCardsEl) {
			const cards = vsCardsEl.querySelectorAll('.vs-card');
			gsap.from(cards, {
				opacity: 0,
				y: 50,
				stagger: 0.1,
				duration: 0.9,
				ease: 'power3.out',
				scrollTrigger: { trigger: vsCardsEl, start: 'top 80%' }
			});
			cards.forEach((card) => {
				const num = card.querySelector('.vs-diff');
				const onEnter = () =>
					gsap.to(num, { scale: 1.08, rotate: -2, duration: 0.4, ease: 'back.out(2)' });
				const onLeave = () =>
					gsap.to(num, { scale: 1, rotate: 0, duration: 0.4, ease: 'power2.out' });
				card.addEventListener('mouseenter', onEnter);
				card.addEventListener('mouseleave', onLeave);
				cleanups.push(() => {
					card.removeEventListener('mouseenter', onEnter);
					card.removeEventListener('mouseleave', onLeave);
				});
			});
		}

		// PROCESS step reveal
		if (procListEl) {
			gsap.from(procListEl.querySelectorAll('.proc-step'), {
				opacity: 0,
				x: -40,
				stagger: 0.1,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: { trigger: procListEl, start: 'top 75%' }
			});
		}

		// REAL projects
		if (realGridEl) {
			gsap.fromTo(
				realGridEl.querySelectorAll('.real-card'),
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.12,
					duration: 0.9,
					ease: 'power3.out',
					immediateRender: false,
					scrollTrigger: {
						trigger: realGridEl,
						start: 'top 90%',
						toggleActions: 'play none none none'
					}
				}
			);
		}

		// FAQ
		if (faqListEl) {
			gsap.from(faqListEl.querySelectorAll('.faq-item'), {
				opacity: 0,
				y: 18,
				stagger: 0.06,
				duration: 0.6,
				ease: 'power2.out',
				scrollTrigger: { trigger: faqListEl, start: 'top 85%' }
			});
		}

		// FINAL
		if (finalEl) {
			gsap.from(finalEl.querySelector('.final-box'), {
				opacity: 0,
				y: 50,
				scale: 0.96,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: { trigger: finalEl, start: 'top 80%' }
			});
		}

		// MARQUEE infinite scroll
		if (marqueeEl) {
			const inner = marqueeEl.querySelector('.marquee-inner');
			const w = inner.scrollWidth / 2;
			gsap.to(inner, { x: -w, duration: 30, ease: 'none', repeat: -1 });
		}

		// ATELIER reveal
		if (atelierEl) {
			gsap.from(atelierEl.querySelector('.atelier-frame'), {
				opacity: 0,
				y: 50,
				rotate: -1,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: { trigger: atelierEl, start: 'top 80%' }
			});
			gsap.from(atelierEl.querySelectorAll('.atelier-caption li'), {
				opacity: 0,
				x: -20,
				stagger: 0.08,
				duration: 0.6,
				ease: 'power2.out',
				scrollTrigger: { trigger: atelierEl, start: 'top 75%' }
			});
		}

		// STACK reveal
		if (stackEl) {
			gsap.from(stackEl.querySelectorAll('.stack-row'), {
				opacity: 0,
				x: -30,
				stagger: 0.06,
				duration: 0.7,
				ease: 'power3.out',
				scrollTrigger: { trigger: stackEl, start: 'top 80%' }
			});
		}

		// INCLUS reveal
		if (inclusEl) {
			gsap.from(inclusEl.querySelectorAll('.incl-item'), {
				opacity: 0,
				y: 24,
				stagger: 0.05,
				duration: 0.6,
				ease: 'power2.out',
				scrollTrigger: { trigger: inclusEl, start: 'top 80%' }
			});
		}

		// init press reveals après layout, puis refresh ScrollTrigger
		requestAnimationFrame(() => {
			initPress();
			requestAnimationFrame(() => ScrollTrigger.refresh());
		});

		// refresh aussi quand fonts chargent (impact layout cards)
		if (document.fonts && document.fonts.ready) {
			document.fonts.ready.then(() => ScrollTrigger.refresh());
		}
	});

	onDestroy(() => {
		cleanups.forEach((c) => {
			try {
				c();
			} catch {}
		});
	});
</script>

<svelte:head>
	<title>L’Édition spéciale — Agence web Belgique dès 500€ | Eléazar</title>
	<meta
		name="description"
		content="Agence web alternative à Ath, Tournai, Hainaut. Site web pro à partir de 500€ par un développeur freelance senior. Délais : 3 à 14 jours."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Geist+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="paper" class:ready={isReady}>
	<!-- MASTHEAD -->
	<header class="masthead" bind:this={mastheadEl}>
		<div class="mast-top">
			<span class="mast-side mono">VOL. VI · N° 06</span>
			<span class="mast-side mono">SAMEDI 26 AVRIL 2026 · ATH (B)</span>
		</div>

		<h1 class="mast-title">
			<span class="serif">L’Édition</span>
			<em class="serif">spéciale.</em>
		</h1>

		<div class="mast-bottom">
			<span class="mast-tag">— Le journal honnête du web belge —</span>
			<span class="mast-price">€ 0.00 · gratuit · imprimé localement</span>
		</div>
	</header>

	<!-- HERO ARTICLE -->
	<section class="hero" bind:this={heroEl}>
		<div class="hero-grid">
			<aside class="hero-rail">
				<span class="rail-label mono">À LA UNE</span>
				<ul class="rail-list">
					<li><span class="rail-num">01</span> Anatomie d’un devis</li>
					<li><span class="rail-num">02</span> Le match en chiffres</li>
					<li><span class="rail-num">02·b</span> Le bac à sable</li>
					<li><span class="rail-num">02·c</span> Sous le capot</li>
					<li><span class="rail-num">03</span> Le déroulé</li>
					<li><span class="rail-num">04</span> Sites livrés</li>
					<li><span class="rail-num">04·b</span> Ce qui est inclus</li>
					<li><span class="rail-num">05</span> Courrier des lecteurs</li>
				</ul>
				<div class="rail-stamp">
					<span>★</span>
					<span>EDITION</span>
					<span>HONEST</span>
					<span>★</span>
				</div>
			</aside>

			<article class="hero-article" bind:this={editoEl}>
				<span class="kicker">Édito · agence web</span>
				<h2 class="hero-title">
					Une agence web, <em>derrière</em> un seul homme. <br />
					<span class="hero-accent">Site pro dès 500 €.</span>
				</h2>

				<p class="dropcap" bind:this={dropcapEl}>
					<span class="d">P</span>endant que les agences belges facturent huit mille euros pour un
					site vitrine, un développeur freelance basé à Ath propose la même qualité — souvent
					meilleure — pour un dixième du prix. Pas de chef de projet inutile, pas de stagiaire qui
					code à votre place, pas de marge gonflée. Juste un développeur qui fait le job, et qui
					vous facture honnêtement. Le ticket d’entrée est à 500 €, négociable selon le projet. Les
					délais ? <strong>De trois à quatorze jours</strong> pour un site vitrine. Le site
					mjmsono.com a été livré en <strong>trois jours</strong> top chrono.
				</p>

				<p class="byline">
					Par <strong>Eléazar Klyuvitkin</strong> · développeur web depuis 2020 ·
					<em>eleazar@kltk.be</em>
				</p>

				<div class="hero-actions">
					<button class="btn btn-ink" onclick={emailMe}>Demander un devis</button>
					<a class="btn btn-paper" href="#vs">Lire le comparatif →</a>
				</div>
			</article>

			<aside class="hero-pricebox" bind:this={pricecardEl}>
				<span class="pb-label mono">DERNIÈRE MINUTE</span>
				<span class="pb-from">à partir de</span>
				<span class="pb-num">500€</span>
				<span class="pb-rule"></span>
				<p class="pb-text">
					Site vitrine, mise en ligne un an incluse, formation pour gérer vos textes et photos.
					Négociable selon vos besoins. Délai 3 à 14 jours.
				</p>
				<span class="pb-stamp">★ TARIF HONNÊTE ★</span>
			</aside>
		</div>
	</section>

	<!-- STATS BAND -->
	<section class="stats" bind:this={statsEl}>
		<span class="stats-rule"></span>
		<div class="stats-grid">
			{#each stats as s, i}
				<div class="stat" style="--i:{i}">
					<span
						class="stat-num serif"
						data-n={s.n === '∞' ? '0' : s.n}
						data-suffix={s.suffix}
						data-padded={s.n === '01' ? '1' : '0'}>{s.n}{s.suffix}</span
					>
					<span class="stat-lbl">{s.l}</span>
				</div>
			{/each}
		</div>
		<span class="stats-rule"></span>
	</section>

	<!-- WHY -->
	<section class="why">
		<header class="section-head">
			<span class="kicker">§ 01 · Anatomie d’un devis</span>
			<h2 class="big-title serif">
				<em>Pourquoi</em> une agence facture <span class="hl">huit mille euros</span> ?
			</h2>
			<p class="lede">
				Le prix d’un site en agence n’est pas le prix du site. C’est le prix de tout le reste.
			</p>
		</header>

		<div class="why-grid" bind:this={whyGridEl}>
			{#each why as w, i}
				<article class="why-card" style="--i:{i}">
					<div class="why-head">
						<span class="why-tag mono">{w.tag}</span>
						<span class="why-num serif">0{i + 1}</span>
					</div>
					<h3 class="serif">{w.t}</h3>
					<p>{w.d}</p>
					<p class="why-pull">{w.c}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- BIG QUOTE -->
	<section class="bigquote" bind:this={bigquoteEl}>
		<span class="quote-mark serif">“</span>
		<blockquote class="serif" bind:this={bigquoteTextEl}>
			Pour 80% des projets PME, une agence c’est cinq personnes payées pour un boulot qu’une seule
			peut faire mieux, plus vite, et pour beaucoup moins cher.
		</blockquote>
		<cite class="mono">— Constat, après 6 ans dans le métier</cite>
	</section>

	<!-- ATELIER : Matter.js sandbox -->
	<!-- <section class="atelier" bind:this={atelierEl}>
		<header class="section-head">
			<span class="kicker">§ 02·b · Démonstration</span>
			<h2 class="big-title serif">
				Un site, ce n’est pas que <em>du texte qui défile.</em>
			</h2>
			<p class="lede">
				La plupart des agences livrent du HTML décoré. Voici ce qu’on peut faire en plus, sans
				changer de prix : de la physique, de la 3D, des cartes, de l’interactif. Attrapez les blocs
				ci-dessous.
			</p>
		</header>

		<div class="atelier-layout">
			<div class="atelier-frame">
				<Atelier />
			</div>

			<aside class="atelier-caption">
				<span class="atelier-eye mono">[ ce que vous regardez ]</span>
				<ul>
					<li>
						<span class="num serif">i.</span>
						<div>
							<strong>Moteur physique 2D</strong> embarqué dans la page. Collisions, gravité, friction
							— calculées en direct.
						</div>
					</li>
					<li>
						<span class="num serif">ii.</span>
						<div>
							<strong>Drag &amp; drop natif.</strong> Cliquez, glissez, lancez. Aucun framework jouet
							: c’est la même tech utilisée par certains jeux web pro.
						</div>
					</li>
					<li>
						<span class="num serif">iii.</span>
						<div>
							<strong>Bibliothèque : Matter.js.</strong> 90 ko, libre, performante. Posable sur n’importe
							quel site existant en deux jours.
						</div>
					</li>
				</ul>

				<p class="atelier-pitch serif">
					Une vitrine de plombier n’a probablement pas besoin de ça. <em
						>Un site qui doit marquer les esprits, oui.</em
					>
				</p>
			</aside>
		</div>
	</section> -->

	<!-- INTERMÈDE : feuille de presse imprimée -->
	<section class="press" bind:this={pressEl} aria-label="Intermède éditorial">
		<div class="press-margin press-margin-l mono" aria-hidden="true">
			<span>EDITION · VI</span>
			<span>·</span>
			<span>SORTIE DE PRESSE</span>
		</div>
		<div class="press-margin press-margin-r mono" aria-hidden="true">
			<span>500€</span>
			<span>·</span>
			<span>3 JOURS</span>
			<span>·</span>
			<span>ATH (B)</span>
		</div>

		<div class="press-inner">
			<header class="press-head">
				<span class="press-kicker mono">§ Intermède · sortie de presse</span>
				<h2 class="press-title serif">
					L’encre n’a pas encore séché. <em>Le site est déjà en ligne.</em>
				</h2>
				<p class="press-lede">
					Chaque livraison ressemble à un journal qui sort de la rotative : objet pensé, mis en
					page, plié, prêt à être lu.
				</p>
			</header>

			<article class="press-sheet" bind:this={pressSheetEl}>
				<div class="press-sheet-edge" aria-hidden="true"></div>

				<div class="press-masthead">
					<span class="ps-vol mono">VOL. VI · N°06 · 26 AVRIL 2026</span>
					<h3 class="ps-title serif">L’Édition <em>spéciale</em></h3>
					<span class="ps-tag mono">— Le journal honnête du web belge —</span>
				</div>

				<div class="press-rule" aria-hidden="true"></div>

				<div class="press-grid press-grid-tight">
					<div class="press-col press-col-side">
						<span class="press-eyebrow mono">TARIFS · à partir de</span>
						<dl class="press-prices">
							<div>
								<dt>Vitrine une page</dt>
								<dd class="dots"></dd>
								<dd class="val">500 €</dd>
							</div>
							<div>
								<dt>Vitrine multi-pages</dt>
								<dd class="dots"></dd>
								<dd class="val">1 200 €</dd>
							</div>
							<div>
								<dt>Sur mesure</dt>
								<dd class="dots"></dd>
								<dd class="val">1 500 €</dd>
							</div>
							<div>
								<dt>Boutique en ligne</dt>
								<dd class="dots"></dd>
								<dd class="val">2 000 €</dd>
							</div>
							<div>
								<dt>Plateforme / app</dt>
								<dd class="dots"></dd>
								<dd class="val">sur devis</dd>
							</div>
						</dl>
					</div>

					<div class="press-col press-col-side">
						<span class="press-eyebrow mono">SUIVI MENSUEL · option</span>
						<dl class="press-prices">
							<div>
								<dt>Petites évolutions</dt>
								<dd class="dots"></dd>
								<dd class="val">30 €/m</dd>
							</div>
							<div>
								<dt>Maintenance + sécurité</dt>
								<dd class="dots"></dd>
								<dd class="val">60 €/m</dd>
							</div>
							<div>
								<dt>SEO mensuel</dt>
								<dd class="dots"></dd>
								<dd class="val">120 €/m</dd>
							</div>
						</dl>

						<span class="press-eyebrow mono">CONTACT</span>
						<address class="press-contact">
							<strong>eleazar@kltk.be</strong><br />
							+32 485 700 737
						</address>
					</div>
				</div>

				<div class="press-stamp" aria-hidden="true">
					<span class="stamp-line">★ TARIF ★</span>
					<span class="stamp-num serif">500€</span>
					<span class="stamp-line">★ HONNÊTE ★</span>
				</div>
			</article>

			<aside class="press-notes">
				<div class="press-note" data-i="0">
					<span class="note-num serif">i.</span>
					<h4 class="serif">Pensé. Plié. Livré.</h4>
					<p>
						Comme un numéro de journal : un objet abouti, une mise en page lisible, une voix
						éditoriale claire.
					</p>
				</div>
				<div class="press-note" data-i="1">
					<span class="note-num serif">ii.</span>
					<h4 class="serif">Le devis tient sur une feuille.</h4>
					<p>
						Pas un PDF de douze pages. Une ligne, un prix, une signature. Les heures masquées dans
						des « frais de gestion » n’existent pas chez moi.
					</p>
				</div>
				<div class="press-note" data-i="2">
					<span class="note-num serif">iii.</span>
					<h4 class="serif">Vous gardez les clés.</h4>
					<p>
						Code source sur GitHub à votre nom, hébergement à votre nom, nom de domaine à votre nom.
						Si on se sépare, vous repartez avec tout — sans avocat.
					</p>
				</div>
			</aside>
		</div>

		<div class="press-marks mono" aria-hidden="true">
			<span>★</span><span>EDITION</span><span>HONEST</span><span>★</span>
		</div>
	</section>

	<!-- VS CARDS -->
	<section class="vs" id="vs">
		<header class="section-head" bind:this={vsHeadEl}>
			<span class="kicker">§ 02 · Le comparatif</span>
			<h2 class="big-title serif">
				Six chiffres. <em>Un seul gagnant.</em>
			</h2>
			<p class="lede">
				Pas un tableau Excel. Six fiches, six chiffres, six raisons de passer par un freelance.
			</p>
		</header>

		<div class="vs-cards" bind:this={vsCardsEl}>
			{#each vsCards as card, i}
				<article class="vs-card" style="--i:{i}">
					<header class="vs-card-head">
						<span class="vs-label mono">[ FICHE 0{i + 1} ]</span>
						<span class="vs-diff serif">{card.diff}</span>
					</header>

					<h3 class="vs-card-title serif">{card.label}</h3>

					<div class="vs-rows">
						<div class="vs-line loss">
							<span class="vs-tag mono">A · agence</span>
							<span class="vs-val serif">{card.a.v}</span>
						</div>
						<div class="vs-line win">
							<span class="vs-tag mono">B · eleazar</span>
							<span class="vs-val serif">{card.b.v}</span>
						</div>
					</div>

					<p class="vs-note">{card.note}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- MARQUEE -->
	<div class="marquee" bind:this={marqueeEl} aria-hidden="true">
		<div class="marquee-inner">
			{#each Array(2) as _}
				<span class="serif italic">À partir de 500 €</span>
				<span class="dot">●</span>
				<span class="serif italic">3 à 14 jours</span>
				<span class="dot">●</span>
				<span class="serif italic">Hainaut · Belgique</span>
				<span class="dot">●</span>
				<span class="serif italic">Vitrine · Boutique en ligne</span>
				<span class="dot">●</span>
				<span class="serif italic">eleazar@kltk.be</span>
				<span class="dot">●</span>
			{/each}
		</div>
	</div>

	<!-- STACK -->
	<section class="stack" bind:this={stackEl}>
		<header class="section-head">
			<span class="kicker">§ 02·c · Sous le capot</span>
			<h2 class="big-title serif">
				La <em>vraie</em> liste des outils. <span class="hl">Pas du jargon.</span>
			</h2>
			<p class="lede">
				Demandez à une agence sa stack, vous aurez un PDF marketing. La voici, sans filtre, avec ce
				que chaque pièce apporte concrètement.
			</p>
		</header>

		<div class="stack-table">
			<div class="stack-row stack-head">
				<span class="mono">outil</span>
				<span class="mono">rôle</span>
				<span class="mono">à quoi ça sert pour vous</span>
			</div>
			{#each stack as s, i}
				<div class="stack-row" style="--i:{i}">
					<span class="stack-name serif">{s.n}</span>
					<span class="stack-role mono">{s.v}</span>
					<span class="stack-desc">{s.d}</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- PROCESS -->
	<section class="process">
		<header class="section-head">
			<span class="kicker">§ 03 · Le déroulé</span>
			<h2 class="big-title serif">
				<em>Six étapes.</em> Aucune surprise.
			</h2>
		</header>

		<ol class="proc" bind:this={procListEl}>
			{#each process as step, i}
				<li class="proc-step" style="--i:{i}">
					<span class="proc-n serif">{step.n}</span>
					<div class="proc-body">
						<h3 class="serif">{step.t}</h3>
						<p>{step.d}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<!-- REAL -->
	<section class="real">
		<header class="section-head">
			<span class="kicker">§ 04 · Sélection</span>
			<h2 class="big-title serif">
				Des sites <em>livrés.</em> <span class="hl">Pas des promesses.</span>
			</h2>
			<p class="lede">
				Chaque carte indique le délai réel de livraison. MJM Sonorisation, par exemple, a été bouclé
				en trois jours.
			</p>
		</header>

		<div class="real-grid" bind:this={realGridEl}>
			{#each projets as p, i}
				<a class="real-card" href={p.link} target="_blank" rel="noopener" style="--i:{i}">
					<div class="real-img">
						<!-- Image placeholder Unsplash - à remplacer par client -->
						<img src={p.image} alt={p.name} loading="lazy" />
						<span class="real-delay mono">livré en {p.delay}</span>
					</div>
					<div class="real-meta">
						<span class="real-cat mono">{p.cat} · {p.date}</span>
						<h3 class="serif">{p.name}</h3>
						<p>{p.description}</p>
						<span class="real-go mono">
							lire l’article → {p.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
						</span>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- INCLUS -->
	<section class="inclus" bind:this={inclusEl}>
		<header class="section-head">
			<span class="kicker">§ 04·b · Le ticket de caisse</span>
			<h2 class="big-title serif">
				Ce qui est <em>dans le prix.</em> <span class="hl">Vraiment dans le prix.</span>
			</h2>
			<p class="lede">
				Pas d’options cachées, pas de pack premium déguisé. Voici les huit points livrés avec chaque
				projet, du plus petit au plus gros.
			</p>
		</header>

		<ul class="incl-list">
			{#each inclus as it, i}
				<li class="incl-item" style="--i:{i}">
					<span class="incl-check serif" aria-hidden="true">✓</span>
					<div class="incl-body">
						<h3 class="serif">{it.t}</h3>
						<p>{it.d}</p>
					</div>
					<span class="incl-num mono">0{i + 1}</span>
				</li>
			{/each}
		</ul>

		<p class="incl-foot mono">
			★ Tout listé sur le devis. ★ Aucune ligne ajoutée en cours de route. ★ Si je l’oublie, c’est
			offert.
		</p>
	</section>

	<!-- FAQ -->
	<section class="faq">
		<header class="section-head">
			<span class="kicker">§ 05 · Courrier des lecteurs</span>
			<h2 class="big-title serif">
				Six <em>questions.</em> Six <span class="hl">réponses.</span>
			</h2>
		</header>

		<ul class="faq-list" bind:this={faqListEl}>
			{#each faq as f, i}
				<li class="faq-item" class:open={openFaq === i}>
					<button class="faq-q" onclick={() => toggleFaq(i)} aria-expanded={openFaq === i}>
						<span class="qn mono">Q.0{i + 1}</span>
						<span class="qt serif">{f.q}</span>
						<span class="qx">{openFaq === i ? '–' : '+'}</span>
					</button>
					{#if openFaq === i}
						<div class="faq-a">
							<span class="qa-prefix mono">R.</span>
							<p>{f.a}</p>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</section>

	<!-- FINAL -->
	<section class="final" bind:this={finalEl}>
		<div class="final-box">
			<span class="kicker">§ 06 · Maintenant</span>
			<h2 class="big-title serif">
				Votre projet <em>mérite mieux</em> qu’un devis à 8 000 €.
			</h2>
			<p class="lede">
				Discussion gratuite. Sans engagement. Sans commercial qui vous rappelle six fois.
			</p>

			<div class="final-actions">
				<button class="btn btn-ink" onclick={emailMe}>Écrire un email</button>
				<a class="btn btn-paper" href="tel:+32485700737">+32 485 700 737</a>
			</div>

			<p class="footnote mono">
				Mainvault (Ath) · Hainaut occidental · Belgique entière en remote · eleazar@kltk.be
			</p>
		</div>
	</section>

	<!-- COLOPHON -->
	<footer class="colophon">
		<div class="colo-grid">
			<div>
				<span class="mono small">Édité par</span>
				<p class="serif">Eléazar Klyuvitkin</p>
			</div>
			<div>
				<span class="mono small">Imprimé à</span>
				<p class="serif">Mainvault, Belgique</p>
			</div>
			<div>
				<span class="mono small">Tirage</span>
				<p class="serif">∞ exemplaires numériques</p>
			</div>
			<div>
				<span class="mono small">Prix de vente</span>
				<p class="serif">Gratuit · à partir de 500 €</p>
			</div>
		</div>
	</footer>
</div>

<style lang="scss">
	/* ---------- LOCAL RESET ---------- */
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}
	:global(*) {
		margin: 0;
		padding: 0;
	}
	:global(html:focus-within) {
		scroll-behavior: smooth;
	}
	:global(a:not([class])) {
		text-decoration-skip-ink: auto;
	}
	:global(img),
	:global(picture),
	:global(svg),
	:global(video),
	:global(canvas) {
		max-width: 100%;
		height: auto;
		vertical-align: middle;
		font-style: italic;
		background-repeat: no-repeat;
		background-size: cover;
	}
	:global(input),
	:global(button),
	:global(textarea),
	:global(select) {
		font: inherit;
	}
	:global(body),
	:global(html) {
		scroll-behavior: smooth;
	}
	@media (prefers-reduced-motion: reduce) {
		:global(html:focus-within) {
			scroll-behavior: auto;
		}
		:global(*),
		:global(*::before),
		:global(*::after) {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
			transition: none;
		}
	}

	$bp-small: 676px;
	$bp-medium: 1024px;

	:global(.paper *) {
		font-family: 'Bricolage Grotesque', system-ui, sans-serif;
	}
	:global(.paper .serif) {
		font-family: 'Playfair Display', Georgia, serif;
		font-weight: 400;
	}
	:global(.paper .mono) {
		font-family: 'Geist Mono', ui-monospace, monospace;
	}

	.paper {
		--p-bg: #f6efde;
		--p-bg-2: #efe5cd;
		--p-ink: #14110d;
		--p-ink-soft: #4f4738;
		--p-rule: #1a1612;
		--p-orange: #ff4500;
		--p-green: #9fe870;
		--p-pink: #ffb3c1;

		position: relative;
		background: var(--p-bg);
		color: var(--p-ink);
		min-height: 100vh;
		overflow-x: hidden;
		isolation: isolate;
		opacity: 0;
		transition: opacity 0.4s ease;

		&.ready {
			opacity: 1;
		}

		&::before {
			content: '';
			position: fixed;
			inset: 0;
			pointer-events: none;
			z-index: 0;
			opacity: 0.45;
			mix-blend-mode: multiply;
			background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.16 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
		}
	}

	.mono {
		font-family: 'Geist Mono', ui-monospace, monospace;
		letter-spacing: 0.05em;

		&.small {
			font-size: 0.7rem;
			text-transform: uppercase;
			letter-spacing: 0.15em;
		}
	}

	.serif {
		font-family: 'Playfair Display', Georgia, serif;
		font-weight: 400;

		&.italic {
			font-style: italic;
		}
	}

	.lede {
		font-size: clamp(1.05rem, 1.6vw, 1.3rem);
		line-height: 1.5;
		max-width: 60ch;
		color: var(--p-ink-soft);
		font-weight: 300;
	}

	/* ---------- MASTHEAD ---------- */
	.masthead {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(1.25rem, 3vw, 2rem) clamp(1rem, 4vw, 3rem) 0;
	}

	.mast-top {
		display: flex;
		justify-content: space-between;
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		padding-bottom: 0.6rem;
		border-bottom: 2px solid var(--p-rule);
		color: var(--p-ink);
	}

	.mast-title {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: clamp(0.5rem, 2vw, 1.5rem);
		font-family: 'Playfair Display', Georgia, serif;
		font-weight: 400;
		font-size: clamp(4rem, 13vw, 12rem);
		line-height: 0.9;
		letter-spacing: -0.04em;
		padding: clamp(0.5rem, 2vw, 1.5rem) 0;
		text-align: center;
		overflow: hidden;

		em {
			font-style: italic;
			color: var(--p-orange);
		}
	}

	.mast-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-top: 0.6rem;
		border-top: 6px double var(--p-rule);
		font-size: 0.78rem;
		letter-spacing: 0.05em;

		.mast-tag {
			font-style: italic;
			color: var(--p-ink-soft);
		}

		.mast-price {
			font-family: 'Geist Mono', ui-monospace, monospace;
			letter-spacing: 0.12em;
			text-transform: uppercase;
			font-size: 0.7rem;
		}
	}

	/* ---------- HERO ---------- */
	.hero {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 4vw, 3rem);
	}

	.hero-grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1.5rem, 3vw, 2.5rem);

		@media (min-width: $bp-medium) {
			grid-template-columns: 220px 1fr 280px;
		}
	}

	.hero-rail {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-right: 1rem;
		border-right: 1px solid var(--p-rule);
		font-size: 0.85rem;

		@media (max-width: $bp-medium) {
			border-right: none;
			border-bottom: 1px solid var(--p-rule);
			padding-right: 0;
			padding-bottom: 1rem;
		}

		.rail-label {
			font-size: 0.7rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--p-orange);
		}

		.rail-list {
			list-style: none;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			border-top: 1px solid var(--p-rule);
			padding-top: 0.75rem;

			li {
				display: flex;
				gap: 0.6rem;
				font-style: italic;
				font-family: 'Playfair Display', Georgia, serif;
				font-size: 1rem;
				border-bottom: 1px dotted var(--p-rule);
				padding-bottom: 0.45rem;

				&:last-child {
					border-bottom: none;
				}
			}

			.rail-num {
				font-family: 'Geist Mono', ui-monospace, monospace;
				font-style: normal;
				font-size: 0.75rem;
				color: var(--p-orange);
				letter-spacing: 0.1em;
				min-width: 24px;
			}
		}

		.rail-stamp {
			margin-top: auto;
			align-self: flex-start;
			border: 2px solid var(--p-rule);
			padding: 0.6rem 0.8rem;
			display: flex;
			gap: 0.5rem;
			font-family: 'Geist Mono', ui-monospace, monospace;
			font-size: 0.7rem;
			letter-spacing: 0.18em;
			color: var(--p-rule);
			transform: rotate(-3deg);
			background: var(--p-bg-2);
		}
	}

	.hero-article {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.kicker {
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-size: 0.72rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--p-orange);
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		align-self: flex-start;

		&::before {
			content: '';
			width: 24px;
			height: 2px;
			background: var(--p-orange);
		}
	}

	.hero-title {
		font-family: 'Playfair Display', Georgia, serif;
		font-weight: 400;
		font-size: clamp(2.4rem, 6vw, 5rem);
		line-height: 0.95;
		letter-spacing: -0.02em;
		color: var(--p-ink);

		em {
			font-style: italic;
			color: var(--p-orange);
		}

		.hero-accent {
			display: inline-block;
			background: var(--p-green);
			padding: 0 0.4rem;
			margin-top: 0.3rem;
			transform: rotate(-0.5deg);
			font-style: italic;
		}
	}

	.dropcap {
		font-size: clamp(1rem, 1.4vw, 1.15rem);
		line-height: 1.6;
		max-width: 60ch;
		color: var(--p-ink);
		text-align: justify;
		hyphens: auto;
		font-weight: 300;

		.d {
			float: left;
			font-family: 'Playfair Display', Georgia, serif;
			font-weight: 700;
			font-size: 5rem;
			line-height: 0.85;
			padding: 0.4rem 0.6rem 0 0;
			color: var(--p-orange);
		}

		strong {
			font-weight: 600;
			background: var(--p-pink);
			padding: 0 0.2em;
		}
	}

	.byline {
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-size: 0.78rem;
		letter-spacing: 0.05em;
		color: var(--p-ink-soft);
		padding-top: 0.5rem;
		border-top: 1px dotted var(--p-rule);

		strong {
			font-weight: 600;
			color: var(--p-ink);
		}
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.85rem 1.4rem;
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		text-decoration: none;
		cursor: pointer;
		border: 2px solid var(--p-rule);
		background: transparent;
		color: var(--p-ink);
		border-radius: 0;
		transition:
			background 0.2s ease,
			color 0.2s ease,
			transform 0.2s ease;

		&:hover {
			transform: translate(-2px, -2px);
			box-shadow: 4px 4px 0 var(--p-rule);
		}

		&.btn-ink {
			background: var(--p-ink);
			color: var(--p-bg);
			border-color: var(--p-ink);

			&:hover {
				background: var(--p-orange);
				border-color: var(--p-orange);
				color: #fff;
				box-shadow: 4px 4px 0 var(--p-ink);
			}
		}

		&.btn-paper:hover {
			background: var(--p-green);
			border-color: var(--p-rule);
		}
	}

	.hero-pricebox {
		position: relative;
		background: var(--p-ink);
		color: var(--p-bg);
		padding: 1.5rem 1.75rem 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		border: 2px solid var(--p-ink);
		align-self: start;
		will-change: transform;

		.pb-label {
			font-size: 0.7rem;
			letter-spacing: 0.22em;
			color: var(--p-orange);
			text-transform: uppercase;
		}

		.pb-from {
			font-family: 'Playfair Display', Georgia, serif;
			font-style: italic;
			font-size: 1.1rem;
			color: var(--p-pink);
			margin-top: 0.4rem;
		}

		.pb-num {
			font-family: 'Playfair Display', Georgia, serif;
			font-weight: 700;
			font-size: clamp(4rem, 8vw, 6.5rem);
			line-height: 0.85;
			color: var(--p-green);
			letter-spacing: -0.04em;
		}

		.pb-rule {
			display: block;
			height: 6px;
			border-top: 2px solid var(--p-bg);
			border-bottom: 1px solid var(--p-bg);
			margin: 0.6rem 0;
		}

		.pb-text {
			font-size: 0.85rem;
			line-height: 1.5;
			color: var(--p-bg);
			opacity: 0.85;
			max-width: 30ch;
		}

		.pb-stamp {
			align-self: flex-start;
			margin-top: 0.8rem;
			padding: 0.4rem 0.7rem;
			background: var(--p-orange);
			color: #fff;
			font-family: 'Geist Mono', ui-monospace, monospace;
			font-size: 0.7rem;
			letter-spacing: 0.18em;
			border: 2px solid var(--p-bg);
			transform: rotate(-2deg);
		}
	}

	/* ---------- STATS ---------- */
	.stats {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 clamp(1rem, 4vw, 3rem);
	}

	.stats-rule {
		display: block;
		height: 6px;
		border-top: 2px solid var(--p-rule);
		border-bottom: 1px solid var(--p-rule);
		margin: 1rem 0;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0;

		@media (min-width: $bp-medium) {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stat {
		padding: 1.25rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		border-right: 1px solid var(--p-rule);

		&:last-child {
			border-right: none;
		}

		&:nth-child(2) .stat-num,
		&:nth-child(4) .stat-num {
			color: var(--p-orange);
		}

		.stat-num {
			font-style: italic;
			font-size: clamp(2.8rem, 5.5vw, 4.5rem);
			line-height: 0.85;
			letter-spacing: -0.03em;
		}

		.stat-lbl {
			font-size: 0.85rem;
			line-height: 1.45;
			color: var(--p-ink-soft);
			max-width: 24ch;
		}
	}

	/* ---------- SECTION HEAD ---------- */
	.section-head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: clamp(2rem, 4vw, 3rem);
		max-width: 900px;
	}

	.big-title {
		font-size: clamp(2.4rem, 6vw, 5rem);
		line-height: 0.95;
		letter-spacing: -0.02em;
		color: var(--p-ink);

		em {
			font-style: italic;
			color: var(--p-orange);
		}

		.hl {
			background: var(--p-green);
			padding: 0 0.3rem;
			display: inline-block;
			transform: rotate(-0.5deg);
			font-style: italic;
		}
	}

	/* ---------- WHY ---------- */
	.why {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 2rem auto 0;
		padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem);
		border-top: 1px solid var(--p-rule);
	}

	.why-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		border-top: 2px solid var(--p-rule);
		border-left: 1px solid var(--p-rule);

		@media (min-width: $bp-small) {
			grid-template-columns: 1fr 1fr;
		}

		@media (min-width: $bp-medium) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.why-card {
		padding: 1.5rem 1.5rem 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		border-right: 1px solid var(--p-rule);
		border-bottom: 1px solid var(--p-rule);
		background: transparent;
		transition: background 0.3s ease;

		&:hover {
			background: var(--p-bg-2);

			h3 {
				color: var(--p-orange);
			}
		}

		.why-head {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			padding-bottom: 0.5rem;
			border-bottom: 1px dotted var(--p-rule);
		}

		.why-tag {
			font-size: 0.7rem;
			text-transform: uppercase;
			letter-spacing: 0.18em;
			color: var(--p-ink-soft);
		}

		.why-num {
			font-style: italic;
			font-size: 1.5rem;
			color: var(--p-orange);
		}

		h3 {
			font-style: italic;
			font-size: clamp(1.4rem, 2.4vw, 1.85rem);
			line-height: 1.05;
			color: var(--p-ink);
			transition: color 0.25s ease;
		}

		p {
			font-size: 0.95rem;
			line-height: 1.55;
			color: var(--p-ink-soft);
		}

		.why-pull {
			margin-top: 0.4rem;
			font-family: 'Playfair Display', Georgia, serif;
			font-style: italic;
			font-weight: 600;
			color: var(--p-ink);
			border-left: 3px solid var(--p-orange);
			padding-left: 0.75rem;
			font-size: 1rem;
		}
	}

	/* ---------- BIG QUOTE ---------- */
	.bigquote {
		position: relative;
		z-index: 2;
		max-width: 1100px;
		margin: clamp(2rem, 4vw, 4rem) auto;
		padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem);
		border-top: 6px double var(--p-rule);
		border-bottom: 6px double var(--p-rule);
		text-align: center;

		.quote-mark {
			display: block;
			font-size: clamp(5rem, 10vw, 9rem);
			line-height: 0.5;
			color: var(--p-orange);
			margin-bottom: 0.5rem;
		}

		blockquote {
			font-size: clamp(1.5rem, 3.5vw, 2.6rem);
			line-height: 1.2;
			letter-spacing: -0.01em;
			color: var(--p-ink);
			max-width: 26ch;
			margin: 0 auto;
		}

		:global(.word) {
			display: inline-block;
			overflow: hidden;
			vertical-align: bottom;
		}

		:global(.word .inner) {
			display: inline-block;
		}

		cite {
			display: block;
			margin-top: 1.5rem;
			font-style: normal;
			font-size: 0.78rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--p-ink-soft);
		}
	}

	/* ---------- INTERMÈDE PRESSE ---------- */
	.press {
		position: relative;
		z-index: 2;
		width: 100%;
		overflow: hidden;
		background:
			repeating-linear-gradient(
				0deg,
				rgba(20, 17, 13, 0.025) 0,
				rgba(20, 17, 13, 0.025) 1px,
				transparent 1px,
				transparent 28px
			),
			var(--p-bg-2);
		border-top: 6px double var(--p-rule);
		border-bottom: 6px double var(--p-rule);
		padding: clamp(3rem, 7vw, 6rem) 0 clamp(4rem, 8vw, 7rem);

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			pointer-events: none;
			background:
				radial-gradient(circle at 82% 22%, rgba(255, 69, 0, 0.1), transparent 55%),
				radial-gradient(circle at 18% 78%, rgba(159, 232, 112, 0.1), transparent 55%);
			z-index: 1;
		}

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			pointer-events: none;
			background-image: radial-gradient(rgba(20, 17, 13, 0.06) 1px, transparent 1px);
			background-size: 4px 4px;
			mix-blend-mode: multiply;
			opacity: 0.5;
			z-index: 1;
		}
	}

	.press-margin {
		position: absolute;
		top: 0;
		bottom: 0;
		writing-mode: vertical-rl;
		display: none;
		gap: 0.7rem;
		padding: 1.25rem 0;
		font-size: 0.65rem;
		letter-spacing: 0.32em;
		color: var(--p-ink-soft);
		opacity: 0.55;
		z-index: 2;

		@media (min-width: 980px) {
			display: flex;
		}

		&-l {
			left: clamp(0.6rem, 1.2vw, 1.2rem);
			border-right: 1px dotted var(--p-rule);
		}
		&-r {
			right: clamp(0.6rem, 1.2vw, 1.2rem);
			border-left: 1px dotted var(--p-rule);
			transform: rotate(180deg);
		}
	}

	.press-inner {
		position: relative;
		z-index: 3;
		width: 100%;
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 clamp(1.25rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 4vw, 3.5rem);

		@media (min-width: 980px) {
			grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
			grid-template-areas:
				'head head'
				'sheet notes';
			align-items: start;
		}
	}

	.press-head {
		grid-area: head;
		max-width: 760px;
		display: grid;
		gap: 0.85rem;

		.press-kicker {
			font-size: 0.72rem;
			letter-spacing: 0.22em;
			text-transform: uppercase;
			color: var(--p-orange);
			padding-bottom: 0.4rem;
			border-bottom: 1px dotted var(--p-rule);
			justify-self: start;
		}

		.press-title {
			font-size: clamp(2rem, 4.5vw, 3.6rem);
			line-height: 1.02;
			letter-spacing: -0.01em;
			color: var(--p-ink);

			em {
				font-style: italic;
				color: var(--p-orange);
				display: inline-block;
			}
		}

		.press-lede {
			font-size: clamp(1rem, 1.4vw, 1.15rem);
			line-height: 1.55;
			color: var(--p-ink-soft);
			max-width: 56ch;
		}
	}

	.press-sheet {
		grid-area: sheet;
		position: relative;
		background: var(--p-bg);
		border: 2px solid var(--p-rule);
		box-shadow:
			10px 10px 0 var(--p-orange),
			18px 18px 30px -10px rgba(20, 17, 13, 0.35);
		padding: clamp(1.4rem, 2.6vw, 2.4rem);
		transform: rotate(-0.8deg);
		transform-origin: top left;
		overflow: hidden;

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			pointer-events: none;
			background:
				linear-gradient(180deg, rgba(20, 17, 13, 0.05), transparent 14%),
				linear-gradient(0deg, rgba(20, 17, 13, 0.05), transparent 12%);
		}

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			pointer-events: none;
			background-image: radial-gradient(rgba(20, 17, 13, 0.05) 1px, transparent 1px);
			background-size: 3px 3px;
			mix-blend-mode: multiply;
			opacity: 0.7;
		}
	}

	.press-sheet-edge {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: linear-gradient(
			135deg,
			transparent calc(100% - 28px),
			var(--p-bg-2) calc(100% - 28px) 100%
		);
		border-bottom: 0;
	}

	.press-masthead {
		display: grid;
		gap: 0.35rem;
		text-align: center;
		padding-bottom: 0.6rem;

		.ps-vol {
			font-size: 0.65rem;
			letter-spacing: 0.28em;
			color: var(--p-ink-soft);
		}

		.ps-title {
			font-size: clamp(2.2rem, 5vw, 3.4rem);
			line-height: 1;
			letter-spacing: -0.02em;
			color: var(--p-ink);

			em {
				font-style: italic;
				color: var(--p-orange);
			}
		}

		.ps-tag {
			font-size: 0.7rem;
			letter-spacing: 0.16em;
			color: var(--p-ink-soft);
		}
	}

	.press-rule {
		height: 6px;
		border-top: 2px solid var(--p-rule);
		border-bottom: 1px solid var(--p-rule);
		margin: 0.6rem 0 1.2rem;
	}

	.press-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.4rem;
		column-rule: 1px dotted var(--p-rule);
		column-gap: 1.6rem;

		@media (min-width: 540px) {
			grid-template-columns: 1.4fr 1fr;
		}
	}

	.press-col {
		display: grid;
		gap: 0.85rem;

		& + .press-col {
			padding-left: 1.2rem;
			border-left: 1px dotted var(--p-rule);

			@media (max-width: 539px) {
				padding-left: 0;
				border-left: 0;
				padding-top: 1rem;
				border-top: 1px dotted var(--p-rule);
			}
		}
	}

	.press-eyebrow {
		font-size: 0.62rem;
		letter-spacing: 0.24em;
		color: var(--p-orange);
		text-transform: uppercase;
		padding-bottom: 0.25rem;
		border-bottom: 1px solid var(--p-rule);
	}

	.press-grid-tight {
		gap: 1.4rem;

		@media (min-width: 540px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.press-prices {
		margin: 0;
		display: grid;
		gap: 0.35rem;
		font-size: 0.85rem;
		color: var(--p-ink);

		div {
			display: grid;
			grid-template-columns: auto 1fr auto;
			align-items: baseline;
			gap: 0.4rem;
		}

		dt {
			font-family: 'Playfair Display', Georgia, serif;
			font-style: italic;
		}

		.dots {
			border-bottom: 1px dotted var(--p-rule);
			height: 1px;
			margin-bottom: 0.25rem;
		}

		.val {
			font-family: 'Playfair Display', Georgia, serif;
			font-weight: 700;
			color: var(--p-orange);
		}
	}

	.press-contact {
		font-style: normal;
		font-size: 0.85rem;
		line-height: 1.5;
		color: var(--p-ink);

		strong {
			color: var(--p-orange);
		}
	}

	.press-stamp {
		position: absolute;
		right: clamp(1rem, 3vw, 2.4rem);
		bottom: clamp(1rem, 3vw, 2rem);
		display: grid;
		place-items: center;
		gap: 0.15rem;
		padding: 0.7rem 1.1rem;
		border: 3px solid var(--p-orange);
		border-radius: 4px;
		background: rgba(255, 69, 0, 0.05);
		color: var(--p-orange);
		transform: rotate(-12deg);
		text-align: center;

		.stamp-line {
			font-family: 'Geist Mono', monospace;
			font-size: 0.6rem;
			letter-spacing: 0.18em;
		}

		.stamp-num {
			font-family: 'Playfair Display', Georgia, serif;
			font-style: italic;
			font-weight: 700;
			font-size: 1.6rem;
			line-height: 1;
		}
	}

	.press-notes {
		grid-area: notes;
		display: grid;
		gap: 1.1rem;
		align-content: start;
		padding-top: clamp(0.5rem, 2vw, 2.4rem);
	}

	.press-note {
		position: relative;
		padding: 1.1rem 1.3rem 1.2rem;
		background: var(--p-bg);
		border: 2px solid var(--p-rule);
		display: grid;
		gap: 0.4rem;

		&[data-i='0'] {
			box-shadow: 6px 6px 0 var(--p-orange);
			transform: rotate(0.4deg);
		}
		&[data-i='1'] {
			box-shadow: 6px 6px 0 var(--p-green);
			transform: rotate(-0.6deg);

			@media (min-width: 980px) {
				margin-left: 1.5rem;
			}
		}
		&[data-i='2'] {
			box-shadow: 6px 6px 0 var(--p-pink);
			transform: rotate(0.3deg);
		}

		.note-num {
			font-style: italic;
			font-size: 1.3rem;
			color: var(--p-orange);
		}

		h4 {
			font-style: italic;
			font-size: clamp(1.15rem, 1.8vw, 1.5rem);
			line-height: 1.1;
			color: var(--p-ink);
		}

		p {
			font-size: 0.92rem;
			line-height: 1.55;
			color: var(--p-ink-soft);
		}
	}

	.press-marks {
		position: absolute;
		left: 50%;
		bottom: clamp(0.8rem, 2vw, 1.6rem);
		transform: translateX(-50%);
		z-index: 3;
		display: flex;
		gap: 0.6rem;
		font-size: 0.65rem;
		letter-spacing: 0.24em;
		color: var(--p-ink-soft);
		opacity: 0.55;
	}

	/* ---------- VS CARDS ---------- */
	.vs {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem);
	}

	.vs-cards {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;

		@media (min-width: $bp-small) {
			grid-template-columns: 1fr 1fr;
		}

		@media (min-width: $bp-medium) {
			grid-template-columns: repeat(3, 1fr);
			gap: 1.5rem;
		}
	}

	.vs-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		border: 2px solid var(--p-rule);
		background: var(--p-bg);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;

		&::before {
			content: '';
			position: absolute;
			inset: -2px;
			border: 2px solid var(--p-rule);
			transform: translate(8px, 8px);
			z-index: -1;
			background: var(--p-bg-2);
			transition: transform 0.3s ease;
		}

		&:hover {
			transform: translate(-4px, -4px);

			&::before {
				transform: translate(12px, 12px);
			}
		}

		&:nth-child(2n)::before {
			background: var(--p-pink);
		}

		&:nth-child(3n)::before {
			background: var(--p-green);
		}
	}

	.vs-card-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 0.75rem;
		border-bottom: 1px dotted var(--p-rule);
	}

	.vs-label {
		font-size: 0.65rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--p-ink-soft);
	}

	.vs-diff {
		font-style: italic;
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--p-orange);
		padding: 0.25rem 0.55rem;
		background: var(--p-bg-2);
		border: 1px solid var(--p-rule);
		display: inline-block;
		transition: transform 0.4s ease;
	}

	.vs-card-title {
		font-style: italic;
		font-size: clamp(1.6rem, 2.6vw, 2.2rem);
		line-height: 1;
		color: var(--p-ink);
	}

	.vs-rows {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.vs-line {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.7rem 0.85rem;
		border: 1px solid var(--p-rule);

		.vs-tag {
			font-size: 0.65rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
		}

		.vs-val {
			font-style: italic;
			font-size: 1.15rem;
			line-height: 1.1;
		}

		&.loss {
			background: transparent;
			color: var(--p-ink-soft);

			.vs-tag {
				color: var(--p-ink-soft);
			}

			.vs-val {
				text-decoration: line-through;
				text-decoration-color: var(--p-orange);
				text-decoration-thickness: 2px;
			}
		}

		&.win {
			background: var(--p-ink);
			color: var(--p-bg);
			border-color: var(--p-ink);

			.vs-tag {
				color: var(--p-orange);
			}

			.vs-val {
				color: var(--p-green);
				font-weight: 600;
			}
		}
	}

	.vs-note {
		font-size: 0.85rem;
		line-height: 1.55;
		color: var(--p-ink-soft);
		font-style: italic;
		padding-top: 0.5rem;
		border-top: 1px dotted var(--p-rule);
	}

	/* ---------- MARQUEE ---------- */
	.marquee {
		position: relative;
		z-index: 2;
		overflow: hidden;
		padding: 1.25rem 0;
		border-top: 6px double var(--p-rule);
		border-bottom: 6px double var(--p-rule);
		background: var(--p-bg-2);

		.marquee-inner {
			display: inline-flex;
			gap: 1.5rem;
			align-items: center;
			white-space: nowrap;
			will-change: transform;

			span {
				display: inline-block;
				font-size: clamp(1.5rem, 3.5vw, 2.6rem);
				line-height: 1;

				&.dot {
					color: var(--p-orange);
					font-size: 1.5rem;
				}
			}
		}
	}

	/* ---------- PROCESS ---------- */
	.process {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem);
		border-top: 1px solid var(--p-rule);
	}

	.proc {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		border-top: 1px solid var(--p-rule);
	}

	.proc-step {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: 1.5rem;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--p-rule);
		align-items: baseline;
		transition: padding 0.25s ease;

		&:hover {
			padding-left: 0.75rem;

			.proc-n {
				color: var(--p-orange);
			}

			h3 {
				color: var(--p-orange);
			}
		}

		.proc-n {
			font-style: italic;
			font-size: clamp(2.2rem, 4vw, 3.5rem);
			line-height: 0.9;
			color: var(--p-ink);
			transition: color 0.25s ease;
		}

		.proc-body {
			h3 {
				font-style: italic;
				font-size: clamp(1.4rem, 2.4vw, 1.85rem);
				line-height: 1.1;
				margin-bottom: 0.4rem;
				transition: color 0.25s ease;
			}

			p {
				font-size: 0.95rem;
				line-height: 1.6;
				color: var(--p-ink-soft);
				max-width: 60ch;
			}
		}
	}

	/* ---------- REAL ---------- */
	.real {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem);
		border-top: 1px solid var(--p-rule);
	}

	.real-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@media (min-width: $bp-small) {
			grid-template-columns: 1fr 1fr;
			column-gap: 2rem;
		}
	}

	.real-card {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: var(--p-ink);
		border-top: 2px solid var(--p-rule);
		padding-top: 1rem;
		transition: opacity 0.25s ease;

		&:hover {
			.real-img img {
				transform: scale(1.05);
			}

			h3 {
				color: var(--p-orange);
			}

			.real-go {
				color: var(--p-orange);
			}

			.real-delay {
				background: var(--p-orange);
				color: #fff;
			}
		}
	}

	.real-img {
		aspect-ratio: 16 / 10;
		overflow: hidden;
		filter: grayscale(0.7) contrast(1.1);
		margin-bottom: 1rem;
		position: relative;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.5s ease;
		}

		.real-delay {
			position: absolute;
			top: 0.75rem;
			left: 0.75rem;
			padding: 0.3rem 0.6rem;
			background: var(--p-bg);
			color: var(--p-ink);
			font-size: 0.7rem;
			letter-spacing: 0.15em;
			text-transform: uppercase;
			border: 2px solid var(--p-rule);
			transition:
				background 0.25s ease,
				color 0.25s ease;
		}
	}

	.real-meta {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;

		.real-cat {
			font-size: 0.7rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--p-orange);
		}

		h3 {
			font-style: italic;
			font-size: clamp(1.5rem, 2.8vw, 2.2rem);
			line-height: 1;
			transition: color 0.25s ease;
		}

		p {
			font-size: 0.95rem;
			line-height: 1.55;
			color: var(--p-ink-soft);
		}

		.real-go {
			margin-top: 0.4rem;
			font-size: 0.72rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--p-ink-soft);
			transition: color 0.25s ease;
		}
	}

	/* ---------- FAQ ---------- */
	.faq {
		position: relative;
		z-index: 2;
		max-width: 1100px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem);
		border-top: 1px solid var(--p-rule);
	}

	.faq-list {
		list-style: none;
		border-top: 2px solid var(--p-rule);
	}

	.faq-item {
		border-bottom: 1px solid var(--p-rule);

		&.open {
			background: var(--p-bg-2);

			.qx {
				color: var(--p-orange);
			}
		}
	}

	.faq-q {
		display: grid;
		grid-template-columns: 60px 1fr 30px;
		gap: 1rem;
		align-items: baseline;
		width: 100%;
		text-align: left;
		background: transparent;
		border: none;
		padding: 1.3rem 0;
		cursor: pointer;
		color: inherit;

		.qn {
			font-size: 0.75rem;
			color: var(--p-orange);
			letter-spacing: 0.1em;
		}

		.qt {
			font-style: italic;
			font-size: clamp(1.15rem, 2vw, 1.5rem);
			line-height: 1.2;
			color: var(--p-ink);
			transition: color 0.2s ease;
		}

		.qx {
			font-family: 'Playfair Display', serif;
			font-size: 1.6rem;
			color: var(--p-ink);
			text-align: right;
			transition: color 0.2s ease;
		}

		&:hover .qt {
			color: var(--p-orange);
		}
	}

	.faq-a {
		display: grid;
		grid-template-columns: 60px 1fr 30px;
		gap: 1rem;
		padding: 0 0 1.5rem;

		.qa-prefix {
			font-size: 0.75rem;
			color: var(--p-orange);
			letter-spacing: 0.1em;
		}

		p {
			grid-column: 2 / 3;
			font-size: 1rem;
			line-height: 1.65;
			max-width: 65ch;
			color: var(--p-ink-soft);
		}
	}

	/* ---------- FINAL ---------- */
	.final {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem);
	}

	.final-box {
		position: relative;
		padding: clamp(2rem, 5vw, 3.5rem);
		background: var(--p-ink);
		color: var(--p-bg);
		border: 2px solid var(--p-ink);
		display: flex;
		flex-direction: column;
		gap: 1rem;

		&::before {
			content: '✱';
			position: absolute;
			top: -28px;
			right: 28px;
			font-size: 56px;
			color: var(--p-orange);
			line-height: 1;
		}

		.kicker {
			color: var(--p-orange);

			&::before {
				background: var(--p-orange);
			}
		}

		.big-title {
			color: var(--p-bg);

			em {
				color: var(--p-green);
			}
		}

		.lede {
			color: var(--p-pink);
			opacity: 0.9;
		}

		.btn-ink {
			background: var(--p-orange);
			color: #fff;
			border-color: var(--p-orange);

			&:hover {
				background: var(--p-bg);
				color: var(--p-ink);
				border-color: var(--p-bg);
				box-shadow: 4px 4px 0 var(--p-orange);
			}
		}

		.btn-paper {
			color: var(--p-bg);
			border-color: var(--p-bg);

			&:hover {
				background: var(--p-green);
				color: var(--p-ink);
				border-color: var(--p-green);
				box-shadow: 4px 4px 0 var(--p-bg);
			}
		}
	}

	.final-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.footnote {
		margin-top: 1.5rem;
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--p-pink);
		opacity: 0.65;
		line-height: 1.5;
	}

	/* ---------- ATELIER ---------- */
	.atelier {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem);
		border-top: 1px solid var(--p-rule);
	}

	.atelier-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1.5rem, 3vw, 2.5rem);
		align-items: start;

		@media (min-width: $bp-medium) {
			grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
		}
	}

	.atelier-frame {
		position: relative;
		will-change: transform, opacity;
	}

	.atelier-caption {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.atelier-eye {
			font-size: 0.7rem;
			letter-spacing: 0.22em;
			text-transform: uppercase;
			color: var(--p-orange);
			padding-bottom: 0.4rem;
			border-bottom: 1px dotted var(--p-rule);
		}

		ul {
			list-style: none;
			display: grid;
			gap: 1rem;
			padding: 0;
			margin: 0;
		}

		li {
			display: grid;
			grid-template-columns: 28px 1fr;
			gap: 0.75rem;
			align-items: baseline;
			font-size: 0.95rem;
			line-height: 1.55;
			color: var(--p-ink-soft);
			padding-bottom: 0.85rem;
			border-bottom: 1px dotted var(--p-rule);

			strong {
				color: var(--p-ink);
				font-weight: 600;
			}

			.num {
				font-style: italic;
				font-size: 1.4rem;
				color: var(--p-orange);
				line-height: 1;
			}
		}

		.atelier-pitch {
			margin-top: 0.5rem;
			font-size: 1.15rem;
			line-height: 1.4;
			color: var(--p-ink);
			padding: 0.85rem 1rem;
			background: var(--p-bg-2);
			border-left: 3px solid var(--p-orange);

			em {
				font-style: italic;
				color: var(--p-orange);
			}
		}
	}

	/* ---------- STACK ---------- */
	.stack {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem);
		border-top: 1px solid var(--p-rule);
	}

	.stack-table {
		border-top: 2px solid var(--p-rule);
		border-bottom: 2px solid var(--p-rule);
	}

	.stack-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.4rem;
		padding: 1rem 0.25rem;
		border-bottom: 1px solid var(--p-rule);
		transition:
			background 0.2s ease,
			padding 0.2s ease;

		@media (min-width: $bp-small) {
			grid-template-columns: minmax(140px, 1.2fr) minmax(110px, 1fr) minmax(0, 2.4fr);
			gap: 1.25rem;
			align-items: baseline;
		}

		&:last-child {
			border-bottom: none;
		}

		&:not(.stack-head):hover {
			background: var(--p-bg-2);
			padding-left: 0.85rem;

			.stack-name {
				color: var(--p-orange);
			}
		}

		&.stack-head {
			padding: 0.6rem 0.25rem;
			border-bottom: 2px solid var(--p-rule);
			background: var(--p-ink);
			color: var(--p-bg);
			padding-left: 0.85rem;
			padding-right: 0.85rem;

			span {
				font-size: 0.65rem;
				letter-spacing: 0.22em;
				text-transform: uppercase;
				color: var(--p-orange);
			}
		}

		.stack-name {
			font-style: italic;
			font-weight: 600;
			font-size: clamp(1.2rem, 2vw, 1.6rem);
			color: var(--p-ink);
			line-height: 1;
			transition: color 0.25s ease;
		}

		.stack-role {
			font-size: 0.72rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--p-orange);
		}

		.stack-desc {
			font-size: 0.95rem;
			line-height: 1.55;
			color: var(--p-ink-soft);
		}
	}

	/* ---------- INCLUS ---------- */
	.inclus {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 3rem);
		border-top: 1px solid var(--p-rule);
	}

	.incl-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
		border-top: 2px solid var(--p-rule);
		border-left: 1px solid var(--p-rule);

		@media (min-width: $bp-small) {
			grid-template-columns: 1fr 1fr;
		}

		@media (min-width: $bp-medium) {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.incl-item {
		position: relative;
		display: grid;
		grid-template-columns: 32px 1fr;
		gap: 0.75rem;
		align-items: start;
		padding: 1.4rem 1.25rem;
		border-right: 1px solid var(--p-rule);
		border-bottom: 1px solid var(--p-rule);
		transition: background 0.25s ease;

		&:hover {
			background: var(--p-bg-2);

			.incl-check {
				color: var(--p-orange);
				transform: scale(1.15) rotate(-6deg);
			}

			h3 {
				color: var(--p-orange);
			}
		}

		.incl-check {
			font-style: italic;
			font-weight: 700;
			font-size: 1.6rem;
			line-height: 1;
			color: var(--p-ink);
			transition:
				color 0.25s ease,
				transform 0.25s ease;
		}

		.incl-body {
			h3 {
				font-style: italic;
				font-size: clamp(1.05rem, 1.6vw, 1.25rem);
				line-height: 1.15;
				color: var(--p-ink);
				margin-bottom: 0.35rem;
				transition: color 0.25s ease;
			}

			p {
				font-size: 0.85rem;
				line-height: 1.5;
				color: var(--p-ink-soft);
			}
		}

		.incl-num {
			position: absolute;
			top: 0.6rem;
			right: 0.7rem;
			font-size: 0.6rem;
			letter-spacing: 0.18em;
			color: var(--p-ink-soft);
			opacity: 0.55;
		}
	}

	.incl-foot {
		margin-top: 1.5rem;
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--p-ink-soft);
		text-align: center;
		padding-top: 1rem;
		border-top: 1px dotted var(--p-rule);
	}

	/* ---------- COLOPHON ---------- */
	.colophon {
		position: relative;
		z-index: 2;
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem clamp(1rem, 4vw, 3rem) 3rem;
		border-top: 6px double var(--p-rule);
	}

	.colo-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;

		@media (min-width: $bp-medium) {
			grid-template-columns: repeat(4, 1fr);
		}

		div {
			display: flex;
			flex-direction: column;
			gap: 0.3rem;
		}

		.small {
			color: var(--p-orange);
		}

		p {
			font-style: italic;
			font-size: 1rem;
			color: var(--p-ink);
		}
	}
</style>
