import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router';

import { FlightDetails } from '../../components/flight-detail/FlightDetails';
import { Flights } from '../../components/flights/Flights';
import { flights } from '../../shared/data/flights.data';

export const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activedId = searchParams.get('flightId');
	const flight = flights.find(item => item.id === activedId);
	
	  const handleCloseDetails = () => {
    searchParams.delete('flightId');
    setSearchParams(searchParams);
  };
	return (
		<div className='grid grid-cols-1 md:grid-cols-[23%_1fr_25%] my-12 mx-12 overflow-hidden'>
			<Flights setSearchParams={setSearchParams} activedId={activedId} data={flights} />
			<div className='flex justify-center items-center'></div>
			<AnimatePresence mode='wait'>{flight && <FlightDetails onClose={handleCloseDetails} data={flight} />}</AnimatePresence>
		</div>
	);
};
