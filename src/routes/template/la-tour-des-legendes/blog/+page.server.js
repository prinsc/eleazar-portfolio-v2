import { LA_TOUR_DES_LEGENDES_KEY, CF_SECRET, API_URL } from '$env/static/private';

const ORG_SLUG = 'la-tour-des-legendes';

export const load = async () => {
	try {
		const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=blog,actualites`, {
			headers: { Authorization: `Bearer ${LA_TOUR_DES_LEGENDES_KEY}`, 'x-cf-secret': CF_SECRET }
		});
		if (!res.ok) return { blog: [], actualites: [] };
		const data = await res.json();
		return {
			blog: Array.isArray(data.blog) ? data.blog : [],
			actualites: Array.isArray(data.actualites) ? data.actualites : []
		};
	} catch { return { blog: [], actualites: [] }; }
};
