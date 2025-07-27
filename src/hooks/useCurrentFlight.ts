import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { getAircraftFlights, getCoordAirport, getOpenSkyFlights } from '@/api/api';
import type { IAirportInfo, IOpenSkyState } from '@/api/data/flight.type';

// TODO: simplify this code
export const useCurrentFlight = () => {
	const { data } = useQuery({
		queryKey: ['flights'],
		queryFn: () => getOpenSkyFlights(20),
		staleTime: 1000 * 60, // 1 min
	});

	const [searchParams, setSearchParams] = useSearchParams();
	const activedId = searchParams.get('flightId');
	const activeFlight = data?.find((flight: IOpenSkyState) => flight.icao24 === activedId);

	const [departure, setDeparture] = useState<IAirportInfo | null>(null);
	const [arrival, setArrival] = useState<IAirportInfo | null>(null);
	useEffect(() => {
		let cancelled = false;

		const fetchAirports = async () => {
			if (!activeFlight) return;

			const history = await getAircraftFlights(activeFlight.icao24);
			const lastFlight = history[history.length - 1];

			if (!lastFlight) return;

			const [dep, arr] = await Promise.all([
				lastFlight.estDepartureAirport ? getCoordAirport(lastFlight.estDepartureAirport) : null,
				lastFlight.estArrivalAirport ? getCoordAirport(lastFlight.estArrivalAirport) : null,
			]);

			if (!cancelled) {
				setDeparture(dep);
				setArrival(arr);
			}
		};

		fetchAirports();

		return () => {
			cancelled = true;
		};
	}, [activeFlight]);

	const extendFlight: IOpenSkyState | null = activeFlight
		? { ...activeFlight, departure: departure || undefined, arrival: arrival || undefined }
		: null;

	return { activeFlight: extendFlight, searchParams, setSearchParams };
};
