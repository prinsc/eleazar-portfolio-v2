import servicesData from '$lib/content/data_services.json';
import blogData from '$lib/content/data_blog.json';

const site = 'https://kltk.be';
const languages = ['fr', 'en', 'ru'];
const today = new Date().toISOString().split('T')[0];
const created = '2026-01-01';

export const GET = async () => {
    try {
        const pages = [
            { path: '', priority: '1.0', changefreq: 'weekly', lastmod: today },
            ...languages.map(lang => ({
                path: `/${lang}`,
                priority: '1.0',
                changefreq: 'weekly',
                lastmod: today
            })),
            ...languages.map(lang => ({
                path: `/${lang}/services`,
                priority: '0.9',
                changefreq: 'weekly',
                lastmod: today
            })),
            ...languages.flatMap(lang =>
                servicesData.services.map(service => ({
                    path: `/${lang}/services/${service.id}`,
                    priority: '0.8',
                    changefreq: 'monthly',
                    lastmod: created
                }))
            ),
            ...languages.map(lang => ({
                path: `/${lang}/blog`,
                priority: '0.9',
                changefreq: 'weekly',
                lastmod: today
            })),
            ...languages.flatMap(lang =>
                blogData.articles
                    .filter(article => article.content && article.content[lang])
                    .map(article => ({
                        path: `/${lang}/blog/${article.slug}`,
                        priority: '0.8',
                        changefreq: 'monthly',
                        lastmod: created
                    }))
            ),
            ...languages.map(lang => ({
                path: `/${lang}/legal`,
                priority: '0.3',
                changefreq: 'yearly',
                lastmod: created
            }))
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
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

            return `  <url>
    <loc>${site}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
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
