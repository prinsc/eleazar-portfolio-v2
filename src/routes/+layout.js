import { settings } from '$lib/stores/settings.js';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
    if (browser) {
        const lang = url.pathname.split('/')[1]; // Récupère la langue depuis l'URL

        // Vérifie si la langue est dans la liste des langues disponibles
        settings.update($settings => {
            if ($settings.langList.includes(lang)) {
                $settings.lang = lang;
            } else {
                // Redirige vers la langue par défaut si la langue n'est pas valide
                throw redirect(307, '/fr');
            }
            return $settings;
        });
    }
};