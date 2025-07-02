
export function StatusBar({ status }: { status: number }) {

	return (
		<div className='relative  h-2 w-full rounded-full bg-gray-700/50'>
			{/* Прогресс-бар */}
			<div
				className='bg-orange h-full rounded-full transition-all duration-300 ease-in-out'
				style={{ width: `${status}%` }}
			/>

			{/* Иконка самолета */}
			<div
				className='absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out'
				style={{ left: `calc(${status}% - 10px)` }} // -10px чтобы центрировать
			>
			<img src='airplane/airplane.svg' alt="progress plane svg"/>
				
			</div>
		</div>
	);
}
