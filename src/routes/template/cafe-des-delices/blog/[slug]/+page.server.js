import { CAFE_DELICE, CF_SECRET, API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

const ORG_SLUG = 'le-cafe-des-delices';

export const load = async ({ params }) => {
	const { slug } = params;

	const res = await fetch(`${API_URL}/${ORG_SLUG}?sections=blog,infos`, {
		headers: { Authorization: `Bearer ${CAFE_DELICE}`, 'x-cf-secret': CF_SECRET }
	});

	const data = res.ok ? await res.json() : {};
	const blog = Array.isArray(data.blog) ? data.blog : null;
	const infos = data.infos?.data ?? data.infos ?? null;

	if (blog) {
		const post = blog.find(p => p.slug === slug);
		if (post) return { post, infos, allPosts: blog };
	}

	return { post: null, infos, allPosts: blog, slug };
};
