import { useQuery } from '@tanstack/react-query';
import { type ChangeEvent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { type URLSearchParamsInit, useParams } from 'react-router';

import type { RootState } from '@/store/store';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';

import { getFlights } from '@/api/api';
import type { IFlight } from '@/api/data/flight.type';

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
	const favoriteFlights = useSelector((state: RootState) => state.favorite.favoriteFlights);
	const params = useParams();
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
		// const copyData = params.pathname === '/favorites' ? favoriteFlights : data;
		const copyData = data
		if (!copyData) return [];
		return copyData.filter(
			(flight: IFlight) =>
				flight.departure.iata.toLowerCase().includes(fieldCity.from.toLowerCase()) &&
				flight.arrival.iata.toLowerCase().includes(fieldCity.to.toLowerCase())
		);
	}, [fieldCity, data, favoriteFlights]);
	if (isError) return <p>...error </p>;
	return (
		<div className='z-10 flex w-[80%] flex-col items-center gap-5 md:w-full'>
			<div className='w-full'>
				<FilterByCity fieldCity={fieldCity} handlerInput={handlerInput} />
			</div>
			<div className='overflow-y-auto max-h-[calc(100vh - 8rem)] min-h-[calc(100vh - 8rem)] space-y-4 overflow-x-hidden pb-6 pt-4'>
				{isPending ? (
					<SkeletonFlight />
				) : filterFlights.length ? (
					filterFlights.map((flight: IFlight) => (
						<Flight
							key={flight.flight.number}
							data={flight}
							isActive={active === flight.flight.number}
							onClick={() => {
								setSearchParams({ flightId: flight.flight.number });
							}}
						/>
					))
				) : (
					<div className='bg-background rounded-sm p-2'>Flight not found.</div>
				)}
			</div>
		</div>
	);
};
