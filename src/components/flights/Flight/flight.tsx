import type { IFlight } from '../../../types/flight.types';

export const Flight = ({ data }: { data: IFlight }) => {
	return (
		// --- 1 part ---
		<div className='flex  text-white bg-dark rounded-md px-5 py-7'>
			<div className='flex gap-2'>
				<div className='w-6 h-6 border rounded-md overflow-hidden'>
					<img src={data.logo} />
				</div>
				<div>{data.airline}</div>
			</div>
			{/* --- 2 part --- */}
			<div className='flex'>
				{/* 1 slice */}
				<div>
					<div>{data.from.city}</div>
					<div>{data.from.code}</div>
				</div>
				{/* 2 slice */}
				<input type='range' />
				{/* 3 slice */}
				<div>
					<div>{data.to.city}</div>
					<div>{data.to.code}</div>
				</div>
			</div>
		</div>
	);
};
