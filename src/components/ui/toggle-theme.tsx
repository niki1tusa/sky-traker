import { Moon, SunMedium } from 'lucide-react';

import { Switch } from '@/components/animate-ui/base/switch';

import { useTheme } from '@/hooks/useTheme';

export const ToggleTheme = () => {
	const { toggleTheme } = useTheme();

	return (
		<Switch className='' onClick={toggleTheme} type='button' leftIcon={<Moon />} rightIcon={<SunMedium  color='#fca316'/>} />
	);
};
