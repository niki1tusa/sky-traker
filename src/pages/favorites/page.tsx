import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router';

import { FlightDetails } from '@/components/flight-detail/FlightDetails';
import { Flights } from '@/components/flights/Flights';

import { flights } from '@/shared/data/flights.data';

export const FavoritesPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const activedId = searchParams.get('flightId');
	const flight = flights.find(item => item.id === activedId);

	const handleCloseDetails = () => {
		searchParams.delete('flightId');
		setSearchParams(searchParams);

	};
	const data = flights.filter(item => item.favorite);
  		// localStorage.setItem('favorite-plane' )

	console.log(data);
	return (
		<div className='grid grid-cols-1 md:grid-cols-[23%_1fr_25%] my-12 mx-12 overflow-hidden'>
			<Flights data={data} setSearchParams={setSearchParams} activedId={activedId} />

			<div className='flex items-center justify-center'></div>
			<AnimatePresence mode='wait'>
				{flight && <FlightDetails onClose={handleCloseDetails} data={flight} />}
			</AnimatePresence>
		</div>
	);
};
