export interface IFlightAirplane {
	image: string
	name: string
}

export interface IFlightRoute {
	speed: number
	altitude: number
}

export interface IFlightLocation {
	city: string
	country: string
	countryCode: string
	timezone: string
	code: string
}
export interface IAirline { 
	name: string
	country: string
}
export interface IFlight {
	id: string
	airline: IAirline
	airplane: IFlightAirplane
	route?: IFlightRoute
	logo: string
	colorGradient?: [string, string]
	
	aircraftReg: string
	from: IFlightLocation
	to: IFlightLocation
}
