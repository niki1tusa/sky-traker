import cn from 'clsx';

import { StatusBar } from '@/components/ui/StatusBar';

import type { IFlight } from '@/shared/types/flight.types';

interface Props {
	data: IFlight;
	isActive: boolean;
	onClick: () => void;
}
export const Flight = ({ data, isActive, onClick }: Props) => {
	return (
		// --- 1 part ---
		<button
			type='button'
			onClick={onClick}
			className={cn(
				'bg-dark block h-[100px] max-w-full rounded-3xl px-5 py-5 text-2xl xl:h-[200px]',
				isActive
					? 'border-orange border-2 transition-all duration-300 ease-in-out'
					: 'border-transparent'
			)}
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
				<span className='flex max-h-3 items-center justify-center rounded-2xl bg-gray-500/20 px-2 py-2 text-sm md:text-[10px]'>
					{data.aircraftReg}
				</span>
			</div>
			{/* --- 2 part --- */}
			<div className='gird grid-cols-[30%_1fr_30%]'>
				<FlightLocation city={data.from.city} code={data.from.code} />
				<StatusBar status={data.status} />
				<FlightLocation city={data.to.city} code={data.to.code} />
			</div>
		</button>
	);
};
const FlightLocation = ({ city, code }: { city: string; code: string }) => {
	return (
		<div className='flex flex-col items-center text-sm md:text-base lg:text-xl xl:text-[22px]'>
			<span>{city}</span>
			<span className='font-bold'>{code}</span>
		</div>
	);
};
