<script>
	import { ChevronDown, Sun } from 'lucide-svelte';
	import Experience from '$lib/comp/exp.svelte';
	import Projets from '$lib/comp/projects.svelte';
	import formatText from '$lib/utils/formatText';
	const info = {
		school: [
			{
				title: 'Bachelier en Techniques graphiques',
				date: '2021 - sept. 2025',
				quantity: '3 ans et demi',
				location: {
					name: 'HEH',
					logo: '/assets/img/heh.png',
					where: 'Mons'
				},
				description:
					'<p>La formation en Techniques graphiques m’a permis de développer mes compétences en design graphique, en communication visuelle et en création de contenu multimédia. J’ai appris à maîtriser les logiciels de la suite Adobe, à concevoir des interfaces utilisateur et à réaliser des projets graphiques de qualité.</p><p>Aperçu de mes travaux : <a href="https://www.behance.net/prinss" target="_blank">Behance</a>, <a href="https://www.youtube.com/watch?v=a6xDLFfNXPE" target="_blank">Showreel</a></p>',
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
				title: 'Informatique',
				date: '2016 - 2020',
				quantity: '4 ans',
				location: {
					name: 'Institut Saint-François de Sales',
					logo: '/assets/img/sfds.jpg',
					where: 'Ath'
				},
				description:
					'<p>Ma formation en informatique m’a permis de développer mes compétences en programmation, en développement web et en outils bureautiques. J’ai appris à maîtriser les langages de programmation, à concevoir des sites web, à utiliser efficacement la suite Office.</p>',
				technos: ['html', 'css', 'php', 'c++', 'c', 'java', 'excel', 'word', 'powerpoint']
			}
		],
		exp: [
			{
				title: 'Developpeur Front-end - Job étudiant',
				date: 'juill. 2024 - aout 2024',
				quantity: '1 mois',
				location: {
					name: 'Webstanz',
					logo: '/assets/img/wz.png',
					where: 'Mons'
				},
				description:
					'<p>Lors de mon job étudiant chez Webstanz, j’ai consolidé mes compétences sur Drupal en travaillant pleinement sur un projet client. Cette expérience m’a permis d’approfondir ma maîtrise du CMS et d’appliquer mes connaissances dans un cadre professionnel, tout en gagnant en efficacité et en autonomie.</p>',
				technos: ['drupal', 'sass', 'js', 'github']
			},
			{
				title: 'Developpeur Front-end - Stage',
				date: 'févr. 2024 - mai 2024',
				quantity: '3 mois',
				location: {
					name: 'Webstanz',
					logo: '/assets/img/wz.png',
					where: 'Mons'
				},
				description:
					'<p>Chez Webstanz, j’ai approfondi mes compétences en CSS avec SCSS, en JavaScript (manipulation du DOM, animation avec GSAP), ainsi qu’en Twig et PHP, en travaillant sur des projets concrets et en appliquant ces technologies de manière structurée.</p><p>J’ai également développé mon autonomie, ma gestion du temps et ma capacité à m’adapter aux outils et méthodes de travail. Les réunions et échanges techniques m’ont permis de renforcer ma communication et ma compréhension des dynamiques d’équipe.</p>',
				technos: ['drupal', 'sass', 'js', 'github']
			},
			{
				title: 'Associé webmaster',
				date: '2020 - 2025',
				quantity: '5 ans',
				location: {
					name: 'Vitl Electro',
					logo: '/assets/img/vitl.svg'
				},
				description:
					"<p>L'activité de mon père, a nécessité la création d’un site web pour promouvoir ses services. J’ai pris en charge sa mise en ligne, sa promotion ainsi que sa maintenance. </p><p>Le site présentait ses différentes prestations et permettait aux clients de le contacter via un formulaire dédié. Il intégrait également un espace de gestion avec un back-office comprenant un CRUD pour administrer ses factures, devis et documents.</p>",
				technos: ['php', 'sass', 'js', 'css', 'html', 'adobe-xd']
			}
		],
		projets: [
			{
				name: 'Blinkr',
				description: "Plateforme dédié à la découverte et au partage d'événements locaux.",
				image: '/assets/img/blinkr.png',
				link: 'https://blinkr.be',
				technos: ['svelte-4', 'sass', 'js', 'typescript', 'figma', 'postgresql', 'supabase']
			},
			{
				name: 'Conquistador',
				description: 'Réplique des Colons de Catane version web',
				image: '/assets/img/conquistador.png',
				// link: 'https://blinkr.be',
				technos: ['svelte-4', 'sass', 'js', 'socket-io']
			},
			{
				name: 'Moongo',
				description: 'Skyjo remasterisé, version web, disponible sur github',
				image: '/assets/img/moongo.png',
				link: 'https://github.com/prinsc/skyjo',
				technos: ['jquery', 'sass', 'js', 'socket-io']
			},
			{
				name: 'Portfolio',
				description: 'Premier portfolio',
				image: '/assets/img/portfolio.png',
				// link: 'https://blinkr.be',
				technos: ['sass', 'js']
			},
			{
				name: 'Vitl Electro',
				description: "Site destiné à promouvoir les services d'un électricien passionné",
				image: '/assets/img/vitl.png',
				// link: 'https://blinkr.be',
				technos: ['php', 'sass', 'js', 'css', 'html', 'adobe-xd']
			}
		],
		technos: ['svelte-4', 'drupal', 'sass', 'js', 'nodejs', 'figma', 'postgresql', 'supabase'],
		socials: [
			{
				name: 'LinkedIn',
				link: 'https://www.linkedin.com/in/eléazar-klyuvitkin-1b1b3b1b3/',
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
	};

	let focused = $state(false);
</script>

<!-- Né pour coder, programmé pour réussir -->
<!-- 23 ans, la génération du Ctrl + Z -->
<main>
	<header>
		<div class="element">
			<h1>Klyuvitkin Eléazar's portfolio</h1>
		</div>
		<div class="element">
			<p>
				<span class="pulse"></span>
				<span>disponible</span>
			</p>
		</div>
	</header>

	<section class="actions">
		<button>
			<span class="icon">
				<Sun />
			</span>
		</button>
		<button> FR </button>
	</section>

	<section class="me">
		<div class="left-side">
			<img src="https://picsum.photos/500" alt="Photo de profil" width="100%" height="100%" />
		</div>
		<div class="right-side">
			<h2>23 ans, toute ses dents</h2>
			<p>
				Explorateur du web et artisan du code, je transforme des idées en interfaces fluides avec
				Svelte et des bases solides en développement. Toujours en quête d’innovation, je conçois des
				expériences numériques dynamiques et accessibles.
			</p>
			<address>Mainvault 7812</address>
		</div>
	</section>

	<section class="works" class:focused>
		<h2>FORMATIONS</h2>

		{#each info.school as school}
			<Experience data={school} />
		{/each}

		<button
			onclick={() => {
				focused = !focused;
			}}
		>
			<span class="icon">
				<ChevronDown strokeWidth={3} />
			</span>
			<h2>Expériences</h2>
		</button>

		<div class="sub-element-container">
			{#each info.exp as exp}
				<Experience data={exp} />
			{/each}
		</div>
	</section>

	<section class="projects">
		<h2>Projets</h2>
		<Projets data={info.projets} />
	</section>

	<section class="technos">
		<h2>Technologies</h2>
		<div class="cards">
			{#each info.technos as techno}
				<div class="card grain">
					<div class="icon">
						<img src="/assets/icons/{techno}.svg" alt={techno} width="100%" height="100%" />
					</div>
					<span> {formatText(techno)} </span>
				</div>
			{/each}
		</div>
	</section>

	<div class="divider"></div>

	<section class="socials">
		<h2>Mes réseaux sociaux</h2>
		<div class="container">
			{#each info.socials as social}
				<a href={social.link} target="_blank" rel="noopener noreferrer">
					<span class="icon">
						<img
							src="/assets/icons/{social.icon}.svg"
							alt={social.name}
							width="100%"
							height="100%"
						/>
					</span>
				</a>
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	main {
		max-width: 800px;
		padding: 2rem;
		margin: 0 auto;
	}
	h2 {
		font-weight: 400;
		font-size: 12px;
		text-transform: uppercase;
		margin: 0.8rem 0;
	}
	section,
	header {
		margin: 1rem 0;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		p {
			display: flex;
			align-items: center;
			gap: 0.8rem;
			font-weight: 500;
			.pulse {
				display: inline-flex;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background-color: rgba(50, 225, 50, 0.8);
				animation: pulseEffect 1.5s infinite ease-in-out;
				box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.5); /* Ajout d'une ombre pour un effet "halo" */
			}
			@keyframes pulseEffect {
				0% {
					transform: scale(1);
					opacity: 1;
					box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.5);
				}
				50% {
					transform: scale(1.2);
					opacity: 0.7;
					box-shadow: 0 0 15px 5px rgba(0, 255, 0, 0.3); /* Élargissement de l'ombre */
				}
				100% {
					transform: scale(1);
					opacity: 1;
					box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.5);
				}
			}
		}
	}

	section.projects {
	}

	section.actions {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	section.me {
		display: flex;
		align-items: center;
		gap: 2rem;
		.left-side {
			img {
				border-radius: 50%;
				min-width: 125px;
				width: 125px;
			}
		}
		.right-side {
			h2 {
				font-weight: 600;
				margin-block: 0;
			}
		}
	}

	section.works {
		margin-top: 3rem;
		&.focused {
			> button {
				.icon {
					transform: rotate(90deg);
				}
			}
			> .sub-element-container {
				height: max-content;
				opacity: 1;
			}
		}
		> button {
			display: flex;
			gap: 0.75rem;
			cursor: pointer;
			.icon {
				transition: transform 0.3s;
				display: inline-flex;
				width: 13px;
			}
		}

		> .sub-element-container {
			padding-left: 3rem;
			position: relative;
			overflow: hidden;
			height: 0;
			opacity: 0;
			transition:
				height 0.5s,
				opacity 0.5s;
			&::before {
				content: '';
				position: absolute;
				left: 0.5rem;
				top: 0;
				width: 2px;
				height: 100%;
				background-color: var(--color-primary);
				border-radius: 100px;
			}
		}
	}

	section.technos {
		.cards {
			display: flex;
			gap: 1rem;
			align-items: center;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.card {
			min-width: 75px;
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;
			padding: 1.5rem;
			border-radius: 5px;
			overflow: hidden;
			box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);

			&:hover {
				.icon {
					filter: grayscale(0);
				}
			}

			.icon {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 2rem;
				height: 2rem;
				filter: grayscale(1);
				transition: filter 0.1s;
				img {
					height: 100%;
				}
			}

			span {
				opacity: 0.75;
			}
		}
	}

	section.socials {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: space-between;

		.container {
			display: flex;
			gap: 2rem;
			a {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				.icon {
					width: 16px;
					max-width: 16px;
					aspect-ratio: 1/1;

					img {
						filter: brightness(0) opacity(0.5);
						transition: filter 0.1s;
					}
				}
				&:hover {
					.icon img {
						filter: brightness(1) opacity(1);
					}
				}
			}
		}
	}
</style>
