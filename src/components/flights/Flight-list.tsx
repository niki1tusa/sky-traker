import { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import { type URLSearchParamsInit } from 'react-router';

import type { IFlight } from '@/shared/types/flight.types';

import { FilterByCity } from '../ui/FilterByCity';

import { Flight } from './card/Flight';
import { SkeletonFlight } from '../ui/skeleton/SkeletonFlight';


interface Props {
	setSearchParams: (arg: URLSearchParamsInit) => void;
	activedId: string | null;
	data: IFlight[];
}
export const FlightList = ({ setSearchParams, activedId, data }: Props) => {
	const [isLoading, setIsLoading] = useState(true)
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
	useEffect(()=>{
const time = setTimeout(()=>{
setIsLoading(false)
}, 900)
return () => {
	clearTimeout(time)
}
	}, [])
	return (
		<div className='flex flex-col gap-5'>
			<FilterByCity fieldCity={fieldCity} handlerInput={handlerInput} />

			{isLoading? <SkeletonFlight/> :filterFlights.length ? (
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
