import { LESSENTIELLES } from '$env/static/private';

const API_URL = 'https://admin.kltk.be/api';
const ORG_SLUG = 'l-essenti-elles';

async function fetchSection(section, key) {
	const res = await fetch(`${API_URL}/${ORG_SLUG}/?sections=${section}`, {
		headers: { Authorization: `Bearer ${key}` }
	});
	if (!res.ok) return null;
	return res.json();
}

export const load = async () => {
	const data = await fetchSection('horaires', LESSENTIELLES);
	return {
		horaires: data?.horaires?.data ?? null
	};
};
