import React from 'react';
import { View, Image, Pressable, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../../../core/theme';

interface Props {
  backdropUrl: string | null;
  onBack: () => void;
  isLandscape: boolean;
}

export default function MovieBackdropHeader({ backdropUrl, onBack, isLandscape }: Props) {
  return (
    <>
      {backdropUrl && (
        <Image source={{ uri: backdropUrl }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      )}
      <Pressable
        style={isLandscape ? [styles.backButton, styles.landscapeBackButton] : styles.backButton}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <MaterialIcons name="arrow-back" size={24} color={theme.colors.light} />
      </Pressable>
      <Text style={isLandscape ? styles.watchText : styles.watchTextPortrait}>Watch</Text>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 56,
    left: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  landscapeBackButton: {
    top: 48,
    left: 24,
  },
  watchText: {
    position: 'absolute',
    top: 50,
    left: 70,
    fontSize: 24,
    fontFamily: theme.fonts.medium,
    color: theme.colors.light,
    zIndex: 2,
  },
  watchTextPortrait: {
    position: 'absolute',
    top: 58,
    left: 66,
    fontSize: 20,
    fontFamily: theme.fonts.medium,
    color: theme.colors.light,
    zIndex: 2,
  },
});
