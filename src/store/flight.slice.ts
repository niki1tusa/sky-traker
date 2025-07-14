import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { flights as FLIGHTS } from '@/shared/data/flights.data';
import type { IFlight } from '@/shared/types/flight.types';

interface IFilterFlight {
	location: {
		from: string;
		to: string;
	};
}
interface IFlightState {
	flights: IFlight[];
	filters: IFilterFlight;
}
const initialState: IFlightState = {
	flights: FLIGHTS,
	filters: {
		location: {
			from: '',
			to: '',
		},
	},
};

export const flightSlice = createSlice({
	name: 'filterFlight',
	initialState,
	reducers: {
		sortByCityName: (state, action: PayloadAction<string>) => {},
	},
});

export const {} = flightSlice.actions;

export default flightSlice.reducer;
