import { configureStore } from '@reduxjs/toolkit';

import FavoriteReducer from './FavoriteSlice';

export const store = configureStore({
	reducer: {
		favorite: FavoriteReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
