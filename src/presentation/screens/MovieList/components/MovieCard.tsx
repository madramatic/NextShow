import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import theme from '../../../../core/theme/index';

interface Movie {
  id: number | string;
  title: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
}

interface Props {
  item: Movie;
  onPress?: () => void;
}

export default function MovieCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: theme.colors.gray,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    color: theme.colors.light,
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
});
