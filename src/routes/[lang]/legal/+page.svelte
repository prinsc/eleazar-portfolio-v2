<script>
	import PageContent from '$lib/comp/PageContent.svelte';
	import MetaTags from '$lib/comp/metaTags.svelte';
	import { settings } from '$lib/stores/settings.js';
	import legalData from '$lib/content/data_legal.json';

	const t = legalData;
	const lang = $derived($settings.lang);
</script>

<MetaTags title={t.title[lang]} description={t.metaDescription[lang]} />

<PageContent>
	<h1>{t.title[lang]}</h1>

	<!-- 1. Informations légales -->
	<section>
		<h2>{t.sections.legalInfo.title[lang]}</h2>
		<p><strong>{t.sections.legalInfo.name[lang]}</strong> Eléazar Klyuvitkin</p>
		<p>
			<strong>{t.sections.legalInfo.legalForm[lang]}</strong>
			{t.sections.legalInfo.legalFormValue[lang]}
		</p>
		<p><strong>{t.sections.legalInfo.businessNumber[lang]}</strong> BE 1031.777.419</p>
		<p><strong>{t.sections.legalInfo.address[lang]}</strong> Mainvault 7812, Belgique</p>
		<p>
			<strong>{t.sections.legalInfo.email[lang]}</strong>
			<a href="mailto:eleazar@kltk.be">eleazar@kltk.be</a>
		</p>
		<p>
			<strong>{t.sections.legalInfo.website[lang]}</strong>
			<a href="https://kltk.be">https://kltk.be</a>
		</p>
	</section>

	<!-- 2. TVA -->
	<section>
		<h2>{t.sections.vat.title[lang]}</h2>
		<p>{t.sections.vat.content[lang]}</p>
	</section>

	<!-- 3. Hébergement -->
	<section>
		<h2>{t.sections.hosting.title[lang]}</h2>
		<p><strong>{t.sections.hosting.host[lang]}</strong> Vercel Inc.</p>
		<p>
			<strong>{t.sections.hosting.hostAddress[lang]}</strong> 440 N Barranca Ave #4133, Covina, CA
			91723, États-Unis
		</p>
		<p>
			<strong>{t.sections.hosting.hostWebsite[lang]}</strong>
			<a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
		</p>
	</section>

	<!-- 4. Propriété intellectuelle -->
	<section>
		<h2>{t.sections.intellectualProperty.title[lang]}</h2>
		<p>{t.sections.intellectualProperty.content1[lang]}</p>
		<p>{t.sections.intellectualProperty.content2[lang]}</p>
		<p>
			{t.sections.intellectualProperty.images[lang]}
			<a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>.
		</p>
	</section>

	<!-- 5. Protection des données -->
	<section>
		<h2>{t.sections.dataProtection.title[lang]}</h2>

		<h3>{t.sections.dataProtection.controller.title[lang]}</h3>
		<p>
			{t.sections.dataProtection.controller.content[lang]}
			<a href="mailto:eleazar@kltk.be">eleazar@kltk.be</a>
		</p>

		<h3>{t.sections.dataProtection.dataCollected.title[lang]}</h3>
		<p>{t.sections.dataProtection.dataCollected.content[lang]}</p>

		<h3>{t.sections.dataProtection.purpose.title[lang]}</h3>
		<p>{t.sections.dataProtection.purpose.intro[lang]}</p>
		<ul>
			<li>{t.sections.dataProtection.purpose.items.analyze[lang]}</li>
			<li>{t.sections.dataProtection.purpose.items.improve[lang]}</li>
			<li>{t.sections.dataProtection.purpose.items.identify[lang]}</li>
		</ul>

		<h3>{t.sections.dataProtection.umami.title[lang]}</h3>
		<p>{t.sections.dataProtection.umami.intro[lang]}</p>
		<ul>
			<li>{t.sections.dataProtection.umami.items.noPersonalData[lang]}</li>
			<li>{t.sections.dataProtection.umami.items.noCookies[lang]}</li>
			<li>{t.sections.dataProtection.umami.items.noThirdParty[lang]}</li>
			<li>{t.sections.dataProtection.umami.items.anonymizedIP[lang]}</li>
			<li>{t.sections.dataProtection.umami.items.europeHosted[lang]}</li>
		</ul>
		<p>
			{t.sections.dataProtection.umami.moreInfo[lang]}
			<a href="https://umami.is" target="_blank" rel="noopener noreferrer">https://umami.is</a>
		</p>

		<h3>{t.sections.dataProtection.rights.title[lang]}</h3>
		<p>{t.sections.dataProtection.rights.intro[lang]}</p>
		<ul>
			<li>{t.sections.dataProtection.rights.items.access[lang]}</li>
			<li>{t.sections.dataProtection.rights.items.rectification[lang]}</li>
			<li>{t.sections.dataProtection.rights.items.erasure[lang]}</li>
			<li>{t.sections.dataProtection.rights.items.restriction[lang]}</li>
			<li>{t.sections.dataProtection.rights.items.objection[lang]}</li>
			<li>{t.sections.dataProtection.rights.items.portability[lang]}</li>
		</ul>
		<p>
			{t.sections.dataProtection.rights.exercise[lang]}
			<a href="mailto:eleazar@kltk.be">eleazar@kltk.be</a>
		</p>

		<h3>{t.sections.dataProtection.contactForm.title[lang]}</h3>
		<p>{t.sections.dataProtection.contactForm.content[lang]}</p>
	</section>

	<!-- 6. Cookies -->
	<section>
		<h2>{t.sections.cookies.title[lang]}</h2>
		<p>{t.sections.cookies.content[lang]}</p>
	</section>

	<!-- 7. Limitation de responsabilité -->
	<section>
		<h2>{t.sections.liability.title[lang]}</h2>
		<p>{t.sections.liability.content1[lang]}</p>
		<p>{t.sections.liability.content2[lang]}</p>
	</section>

	<!-- 8. Liens externes -->
	<section>
		<h2>{t.sections.externalLinks.title[lang]}</h2>
		<p>{t.sections.externalLinks.content[lang]}</p>
	</section>

	<!-- 9. Droit applicable -->
	<section>
		<h2>{t.sections.applicableLaw.title[lang]}</h2>
		<p>{t.sections.applicableLaw.content[lang]}</p>
	</section>

	<!-- 10. Modifications -->
	<section>
		<h2>{t.sections.modifications.title[lang]}</h2>
		<p>{t.sections.modifications.content[lang]}</p>
	</section>

	<section>
		<p><em>{t.sections.lastUpdate[lang]}</em></p>
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

		h3 {
			font-size: 1.25rem;
			font-weight: 600;
			margin: 1.5rem 0 0.75rem;
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
