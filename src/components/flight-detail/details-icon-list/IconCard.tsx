import type { LucideIcon } from "lucide-react";

export const IconCard = ({ label, Icon }: { label: string; Icon: LucideIcon }) => {
	return (
		<div className='bg-dark px-4 py-2 flex flex-col items-center'>
			<Icon size={30} />
			<span className='mt-2 text-2xl'>{label}</span>
		</div>
	);
};
