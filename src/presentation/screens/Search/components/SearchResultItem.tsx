import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../../../core/theme';
import { Genre } from '../../../../domain/entities/movie_detail';

type Props = {
  item: any;
  genres: Genre[];
  onPress?: () => void;
};

export default function SearchResultItem({ item, genres, onPress }: Props) {
  const imageUrl = item.poster_path || item.backdrop_path
    ? `https://image.tmdb.org/t/p/w200${item.poster_path || item.backdrop_path}`
    : undefined;

  const firstGenreId = Array.isArray(item.genre_ids) && item.genre_ids.length > 0 ? item.genre_ids[0] : null;
  const genreLabel = firstGenreId && genres.length > 0
    ? genres.find(g => g.id === firstGenreId)?.name || ''
    : '';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, { opacity: pressed ? 0.7 : 1 }]}>
      <View style={styles.imageWrapper}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}
      </View>

      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        {genreLabel ? <Text style={styles.subtitle}>{genreLabel}</Text> : null}
      </View>

      <View style={styles.moreWrap}>
        <MaterialIcons name="more-vert" size={22} color={theme.colors.gray} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.light,
  },
  imageWrapper: {
    marginRight: 12,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: theme.colors.lightGray,
  },
  imagePlaceholder: {
    opacity: 0.3,
  },
  meta: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.dark,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: theme.colors.gray,
    fontFamily: theme.fonts.regular,
  },
  moreWrap: {
    paddingLeft: 8,
  },
});
