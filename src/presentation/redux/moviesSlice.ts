import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie } from '../../domain/entities/movie';
import { MovieRepositoryImpl } from '../../data/repositories/movie_repository_impl';
import { MovieRemoteDataSource } from '../../data/datasources/movie_remote_data_source';

const movieRepository = new MovieRepositoryImpl(new MovieRemoteDataSource());

export const fetchUpcomingMovies = createAsyncThunk<
  { results: Movie[]; page: number; total_pages: number },
  number | undefined,
  { rejectValue: string }
>(
  'movies/fetchUpcoming',
  async (page = 1, { rejectWithValue }) => {
    try {
      return await movieRepository.getUpcomingMovies(page);
    } catch (error: any) {
      return rejectWithValue(error?.message || String(error));
    }
  }
);

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  loadingMore: false,
  error: null,
  page: 0,
  totalPages: 0,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMovies.pending, (state, action) => {
        const page = action.meta.arg ?? 1;
        if (page > 1) {
          state.loadingMore = true;
        } else {
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        const { results, page, total_pages } = action.payload;
        if (page > 1) {
          state.loadingMore = false;
          state.movies = [...state.movies, ...results];
        } else {
          state.loading = false;
          state.movies = results;
        }
        state.page = page;
        state.totalPages = total_pages;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        const page = action.meta.arg ?? 1;
        if (page > 1) {
          state.loadingMore = false;
        } else {
          state.loading = false;
          state.error = action.payload as string;
        }
      });
  },
});

export default moviesSlice.reducer;
