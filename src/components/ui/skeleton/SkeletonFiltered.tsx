import { Skeleton } from './Skeleton';

export function SkeletonFiltered() {
	return (
		<div className='flex w-full flex-col gap-3 rounded-3xl bg-gray-300 px-5 pt-5 text-2xl xl:h-[100px]'>
			<Skeleton className='h-6 w-40 rounded-md' />
			<Skeleton className='h-6 w-40 rounded-md' />
		</div>
	);
}
