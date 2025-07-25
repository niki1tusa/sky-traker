import { PAGE } from '@/config/page.config';

import { DetailsPage } from '../pages/details/page';
import { HomePage } from '../pages/home/page';

import { AboutPage } from '@/pages/about/page';
import { FavoritesPage } from '@/pages/favorites/page';

export const routes = [
	{
		path: PAGE.HOME,
		component: HomePage,
	},
	{
		path: PAGE.DETAILS,
		component: DetailsPage,
	},
	{
		path: PAGE.ABOUT,
		component: AboutPage,
	},
	{
		path: PAGE.FAVORITES,
		component: FavoritesPage,
	},
];
