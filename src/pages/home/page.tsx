import { AnimatePresence } from 'framer-motion';

import { SkyTrackMap } from '@/components/map/SkyTrakeMap';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';

import { FlightDetails } from '../../components/flight-detail/FlightDetails';
import { FlightList } from '../../components/flights/Flight-list';
import { flights } from '../../shared/data/flights.data';

export const HomePage = () => {
	const { activeFlight, searchParams, setSearchParams } = useCurrentFlight();

	const handleCloseDetails = () => {
		searchParams.delete('flightId');
		setSearchParams(searchParams);
	};
	return (
		<>
			<SkyTrackMap />
			<div className='mx-12 mt-12 grid h-full grid-cols-1 overflow-hidden  md:grid-cols-[20%_1fr_23%]'>
				<FlightList setSearchParams={setSearchParams} data={flights} />

				<div className=''></div>

				<AnimatePresence mode='wait'>{activeFlight && <FlightDetails onClose={handleCloseDetails} />}</AnimatePresence>
			</div>
		</>
	);
};
