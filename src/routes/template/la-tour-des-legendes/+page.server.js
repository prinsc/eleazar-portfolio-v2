import { LA_TOUR_DES_LEGENDES_KEY, CF_SECRET, API_URL } from '$env/static/private';

const ORG_SLUG = 'la-tour-des-legendes';
const ALL_SECTIONS = [
	'infos', 'horaires', 'alerte', 'seo', 'cta', 'socials',
	'avis', 'poles', 'hero', 'carte', 'menus', 'galerie',
	'evenements', 'actualites', 'blog', 'partenaires'
].join(',');

async function fetchAll() {
	try {
		const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=${ALL_SECTIONS}`, {
			headers: {
				Authorization: `Bearer ${LA_TOUR_DES_LEGENDES_KEY}`,
				'x-cf-secret': CF_SECRET
			}
		});
		if (!res.ok) return null;
		return await res.json();
	} catch (e) {
		return null;
	}
}

export const load = async () => {
	return { streamed: fetchAll() };
};
