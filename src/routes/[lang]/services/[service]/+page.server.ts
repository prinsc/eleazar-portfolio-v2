import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const apiGoogle = env.GOOGLE_PLACES_API_KEY;

    if (!apiGoogle) {
        return { googleData: null };
    }

    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', 'ChIJ2VHJ-KniY0wRG6JNX9-azRo');
    url.searchParams.set('fields', 'reviews,rating,user_ratings_total,name');
    url.searchParams.set('language', 'fr');
    url.searchParams.set('key', apiGoogle);

    try {
        const res = await fetch(url.toString());

        if (!res.ok) {
            return { googleData: null };
        }

        const data = await res.json();
        if (data.status !== 'OK') {
            return { googleData: null };
        }

        return { googleData: data.result };
    } catch (e) {
        return { googleData: null };
    }
};
