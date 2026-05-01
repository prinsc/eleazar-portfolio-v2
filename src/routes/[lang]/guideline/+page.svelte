<script>
	import { onMount } from 'svelte';
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';
	import MetaTags from '$lib/comp/metaTags.svelte';
	import PageContent from '$lib/comp/PageContent.svelte';
	import Button from '$lib/comp/Button.svelte';
	import BackButton from '$lib/comp/BackButton.svelte';
	import SectionTitle from '$lib/comp/SectionTitle.svelte';
	import Card from '$lib/comp/Card.svelte';
	import CTA from '$lib/comp/CTA.svelte';
	import EmblaCarousel from '$lib/comp/EmblaCarousel.svelte';
	import TechnoElement from '$lib/comp/techno/techno_element.svelte';
	import Spinner from '$lib/comp/Spinner.svelte';
	import Pulse from '$lib/comp/Pulse.svelte';
	import StatusCard from '$lib/comp/StatusCard.svelte';
	import MicroLabel from '$lib/comp/MicroLabel.svelte';
	import Caption from '$lib/comp/Caption.svelte';
	import Swatch from '$lib/comp/Swatch.svelte';
	import TypeSpecimen from '$lib/comp/TypeSpecimen.svelte';
	import RadiusSample from '$lib/comp/RadiusSample.svelte';
	import {
		ExternalLink,
		Download,
		Palette,
		Type,
		Shapes,
		Component,
		Wand2,
		Hash
	} from 'lucide-svelte';

	const t = $derived($content.site.guideline);
	const L = $derived(t.labels);

	let activeHeadingId = $state('');
	let copied = $state('');
	let animPlay = $state({ pulse: false, spin: false });

	const colorGroups = [
		{
			name: 'Brand',
			tokens: [
				{ name: '--color-primary', desc: 'Primary (text & ink)' },
				{ name: '--color-secondary', desc: 'Secondary (accent green)' },
				{ name: '--color-white', desc: 'Surface' },
				{ name: '--color-black', desc: 'Ink' }
			]
		},
		{
			name: 'Shamrock',
			tokens: [
				{ name: '--primary-color-shamrock-100' },
				{ name: '--primary-color-shamrock-200' },
				{ name: '--primary-color-shamrock-300' },
				{ name: '--primary-color-shamrock-400', desc: 'Accent' },
				{ name: '--primary-color-shamrock-500' },
				{ name: '--primary-color-shamrock-700' },
				{ name: '--primary-color-shamrock-900' }
			]
		},
		{
			name: 'Gray',
			tokens: [
				{ name: '--color-gray' },
				{ name: '--color-gray-75' },
				{ name: '--color-gray-50' },
				{ name: '--color-gray-25' },
				{ name: '--color-gray-15' },
				{ name: '--color-gray-05' }
			]
		},
		{
			name: 'Status',
			tokens: [
				{ name: '--color-red' },
				{ name: '--color-red-dark' },
				{ name: '--color-blue' },
				{ name: '--color-blue-dark' },
				{ name: '--color-green' },
				{ name: '--color-green-dark' },
				{ name: '--color-yellow' },
				{ name: '--color-orange' },
				{ name: '--color-purple' },
				{ name: '--color-gold' }
			]
		}
	];

	const typeScale = [
		{ label: 'H0', token: '--typo-size-h0' },
		{ label: 'H1', token: '--typo-size-h1' },
		{ label: 'H2', token: '--typo-size-h2' },
		{ label: 'H3', token: '--typo-size-h3' },
		{ label: 'H4', token: '--typo-size-h4' },
		{ label: 'H5', token: '--typo-size-h5' },
		{ label: 'H6', token: '--typo-size-h6' }
	];

	const radii = [
		{ key: 'xsmall', size: '~7px' },
		{ key: 'small', size: '~14px' },
		{ key: 'medium', size: '~28px' },
		{ key: 'large', size: '~42px' }
	];

	const technoSamples = ['svelte-4', 'typescript', 'sass', 'figma', 'github'];

	const toc = $derived([
		{ id: 'foundations', text: t.sections.foundations[$settings.lang], level: 2 },
		{ id: 'colors', text: t.sections.colors[$settings.lang], level: 3 },
		{ id: 'typography', text: t.sections.typography[$settings.lang], level: 3 },
		{ id: 'radii', text: t.sections.radii[$settings.lang], level: 3 },
		{ id: 'textures', text: t.sections.textures[$settings.lang], level: 3 },
		{ id: 'components', text: t.sections.components[$settings.lang], level: 2 },
		{ id: 'buttons', text: t.sections.buttons[$settings.lang], level: 3 },
		{ id: 'links', text: t.sections.links[$settings.lang], level: 3 },
		{ id: 'cards', text: t.sections.cards[$settings.lang], level: 3 },
		{ id: 'cta', text: t.sections.cta[$settings.lang], level: 3 },
		{ id: 'techno', text: t.sections.techno[$settings.lang], level: 3 },
		{ id: 'carousel', text: t.sections.carousel[$settings.lang], level: 3 },
		{ id: 'navigation', text: t.sections.navigation[$settings.lang], level: 3 },
		{ id: 'forms', text: t.sections.forms[$settings.lang], level: 3 },
		{ id: 'feedback', text: t.sections.feedback[$settings.lang], level: 3 },
		{ id: 'animations', text: t.sections.animations[$settings.lang], level: 2 },
		{ id: 'utilities', text: t.sections.utilities[$settings.lang], level: 2 }
	]);

	function scrollToHeading(id) {
		const el = document.getElementById(id);
		if (!el) return;
		const top = el.getBoundingClientRect().top + window.scrollY - 80;
		window.scrollTo({ top, behavior: 'smooth' });
	}

	async function copyToken(token) {
		try {
			await navigator.clipboard.writeText(`var(${token})`);
			copied = token;
			setTimeout(() => {
				if (copied === token) copied = '';
			}, 1200);
		} catch {}
	}

	onMount(() => {
		const headings = toc.map((h) => document.getElementById(h.id)).filter(Boolean);
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
				if (visible.length > 0) activeHeadingId = visible[0].target.id;
			},
			{ rootMargin: '-80px 0px -70% 0px', threshold: 0 }
		);
		headings.forEach((h) => observer.observe(h));
		return () => observer.disconnect();
	});
