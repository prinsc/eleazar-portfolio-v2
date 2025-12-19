import { writable } from 'svelte/store';
import data from '$lib/content/data.json';
import dataServices from '$lib/content/data_services.json';

const mergedData = {
	...data,
	services: dataServices.services
};

export const content = writable(mergedData);