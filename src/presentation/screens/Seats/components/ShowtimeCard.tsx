import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SeatGrid from './SeatGrid';
import theme from '../../../../core/theme';

type Showtime = {
  id: number;
  time: string;
  hall: string;
  price: string;
  bonusPrice: string;
};

export default function ShowtimeCard({ showtime }: { showtime: Showtime }) {
  return (
    <View style={styles.showtimeCard}>
      <View style={styles.showtimeInfo}>
        <Text style={styles.timeText}>{showtime.time}</Text>
        <Text style={styles.hallText}>{showtime.hall}</Text>
      </View>

      <View style={styles.seatGridWrapper}>
        <SeatGrid rows={10} cols={20} />
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceText}>
          From <Text style={styles.priceValueBold}>{showtime.price}</Text> or{' '}
          <Text style={styles.priceValueBold}>{showtime.bonusPrice}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  showtimeCard: {
    width: '100%',
    backgroundColor: theme.colors.light,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    minHeight: 280,
  },
  showtimeInfo: {
    marginBottom: 12,
  },
  timeText: {
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    color: theme.colors.dark,
    marginBottom: 6,
  },
  hallText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  seatGridWrapper: {
    marginBottom: 14,
    alignItems: 'center',
  },
  priceRow: {
    marginTop: 4,
  },
  priceText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  priceValueBold: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.dark,
    fontSize: 14,
  },
});
