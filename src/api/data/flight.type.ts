export interface IAirportInfo {
	iata: string;
	lat: number;
	lon: number;
	city: string;
}
export interface IOpenSkyState {
	icao24: string;
	callsign: string | null;
	origin_country: string;
	time_position: number | null;
	last_contact: number;
	longitude: number | null;
	latitude: number | null;
	baro_altitude: number | null;
	on_ground: boolean;
	velocity: number | null;
	heading: number | null;
	vertical_rate: number | null;
	departure?: IAirportInfo;
	arrival?: IAirportInfo;
}
