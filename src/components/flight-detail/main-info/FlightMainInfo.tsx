import { StatusBar } from '@/components/ui/StatusBar';

import type { IFlight } from '@/shared/types/flight.types';

import { FlyInfo } from '../details-fly-info/FlyInfo';

export function FlightMainInfo({ data }: { data: IFlight }) {
	return (
		<div className='mx-2.5 mt-5 grid grid-cols-2 gap-1 px-2 2xl:grid-cols-[1fr_1fr]'>
			<div className='bg-dark flex flex-col items-center gap-1 rounded-tl-4xl py-5'>
				<div className='text-xl font-semibold 2xl:text-3xl'>{data.from.code}</div>
				<div>{data.from.city}</div>
				<div className='text-white/30'>{data.from.timezone}</div>
			</div>
			{/* <div className='bg-background absolute z-10 rounded-full'>
				<img src='/airplane/airplaneUp.svg' alt='plane Up' className='z-20 p-4' />
			</div> */}
			<div className='bg-dark flex flex-col items-center gap-1 rounded-tr	-4xl py-5'>
				<div className='text-xl font-semibold 2xl:text-3xl'>{data.to.code}</div>
				<div>{data.to.city}</div>
				<div className='text-white/30'>{data.to.timezone}</div>
			</div>
			<div className='bg-dark px-4 pt-7 pb-2 text-white/30 md:col-span-2'>
				<StatusBar status={data.status} />
				<div className='flex justify-between pt-2 text-sm'>
					<span>2 715 km &middot; 3h 1m</span>
					<span>882 km &middot; 59m</span>
				</div>
			</div>

			<FlyInfo text1='Scheduled' text2='00:34' />
			<FlyInfo text1='Actual' text2='00:36' />
			<FlyInfo text1='Scheduled' text2='07:23' />
			<FlyInfo text1='Estimated' text2='07:40' />
			<span className='mt-5 rounded-t-4xl bg-neutral-800 py-2 pl-8 text-xl font-medium md:col-span-2'>
				Flight information
			</span>

			<FlyInfo text2={data.airplane.name} />
			<FlyInfo text2={data.from.country} />
			<FlyInfo text1='Speed' text2={data.route?.speed} />
			<FlyInfo text1='Altitude' text2={data.route?.altitude} />
		</div>
	);
}
