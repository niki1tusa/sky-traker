import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { FlightDetails } from '@/components/flight-detail/FlightDetails';


import { flights } from '@/shared/data/flights.data';
import type { IFlight } from '@/shared/types/flight.types';
import { FlightList } from '@/components/flights/Flight-list';

export const FavoritesPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [favoriteFlights, setFavoriteFlights] = useState<IFlight[]>([]);

	const activedId = searchParams.get('flightId');
	const flight = flights.find(item => item.id === activedId);

	const handleCloseDetails = () => {
		searchParams.delete('flightId');
		setSearchParams(searchParams);
	};
	useEffect(() => {
		const store = JSON.parse(localStorage.getItem('favoriteFlights') || '[]');
		const filtered = flights.filter(flight => store.includes(flight.id));
		setFavoriteFlights(filtered);
	}, [flight?.favorite]);

	return (
		<div className='mx-12 my-12 grid grid-cols-1 overflow-hidden md:grid-cols-[23%_1fr_25%]'>
			<FlightList data={favoriteFlights} setSearchParams={setSearchParams} activedId={activedId} />

			<div className='flex items-center justify-center'></div>
			<AnimatePresence mode='wait'>
				{flight && <FlightDetails onClose={handleCloseDetails} data={flight} />}
			</AnimatePresence>
		</div>
	);
};
