import axios from 'axios';
import secrets from '../../core/config/secrets';
import { Movie } from '../../domain/entities/movie';

export interface Genre {
  id: number;
  name: string;
}

export class MovieRemoteDataSource {
  async getUpcomingMovies(page = 1): Promise<{ results: Movie[]; page: number; total_pages: number }> {
    const response = await axios.get(`${secrets.TMDB_BASE_URL}/movie/upcoming`, {
      params: {
        api_key: secrets.TMDB_API_KEY,
        page,
      },
    });
    const data = response.data as { results: any[]; page: number; total_pages: number };
    const results: Movie[] = data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      overview: item.overview,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      release_date: item.release_date,
      genre_ids: item.genre_ids || [],
    }));
    return {
      results,
      page: data.page,
      total_pages: data.total_pages,
    };
  }

  async searchMovies(query: string, page = 1): Promise<{ results: Movie[]; page: number; total_pages: number }> {
    const response = await axios.get(`${secrets.TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: secrets.TMDB_API_KEY,
        query,
        include_adult: false,
        language: 'en-US',
        page,
      },
    });

    const data = response.data as { results: any[]; page: number; total_pages: number };
    const results: Movie[] = data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      overview: item.overview,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      release_date: item.release_date,
      genre_ids: item.genre_ids || [],
    }));

    return {
      results,
      page: data.page,
      total_pages: data.total_pages,
    };
  }

  async discoverMoviesByGenre(genreId: number, page = 1): Promise<{ results: Movie[]; page: number; total_pages: number }> {
    const response = await axios.get(`${secrets.TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: secrets.TMDB_API_KEY,
        with_genres: genreId,
        sort_by: 'popularity.desc',
        include_adult: false,
        language: 'en-US',
        page,
      },
    });

    const data = response.data as { results: any[]; page: number; total_pages: number };
    const results: Movie[] = data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      overview: item.overview,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      release_date: item.release_date,
      genre_ids: item.genre_ids || [],
    }));

    return {
      results,
      page: data.page,
      total_pages: data.total_pages,
    };
  }

  async getGenres(): Promise<Genre[]> {
    const response = await axios.get(`${secrets.TMDB_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: secrets.TMDB_API_KEY,
        language: 'en-US',
      },
    });

    const data = response.data as { genres: Genre[] };
    return data.genres || [];
  }
}
