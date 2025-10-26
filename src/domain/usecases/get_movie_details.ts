import { MovieDetail } from '../entities/movie_detail';
import { MovieRepository } from '../repositories/movie_repository';

export class GetMovieDetailsUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(movieId: number): Promise<MovieDetail> {
    return this.repository.getMovieDetails(movieId);
  }
}
