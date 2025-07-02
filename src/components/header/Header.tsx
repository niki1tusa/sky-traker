import cn from 'clsx';
import { Heart, Plane } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import { NAV_DATA } from '@/shared/data/nav.data';

import { ToggleTheme } from '../ui/toggle-theme';

export const Header = () => {
	const location = useLocation();
	const pathname = location.pathname;
	return (
		<header className='bg-dark mx-10 my-1.5 flex items-center justify-center gap-10 rounded-xl py-2 text-[1.5rem]'>
			<Plane />
			{NAV_DATA.map(item => (
				<Link
					className={cn(pathname === item.link ? 'text-orange font-bold' : '')}
					key={item.title}
					to={item.link}
				>
					{item.title}
				</Link>
			))}
			<div className='flex items-center justify-center gap-2'>
				<ToggleTheme />
				<Heart />
			</div>
		</header>
	);
};
