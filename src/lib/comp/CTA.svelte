<script>
	import { ExternalLink } from 'lucide-svelte';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';

	let {
		title = null,
		description = null,
		buttonText = null,
		subject = null,
		url = null, // URL externe optionnelle (si fournie, utilisée au lieu du mailto)
		variant = 'default' // 'default' ou 'inline'
	} = $props();

	// Valeurs par défaut si non fournies
	const defaultTitle = $derived(title || $content.site.interestedInService?.[$settings.lang]);
	const defaultDescription = $derived(description || $content.site.letsDiscuss?.[$settings.lang]);
	const defaultButtonText = $derived(buttonText || $content.site.contactMe?.[$settings.lang]);

	// Construction de l'URL mailto
	const mailtoUrl = $derived(
		`mailto:${$settings.email.address}?subject=${encodeURIComponent(
			subject || $content.site.inquirySubject?.[$settings.lang] || 'Contact'
		)}&body=${encodeURIComponent($settings.email.body?.[$settings.lang] || '')}`
	);

	// Utiliser l'URL fournie ou le mailto par défaut
	const ctaUrl = $derived(url || mailtoUrl);
</script>

{#if variant === 'inline'}
	<aside class="cta-inline grain">
		<div class="cta-content">
			<h3>{defaultTitle}</h3>
			<p>{defaultDescription}</p>
		</div>
		<a href={ctaUrl} class="cta-button grain no-effect" target={url ? '_blank' : undefined} rel={url ? 'noopener noreferrer' : undefined}>
			{defaultButtonText}
			<span class="icon">
				<ExternalLink />
			</span>
		</a>
	</aside>
{:else}
	<section class="cta">
		<div class="grain kl-container">
			<h2>{defaultTitle}</h2>
			<p>{defaultDescription}</p>
			<a href={ctaUrl} class="cta-button grain no-effect" target={url ? '_blank' : undefined} rel={url ? 'noopener noreferrer' : undefined}>
				{defaultButtonText}
				<span class="icon">
					<ExternalLink />
				</span>
			</a>
		</div>
	</section>
{/if}

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	/* CTA Section (default - pour fin de page) */
	.cta {
		margin: 4rem 0 2rem;

		.kl-container {
			padding: 3rem 2rem;
			text-align: center;
			@include borderRadius('small');
			overflow: hidden;

			h2 {
				font-size: 1.75rem;
				font-weight: 700;
				margin-bottom: 0.5rem;
			}

			p {
				font-size: 1.1rem;
				opacity: 0.8;
				margin-bottom: 2rem;
			}

			.cta-button {
				display: inline-flex;
				align-items: center;
				gap: 0.5rem;
				padding: 1rem 2rem;
				font-weight: 600;
				font-size: 1.1rem;
				@include borderRadius('xsmall');
				transition: transform 0.2s;
				overflow: hidden;
				box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
				text-decoration: none;
				&:hover {
					transform: scale(1.05);
				}

				.icon {
					width: 18px;
					display: inline-flex;
				}
			}
		}
	}

	/* CTA Inline (pour insertion dans le contenu) */
	.cta-inline {
		margin: 3rem 0;
		padding: 2rem;
		@include borderRadius('small');
		overflow: hidden;
		box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: flex-start;

		@include breakpoint('small') {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.cta-content {
			flex: 1;

			h3 {
				font-weight: 700;
				margin-block: unset;
				margin-bottom: 1rem;
			}

			p {
				font-size: 1rem;
				opacity: 0.8;
				margin: 0;
			}
		}

		.cta-button {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.875rem 1.5rem;
			font-weight: 600;
			@include borderRadius('xsmall');
			transition: transform 0.1s;
			overflow: hidden;
			white-space: nowrap;
			text-decoration: none;
			&:hover {
				transform: scale(1.02);
			}

			.icon {
				width: 16px;
				display: inline-flex;
			}
		}
	}
</style>
