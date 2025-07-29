export const FlyInfo = ({ text1 = '', text2 = '' }: { text1?: any; text2?: any}) => {
	return (
		<div className='bg-dark flex justify-between text-white/30 dark:text-foreground text-lg 2xl:text-2xl px-2  2xl:px-8 py-4'>
			{text1 && <span>{text1}</span>}
			<span className=' 2xl:ml-5 text-foreground'>{text2}</span>
		</div>
	);
};
