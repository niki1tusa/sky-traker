import { AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router';

import { SkyTrakerMap } from '@/components/map/SkyTrakerMap';

import { FlightDetails } from '../../components/flight-detail/FlightDetails';
import { FlightList } from '../../components/flights/Flight-list';
import { flights } from '../../shared/data/flights.data';
import { Header } from '@/components/header/Header';

export const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const activedId = searchParams.get('flightId');
	const flight = flights.find(item => item.id === activedId);
	
	const handleCloseDetails = () => {
		searchParams.delete('flightId');
		setSearchParams(searchParams);
	};
	return (
		<>
			<SkyTrakerMap activeFlight={flight} flights={flights}  longitude={flight?.route.longitude} latitude={flight?.route.latitude}/>
			<div className=' mx-12 my-12 grid grid-cols-1 overflow-hidden md:grid-cols-[23%_1fr_25%]'>
				<FlightList setSearchParams={setSearchParams} activedId={activedId} data={flights} />
				<div className=''><Header/></div>
				<AnimatePresence mode='wait'>
					{flight && <FlightDetails onClose={handleCloseDetails} data={flight} />}
				</AnimatePresence>
			</div>
		</>
	);
};
