export interface IFlightAirplane {
	image: string;
	name: string;
}

export interface IFlightRoute {
	speed: number;
	altitude: number;
	longitude: number | undefined;
	latitude: number | undefined;
}

export interface IFlightLocation {
	city: string;
	country: string;
	countryCode: string;
	timezone: string;
	code: string;
}
export interface IAirline {
	name: string;
	country: string;
}
export interface IFlight {
	id: string;
	status: number;
	favorite: boolean;
	airline: IAirline;
	airplane: IFlightAirplane;
	route: IFlightRoute;
	logo: string;
	colorGradient?: [string, string];

	aircraftReg: string;
	from: IFlightLocation;
	to: IFlightLocation;
}
