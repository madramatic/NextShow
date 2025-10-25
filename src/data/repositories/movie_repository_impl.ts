import { Movie } from '../../domain/entities/movie';
import { MovieRepository } from '../../domain/repositories/movie_repository';
import { MovieRemoteDataSource } from '../datasources/movie_remote_data_source';

export class MovieRepositoryImpl implements MovieRepository {
  private remoteDataSource: MovieRemoteDataSource;

  constructor(remoteDataSource: MovieRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getUpcomingMovies(page = 1): Promise<{ results: Movie[]; page: number; total_pages: number }> {
    return this.remoteDataSource.getUpcomingMovies(page);
  }
}
