import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  movieId?: string | number | null;
}

export default function MovieDetailScreen({ movieId }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Movie Detail for ID: {String(movieId)}</Text>
    </View>
  );
}
