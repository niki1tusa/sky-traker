import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

import { FlightDetails } from '@/components/flight-detail/FlightDetails';
import { FlightList } from '@/components/flights/Flight-list';

import type { RootState } from '@/store/store';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';

export const FavoritesPage = () => {
	const { activeFlight, searchParams, setSearchParams } = useCurrentFlight();
	const favoriteFlights = useSelector((state: RootState) => state.favorite.favoriteFlights);

	const handleCloseDetails = () => {
		searchParams.delete('flightId');
		setSearchParams(searchParams);
	};

	return (
		<div className='mx-12 my-12 grid grid-cols-1 overflow-hidden md:grid-cols-[23%_1fr_25%]'>
			<FlightList data={favoriteFlights} setSearchParams={setSearchParams} />
			<div></div>
			<AnimatePresence mode='wait'>{activeFlight && <FlightDetails onClose={handleCloseDetails} />}</AnimatePresence>
		</div>
	);
};
