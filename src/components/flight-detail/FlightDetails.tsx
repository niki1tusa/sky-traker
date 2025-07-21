import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useCurrentFlight } from '@/hooks/useCurrentFlight';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { SkeletonDetails } from '../ui/skeleton/SkeletonDetails';

import { DetailsIconList } from './details-icon-list/DetailsIconList';
import { HeaderDetails } from './header/HeaderDetails';
import { FlightMainInfo } from './main-info/FlightMainInfo';

interface Props {
	onClose: () => void;
}
export const FlightDetails = ({ onClose }: Props) => {
	const { searchParams, setSearchParams } = useCurrentFlight();
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
			className='bg-dave-dark text-foreground z-10 overflow-hidden rounded-3xl pb-4 text-lg 2xl:text-xl shadow-xl '
		>
			{/* 1 section */}
			<HeaderDetails handleClose={handleClose} />
			{/* 2 section */}
			<FlightMainInfo />
			{/* 3 section */}
			<DetailsIconList />
		</motion.div>
	);
};
