import { CAFE_DELICE, CF_SECRET } from '$env/static/private';

const API_URL = 'https://admin.kltk.be/api';
const ORG_SLUG = 'le-cafe-des-delices';

async function fetchSection(section, key) {
	const res = await fetch(`${API_URL}/${ORG_SLUG}/?sections=${section}`, {
		headers: {
			Authorization: `Bearer ${key}`,
			'x-cf-secret': CF_SECRET
		}
	});
	console.log(res)
	if (!res.ok) return null;
	return res.json();
}

export const load = async () => {
	const data = await fetchSection('horaires,poles,galerie', CAFE_DELICE);
	console.log('Données récupérées du CMS:', data);
	return {
		horaires: data?.horaires?.data ?? null,
		poles: data?.poles?.data ?? null,
		galerie: data?.galerie ?? null
	};
};
