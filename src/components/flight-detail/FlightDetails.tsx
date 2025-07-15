import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import type { IFlight } from '@/shared/types/flight.types';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { SkeletonDetails } from '../ui/skeleton/SkeletonDetails';

import { DetailsIconList } from './details-icon-list/DetailsIconList';
import { HeaderDetails } from './header/HeaderDetails';
import { FlightMainInfo } from './main-info/FlightMainInfo';

interface Props {
	data: IFlight;
	onClose: () => void;
}
export const FlightDetails = ({ data, onClose }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);
	const { ref } = useOnClickOutside<HTMLDivElement>(onClose);
	const handleClose = () => {
		searchParams.delete('flightId');
		setSearchParams(searchParams);
	};

	useEffect(() => {
		const time = setTimeout(() => {
			setIsLoading(false);
		}, 900);
		return () => {
			clearTimeout(time);
		};
	}, []);
	return isLoading ? (
		<SkeletonDetails />
	) : (
		<motion.div
			ref={ref}
			initial={{ x: 300, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 300, opacity: 0 }}
			transition={{ duration: 0.3 }}
			className='bg-dave-dark h-auto  z-10 overflow-hidden rounded-3xl pb-4 text-lg 2xl:text-xl '
		>
			{/* 1 section */}
			<HeaderDetails data={data} handleClose={handleClose} />
			{/* 2 section */}
			<FlightMainInfo data={data} />
			{/* 3 section */}
			<DetailsIconList />
		</motion.div>
	);
};
