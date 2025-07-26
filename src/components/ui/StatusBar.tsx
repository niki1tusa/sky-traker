import type { IFlight } from '@/api/data/flight.type';
import { Plane } from 'lucide-react';
interface Props { 
	live: IFlight['live']
}
export function StatusBar({ live }: Props) {

	// TODO: расчитать live по кординатам (взять из SkyTrackMap)
	return (
		<div className='relative h-2 w-full rounded-full bg-gray-700/50 shadow'>
			{/* Прогресс-бар */}
			<div
				className='gradient-orange h-full rounded-full transition-all duration-300 ease-in-out'
				style={{ width: `${live}%` }}
			/>
			{/* Иконка самолета */}
			<Plane
			strokeWidth={0}
				size={24}
				fill='white'
				className='absolute top-1/2 -translate-y-1/2 rotate-45 transition-all duration-300 ease-in-out'
				style={{ left: `calc(${live}% - 10px)` }}
			/>
		</div>
	);
}
