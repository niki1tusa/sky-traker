import type { IFlight } from '../flight.types';

export const Flight = ({ logo, airline, from, to }: IFlight) => {
	return (
		// --- 1 part ---
		<div className='flex  text-white bg-dark'>
			<div className='flex gap-2'>
				<div className='w-6 h-6 border rounded-md overflow-hidden'>
					<img src={logo} />
				</div>
				<div>{airline}</div>
			</div>
			{/* --- 2 part --- */}
			<div className='flex'>
				{/* 1 slice */}
				<div>
					<div>{from.city}</div>
					<div>{from.code}</div>
				</div>
				{/* 2 slice */}
				<input type='range' />
				{/* 3 slice */}
				<div>
					<div>{to.city}</div>
					<div>{to.code}</div>
				</div>
			</div>
		</div>
	);
};
