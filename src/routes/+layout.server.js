import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
    // Redirige les visiteurs venant du QR code vers /fr/services
    if (url.searchParams.get('f') === 'q') {
        throw redirect(302, '/fr/services?from=qr');
    }
};
