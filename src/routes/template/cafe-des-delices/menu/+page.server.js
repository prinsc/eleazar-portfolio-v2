import { CAFE_DELICE, CF_SECRET, API_URL } from '$env/static/private';
const ORG_SLUG = 'le-cafe-des-delices';

function buildCarteTree(carte) {
	if (!carte) return null;
	const cats = Array.isArray(carte.categories) ? carte.categories : [];
	const items = Array.isArray(carte.items) ? carte.items : [];

	// roots = catégories sans parent
	const roots = cats
		.filter((c) => !c.parent_id)
		.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

	return {
		categories: roots.map((root) => {
			const subcategories = cats
				.filter((c) => c.parent_id === root.id)
				.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
				.map((sub) => ({
					...sub,
					items: items
						.filter((i) => i.category_id === sub.id)
						.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
				}));

			const directItems = items
				.filter((i) => i.category_id === root.id)
				.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

			return { ...root, subcategories, items: directItems };
		})
	};
}

export const load = async () => {
	const res = await fetch(
		`${API_URL}/${ORG_SLUG}?sections=menus,carte,horaires-cuisine,infos`,
		{
			headers: { Authorization: `Bearer ${CAFE_DELICE}`, 'x-cf-secret': CF_SECRET }
		}
	);
	if (!res.ok) return { menus: null, carte: null, cuisine: null, infos: null };
	const data = await res.json();
	return {
		menus: Array.isArray(data.menus) ? data.menus : null,
		carte: buildCarteTree(data.carte),
		cuisine: data['horaires-cuisine']?.data ?? data['horaires-cuisine'] ?? null,
		infos: data.infos?.data ?? data.infos ?? null
	};
};
