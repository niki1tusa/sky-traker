import { useContext } from 'react';

import { ThemeContext } from '@/context/ctx';

export const useTheme = () => {
	const ctx = useContext(ThemeContext);
      if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
	return ctx;
};
