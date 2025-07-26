import cn from 'clsx';
import { Link, useLocation } from 'react-router';

import { NAV_DATA } from '@/shared/mock/nav.data';

export const ListLink = () => {
	const location = useLocation();
	const pathname = location.pathname;
	return (
		<>
			{NAV_DATA.map(item => (
				<Link className={cn(pathname === item.link ? 'text-orange font-bold' : '')} key={item.title} to={item.link}>
					{item.title}
				</Link>
			))}
		</>
	);
};
