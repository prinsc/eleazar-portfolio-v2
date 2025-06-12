import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		// Si tu as déjà d'autres options dans 'server', ajoute 'allowedHosts'
		allowedHosts: [
			'f6e9-2a02-a03f-c54b-1f00-f125-f333-a68c-f120.ngrok-free.app'
		],
		// ...d'autres options éventuelles
	}
});
