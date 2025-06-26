export const FlyInfo = ({ text1 = '', text2 = '' }: { text1?: string; text2?: string | number }) => {
	return (
		<div className='bg-dark flex justify-between text-white/30 text-2xl px-8 py-4'>
			{text1 && <span>{text1}</span>}
			<span className='ml-5 text-white'>{text2}</span>
		</div>
	);
};
