import servicesData from '$lib/content/data_services.json';
import blogData from '$lib/content/data_blog.json';
import type { RequestHandler } from '@sveltejs/kit';

const site = 'https://kltk.be';
const languages = ['fr', 'en', 'ru'];

export const GET: RequestHandler = async () => {
    const lastmod = new Date().toISOString().split('T')[0];

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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
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

        const hreflangLinks = availableLanguages.map(lang => {
            const altPath = page.path === ''
                ? `/${lang}`
                : page.path.replace(/^\/(fr|en|ru)/, `/${lang}`);
            return `		<xhtml:link rel="alternate" hreflang="${lang}" href="${site}${altPath}" />`;
        }).join('\n');

        const defaultLang = availableLanguages.includes('fr') ? 'fr' : availableLanguages[0];
        const defaultPath = page.path === ''
            ? `/${defaultLang}`
            : page.path.replace(/^\/(fr|en|ru)/, `/${defaultLang}`);

        return `	<url>
        <loc>${site}${page.path}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
        <xhtml:link rel="alternate" hreflang="x-default" href="${site}${defaultPath}" />
${hreflangLinks}
    </url>`;
    }).join('\n')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=0, must-revalidate', // ← Ajoutez "public" et "must-revalidate"
            'X-Content-Type-Options': 'nosniff',
            'Vercel-CDN-Cache-Control': 'max-age=0', // ← Force Vercel à recacher proprement
            'x-vercel-cache': 'MISS'
        }
    });
};
