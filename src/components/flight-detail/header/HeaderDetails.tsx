import { X } from 'lucide-react';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';
import type { IFlight } from '@/api/data/flight.type';
import { airlineData } from '@/api/data/airline.data';

export const HeaderDetails = ({ handleClose }: { handleClose: () => void }) => {
	const { activeFlight }: {activeFlight: IFlight} = useCurrentFlight();

	if (!activeFlight) return null;
	return (
		<div
			className='flex flex-col items-center pt-2 2xl:pt-7'
			// style={{
			// 	background: `linear-gradient(to bottom right, ${activeFlight.colorGradient?.[0]}, ${activeFlight.colorGradient?.[1]})`,
			// }}
		>
			{/* slise 1 */}
			<div className='bg-dave-dark flex w-[90%] items-center justify-between rounded-3xl px-8 py-4'>
				<div className='flex flex-col'>
					<span className='text-orange text-2xl font-medium 2xl:text-3xl'>{activeFlight.flight.number}</span>
					<span className='text-xl 2xl:text-2xl'>{activeFlight.airline.iata}</span>
				</div>
				<button onClick={() => handleClose()}>
					<X className='rounded-full bg-gray-500/20 p-2' size={30} />
				</button>
			</div>
			{/* slice 2 */}
			<div className='my-2 flex items-center justify-center'>
				<img
					className='h-[150px] w-[300px] 2xl:h-[200px] 2xl:w-[400px]'
					src={airlineData[0].image}
					alt='plane'
				/>
			</div>
		</div>
	);
};
