import { type URLSearchParamsInit } from 'react-router';

import { flights } from '../../shared/data/flights.data';

import { Flight } from './card/Flight';

interface Props {
	setSearchParams: (arg: URLSearchParamsInit) => void;
	activedId: string | null;
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
						setSearchParams({ flightId: flight.id });
					}}
				/>
			))}
		</div>
	);
};
