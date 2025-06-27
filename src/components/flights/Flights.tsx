import { Flight } from './card/Flight';
import { flights } from './flights.data';
import { type URLSearchParamsInit } from 'react-router';
interface Props { 
	 setSearchParams: (arg: URLSearchParamsInit)=> void
	 activedId: string | null
}
export const Flights = ({ setSearchParams, activedId }: Props) => {
	return (
		<div className='flex flex-col gap-5'>
			{flights.map(flight => (
				<Flight
					key={flight.id}
					data={flight}
					isActive={activedId === flight.id}
					onClick={() => {
						setSearchParams({ flightId: flight.id});
					}}
				/>
			))}
		</div>
	);
};
