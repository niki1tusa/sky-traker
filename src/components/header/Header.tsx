import { SquareChevronDown, SquareChevronUp } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

import { SkeletonHeader } from '../ui/skeleton/SkeletonHeader';
import { ToggleTheme } from '../ui/toggle-theme';

import { DropMenu } from './DropMenu';
import { ListLink } from './ListLink';
import { GradientText } from '../animate-ui/text/gradient';

export const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const time = setTimeout(() => {
			setIsLoading(false);
		}, 900);
		return () => {
			clearTimeout(time);
		};
	}, []);
	return isLoading ? (
		<SkeletonHeader />
	) : (
		<header className='animate-fadeIn shadow-xl bg-dark/90 relative z-10 mx-10 my-1.5 flex items-center justify-around gap-10 rounded-xl py-2 text-[1.5rem]'>
			<div className='flex gap-2'>
				<img src='/logoApp.svg' alt='logo' className='h-10 w-10' />
				<GradientText text="Sky Track" gradient='linear-gradient(90deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)
' className='font-bold'
/>
			</div>
			<div className='hidden gap-4 md:flex'>
				<ListLink />
			</div>
			<div className='flex md:hidden'>
				{isOpen ? (
					<button onClick={() => setIsOpen(!isOpen)}>
						<SquareChevronUp />
					</button>
				) : (
					<button onClick={() => setIsOpen(!isOpen)}>
						<SquareChevronDown />
					</button>
				)}
			</div>
			<AnimatePresence mode='wait'>{isOpen && <DropMenu />}</AnimatePresence>
			<div className='hidden items-center justify-center gap-2 md:flex'>
				<ToggleTheme />
			</div>
		</header>
	);
};
