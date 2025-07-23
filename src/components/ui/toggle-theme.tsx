import { Moon, SunMedium } from 'lucide-react';

import { Switch } from '@/components/animate-ui/base/switch';

import { useTheme } from '@/hooks/useTheme';

export const ToggleTheme = () => {
	const { toggleTheme } = useTheme();

	return (
		<Switch
			className=''
			onClick={toggleTheme}
			type='button'
			leftIcon={<SunMedium color='#fca316' />}
			rightIcon={<Moon />}
		/>
	);
};
