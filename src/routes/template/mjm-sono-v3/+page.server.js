import { MJM, CF_SECRET, API_URL } from '$env/static/private';

const ORG_SLUG = 'mjm-sonorisation';

const ALL_SECTIONS = [
	'infos', 'seo', 'socials', 'poles', 'hero', 'galerie', 'blog', 'partenaires', 'sono_parametres', 'sono_materiel', 'sono_cta', 'sonorisation'
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
		streamed: fetchAll(MJM)
	};
};

export const actions = {
	contact: async ({ request }) => {
		const form = await request.formData();
		const payload = Object.fromEntries(form);
		// Démo — l'envoi réel sera branché plus tard.
		return { success: true, payload };
	}
};
