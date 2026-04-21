import { CAFE_DELICE, CF_SECRET, API_URL } from '$env/static/private';

const ORG_SLUG = 'le-cafe-des-delices';

const ALL_SECTIONS = [
	'infos', 'horaires', 'horaires-cuisine', 'alerte', 'fermetures',
	'seo', 'cta', 'plat_du_jour', 'socials', 'avis', 'poles',
	'carte', 'menus', 'galerie', 'events', 'news', 'blog','restaurant_parametres'
].join(',');

async function fetchAll(key) {
	const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=${ALL_SECTIONS}`, {
		headers: {
			Authorization: `Bearer ${key}`,
			'x-cf-secret': CF_SECRET
		}
	});
	if (!res.ok) return null;
	return res.json();
}

export const load = async () => {
	return {
		streamed: fetchAll(CAFE_DELICE)
	};
};
