import { useSearchParams } from 'react-router';

import type { IFlight } from '@/api/data/flight.type';
import { useQuery } from '@tanstack/react-query';
import { getFlights } from '@/api/api';
import type { IFlightMock } from '@/shared/types/flight.types';

export const useCurrentFlight = () => {
	const {data} = useQuery({
		queryKey: ['flights'],
		queryFn: getFlights
	})
	const [searchParams, setSearchParams] = useSearchParams();
	const activedId = searchParams.get('flightId');
	const activeFlight = data?.find((flight: IFlight) => flight.flight.number === activedId);
	const activeMockFlight = data?.find((flight: IFlightMock) => flight.id === activedId);

	return { activeFlight, activeMockFlight, searchParams, setSearchParams };
};
