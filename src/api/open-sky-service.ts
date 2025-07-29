import axios from 'axios';
import type { IOpenSkyState } from './data/flight.type';

class OpenSkyService {
	private apiUrl: string;
	private token: string;
	private clientId: string;
	constructor() {
		this.apiUrl = 'https://opensky-network.org/api';
		this.token = import.meta.env.VITE_API_OPENSKY_CLIENT_SECRET;
		this.clientId = import.meta.env.VITE_API_OPENSKY_CLIENT_ID;
	}
	private async getOpenSkyToken() {
		const response = await axios.post(
			'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token',
			new URLSearchParams({
				grant_type: 'client_credentials',
				client_id: this.clientId,
				client_secret: this.token,
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}
		);
		return response.data.access_token;
	}

	async getOpenSkyFlights(limit = 20): Promise<IOpenSkyState[]> {
		try {
			const token = await this.getOpenSkyToken();
			console.log(token)
			const { data } = await axios.get(`${this.apiUrl}/states/all`, {
				params: {
					lamin: 35.0,
					lomin: -10.0,
					lamax: 60.0,
					lomax: 30.0,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
console.log(data.states.slice(0, limit))
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
	async getAircraftFlights(icao24: string) {
		const now = Math.floor(Date.now() / 1000);
		const tenMinutesAgo = now - 600;
		const token = this.getOpenSkyToken()
		try {
			const response = await axios.get(`${this.apiUrl}/flights/aircraft`, {
				params: {
					icao24,
					begin: tenMinutesAgo,
					end: now,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log('Aircraft flights:', response.data);
			return response.data;
		} catch (error) {
			console.error('Ошибка при получении flight history:', error);
			return [];
		}
	}
}
export const OPENSKY_SERVICE = new OpenSkyService();
