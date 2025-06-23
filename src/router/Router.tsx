import type { ComponentType } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { Layout } from '../Layout';

import { routes } from './route.data';

interface IRoute {
	path: string;
	component: ComponentType;
}
export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					{routes.map((route: IRoute) => (
						<Route path={route.path} element={<route.component />} />
					))}
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
