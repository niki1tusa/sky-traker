import { SquareChevronDown, SquareChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { SkeletonHeader } from '../ui/skeleton/SkeletonHeader';
import { ToggleTheme } from '../ui/toggle-theme';

import { DropMenu } from './DropMenu';
import { ListLink } from './ListLink';

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
		<header className='animate-fadeIn bg-dark/90 relative mx-10 my-1.5 flex items-center justify-around gap-10 rounded-xl py-2 text-[1.5rem]'>
			<div className='h-10 w-10'>
				<img src='/logoApp.svg' alt='logo' />
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
			{isOpen && <DropMenu />}
			<div className='hidden items-center justify-center gap-2 md:flex'>
				<ToggleTheme />
			</div>
		</header>
	);
};
