<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let isReady = $state(false);
	let openFaq = $state(null);

	let canvasEl;
	let scene3dEl;
	let scene3dInnerEl;
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
		{ t: 'Les locaux', d: 'Bureaux centre-ville. Baby-foot. Nespresso.', tag: 'overhead', c: 'Vous payez le loyer.' },
		{ t: 'La hiérarchie', d: 'Account, projet, lead, junior, design, QA.', tag: 'salaires', c: 'Cinq salaires. Un seul site.' },
		{ t: 'La marge', d: 'Une agence vise 30 à 50% de marge nette.', tag: 'capital', c: 'Légitime. Mais c’est vous qui financez.' },
		{ t: 'Le commercial', d: 'Quelqu’un est payé pour vous vendre.', tag: 'sales', c: 'Vous payez aussi cette personne.' },
		{ t: 'Les juniors', d: 'Le devis est signé par le senior.', tag: 'bait', c: 'Le code est écrit par un junior facturé senior.' },
		{ t: 'La file d’attente', d: 'Votre projet attend dans une queue.', tag: 'delays', c: 'Trois mois pour un site vitrine.' }
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
			label: 'Le stack',
			a: { v: 'WordPress vieillissant', t: 'agence' },
			b: { v: 'Svelte / Shopify', t: 'eleazar' },
			diff: '2026',
			note: 'Score Lighthouse au-dessus de 95. Léger. Sécurisé. Indexé Google.'
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
		{ n: '01', t: 'L’appel découverte', d: 'Trente minutes, gratuit. Vous expliquez. Je pose des questions. C’est aussi simple que ça.' },
		{ n: '02', t: 'Le devis chiffré', d: 'Sous 48 heures. Prix fixe, ferme. Pas de surprise en cours de route.' },
		{ n: '03', t: 'La maquette', d: 'Sur Figma. Vous validez le design avant que je touche au code.' },
		{ n: '04', t: 'Le développement', d: 'Vous suivez en direct sur une URL de preview. Aucune boîte noire. 3 à 14 jours selon la complexité.' },
		{ n: '05', t: 'La mise en ligne', d: 'Hébergement, nom de domaine, SEO de base, formation rapide pour gérer le contenu.' },
		{ n: '06', t: 'Le suivi', d: 'On reste en contact. Je ne disparais pas après le virement.' }
	];

	const projets = [
		{
			name: 'MJM Sonorisation',
			date: '2026',
			cat: 'Vitrine',
			delay: '3 jours',
			description: 'Site vitrine pour un sonorisateur passionné. Maquette, dev, mise en ligne — bouclé en trois jours.',
			image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&auto=format&fit=crop',
			link: 'https://mjmsono.com'
		},
		{
			name: 'Renaissance Coach',
			date: '2025',
			cat: 'Vitrine',
			delay: '9 jours',
			description: 'Site vitrine pour un coach de vie spécialisé en développement personnel.',
			image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=900&auto=format&fit=crop',
			link: 'https://renaissance-coach.be'
		},
		{
			name: 'Blinkr',
			date: '2024–2025',
			cat: 'Plateforme',
			delay: '6 mois',
			description: 'Plateforme dédiée à la découverte et au partage d’événements locaux. Un projet plus ambitieux.',
			image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop',
			link: 'https://blinkr.events'
		},
		{
			name: 'Noumis Jewelry',
			date: '2025',
			cat: 'E-commerce',
			delay: '3 semaines',
			description: 'Boutique e-commerce Shopify pour une marque de bijoux artisanaux.',
			image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&auto=format&fit=crop',
			link: 'https://noumis-jewelry.com'
		}
	];

	const faq = [
		{
			q: 'Sérieusement, 500 € pour un site ?',
			a: 'Oui. Site vitrine une page, design propre, mobile, hébergement un an inclus, formation pour gérer votre contenu. Si vous voulez cinq pages, des animations custom, un back-office, du e-commerce — on monte. Mais le ticket d’entrée est à 500 €, et c’est négociable selon votre projet.'
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
			a: 'Question légitime. Je bosse avec un petit réseau de freelances de confiance pour les renforts. Et le code que je livre est propre, documenté, hébergé chez VOUS : n’importe quel développeur peut reprendre.'
		},
		{
			q: 'Vous bossez où ?',
			a: 'Basé à Mainvault (Ath). Je couvre tout le Hainaut — Tournai, Leuze, Lessines, Mons — et à distance partout en Belgique et en France. Le rendez-vous physique est possible mais rarement nécessaire.'
		},
		{
			q: 'Et après la livraison ?',
			a: 'Vous êtes propriétaire de tout. Suivi mensuel optionnel (correctifs, petites évolutions, hébergement) à partir de 30 €/mois. Sans engagement. Vous pouvez partir quand vous voulez.'
		}
	];

	function toggleFaq(i) {
		openFaq = openFaq === i ? null : i;
	}

	function emailMe() {
		window.location.href = 'mailto:eleazar@kltk.be?subject=Projet%20web%20%E2%80%94%20demande%20de%20devis';
	}

	onMount(async () => {
		await new Promise((r) => setTimeout(r, 60));
		isReady = true;

		if (!browser) return;

		const [{ default: gsap }, { ScrollTrigger }, THREE] = await Promise.all([
			import('gsap'),
			import('gsap/ScrollTrigger'),
			import('three')
		]);

		gsap.registerPlugin(ScrollTrigger);

		// ---------- THREE.JS : feuille journal froissée qui pivote au scroll ----------
		const initThree = () => {
			if (!canvasEl) return;
			const w = canvasEl.clientWidth;
			const h = canvasEl.clientHeight;

			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
			camera.position.set(0, 0, 6.5);

			const renderer = new THREE.WebGLRenderer({
				canvas: canvasEl,
				alpha: true,
				antialias: true
			});
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(w, h, false);

			// Lumières
			const amb = new THREE.AmbientLight(0xfff3d0, 0.55);
			scene.add(amb);
			const dir = new THREE.DirectionalLight(0xffffff, 1.1);
			dir.position.set(2.5, 3, 4);
			scene.add(dir);
			const rim = new THREE.DirectionalLight(0xff4500, 0.6);
			rim.position.set(-3, -2, 2);
			scene.add(rim);

			// Géo : feuille papier déformée façon journal froissé
			const geo = new THREE.PlaneGeometry(3.3, 4.4, 60, 80);
			const pos = geo.attributes.position;
			for (let i = 0; i < pos.count; i++) {
				const x = pos.getX(i);
				const y = pos.getY(i);
				const z =
					Math.sin(x * 2.1 + y * 0.6) * 0.07 +
					Math.cos(y * 1.7 - x * 0.4) * 0.05 +
					(Math.random() - 0.5) * 0.04;
				pos.setZ(i, z);
			}
			geo.computeVertexNormals();

			// Texture procédurale : texte journal sur canvas
			const tex = (() => {
				const c = document.createElement('canvas');
				c.width = 660;
				c.height = 880;
				const ctx = c.getContext('2d');
				// fond crème
				ctx.fillStyle = '#f6efde';
				ctx.fillRect(0, 0, c.width, c.height);
				// grain
				const img = ctx.getImageData(0, 0, c.width, c.height);
				for (let i = 0; i < img.data.length; i += 4) {
					const n = (Math.random() - 0.5) * 22;
					img.data[i] += n;
					img.data[i + 1] += n;
					img.data[i + 2] += n;
				}
				ctx.putImageData(img, 0, 0);

				// masthead
				ctx.fillStyle = '#14110d';
				ctx.font = 'italic 700 64px "Playfair Display", Georgia, serif';
				ctx.fillText('L’Édition', 30, 90);
				ctx.fillStyle = '#ff4500';
				ctx.font = 'italic 700 64px "Playfair Display", Georgia, serif';
				ctx.fillText('spéciale', 220, 90);

				ctx.fillStyle = '#14110d';
				ctx.font = '12px "Geist Mono", monospace';
				ctx.fillText('VOL. VI · N°06 · 26 AVRIL 2026', 30, 115);

				// double rule
				ctx.strokeStyle = '#14110d';
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(30, 130);
				ctx.lineTo(630, 130);
				ctx.stroke();
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(30, 136);
				ctx.lineTo(630, 136);
				ctx.stroke();

				// gros titre
				ctx.fillStyle = '#14110d';
				ctx.font = 'italic 56px "Playfair Display", Georgia, serif';
				ctx.fillText('Site web', 30, 220);
				ctx.fillText('dès 500 €.', 30, 290);

				ctx.fillStyle = '#ff4500';
				ctx.font = 'italic 700 56px "Playfair Display", Georgia, serif';
				ctx.fillText('Vraiment.', 30, 360);

				// fake colonnes
				ctx.fillStyle = '#14110d';
				ctx.font = '13px "Bricolage Grotesque", sans-serif';
				const lorem = [
					'Mainvault. Pendant que les agences belges',
					'facturent huit mille euros pour un site',
					'vitrine, un développeur freelance basé à',
					'Ath propose la même qualité — souvent',
					'meilleure — pour un dixième du prix.',
					'',
					'« Pas de chef de projet inutile, pas de',
					'stagiaire qui code à votre place, pas de',
					'marge gonflée. Juste un développeur qui',
					'fait le job, et qui facture honnêtement. »',
					'',
					'Le ticket d’entrée est à 500 €, négociable',
					'selon le projet. Site MJM Sonorisation',
					'livré en 3 jours en 2026.',
					'',
					'Eléazar Klyuvitkin couvre tout le Hainaut',
					'occidental. Ath, Tournai, Leuze, Lessines.',
					'Et à distance partout en Belgique.'
				];
				let yLine = 420;
				lorem.forEach((line) => {
					ctx.fillText(line, 30, yLine);
					yLine += 22;
				});

				// colonne droite
				yLine = 420;
				const lorem2 = [
					'PROCESS · Six étapes',
					'',
					'01. Un appel découverte',
					'02. Devis fixe sous 48h',
					'03. Maquette Figma',
					'04. Développement live',
					'05. Mise en ligne SEO',
					'06. Suivi mensuel option.',
					'',
					'TARIFS · à partir de',
					'',
					'Vitrine . . . . . . 500 €',
					'Custom . . . . 1 500 €',
					'Shopify . . . . 2 000 €',
					'',
					'CONTACT · email',
					'eleazar@kltk.be',
					'+32 485 700 737'
				];
				lorem2.forEach((line) => {
					ctx.fillText(line, 360, yLine);
					yLine += 22;
				});

				// stamp orange tilted
				ctx.save();
				ctx.translate(490, 760);
				ctx.rotate(-0.18);
				ctx.strokeStyle = '#ff4500';
				ctx.lineWidth = 3;
				ctx.strokeRect(-70, -28, 140, 56);
				ctx.fillStyle = '#ff4500';
				ctx.font = 'italic 700 22px "Playfair Display", serif';
				ctx.textAlign = 'center';
				ctx.fillText('500€', 0, 8);
				ctx.restore();

				ctx.textAlign = 'left';

				const t = new THREE.CanvasTexture(c);
				t.colorSpace = THREE.SRGBColorSpace;
				t.anisotropy = 8;
				return t;
			})();

			const mat = new THREE.MeshStandardMaterial({
				map: tex,
				side: THREE.DoubleSide,
				roughness: 0.85,
				metalness: 0.0
			});
			const paper = new THREE.Mesh(geo, mat);
			// position initiale: feuille un peu sur le côté, légèrement tournée
			paper.rotation.set(0.05, -0.7, 0.08);
			paper.position.set(-0.4, 0, 0);
			scene.add(paper);

			// state scroll
			const state = { scrub: 0 };

			// trigger sur la section dédiée, pinned plein écran
			const st = ScrollTrigger.create({
				trigger: scene3dEl,
				start: 'top top',
				end: '+=200%',
				pin: true,
				pinSpacing: true,
				scrub: 0.7,
				onUpdate: (self) => {
					state.scrub = self.progress;
				}
			});

			// reveal narration text steps avec scrub
			if (scene3dInnerEl) {
				const steps = scene3dInnerEl.querySelectorAll('.scene-step');
				steps.forEach((step, i) => {
					const total = steps.length;
					const startP = i / total;
					const endP = (i + 1) / total;
					gsap.fromTo(
						step,
						{ opacity: 0, y: 30 },
						{
							opacity: 1,
							y: 0,
							duration: 0.5,
							ease: 'power2.out',
							scrollTrigger: {
								trigger: scene3dEl,
								start: () => `top+=${startP * 100}% top`,
								end: () => `top+=${endP * 100}% top`,
								scrub: 0.5,
								toggleActions: 'play reverse play reverse'
							}
						}
					);
				});
			}

			// pointer subtle
			let mx = 0,
				my = 0;
			const onPointer = (e) => {
				const r = canvasEl.getBoundingClientRect();
				mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
				my = ((e.clientY - r.top) / r.height - 0.5) * 2;
			};
			window.addEventListener('pointermove', onPointer);

			// resize
			const onResize = () => {
				const nw = canvasEl.clientWidth;
				const nh = canvasEl.clientHeight;
				camera.aspect = nw / nh;
				camera.updateProjectionMatrix();
				renderer.setSize(nw, nh, false);
			};
			window.addEventListener('resize', onResize);

			// loop
			let raf;
			const tick = (now) => {
				const scrub = state.scrub;

				// 3 phases narratives :
				// 0 → 0.33 : feuille arrive de profil → s'ouvre face caméra
				// 0.33 → 0.66 : feuille pivote, défile vers le haut, "imprimée"
				// 0.66 → 1 : feuille s'éloigne, tournoie vers la droite, presque hors champ
				const phase1 = Math.min(scrub / 0.33, 1);
				const phase2 = Math.min(Math.max((scrub - 0.33) / 0.33, 0), 1);
				const phase3 = Math.max((scrub - 0.66) / 0.34, 0);

				// rotation : -0.7 (profil) → 0 (face) → -2 (revers tournoie)
				const targetRy = -0.7 + phase1 * 0.7 - phase2 * 0.15 - phase3 * 1.8;
				const targetRx = 0.05 - phase2 * 0.25 + phase3 * 0.4 + my * 0.08;
				const targetRz = 0.08 + phase2 * 0.06 - phase3 * 0.6 + mx * 0.05;

				// position
				const targetPx = -0.4 + phase1 * 0.4 + phase3 * 1.8;
				const targetPy = 0 + phase2 * -0.3 - phase3 * 0.4;
				const targetPz = 0 + phase1 * 0.6 - phase2 * 0.4 - phase3 * 1.5;

				const damp = 0.1;
				paper.rotation.x += (targetRx - paper.rotation.x) * damp;
				paper.rotation.y += (targetRy - paper.rotation.y) * damp;
				paper.rotation.z += (targetRz - paper.rotation.z) * damp;
				paper.position.x += (targetPx - paper.position.x) * damp;
				paper.position.y += (targetPy - paper.position.y) * damp;
				paper.position.z += (targetPz - paper.position.z) * damp;

				// caméra zoom léger phase 2
				const camZ = 6.5 - phase2 * 0.7;
				camera.position.z += (camZ - camera.position.z) * damp;

				// onde papier — froissé idle + amplifiée phase 1 (déploiement)
				const p = geo.attributes.position;
				const t = now * 0.0008;
				const fold = 1 - phase1; // au début papier plié, ondes max
				const wave = phase2; // milieu : ondes douces
				for (let i = 0; i < p.count; i++) {
					const xi = p.getX(i);
					const yi = p.getY(i);
					const baseFold = fold * (Math.sin(yi * 6) * 0.25 + Math.cos(xi * 4) * 0.15);
					const idle =
						Math.sin(xi * 2.1 + yi * 0.6 + t) * 0.06 +
						Math.cos(yi * 1.7 - xi * 0.4 + t * 0.7) * 0.04;
					const ripple = wave * Math.sin(yi * 3 + t * 1.5) * 0.12;
					p.setZ(i, baseFold + idle + ripple);
				}
				p.needsUpdate = true;
				geo.computeVertexNormals();

				renderer.render(scene, camera);
				raf = requestAnimationFrame(tick);
			};
			raf = requestAnimationFrame(tick);

			cleanups.push(() => {
				cancelAnimationFrame(raf);
				window.removeEventListener('pointermove', onPointer);
				window.removeEventListener('resize', onResize);
				st.kill();
				geo.dispose();
				mat.dispose();
				tex.dispose();
				renderer.dispose();
			});
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
				.map((w) =>
					w.trim() ? `<span class="word"><span class="inner">${w}</span></span>` : w
				)
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
				const onEnter = () => gsap.to(num, { scale: 1.08, rotate: -2, duration: 0.4, ease: 'back.out(2)' });
				const onLeave = () => gsap.to(num, { scale: 1, rotate: 0, duration: 0.4, ease: 'power2.out' });
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

		// init three after layout, puis refresh ScrollTrigger
		requestAnimationFrame(() => {
			initThree();
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
					<li><span class="rail-num">01</span> Pourquoi 500 €</li>
					<li><span class="rail-num">02</span> Le coût caché des agences</li>
					<li><span class="rail-num">03</span> Le match en chiffres</li>
					<li><span class="rail-num">04</span> Comment ça se passe</li>
					<li><span class="rail-num">05</span> Six questions, six réponses</li>
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
					vous facture honnêtement. Le ticket d’entrée est à 500 €, négociable selon le projet.
					Les délais ? <strong>De trois à quatorze jours</strong> pour un site vitrine. Le site
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
					Site vitrine, hébergement un an inclus, formation au CMS. Négociable selon vos besoins.
					Délai 3 à 14 jours.
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
			Pour 80% des projets PME, une agence c’est cinq personnes payées pour un boulot qu’une seule peut faire mieux, plus vite, et pour beaucoup moins cher.
		</blockquote>
		<cite class="mono">— Constat, après 6 ans dans le métier</cite>
	</section>

	<!-- SCENE 3D : feuille journal scroll-driven -->
	<section class="scene-3d" bind:this={scene3dEl} aria-label="Animation feuille journal">
		<canvas class="scene-canvas" bind:this={canvasEl} aria-hidden="true"></canvas>

		<div class="scene-overlay" bind:this={scene3dInnerEl}>
			<span class="scene-kicker mono">§ Intermède · sortie de presse</span>

			<div class="scene-step" data-i="0">
				<span class="step-num serif">i.</span>
				<h3 class="serif">L’encre n’a pas encore séché.</h3>
				<p>
					Chaque site qui sort de chez moi, c’est un peu comme un journal qui sort de l’imprimerie : un objet pensé, plié, prêt à être lu.
				</p>
			</div>

			<div class="scene-step" data-i="1">
				<span class="step-num serif">ii.</span>
				<h3 class="serif">Trois jours pour MJM Sonorisation.</h3>
				<p>
					Trois jours entre l’appel et la mise en ligne. Pas trois mois. Pas trois semaines. Trois jours.
				</p>
			</div>

			<div class="scene-step" data-i="2">
				<span class="step-num serif">iii.</span>
				<h3 class="serif">Imprimé à Mainvault. Lu partout.</h3>
				<p>
					De Tournai à Bruxelles, de Lessines à Mons. Hébergement Vercel, performance Lighthouse 95+, aucune dépendance à un commercial qui te rappelle six fois.
				</p>
			</div>
		</div>

		<div class="scene-marks mono" aria-hidden="true">
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
				<span class="serif italic">SvelteKit · Shopify</span>
				<span class="dot">●</span>
				<span class="serif italic">eleazar@kltk.be</span>
				<span class="dot">●</span>
			{/each}
		</div>
	</div>

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
				Chaque carte indique le délai réel de livraison. MJM Sonorisation, par exemple, a été
				bouclé en trois jours.
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
			font-style: italic;
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

	/* ---------- SCENE 3D ---------- */
	.scene-3d {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100vh;
		min-height: 600px;
		overflow: hidden;
		background: var(--p-bg-2);
		border-top: 6px double var(--p-rule);
		border-bottom: 6px double var(--p-rule);
		display: flex;
		align-items: stretch;

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			pointer-events: none;
			background:
				radial-gradient(circle at 80% 30%, rgba(255, 69, 0, 0.08), transparent 55%),
				radial-gradient(circle at 20% 70%, rgba(159, 232, 112, 0.1), transparent 55%);
			z-index: 1;
		}
	}

	.scene-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		pointer-events: none;
	}

	.scene-overlay {
		position: relative;
		z-index: 3;
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(1.5rem, 3vw, 2.5rem);
		align-content: center;

		@media (min-width: $bp-medium) {
			grid-template-columns: minmax(0, 480px) 1fr;
		}

		.scene-kicker {
			grid-column: 1 / -1;
			font-size: 0.72rem;
			letter-spacing: 0.22em;
			text-transform: uppercase;
			color: var(--p-orange);
			padding-bottom: 0.4rem;
			border-bottom: 1px dotted var(--p-rule);
			align-self: start;
		}

		.scene-step {
			padding: 1.25rem 1.5rem;
			background: var(--p-bg);
			border: 2px solid var(--p-rule);
			box-shadow: 6px 6px 0 var(--p-orange);
			max-width: 460px;

			&[data-i='1'] {
				justify-self: end;
				box-shadow: 6px 6px 0 var(--p-green);
				transform: translateY(0);

				@media (min-width: $bp-medium) {
					grid-column: 1;
					transform: translate(40px, 0);
				}
			}

			&[data-i='2'] {
				@media (min-width: $bp-medium) {
					grid-column: 2;
					justify-self: start;
					transform: translate(-30px, 0);
				}
				box-shadow: 6px 6px 0 var(--p-pink);
			}

			.step-num {
				font-style: italic;
				font-size: 1.4rem;
				color: var(--p-orange);
				display: block;
				margin-bottom: 0.3rem;
			}

			h3 {
				font-style: italic;
				font-size: clamp(1.4rem, 2.4vw, 2rem);
				line-height: 1.05;
				color: var(--p-ink);
				margin-bottom: 0.5rem;
			}

			p {
				font-size: 0.95rem;
				line-height: 1.55;
				color: var(--p-ink-soft);
			}
		}
	}

	.scene-marks {
		position: absolute;
		left: clamp(1rem, 4vw, 3rem);
		bottom: clamp(1rem, 4vw, 2rem);
		z-index: 3;
		display: flex;
		gap: 0.6rem;
		font-size: 0.7rem;
		letter-spacing: 0.2em;
		color: var(--p-rule);
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
		transition: transform 0.3s ease, box-shadow 0.3s ease;

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
			transition: background 0.25s ease, color 0.25s ease;
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
