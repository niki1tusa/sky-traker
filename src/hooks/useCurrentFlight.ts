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

	// history fly activeFlight
	const { data: historyData } = useQuery({
		queryKey: ['history', activeFlight?.icao24],
		queryFn: async () => {
			return activeFlight ? await OPENSKY_SERVICE.getAircraftFlights(activeFlight?.icao24) : Promise.resolve([]);
		},
		enabled: !!activeFlight,
		staleTime: 300_000,
	});

	const lastFlight = historyData?.at(-1);

	const { data: airportData } = useQuery({
		queryKey: ['airports', lastFlight?.estDepartureAirport, lastFlight?.estArrivalAirport],
		queryFn: async () => {
			return {
				departure: lastFlight.estDepartureAirport
					? await RAPID_SERVICE.getCoordAirport(lastFlight.estDepartureAirport)
					: null,
				arrival: lastFlight.estArrivalAirport
					? await RAPID_SERVICE.getCoordAirport(lastFlight.estArrivalAirport)
					: null,
			};
		},
		enabled: !!activeFlight,
		staleTime: 300_000,
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
