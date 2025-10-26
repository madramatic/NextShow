import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../../core/theme';
import { Genre } from '../../../../domain/entities/movie_detail';

interface Props {
  genres: Genre[];
  overview: string;
  isLandscape: boolean;
  getGenreColor: (index: number) => string;
}

export default function MovieGenresOverview({ genres, overview, isLandscape, getGenreColor }: Props) {
  return (
    <>
      <View style={[styles.genresSection, isLandscape && styles.landscapeGenresSection]}>
        <Text style={[styles.sectionTitle, isLandscape && styles.landscapeSectionTitle]}>Genres</Text>
        <View style={[styles.genresContainer, isLandscape && styles.landscapeGenresContainer]}>
          {genres.map((genre, index) => (
            <View
              key={genre.id}
              style={[
                styles.genreTag,
                isLandscape && styles.landscapeGenreTag,
                { backgroundColor: getGenreColor(index) },
              ]}
            >
              <Text style={[styles.genreText, isLandscape && styles.landscapeGenreText]}>{genre.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={[styles.overviewSection, isLandscape && styles.landscapeOverviewSection]}>
        <Text style={[styles.sectionTitle, isLandscape && styles.landscapeSectionTitle]}>Overview</Text>
        <Text style={[styles.overviewText, isLandscape && styles.landscapeOverviewText]}>{overview}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  genresSection: {
    marginBottom: 24,
  },
  landscapeGenresSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.dark,
    marginBottom: 12,
  },
  landscapeSectionTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  landscapeGenresContainer: {
    gap: 10,
  },
  genreTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  landscapeGenreTag: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  genreText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: theme.colors.light,
  },
  landscapeGenreText: {
    fontSize: 14,
  },
  overviewSection: {
    marginBottom: 24,
  },
  landscapeOverviewSection: {
    flex: 1,
  },
  overviewText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  landscapeOverviewText: {
    fontSize: 14,
    lineHeight: 24,
  },
});
