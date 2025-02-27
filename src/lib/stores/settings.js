import { writable } from 'svelte/store';
import data from '$lib/content/settings.json';
export const settings = writable(data);