import { LA_TOUR_DES_LEGENDES_KEY, CF_SECRET, API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

const ORG_SLUG = 'la-tour-des-legendes';

export const load = async ({ params }) => {
	try {
		const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=blog`, {
			headers: { Authorization: `Bearer ${LA_TOUR_DES_LEGENDES_KEY}`, 'x-cf-secret': CF_SECRET }
		});
		if (!res.ok) throw error(404, 'Article introuvable');
		const data = await res.json();
		const articles = Array.isArray(data.blog) ? data.blog : [];
		const article = articles.find(a => a.slug === params.slug);
		if (!article) throw error(404, 'Article introuvable');
		const others = articles.filter(a => a.slug !== params.slug && a.status === 'publie').slice(0, 3);
		return { article, others };
	} catch (e) {
		throw error(404, 'Article introuvable');
	}
};
