import cn from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { Heart } from '@/components/animate-ui/icons/heart';
import { StatusBar } from '@/components/ui/StatusBar';

import { addFavorite, removeFavorite } from '@/store/favorite.slice';
import type { RootState } from '@/store/store';

import { FlightLocation } from './FlightLocation';
import type { IFlight } from '@/types/flight.types';

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
		const flight = state.favorite.flights.find(flight => flight.id === data.id);
		return flight?.favorite || false;
	});

	const handlerFavorite = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (isFavorite) {
			if (location.pathname === '/favorites') {
				setAnimationClass('animate-fadeOut');
				setTimeout(() => {
					dispatch(removeFavorite(data.id));
					setAnimationClass('');
				}, 300);
			} else {
				dispatch(removeFavorite(data.id));
			}
		} else {
			dispatch(addFavorite(data.id));
		}
	};

	return (
		<div
			className={cn(
				'animate-fadeIn w-[85%] overflow-hidden rounded-3xl xl:h-[200px] shadow-xl',
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
						<div className='h-6 w-6 overflow-hidden rounded-full border bg-white sm:h-8 sm:w-8 lg:h-10 lg:w-10 xl:h-8 xl:w-8 shadow shadow-neutral-400'>
							<img alt={data.id} src={data.logo} />
						</div>
						<span>{data.id}</span>
					</div>
					{/* 2 slice*/}
					<div className='flex items-center gap-3'>
						<span className='flex max-h-3 items-center shadow shadow-neutral-400 justify-center rounded-2xl bg-gray-500/20 px-2 py-2 text-sm md:text-[10px]'>
							{data.aircraftReg}
						</span>

						<Heart
							onClick={handlerFavorite}
							name={isFavorite ? 'fill' : 'default'}
							size={32}
							fill={isFavorite ? 'rgb(255, 120, 53)' : 'transparent 	'}
							color={isFavorite ? 'rgb(255, 120, 53)' : undefined}
						/>
					</div>
				</div>

				{/* --- 2 part --- */}
				<div className='grid grid-cols-[30%_40%_30%] items-center gap-2'>
					<FlightLocation city={data.from.city} code={data.from.code} />
					<StatusBar status={data.status} />
					<FlightLocation city={data.to.city} code={data.to.code} />
				</div>
			</button>
		</div>
	);
};
