import React, { useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, useWindowDimensions, Text } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../../core/theme';
import { fetchMovieDetails, clearMovieDetail } from '../../redux/movieDetailSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { styles } from './MovieDetailScreen.styles';
import MovieBackdropHeader from './components/MovieBackdropHeader';
import MovieLogoButtons from './components/MovieLogoButtons';
import MovieGenresOverview from './components/MovieGenresOverview';

import { Genre } from '../../../domain/entities/movie_detail';

interface Props {
  movieId?: string | number | null;
}

export default function MovieDetailScreen({ movieId }: Props) {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { movieDetail, loading, error } = useSelector((state: RootState) => state.movieDetail);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(Number(movieId)));
    }
    return () => {
      dispatch(clearMovieDetail());
    };
  }, [movieId, dispatch]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.blue} />
      </View>
    );
  }

  if (error || !movieDetail) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Movie not found'}</Text>
      </View>
    );
  }

  const backdropUrl = movieDetail.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movieDetail.backdrop_path}`
    : null;

  const formattedDate = movieDetail.release_date
    ? new Date(movieDetail.release_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  let logoUrl: string | null = null;
  if (movieDetail.logos && movieDetail.logos.length > 0) {
    const logos = movieDetail.logos;
    const preferred = logos.find((l) => l.iso_639_1 === 'en') || logos.find((l) => l.iso_639_1 === null) || logos[0];
    if (preferred && preferred.file_path) {
      let filePath = preferred.file_path;
      if (filePath.endsWith('.svg')) {
        filePath = filePath.replace(/\.svg$/i, '.png');
      }
      logoUrl = `https://image.tmdb.org/t/p/w300${filePath}`;
    }
  }

  const handleTickets = () => {
    router.push({
      pathname: '/seats',
      params: { movieId: String(movieId), title: movieDetail.title },
    });
  };
  const handleTrailer = () => {
    router.push(`/${movieId}/trailer`);
  };

  return (
    <View style={styles.container}>
      {isLandscape ? (
        <View style={[styles.container, styles.landscapeContainer]}>
          <View style={[styles.landscapeHeaderSection, { height }]}> 
            <MovieBackdropHeader
              backdropUrl={backdropUrl}
              onBack={() => router.back()}
              isLandscape={isLandscape}
            />
            <MovieLogoButtons
              logoUrl={logoUrl}
              formattedDate={formattedDate}
              onTickets={handleTickets}
              onTrailer={handleTrailer}
              isLandscape={isLandscape}
            />
          </View>
          <ScrollView 
            style={[styles.landscapeContentSection, { height }]}
            showsVerticalScrollIndicator={false}
          >
            <MovieGenresOverview
              genres={movieDetail.genres}
              overview={movieDetail.overview}
              isLandscape={isLandscape}
              getGenreColor={getGenreColor}
            />
          </ScrollView>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerSection}>
            <MovieBackdropHeader
              backdropUrl={backdropUrl}
              onBack={() => router.back()}
              isLandscape={isLandscape}
            />
            <MovieLogoButtons
              logoUrl={logoUrl}
              formattedDate={formattedDate}
              onTickets={handleTickets}
              onTrailer={handleTrailer}
              isLandscape={isLandscape}
            />
          </View>
          <View style={styles.contentSection}>
            <MovieGenresOverview
              genres={movieDetail.genres}
              overview={movieDetail.overview}
              isLandscape={isLandscape}
              getGenreColor={getGenreColor}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const getGenreColor = (index: number): string => {
  const colors = [theme.colors.mint, theme.colors.pink, theme.colors.purple, theme.colors.yellow];
  return colors[index % colors.length];
};
