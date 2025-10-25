import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MovieDetailScreen() {
  const { movieId } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Movie Detail for ID: {movieId}</Text>
    </View>
  );
}
