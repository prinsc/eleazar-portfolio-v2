<script>
	import { settings } from '$lib/stores/settings.js';
	import PageContent from '$lib/comp/PageContent.svelte';
</script>

<footer>
	<PageContent>
		<div class="footer-bottom">
			<p class="legal">© 2025 Eléazar Klyuvitkin – BE 1031.777.419</p>
			<p class="legal">TVA non applicable (franchise – art. 56bis CTVA)</p>
			<a href="/{$settings.lang}/legal" class="footer-link legal no-effect">
				{$settings.lang === 'fr'
					? 'Mentions légales'
					: $settings.lang === 'en'
						? 'Legal Notice'
						: 'Юридическая информация'}
			</a>
		</div>
	</PageContent>
</footer>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	footer {
		// border-top: 1px solid var(--color-gray-15);

		.footer-content {
			max-width: 1200px;
			margin: 0 auto;
			display: grid;
			grid-template-columns: 1fr;
			gap: 2rem;
			margin-bottom: 2rem;

			@include breakpoint('small') {
				grid-template-columns: repeat(2, 1fr);
			}

			@include breakpoint('large') {
				grid-template-columns: repeat(3, 1fr);
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
