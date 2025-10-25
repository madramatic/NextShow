import { Movie } from '../entities/movie';
import { MovieRepository } from '../repositories/movie_repository';

export class GetUpcomingMoviesUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(page = 1): Promise<{ results: Movie[]; page: number; total_pages: number }> {
    return this.repository.getUpcomingMovies(page);
  }
}
