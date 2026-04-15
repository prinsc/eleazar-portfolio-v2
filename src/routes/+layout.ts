import { settings } from '$lib/stores/settings.js';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';

export const load: LayoutLoad = async ({ url, fetch, data, depends }) => {
    depends('supabase:auth');

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

    const supabase = isBrowser()
        ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
            global: { fetch },
        })
        : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
            global: { fetch },
            cookies: {
                getAll() {
                    return data.cookies;
                },
            },
        });

    const { data: claimsData, error } = await supabase.auth.getClaims();
    const claims = error ? null : claimsData?.claims;

    return { lang, supabase, claims };
};
