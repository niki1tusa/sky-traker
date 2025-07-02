import cn from 'clsx'
import { Plane } from 'lucide-react';

export function StatusBar({status}:{ status: number}) {
    console.log(status)
    
	return (
		<div className='bg-gray-800 w-full relative mx-5 my-5 h-2 rounded-full '>
			<div
				className={cn(`bg-orange h-full rounded-full relative`)}
				style={{ width: `${status}px`, minWidth: status > 0 ? '4px' : '0' }}
			/>
            <div className='absolute right-0 top-0 transform -translate-x-1/2 -translate-y-1/2 '>
                <Plane className='mt-2 ' fill='#fca316'/>
            </div>
		</div>
	);
}