</script>

<MetaTags
	title={t.title[$settings.lang]}
	description={t.subtitle[$settings.lang]}
	robots="noindex, nofollow"
/>

<PageContent
	{toc}
	tocTitle={t.tocTitle[$settings.lang]}
	{activeHeadingId}
	onHeadingClick={scrollToHeading}
>
	<BackButton href={`/${$settings.lang}/`} />

	<header class="gl-header">
		<h1>{t.title[$settings.lang]}</h1>
		<p class="subtitle">{t.subtitle[$settings.lang]}</p>
		<p class="intro">{t.intro[$settings.lang]}</p>
	</header>

	<div class="divider"></div>

	<!-- ====================================== FOUNDATIONS -->
	<section class="gl-section">
		<h2 id="foundations" class="gl-h2">
			<span class="num">01</span>
			<span>{t.sections.foundations[$settings.lang]}</span>
		</h2>

		<h3 id="colors" class="gl-h3">
			<Palette size={16} />
			{t.sections.colors[$settings.lang]}
		</h3>
		<Caption>Click any token to copy <code>var(--token-name)</code>.</Caption>
		{#each colorGroups as group}
			<div class="color-group">
				<MicroLabel as="h4">{group.name}</MicroLabel>
				<div class="swatches">
					{#each group.tokens as token}
						<Swatch
							token={token.name}
							desc={token.desc}
							copied={copied === token.name}
							onclick={() => copyToken(token.name)}
						/>
					{/each}
				</div>
			</div>
		{/each}

		<h3 id="typography" class="gl-h3">
			<Type size={16} />
			{t.sections.typography[$settings.lang]}
		</h3>
		<Caption>font-family: <code>Inter</code>, weight 100→900 variable.</Caption>

		<div class="type-scale">
			{#each typeScale as ts}
				<TypeSpecimen label={ts.label} token={ts.token} sample={t.sample[$settings.lang]} />
			{/each}
		</div>

		<div class="paragraph-demo">
			<MicroLabel as="h4">Paragraph & inline</MicroLabel>
			<p>{@html t.sampleParagraph[$settings.lang]}</p>
		</div>

		<h3 id="radii" class="gl-h3">
			<Shapes size={16} />
			{t.sections.radii[$settings.lang]}
		</h3>
		<Caption>
			Clip-path clothoid (G2 continuity) — from
			<a href="https://onotakehiko.com/clothoid/" target="_blank" rel="noopener">onotakehiko.com/clothoid</a>.
		</Caption>
		<div class="radii-grid">
			{#each radii as r}
				<RadiusSample radius={r.key} size={r.size} />
			{/each}
		</div>

		<h3 id="textures" class="gl-h3">
			<Wand2 size={16} />
			{t.sections.textures[$settings.lang]}
		</h3>
		<div class="texture-grid">
			<div class="texture-card grain">
				<MicroLabel>.grain</MicroLabel>
				<Caption size="sm">SVG fractal noise overlay (opacity 0.2)</Caption>
			</div>
			<div class="texture-card kl-container grain">
				<MicroLabel>.kl-container .grain</MicroLabel>
				<Caption size="sm">Padded panel + grain</Caption>
			</div>
			<div class="texture-card">
				<MicroLabel>NeuroShader</MicroLabel>
				<Caption size="sm">Layout background, opacity 0.1, hidden &lt; 576px</Caption>
			</div>
		</div>
	</section>

	<div class="divider"></div>

	<!-- ====================================== COMPONENTS -->
	<section class="gl-section">
		<h2 id="components" class="gl-h2">
			<span class="num">02</span>
			<span>{t.sections.components[$settings.lang]}</span>
		</h2>

		<h3 id="buttons" class="gl-h3">
			<Component size={16} />
			{t.sections.buttons[$settings.lang]}
		</h3>
		<Caption><code>$lib/comp/Button.svelte</code></Caption>

		<div class="demo-grid">
			<div class="demo-cell">
				<MicroLabel>{L.primary[$settings.lang]} / sm·md·lg</MicroLabel>
				<div class="row-flex">
					<Button variant="primary" size="sm">Action</Button>
					<Button variant="primary" size="md">Action</Button>
					<Button variant="primary" size="lg">Action</Button>
				</div>
			</div>

			<div class="demo-cell">
				<MicroLabel>{L.secondary[$settings.lang]}</MicroLabel>
				<div class="row-flex">
					<Button variant="secondary" size="sm">Action</Button>
					<Button variant="secondary" size="md">Action</Button>
					<Button variant="secondary" size="lg">Action</Button>
				</div>
			</div>

			<div class="demo-cell">
				<MicroLabel>{L.accent[$settings.lang]} / {L.ghost[$settings.lang]} / {L.link[$settings.lang]}</MicroLabel>
				<div class="row-flex">
					<Button variant="accent">Accent</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
				</div>
			</div>

			<div class="demo-cell">
				<MicroLabel>{L.withIcon[$settings.lang]}</MicroLabel>
				<div class="row-flex">
					<Button variant="primary">
						{#snippet icon()}<ExternalLink />{/snippet}
						{$content.site.contactMe[$settings.lang]}
					</Button>
					<Button variant="secondary" iconPosition="left">
						{#snippet icon()}<Download />{/snippet}
						Download
					</Button>
				</div>
			</div>

			<div class="demo-cell">
				<MicroLabel>{L.disabled[$settings.lang]} / {L.fullWidth[$settings.lang]}</MicroLabel>
				<div class="row-flex stack">
					<Button variant="primary" disabled={true}>Disabled</Button>
					<Button variant="primary" fullWidth={true}>Full width</Button>
				</div>
			</div>
		</div>

		<h3 id="links" class="gl-h3">
			<Component size={16} />
			{t.sections.links[$settings.lang]}
		</h3>
		<div class="demo-block">
			<p>Default: <a href="#!">hyperlink with shamrock highlight</a> — <code>::after</code> grows on hover.</p>
			<p>Underline: <a href="#!" class="underline">classic underline link</a>.</p>
			<p>No-effect: <a href="#!" class="no-effect">plain anchor, no decoration</a>.</p>
		</div>

		<h3 id="cards" class="gl-h3">
			<Component size={16} />
			{t.sections.cards[$settings.lang]}
		</h3>
		<Caption>
			<code>$lib/comp/Card.svelte</code> — props: <code>title</code>, <code>description</code>, <code>tagline</code>, <code>image</code>, <code>technos</code>, <code>link</code>, <code>pricing</code>, <code>date</code>, <code>elementType</code>
		</Caption>
		<div class="cards-demo">
			<Card
				title="Project Alpha"
				description="A short description of what this card represents."
				technos={['svelte-4', 'typescript', 'sass']}
				link="#!"
				date="2025"
				elementType="a"
				tooltipContent="Demo link"
			/>
			<Card
				title="Service Béta"
				tagline="Tagline élégante et concise."
				description=""
				technos={['figma', 'shopify']}
				pricing="dès 950€"
				link="#!"
				elementType="a"
			/>
			<Card title="Image card" description="elementType=div, no image → placeholder." elementType="div" />
		</div>

		<h3 id="cta" class="gl-h3">
			<Component size={16} />
			{t.sections.cta[$settings.lang]}
		</h3>
		<Caption><code>$lib/comp/CTA.svelte</code> — variants: <code>default</code>, <code>inline</code></Caption>
		<CTA variant="inline" />
		<CTA />

		<h3 id="techno" class="gl-h3">
			<Component size={16} />
			{t.sections.techno[$settings.lang]}
		</h3>
		<Caption><code>$lib/comp/techno/techno_element.svelte</code> — hover for tooltip</Caption>
		<div class="techno-row">
			{#each technoSamples as techno}
				<TechnoElement {techno} />
			{/each}
		</div>

		<h3 id="carousel" class="gl-h3">
			<Component size={16} />
			{t.sections.carousel[$settings.lang]}
		</h3>
		<Caption><code>$lib/comp/EmblaCarousel.svelte</code></Caption>
		<div class="carousel-frame">
			<EmblaCarousel>
				{#each Array(5) as _, i}
					<div class="item">
						<div class="demo-slide">
							<span class="num">{(i + 1).toString().padStart(2, '0')}</span>
							<span>Slide</span>
						</div>
					</div>
				{/each}
			</EmblaCarousel>
		</div>

		<h3 id="navigation" class="gl-h3">
			<Component size={16} />
			{t.sections.navigation[$settings.lang]}
		</h3>
		<Caption><code>SectionTitle</code>, <code>BackButton</code></Caption>
		<div class="demo-block">
			<SectionTitle level={3}>Section title</SectionTitle><br />
			<SectionTitle level={3} count={12}>With count</SectionTitle><br />
			<SectionTitle level={3} size="large">
				{#snippet icon()}<Hash />{/snippet}
				With icon
			</SectionTitle>
			<div style="margin-top: 1rem">
				<BackButton href="#!" label="Custom label" />
			</div>
		</div>

		<h3 id="forms" class="gl-h3">
			<Component size={16} />
			{t.sections.forms[$settings.lang]}
		</h3>
		<form class="demo-form" onsubmit={(e) => e.preventDefault()}>
			<label>
				<MicroLabel>Text input</MicroLabel>
				<input type="text" placeholder="Type something..." />
			</label>
			<label>
				<MicroLabel>Email</MicroLabel>
				<input type="email" placeholder="you@kltk.be" />
			</label>
			<label>
				<MicroLabel>Textarea</MicroLabel>
				<textarea rows="3" placeholder="Message..."></textarea>
			</label>
			<label>
				<MicroLabel>Select</MicroLabel>
				<select>
					<option>Option 1</option>
					<option>Option 2</option>
				</select>
			</label>
			<label class="check-row">
				<input type="checkbox" />
				<span>Accept the terms</span>
			</label>
			<div class="row-flex">
				<Button variant="primary" type="submit">Submit</Button>
				<Button variant="ghost" type="reset">Reset</Button>
			</div>
		</form>

		<h3 id="feedback" class="gl-h3">
			<Component size={16} />
			{t.sections.feedback[$settings.lang]}
		</h3>
		<div class="feedback-grid">
			<StatusCard variant="success" title="Success">Action completed.</StatusCard>
			<StatusCard variant="info" title="Info">FYI message.</StatusCard>
			<StatusCard variant="warning" title="Warning">Heads up.</StatusCard>
			<StatusCard variant="error" title="Error">Something went wrong.</StatusCard>
		</div>

		<div class="demo-block">
			<MicroLabel as="h4">Loading spinner</MicroLabel>
			<div style="margin-top: 0.5rem"><Spinner size={28} /></div>
		</div>

		<div class="demo-block">
			<MicroLabel as="h4">Disponibility pulse</MicroLabel>
			<div style="margin-top: 0.5rem">
				<Pulse label="active / available" />
			</div>
		</div>
	</section>

	<div class="divider"></div>

	<!-- ====================================== ANIMATIONS -->
	<section class="gl-section">
		<h2 id="animations" class="gl-h2">
			<span class="num">03</span>
			<span>{t.sections.animations[$settings.lang]}</span>
		</h2>
		<Caption>Hover squares for transitions. Click pulse/spin to play (off by default — perf-friendly).</Caption>

		<div class="anim-grid">
			<div class="anim-card">
				<div class="anim-target hover-lift"></div>
				<code>:hover → translateY(-5px)</code>
			</div>
			<div class="anim-card">
				<div class="anim-target hover-scale"></div>
				<code>:hover → scale(1.1)</code>
			</div>
			<div class="anim-card">
				<button
					class="anim-target pulse-target"
					class:playing={animPlay.pulse}
					onclick={() => (animPlay.pulse = !animPlay.pulse)}
					aria-label="Toggle pulse"
				></button>
				<code>@keyframes pulseEffect</code>
			</div>
			<div class="anim-card">
				<button
					class="anim-target spin-target"
					class:playing={animPlay.spin}
					onclick={() => (animPlay.spin = !animPlay.spin)}
					aria-label="Toggle spin"
				></button>
				<code>@keyframes spin</code>
			</div>
		</div>
	</section>

	<div class="divider"></div>

	<!-- ====================================== UTILITIES -->
	<section class="gl-section">
		<h2 id="utilities" class="gl-h2">
			<span class="num">04</span>
			<span>{t.sections.utilities[$settings.lang]}</span>
		</h2>
		<div class="util-list">
			<div><code>.grain</code> <span>SVG noise overlay (z-index: -1, opacity 0.2)</span></div>
			<div><code>.kl-container</code> <span>Padded panel (2rem) + small radius</span></div>
			<div><code>.divider</code> <span>1px line w/ optional centered span label</span></div>
			<div><code>.full</code> <span>width: 100%</span></div>
			<div><code>.no-effect</code> <span>Anchor without ::after highlight</span></div>
			<div><code>.underline</code> <span>Anchor with text underline only</span></div>
			<div><code>.color-red / -blue / -green / -yellow / -purple / -gold</code> <span>!important text-color helpers</span></div>
		</div>
	</section>

	<div class="divider"><span>{t.title[$settings.lang]}</span></div>
</PageContent>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.gl-header {
		margin: 1rem 0 3rem;

		h1 {
			font-size: 2.5rem;
			font-weight: 700;
			line-height: 1.05;
			margin: 0;
			letter-spacing: -0.02em;
			@include breakpoint('small') {
				font-size: 3.5rem;
			}
		}

		.subtitle {
			font-size: 1.1rem;
			opacity: 0.85;
			margin-top: 1rem;
			max-width: 50ch;
			line-height: 1.5;
		}

		.intro {
			margin-top: 2rem;
			padding-top: 2rem;
			border-top: 1px solid var(--color-gray-15);
			opacity: 0.7;
			max-width: 65ch;
			font-size: 0.95rem;
		}
	}

	.gl-section {
		margin: 3rem 0;
	}

	.gl-h2 {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		font-size: 1.5rem;
		font-weight: 700;
		text-transform: none;
		letter-spacing: -0.01em;
		margin: 3rem 0 2rem;
		padding-bottom: 1rem;
		border-bottom: 2px solid var(--color-primary);
		scroll-margin-top: 90px;

		.num {
			font-family: ui-monospace, 'SFMono-Regular', monospace;
			font-size: 0.7em;
			opacity: 0.4;
			letter-spacing: 0;
		}
	}

	.gl-h3 {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
		text-transform: none;
		margin: 2.5rem 0 0.75rem;
		scroll-margin-top: 90px;
		opacity: 0.85;

		:global(svg) {
			opacity: 0.6;
		}
	}

	.demo-block {
		margin: 0.5rem 0 1.5rem;
	}

	.color-group {
		margin-bottom: 1.5rem;
	}

	.swatches {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.4rem;
		margin-top: 0.5rem;

		@include breakpoint('small') {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.type-scale {
		display: flex;
		flex-direction: column;
		margin: 1rem 0 1.5rem;
	}

	.paragraph-demo {
		max-width: 60ch;
		margin: 1.5rem 0;

		p {
			margin-top: 0.5rem;
		}
	}

	.radii-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin: 1rem 0;

		@include breakpoint('small') {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.texture-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
		margin: 1rem 0;

		@include breakpoint('small') {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.texture-card {
		min-height: 120px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 0.25rem;
		border: 1px solid var(--color-gray-15);
		@include borderRadius('xsmall');
	}

	.demo-grid {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin: 1rem 0 1.5rem;
	}

	.demo-cell {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.row-flex {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		align-items: center;

		&.stack {
			flex-direction: column;
			align-items: stretch;
			max-width: 320px;
		}
	}

	.cards-demo {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin: 0.75rem 0 1.5rem;

		@include breakpoint('small') {
			grid-template-columns: repeat(2, 1fr);
		}

		@include breakpoint('large') {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.techno-row {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.carousel-frame {
		margin: 0.75rem 0 1.5rem;

		.demo-slide {
			min-height: 130px;
			padding: 1.25rem;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			border: 1px solid var(--color-gray-15);
			@include borderRadius('xsmall');

			.num {
				font-family: ui-monospace, 'SFMono-Regular', monospace;
				font-size: 1.4rem;
				font-weight: 700;
				opacity: 0.4;
			}
		}
	}

	.demo-form {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		margin: 0.75rem 0 1.5rem;
		max-width: 480px;

		label {
			display: flex;
			flex-direction: column;
			gap: 0.3rem;
			font-size: 0.85rem;

			&.check-row {
				flex-direction: row;
				align-items: center;
				gap: 0.5rem;
			}
		}

		input[type='text'],
		input[type='email'],
		textarea,
		select {
			padding: 0.65rem 0.85rem;
			font: inherit;
			background: transparent;
			color: var(--color-black);
			border: 1px solid var(--color-gray-25);
			@include borderRadius('xsmall');
			transition: border-color 0.15s;

			&:focus {
				border-color: var(--color-primary);
				outline: none;
			}
		}

		textarea {
			resize: vertical;
			min-height: 70px;
		}
	}

	.feedback-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.6rem;
		margin: 0.75rem 0 1.5rem;

		@include breakpoint('small') {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.anim-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
		margin: 1rem 0;

		@include breakpoint('small') {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.anim-card {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		align-items: center;
		justify-content: space-between;
		min-height: 130px;
		border: 1px solid var(--color-gray-15);
		@include borderRadius('xsmall');

		code {
			font-family: ui-monospace, 'SFMono-Regular', monospace;
			font-size: 0.65rem;
			text-align: center;
			opacity: 0.7;
		}

		.anim-target {
			all: unset;
			width: 40px;
			height: 40px;
			background: var(--color-primary);
			@include borderRadius('xsmall');
			cursor: pointer;
			transition: transform 0.25s ease;

			&.hover-lift:hover {
				transform: translateY(-5px);
			}
			&.hover-scale:hover {
				transform: scale(1.1);
			}
			&.pulse-target {
				background: var(--primary-color-shamrock-400);
				&.playing {
					animation: pulseEffect 1.5s infinite ease-in-out;
				}
			}
			&.spin-target {
				border-radius: 50%;
				background: conic-gradient(
					from 0deg,
					var(--color-primary),
					var(--primary-color-shamrock-400),
					var(--color-primary)
				);
				&.playing {
					animation: spin 2s linear infinite;
				}
			}
		}
	}

	.util-list {
		display: flex;
		flex-direction: column;
		margin: 1rem 0;

		> div {
			display: grid;
			grid-template-columns: 1fr;
			gap: 0.2rem;
			padding: 0.65rem 0;
			border-top: 1px solid var(--color-gray-10);

			&:last-child {
				border-bottom: 1px solid var(--color-gray-10);
			}

			@include breakpoint('small') {
				grid-template-columns: 280px 1fr;
				gap: 1rem;
				align-items: baseline;
			}

			code {
				font-family: ui-monospace, 'SFMono-Regular', monospace;
				font-size: 0.78rem;
				font-weight: 600;
			}

			span {
				font-size: 0.85rem;
				opacity: 0.7;
			}
		}
	}
</style>
