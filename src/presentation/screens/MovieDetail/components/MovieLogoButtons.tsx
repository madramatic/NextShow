import React from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../../../core/theme';

interface Props {
  logoUrl: string | null;
  formattedDate: string;
  onTickets: () => void;
  onTrailer: () => void;
  isLandscape: boolean;
}

export default function MovieLogoButtons({ logoUrl, formattedDate, onTickets, onTrailer, isLandscape }: Props) {
  if (isLandscape) {
    return (
      <View style={styles.landscapeLogoAndButtons}>
        {logoUrl && (
          <Image source={{ uri: logoUrl }} style={styles.landscapeLogo} resizeMode="contain" />
        )}
        <Text style={styles.landscapeReleaseInfo}>In Theaters {formattedDate}</Text>
        <View style={styles.landscapeButtonsRow}>
          <Pressable style={styles.landscapeTicketsButton} onPress={onTickets} accessibilityRole="button">
            <Text style={styles.ticketsButtonText}>Get Tickets</Text>
          </Pressable>
          <Pressable style={styles.landscapeTrailerButton} onPress={onTrailer} accessibilityRole="button">
            <MaterialIcons name="play-arrow" size={24} color={theme.colors.light} />
            <Text style={styles.trailerButtonText}>Watch Trailer</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.buttonsOverlay}>
      {logoUrl && (
        <Image source={{ uri: logoUrl }} style={styles.logo} resizeMode="contain" />
      )}
      <Text style={styles.releaseInfo}>In Theaters {formattedDate}</Text>
      <Pressable style={styles.ticketsButton} onPress={onTickets} accessibilityRole="button">
        <Text style={styles.ticketsButtonText}>Get Tickets</Text>
      </Pressable>
      <Pressable style={styles.trailerButton} onPress={onTrailer} accessibilityRole="button">
        <MaterialIcons name="play-arrow" size={24} color={theme.colors.light} />
        <Text style={styles.trailerButtonText}>Watch Trailer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Portrait
  buttonsOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  logo: {
    width: 200,
    height: 60,
    alignSelf: 'center',
    marginBottom: 12,
  },
  releaseInfo: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.light,
    marginBottom: 16,
    textAlign: 'center',
  },
  ticketsButton: {
    backgroundColor: theme.colors.blue,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 66,
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
    marginHorizontal: 66,
  },
  trailerButtonText: {
    color: theme.colors.light,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    marginLeft: 8,
  },
  // Landscape
  landscapeLogoAndButtons: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  landscapeLogo: {
    width: 180,
    height: 54,
    marginBottom: 12,
  },
  landscapeReleaseInfo: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.light,
    marginBottom: 16,
    textAlign: 'center',
  },
  landscapeButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
  },
  landscapeTicketsButton: {
    flex: 1,
    backgroundColor: theme.colors.blue,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  landscapeTrailerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.blue,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
