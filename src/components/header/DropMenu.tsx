import { Heart } from 'lucide-react';

import { ToggleTheme } from '../ui/toggle-theme';

import { ListLink } from './ListLink';

export function DropMenu() {
	return (
		<div className='right bg-dark absolute w-full  top-11 z-20 flex flex-col gap-4 p-4 border-t-2 border-b-neutral-700'>
			<div className='flex  flex-col items-center border-b-2 border-b-neutral-700'><ListLink /></div>
			<div className=' items-center justify-center gap-2 flex'>
				<ToggleTheme />
				<Heart />
			</div>
		</div>
	);
}
