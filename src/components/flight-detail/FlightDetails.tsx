import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router';

import type { IFlight } from '@/types/flight.types';

import { FlyInfo } from './details-fly-info/FlyInfo';
import { DetailsIconList } from './details-icon-list/DetailsIconList';
import { HeaderDetails } from './header/HeaderDetails';

interface Props {
	data: IFlight;
}
export const FlightDetails = ({ data }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleClose = () => {
		searchParams.delete('flightId');
		setSearchParams(searchParams);
	};
	return (
		<motion.div
			initial={{ x: 300, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 300, opacity: 0 }}
			transition={{ duration: 0.3 }}
			className= 'h-auto bg-dave-dark text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl rounded-3xl '
		>
			{/* 1 section */}
			<HeaderDetails data={data} handleClose={handleClose} />
			{/* 2 section */}
			<div className='px-2 grid grid-cols-[1fr_1fr] md:grid-cols-1 gap-2 mx-2.5 mt-5 '>
				<div className='flex flex-col gap-1 py-5 items-center bg-dark rounded-tl-4xl'>
					<div className='2xl:text-5xl text-xl font-semibold'>{data.from.code}</div>
					<div>{data.from.city}</div>
					<div className='text-white/30'>{data.from.timezone}</div>
				</div>
				<div className='flex flex-col gap-1 py-5 items-center bg-dark rounded-tr-4xl'>
					<div className='text-5xl font-semibold'>{data.to.code}</div>
					<div>{data.to.city}</div>
					<div className='text-white/30'>{data.to.timezone}</div>
				</div>
				<div className='bg-dark text-white/30 py-5'>line*</div>
				<div>*</div>
				<FlyInfo text1='Scheduled' text2='00:34' />
				<FlyInfo text1='Actual' text2='00:36' />
				<FlyInfo text1='Scheduled' text2='07:23' />
				<FlyInfo text1='Estimated' text2='07:40' />
				<span className='bg-neutral-800 rounded-t-4xl pl-8 py-2 mt-5 text-3xl font-medium'>
					Flight information
				</span>
				<div>*</div>
				<FlyInfo text2={data.airplane.name} />
				<FlyInfo text2={data.from.country} />
				<FlyInfo text1='Speed' text2={data.route?.speed} />
				<FlyInfo text1='Altitude' text2={data.route?.altitude} />
			</div>
			{/* 3 section */}
			<DetailsIconList />
		</motion.div>
	);
};
