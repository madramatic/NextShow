import { Genre } from '../entities/movie_detail';
import { MovieRepository } from '../repositories/movie_repository';

export class GetGenresUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Genre[]> {
    return this.repository.getGenres();
  }
}
