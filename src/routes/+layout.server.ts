// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
    // Redirige les visiteurs venant du QR code vers /fr/services
    if (url.searchParams.get('f') === 'q') {
        throw redirect(302, '/fr/services?from=qr');
    }

    return {
        cookies: cookies.getAll(),
    }
}