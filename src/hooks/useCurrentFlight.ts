import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import { getAircraftFlights, getCoordAirport, getOpenSkyFlights } from '@/api/api';
import type {  IOpenSkyState } from '@/api/data/flight.type';

// TODO: simplify this code
export const useCurrentFlight = () => {
	// all Planes
	const { data: fligths } = useQuery({
		queryKey: ['flights'],
		queryFn: () => getOpenSkyFlights(20),
		staleTime: 300_000, // 5 min
	});

	const [searchParams, setSearchParams] = useSearchParams();
	const activedId = searchParams.get('flightId');
	const activeFlight = fligths?.find((flight: IOpenSkyState) => flight.icao24 === activedId) ?? null;

	// history fly activeFlight
	const { data: historyData } = useQuery({
		queryKey: ['history', activeFlight?.icao24],
		queryFn: () => (activeFlight ? getAircraftFlights(activeFlight?.icao24) : Promise.resolve([])),
		enabled: !!activeFlight,
		staleTime: 300_000
	});

	const lastFlight = historyData?.at(-1);

	const {data: airportData} = useQuery({
		queryKey: ['airports', lastFlight?.estDepartureAirport, lastFlight?.estArrivalAirport],
		queryFn: async() => {
			return {
				departure: lastFlight.estDepartureAirport ? await getCoordAirport(lastFlight.estDepartureAirport) : null,
				arrival: lastFlight.estArrivalAirport ? await getCoordAirport(lastFlight.estArrivalAirport) : null,
			};
		},
		enabled: !!activeFlight,
		staleTime: 300_000
	});
	const extendedFlight: IOpenSkyState | null = activeFlight
		? {
				...activeFlight,
				departure: airportData?.departure || undefined,
				arrival: airportData?.arrival || undefined,
			}
		: null;
	return { activeFlight: extendedFlight, searchParams, setSearchParams };
};
