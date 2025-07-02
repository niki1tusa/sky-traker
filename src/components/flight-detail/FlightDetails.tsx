import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import { DetailsIconList } from './details-icon-list/DetailsIconList';
import { HeaderDetails } from './header/HeaderDetails';
import { FlightMainInfo } from './main-info/FlightMainInfo';
import type { IFlight } from '@/shared/types/flight.types';

interface Props {
	data: IFlight;
	onClose: () => void;
}
export const FlightDetails = ({ data, onClose }: Props) => {
const [searchParams, setSearchParams] = useSearchParams();
	const { ref } = useOnClickOutside<HTMLDivElement>(onClose);
	const handleClose = () => {
		searchParams.delete('flightId');
		setSearchParams(searchParams);
	};
	return (
		<motion.div
			ref={ref}
			initial={{ x: 300, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: 300, opacity: 0 }}
			transition={{ duration: 0.3 }}
			className='h-auto bg-dave-dark text-xl rounded-3xl '
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
