import { type PropsWithChildren, useEffect, useState } from 'react';

import { ThemeContext } from '@/context/ctx';

export default function Provider({ children }: PropsWithChildren) {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};
	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === 'dark') {
			return root.classList.add('dark');
		} else {
			return root.classList.remove('dark');
		}
	}, [theme]);
	return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

// Document.documentElement - свойство только для чтения, которое возвращает элемент Element,
// который является коренным элементом документа document (например элемент <html> для HTML документов).
