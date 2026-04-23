import { CAFE_DELICE, CF_SECRET, API_URL } from '$env/static/private';
const ORG_SLUG = 'le-cafe-des-delices';

// Unwrap { data: [...] } ou tableau direct - retourne true si contenu non-vide
function isActive(val) {
	if (Array.isArray(val)) return val.length > 0;
	if (val && Array.isArray(val.data)) return val.data.length > 0;
	return false;
}

export const load = async () => {
	const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=infos,socials,galerie,events,news,blog`, {
		headers: { Authorization: `Bearer ${CAFE_DELICE}`, 'x-cf-secret': CF_SECRET }
	});
	if (!res.ok) return { infos: null, socials: null, sections: {} };
	const data = await res.json();
	return {
		infos: data.infos?.data ?? data.infos ?? null,
		socials: data.socials?.data ?? data.socials ?? null,
		sections: {
			galerie: isActive(data.galerie),
			events: isActive(data.events),
			news: isActive(data.news),
			blog: isActive(data.blog)
		}
	};
};
