import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import HeaderRow from './components/HeaderRow';
import DateTabs from './components/DateTabs';
import ShowtimeCard from './components/ShowtimeCard';
import styles from './SeatsScreen.styles';

const DATES = [
  { id: 1, day: 5, month: 'Mar' },
  { id: 2, day: 6, month: 'Mar' },
  { id: 3, day: 7, month: 'Mar' },
  { id: 4, day: 8, month: 'Mar' },
  { id: 5, day: 9, month: 'Mar' },
];

const SHOWTIMES = [
  {
    id: 1,
    time: '12:30',
    hall: 'Cinetech + Hall 1',
    price: '50$',
    bonusPrice: '2500 bonus',
  },
  {
    id: 2,
    time: '13:30',
    hall: 'Cinetech',
    price: '75$',
    bonusPrice: '300',
  },
];

export default function SeatsScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ movieId?: string; title?: string }>();
  const [selectedDate, setSelectedDate] = useState(1);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  React.useEffect(() => {
    navigation.setOptions?.({ headerShown: false });
  }, [navigation]);

  const movieTitle = params.title || "The King's Man";
  const releaseDate = 'In Theaters December 22, 2021';

  return (
    <View style={styles.container}>
      <HeaderRow title={movieTitle} subtitle={releaseDate} />

      <DateTabs dates={DATES} selectedDate={selectedDate} onSelect={setSelectedDate} />

      <View style={styles.showtimesSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.showtimesScrollContent}
        >
          {SHOWTIMES.map((showtime) => (
            <View key={showtime.id} style={[styles.showtimeCardOuter, { width: Math.round(SCREEN_WIDTH - 64) }]}>
              <ShowtimeCard showtime={showtime} />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.selectSeatsButton} accessibilityRole="button">
          <Text style={styles.selectSeatsButtonText}>Select Seats</Text>
        </Pressable>
      </View>
    </View>
  );
}
