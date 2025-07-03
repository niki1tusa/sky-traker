import { type URLSearchParamsInit } from 'react-router';


import { Flight } from './card/Flight';
import type { IFlight } from '@/shared/types/flight.types';

interface Props {
	setSearchParams: (arg: URLSearchParamsInit) => void;
	activedId: string | null;
	data: IFlight[]
}
export const Flights = ({ setSearchParams, activedId, data }: Props) => {
	return (
		<div className='flex flex-col gap-5'>
			{data.map(flight => (
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
