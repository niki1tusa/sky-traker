import { StatusBar } from '@/components/ui/StatusBar';


import { FlyInfo } from '../details-fly-info/FlyInfo';

import { AirportInfo } from './AirportInfo';
import { useCurrentFlight } from '@/hooks/useCurrentFlight';
import { PlaneTakeoff } from 'lucide-react';

export function FlightMainInfo() {
	const {activeFlight} = useCurrentFlight()
	if (!activeFlight) return null;
	const FLY_DATA = [
		{ text1: 'Actual', text2: '00:36' },
		{ text1: 'Scheduled', text2: '07:23' },
		{ text1: 'Estimated', text2: '07:40' },
		{ text1: 'Scheduled', text2: '07:41' },
	];
	const FLY_SECOND_DATA = [
		{ text2: activeFlight.airplane.name },
		{ text2: activeFlight.from.country },
		{ text1: 'Speed', text2: activeFlight.route?.speed },
		{ text1: 'Altitude', text2: activeFlight.route?.altitude },
	];
	return (
		<div className='mx-2.5 mt-5 grid grid-cols-2 gap-1 px-2 2xl:grid-cols-[1fr_1fr]'>
			<div className='relative col-span-2 flex w-full items-start justify-between gap-1'>
				<div className='flex-1'>
					<AirportInfo code={activeFlight.from.code} city={activeFlight.from.city} timezone={activeFlight.from.timezone} />
				</div>
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
					<div className='rounded-full bg-black p-2 shadow-md'>
						<PlaneTakeoff className='h-5 w-5 text-orange'/>
					</div>
				</div>
				<div className='flex-1'>
					<AirportInfo
						code={activeFlight.to.code}
						city={activeFlight.to.city}
						timezone={activeFlight.to.timezone}
						rounded='rounded-tr-3xl'
					/>
				</div>
			</div>

			<div className='bg-dark px-4 pt-7 pb-2 text-white/30 md:col-span-2'>
				<StatusBar status={activeFlight.status} />
				<div className='flex justify-between pt-2 text-sm'>
					<span>2 715 km &middot; 3h 1m</span>
					<span>882 km &middot; 59m</span>
				</div>
			</div>

			{FLY_DATA.map((item, i) => (
				<FlyInfo key={i} {...item} />
			))}
			<span className='mt-5 rounded-t-3xl bg-neutral-800 py-2 pl-8 text-xl font-medium md:col-span-2'>
				Flight information
			</span>
			{FLY_SECOND_DATA.map((item, i) => (
				<FlyInfo key={i} {...item} />
			))}
		</div>
	);
}
