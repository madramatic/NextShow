import { Movie } from '../../domain/entities/movie';
import { MovieDetail, Genre } from '../../domain/entities/movie_detail';
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

  async searchMovies(query: string, page = 1): Promise<{ results: Movie[]; page: number; total_pages: number }> {
    return this.remoteDataSource.searchMovies(query, page);
  }

  async discoverMoviesByGenre(genreId: number, page = 1): Promise<{ results: Movie[]; page: number; total_pages: number }> {
    return this.remoteDataSource.discoverMoviesByGenre(genreId, page);
  }

  async getGenres(): Promise<Genre[]> {
    return this.remoteDataSource.getGenres();
  }

  async getMovieDetails(movieId: number): Promise<MovieDetail> {
    return this.remoteDataSource.getMovieDetails(movieId);
  }
}
