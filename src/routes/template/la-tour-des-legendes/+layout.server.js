import { LA_TOUR_DES_LEGENDES_KEY, CF_SECRET, API_URL } from '$env/static/private';

const ORG_SLUG = 'la-tour-des-legendes';
const LAYOUT_SECTIONS = 'infos,horaires,socials,cta,alerte,seo';

export const load = async () => {
	try {
		const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=${LAYOUT_SECTIONS}`, {
			headers: {
				Authorization: `Bearer ${LA_TOUR_DES_LEGENDES_KEY}`,
				'x-cf-secret': CF_SECRET
			}
		});
		if (!res.ok) return { layout: null };
		const data = await res.json();
		return {
			layout: {
				infos: data.infos?.data ?? data.infos ?? null,
				horaires: data.horaires?.data ?? data.horaires ?? null,
				socials: data.socials?.data ?? data.socials ?? null,
				cta: data.cta?.data ?? data.cta ?? null,
				alerte: data.alerte?.data ?? data.alerte ?? null,
				seo: data.seo?.data ?? data.seo ?? null
			}
		};
	} catch (e) {
		return { layout: null };
	}
};
