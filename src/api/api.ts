import axios from 'axios';

import type { IAirportInfo, IOpenSkyState } from './data/flight.type';
// const proxyApi = axios.create({
// 	baseURL: 'http://localhost:3001/api',
// });
export const apiStateAll = axios.create({
	baseURL: 'https://opensky-network.org/api',
	headers: {
		'Content-Type': 'application/json',
	},
	auth: {
		username: 'niki_tusa',
		password: "vY'Uv?335DVHs_z",
	},
});

export async function getOpenSkyFlights(limit = 20): Promise<IOpenSkyState[]> {
	// TODO: replace this code (any and return)
	try {
		const { data } = await apiStateAll.get('/states/all', {
			params: {
				lamin: 35.0,
				lomin: -10.0,
				lamax: 60.0,
				lomax: 30.0,
			},
		});
		return data.states.slice(0, limit).map((state: any[]) => ({
			icao24: state[0],
			callsign: state[1]?.trim() || '',
			origin_country: state[2],
			time_position: state[3],
			last_contact: state[4],
			longitude: state[5],
			latitude: state[6],
			baro_altitude: state[7],
			on_ground: state[8],
			velocity: state[9],
			heading: state[10],
			vertical_rate: state[11],
		})) as IOpenSkyState[];
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 429) {
			console.warn('Very many query! This is error code - 429');
		}
		console.error('Ошибка при получении данных OpenSky:', error);
		return [];
	}
}
export async function getAircraftFlights(icao24: string) {
	const now = Math.floor(Date.now() / 1000);
	const tenMinutesAgo = now - 600;

	try {
		const response = await axios.get('https://opensky-network.org/api/flights/aircraft', {
			params: {
				icao24,
				begin: tenMinutesAgo,
				end: now,
			},
			auth: {
				username: 'niki_tusa',
				password: "vY'Uv?335DVHs_z",
			},
		});
		console.log('Aircraft flights:', response.data);
		return response.data;
	} catch (error) {
		console.error('Ошибка при получении flight history:', error);
		return [];
	}
}

export async function getCoordAirport(icao: string): Promise<IAirportInfo | null> {
	const options = {
		method: 'GET',
		url: `https://aerodatabox.p.rapidapi.com/airports/icao/${icao}`,
		headers: {
			'x-rapidapi-key': 'da9ffecd19msh7793c88635435e7p114c0ejsn67aedc279d22',
			'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
		},
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
		return {
			iata: response.data.iata,
			lat: response.data.location.lat,
			lon: response.data.location.lon,
			city: response.data.municipalityName,
		};
	} catch (error) {
		console.error(error);
		return null;
	}
}
