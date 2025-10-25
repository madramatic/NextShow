import { Movie } from '../entities/movie';
import { MovieRepository } from '../repositories/movie_repository';

export class DiscoverMoviesByGenreUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(genreId: number, page = 1): Promise<{ results: Movie[]; page: number; total_pages: number }> {
    return this.repository.discoverMoviesByGenre(genreId, page);
  }
}
