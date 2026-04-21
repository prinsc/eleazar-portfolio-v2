import { CAFE_DELICE, CF_SECRET, API_URL } from '$env/static/private';
const ORG_SLUG = 'le-cafe-des-delices';

export const load = async () => {
	const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=blog,infos`, {
		headers: { Authorization: `Bearer ${CAFE_DELICE}`, 'x-cf-secret': CF_SECRET }
	});
	if (!res.ok) return { blog: null, infos: null };
	const data = await res.json();
	return {
		blog: Array.isArray(data.blog) ? data.blog : null,
		infos: data.infos?.data ?? data.infos ?? null
	};
};
