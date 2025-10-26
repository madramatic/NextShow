import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../redux/moviesSlice';
import searchReducer from '../redux/searchSlice';
import movieDetailReducer from '../redux/movieDetailSlice';
import movieVideosReducer from '../redux/movieVideosSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search: searchReducer,
    movieDetail: movieDetailReducer,
    movieVideos: movieVideosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
