import { Movie } from '../../domain/entities/movie';
import { Genre } from '../../data/datasources/movie_remote_data_source';

export interface MovieRepository {
  getUpcomingMovies(page?: number): Promise<{ results: Movie[]; page: number; total_pages: number }>;
  searchMovies(query: string, page?: number): Promise<{ results: Movie[]; page: number; total_pages: number }>;
  discoverMoviesByGenre(genreId: number, page?: number): Promise<{ results: Movie[]; page: number; total_pages: number }>;
  getGenres(): Promise<Genre[]>;
}
