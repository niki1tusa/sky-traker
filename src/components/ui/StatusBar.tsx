import { Plane } from 'lucide-react';

export function StatusBar({ status }: { status: number }) {
	return (
		<div className='relative h-2 w-full rounded-full bg-gray-700/50 shadow'>
			{/* Прогресс-бар */}
			<div
				className='gradient-orange h-full rounded-full transition-all duration-300 ease-in-out'
				style={{ width: `${status}%` }}
			/>

			{/* Иконка самолета */}

			<Plane
			strokeWidth={0}
				size={24}
				fill='white'
				className='absolute top-1/2 -translate-y-1/2 rotate-45 transition-all duration-300 ease-in-out'
				style={{ left: `calc(${status}% - 10px)` }}
			/>
		</div>
	);
}
