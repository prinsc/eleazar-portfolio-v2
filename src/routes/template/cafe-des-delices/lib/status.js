// Logique dynamique : statut d'ouverture et météo Ath.
// Exporte deux stores Svelte (writable) + des helpers.

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// ============================================================================
// HORAIRES — structure : jour (0 = Lundi … 6 = Dimanche)
// Le lieu est ouvert 10h-22h tous les jours, sauf jeudi 9h-22h.
// Note : on ne modélise pas ici les heures de cuisine (12h-14h30, 18h-22h)
// car l'info affichée concerne l'ouverture du lieu (café/bar).
// ============================================================================
const OPENING = [
	{ open: 10, close: 22 }, // Lundi
	{ open: 10, close: 22 }, // Mardi
	{ open: 10, close: 22 }, // Mercredi
	{ open: 9, close: 22 }, // Jeudi
	{ open: 10, close: 22 }, // Vendredi
	{ open: 10, close: 22 }, // Samedi
	{ open: 10, close: 22 } // Dimanche
];

const DAY_NAMES = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

/**
 * Calcule le statut d'ouverture à partir d'une date.
 * JS: getDay() renvoie 0=Dim … 6=Sam. On remappe 0=Lun … 6=Dim.
 */
function computeStatus(now = new Date()) {
	const jsDay = now.getDay(); // 0 = Dimanche
	const dayIdx = (jsDay + 6) % 7; // 0 = Lundi
	const today = OPENING[dayIdx];
	const h = now.getHours();
	const m = now.getMinutes();
	const nowMin = h * 60 + m;

	const openMin = today.open * 60;
	const closeMin = today.close * 60;

	// OUVERT
	if (nowMin >= openMin && nowMin < closeMin) {
		const remainMin = closeMin - nowMin;
		return {
			open: true,
			label: 'Ouvert',
			detail: formatRemaining(remainMin, 'ferme'),
			until: `${today.close}h00`,
			dayLabel: DAY_NAMES[dayIdx]
		};
	}

	// FERMÉ — ouvre aujourd'hui (avant l'heure d'ouverture)
	if (nowMin < openMin) {
		const remainMin = openMin - nowMin;
		return {
			open: false,
			label: 'Fermé',
			detail: formatRemaining(remainMin, 'ouvre'),
			until: `${today.open}h00`,
			dayLabel: DAY_NAMES[dayIdx]
		};
	}

	// FERMÉ — ouvre demain
	const tomorrowIdx = (dayIdx + 1) % 7;
	const tomorrow = OPENING[tomorrowIdx];
	// minutes jusqu'à minuit + minutes d'ouverture demain
	const minUntilMidnight = 24 * 60 - nowMin;
	const remainMin = minUntilMidnight + tomorrow.open * 60;
	return {
		open: false,
		label: 'Fermé',
		detail: formatRemaining(remainMin, 'ouvre'),
		until: `${DAY_NAMES[tomorrowIdx].toLowerCase()} ${tomorrow.open}h00`,
		dayLabel: DAY_NAMES[dayIdx]
	};
}

/**
 * "ferme dans 2h15" / "ouvre dans 45 min" / "ferme dans 30 min"
 */
function formatRemaining(minutes, verb) {
	if (minutes < 1) return `${verb} à l\u2019instant`;
	if (minutes < 60) return `${verb} dans ${minutes} min`;
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	if (m === 0) return `${verb} dans ${h}h`;
	return `${verb} dans ${h}h${String(m).padStart(2, '0')}`;
}

// Store d'horaires — mis à jour toutes les minutes côté client
export const status = writable(computeStatus());

if (browser) {
	status.set(computeStatus());
	setInterval(() => status.set(computeStatus()), 60 * 1000);
}

// ============================================================================
// MÉTÉO — API Open-Meteo (gratuite, pas de clé, CORS ok)
// Ath : latitude 50.63, longitude 3.78
// ============================================================================

