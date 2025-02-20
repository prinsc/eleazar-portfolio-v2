<script>
	// src/routes/+page.js
	import { redirect } from '@sveltejs/kit';

	export const load = () => {
		throw redirect(307, '/fr'); // Redirige vers /fr par défaut
	};
</script>
