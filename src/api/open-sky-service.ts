import axios from 'axios';

import type { IOpenSkyState } from './data/flight.type';
import { ACCESS_TOKEN } from './open-sky-token';

class OpenSkyService {
	private apiUrl: string;

	constructor() {
		this.apiUrl = 'https://opensky-network.org/api';
	}

	async getOpenSkyFlights(limit = 20): Promise<IOpenSkyState[]> {
		try {
			const { data } = await axios.get(`${this.apiUrl}/states/all`, {
				params: {
					lamin: 35.0,
					lomin: -10.0,
					lamax: 60.0,
					lomax: 30.0,
				},
				headers: {
					Authorization: `Bearer ${ACCESS_TOKEN}`,
				},
			});
			console.log(data.states.slice(0, limit));
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
				console.warn('Rate limit exceeded (429). Try again later.');
			}
			console.error('Error fetching OpenSky flights:', error);
			return [];
		}
	}
}
export const OPENSKY_SERVICE = new OpenSkyService();
