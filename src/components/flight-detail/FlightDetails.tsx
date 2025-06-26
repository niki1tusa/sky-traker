import { motion } from 'framer-motion';
import { Ellipsis, Goal, type LucideIcon, Route, Share, X } from 'lucide-react';

import type { IFlight } from '../../types/flight.types';
import { useSearchParams } from 'react-router';

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
			className='bg-dave-dark text-3xl rounded-3xl '
		>
			{/* 1 section */}
			<div
				className='flex flex-col items-center h-1/3 pt-7 rounded-t-4xl'
				style={{
					background: `linear-gradient(to bottom right, ${data.colorGradient?.[0]}, ${data.colorGradient?.[1]})`,
				}}
			>
				{/* slise 1 */}
				<div className='w-[90%] px-8 py-4 flex justify-between items-center bg-dave-dark rounded-3xl'>
					<div className='flex flex-col'>
						<span className='text-orange text-6xl font-medium'>{data.airline}</span>
						<span>{data.airline}</span>
					</div>
					<button onClick={()=>handleClose()}><X className='bg-gray-500/20 rounded-full p-2' size={60} /></button>
				</div>
				{/* slice 2 */}
				<img className='w-[800px] h-[400px]' src={data.airplane.image} alt='' />
			</div>
			{/* 2 section */}
			<div className='px-2 grid grid-cols-[1fr_1fr] gap-2 mx-2.5 mt-5 '>
				<div className='flex flex-col gap-1 py-5 items-center bg-dark rounded-tl-4xl'>
					<div className='text-5xl font-semibold'>{data.from.code}</div>
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
				<InfoFlyTime text1='Scheduled' text2='00:34' />
				<InfoFlyTime text1='Actual' text2='00:36' />
				<InfoFlyTime text1='Scheduled' text2='07:23' />
				<InfoFlyTime text1='Estimated' text2='07:40' />
				<span className='bg-neutral-800 rounded-t-4xl pl-8 py-2 mt-5 text-3xl font-medium'>
					Flight information
				</span>
				<div>*</div>
				<InfoFlyTime text2={data.airplane.name} />
				<InfoFlyTime text2={data.from.country} />
				<InfoFlyTime text1='Speed' text2={data.route?.speed} />
				<InfoFlyTime text1='Altitude' text2={data.route?.altitude} />
			</div>
			{/* 3 section */}
			<div className='grid grid-cols-4 gap-2 mx-7 mt-5'>
				<IconCard label='Route' Icon={Route} />
				<IconCard label='Follow' Icon={Goal} />
				<IconCard label='Share' Icon={Share} />
				<IconCard label='More' Icon={Ellipsis} />
			</div>
		</motion.div>
	);
};
const IconCard = ({ label, Icon }: { label: string; Icon: LucideIcon }) => {
	return (
		<div className='bg-dark px-4 py-2 flex flex-col items-center'>
			<Icon size={40} />
			<span className='mt-2 text-2xl'>{label}</span>
		</div>
	);
};
const InfoFlyTime = ({ text1 = '', text2 = '' }: { text1?: string; text2?: string | number }) => {
	return (
		<div className='bg-dark flex justify-between text-white/30 text-2xl px-8 py-4'>
			{text1 && <span>{text1}</span>}
			<span className='ml-5 text-white'>{text2}</span>
		</div>
	);
};
