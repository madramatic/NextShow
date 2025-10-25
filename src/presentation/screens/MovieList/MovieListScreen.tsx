import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AppBar from '../../components/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from '../../redux/moviesSlice';
import { RootState } from '../../redux/store';
import theme from '../../../core/theme/index';
import MovieCard from './components/MovieCard';

const MovieListScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const dispatch = useDispatch();

  const { movies, loading, loadingMore, page, totalPages, error } = useSelector((state: RootState) => state.movies as any);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchUpcomingMovies(1) as any);
  }, [dispatch]);

  const renderItem = ({ item }: any) => <MovieCard item={item} />;

  if (loading && (!movies || movies.length === 0)) {
    return <ActivityIndicator style={styles.centered} size="large" color={theme.colors.blue} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppBar />
      <View style={styles.container}>
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!loadingMore && page && totalPages && page < totalPages) {
              dispatch(fetchUpcomingMovies(page + 1) as any);
            }
          }}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            dispatch(fetchUpcomingMovies(1) as any)
              .then(() => setRefreshing(false))
              .catch(() => setRefreshing(false));
          }}
          ListFooterComponent={loadingMore ? <ActivityIndicator style={{ marginVertical: 16 }} size="small" color={theme.colors.blue} /> : null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.lightGray,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  list: {
    paddingBottom: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: theme.colors.pink,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
});

export default MovieListScreen;
