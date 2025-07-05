import type { ChangeEvent } from 'react';

interface Props {
	fieldCity: { from: string; to: string };
	handlerInput: (arg: ChangeEvent<HTMLInputElement>) => void;
}

export function FilterByCity({ fieldCity, handlerInput }: Props) {
	return (
		<div className='bg-background flex flex-col rounded-sm p-2 text-[1.1rem]'>
			<span className='flex items-center gap-2'>
				<label>From:</label>
				<input
					className='focus:border-orange focus:border rounded-sm p-1'
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
					className='focus:border-orange focus:border rounded-sm p-1'
					name='to'
					type='text'
					placeholder='Enter location...'
					value={fieldCity.to}
					onChange={e => handlerInput(e)}
				/>
			</span>
		</div>
	);
}
