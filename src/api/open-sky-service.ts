import axios from 'axios';

import type { IOpenSkyState } from './data/flight.type';
import { ACCESS_TOKEN } from './open-sky-token';
import {AIRPORTS} from './data/airports.ts'
export interface IOpenSkyFlight {
	icao24: string;
	firstSeen: number;
	estDepartureAirport: string | null; // ICAO
	lastSeen: number;
	estArrivalAirport: string | null; // ICAO
	callsign: string | null;
}
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
	async getAircraftFlights(icao24: string, hoursBack = 24): Promise<IOpenSkyFlight[]> {
		const now = Math.floor(Date.now() / 1000);
		const begin = now - hoursBack * 3600;

		try {
			const { data } = await axios.get<IOpenSkyFlight[]>(`${this.apiUrl}/flights/aircraft`, {
				params: { icao24: icao24.toLowerCase(), begin, end: now },
				auth: {
					username: 'niki_tusa-api-client',
					password: 'kwYYzLgZUemj2zqwagPSOwjFTFdbxsSk',
				},
			});
			return data ?? [];
		} catch (e) {
			// если нет учётки — объясняем причину
			if (axios.isAxiosError(e) && (e.response?.status === 401 || e.response?.status === 403)) {
				console.warn('OpenSky /flights/aircraft требует бесплатную учётку (Basic Auth).');
			} else if (axios.isAxiosError(e) && e.response?.status === 429) {
				console.warn('OpenSky rate limit (429).');
			} else {
				console.error('getAircraftFlights error:', e);
			}
			return [];
		}
	}
}
export const OPENSKY_SERVICE = new OpenSkyService();

export interface IAirportInfo {
	icao: string;
	iata?: string | null;
	name: string;
	lat: number;
	lon: number;
}

class AirportDirectory {
	private byIcao: Map<string, IAirportInfo>;

	constructor() {
		this.byIcao = new Map((AIRPORTS as IAirportInfo[]).map(a => [a.icao.toUpperCase(), a]));
	}

	getByIcao(icao: string | null | undefined): IAirportInfo | null {
		if (!icao) return null;
		return this.byIcao.get(icao.toUpperCase()) ?? null;
	}
}

export const airportsService = new AirportDirectory();
