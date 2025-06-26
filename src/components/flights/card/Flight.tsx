import cn from 'clsx';

import type { IFlight } from '../../../types/flight.types';

interface Props {
	data: IFlight;
	isActive: boolean;
	onClick: () => void;
}
export const Flight = ({ data, isActive, onClick }: Props) => {
	return (
		// --- 1 part ---
		<button
			onClick={onClick}
			className={cn(
				'block h-[260px] bg-dark rounded-3xl px-5  text-3xl',
				isActive
					? 'border-2 border-orange transition-all duration-300 ease-in-out'
					: 'border-transparent'
			)}
		>
			<div className='flex justify-between gap-2 mb-7'>
				{/* 1 slice*/}
				<div className='flex items-center gap-2'>
					<div className='w-14 h-14 bg-white border rounded-full overflow-hidden'>
						<img alt={data.airline} src={data.logo} />
					</div>
					<span className=' '>{data.airline}</span>
				</div>
				{/* 2 slice*/}
				<span className='flex items-center text-[19px] justify-center bg-gray-500/20 px-2 max-h-7 rounded-2xl'>
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
		<div className=' flex flex-col items-center'>
			<span>{city}</span>
			<span className='font-bold '>{code}</span>
		</div>
	);
};
