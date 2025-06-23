import { DetailsPage } from '../pages/details/page';
import { HomePage } from '../pages/home/page';
import { SaveFavoritePage } from '../pages/save-favorite/page';

export const routes = [
	{
		path: '/',
		component: HomePage,
	},
	{
		path: '/deatails',
		component: DetailsPage,
	},
	{
		path: '/save-favorite',
		component: SaveFavoritePage,
	},
];
