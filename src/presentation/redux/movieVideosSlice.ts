import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MovieVideo } from '../../domain/entities/video';
import { MovieRepositoryImpl } from '../../data/repositories/movie_repository_impl';
import { MovieRemoteDataSource } from '../../data/datasources/movie_remote_data_source';

const movieRepository = new MovieRepositoryImpl(new MovieRemoteDataSource());

export const fetchMovieVideos = createAsyncThunk<
  MovieVideo[],
  number,
  { rejectValue: string }
>(
  'movieVideos/fetchVideos',
  async (movieId, { rejectWithValue }) => {
    try {
      return await movieRepository.getMovieVideos(movieId);
    } catch (error: any) {
      return rejectWithValue(error?.message || String(error));
    }
  }
);

interface MovieVideosState {
  videos: MovieVideo[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieVideosState = {
  videos: [],
  loading: false,
  error: null,
};

const movieVideosSlice = createSlice({
  name: 'movieVideos',
  initialState,
  reducers: {
    clearMovieVideos: (state) => {
      state.videos = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchMovieVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMovieVideos } = movieVideosSlice.actions;
export default movieVideosSlice.reducer;
