import { useEffect, useRef } from 'react';

type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void;

export function useOnClickOutside<T extends HTMLElement>(handler: ClickOutsideHandler) {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const listener = ((event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) return;
			handler(event);
		});

		document.addEventListener('click', listener);
		document.addEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('click', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [handler]);
	return { ref };
}
