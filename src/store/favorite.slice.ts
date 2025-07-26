import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { flights as FLIGHTS } from '@/shared/mock/flights.data';
import type { IFlightMock } from '@/shared/types/flight.types';

interface IFavoriteState {
	favoriteFlights: IFlightMock[];
	flights: IFlightMock[];
}
const initialState: IFavoriteState = {
	favoriteFlights: [],
	flights: FLIGHTS,
};

export const favoriteSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorite: (state, action: PayloadAction<string>) => {
			const flightId = action.payload;
			const flightIndex = state.flights.findIndex(flight => flight.id === flightId);

			if (flightIndex !== -1 && !state.flights[flightIndex].favorite) {
				state.flights[flightIndex].favorite = true;
				state.favoriteFlights.push(state.flights[flightIndex]);
			}
		},
		removeFavorite: (state, action: PayloadAction<string>) => {
			const flightId = action.payload;
			const flightIndex = state.flights.findIndex(flight => flight.id === flightId);
			if (flightIndex !== -1) {
				state.flights[flightIndex].favorite = false;
				state.favoriteFlights = state.favoriteFlights.filter(flight => flight.id !== flightId);
			}
		},
		clearAllFavorites: state => {
			state.flights = state.flights.map(flight => ({ ...flight, favorite: false }));
			state.favoriteFlights = [];
		},
	},
});

export const { addFavorite, removeFavorite, clearAllFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
