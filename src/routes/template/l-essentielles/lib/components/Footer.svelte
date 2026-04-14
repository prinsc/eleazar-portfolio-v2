<script>
	import { salon, nav } from '../data.js';
</script>

<footer>
	<div class="footer-inner">
		<div class="footer-brand">
			<h3 class="footer-logo">{salon.name}</h3>
			<p class="footer-tagline">{salon.tagline}</p>
		</div>

		<div class="footer-nav">
			<p class="footer-heading">Navigation</p>
			{#each nav as link}
				<a href={link.href}>{link.label}</a>
			{/each}
		</div>

		<div class="footer-contact">
			<p class="footer-heading">Contact</p>
			<p>{salon.address.street}</p>
			<p>{salon.address.city}</p>
			<p class="phone">{salon.phone}</p>
		</div>

		<div class="footer-hours">
			<p class="footer-heading">Horaires</p>
			<p>{salon.hours.weekdays.label}: <span>{salon.hours.weekdays.time}</span></p>
			<p>{salon.hours.saturday.label}: <span>{salon.hours.saturday.time}</span></p>
			<p>{salon.hours.sunday.label}: <span>{salon.hours.sunday.time}</span></p>
		</div>
	</div>

	<div class="footer-bottom">
		<p>&copy; {new Date().getFullYear()} {salon.name}. Tous droits réservés.</p>
		<p class="credit">
			Site réalisé avec soin par <a href="https://kltk.be" target="_blank" rel="noopener">Eléazar</a
			>
		</p>
	</div>
</footer>

<style lang="scss">
	@use '../styles/mixins' as *;

	footer {
		background: #1a1a1a;
		color: #c4bfb6;
		padding: 5rem 1.5rem 2rem;

		@include breakpoint('medium') {
			padding: 6rem 3rem 2rem;
		}
	}

	.footer-inner {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;

		@include breakpoint('medium') {
			grid-template-columns: 2fr 1fr 1fr 1fr;
			gap: 2rem;
		}
	}

	.footer-logo {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.75rem;
		color: #faf8f5;
		margin-bottom: 0.5rem;
	}

	.footer-tagline {
		font-size: 0.9rem;
		line-height: 1.6;
		max-width: 300px;
	}

	.footer-heading {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: #faf8f5;
		margin-bottom: 1.25rem;
	}

	.footer-nav {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;

		a {
			font-size: 0.9rem;
			transition: color 0.3s;

			&:hover {
				color: #faf8f5;
			}
		}
	}

	.footer-contact {
		p {
			font-size: 0.9rem;
			line-height: 1.8;
		}

		.phone {
			margin-top: 0.5rem;
			color: #faf8f5;
			font-weight: 500;
		}
	}

	.footer-hours {
		p {
			font-size: 0.9rem;
			line-height: 1.8;

			span {
				color: #faf8f5;
			}
		}
	}

	.footer-bottom {
		max-width: 1400px;
		margin: 4rem auto 0;
		padding-top: 2rem;
		border-top: 1px solid rgba(250, 248, 245, 0.1);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
		text-align: center;

		@include breakpoint('medium') {
			flex-direction: row;
			justify-content: space-between;
		}

		p {
			font-size: 0.8rem;
			color: #777;
		}
	}

	.credit a {
		color: #c4bfb6;
		transition: color 0.3s;

		&:hover {
			color: #faf8f5;
		}
	}
</style>
