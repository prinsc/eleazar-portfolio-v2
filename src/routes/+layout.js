// +layout.js OU +layout.server.js

import { settings } from '$lib/stores/settings.js';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
    // Redirige les visiteurs venant du QR code vers /fr/services (prioritaire)
    if (url.searchParams.get('f') === 'qr') {
        throw redirect(302, '/fr/services?from=qr');
    }

    const { langList } = get(settings);
    const lang = url.pathname.split('/')[1];

    // Redirige vers la langue par défaut si absent ou inconnu
    if (!lang || !langList.includes(lang)) {
        throw redirect(301, `/${langList[0]}`); // Par exemple, 'fr'
    }

    // Met à jour la langue côté client (c'est inutile côté serveur, plus bas !)
    settings.update($settings => {
        $settings.lang = lang;
        return $settings;
    });

    // Donne optionnellement la langue au layout Svelte
    return {
        lang
    };
};
