import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  movieId?: string | number | null;
}

export default function TrailerScreen({ movieId }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Trailer for Movie ID: {String(movieId)}</Text>
    </View>
  );
}
