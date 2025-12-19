<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Home, ArrowLeft, AlertCircle } from 'lucide-svelte';
	import { settings } from '$lib/stores/settings.js';
	import { onMount } from 'svelte';
	import Footer from '$lib/comp/Footer.svelte';

	let isReady = $state(false);

	onMount(async () => {
		isReady = false;
		await new Promise((resolve) => setTimeout(resolve, 100));
		isReady = true;
	});

	function goHome() {
		goto(`/${$settings.lang}/`);
	}

	function goBack() {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			goHome();
		}
	}

	const errorMessages = {
		404: {
			fr: {
				title: 'Page introuvable',
				message: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
				hint: "Vérifiez l'URL ou retournez à l'accueil."
			},
			en: {
				title: 'Page not found',
				message: "Sorry, the page you're looking for doesn't exist or has been moved.",
				hint: 'Check the URL or return to the homepage.'
			},
			ru: {
				title: 'Страница не найдена',
				message: 'Извините, страница, которую вы ищете, не существует или была перемещена.',
				hint: 'Проверьте URL или вернитесь на главную страницу.'
			}
		},
		500: {
			fr: {
				title: 'Erreur serveur',
				message: "Une erreur s'est produite sur le serveur.",
				hint: 'Réessayez dans quelques instants.'
			},
			en: {
				title: 'Server error',
				message: 'A server error occurred.',
				hint: 'Please try again in a few moments.'
			},
			ru: {
				title: 'Ошибка сервера',
				message: 'Произошла ошибка сервера.',
				hint: 'Пожалуйста, попробуйте снова через несколько мгновений.'
			}
		},
		default: {
			fr: {
				title: 'Une erreur est survenue',
				message: "Quelque chose s'est mal passé.",
				hint: 'Veuillez réessayer.'
			},
			en: {
				title: 'An error occurred',
				message: 'Something went wrong.',
				hint: 'Please try again.'
			},
			ru: {
				title: 'Произошла ошибка',
				message: 'Что-то пошло не так.',
				hint: 'Пожалуйста, попробуйте снова.'
			}
		}
	};

	const buttonLabels = {
		fr: {
			home: "Retour à l'accueil",
			back: 'Page précédente'
		},
		en: {
			home: 'Back to homepage',
			back: 'Previous page'
		},
		ru: {
			home: 'Вернуться на главную',
			back: 'Предыдущая страница'
		}
	};

	let currentLang = $derived($settings.lang || 'fr');
	let statusCode = $derived($page.status || 500);
	let errorData = $derived(errorMessages[statusCode] || errorMessages.default);
	let labels = $derived(buttonLabels[currentLang]);
</script>

<svelte:head>
	<title>{statusCode} - {errorData[currentLang].title}</title>
</svelte:head>

{#if !isReady}
	<div class="loading">
		<div class="spinner"></div>
	</div>
{:else}
	<main class="error-page">
		<div class="error-container kl-container">
			<div class="error-code">{statusCode}</div>

			<h1 class="error-title">{errorData[currentLang].title}</h1>

			<p class="error-message">{errorData[currentLang].message}</p>

			<p class="error-hint">{errorData[currentLang].hint}</p>

			<div class="error-actions">
				<button class="action-button primary grain" onclick={goHome}>
					<span class="icon">
						<Home />
					</span>
					<span>{labels.home}</span>
				</button>

				<button class="action-button secondary grain" onclick={goBack}>
					<span class="icon">
						<ArrowLeft />
					</span>
					<span>{labels.back}</span>
				</button>
			</div>
		</div>
	</main>
	<Footer />
{/if}

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;
	@use 'lib/styles/utils/_animations' as *;

	.error-page {
		display: flex;
		align-items: center;
		justify-content: center;

		.error-container {
			max-width: 600px;
			width: 100%;
			text-align: center;

			.error-code {
				font-size: 5rem;
				font-weight: 700;
				line-height: 1;
				margin-bottom: 1rem;
				background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
				-webkit-background-clip: text;
				background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			.error-title {
				font-weight: 600;
				margin-bottom: 1rem;
			}

			.error-message {
				font-size: 1.1rem;
				line-height: 1.6;
				opacity: 0.85;
				margin-bottom: 1rem;
			}

			.error-hint {
				font-size: 0.95rem;
				opacity: 0.7;
				margin-bottom: 2rem;
			}

			.error-actions {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				margin-bottom: 2rem;

				@include breakpoint('small') {
					flex-direction: row;
					justify-content: center;
				}

				.action-button {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 0.5rem;
					padding: 0.5rem 4rem;
					font-weight: 600;
					cursor: pointer;
					transition: transform 0.1s;
					min-height: 44px;
					@include borderRadius('xsmall');

					&:hover {
						transform: scale(1.05);
					}

					&:active {
						transform: scale(0.95);
					}

					.icon {
						width: 18px;
						display: inline-flex;
					}
				}
			}
		}
	}
</style>
