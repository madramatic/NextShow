import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Text,
  useWindowDimensions,
} from 'react-native';
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../../core/theme';
import GenreCard from './components/GenreCard';
import { searchMovies, discoverMoviesByGenre, clearSearchResults, fetchGenres } from '../../redux/searchSlice';
import { RootState, AppDispatch } from '../../redux/store';
import SearchResultItem from './components/SearchResultItem';
import AppBar from '../../components/AppBar';


const H_SPACING = 16;
const CARD_ASPECT_RATIO = 0.62;

const GENRES = [
  { id: 35, title: 'Comedies', image: require('../../../../assets/images/genres/Comedies.jpg') },
  { id: 80, title: 'Crime', image: require('../../../../assets/images/genres/Crime.jpg') },
  { id: 10751, title: 'Family', image: require('../../../../assets/images/genres/Family.jpg') },
  { id: 99, title: 'Documentaries', image: require('../../../../assets/images/genres/Documentaries.jpg') },
  { id: 18, title: 'Dramas', image: require('../../../../assets/images/genres/Dramas.jpg') },
  { id: 14, title: 'Fantasy', image: require('../../../../assets/images/genres/Fantasy.jpg') },
  { id: 10770, title: 'Holidays', image: require('../../../../assets/images/genres/Holidays.jpg') },
  { id: 27, title: 'Horror', image: require('../../../../assets/images/genres/Horror.jpg') },
  { id: 878, title: 'Sci-Fi', image: require('../../../../assets/images/genres/Sci-Fi.jpg') },
  { id: 53, title: 'Thriller', image: require('../../../../assets/images/genres/Thriller.jpg') },
];

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const params = useLocalSearchParams<{ genre?: string }>();
  

  const { searchResults, loading, genres } = useSelector((state: RootState) => state.search);
  const window = useWindowDimensions();

  const isLandscape = window.width > window.height;
  const numColumns = isLandscape ? (window.width > 900 ? 4 : 3) : 2;
  const cardWidth = useMemo(() => {
    return (window.width - H_SPACING * (numColumns + 1)) / numColumns;
  }, [window.width, numColumns]);
  const cardHeight = Math.round(cardWidth * CARD_ASPECT_RATIO);

  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  useEffect(() => {
    if (params.genre) {
      const genre = GENRES.find(g => g.title.toLowerCase() === params.genre?.toLowerCase());
      if (genre) {
        dispatch(discoverMoviesByGenre(genre.id));
        setQuery('');
      }
    }
  }, [params.genre, dispatch]);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      dispatch(clearSearchResults());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(searchMovies(trimmedQuery));
    }, 400);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  const handleClear = useCallback(() => {
    setQuery('');
    dispatch(clearSearchResults());
    if (params.genre) {
      router.setParams({ genre: undefined });
    }
  }, [dispatch, params.genre, router]);

  const renderGenreItem = useCallback(({ item }: { item: typeof GENRES[0] }) => (
    <View style={[styles.cardWrap, { width: cardWidth }]}> 
      <GenreCard
        title={item.title}
        image={item.image}
        width={cardWidth}
        height={cardHeight}
        onPress={() => router.push({ pathname: '/search', params: { genre: item.title } })}
      />
    </View>
  ), [router, cardWidth, cardHeight]);

  const renderMovieItem = useCallback(({ item }: { item: any }) => (
    <SearchResultItem
      item={item}
      genres={genres}
      onPress={() => router.push({ pathname: '/[movieId]', params: { movieId: String(item.id) } })}
    />
  ), [router, genres]);

  const showResults = query.trim() || params.genre;

  return (
    <View style={styles.container}>
      <AppBar searchMode searchValue={query} onSearchChange={setQuery} onClear={handleClear} />

      {showResults ? (
        <View style={styles.resultsContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={theme.colors.dark} />
            </View>
          ) : (
            <View style={styles.resultsWrapper}>
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>Top Results</Text>
              </View>
              <View style={styles.separator} />
              <FlatList
                data={searchResults}
                keyExtractor={(i) => String(i.id)}
                renderItem={renderMovieItem}
                contentContainerStyle={styles.resultsListContent}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
              />
            </View>
          )}
        </View>
      ) : (
        <FlatList
          data={GENRES}
          keyExtractor={(i) => String(i.id)}
          renderItem={renderGenreItem}
          numColumns={numColumns}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          extraData={numColumns}
          key={`genres-grid-cols-${numColumns}`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light,
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    padding: 20,
  },
  resultsWrapper: {
    flex: 1,
  },
  resultsHeader: {
    paddingHorizontal: H_SPACING,
    paddingTop: 8,
    paddingBottom: 8,
  },
  resultsTitle: {
    fontFamily: theme.fonts.medium,
    color: theme.colors.dark,
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#e6e6e6',
  },
  resultsListContent: {
    paddingBottom: 48,
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#e6e6e6',
    marginLeft: H_SPACING + 72 + 12,
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
