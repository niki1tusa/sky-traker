import cn from 'clsx';
import { useEffect, useState } from 'react';

import { Heart } from '@/components/animate-ui/icons/heart';
import { StatusBar } from '@/components/ui/StatusBar';

import { FlightLocation } from './FlightLocation';
import type { IFlight } from '@/types/flight.types';

interface Props {
	data: IFlight;
	isActive: boolean;
	onClick: () => void;
}
export const Flight = ({ data, isActive, onClick }: Props) => {
	const [isFavorite, setIsFavorite] = useState(data.favorite);

	useEffect(() => {
		// При монтировании проверяем, есть ли рейс в избранном
		const favorites = JSON.parse(localStorage.getItem('favoriteFlights') || '[]');
		setIsFavorite(favorites.includes(data.id));
	}, [data.id]);

	const handlerFavorite = () => {
		const favorites = JSON.parse(localStorage.getItem('favoriteFlights') || '[]');

		let updatedFavorites;
		if (isFavorite) {
			// Удаляем из избранного
			updatedFavorites = favorites.filter((id: string) => id !== data.id);
		} else {
			// Добавляем в избранное
			updatedFavorites = [...favorites, data.id];
		}

		localStorage.setItem('favoriteFlights', JSON.stringify(updatedFavorites));
		setIsFavorite(!isFavorite);
	};

	return (<>
		<div
			className={cn(
				'w-[85%] overflow-hidden rounded-3xl xl:h-[200px] animate-fadeIn',
				isActive ? 'gradient-orange custom-animate p-0.5' : 'bg-transparent'
			)}
		>
			<button
				type='button'
				onClick={onClick}
				className={cn('bg-dark block h-full w-full rounded-3xl px-5 py-5 text-2xl')}
			>
				<div className='mb-4 flex justify-between gap-1 md:mb-6 md:gap-2 lg:mb-7'>
					{/* 1 slice*/}
					<div className='flex items-center gap-2'>
						<div className='h-6 w-6 overflow-hidden rounded-full border bg-white sm:h-8 sm:w-8 lg:h-10 lg:w-10 xl:h-8 xl:w-8'>
							<img alt={data.id} src={data.logo} />
						</div>
						<span>{data.id}</span>
					</div>
					{/* 2 slice*/}
					<div className='flex items-center gap-3 '>
						<span className='flex max-h-3 items-center justify-center rounded-2xl bg-gray-500/20 px-2 py-2 text-sm md:text-[10px]'>
							{data.aircraftReg}
						</span>
						<button onClick={handlerFavorite}>
							{isFavorite ? (
								<Heart
									name={isFavorite ? 'fill' : 'default'}
									size={32}
									fill='rgb(255, 120, 53)'
									color='rgb(255, 120, 53)'
								/>
							) : (
								<Heart />
							)}
						</button>
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
		


		</>
	);
};
