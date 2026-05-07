import { LA_TOUR_DES_LEGENDES_KEY, CF_SECRET, API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

const ORG_SLUG = 'la-tour-des-legendes';

export const load = async ({ params }) => {
	try {
		const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=evenements`, {
			headers: { Authorization: `Bearer ${LA_TOUR_DES_LEGENDES_KEY}`, 'x-cf-secret': CF_SECRET }
		});
		if (!res.ok) throw error(404);
		const data = await res.json();
		const list = Array.isArray(data.evenements) ? data.evenements : [];
		const ev = list.find(e => e.id === params.slug);
		if (!ev) throw error(404);
		return { ev };
	} catch (e) {
		throw error(404, 'Événement introuvable');
	}
};
