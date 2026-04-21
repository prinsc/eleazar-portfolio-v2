import { CAFE_DELICE, CF_SECRET, API_URL } from '$env/static/private';
const ORG_SLUG = 'le-cafe-des-delices';

export const load = async () => {
	const res = await fetch(
		`${API_URL}/${ORG_SLUG}?sections=infos,horaires-cuisine`,
		{
			headers: { Authorization: `Bearer ${CAFE_DELICE}`, 'x-cf-secret': CF_SECRET }
		}
	);
	if (!res.ok) return { infos: null, cuisine: null };
	const data = await res.json();
	return {
		infos: data.infos?.data ?? data.infos ?? null,
		cuisine: data['horaires-cuisine']?.data ?? data['horaires-cuisine'] ?? null
	};
};
