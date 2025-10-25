import { Movie } from '../../domain/entities/movie';

export interface MovieRepository {
  getUpcomingMovies(page?: number): Promise<{ results: Movie[]; page: number; total_pages: number }>;
}
