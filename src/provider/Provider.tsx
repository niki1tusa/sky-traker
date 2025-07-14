import { type PropsWithChildren, useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/store/store';

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

	return (
		<ReduxProvider store={store}>
			<ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
		</ReduxProvider>
	);
}

// Document.documentElement - свойство только для чтения, которое возвращает элемент Element,
// который является коренным элементом документа document (например элемент <html> для HTML документов).
