import { Movie } from '../../domain/entities/movie';
import { MovieDetail, Genre } from '../entities/movie_detail';

export interface MovieRepository {
  getUpcomingMovies(page?: number): Promise<{ results: Movie[]; page: number; total_pages: number }>;
  searchMovies(query: string, page?: number): Promise<{ results: Movie[]; page: number; total_pages: number }>;
  discoverMoviesByGenre(genreId: number, page?: number): Promise<{ results: Movie[]; page: number; total_pages: number }>;
  getGenres(): Promise<Genre[]>;
  getMovieDetails(movieId: number): Promise<MovieDetail>;
}
