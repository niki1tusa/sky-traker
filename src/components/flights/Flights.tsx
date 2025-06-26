import { Flight } from './card/Flight';
import { flights } from './flights.data';

export const Flights = ({ setSearchParams, activedId }) => {
	return (
		<div className='flex flex-col gap-5'>
			{flights.map(flight => (
				<Flight
					key={flight.airline}
					data={flight}
					isActive={activedId === flight.airline}
					onClick={() => {
						setSearchParams({ flightId: flight.airline });
					}}
				/>
			))}
		</div>
	);
};
