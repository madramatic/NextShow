export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  tagline: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  budget: number;
  revenue: number;
  status: string;
  adult: boolean;
  logos?: Array<{
    aspect_ratio?: number;
    height?: number;
    iso_639_1?: string | null;
    file_path: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
    file_type?: string;
  }>;
}

export interface Genre {
  id: number;
  name: string;
}
