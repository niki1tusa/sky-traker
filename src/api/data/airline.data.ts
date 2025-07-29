export interface IAirline {
	logo: string;
	name: string;
	image: string;
}
export const airlineData: IAirline[] = [
	{
		logo: '/logos/turkish.svg',
		name: 'Turkish Airlines',
		image: '/planes/turkish.svg',
	},
	{
		logo: '/logos/ryanair.svg',
		name: 'Ryanair',
		image: '/planes/ryanair.svg',
	},
	{
		logo: '/logos/s7.svg',
		name: 'Seven Airlines',
		image: '/planes/s7.svg',
	},
	{
		logo: '/logos/swiss.svg',
		name: 'Swiss International Air Lines',
		image: '/planes/swiss.svg',
	},
	{
		logo: '/logos/lufthansa.svg',
		name: 'Lufthansa AirLines',
		image: '/planes/lufthansa.svg',
	},
];
