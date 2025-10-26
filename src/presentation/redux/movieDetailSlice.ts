import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MovieDetail } from '../../domain/entities/movie_detail';
import { getMovieDetailsUseCase } from './composition_root';

export const fetchMovieDetails = createAsyncThunk<
  MovieDetail,
  number,
  { rejectValue: string }
>(
  'movieDetail/fetchDetails',
  async (movieId, { rejectWithValue }) => {
    try {
      return await getMovieDetailsUseCase.execute(movieId);
    } catch (error: any) {
      return rejectWithValue(error?.message || String(error));
    }
  }
);

interface MovieDetailState {
  movieDetail: MovieDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailState = {
  movieDetail: null,
  loading: false,
  error: null,
};

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    clearMovieDetail: (state) => {
      state.movieDetail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetail = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMovieDetail } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
