import axios from 'axios';

import type { IAirportInfo } from './data/flight.type';

class RapidService {
	private apiUrl: string;
	private key: string;
	private host: string;
	constructor() {
		this.apiUrl = 'https://aerodatabox.p.rapidapi.com';
		this.key = 'da9ffecd19msh7793c88635435e7p114c0ejsn67aedc279d22';
		this.host = 'aerodatabox.p.rapidapi.com';
	}
	async getCoordAirport(icao: string): Promise<IAirportInfo | null> {
		const options = {
			method: 'GET',
			url: `${this.apiUrl}/airports/icao/${icao}`,
			headers: {
				'x-rapidapi-key': this.key,
				'x-rapidapi-host': this.host,
			},
		};
		try {
			const response = await axios.request(options);
			console.log(response.data);
			return response.data
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
export const RAPID_SERVICE = new RapidService();
