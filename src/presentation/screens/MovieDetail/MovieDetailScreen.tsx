import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Dimensions,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../../core/theme';
import { fetchMovieDetails, clearMovieDetail } from '../../redux/movieDetailSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { Genre } from '../../../domain/entities/movie_detail';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props {
  movieId?: string | number | null;
}

export default function MovieDetailScreen({ movieId }: Props) {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { movieDetail, loading, error } = useSelector((state: RootState) => state.movieDetail);

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

  const posterUrl = movieDetail.poster_path
    ? `https://image.tmdb.org/t/p/w342${movieDetail.poster_path}`
    : null;

  const releaseYear = movieDetail.release_date
    ? new Date(movieDetail.release_date).getFullYear()
    : '';

  const formattedDate = movieDetail.release_date
    ? new Date(movieDetail.release_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  // select a suitable logo from TMDB logos array (prefer english, then null, then first)
  let logoUrl: string | null = null;
  if (movieDetail.logos && movieDetail.logos.length > 0) {
    const logos = movieDetail.logos;
    const preferred = logos.find((l) => l.iso_639_1 === 'en') || logos.find((l) => l.iso_639_1 === null) || logos[0];
    if (preferred && preferred.file_path) {
      // If the original asset was an SVG, TMDB also serves a PNG variant — prefer PNG for RN Image
      let filePath = preferred.file_path;
      if (filePath.endsWith('.svg')) {
        filePath = filePath.replace(/\.svg$/i, '.png');
      }
      // use a reasonable size for logos
      logoUrl = `https://image.tmdb.org/t/p/w300${filePath}`;
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          {backdropUrl && (
            <Image source={{ uri: backdropUrl }} style={styles.backdrop} resizeMode="cover" />
          )}

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <MaterialIcons name="arrow-back" size={24} color={theme.colors.light} />
          </Pressable>


          <View style={styles.buttonsOverlay}>
            {logoUrl && (
              <Image
                source={{ uri: logoUrl }}
                style={styles.logo}
                resizeMode="contain"
              />
            )}
            <Text style={styles.releaseInfo}>In Theaters {formattedDate}</Text>

            <Pressable
              style={styles.ticketsButton}
              onPress={() => router.push({
                pathname: '/seats',
                params: { movieId: String(movieId), title: movieDetail.title }
              })}
              accessibilityRole="button"
            >
              <Text style={styles.ticketsButtonText}>Get Tickets</Text>
            </Pressable>

            <Pressable
              style={styles.trailerButton}
              onPress={() => router.push(`/${movieId}/trailer`)}
              accessibilityRole="button"
            >
              <MaterialIcons name="play-arrow" size={24} color={theme.colors.light} />
              <Text style={styles.trailerButtonText}>Watch Trailer</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.genresSection}>
            <Text style={styles.sectionTitle}>Genres</Text>
            <View style={styles.genresContainer}>
              {movieDetail.genres.map((genre: Genre, index: number) => (
                <View
                  key={genre.id}
                  style={[
                    styles.genreTag,
                    { backgroundColor: getGenreColor(index) },
                  ]}
                >
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.overviewSection}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overviewText}>{movieDetail.overview}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const getGenreColor = (index: number): string => {
  const colors = [theme.colors.mint, theme.colors.pink, theme.colors.purple, theme.colors.yellow];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.light,
  },
  errorText: {
    color: theme.colors.pink,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  logo: {
    width: 200,
    height: 60,
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerSection: {
    position: 'relative',
    height: 466,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 56,
    left: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  releaseInfo: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.light,
    marginBottom: 16,
    textAlign: 'center',
  },
  contentSection: {
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  ticketsButton: {
    backgroundColor: theme.colors.blue,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: SCREEN_WIDTH - 132,
    alignSelf: 'center',
  },
  ticketsButtonText: {
    color: theme.colors.light,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
  },
  trailerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.blue,
    paddingVertical: 14,
    borderRadius: 10,
    paddingHorizontal: 12,
    width: SCREEN_WIDTH - 132,
    alignSelf: 'center',
  },
  trailerButtonText: {
    color: theme.colors.light,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    marginLeft: 8,
  },
  genresSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.dark,
    marginBottom: 12,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  genreText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: theme.colors.light,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.lightGray,
    marginBottom: 24,
  },
  overviewSection: {
    marginBottom: 24,
  },
  overviewText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
});

