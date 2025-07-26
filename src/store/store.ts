import { configureStore } from '@reduxjs/toolkit';
// import flightReducer from './flight.slice'
import FavoriteReducer from './favorite.slice';


export const store = configureStore({
	reducer: {
		favorite: FavoriteReducer,
		// filterFlight: flightReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
