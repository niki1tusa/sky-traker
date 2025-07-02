import cn from 'clsx';
import { Link, useLocation } from 'react-router';

import { NAV_DATA } from '@/shared/data/nav.data';

export const ListLink = () => {
	const location = useLocation();
	const pathname = location.pathname;
	return (
		<>
			{NAV_DATA.map(item => (
				<Link
					className={cn(pathname === item.link ? 'text-orange font-bold' : '')}
					key={item.title}
					to={item.link}
				>
				
					{item.title}
				</Link>
			))}
		</>
	);
};
