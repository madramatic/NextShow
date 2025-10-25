import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../redux/moviesSlice';
import searchReducer from '../redux/searchSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
