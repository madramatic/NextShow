import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import theme from '../../../core/theme';
import GenreCard from './components/GenreCard';
import AppBar from '../../components/AppBar';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const H_SPACING = 16;
const NUM_COLS = 2;
const CARD_WIDTH = (WINDOW_WIDTH - H_SPACING * (NUM_COLS + 1)) / NUM_COLS;
const CARD_HEIGHT = Math.round(CARD_WIDTH * 0.62);

const GENRES = [
  { id: 'Comedies', title: 'Comedies', image: require('../../../../assets/images/genres/Comedies.jpg') },
  { id: 'Crime', title: 'Crime', image: require('../../../../assets/images/genres/Crime.jpg') },
  { id: 'Family', title: 'Family', image: require('../../../../assets/images/genres/Family.jpg') },
  { id: 'Documentaries', title: 'Documentaries', image: require('../../../../assets/images/genres/Documentaries.jpg') },
  { id: 'Dramas', title: 'Dramas', image: require('../../../../assets/images/genres/Dramas.jpg') },
  { id: 'Fantasy', title: 'Fantasy', image: require('../../../../assets/images/genres/Fantasy.jpg') },
  { id: 'Holidays', title: 'Holidays', image: require('../../../../assets/images/genres/Holidays.jpg') },
  { id: 'Horror', title: 'Horror', image: require('../../../../assets/images/genres/Horror.jpg') },
  { id: 'Sci-Fi', title: 'Sci-Fi', image: require('../../../../assets/images/genres/Sci-Fi.jpg') },
  { id: 'Thriller', title: 'Thriller', image: require('../../../../assets/images/genres/Thriller.jpg') },
];

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GENRES;
    return GENRES.filter((g) => g.title.toLowerCase().includes(q));
  }, [query]);

  const renderItem = ({ item }: { item: typeof GENRES[0] }) => (
    <View style={styles.cardWrap}>
      <GenreCard
        title={item.title}
        image={item.image}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        onPress={() => router.push({ pathname: '/search', params: { genre: item.id } })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <AppBar searchMode searchValue={query} onSearchChange={setQuery} onClear={() => setQuery('')} />

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        numColumns={NUM_COLS}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light,
  },
  searchBarWrap: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: theme.colors.dark,
    fontFamily: theme.fonts.regular,
  },
  listContent: {
    paddingHorizontal: H_SPACING,
    paddingTop: 8,
    paddingBottom: 48,
  },
  cardWrap: {
    marginRight: H_SPACING,
    marginBottom: H_SPACING,
  },
});

export default SearchScreen;
