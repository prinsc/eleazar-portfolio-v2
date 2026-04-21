import { CAFE_DELICE, CF_SECRET, API_URL } from '$env/static/private';
const ORG_SLUG = 'le-cafe-des-delices';

export const load = async () => {
	const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=galerie,infos`, {
		headers: { Authorization: `Bearer ${CAFE_DELICE}`, 'x-cf-secret': CF_SECRET }
	});
	if (!res.ok) return { galerie: null, infos: null };
	const data = await res.json();
	return {
		galerie: Array.isArray(data.galerie) ? data.galerie : null,
		infos: data.infos?.data ?? data.infos ?? null
	};
};
