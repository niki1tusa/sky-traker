import type { IFlight } from '@/shared/types/flight.types';

export const flights: IFlight[] = [
	{
		logo: '/logos/turkish.svg',
		id: 'TK143',
		airline: {
			name: 'Turkish Airlines',
			country: 'Turkish',
		},
		aircraftReg: 'TC-JFP',
		from: {
			city: 'Sofia',
			country: 'Bulgaria',
			countryCode: 'BG',
			timezone: 'UTC +3',
			code: 'SOF',
		},
		to: {
			city: 'Beijing',
			country: 'China',
			countryCode: 'CN',
			timezone: 'UTC +8',
			code: 'PEK',
		},
		airplane: {
			image: '/planes/turkish.svg',
			name: 'Airbus A330',
		},
		colorGradient: ['#ffdede', '#ffbaba'],
		route: {
			speed: 870,
			altitude: 10600,
		},
	},
	{
		logo: '/logos/ryanair.svg',
		id: 'RN1782',
		airline: {
			name: 'Ryanair',
			country: 'Irish',
		},
		aircraftReg: 'D-AISP',
		from: {
			city: 'Dublin',
			country: 'Ireland',
			countryCode: 'IE',
			timezone: 'UTC +1',
			code: 'DUB',
		},
		to: {
			city: 'Larnaca',
			country: 'Cyprus',
			countryCode: 'CY',
			timezone: 'UTC +3',
			code: 'LCA',
		},
		airplane: {
			image: '/planes/ryanair.svg',
			name: 'Boeing 737-800',
		},
		colorGradient: ['#A1C6E1', '#88B5E0'],
		route: {
			speed: 840,
			altitude: 11200,
		},
	},
	{
		logo: '/logos/s7.svg',
		id: 'S7124',
		airline: {
			name: 'Seven Airlines',
			country: 'Russia',
		},
		aircraftReg: 'RA-73415',
		from: {
			city: 'Nice',
			country: 'France',
			countryCode: 'FR',
			timezone: 'UTC +2',
			code: 'NCE',
		},
		to: {
			city: 'Tbilisi',
			country: 'Georgia',
			countryCode: 'GE',
			timezone: 'UTC +4',
			code: 'TBS',
		},
		airplane: {
			image: '/planes/s7.svg',
			name: 'Airbus A320neo',
		},
		colorGradient: ['#d6ffe5', '#96f2c1'],
		route: {
			speed: 860,
			altitude: 10900,
		},
	},
	{
		logo: '/logos/swiss.svg',
		id: 'LX318',
		airline: {
			name: 'Swiss International Air Lines',
			country: 'Swiss',
		},
		aircraftReg: 'HB-JHK',
		from: {
			city: 'Porto',
			country: 'Portugal',
			countryCode: 'PT',
			timezone: 'UTC +1',
			code: 'OPO',
		},
		to: {
			city: 'Baku',
			country: 'Azerbaijan',
			countryCode: 'AZ',
			timezone: 'UTC +4',
			code: 'GYD',
		},
		airplane: {
			image: '/planes/swiss.svg',
			name: 'Airbus A220-300',
		},
		colorGradient: ['#e6e6ff', '#a8b4ff'],
		route: {
			speed: 830,
			altitude: 10700,
		},
	},
	{
		logo: '/logos/lufthansa.svg',
		id: 'LH401',
		airline: {
			name: 'Lufthansa AirLines',
			country: 'Germany',
		},
		aircraftReg: 'D-AIXD',
		from: {
			city: 'Burgas',
			country: 'Bulgaria',
			countryCode: 'BG',
			timezone: 'UTC +3',
			code: 'BOJ',
		},
		to: {
			city: 'Muscat',
			country: 'Oman',
			countryCode: 'OM',
			timezone: 'UTC +4',
			code: 'MCT',
		},
		airplane: {
			image: '/planes/lufthansa.svg',
			name: 'Airbus A350-900',
		},
		colorGradient: ['#e5f2ff', '#9dd2f9'],
		route: {
			speed: 890,
			altitude: 11300,
		},
	},
];
