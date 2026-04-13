// src/routes/api/places/[placeId]/+server.ts
import { GOOGLE_PLACES_API_KEY } from '$env/static/private'
import { PUBLIC_GOOGLE_PLACE_ID } from "$env/static/public"
import { env } from '$env/dynamic/private';
import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

const apiGoogle = env.GOOGLE_PLACES_API_KEY;
const placeId = PUBLIC_GOOGLE_PLACE_ID;
export const GET: RequestHandler = async ({ }) => {

    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    url.searchParams.set('place_id', placeId)
    url.searchParams.set('fields', 'reviews,rating,user_ratings_total,name')
    url.searchParams.set('language', 'fr')
    url.searchParams.set('key', apiGoogle)

    const res = await fetch(url)

    if (!res.ok) {
        console.log('Erreur Google Places API:', res.status, res.statusText)
        throw error(502, 'Erreur Google Places API')
    }

    const data = await res.json()
    if (data.status !== 'OK') {
        throw error(404, `Place introuvable : ${data.status}`)
    }
    console.log('Données Google Places API:', data)

    return json(data.result)
}