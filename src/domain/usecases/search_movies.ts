import { Movie } from '../entities/movie';
import { MovieRepository } from '../repositories/movie_repository';

export class SearchMoviesUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(query: string, page = 1): Promise<{ results: Movie[]; page: number; total_pages: number }> {
    return this.repository.searchMovies(query, page);
  }
}
