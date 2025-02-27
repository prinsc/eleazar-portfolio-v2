import { writable } from 'svelte/store';
import data from '$lib/content/data.json';
export const content = writable(data);