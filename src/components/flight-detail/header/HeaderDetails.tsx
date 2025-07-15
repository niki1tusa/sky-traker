import { X } from 'lucide-react';

import type { IFlight } from '@/shared/types/flight.types';

interface Props {
	data: IFlight;
	handleClose: () => void;
}
export const HeaderDetails = ({ data, handleClose }: Props) => {
	return (
		<div
			className='flex flex-col items-center pt-2 2xl:pt-7'
			style={{
				background: `linear-gradient(to bottom right, ${data.colorGradient?.[0]}, ${data.colorGradient?.[1]})`,
			}}
		>
			{/* slise 1 */}
			<div className='bg-dave-dark flex w-[90%] items-center justify-between rounded-3xl px-8 py-4'>
				<div className='flex flex-col'>
					<span className='text-orange text-2xl 2xl:text-3xl font-medium'>{data.id}</span>
					<span className='	text-xl 2xl:text-2xl'>{data.airline.name}</span>
				</div>
				<button onClick={() => handleClose()}>
					<X className='rounded-full bg-gray-500/20 p-2' size={30} />
				</button>
			</div>
			{/* slice 2 */}
			<div className='flex items-center justify-center my-2'>
				{' '}
				<img className='h-[150px] w-[300px] 2xl:h-[200px] 2xl:w-[400px]' src={data.airplane.image} alt='plane' />
			</div>
		</div>
	);
};
