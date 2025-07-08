import { Skeleton } from './Skeleton';

export function SkeletonHeader() {
	return (
		<div className='flex w-[95%] justify-around items-center rounded-3xl mx-10 mt-3 bg-gray-300  p-5 text-2xl h-[50px]'>
			<Skeleton className='h-6 w-6 rounded-full' />
			<Skeleton className='h-6 w-64 rounded-md' />
			<Skeleton className='h-6 w-10 rounded-md' />
		</div>
	);
}
