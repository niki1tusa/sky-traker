import { AIRPORTS } from "./data/airports";

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

