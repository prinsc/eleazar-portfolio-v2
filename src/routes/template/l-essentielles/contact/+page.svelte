<script>
	import BookingBanner from '../lib/components/BookingBanner.svelte';
	import { salon } from '../lib/data.js';
	import { onMount } from 'svelte';

	let formSent = $state(false);

	function handleSubmit(e) {
		e.preventDefault();
		formSent = true;
	}

	onMount(async () => {
		const { gsap } = await import('gsap');

		gsap.from('.contact-title', {
			y: 60,
			opacity: 0,
			duration: 1,
			ease: 'power3.out'
		});

		gsap.from('.contact-grid > *', {
			y: 40,
			opacity: 0,
			duration: 0.8,
			stagger: 0.15,
			delay: 0.3,
			ease: 'power3.out'
		});
	});
</script>

<svelte:head>
	<title>Contact - {salon.name}</title>
</svelte:head>

<section class="contact-page">
	<div class="contact-inner">
		<div class="contact-header">
			<span class="section-label">Contact</span>
			<h1 class="contact-title">Prenons rendez-vous</h1>
			<p class="contact-subtitle">
				Envie d'un moment beauté ? Contactez-nous par téléphone ou remplissez le formulaire
				ci-dessous.
			</p>
		</div>

		<div class="contact-grid">
			<!-- Form -->
			<div class="contact-form-wrap">
				{#if formSent}
					<div class="form-success">
						<div class="success-icon">✓</div>
						<h3>Message envoyé</h3>
						<p>Nous vous recontacterons dans les plus brefs délais.</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit}>
						<div class="form-group">
							<label for="name">Nom et prénom</label>
							<input type="text" id="name" name="name" required placeholder="Votre nom complet" />
						</div>
						<div class="form-group">
							<label for="email">Adresse e-mail</label>
							<input type="email" id="email" name="email" required placeholder="votre@email.com" />
						</div>
						<div class="form-group">
							<label for="phone">Téléphone <span class="optional">(optionnel)</span></label>
							<input type="tel" id="phone" name="phone" placeholder="04XX XX XX XX" />
						</div>
						<div class="form-group">
							<label for="service"
								>Prestation souhaitée <span class="optional">(optionnel)</span></label
							>
							<select id="service" name="service">
								<option value="">Choisir une prestation</option>
								<option value="esthetique">Esthétique</option>
								<option value="bien-etre">Bien-être</option>
								<option value="coiffure">Coiffure</option>
								<option value="autre">Autre / Je ne sais pas</option>
							</select>
						</div>
						<div class="form-group">
							<label for="message">Message</label>
							<textarea
								id="message"
								name="message"
								rows="5"
								required
								placeholder="Décrivez votre demande…"
							></textarea>
						</div>
						<button type="submit" class="btn-submit">Envoyer ma demande</button>
					</form>
				{/if}
			</div>

			<!-- Info sidebar -->
			<div class="contact-info">
				<div class="info-card">
					<h3>Par téléphone</h3>
					<a href="tel:{salon.phone.replace(/\s/g, '')}" class="info-phone">{salon.phone}</a>
					<p class="info-note">{salon.appointment}</p>
				</div>

				<div class="info-card">
					<h3>Adresse</h3>
					<p>{salon.address.street}</p>
					<p>{salon.address.city}</p>
				</div>

				<div class="info-card">
					<h3>Horaires</h3>
					<div class="info-hours">
						{#each salon.hours as { j, h }}
							<div class="hour-row" class:closed={h === 'Fermé'}>
								<span>{j}</span>
								<span>{h}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Map placeholder -->
				<div class="map-placeholder">
					<!-- client: embed Google Maps iframe here -->
					<div class="map-fake">
						<svg
							width="40"
							height="40"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#8b7d6b"
							stroke-width="1"
						>
							<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
							<circle cx="12" cy="10" r="3" />
						</svg>
						<p>Carte interactive</p>
						<span>Chaussée de Bruxelles 384, Ath</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@use '../lib/styles/mixins' as *;

	.contact-page {
		padding: 10rem 1.5rem 4rem;

		@include breakpoint('medium') {
			padding: 12rem 3rem 6rem;
		}
	}

	.contact-inner {
		max-width: 1200px;
		margin: 0 auto;
	}

	.contact-header {
		text-align: center;
		margin-bottom: 4rem;

		@include breakpoint('medium') {
			margin-bottom: 5rem;
		}
	}

	.section-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #8b7d6b;
		display: block;
		margin-bottom: 1rem;
	}

	.contact-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 300;
		color: #1a1a1a;
		margin-bottom: 1rem;
	}

	.contact-subtitle {
		font-size: 0.95rem;
		color: #777;
		max-width: 500px;
		margin: 0 auto;
		line-height: 1.7;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;

		@include breakpoint('large') {
			grid-template-columns: 1.2fr 0.8fr;
			gap: 4rem;
		}
	}

	/* Form */
	.contact-form-wrap {
		background: #fff;
		padding: 2.5rem 2rem;

		@include breakpoint('medium') {
			padding: 3rem;
		}
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #555;
		margin-bottom: 0.5rem;
	}

	.optional {
		font-weight: 400;
		text-transform: none;
		color: #bbb;
		letter-spacing: 0;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 0.9rem 1rem;
		font-family: 'DM Sans', sans-serif;
		font-size: 0.9rem;
		border: 1px solid #e8e3dc;
		background: #faf8f5;
		color: #1a1a1a;
		transition: border-color 0.3s;
		outline: none;
		border-radius: 0;
		-webkit-appearance: none;

		&:focus {
			border-color: #8b7d6b;
		}

		&::placeholder {
			color: #c4bfb6;
		}
	}

	select {
		cursor: pointer;
	}

	textarea {
		resize: vertical;
		min-height: 120px;
	}

	.btn-submit {
		width: 100%;
		padding: 1rem;
		background: #1a1a1a;
		color: #faf8f5;
		font-family: 'DM Sans', sans-serif;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		border: none;
		cursor: pointer;
		transition: background 0.3s;

		&:hover {
			background: #333;
		}
	}

	.form-success {
		text-align: center;
		padding: 3rem 1rem;

		.success-icon {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			background: #f3efe9;
			color: #8b7d6b;
			font-size: 1.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto 1.5rem;
		}

		h3 {
			font-size: 1.5rem;
			color: #1a1a1a;
			margin-bottom: 0.5rem;
		}

		p {
			font-size: 0.9rem;
			color: #777;
		}
	}

	/* Sidebar */
	.info-card {
		padding: 1.75rem 0;
		border-bottom: 1px solid #e8e3dc;

		&:first-child {
			padding-top: 0;
		}

		h3 {
			font-family: 'Cormorant Garamond', serif;
			font-size: 1.25rem;
			font-weight: 400;
			color: #1a1a1a;
			margin-bottom: 0.75rem;
		}

		p {
			font-size: 0.9rem;
			color: #555;
			line-height: 1.7;
		}
	}

	.info-phone {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
		color: #1a1a1a;
		font-weight: 500;
		display: block;
		margin-bottom: 0.25rem;
	}

	.info-note {
		font-size: 0.8rem;
		color: #999;
		font-style: italic;
	}

	.info-hours {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.hour-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.9rem;
		color: #555;

		&.closed {
			color: #bbb;
		}
	}

	.map-placeholder {
		margin-top: 2rem;
	}

	.map-fake {
		background: #f3efe9;
		padding: 3rem 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;

		p {
			font-family: 'Cormorant Garamond', serif;
			font-size: 1.15rem;
			color: #1a1a1a;
		}

		span {
			font-size: 0.8rem;
			color: #999;
		}
	}
</style>
