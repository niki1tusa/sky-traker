import cn from 'clsx';

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
				'block max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl h-[100px] md:h-[150px] lg:h-[200px] xl:h-[260px]  bg-dark rounded-3xl px-5 text-xl md:text-2xl lg:text-3xl',
				isActive
					? 'border-2 border-orange transition-all duration-300 ease-in-out'
					: 'border-transparent'
			)}
		>
			<div className='flex justify-between gap-1 md:gap-2 mb-4 md:mb-6 lg:mb-7'>
				{/* 1 slice*/}
				<div className='flex items-center gap-2'>
					<div className='w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-14 xl:h-14  bg-white border rounded-full overflow-hidden'>
						<img alt={data.id} src={data.logo} />
					</div>
					<span>{data.id}</span>
				</div>
				{/* 2 slice*/}
				<span className='flex items-center text-sm md:text-base justify-center bg-gray-500/20 px-2 max-h-7 rounded-2xl'>
					{data.aircraftReg}
				</span>
			</div>
			{/* --- 2 part --- */}
			<div className='flex justify-between'>
				<FlightLocation city={data.from.city} code={data.from.code} />
				<FlightLocation city={data.to.city} code={data.to.code} />
			</div>
		</button>
	);
};
const FlightLocation = ({ city, code }: { city: string; code: string }) => {
	return (
		<div className=' flex flex-col items-center text-sm md:text-base lg:text-xl xl:text-3xl'>
			<span>{city}</span>
			<span className='font-bold '>{code}</span>
		</div>
	);
};
