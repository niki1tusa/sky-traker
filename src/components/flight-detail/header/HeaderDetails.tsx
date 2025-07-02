import { X } from 'lucide-react';

import type { IFlight } from '@/shared/types/flight.types';

interface Props {
	data: IFlight;
	handleClose: () => void;
}
export const HeaderDetails = ({ data, handleClose }: Props) => {
	return (
		<div
			className='flex flex-col items-center  pt-2 2xl:pt-7 rounded-t-4xl'
			style={{
				background: `linear-gradient(to bottom right, ${data.colorGradient?.[0]}, ${data.colorGradient?.[1]})`,
			}}
		>
			{/* slise 1 */}
			<div className='w-[90%] px-8 py-4 flex justify-between items-center bg-dave-dark rounded-3xl'>
				<div className='flex flex-col'>
					<span className='text-orange text-3xl  font-medium'>{data.id}</span>
					<span className='text-sm md:text-2xl'>{data.airline.name}</span>
				</div>
				<button onClick={() => handleClose()}>
					<X className='bg-gray-500/20 rounded-full p-2' size={30} />
				</button>
			</div>
			{/* slice 2 */}
			<div className='flex items-center justify-center'>
				{' '}
				<img
					className=' w-[400px] h-[200px]'
					src={data.airplane.image}
					alt='plane'
				/>
			</div>
		</div>
	);
};
