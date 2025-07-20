import { AnimatePresence } from 'framer-motion';



import { useCurrentFlight } from '@/hooks/useCurrentFlight';

import { FlightDetails } from '../../components/flight-detail/FlightDetails';
import { FlightList } from '../../components/flights/Flight-list';
import { flights } from '../../shared/data/flights.data';
import { SkyTrackMap } from '@/components/map/SkyTrakeMap';

export const HomePage = () => {
	const { activeFlight, searchParams, setSearchParams } = useCurrentFlight();

	const handleCloseDetails = () => {
		searchParams.delete('flightId');
		setSearchParams(searchParams);
	};
	return (
		<>
			<SkyTrackMap/>
			<div className='mx-12 my-12 grid grid-cols-1 overflow-hidden md:grid-cols-[23%_1fr_25%]'>
				<FlightList setSearchParams={setSearchParams} data={flights} />
				<div></div>
				<AnimatePresence mode='wait'>
					{activeFlight && <FlightDetails onClose={handleCloseDetails} />}
				</AnimatePresence>
			</div>
		</>
	);
};
