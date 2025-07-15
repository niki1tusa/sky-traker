import clsx from 'clsx';

export function AirportInfo({
	code,
	city,
	timezone,
	rounded = 'rounded-tl-4xl',
}: {
	code: string;
	city: string;
	timezone: string;
	rounded?: 'rounded-tl-4xl' | 'rounded-tr-4xl';
}) {
	return (
		<div className={clsx('bg-dark flex flex-col items-center gap-1 py-5', rounded)}>
			<div className='text-xl font-semibold 2xl:text-3xl'>{code}</div>
			<div>{city}</div>
			<div className='text-white/30'>{timezone}</div>
		</div>
	);
}
