import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import theme from '../../../../core/theme';

export default function HeaderRow({ title, subtitle }: { title: string; subtitle?: string }) {
  const router = useRouter();

  return (
    <View style={styles.headerRow}>
      <Pressable
        style={styles.backButtonRow}
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <MaterialIcons name="arrow-back" size={24} color={theme.colors.dark} />
      </Pressable>

      <View style={styles.headerInlineText}>
        <Text style={styles.movieTitle}>{title}</Text>
        {subtitle ? <Text style={styles.releaseDate}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: theme.colors.light,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonRow: {
    padding: 4,
    marginRight: 12,
  },
  headerInlineText: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 22,
    fontFamily: theme.fonts.medium,
    color: theme.colors.dark,
    marginBottom: 4,
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.blue,
    textAlign: 'center',
  },
});
