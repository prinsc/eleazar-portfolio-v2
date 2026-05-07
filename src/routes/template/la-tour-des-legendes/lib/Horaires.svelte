<script>
	let { horaires = [], infos = null } = $props();
	const now = new Date();
	const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
	const today = days[now.getDay()];
	const todayData = $derived(horaires?.find(h => h.j === today));

	function isOpenNow(h) {
		if (!h || h.ferme) return false;
		const m = now.getHours() * 60 + now.getMinutes();
		return h.periodes?.some(p => {
			const [dh, dm] = p.debut.split(':').map(Number);
			const [fh, fm] = p.fin.split(':').map(Number);
			return m >= dh * 60 + dm && m <= fh * 60 + fm;
		});
	}
	const open = $derived(isOpenNow(todayData));
</script>

<section id="infos" class="hr" aria-label="Horaires & infos pratiques">
	<div class="grid">
		<div class="left">
			<p class="eye"><span>10</span> Pratique</p>
			<h2>
				Horaires<br/>
				<em>& accès</em>
			</h2>

			<div class="status" class:open class:closed={!open}>
				<span class="ind"></span>
				<span class="lab">{open ? 'Ouvert maintenant' : 'Fermé actuellement'}</span>
				<span class="d">— {today}</span>
			</div>
		</div>

		<table class="tab">
			<tbody>
				{#each (horaires ?? []) as h}
					<tr class:today={h.j === today}>
						<th scope="row">
							{#if h.j === today}<span class="mark">→</span>{/if}
							{h.j}
						</th>
						<td>
							{#if h.ferme}
								<span class="closed">— Fermé</span>
							{:else}
								<span class="periods">
									{#each h.periodes as p, i}
										<span class="p">{p.debut}<span class="dash">—</span>{p.fin}</span>
									{/each}
								</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		{#if infos}
			<div class="ext">
				<dl class="features">
					{#if infos.terrasse}<div><dt>Terrasse</dt><dd>oui</dd></div>{/if}
					{#if infos.parking}<div><dt>Parking</dt><dd>{infos.parking || 'oui'}</dd></div>{/if}
					{#if infos.wifi}<div><dt>Wi-Fi</dt><dd>{infos.wifiNom || 'oui'}</dd></div>{/if}
					{#if infos.accesHandicape}<div><dt>Accès PMR</dt><dd>oui</dd></div>{/if}
				</dl>
				{#if infos.googleMapsUrl}
					<a class="map-cta" href={infos.googleMapsUrl} target="_blank" rel="noopener">
						S'y rendre <span aria-hidden="true">↗</span>
					</a>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	@use './styles/mixins' as *;

	.hr {
		padding: 5rem 1.25rem;
		background: var(--base-warm);
		@include breakpoint('medium') { padding: 7rem 2.5rem; }
		@include breakpoint('large') { padding: 9rem 4rem; }
	}
	.grid {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		gap: 3rem;
		@include breakpoint('large') {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 4rem;
		}
	}
	.left {
		.eye {
			font-family: var(--f-mono);
			font-size: 0.72rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--accent);
			display: inline-flex; gap: 1rem; align-items: center;
			margin-bottom: 1.5rem;
			span { padding: 0.3rem 0.6rem; background: var(--ink); color: var(--gold); }
		}
		h2 {
			font-family: var(--f-display);
			font-size: clamp(2.4rem, 6vw, 4.5rem);
			line-height: 0.95;
			em { font-style: italic; color: var(--accent); }
			margin-bottom: 2rem;
		}
	}
	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 1rem;
		border: 1px solid var(--ink);
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		.ind {
			width: 8px; height: 8px; border-radius: 50%;
			background: var(--accent);
			animation: pulse 1.6s ease-in-out infinite;
		}
		&.open .ind { background: #2da870; }
		&.closed .ind { background: var(--ink-mute); animation: none; }
		.d { opacity: 0.6; }
	}

	.tab {
		width: 100%;
		border-collapse: collapse;
		font-family: var(--f-mono);
		tr {
			border-bottom: 1px dashed var(--rule-strong);
			&.today {
				background: var(--ink);
				color: var(--gold);
				th, td { padding-inline: 0.5rem; }
				.mark { color: var(--gold); margin-right: 0.4rem; }
			}
		}
		th, td {
			text-align: left;
			padding: 0.85rem 0;
			font-weight: 400;
			font-size: 0.95rem;
		}
		th {
			font-family: var(--f-display);
			font-size: 1.05rem;
			width: 40%;
		}
		td {
			text-align: right;
			font-size: 0.85rem;
		}
		.closed { font-style: italic; opacity: 0.6; }
		.periods { display: inline-flex; flex-wrap: wrap; gap: 0.6rem; justify-content: flex-end; }
		.dash { padding: 0 0.2rem; opacity: 0.5; }
	}

	.ext { display: flex; flex-direction: column; gap: 2rem; }
	.features {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem 2rem;
		div {
			padding-top: 1rem;
			border-top: 1px solid var(--rule);
		}
		dt {
			font-family: var(--f-mono);
			font-size: 0.7rem;
			letter-spacing: 0.18em;
			text-transform: uppercase;
			color: var(--ink-mute);
			margin-bottom: 0.4rem;
		}
		dd {
			margin: 0;
			font-family: var(--f-display);
			font-size: 1.1rem;
		}
	}
	.map-cta {
		align-self: start;
		display: inline-flex;
		gap: 0.6rem;
		padding: 1rem 1.5rem;
		background: var(--ink);
		color: var(--gold);
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		transition: background 0.2s, transform 0.2s;
		&:hover { background: var(--accent-deep); transform: translateY(-2px); }
	}

	@keyframes pulse {
		0%, 100% { transform: scale(1); opacity: 1; }
		50% { transform: scale(1.6); opacity: 0.4; }
	}
</style>
