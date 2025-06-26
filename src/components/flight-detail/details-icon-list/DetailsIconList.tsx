import { Ellipsis, Goal, Route, Share } from 'lucide-react';

import { IconCard } from './IconCard';

export const DetailsIconList = () => {
	return (
		<div className='grid grid-cols-4 gap-2 mx-7 mt-5'>
			<IconCard label='Route' Icon={Route} />
			<IconCard label='Follow' Icon={Goal} />
			<IconCard label='Share' Icon={Share} />
			<IconCard label='More' Icon={Ellipsis} />
		</div>
	);
};
