import { type ChangeEvent, useMemo, useState } from 'react';
import { type URLSearchParamsInit } from 'react-router';

import type { IFlight } from '@/shared/types/flight.types';

import { FilterByCity } from '../ui/FilterByCity';

import { Flight } from './card/Flight';

interface Props {
	setSearchParams: (arg: URLSearchParamsInit) => void;
	activedId: string | null;
	data: IFlight[];
}
export const Flights = ({ setSearchParams, activedId, data }: Props) => {
	const [fieldCity, setFieldCity] = useState({
		from: '',
		to: '',
	});
	const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
		setFieldCity({ ...fieldCity, [e.target.name]: e.target.value });
	};
	const filterFlights = useMemo(() => {
		return data.filter(
			item =>
				item.from.city.toLowerCase().includes(fieldCity.from.toLowerCase()) &&
				item.to.city.toLowerCase().includes(fieldCity.to.toLowerCase())
		);
	}, [fieldCity, data]);
	return (
		<div className='flex flex-col gap-5'>
			<FilterByCity fieldCity={fieldCity} handlerInput={handlerInput} />
			{filterFlights.length ? (
				filterFlights.map(flight => (
					<Flight
						key={flight.id}
						data={flight}
						isActive={activedId === flight.id}
						onClick={() => {
							setSearchParams({ flightId: flight.id });
						}}
					/>
				))
			) : (
				<div className='bg-background rounded-sm p-2'>Flight not found.</div>
			)}
		</div>
	);
};
