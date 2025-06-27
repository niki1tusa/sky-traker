import { X } from 'lucide-react';

import type { IFlight } from '../../../types/flight.types';

interface Props {
	data: IFlight;
	handleClose: () => void;
}
export const HeaderDetails = ({ data, handleClose }: Props) => {
	return (
		<div
			className='flex flex-col items-center h-1/3 pt-7 rounded-t-4xl'
			style={{
				background: `linear-gradient(to bottom right, ${data.colorGradient?.[0]}, ${data.colorGradient?.[1]})`,
			}}
		>
			{/* slise 1 */}
			<div className='w-[90%] px-8 py-4 flex justify-between items-center bg-dave-dark rounded-3xl'>
				<div className='flex flex-col'>
					<span className='text-orange text-6xl font-medium'>{data.id}</span>
					<span>{data.airline.name}</span>
				</div>
				<button onClick={() => handleClose()}>
					<X className='bg-gray-500/20 rounded-full p-2' size={60} />
				</button>
			</div>
			{/* slice 2 */}
			<img className='w-[800px] h-[400px]' src={data.airplane.image} alt='' />
		</div>
	);
};
