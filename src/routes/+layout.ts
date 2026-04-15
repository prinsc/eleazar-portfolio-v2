import { settings } from '$lib/stores/settings.js';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url, fetch, data, depends }) => {

    // Redirige les visiteurs venant du QR code vers /fr/services (prioritaire)
    if (url.searchParams.get('f') === 'q') {
        throw redirect(302, '/fr/services?from=qr');
    }

    // Les routes /template/* sont totalement indépendantes (templates client) :
    // pas de redirection langue, pas de layout global.
    if (url.pathname.startsWith('/template')) {
        return {};
    }

    const { langList } = get(settings);
    const lang = url.pathname.split('/')[1];

    // Redirige vers la langue par défaut si absent ou inconnu
    if (!lang || !langList.includes(lang)) {
        throw redirect(301, `/${langList[0]}`);
    }

    settings.update($settings => {
        $settings.lang = lang;
        return $settings;
    });

    return { lang };
};
