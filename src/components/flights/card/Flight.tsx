import cn from 'clsx';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { StatusBar } from '@/components/ui/StatusBar';

import { addFavorite, removeFavorite } from '@/store/favorite.slice';
import type { RootState } from '@/store/store';

import { airlineData } from '@/api/data/airline.data';
import type { IFlight } from '@/api/data/flight.type';

import { FlightLocation } from './FlightLocation';

interface Props {
	data: IFlight;
	isActive: boolean;
	onClick: () => void;
}
export const Flight = ({ data, isActive, onClick }: Props) => {
	const dispatch = useDispatch();
	const [animationClass, setAnimationClass] = useState('animate-fadeIn');
	const location = useLocation();

	const isFavorite = useSelector((state: RootState) => {
		const flight = state.favorite.flights.find(flight => flight.id === data.flight.number);
		return flight?.favorite || false;
	});

	const handlerFavorite = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (isFavorite) {
			if (location.pathname === '/favorites') {
				setAnimationClass('animate-fadeOut');
				setTimeout(() => {
					dispatch(removeFavorite(data.flight.number));
					setAnimationClass('');
				}, 300);
			} else {
				dispatch(removeFavorite(data.flight.number));
			}
		} else {
			dispatch(addFavorite(data.flight.number));
		}
	};

	return (
		<div
			className={cn(
				'animate-fadeIn w-full overflow-hidden rounded-3xl shadow-xl xl:h-[200px]',
				animationClass,
				isActive ? 'gradient-orange custom-animate p-0.5' : 'bg-transparent'
			)}
		>
			<button
				type='button'
				onClick={onClick}
				className={cn('bg-dark/90 block h-full w-full rounded-3xl px-5 py-5 text-2xl')}
			>
				<div className='mb-4 flex justify-between gap-1 md:mb-6 md:gap-2 lg:mb-7'>
					{/* 1 slice*/}
					<div className='flex items-center gap-2'>
						<div className='h-6 w-6 overflow-hidden rounded-full border bg-white shadow shadow-neutral-400 sm:h-8 sm:w-8 lg:h-10 lg:w-10 xl:h-8 xl:w-8'>
							<img alt={data.flight.number} src={airlineData[0].logo} />
						</div>
						<span>{data.flight.number}</span>
					</div>
					{/* 2 slice*/}
					<div className='flex items-center gap-3'>
						<span className='flex max-h-3 items-center justify-center rounded-lg bg-gray-500/20 px-2 py-2 text-sm shadow shadow-white/10 md:text-[10px]'>
							{data.aircraft?.registration}
						</span>

						<Heart
							onClick={handlerFavorite}
							className='transition-all duration-300 ease-in-out active:scale-110'
							size={32}
							fill={isFavorite ? 'rgb(255, 120, 53)' : 'transparent'}
							color={isFavorite ? 'rgb(255, 120, 53)' : undefined}
						/>
					</div>
				</div>

				{/* --- 2 part --- */}
				<div className='grid grid-cols-[30%_40%_30%] items-center gap-2'>
					<FlightLocation city={data.departure.iata} code={data.departure.iata} />
					<StatusBar live={50} />
					<FlightLocation city={data.arrival.iata} code={data.arrival.iata} />
				</div>
			</button>
		</div>
	);
};
