import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import theme from '../../core/theme/index';

type Props = {
  searchMode?: boolean;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  onClear?: () => void;
};

const AppBar: React.FC<Props> = ({ searchMode = false, searchValue = '', onSearchChange, onClear }) => {
  const router = useRouter();

  return (
    <View style={styles.appBarWrapper}>
      <View style={styles.appBar}>
        {!searchMode ? (
          <>
            <Text style={styles.appBarTitle}>Watch</Text>
            <Pressable
              onPress={() => router.push('/search')}
              accessibilityRole="button"
              accessibilityLabel="Open search"
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <MaterialIcons name="search" size={24} color={theme.colors.dark} />
            </Pressable>
          </>
        ) : (
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color={theme.colors.gray} />
            <TextInput
              placeholder="TV shows, movies, people..."
              placeholderTextColor={theme.colors.gray}
              style={styles.input}
              value={searchValue}
              onChangeText={onSearchChange}
              returnKeyType="search"
              accessibilityLabel="Search input"
            />
            {searchValue ? (
              <Pressable onPress={onClear} accessibilityRole="button" accessibilityLabel="Clear search">
                <MaterialIcons name="close" size={20} color={theme.colors.gray} />
              </Pressable>
            ) : (
              <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Close search">
                <MaterialIcons name="close" size={20} color={theme.colors.gray} />
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarWrapper: {
    backgroundColor: theme.colors.light,
    paddingTop: 48,
    paddingLeft: 0,
    paddingRight: 0,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  appBarTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.medium,
    color: theme.colors.dark,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: theme.colors.dark,
    fontFamily: theme.fonts.regular,
  },
});

export default AppBar;
