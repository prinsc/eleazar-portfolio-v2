<script>
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';
	import { Star, MessageSquare } from 'lucide-svelte';
	import EmblaCarousel from '$lib/comp/EmblaCarousel.svelte';

	let { googleData } = $props();

	let reviewsToShow = $derived.by(() => {
		if (!googleData?.reviews) return [];
		return googleData.reviews.slice(0, 5);
	});
</script>

{#if googleData && googleData.reviews && googleData.reviews.length > 0}
	<section class="reviews">
		<h2>
			<img src="/assets/icons/google.svg" alt="Google" width="12" height="12" />
			{$content.site.reviews.title[$settings.lang]} ({reviewsToShow.length})
		</h2>
		<EmblaCarousel>
			{#snippet children()}
				{#each reviewsToShow as review}
					<div class="item">
						<div class="container review-card">
							<div class="review-header">
								<div class="author-info">
									<img
										src={review.profile_photo_url}
										alt={review.author_name}
										referrerpolicy="no-referrer"
										class="author-avatar"
									/>
									<div class="author-details">
										<p class="author-name">{review.author_name}</p>
										<div class="rating">
											{#each { length: 5 } as _, i}
												<Star
													size={14}
													fill={i < review.rating ? 'currentColor' : 'none'}
													stroke-width={1.5}
												/>
											{/each}
											<span class="rating-value">{review.rating}</span>
										</div>
									</div>
								</div>
							</div>
							<p class="review-text">{review.text}</p>
							<p class="review-date">
								{new Date(review.time * 1000).toLocaleDateString($settings.lang)} - {review.relative_time_description}
							</p>
						</div>
					</div>
				{/each}
				<div class="item">
					<div class="container review-card review-cta grain">
						<div class="cta-content">
							<div class="cta-icon">
								<MessageSquare size={32} />
							</div>
							<div class="cta-text">
								<h3>
									{$content.site.reviews.cta.title[$settings.lang]}
								</h3>
								<p>
									{$content.site.reviews.cta.description[$settings.lang]}
								</p>
							</div>
						</div>
						<a href={$settings.google.reviewUrl} target="_blank" class="cta-button no-effect">
							{$content.site.reviews.cta.button[$settings.lang]}
						</a>
					</div>
				</div>
			{/snippet}
		</EmblaCarousel>
	</section>
{/if}

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	section.reviews {
		margin: 2rem 0;

		h2 {
			display: flex;
			align-items: center;
			gap: 0.3rem;
			img {
				margin-bottom: -1px;
				margin-right: 0.25rem;
			}
		}

		.review-card {
			padding: 1.5rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			@include borderRadius('xsmall');
			height: 100%;

			&.review-cta {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				gap: 1.5rem;
				align-items: stretch;

				.cta-content {
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					gap: 1rem;
					flex: 1;

					.cta-icon {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 60px;
						height: 60px;
						border-radius: 50%;
						background: var(--color-gray-25);
						color: var(--color-black);
					}

					.cta-text {
						h3 {
							margin: 0;
							font-weight: 600;
							font-size: 1.1rem;
						}

						p {
							margin: 0;
							font-size: 0.9rem;
							opacity: 0.75;
						}
					}
				}

				.cta-button {
					display: block;
					text-align: center;
					padding: 0.75rem 1.5rem;
					background: var(--color-primary);
					color: var(--color-white);
					border-radius: 6px;
					font-weight: 500;
					transition: all 0.2s;
					&:hover {
						transform: scale(1.02);
					}
				}
			}

			.review-header {
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				gap: 1rem;

				.author-info {
					display: flex;
					align-items: center;
					gap: 0.75rem;
					flex: 1;

					.author-avatar {
						width: 40px;
						height: 40px;
						border-radius: 50%;
						object-fit: cover;
						flex-shrink: 0;
					}

					.author-details {
						display: flex;
						flex-direction: column;
						gap: 0.25rem;

						.author-name {
							font-weight: 600;
							font-size: 0.95rem;
							margin: 0;
						}

						.rating {
							display: flex;
							gap: 0.2rem;
							color: var(--color-orange-dark);
							align-items: center;
							.rating-value {
								font-weight: 600;
								margin-left: 0.25rem;
								font-size: 0.75rem;
								opacity: 0.75;
								flex-shrink: 0;
								color: var(--color-primary);
							}
						}
					}
				}
			}

			.review-text {
				font-size: 0.95rem;
				line-height: 1.5;
				margin: 0;
				opacity: 0.85;
				flex-grow: 1;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				line-clamp: 4;
				-webkit-box-orient: vertical;
			}

			.review-date {
				font-size: 0.8rem;
				opacity: 0.6;
				margin: 0;
				margin-top: 0.25rem;
			}
		}
	}
</style>
