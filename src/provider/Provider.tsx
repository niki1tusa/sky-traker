import { type PropsWithChildren, useEffect, useState } from 'react';

import { ThemeContext } from '@/context/ctx';

type TypeTheme = 'light' | 'dark';

export default function Provider({ children }: PropsWithChildren) {
	const [theme, setTheme] = useState<TypeTheme>(() => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('theme') as TypeTheme;
		}
		return 'light';
	});

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}

		localStorage.setItem('theme', theme);
	}, [theme]);

	return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

// Document.documentElement - свойство только для чтения, которое возвращает элемент Element,
// который является коренным элементом документа document (например элемент <html> для HTML документов).
