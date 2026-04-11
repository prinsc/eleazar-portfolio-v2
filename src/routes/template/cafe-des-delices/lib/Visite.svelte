<script>
	import { infos, horaires, cuisine } from './data.js';
	import Status from './Status.svelte';
</script>

<section class="visite" id="visite">
	<span class="visite__num">05 — Nous trouver</span>

	<div class="visite__grid">
		<div class="col col--intro">
			<h2 class="visite__title">
				Poussez<br />
				<em>la porte,</em><br />
				nous sommes<br />
				là.
			</h2>
			<p class="addr">
				{infos.nom}<br />
				{infos.adresse}<br />
				{infos.ville}, {infos.pays}
			</p>
			<div class="contact">
				<a href="mailto:{infos.email}">{infos.email}</a>
				<a href="tel:{infos.telephone}">{infos.telephone}</a>
			</div>
		</div>

		<div class="col col--hours">
			<Status />

			<span class="label">Horaires du lieu</span>
			<ul class="hours">
				{#each horaires as h}
					<li>
						<span>{h.j}</span>
						<span class="dots" aria-hidden="true"></span>
						<span>{h.h}</span>
					</li>
				{/each}
			</ul>

			<div class="kitchen">
				<span class="label">Service en cuisine</span>
				<p>
					Midi · <strong>{cuisine.midi}</strong><br />
					Soir · <strong>{cuisine.soir}</strong>
				</p>
			</div>
		</div>

		<div class="col col--map">
			<div class="map">
				<svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">
					<defs>
						<pattern id="cdd-grid" width="10" height="10" patternUnits="userSpaceOnUse">
							<path
								d="M 10 0 L 0 0 0 10"
								fill="none"
								stroke="currentColor"
								stroke-width="0.3"
								opacity="0.3"
							/>
						</pattern>
					</defs>
					<rect width="200" height="200" fill="url(#cdd-grid)" />
					<path
						d="M 0 120 Q 60 110 100 100 T 200 90"
						stroke="currentColor"
						stroke-width="0.8"
						fill="none"
						opacity="0.5"
					/>
					<path
						d="M 40 0 L 60 200"
						stroke="currentColor"
						stroke-width="0.8"
						fill="none"
						opacity="0.5"
					/>
					<path
						d="M 0 60 L 200 80"
						stroke="currentColor"
						stroke-width="0.8"
						fill="none"
						opacity="0.5"
					/>
					<rect
						x="86"
						y="86"
						width="28"
						height="28"
						fill="none"
						stroke="currentColor"
						stroke-width="0.6"
						opacity="0.5"
					/>
					<circle cx="100" cy="100" r="4" fill="var(--ember, currentColor)" />
					<circle
						cx="100"
						cy="100"
						r="14"
						fill="none"
						stroke="var(--ember, currentColor)"
						stroke-width="0.6"
						opacity="0.6"
					>
						<animate attributeName="r" from="14" to="30" dur="2.4s" repeatCount="indefinite" />
						<animate
							attributeName="opacity"
							from="0.6"
							to="0"
							dur="2.4s"
							repeatCount="indefinite"
						/>
					</circle>
				</svg>
			</div>
			<span class="map__cap">{infos.adresse} — {infos.ville}</span>

			<a class="reserv" href="mailto:{infos.email}?subject=Réservation">
				<span>Réserver une table</span>
				<svg
					viewBox="0 0 24 24"
					width="14"
					height="14"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<path d="M5 12h14M13 6l6 6-6 6" />
				</svg>
			</a>
		</div>
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.visite {
		padding: 5rem 1.25rem;
		border-top: 1px solid var(--rule);
		position: relative;

		@include breakpoint('medium') {
			padding: 7rem 2rem;
		}
	}
	.visite__num {
		position: absolute;
		top: 1.25rem;
		left: 1.25rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);

		@include breakpoint('medium') {
			top: 2rem;
			left: 2rem;
		}
	}
	.visite__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.5rem;
		max-width: 1400px;
		margin: 0 auto;
		align-items: start;

		@include breakpoint('large') {
			grid-template-columns: 1.3fr 1fr 1.2fr;
			gap: 4rem;
		}
	}
	.visite__title {
		margin: 0 0 2rem;
		font-family: var(--f-display);
		font-weight: 300;
		font-size: clamp(2.2rem, 5vw, 4.5rem);
		line-height: 0.95;
		letter-spacing: -0.025em;
	}
	.visite__title em {
		font-family: var(--f-italic);
		font-style: italic;
		font-weight: 400;
		color: var(--ember);
	}
	.addr {
		font-family: var(--f-display);
		font-size: 1.05rem;
		line-height: 1.55;
		color: var(--slate);
		margin: 0 0 1.25rem;
	}
	.contact {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
	}
	.contact a {
		color: var(--slate);
		text-decoration: none;
		border-bottom: 1px solid var(--slate);
		padding-bottom: 0.25em;
		align-self: flex-start;
		transition:
			color 0.3s ease,
			border-color 0.3s ease;
	}
	.contact a:hover {
		color: var(--ember);
		border-color: var(--ember);
	}

	.label {
		display: block;
		font-family: var(--f-mono);
		font-size: 9px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--slate-soft);
		margin: 0.6rem 0;
	}
	.hours {
		list-style: none;
		margin: 0 0 2rem;
		padding: 0;
		border-top: 1px solid var(--rule);
	}
	.hours li {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.75rem;
		align-items: center;
		padding: 0.85rem 0;
		border-bottom: 1px solid var(--rule);
		font-family: var(--f-display);
		font-size: 0.95rem;
	}
	.hours .dots {
		height: 1px;
		background-image: linear-gradient(to right, var(--rule) 50%, transparent 0%);
		background-size: 5px 1px;
		background-repeat: repeat-x;
	}
	.kitchen p {
		margin: 0;
		font-family: var(--f-display);
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--slate);
	}
	.kitchen strong {
		font-family: var(--f-display);
		font-weight: 600;
		color: var(--ember);
	}

	.map {
		width: 100%;
		aspect-ratio: 1;
		border: 1px solid var(--slate);
		color: var(--slate);
		background: var(--cream);
	}
	.map__cap {
		display: block;
		margin-top: 0.75rem;
		font-family: var(--f-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--slate-soft);
	}
	.reserv {
		display: inline-flex;
		align-items: center;
		gap: 0.6em;
		margin-top: 1.5rem;
		padding: 0.9em 1.4em;
		border: 1px solid var(--slate);
		border-radius: 999px;
		font-family: var(--f-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--slate);
		transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.reserv:hover {
		background: var(--ember);
		border-color: var(--ember);
		color: var(--cream);
	}

	.col--hours {
		padding-top: 1rem;

		@include breakpoint('large') {
			padding-top: 0.5rem;
		}
	}
</style>
