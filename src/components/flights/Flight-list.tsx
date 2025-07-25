import { useQuery } from '@tanstack/react-query';
import { type ChangeEvent, useMemo, useState } from 'react';
import { type URLSearchParamsInit } from 'react-router';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';

import { getFlights } from '@/api/api';

import { FilterByCity } from '../ui/FilterByCity';
import { SkeletonFlight } from '../ui/skeleton/SkeletonFlight';

import { Flight } from './card/Flight';

interface Props {
	setSearchParams: (arg: URLSearchParamsInit) => void;
}
export const FlightList = ({ setSearchParams }: Props) => {
	const { data, isPending, isError } = useQuery({
		queryKey: ['flights'],
		queryFn: getFlights,
	});
	const { activeFlight } = useCurrentFlight();
	const active = activeFlight?.id;
	const [fieldCity, setFieldCity] = useState({
		from: '',
		to: '',
	});
	const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
		setFieldCity({ ...fieldCity, [e.target.name]: e.target.value });
	};
	const filterFlights = useMemo(() => {
		if (!data) return [];
		return data.filter(
			item =>
				item.from.city.toLowerCase().includes(fieldCity.from.toLowerCase()) &&
				item.to.city.toLowerCase().includes(fieldCity.to.toLowerCase())
		);
	}, [fieldCity, data]);
	if (isError) return <p>...error </p>;
	return (
		<div className='z-10 flex w-[80%] flex-col items-center gap-5 md:w-full'>
			<div className='w-full'>
				<FilterByCity fieldCity={fieldCity} handlerInput={handlerInput} />
			</div>
			{isPending ? (
				<SkeletonFlight />
			) : filterFlights.length ? (
				filterFlights.map(flight => (
					<Flight
						key={flight.id}
						data={flight}
						isActive={active === flight.id}
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
