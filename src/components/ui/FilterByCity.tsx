import { RefreshCw } from 'lucide-react';
import { type ChangeEvent, useEffect, useState } from 'react';

import { Button } from './button';
import { SkeletonFiltered } from './skeleton/SkeletonFiltered';

interface Props {
	fieldCity: { from: string; to: string };
	handlerInput: (arg: ChangeEvent<HTMLInputElement>) => void;
}

export function FilterByCity({ fieldCity, handlerInput }: Props) {
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
		<SkeletonFiltered />
	) : (
		<div className='bg-dark/90 animate-fadeIn z-30 flex w-full flex-col rounded-3xl p-2 text-[1.1rem] shadow-xl'>
			<span className='flex items-center gap-2'>
				<label>From:</label>
				<input
					className='focus:border-orange rounded-sm p-1 focus:border'
					name='from'
					type='text'
					placeholder='Enter location...'
					value={fieldCity.from}
					onChange={e => handlerInput(e)}
				/>
			</span>
			<span className='flex items-center gap-2'>
				<label>To:</label>

				<input
					className='focus:border-orange rounded-sm p-1 focus:border'
					name='to'
					type='text'
					placeholder='Enter location...'
					value={fieldCity.to}
					onChange={e => handlerInput(e)}
				/>
			</span>
			<Button >
				<RefreshCw />
			</Button>
		</div>
	);
}
