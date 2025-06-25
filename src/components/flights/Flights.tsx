import { Flight } from './Flight/flight';
import { flights } from './flights.data';

export const Flights = () => {
	return (
		<div>
			{flights.map(flight => (
				<Flight
					key={flight.airline}
					logo={flight.logo}
					airline={flight.airline}
					from={flight.from}
					to={flight.to}
				/>
			))}
		</div>
	);
};
