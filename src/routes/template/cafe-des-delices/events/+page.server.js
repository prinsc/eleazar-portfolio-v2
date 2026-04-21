import { CAFE_DELICE, CF_SECRET, API_URL } from '$env/static/private';
const ORG_SLUG = 'le-cafe-des-delices';

export const load = async () => {
	const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=evenements,infos`, {
		headers: { Authorization: `Bearer ${CAFE_DELICE}`, 'x-cf-secret': CF_SECRET }
	});
	if (!res.ok) return { events: null, infos: null };
	const data = await res.json();
	return {
		events: Array.isArray(data.evenements) ? data.evenements : null,
		infos: data.infos?.data ?? data.infos ?? null
	};
};
