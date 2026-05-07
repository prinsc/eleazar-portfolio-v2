<script>
	let { data } = $props();
	const a = $derived(data.article);
	function fmt(d) { try { return new Date(d).toLocaleDateString('fr-BE', { day: '2-digit', month: 'long', year: 'numeric' }); } catch { return d; } }
</script>

<svelte:head>
	<title>{a.title} — La Tour des Légendes</title>
	<meta name="description" content={a.summary} />
	<meta property="og:title" content={a.title} />
	<meta property="og:description" content={a.summary} />
	{#if a.image}<meta property="og:image" content={a.image} />{/if}
	{@html '<script type="application/ld+json">' + JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: a.title,
		datePublished: a.date,
		author: { '@type': 'Organization', name: a.author },
		image: a.image
	}) + '</' + 'script>'}
</svelte:head>

<article class="art">
	<a class="back" href="/template/la-tour-des-legendes/blog">← Tous les articles</a>

	<header class="head">
		{#if a.category}<p class="cat">{a.category}</p>{/if}
		<h1>{a.title}</h1>
		<div class="meta">
			<span class="auth">par <em>{a.author}</em></span>
			<span class="dot">✦</span>
			<time>{fmt(a.date)}</time>
		</div>
	</header>

	{#if a.image}
		<figure class="hero-img">
			<img src={a.image} alt={a.title} />
		</figure>
	{/if}

	<div class="body">
		{#if a.summary}<p class="lead">{a.summary}</p>{/if}
		<div class="content">
			{#each (a.content ?? '').split(/\n\n+/) as para, i}
				<p>
					{#if i === 0}<span class="dropcap">{para.charAt(0)}</span>{para.slice(1)}{:else}{para}{/if}
				</p>
			{/each}
		</div>
	</div>

	{#if data.others?.length}
		<aside class="more">
			<p class="kick">— À lire aussi —</p>
			<ul>
				{#each data.others as o}
					<li>
						<a href={`/template/la-tour-des-legendes/blog/${o.slug}`}>
							<span class="cat">{o.category}</span>
							<h3>{o.title}</h3>
							<span class="ar">→</span>
						</a>
					</li>
				{/each}
			</ul>
		</aside>
	{/if}
</article>

<style lang="scss">
	@use '../../lib/styles/mixins' as *;

	.art {
		padding: 4rem 1.25rem 8rem;
		max-width: 760px;
		margin: 0 auto;
		@include breakpoint('medium') { padding: 5rem 2.5rem 10rem; }
	}
	.back {
		display: inline-block;
		font-family: var(--f-mono);
		font-size: 0.74rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		padding: 0.4rem 0;
		color: var(--accent-deep);
		margin-bottom: 3rem;
	}
	.head { margin-bottom: 3rem; }
	.cat {
		font-family: var(--f-mono);
		font-size: 0.78rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1rem;
	}
	h1 {
		font-family: var(--f-display);
		font-size: clamp(2.2rem, 6vw, 4.5rem);
		line-height: 1;
		letter-spacing: -0.02em;
		margin-bottom: 2rem;
	}
	.meta {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		font-family: var(--f-mono);
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--ink-mute);
		.auth em { color: var(--ink); font-style: italic; font-family: var(--f-display); font-size: 1.1rem; text-transform: none; letter-spacing: 0; }
		.dot { color: var(--accent); }
	}
	.hero-img {
		margin: 0 0 4rem;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: var(--base-deep);
		img { width: 100%; height: 100%; object-fit: cover; }
	}
	.lead {
		font-family: var(--f-display);
		font-style: italic;
		font-size: 1.4rem;
		line-height: 1.45;
		color: var(--ink-soft);
		padding-bottom: 2rem;
		margin-bottom: 2rem;
		border-bottom: 1px dashed var(--rule-strong);
	}
	.content p {
		font-family: var(--f-display);
		font-size: 1.15rem;
		line-height: 1.65;
		margin-bottom: 1.5rem;
		color: var(--ink);
	}
	.dropcap {
		float: left;
		font-family: var(--f-display);
		font-style: italic;
		font-weight: 700;
		font-size: 5em;
		line-height: 0.8;
		padding: 0.05em 0.1em 0 0;
		color: var(--accent);
	}
	.more {
		margin-top: 6rem;
		padding-top: 4rem;
		border-top: 1px solid var(--ink);
		.kick {
			font-family: var(--f-mono);
			font-size: 0.78rem;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: var(--accent);
			text-align: center;
			margin-bottom: 2rem;
		}
		ul { display: flex; flex-direction: column; gap: 1rem; }
		a {
			display: grid;
			grid-template-columns: auto 1fr auto;
			gap: 1rem;
			align-items: baseline;
			padding: 1.2rem 0;
			border-top: 1px solid var(--rule);
			.cat { font-family: var(--f-mono); font-size: 0.7rem; letter-spacing: 0.16em; color: var(--accent-deep); text-transform: uppercase; min-width: 80px; }
			h3 { font-family: var(--f-display); font-size: 1.3rem; line-height: 1.15; }
			.ar { font-size: 1.2rem; transition: transform 0.3s; }
			&:hover .ar { transform: translateX(6px); }
		}
	}
</style>
