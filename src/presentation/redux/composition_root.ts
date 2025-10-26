import { MovieRemoteDataSource } from '../../data/datasources/movie_remote_data_source';
import { MovieRepositoryImpl } from '../../data/repositories/movie_repository_impl';
import { GetMovieDetailsUseCase } from '../../domain/usecases/get_movie_details';

// Composition root example - export pre-instantiated use cases for presentation layer
const movieRepository = new MovieRepositoryImpl(new MovieRemoteDataSource());

export const getMovieDetailsUseCase = new GetMovieDetailsUseCase(movieRepository);
