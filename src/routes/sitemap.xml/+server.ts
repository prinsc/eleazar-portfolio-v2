import servicesData from '$lib/content/data_services.json';
import blogData from '$lib/content/data_blog.json';

const site = 'https://kltk.be';
const languages = ['fr', 'en', 'ru'];

export const GET = async () => {
    try {
        const pages = [
            { path: '', priority: '1.0', changefreq: 'weekly' },
            ...languages.map(lang => ({
                path: `/${lang}`,
                priority: '1.0',
                changefreq: 'weekly'
            })),
            ...languages.map(lang => ({
                path: `/${lang}/services`,
                priority: '0.9',
                changefreq: 'weekly'
            })),
            ...languages.flatMap(lang =>
                servicesData.services.map(service => ({
                    path: `/${lang}/services/${service.id}`,
                    priority: '0.8',
                    changefreq: 'monthly'
                }))
            ),
            ...languages.map(lang => ({
                path: `/${lang}/blog`,
                priority: '0.9',
                changefreq: 'weekly'
            })),
            ...languages.flatMap(lang =>
                blogData.articles
                    .filter(article => article.content && article.content[lang])
                    .map(article => ({
                        path: `/${lang}/blog/${article.slug}`,
                        priority: '0.8',
                        changefreq: 'monthly'
                    }))
            ),
            ...languages.map(lang => ({
                path: `/${lang}/legal`,
                priority: '0.3',
                changefreq: 'yearly'
            }))
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                      http://www.w3.org/TR/xhtml11/xhtml11_schema.html
                      http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
  xmlns:xhtml="http://www.w3.org/TR/xhtml11/xhtml11_schema.html"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${pages.map(page => {
            const availableLanguages = (() => {
                const blogMatch = page.path.match(/^\/(fr|en|ru)\/blog\/(.+)$/);
                if (blogMatch) {
                    const slug = blogMatch[2];
                    const article = blogData.articles.find(a => a.slug === slug);
                    if (article) {
                        return languages.filter(lang => article.content && article.content[lang]);
                    }
                }
                return languages;
            })();

            const defaultLang = availableLanguages.includes('fr') ? 'fr' : availableLanguages[0];
            const defaultPath = page.path === ''
                ? `/${defaultLang}`
                : page.path.replace(/^\/(fr|en|ru)/, `/${defaultLang}`);

            // ← FIX : Construction propre des hreflang DANS <url>
            const hreflangLinks = [
                `    <xhtml:link rel="alternate" hreflang="x-default" href="${site}${defaultPath}" />`,
                ...availableLanguages.map(lang => {
                    const altPath = page.path === ''
                        ? `/${lang}`
                        : page.path.replace(/^\/(fr|en|ru)/, `/${lang}`);
                    return `    <xhtml:link rel="alternate" hreflang="${lang}" href="${site}${altPath}" />`;
                })
            ].join('\n');

            const isBlog = page.path.includes('/blog');
            const lastmodTag = isBlog ? '<lastmod>2026-01-01</lastmod>' : '';

            // ← FIX : Structure XML propre avec indentation cohérente
            return `  <url>
    <loc>${site}${page.path}</loc>
    ${lastmodTag}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
${hreflangLinks}
  </url>`;
        }).join('\n')}
</urlset>`;

        return new Response(xml, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, max-age=0, must-revalidate',
                'X-Content-Type-Options': 'nosniff',
                'Vercel-CDN-Cache-Control': 'max-age=0',
                'x-vercel-cache': 'MISS'
            }
        });
    } catch (e) {
        console.error(e);
        return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><error>${e.message}</error></urlset>`, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8'
            },
            status: 500
        });
    }
};
