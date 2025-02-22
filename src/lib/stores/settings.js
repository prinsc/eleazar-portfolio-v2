import { writable } from 'svelte/store';
export const settings = writable({
		theme: 'light',
		lang: 'fr',
		langList: ['fr', 'en', 'ru'],
		email: {
			address: 'eleazar@kltk.be',
			subject: {
				'fr': 'Hey hey hey !',
				'en': 'Hey hey hey !',
				'ru': 'Hey hey hey !'
			},
			body: {
				'fr': 'Bonjour Eléazar,',
				'en': 'Hello Eléazar,',
				'ru': 'Привет Eléazar,'
			}
		}
	});