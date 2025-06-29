import { useState, type PropsWithChildren } from 'react';

import { ThemeContext } from '@/context/ctx';

export default function Provider({ children }: PropsWithChildren) {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const toggleTheme = () =>{
        setTheme(theme === 'light'? 'dark': 'light')
    }
	return <ThemeContext value={{theme, toggleTheme}}>{children}</ThemeContext>;
}
