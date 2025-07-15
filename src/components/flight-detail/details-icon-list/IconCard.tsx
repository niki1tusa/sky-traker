import type { LucideIcon } from "lucide-react";

export const IconCard = ({ label, Icon }: { label: string; Icon: LucideIcon }) => {
	return (
		<div className='bg-dark px-4 pt-2 flex flex-col items-center'>
			<Icon className="w-[22px] h-[22px] 2xl:w-[30px] 2xl:h-[30px]" />
			<span className='my-2 text-base 2xl:text-xl'>{label}</span>
		</div>
	);
};
