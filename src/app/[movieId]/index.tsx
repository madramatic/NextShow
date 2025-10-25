import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import MovieDetailScreen from '../../presentation/screens/MovieDetail/MovieDetailScreen';

export default function Page() {
  const { movieId } = useLocalSearchParams<{ movieId: string }>();
  return <MovieDetailScreen movieId={movieId} />;
}
