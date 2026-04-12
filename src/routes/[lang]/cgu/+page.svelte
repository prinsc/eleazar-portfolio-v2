<script>
	import PageContent from '$lib/comp/PageContent.svelte';
	import MetaTags from '$lib/comp/metaTags.svelte';
	import { settings } from '$lib/stores/settings.js';
	import cguData from '$lib/content/data_cgu.json';

	const t = cguData;
	const lang = $derived($settings.lang);
</script>

<MetaTags title={t.title[lang]} description={t.metaDescription[lang]} />

<PageContent>
	<h1>{t.title[lang]}</h1>

	<!-- Préambule -->
	<section>
		<h2>{t.sections.intro.title[lang]}</h2>
		<p>{t.sections.intro.content[lang]}</p>
	</section>

	<!-- 1. Acceptation -->
	<section>
		<h2>{t.sections.acceptance.title[lang]}</h2>
		<p>{t.sections.acceptance.content[lang]}</p>
	</section>

	<!-- 2. Objet -->
	<section>
		<h2>{t.sections.purpose.title[lang]}</h2>
		<p>{t.sections.purpose.content[lang]}</p>
	</section>

	<!-- 3. Propriété intellectuelle -->
	<section>
		<h2>{t.sections.ip.title[lang]}</h2>
		<p>{t.sections.ip.content1[lang]}</p>
		<p>{t.sections.ip.content2[lang]}</p>
	</section>

	<!-- 4. Templates -->
	<section>
		<h2>{t.sections.templates.title[lang]}</h2>
		<p>{t.sections.templates.content1[lang]}</p>
		<p>{t.sections.templates.content2[lang]}</p>
		<p>{t.sections.templates.content3[lang]}</p>
	</section>

	<!-- 5. Interdictions -->
	<section>
		<h2>{t.sections.prohibitions.title[lang]}</h2>
		<p>{t.sections.prohibitions.intro[lang]}</p>
		<ul>
			<li>{t.sections.prohibitions.items.copy[lang]}</li>
			<li>{t.sections.prohibitions.items.distribute[lang]}</li>
			<li>{t.sections.prohibitions.items.reverseEngineer[lang]}</li>
			<li>{t.sections.prohibitions.items.removeNotices[lang]}</li>
		</ul>
	</section>

	<!-- 6. Responsabilité -->
	<section>
		<h2>{t.sections.liability.title[lang]}</h2>
		<p>{t.sections.liability.content[lang]}</p>
	</section>

	<!-- 7. Droit applicable -->
	<section>
		<h2>{t.sections.law.title[lang]}</h2>
		<p>{t.sections.law.content[lang]}</p>
	</section>

	<!-- 8. Modifications -->
	<section>
		<h2>{t.sections.modifications.title[lang]}</h2>
		<p>{t.sections.modifications.content[lang]}</p>
	</section>

	<!-- 9. Contact -->
	<section>
		<h2>{t.sections.contact.title[lang]}</h2>
		<p>
			{t.sections.contact.content[lang]}
			<a href="mailto:eleazar@kltk.be">eleazar@kltk.be</a>
		</p>
	</section>

	<section>
		<p><em>{t.lastUpdate[lang]}</em></p>
	</section>
</PageContent>

<style lang="scss">
	@use 'lib/styles/themes/_mixins' as *;

	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 2rem;
		color: var(--color-text);

		@include breakpoint('small') {
			font-size: 3rem;
		}
	}

	section {
		margin-bottom: 3rem;

		h2 {
			font-size: 1.75rem;
			font-weight: 600;
			margin: 2rem 0 1rem;
			color: var(--color-text);
		}

		p {
			font-size: 1rem;
			line-height: 1.8;
			margin: 0.75rem 0;
			color: var(--color-text);
		}

		ul {
			margin: 1rem 0;
			padding-left: 2rem;

			li {
				font-size: 1rem;
				line-height: 1.8;
				margin: 0.5rem 0;
			}
		}

		a {
			color: var(--color-primary);
			text-decoration: underline;

			&:hover {
				opacity: 0.8;
			}
		}

		em {
			opacity: 0.7;
			font-size: 0.95rem;
		}
	}
</style>
