import { PAGE } from "@/config/page.config";

export interface ILink { 
    link: string
    title: string
}

export const NAV_DATA: ILink[] = [
    {
        link: PAGE.HOME,
        title: 'Home',
    },
    {
        link: PAGE.DETAILS,
        title: 'Details',
    },
    {
        link: PAGE.ABOUT,
        title: 'About',
    },
    {
        link: PAGE.FAVORITES,
        title: 'Favorites',
    },
];