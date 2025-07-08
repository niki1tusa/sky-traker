import { Skeleton } from './Skeleton';

export function SkeletonFlight() {
	return (
		<div className='flex w-[80%] flex-col rounded-3xl bg-gray-300 px-5 pt-5 text-2xl xl:h-[180px]'>
			<div className='mb-9 flex gap-2'>
				<Skeleton className='h-6 w-6 rounded-full' />
				<Skeleton className='h-6 w-14 rounded-md' />
			</div>
			<div className='flex items-center justify-between'>
				<div className='flex flex-col gap-2'>
					<Skeleton className='h-6 w-16 rounded-md' />
					<Skeleton className='h-6 w-14 rounded-md' />
				</div>
				<Skeleton className='h-3 w-25 rounded-md' />
				<div className='flex flex-col gap-2'>
					<Skeleton className='h-6 w-16 rounded-md' />
					<Skeleton className='h-6 w-14 rounded-md' />
				</div>
			</div>
		</div>
	);
}
