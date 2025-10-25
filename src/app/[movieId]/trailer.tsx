import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import TrailerScreen from '../../presentation/screens/Trailer/TrailerScreen';

export default function Page() {
  const { movieId } = useLocalSearchParams<{ movieId: string }>();
  return <TrailerScreen movieId={movieId} />;
}
