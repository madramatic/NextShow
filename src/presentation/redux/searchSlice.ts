import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie } from '../../domain/entities/movie';
import { Genre } from '../../domain/entities/movie_detail';
import { MovieRepositoryImpl } from '../../data/repositories/movie_repository_impl';
import { MovieRemoteDataSource } from '../../data/datasources/movie_remote_data_source';

const movieRepository = new MovieRepositoryImpl(new MovieRemoteDataSource());

export const searchMovies = createAsyncThunk<
  { results: Movie[]; page: number; total_pages: number },
  string,
  { rejectValue: string }
>(
  'search/searchMovies',
  async (query, { rejectWithValue }) => {
    try {
      return await movieRepository.searchMovies(query, 1);
    } catch (error: any) {
      return rejectWithValue(error?.message || String(error));
    }
  }
);

export const discoverMoviesByGenre = createAsyncThunk<
  { results: Movie[]; page: number; total_pages: number },
  number,
  { rejectValue: string }
>(
  'search/discoverByGenre',
  async (genreId, { rejectWithValue }) => {
    try {
      return await movieRepository.discoverMoviesByGenre(genreId, 1);
    } catch (error: any) {
      return rejectWithValue(error?.message || String(error));
    }
  }
);

export const fetchGenres = createAsyncThunk<
  Genre[],
  void,
  { rejectValue: string }
>(
  'search/fetchGenres',
  async (_, { rejectWithValue }) => {
    try {
      return await movieRepository.getGenres();
    } catch (error: any) {
      return rejectWithValue(error?.message || String(error));
    }
  }
);

interface SearchState {
  searchResults: Movie[];
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchResults: [],
  genres: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchResults = [];
      })
      .addCase(discoverMoviesByGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(discoverMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results;
      })
      .addCase(discoverMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.searchResults = [];
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
