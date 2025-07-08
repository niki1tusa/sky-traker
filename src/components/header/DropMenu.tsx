
import { ToggleTheme } from '../ui/toggle-theme';

import { ListLink } from './ListLink';

export function DropMenu() {
	return (
		<div className='right bg-neutral-800 rounded-b-2xl  absolute w-full  top-11 z-20 flex flex-col gap-4 p-4 md:hidden'>
			<span className=' border-t-2 border-neutral-700'/>
			<div className='flex  flex-col items-center border-b-2 border-b-neutral-700'><ListLink /></div>
			<div className=' items-center justify-center gap-2 flex'>
				<ToggleTheme />
			</div>
		</div>
	);
}
