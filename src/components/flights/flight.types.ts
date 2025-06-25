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

export interface IFlight {
	airplane: IFlightAirplane
	route: IFlightRoute
	logo: string
	colorGradient: [string, string]
	airline: string
	aircraftReg: string
	from: IFlightLocation
	to: IFlightLocation
}
