import { Flight } from './Flight/flight';
import { flights } from './flights.data';

export const Flights = () => {
	return (
		<div>
			{flights.map(flight => (
				<Flight
					key={flight.airline}
					data={flight}
				/>
			))}
		</div>
	);
};
