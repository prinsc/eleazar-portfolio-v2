import { LA_TOUR_DES_LEGENDES_KEY, CF_SECRET, API_URL } from '$env/static/private';

const ORG_SLUG = 'la-tour-des-legendes';

export const load = async () => {
	try {
		const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=evenements`, {
			headers: { Authorization: `Bearer ${LA_TOUR_DES_LEGENDES_KEY}`, 'x-cf-secret': CF_SECRET }
		});
		if (!res.ok) return { evenements: [] };
		const data = await res.json();
		return { evenements: Array.isArray(data.evenements) ? data.evenements : [] };
	} catch { return { evenements: [] }; }
};
