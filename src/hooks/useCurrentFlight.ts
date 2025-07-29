import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import type { IOpenSkyState } from '@/api/data/flight.type';
import { OPENSKY_SERVICE } from '@/api/open-sky-service';
import { RAPID_SERVICE } from '@/api/rapid-service';

// TODO: simplify this code
export const useCurrentFlight = () => {
	// all Planes
	const { data: fligths } = useQuery({
		queryKey: ['flights'],
		queryFn: async () => {
			return await OPENSKY_SERVICE.getOpenSkyFlights(20);
		},
		staleTime: 300_000, // 5 min
	});

	const [searchParams, setSearchParams] = useSearchParams();
	const activedId = searchParams.get('flightId');
	const activeFlight = fligths?.find((flight: IOpenSkyState) => flight.icao24 === activedId) ?? null;

	console.log('=== DEBUG useCurrentFlight ===');
	console.log('activedId:', activedId);
	console.log('activeFlight-icao24:', activeFlight?.icao24);

	// history fly activeFlight
const {
	data: aircraftInfo,
	isLoading: aircraftLoading,
	error: aircraftError,
} = useQuery({
	queryKey: ['aircraft-info', activeFlight?.icao24],
	queryFn: async () => {
		if (!activeFlight?.icao24) return null;
		return await RAPID_SERVICE.getAircraftInfoByIcao24(activeFlight.icao24);
	},
	enabled: !!activeFlight,
	staleTime: 300_000,
});


	console.log('rapidFlightData:', aircraftInfo);
	console.log('rapidLoading:', aircraftLoading);
	console.log('rapidError:', aircraftError);


	const lastFlight = aircraftInfo?.at(-1);
	console.log('lastFlight:', lastFlight);
	console.log('estDepartureAirport:', lastFlight?.estDepartureAirport);
	console.log('estArrivalAirport:', lastFlight?.estArrivalAirport);

	const {
		data: airportData,
		isLoading: airportLoading,
		error: airportError,
	} = useQuery({
		queryKey: ['airports', lastFlight?.estDepartureAirport, lastFlight?.estArrivalAirport],
		queryFn: async () => {
			console.log('Fetching airports:', {
				departure: lastFlight?.estDepartureAirport,
				arrival: lastFlight?.estArrivalAirport,
			});

			const result = {
				departure: lastFlight?.estDepartureAirport
					? await RAPID_SERVICE.getCoordAirport(lastFlight.estDepartureAirport)
					: null,
				arrival: lastFlight?.estArrivalAirport
					? await RAPID_SERVICE.getCoordAirport(lastFlight.estArrivalAirport)
					: null,
			};

			console.log('Airport data result:', result);
			return result;
		},
		enabled: !!activeFlight && !!lastFlight && (!!lastFlight.estDepartureAirport || !!lastFlight.estArrivalAirport),
		staleTime: 300_000,
	});

	console.log('airportData:', airportData);
	console.log('airportLoading:', airportLoading);
	console.log('airportError:', airportError);

	const extendedFlight: IOpenSkyState | null = activeFlight
		? {
				...activeFlight,
				departure: airportData?.departure || undefined,
				arrival: airportData?.arrival || undefined,
			}
		: null;

	console.log('extendedFlight:', extendedFlight);
	console.log('=== END DEBUG ===');

	return { activeFlight: extendedFlight, searchParams, setSearchParams };
};
