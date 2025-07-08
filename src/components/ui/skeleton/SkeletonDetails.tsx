import { Skeleton } from './Skeleton';

export function SkeletonDetails() {
	return (
		<div className='flex items-center w-[80%] h-[80%] flex-col  bg-gray-300  overflow-hidden rounded-3xl text-xl'>
<Skeleton className='h-50 w-[90%] my-5 rounded-md'/>
		</div>
	);
}
