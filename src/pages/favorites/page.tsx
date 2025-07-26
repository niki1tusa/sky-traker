import { AnimatePresence } from 'framer-motion';

import { FlightDetails } from '@/components/flight-detail/FlightDetails';
import { FlightList } from '@/components/flights/Flight-list';
import PageMeta from '@/components/ui/PageMeta';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';

export const FavoritesPage = () => {
	const { activeFlight, searchParams, setSearchParams } = useCurrentFlight();

	const handleCloseDetails = () => {
		searchParams.delete('flightId');
		setSearchParams(searchParams);
	};

	return (
		<div className='mx-12 my-12 grid grid-cols-1 overflow-hidden md:grid-cols-[23%_1fr_25%]'>
			<PageMeta title='Favorite' />
			<FlightList setSearchParams={setSearchParams} />
			<div></div>
			<AnimatePresence mode='wait'>{activeFlight && <FlightDetails onClose={handleCloseDetails} />}</AnimatePresence>
		</div>
	);
};
