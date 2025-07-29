export const FlightLocation = ({ city, code }: { city: string ; code: string }) => {
	return (
		<div className='flex flex-col items-center text-sm md:text-base lg:text-xl xl:text-[22px] text-gray-500'>
			<span>{city}</span>
			<span className='font-bold'>{code}</span>
		</div>
	);
};