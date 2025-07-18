import { X } from 'lucide-react';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';

export const HeaderDetails = ({ handleClose }: { handleClose: () => void }) => {
	const { activeFlight } = useCurrentFlight();

	if (!activeFlight) return null;
	return (
		<div
			className='flex flex-col items-center pt-2 2xl:pt-7'
			style={{
				background: `linear-gradient(to bottom right, ${activeFlight.colorGradient?.[0]}, ${activeFlight.colorGradient?.[1]})`,
			}}
		>
			{/* slise 1 */}
			<div className='bg-dave-dark flex w-[90%] items-center justify-between rounded-3xl px-8 py-4'>
				<div className='flex flex-col'>
					<span className='text-orange text-2xl font-medium 2xl:text-3xl'>{activeFlight.id}</span>
					<span className='text-xl 2xl:text-2xl'>{activeFlight.airline.name}</span>
				</div>
				<button onClick={() => handleClose()}>
					<X className='rounded-full bg-gray-500/20 p-2' size={30} />
				</button>
			</div>
			{/* slice 2 */}
			<div className='my-2 flex items-center justify-center'>
				{' '}
				<img
					className='h-[150px] w-[300px] 2xl:h-[200px] 2xl:w-[400px]'
					src={activeFlight.airplane.image}
					alt='plane'
				/>
			</div>
		</div>
	);
};
