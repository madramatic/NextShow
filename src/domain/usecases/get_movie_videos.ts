import { MovieVideo } from '../entities/video';
import { MovieRepository } from '../repositories/movie_repository';

export class GetMovieVideosUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(movieId: number): Promise<MovieVideo[]> {
    return this.repository.getMovieVideos(movieId);
  }
}
