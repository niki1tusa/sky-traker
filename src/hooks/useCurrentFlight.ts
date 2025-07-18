import { useSearchParams } from 'react-router';

import { flights } from '@/shared/data/flights.data';
import type { IFlight } from '@/shared/types/flight.types';

export const useCurrentFlight = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activedId = searchParams.get('flightId');
	const activeFlight = flights.find((item: IFlight) => item.id === activedId);

	return { activeFlight, searchParams, setSearchParams };
};
