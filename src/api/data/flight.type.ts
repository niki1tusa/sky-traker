export interface IAirportInfo {
	icao: string; // Пример: "UUDD"
	iata: string; // Пример: "DME"
	localCode: string; // Пример: "ДМД"
	shortName: string; // Пример: "Domodedovo"
	fullName: string; // Пример: "Moscow, Domodedovo"
	municipalityName: string; // Пример: "Moscow"
	location: {
		lat: number; // Пример: 55.4088
		lon: number; // Пример: 37.9063
	};
	country: {
		code: string; // Пример: "RU"
		name: string; // Пример: "Russia"
	};
	continent: {
		code: string; // Пример: "EU"
		name: string; // Пример: "Europe"
	};
	timeZone: string; // Пример: "Europe/Moscow"
	urls?: {
		webSite: string;
		wikipedia: string;
		twitter: string;
		googleMaps: string;
		flightRadar: string;
	
}

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