/**
 * Interprète un WMO weather code en label + icône textuelle + recommandation.
 * https://open-meteo.com/en/docs#weathervariables
 */
function interpretWeather(code, temp, isDay) {
	// Mapping WMO codes → label FR + "flavor" (sunny/cloudy/rain/snow)
	const map = [
		{ codes: [0], label: 'Ciel dégagé', flavor: 'sunny' },
		{ codes: [1], label: 'Principalement dégagé', flavor: 'sunny' },
		{ codes: [2], label: 'Partiellement nuageux', flavor: 'cloudy' },
		{ codes: [3], label: 'Couvert', flavor: 'cloudy' },
		{ codes: [45, 48], label: 'Brouillard', flavor: 'cloudy' },
		{ codes: [51, 53, 55], label: 'Bruine', flavor: 'rain' },
		{ codes: [56, 57], label: 'Bruine verglaçante', flavor: 'rain' },
		{ codes: [61, 63, 65], label: 'Pluie', flavor: 'rain' },
		{ codes: [66, 67], label: 'Pluie verglaçante', flavor: 'rain' },
		{ codes: [71, 73, 75, 77], label: 'Neige', flavor: 'snow' },
		{ codes: [80, 81, 82], label: 'Averses', flavor: 'rain' },
		{ codes: [85, 86], label: 'Averses de neige', flavor: 'snow' },
		{ codes: [95], label: 'Orage', flavor: 'rain' },
		{ codes: [96, 99], label: 'Orage, grêle', flavor: 'rain' }
	];
	const found = map.find((e) => e.codes.includes(code)) ?? {
		label: 'Temps changeant',
		flavor: 'cloudy'
	};

	// Recommandation éditoriale selon le flavor + jour/nuit + température
	let reco;
	const warm = temp >= 18;
	const cold = temp < 8;

	if (found.flavor === 'sunny' && isDay && warm) {
		reco = 'Profitez du soleil en terrasse, on vous y attend.';
	} else if (found.flavor === 'sunny' && isDay) {
		reco = 'Un rayon, un café, la terrasse vous tend les bras.';
	} else if (found.flavor === 'sunny' && !isDay) {
		reco = 'La nuit est claire — parfait pour une bière dehors.';
	} else if (found.flavor === 'cloudy' && warm) {
		reco = 'Ciel doux, température idéale. Terrasse ou salle, à vous de voir.';
	} else if (found.flavor === 'cloudy' && cold) {
		reco = 'Il fait frais — une place près de la cuisine, ça vous dit ?';
	} else if (found.flavor === 'cloudy') {
		reco = 'Ni trop chaud ni trop froid : la bonne heure pour passer.';
	} else if (found.flavor === 'rain') {
		reco = 'Il pleut sur Ath. Venez vous mettre à l\u2019abri, une bière vous attend.';
	} else if (found.flavor === 'snow') {
		reco = 'Neige sur la Grand Place. Vin chaud et cheminée, c\u2019est par ici.';
	} else {
		reco = 'Passez quand ça vous arrange, on y sera.';
	}

	return { label: found.label, flavor: found.flavor, reco, isDay };
}

// Store météo
export const weather = writable(null);

async function fetchWeather() {
	try {
		const url =
			'https://api.open-meteo.com/v1/forecast?latitude=50.63&longitude=3.78&current=temperature_2m,weather_code,is_day&timezone=Europe%2FBrussels';
		const res = await fetch(url);
		if (!res.ok) throw new Error('weather fetch failed');
		const data = await res.json();
		const c = data.current;
		const interp = interpretWeather(c.weather_code, c.temperature_2m, c.is_day === 1);
		weather.set({
			temp: Math.round(c.temperature_2m),
			code: c.weather_code,
			...interp
		});
	} catch (e) {
		// Échec silencieux — le composant affiche un fallback
		weather.set({ error: true });
	}
}

if (browser) {
	fetchWeather();
	// Rafraîchit toutes les 30 minutes — suffit largement pour une démo
	setInterval(fetchWeather, 30 * 60 * 1000);
}
