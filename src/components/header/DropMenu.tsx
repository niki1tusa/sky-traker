import { motion } from 'framer-motion';

import { ToggleTheme } from '../ui/toggle-theme';

import { ListLink } from './ListLink';

export function DropMenu() {
	return (
		<motion.div
			initial={{ y: -30, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{
				type: 'spring',
				stiffness: 80, // насколько тугая пружина (как сильно она скачет)
				damping: 10, // насколько быстро она затухает
			}}
			className=' z-50 absolute top-[100%] flex w-full flex-col gap-4 rounded-b-2xl bg-neutral-800/95 p-4 md:hidden '
		>
			<span className='border-t-2 border-neutral-700' />
			<div className='flex flex-col items-center border-b-2 border-b-neutral-700'>
				<ListLink />
			</div>
			<div className='flex items-center justify-center gap-2'>
				<ToggleTheme />
			</div>
		</motion.div>
	);
}
